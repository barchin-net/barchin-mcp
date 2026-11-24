const state=initial(project,sample),root=document.getElementById('results'),filters=document.getElementById('filters');
const storageKey='barchin-dev-recorded-v1-'+project.slug;
let memory={saved:{},answers:{}};
try{memory=JSON.parse(localStorage.getItem(storageKey))||memory}catch{}
const persist=()=>{try{localStorage.setItem(storageKey,JSON.stringify(memory))}catch{}};
function update(){
 const v=view(project,sample,state);
 root.innerHTML=result(project,v,memory.saved,memory.answers);
 const leaders=document.getElementById('spotlight');
 if(leaders)leaders.innerHTML=spotlight(project,v);
}
filters.addEventListener('input',e=>{
 const input=e.target,c=input.dataset.c;if(!c)return;
 state[c]=input.type==='checkbox'?[...filters.elements].filter(i=>i.dataset.c===c&&i.checked).map(i=>i.value):input.value;
 if(c.startsWith('one:')){
  for(const child of project.controls.slice(project.controls.indexOf(c)+1)){
   const field=[...filters.elements].find(el=>el.dataset.c===child);
   if(field?.tagName!=='SELECT'||!(parents[child]||child==='base:date'||child==='next:date'))continue;
   const values=choices(project,sample,child,state);
   if(child==='pick:seller'){
    field.replaceChildren(new Option('مقایسهٔ همهٔ فروشنده‌ها',''),...values.map(v=>new Option('تاریخچهٔ '+v,v)));
    state[child]='';continue;
   }
   const selected=values.includes(state[child])?state[child]:child==='next:date'?values.at(-1):values[0];
   field.replaceChildren(...values.map(v=>new Option(fmt(v),v,false,v===selected)));
   state[child]=selected;
  }
 }
 update();
});
root.addEventListener('click',e=>{
 const btn=e.target.closest('[data-save]');if(!btn)return;
 const id=btn.dataset.save,r=sample.rows.find(r=>r.id===id);
 if(memory.saved[id])delete memory.saved[id];else memory.saved[id]=r.title||r.hotel||id;
 persist();update();[...root.querySelectorAll('[data-save]')].find(b=>b.dataset.save===id)?.focus();
});
root.addEventListener('input',e=>{if(e.target.dataset.answer){memory.answers[e.target.dataset.answer]=e.target.value;persist();}});
document.querySelector('#export')?.addEventListener('click',()=>{
 const {rows,columns}=view(project,sample,state);
 const csvCell=x=>{let t=x==null?'':String(x);if(/^[=+@\-\t\r]/.test(t))t="'"+t;return '"'+t.replaceAll('"','""')+'"';};
 const faq=project.kind==='faq';
 const content=faq?JSON.stringify(rows.map(r=>({question:r.question,answer:memory.answers[r.id]??r.answer,count:r.count})),null,2):'\ufeff'+[columns,...rows.map(r=>columns.map(k=>r[k]))].map(row=>row.map(csvCell).join(',')).join('\r\n');
 const url=URL.createObjectURL(new Blob([content],{type:faq?'application/json':'text/csv;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=project.slug+(faq?'.json':'.csv');a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
document.getElementById('copy').addEventListener('click',async()=>{
 const el=document.getElementById('prompt'),status=document.getElementById('copy-status');
 try{await navigator.clipboard.writeText(el.textContent);status.textContent='پرامپت کپی شد.'}
 catch{const range=document.createRange();range.selectNodeContents(el);const sel=getSelection();sel.removeAllRanges();sel.addRange(range);status.textContent=document.execCommand('copy')?'پرامپت کپی شد.':'متن پرامپت انتخاب شد؛ آن را کپی کنید.'}
});
update();
