// Run locally with Node. Only this process holds the key; the sample UI never receives it.
import {createInterface} from 'node:readline/promises';
import {setTimeout as wait} from 'node:timers/promises';
import {stdin,stdout} from 'node:process';
const target=process.argv[2],key=process.env.BARCHIN_API_KEY;
if(!target||!key)throw Error('Set BARCHIN_API_KEY on the server and provide one public HTTPS product URL.');
const url=new URL(target);
if(url.protocol!=='https:'||url.username||url.password)throw Error('Use one public HTTPS URL without credentials.');
const base='https://barchin.net/api/v1/actors/e-commerce-scraping-tool';
async function request(suffix,body){
 const response=await fetch(base+suffix,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,redirect:'error',signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw Error('Barchin HTTP '+response.status);
 return response.json();
}
const input={detailsUrls:[{url:url.href}],maxProductResults:1,scrapeMode:'HTTP',additionalProperties:true};
const {auto_hold:credits}=await request('/estimate',input);
if(!Number.isSafeInteger(credits)||credits<=0)throw Error('Missing credit estimate.');
console.error('One product, current estimated reservation: '+credits+' credits.');
if(process.argv.includes('--run')){
 const readline=createInterface({input:stdin,output:process.stderr});
 let answer;try{answer=await readline.question('Type '+credits+' to submit one paid run: ');}finally{readline.close();}
 if(answer!==String(credits))throw Error('No run submitted.');
 const {run_id:id}=await request('/runs?wait=0',input);
 if(!/^[a-f0-9-]{36}$/i.test(id))throw Error('Invalid run ID');
 console.error('Run ID: '+id);
 let run;
 for(let i=0;i<45;i++){await wait(2000);run=await request('/runs/'+id);if(!['queued','processing'].includes(run.status))break;}
 if(run?.status!=='succeeded')throw Error('Inspect run '+id+' before resubmitting.');
 const rows=(run.dataset||[]).map(r=>({url:r.url,link:r.url,observed:r.scrapedAt??new Date().toISOString(),product:r.name,amount:r.offers?.price??null,currency:r.offers?.currency??null,stock:r.offers?.availability??null,attributes:r.additionalProperties?.map(a=>a.name+' '+a.value).join('، ')||null}));
 stdout.write(JSON.stringify({version:1,time:new Date().toISOString(),provenance:'اجرای زندهٔ تأییدشده توسط کاربر',rows},null,2)+'\n');
}
