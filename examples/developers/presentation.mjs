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
  const [m,k]=c.split(':'),v=s[c],vals=choices(p,d,c,s),label=m==='columns'?'ستون‌های خروجی':m==='sort'?'مرتب‌سازی':m==='base'||m==='next'?labels[m]:( {min:'حداقل ',max:'حداکثر ',from:'از ',to:'تا ',text:'جست‌وجوی '}[m]||'')+(labels[k]||k);
  if(m==='multi'&&vals.length>15)return '<details class="many-options"><summary>'+esc(label)+' · '+fmt(vals.length)+' گزینه</summary><button type="button" data-bulk="'+esc(c)+'">انتخاب همه / پاک کردن</button>'+vals.map(a=>'<label><input type="checkbox" data-c="'+esc(c)+'" value="'+esc(a)+'" '+(v.includes(a)?'checked':'')+'> '+esc(k==='url'?(d.rows.find(r=>r.url===a)?.product||a):a)+'</label>').join('')+'</details>';
  if(m==='multi'||m==='columns')return '<fieldset><legend>'+esc(label)+'</legend>'+vals.map(a=>'<label><input type="checkbox" data-c="'+esc(c)+'" value="'+esc(a)+'" '+(v.includes(a)?'checked':'')+'> '+esc(m==='columns'?labels[a]:k==='url'?(d.rows.find(r=>r.url===a)?.product||a):a)+'</label>').join('')+'</fieldset>';
  if(['text','from','to','min','max'].includes(m))return '<label>'+esc(label)+'<input data-c="'+esc(c)+'" type="'+(m==='text'?'search':m==='min'||m==='max'?'number':'date')+'" value="'+esc(v)+'"></label>';
  const offersSeller=p.kind==='offers'&&k==='seller';
  return '<label>'+esc(offersSeller?'نمایش':label)+'<select data-c="'+esc(c)+'">'+(['pick','has'].includes(m)?'<option value="">'+(offersSeller?'مقایسهٔ همهٔ فروشنده‌ها':'همه')+'</option>':'')+vals.map(a=>'<option value="'+esc(a)+'" '+(String(a)===String(v)?'selected':'')+'>'+esc(m==='sort'?(labels[a.replace(/^-/,'')]||a)+(a.startsWith('-')?'، بیشترین':'، کمترین'):offersSeller?'تاریخچهٔ '+a:fmt(a))+'</option>').join('')+'</select></label>';
 }).join('');
}
function coverUrl(p,file){
 return (p.coverBase||'/assets/developer-covers/')+encodeURIComponent(file);
}
export function spotlight(p,v){
 if(p.kind!=='attention'||!v.groups.length)return '';
 return '<div class="leaders">'+v.groups.map(g=>`<a class="leader" href="${esc(g.link)}" rel="noreferrer">
  <img src="${esc(coverUrl(p,g.cover))}" alt="${esc(g.title)}" width="96" height="116">
  <span><small>${esc(g.name)}</small><strong>${fmt(g.value)} <em>${g.metric==='views'?'بازدید':'تعامل'}</em></strong><b>${esc(g.title)}</b></span></a>`).join('')+'</div>';
}
const external=(url,t)=>/^https:\/\//.test(url)?'<a href="'+esc(url)+'" rel="noreferrer">'+esc(t)+'</a>':esc(t);
function observationTime(value){
 if(!value)return '';
 const detailed=value.includes('T');
 return new Intl.DateTimeFormat('fa-IR',{timeZone:'UTC',dateStyle:'long',...(detailed?{timeStyle:'short'}:{})}).format(new Date(value))+(detailed?' (UTC)':'');
}
function offerSummary(v){
 const f=v.facts;
 const heading=f.sellers?'اول '+f.lowest.join(' یا ')+' را بررسی کنید':'قیمت قابل مقایسه ثبت نشده است';
 const comparison=f.sellers?'کمترین قیمت ثبت‌شده '+fmt(f.minimum)+' تومان بود. '+(f.sellers>1?'فاصلهٔ ارزان‌ترین تا گران‌ترین پیشنهاد بین '+fmt(f.sellers)+' فروشنده، '+fmt(f.spread)+' تومان بود.':'فقط یک فروشنده قیمت قابل مقایسه داشت.'):'';
 const latest=f.newerCheck||!f.sellers?'<p>آخرین پایش ثبت‌شده · '+esc(observationTime(f.latest))+' · '+esc(f.latestStatus)+(f.newerCheck?'؛ قیمت تازه‌ای برای سنجش تغییر ثبت نشد.':'')+'</p>':'';
 const title=v.historySeller?'تاریخچهٔ '+v.historySeller:'پیشنهادها از ارزان‌ترین به گران‌ترین';
 return '<section class="finding"><h3>'+esc(heading)+'</h3><p>'+esc(comparison)+'</p>'+(f.observed?'<small>زمان ثبت پیشنهادها · '+esc(observationTime(f.observed))+'</small>':'')+latest+'<p>'+external(f.source,'بررسی قیمت و شرایط خرید در ترب ←')+'</p></section><h3>'+esc(title)+'</h3>';
}
export function result(p,v,saved={},answers={},limit=30){
 const {rows,groups,note}=v;
 const shown=p.kind==='map'?rows:rows.slice(0,limit);
 const columns=p.kind==='offers'?(v.historySeller?['observed','stock','price']:['seller','price','premium']):v.columns;
 const cell=(r,k)=>{
  if(p.kind==='offers'&&k==='observed')return esc(observationTime(r.observed));
  if(p.kind==='attention'&&k==='title')return `<a class="garment" href="${esc(r.link)}"><img loading="lazy" src="${esc(coverUrl(p,r.cover))}" alt="کاور ${esc(r.model)}" width="60" height="76"><span>${esc(r.model)}<small>${esc(r.format)}</small></span></a>`;
  if(p.kind==='attention'&&k==='views'&&r.format!=='ریل')return '—';
  if(k==='url')return external(r.url,'صفحهٔ کالا');
  if(k==='record')return r.record?external(r.record,'اطلاعیهٔ ناشر'):'—';
  if(k==='link')return r.link?external(r.link,'باز کردن منبع'):'نامشخص';
  if(k==='evidence')return r.evidence.map(e=>typeof e==='string'?esc(e):external(e.href,e.text)).join(' · ');
  if(k==='answer')return '<input data-answer="'+esc(r.id)+'" aria-label="پاسخ '+esc(r.question)+'" value="'+esc(answers[r.id]??r.answer)+'">';
  return esc(fmt(r[k]));
 };
 const summary=p.kind==='offers'?offerSummary(v):p.kind==='attention'?'':groups.map(g=>'<article class="finding"><strong>'+esc(g.name)+'</strong><p>'+esc(g.text)+'</p></article>').join('');
 let map='';
 if(p.kind==='map'&&rows.length){
  const coordinates=rows.map(r=>[r.lat,r.lon]);
  const lat=Math.min(...coordinates.map(a=>a[0]))-.002,lon=Math.min(...coordinates.map(a=>a[1]))-.002;
  const height=Math.max(...coordinates.map(a=>a[0]))-lat+.002,width=Math.max(...coordinates.map(a=>a[1]))-lon+.002;
  map='<figure><figcaption>نقشهٔ مختصات نمونه · شمال ↑</figcaption><div class="coord-map" dir="ltr">'+rows.map((r,i)=>'<a href="#point-'+i+'" title="'+esc(r.name)+'" aria-label="'+esc(r.name)+'" style="left:'+((r.lon-lon)/width*100)+'%;bottom:'+((r.lat-lat)/height*100)+'%">'+fmt(i+1)+'</a>').join('')+'</div></figure>';
 }
 return '<p role="status">'+(note?esc(note):fmt(rows.length)+' ردیف در این انتخاب'+(shown.length<rows.length?' · نمایش '+fmt(shown.length)+' ردیف':''))+'</p>'+summary+map+(rows.length&&columns.length?'<div class="scroll" tabindex="0" aria-label="جدول نتیجه"><table><thead><tr>'+columns.map(k=>'<th scope="col">'+esc(labels[k]||k)+'</th>').join('')+(p.save?'<th>فهرست من</th>':'')+'</tr></thead><tbody>'+shown.map((r,i)=>'<tr id="point-'+i+'" tabindex="-1">'+columns.map(k=>'<td dir="auto">'+cell(r,k)+'</td>').join('')+(p.save?'<td><button type="button" data-save="'+esc(r.id)+'" aria-pressed="'+Boolean(saved[r.id])+'">'+(saved[r.id]?'حذف از فهرست':'ذخیره')+'</button></td>':'')+'</tr>').join('')+'</tbody></table></div>':(!note?'<p>برای دیدن نتیجه، انتخاب‌ها را تغییر دهید.</p>':''))+(shown.length<rows.length&&columns.length?'<button type="button" data-more>نمایش ردیف‌های بیشتر</button>':'')+(p.save?'<p>ذخیره‌شده‌ها در این مرورگر · '+esc(Object.keys(saved).filter(k=>saved[k]).map(k=>saved[k]).join('، ')||'خالی')+'</p>':'');
}
export function demo(p,d){
 const s=initial(p,d),v=view(p,d,s);
 const source=p.caps.map(k=>`<a href="${capUrl(k)}"><bdi>${esc(k)}</bdi></a>`).join(' و ');
 return `<section class="demo panel" aria-labelledby="demo">
  <div class="demo-head"><h2 id="demo">دموی پروژه</h2><span class="caps">${source}</span></div>
  <p class="source-note">${esc(d.provenance)}</p>
  ${p.kind==='attention'?'<div id="spotlight">'+spotlight(p,v)+'</div>':''}
  <form id="filters" onsubmit="return false">${controls(p,d,s)}</form>
  <div id="results"${p.kind==='attention'?' class="comparison"':''}>${result(p,v)}</div>
  ${p.csv||p.kind==='faq'?'<button class="btn btn-ghost" id="export" type="button">'+(p.csv?'دانلود CSV انتخاب‌شده':'دانلود پیش‌نویس FAQ')+'</button>':''}
  <p class="data-time">نسخهٔ داده ${fmt(d.version)} · ثبت بسته <time dir="ltr">${esc(d.time)}</time></p>
 </section>`;
}
