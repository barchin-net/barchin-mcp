// A shared, deterministic view model for the CLI, static HTML and browser demo.
export const labels = {
 subcategory:'زیردسته',departure:'زمان پرواز',flightNo:'شمارهٔ پرواز',premium:'اختلاف با کمترین (تومان)',engagement:'تعامل',record:'شاهد انتشار',
 product:'کالا',seller:'فروشنده',date:'تاریخ',price:'قیمت (تومان)',stock:'وضعیت موجودی',url:'نشانی کالا',amount:'مقدار',currency:'واحد',attributes:'ویژگی‌ها',
 topic:'موضوع',story:'گروه پوشش',summary:'خلاصه',source:'منبع',published:'زمان انتشار',observed:'زمان مشاهده',link:'پیوند منبع',original:'قیمت اصلی (تومان)',discounted:'قیمت نهایی (تومان)',percent:'تخفیف (درصد)',
 category:'دسته',brand:'برند',rating:'امتیاز',city:'شهر',count:'تعداد',sellers:'تعداد فروشنده',floorPrice:'کمترین قیمت (تومان)',title:'عنوان',model:'مدل',year:'سال ساخت',km:'کارکرد (کیلومتر)',market:'بازار (تومان)',dealerPrice:'نمایندگی (تومان)',dealer:'نمایشگاه',id:'شناسه',area:'محله',size:'متراژ',deposit:'ودیعه (تومان)',rent:'اجارهٔ ماهانه (تومان)',unitPrice:'قیمت هر متر (تومان)',role:'نقش شغلی',work:'شیوهٔ همکاری',skills:'مهارت‌ها',skill:'مهارت',item:'قلم',time:'زمان مشاهده',route:'مسیر',travelDate:'تاریخ سفر',cabin:'کلاس',airline:'ایرلاین',hotel:'هتل',stars:'ستاره',window:'بازهٔ جست‌وجو',night:'قیمت اقامت (تومان)',amenities:'امکانات',stay:'اقامتگاه',status:'وضعیت',name:'نام',lat:'عرض جغرافیایی',lon:'طول جغرافیایی',match:'نتیجهٔ تطبیق',format:'قالب',views:'بازدید',likes:'پسند',comments:'نظر',question:'پرسش',answer:'پاسخ پیشنهادی',channel:'کانال',week:'هفته از',before:'قیمت پیشین (تومان)',after:'قیمت جدید (تومان)',from:'از تاریخ',to:'تا تاریخ',base:'تصویر اولیه',next:'تصویر مقایسه',evidence:'شواهد',min:'کمینه',median:'میانه',max:'بیشینه',total:'اندازهٔ نمونه',group:'گروه',branch:'شاخه',change:'تغییر',dates:'تأیید تاریخ'
};
export const unique = values => [...new Set(values.filter(v=>v!=null))];
const parents={'pick:product':['category'],'pick:source':['item'],'pick:seller':['product'],'one:seller':['product'],'one:travelDate':['route'],'one:category':['branch']};
export function choices(p,data,control,state={}){
 const scoped=(parents[control] || ((control==='base:date'||control==='next:date')?(p.tree?['branch','category']:['dealer']):[]));
 const candidates=data.rows.filter(r=>scoped.every(k=>!state['one:'+k]||r[k]===state['one:'+k]));
 const [mode,key]=control.split(':');
 if(mode==='columns')return p.columns;
 if(mode==='sort')return key.split(',');
 if(mode==='base'||mode==='next')return unique(candidates.map(r=>r.date)).sort();
 return unique(candidates.flatMap(r=>r[key]??[]));
}
export function initial(p,data) {
 const state={};
 for(const c of p.controls){
  const [mode]=c.split(':'), vals=choices(p,data,c,state);
  state[c]=mode==='columns'||mode==='multi'?vals:mode==='base'||mode==='one'||mode==='sort'?vals[0]:mode==='next'?vals.at(-1):'';
 }
 if(p.kind==='distribution'||p.slug==='neighborhood-rent'){
  const counts=new Map();
  for(const row of data.rows)counts.set(row.area,(counts.get(row.area)||0)+1);
  state['pick:area']=[...counts].sort((a,b)=>b[1]-a[1])[0]?.[0]||'';
 }
 if(p.kind==='digest'){
  for(const c of ['pick:date','pick:week'])if(p.controls.includes(c))state[c]=choices(p,data,c,state).sort().at(-1)||'';
 }
 return state;
}
// The legacy day-only retry is explicitly recorded as following that day's capture.
function offerOrder(row) {
 const [day]=row.observed.split('T');
 if(row.date===day+' (برداشت مجدد)')return day+'~';
 return new Date(row.observed).toISOString();
}
function offerView(p,data,state) {
 const product=state['one:product'], seller=state['pick:seller'];
 const captures=new Map();
 const history=data.rows.filter(r=>r.product===product).sort((a,b)=>{
  const left=offerOrder(a),right=offerOrder(b);
  return left===right?0:left>right?-1:1;
 });
 for(const r of history){
  if(!captures.has(r.date))captures.set(r.date,[]);
  captures.get(r.date).push(r);
 }
 const checks=[...captures.values()];
 const priced=r=>r.stock==='موجود'&&Number.isFinite(r.price)&&r.price>0;
 const recorded=checks.find(batch=>batch.some(r=>priced(r)||r.stock==='ناموجود'));
 const offers=(recorded||[]).filter(priced).sort((a,b)=>a.price-b.price);
 const latest=checks[0]||[];
 const minimum=offers[0]?.price;
 const facts={
  product,source:history[0]?.link||'',observed:offers[0]?.observed||'',
  latest:latest[0]?.observed||'',latestStatus:unique(latest.map(r=>r.stock)).join('، '),
  newerCheck:Boolean(recorded&&recorded!==latest),
  sellers:unique(offers.map(r=>r.seller)).length,
  lowest:offers.filter(r=>r.price===minimum).map(r=>r.seller),minimum:minimum??null,
  spread:offers.length?offers.at(-1).price-minimum:null
 };
 const rows=seller?history.filter(r=>r.seller===seller):offers.map(r=>({...r,premium:r.price-minimum}));
 const columns=seller?['product','seller','observed','stock','price','link']:p.columns;
 return {columns,rows,groups:[],note:'',facts,historySeller:seller||''};
}
export function view(p,data,state){
 if(p.kind==='offers')return offerView(p,data,state);
 let rows=data.rows.map(r=>({...r})), columns=[...p.columns];
 for(const c of p.controls){
  const [mode,k]=c.split(':'),v=state[c];
  if(v===''||v==null)continue;
  if(['pick','one'].includes(mode))rows=rows.filter(r=>String(r[k])===String(v));
  if(mode==='has')rows=rows.filter(r=>(r[k]||[]).includes(v));
  if(mode==='multi')rows=rows.filter(r=>v.includes(r[k]));
  if(mode==='text')rows=rows.filter(r=>String(r[k]).toLocaleLowerCase().includes(v.trim().toLocaleLowerCase()));
  if(mode==='min'||mode==='max')rows=rows.filter(r=>r[k]!=null&&(mode==='min'?+r[k]>=+v:+r[k]<=+v));
  if(mode==='from'||mode==='to')rows=rows.filter(r=>mode==='from'?r[k]>=v:r[k]<=v);
  if(mode==='columns')columns=v;
 }
 let groups=[],note='';
 if(p.kind==='attention'){
  for(const row of rows){
   row.engagement=Number.isFinite(row.likes)&&Number.isFinite(row.comments)?row.likes+row.comments:null;
  }
  for(const [metric,name] of [['engagement','بیشترین تعامل'],['views','پربازدیدترین ریل']]){
   const eligible=rows.filter(row=>Number.isFinite(row[metric])&&(metric!=='views'||row.format==='ریل'));
   if(!eligible.length)continue;
   const value=Math.max(...eligible.map(row=>row[metric]));
   for(const row of eligible.filter(row=>row[metric]===value)){
    groups.push({name,metric,value,title:row.title,cover:row.cover,link:row.link});
   }
  }
 }
 if(p.kind==='discount'){
  rows=rows.map(r=>({...r,percent:r.original>0&&r.discounted!=null?+(100*(r.original-r.discounted)/r.original).toFixed(1):null}));columns.push('percent');
 }
 if(p.kind==='snapshot'){
  const a=state['base:date'],b=state['next:date'];
  const left=new Map(rows.filter(r=>r.date===a).map(r=>[r.id,r])),right=new Map(rows.filter(r=>r.date===b).map(r=>[r.id,r]));
  rows=unique([...left.keys(),...right.keys()]).map(id=>{
   const l=left.get(id),r=right.get(id);
   return {id,title:(r||l).title,link:(r||l).link,observed:(r||l).observed,before:l?.price??null,after:r?.price??null,change:!l?'اضافه شده':!r?'حذف از نمونه':l.price==null||r.price==null?'نامشخص':l.price!==r.price?'تغییر قیمت':'بدون تغییر'};
  });
  columns=['id','title','before','after','change','link'];
  if(a>=b){rows=[];note='تاریخ مقایسه باید بعد از تاریخ اولیه باشد.';}
 }
 if(p.kind==='distribution'){
  const listings=new Map();
  for(const row of rows){
   const prior=listings.get(row.link);
   if(!prior||prior.observed<row.observed)listings.set(row.link,row);
  }
  rows=[...listings.values()].map(r=>({...r,unitPrice:Number.isFinite(r.size)&&r.size>0&&Number.isFinite(r.price)&&r.price>0?Math.round(r.price/r.size):null}));
  columns.push('unitPrice');
  groups=unique(rows.map(r=>r.area)).map(name=>{
   const v=rows.filter(r=>r.area===name&&r.unitPrice!=null).map(r=>r.unitPrice).sort((a,b)=>a-b);
   const n=v.length,m=Math.floor(n/2);
   if(n<25)return {name,text:n.toLocaleString('fa')+' آگهی با قیمت و متراژ معتبر؛ برای نمایش توزیع این محله حداقل ۲۵ آگهی لازم است.'};
   return {name,text:n?'تعداد '+n.toLocaleString('fa')+'، کمینه '+v[0].toLocaleString('fa')+'، میانه '+((v[m]+v[Math.floor((n-1)/2)])/2).toLocaleString('fa')+'، بیشینه '+v[n-1].toLocaleString('fa')+' تومان در متر':'ردیف قابل محاسبه ندارد.'};
  });
 }
 if(p.kind==='skills'){
  const sample=rows.length;
  rows=unique(rows.flatMap(r=>r.skills)).map(skill=>{const hits=rows.filter(r=>r.skills.includes(skill));return {skill,count:hits.length,total:sample,evidence:hits.map(r=>({text:r.title,href:r.link}))};}).sort((a,b)=>b.count-a.count);
  columns=['skill','count','total','evidence'];
 }
 if(p.kind==='digest'){
  groups=unique(rows.map(r=>r.story)).map(name=>({name,text:rows.filter(r=>r.story===name).length.toLocaleString('fa')+' انتشار در انتخاب فعلی'}));
 }
 if(p.kind==='match'){
  const nameKey=r=>r.name.normalize('NFKC').replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/[‌\s]+/g,' ').trim().replace(/^کافی شاپ /,'کافه ')+'|'+r.area+'|'+r.category;
  const keyed=new Map();
  for(const r of rows){const key=nameKey(r);const list=keyed.get(key)||[];list.push(r);keyed.set(key,list);}
  rows=rows.map(r=>{const list=keyed.get(nameKey(r));const other=list.filter(x=>x.source!==r.source);
   const close=other.filter(x=>Math.hypot((r.lat-x.lat)*111000,(r.lon-x.lon)*91000)<=150);
   const match=!other.length?'فقط '+r.source:close.length===1&&list.length===2?'تطبیق یافته':'مبهم';
   return {...r,match};});columns.push('match');
 }
 for(const c of p.controls.filter(c=>c.startsWith('sort:'))){
  const spec=state[c],desc=spec.startsWith('-'),k=spec.replace(/^-/,'');
  rows.sort((a,b)=>a[k]==null?Number(b[k]!=null):b[k]==null?-1:(a[k]-b[k])*(desc?-1:1));
 }
 return {columns,rows,groups,note};
}
