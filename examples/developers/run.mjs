import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {initial,view} from './engine.mjs';
import {capUrl,deep,demo,esc,prompt} from './presentation.mjs';
const here=path.dirname(fileURLToPath(import.meta.url));
const read=f=>fs.readFileSync(path.join(here,f),'utf8');
export const catalog=JSON.parse(read('catalog.json'));
export function sample(p){
 const data=JSON.parse(read('projects/'+p.slug+'/sample.v1.json'));
 assert(data.provenance?.trim() && !Number.isNaN(Date.parse(data.time)) && data.rows.length,p.slug+' needs a dated source description and records');
 for(const row of data.rows){
  const source=new URL(row.link);
  assert(source.protocol==='https:' && !/\.(example|invalid|test)$/.test(source.hostname) && !Number.isNaN(Date.parse(row.observed)),p.slug+' record needs a public source and observation date');
 }
 return data;
}
const scriptJSON=x=>JSON.stringify(x).replaceAll('<','\\u003c');
export function documentOf(title,desc,canonical,body,js='',chrome={}){
 return '<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' | توسعه‌دهندگان برچین</title><meta name="description" content="'+esc(desc)+'"><meta property="og:title" content="'+esc(title)+'"><meta property="og:description" content="'+esc(desc)+'"><link rel="canonical" href="https://barchin.net'+canonical+'">'+(chrome.styles||'')+'<style>body{margin:0;'+(chrome.styles?'':'font-family:system-ui,sans-serif')+'}'+read('style.css')+'</style></head><body'+(chrome.staticHeader?' data-local-tool':'')+'>'+(chrome.header||'').replace('href="/developers"','aria-current="page" href="/developers"')+'<main class="dev" id="main">'+body+'</main>'+(chrome.footer||'')+'<script>'+js+'</script>'+(chrome.scripts||'')+'</body></html>';
}
export function renderProject(p,chrome={}){
 if(p.kind==='attention'&&chrome.coverBase)p={...p,coverBase:chrome.coverBase};
 const d=sample(p),slug='/developers/projects/'+p.slug;
 const body=`<nav class="crumb" aria-label="مسیر صفحه"><a href="${chrome.library||'https://barchin.net/developers'}">کتابخانهٔ توسعه‌دهندگان</a><span aria-hidden="true">/</span>${esc(p.category)}</nav>
 <div class="project-head"><h1>${esc(p.title)}</h1><p>${esc(p.description)}</p></div>
 ${demo(p,d)}
 <section class="reading"><h2>نتیجه را چطور بخوانیم؟</h2><p>${esc(p.method)}</p></section>
 <div class="resources"><section class="panel resource"><h2>اجرای پروژه با ایجنت کدنویسی</h2>
 <div class="actions"><button class="btn btn-primary" id="copy">کپی پرامپت</button><a class="btn btn-ghost" href="${deep(p)}">مشاهده در GitHub</a></div><p id="copy-status" role="status"></p>
 <details><summary>متن پرامپت</summary><pre id="prompt">${esc(prompt(p))}</pre></details></section>
 <section class="panel resource"><h2>اجرای زنده با برچین</h2><p>برای دریافت دادهٔ تازه، وارد حساب شوید و پیش از اجرا هزینه و محدودهٔ ورودی را در صفحهٔ قابلیت بررسی کنید.</p>
 <div class="actions">${p.caps.map(k=>'<a class="btn btn-ghost" href="'+capUrl(k)+'#run-title"><bdi>'+esc(k)+'</bdi></a>').join('')}</div></section></div>`;
 const modules=['engine.mjs','presentation.mjs'].map(f=>read(f).replace(/^import .*?;$/gm,'').replace(/^export /gm,'')).join('\n');
 return documentOf(p.title,p.description,slug,body,'(()=>{'+modules+'\nconst project='+scriptJSON(p)+',sample='+scriptJSON(d)+';\n'+read('client.js')+'})();',chrome);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const p=catalog.find(x=>x.slug===path.basename(process.cwd()));
 if(!p)throw Error('Run from a projects/<slug> directory.');
 const d=sample(p),v=view(p,d,initial(p,d));
 if(process.argv.includes('--check')){
  assert.deepEqual(v,JSON.parse(read('projects/'+p.slug+'/expected.v1.json')));console.log('Sample verified: '+p.slug);
 }else if(process.argv.includes('--serve')){
  const port=Number(process.env.PORT||4173),page=renderProject(p);
  http.createServer((req,res)=>{if(p.kind==='attention'){
   const cover=d.rows.find(row=>req.url==='/assets/developer-covers/'+row.cover);
   if(cover){res.writeHead(200,{'Content-Type':'image/webp'});res.end(fs.readFileSync(path.join(here,'projects',p.slug,'covers',path.basename(cover.cover))));return}
  }
  if(req.url!=='/'){res.writeHead(404);res.end();return}res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(page)}).listen(port,'127.0.0.1',()=>console.log('http://127.0.0.1:'+port));
 }else console.log(JSON.stringify(v,null,2));
}
