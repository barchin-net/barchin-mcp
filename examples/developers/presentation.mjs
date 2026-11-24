import {labels,choices,initial,view,unique} from './engine.mjs';
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const fmt=v=>v==null?'نامشخص':typeof v==='number'?v.toLocaleString('fa-IR'):Array.isArray(v)?v.join('، '):String(v);
export const repo='https://github.com/barchin-net/barchin-mcp';
export const deep=p=>repo+'/tree/main/examples/developers/projects/'+p.slug;
export const capUrl=k=>'https://barchin.net/'+(['instagram-insights','price-check'].includes(k)?'agents':'actors')+'/'+k;
export function prompt(p){
 return `Open barchin-net/barchin-mcp, directory examples/developers/projects/${p.slug}. Build and customize “${p.title}” for Persian RTL users. In that directory run node ../../run.mjs --check, then node ../../run.mjs --serve and open the local address. Use sample.v1.json and expected.v1.json. Expected behavior: ${p.description} Interpretation rule: ${p.method} ${p.adapt} Add regression checks against expected.v1.json. Keep units, evidence and observation times visible. For optional live data use ${p.caps.join(' + ')}. Follow the README and the linked Barchin input schema. Keep BARCHIN_API_KEY in a server-side environment variable. Show credit estimates and require explicit confirmation before any bounded paid run. Never put a key in browser code or commit .env.`;
}
export function controls(p,d,s){
 return p.controls.map(c=>{
  const [m,k]=c.split(':'),v=s[c],vals=p.tree&&k==='category'?unique(d.rows.filter(r=>r.branch===s['one:branch']).map(r=>r.category)):choices(p,d,c),label=m==='columns'?'ستون‌های خروجی':m==='sort'?'مرتب‌سازی':m==='base'||m==='next'?labels[m]:( {min:'حداقل ',max:'حداکثر ',from:'از ',to:'تا ',text:'جست‌وجوی '}[m]||'')+(labels[k]||k);
  if(m==='multi'||m==='columns')return '<fieldset><legend>'+esc(label)+'</legend>'+vals.map(a=>'<label><input type="checkbox" data-c="'+esc(c)+'" value="'+esc(a)+'" '+(v.includes(a)?'checked':'')+'> '+esc(m==='columns'?labels[a]:a)+'</label>').join('')+'</fieldset>';
  if(['text','from','to','min','max'].includes(m))return '<label>'+esc(label)+'<input data-c="'+esc(c)+'" type="'+(m==='text'?'search':m==='min'||m==='max'?'number':'date')+'" value="'+esc(v)+'"></label>';
  return '<label>'+esc(label)+'<select data-c="'+esc(c)+'">'+(['pick','has'].includes(m)?'<option value="">همه</option>':'')+vals.map(a=>'<option value="'+esc(a)+'" '+(String(a)===String(v)?'selected':'')+'>'+esc(m==='sort'?(labels[a.replace(/^-/,'')]||a)+(a.startsWith('-')?'، بیشترین':'، کمترین'):fmt(a))+'</option>').join('')+'</select></label>';
 }).join('');
}
const external=(url,t)=>/^https:\/\//.test(url)?'<a href="'+esc(url)+'" rel="noreferrer">'+esc(t)+'</a>':esc(t);
export function result(p,v,saved={},answers={}){
 const {columns,rows,groups,note}=v;
 const cell=(r,k)=>{
  if(k==='link')return r.link?external(r.link,'باز کردن منبع'):'نامشخص';
  if(k==='evidence')return r.evidence.map(e=>typeof e==='string'?esc(e):external(e.href,e.text)).join(' · ');
  if(k==='answer')return '<input data-answer="'+esc(r.id)+'" aria-label="پاسخ '+esc(r.question)+'" value="'+esc(answers[r.id]??r.answer)+'">';
  return esc(fmt(r[k]));
 };
 const summary=groups.map(g=>'<article class="finding"><strong>'+esc(g.name)+'</strong><p>'+esc(g.text)+'</p></article>').join('');
 let map='';
 if(p.kind==='map'&&rows.length){
  const coordinates=rows.map(r=>[r.lat,r.lon]);
  const lat=Math.min(...coordinates.map(a=>a[0]))-.002,lon=Math.min(...coordinates.map(a=>a[1]))-.002;
  const height=Math.max(...coordinates.map(a=>a[0]))-lat+.002,width=Math.max(...coordinates.map(a=>a[1]))-lon+.002;
  map='<figure><figcaption>نقشهٔ مختصات نمونه · شمال ↑</figcaption><div class="coord-map" dir="ltr">'+rows.map((r,i)=>'<a href="#point-'+i+'" title="'+esc(r.name)+'" aria-label="'+esc(r.name)+'" style="left:'+((r.lon-lon)/width*100)+'%;bottom:'+((r.lat-lat)/height*100)+'%">'+fmt(i+1)+'</a>').join('')+'</div></figure>';
 }
 return '<p role="status">'+(note?esc(note):fmt(rows.length)+' ردیف در این انتخاب')+'</p>'+summary+map+(rows.length&&columns.length?'<div class="scroll" tabindex="0" aria-label="جدول نتیجه"><table><thead><tr>'+columns.map(k=>'<th scope="col">'+esc(labels[k]||k)+'</th>').join('')+(p.save?'<th>فهرست من</th>':'')+'</tr></thead><tbody>'+rows.map((r,i)=>'<tr id="point-'+i+'" tabindex="-1">'+columns.map(k=>'<td dir="auto">'+cell(r,k)+'</td>').join('')+(p.save?'<td><button type="button" data-save="'+esc(r.id)+'" aria-pressed="'+Boolean(saved[r.id])+'">'+(saved[r.id]?'حذف از فهرست':'ذخیره')+'</button></td>':'')+'</tr>').join('')+'</tbody></table></div>':(!note?'<p>برای دیدن نتیجه، انتخاب‌ها را تغییر دهید.</p>':''))+(p.save?'<p>ذخیره‌شده‌ها در این مرورگر · '+esc(Object.keys(saved).filter(k=>saved[k]).map(k=>saved[k]).join('، ')||'خالی')+'</p>':'');
}
export function demo(p,d){
 const s=initial(p,d);
 return '<section class="demo" aria-labelledby="demo"><h2 id="demo">دموی پروژه</h2><p>'+esc(d.provenance)+'</p><p class="quiet">قابلیت منبع · '+p.caps.map(k=>'<a href="'+capUrl(k)+'"><bdi>'+esc(k)+'</bdi></a>').join(' و ')+' · نسخهٔ نمونه '+fmt(d.version)+' · زمان تهیهٔ بسته <bdi>'+esc(d.time)+'</bdi></p><form id="filters" onsubmit="return false">'+controls(p,d,s)+'</form><div id="results">'+result(p,view(p,d,s))+'</div>'+(p.csv||p.kind==='faq'?'<button id="export" type="button">'+(p.csv?'دانلود CSV انتخاب‌شده':'دانلود پیش‌نویس FAQ')+'</button>':'')+'</section>';
}
