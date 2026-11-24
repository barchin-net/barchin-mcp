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
export const sample=p=>JSON.parse(read('projects/'+p.slug+'/sample.v1.json'));
const scriptJSON=x=>JSON.stringify(x).replaceAll('<','\\u003c');
export function documentOf(title,desc,canonical,body,js='',chrome={}){
 return '<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+' | توسعه‌دهندگان برچین</title><meta name="description" content="'+esc(desc)+'"><meta property="og:title" content="'+esc(title)+'"><meta property="og:description" content="'+esc(desc)+'"><link rel="canonical" href="https://barchin.net'+canonical+'">'+(chrome.styles||'')+'<style>body{margin:0;'+(chrome.styles?'':'font-family:system-ui,sans-serif')+'}'+read('style.css')+'</style></head><body'+(chrome.staticHeader?' data-local-tool':'')+'>'+(chrome.header||'')+'<main class="dev" id="main">'+body+'</main>'+(chrome.footer||'')+'<script>'+js+'</script>'+(chrome.scripts||'')+'</body></html>';
}
export function renderProject(p,chrome={}){
 const d=sample(p),slug='/developers/projects/'+p.slug;
 const body='<nav aria-label="مسیر صفحه"><a href="'+(chrome.library||'https://barchin.net/developers')+'">کتابخانهٔ پروژه‌ها</a> / '+esc(p.category)+'</nav><div class="hero"><h1>'+esc(p.title)+'</h1><p>'+esc(p.description)+'</p></div>'+demo(p,d)+'<h2>نتیجه را چطور بخوانیم؟</h2><p>'+esc(p.method)+'</p><h2>اجرای پروژه با ایجنت کدنویسی</h2><div class="actions"><button class="primary" id="copy">کپی پرامپت</button><a class="action" href="'+deep(p)+'">مشاهده در GitHub</a></div><p id="copy-status" role="status"></p><details><summary>متن پرامپت</summary><pre id="prompt">'+esc(prompt(p))+'</pre></details><h2>اجرای زنده با برچین</h2><p>دموی بالا رایگان است. برای دادهٔ تازه، در صفحهٔ قابلیت وارد حساب شوید، محدودهٔ ورودی و هزینه را بررسی و اجرا را تأیید کنید.</p><div class="actions">'+p.caps.map(k=>'<a class="action" href="'+capUrl(k)+'#run-title"><bdi>'+esc(k)+'</bdi></a>').join('')+'</div>';
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
  http.createServer((req,res)=>{if(req.url!=='/'){res.writeHead(404);res.end();return}res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(page)}).listen(port,'127.0.0.1',()=>console.log('http://127.0.0.1:'+port));
 }else console.log(JSON.stringify(v,null,2));
}
