// A shared, deterministic view model for the CLI, static HTML and browser demo.
export const labels = {
 product:'کالا',seller:'فروشنده',date:'تاریخ',price:'قیمت (تومان)',stock:'وضعیت موجودی',url:'نشانی نمونه',amount:'مقدار',currency:'واحد',attributes:'ویژگی‌ها',
 topic:'موضوع',story:'گروه پوشش',summary:'خلاصه',source:'منبع',published:'زمان انتشار',observed:'زمان مشاهده',link:'پیوند منبع',original:'قیمت اصلی (تومان)',discounted:'قیمت نهایی (تومان)',percent:'تخفیف (درصد)',
 category:'دسته',brand:'برند',rating:'امتیاز',city:'شهر',count:'تعداد',sellers:'تعداد فروشنده',floorPrice:'کمترین قیمت (تومان)',title:'عنوان',model:'مدل',year:'سال ساخت',km:'کارکرد (کیلومتر)',market:'بازار (تومان)',dealerPrice:'نمایندگی (تومان)',dealer:'نمایشگاه',id:'شناسه',area:'محله',size:'متراژ',deposit:'ودیعه (تومان)',rent:'اجارهٔ ماهانه (تومان)',unitPrice:'قیمت هر متر (تومان)',role:'نقش شغلی',work:'شیوهٔ همکاری',skills:'مهارت‌ها',skill:'مهارت',item:'قلم',time:'زمان مشاهده',route:'مسیر',travelDate:'تاریخ سفر',cabin:'کلاس',airline:'ایرلاین',hotel:'هتل',stars:'ستاره',window:'بازهٔ جست‌وجو',night:'قیمت اقامت (تومان)',amenities:'امکانات',stay:'اقامتگاه',status:'وضعیت',name:'نام',lat:'عرض جغرافیایی',lon:'طول جغرافیایی',match:'نتیجهٔ تطبیق',format:'قالب',views:'بازدید',likes:'پسند',comments:'نظر',question:'پرسش',answer:'پاسخ پیشنهادی',channel:'کانال',week:'هفته از',before:'قیمت پیشین (تومان)',after:'قیمت جدید (تومان)',from:'از تاریخ',to:'تا تاریخ',base:'تصویر اولیه',next:'تصویر مقایسه',evidence:'شواهد',min:'کمینه',median:'میانه',max:'بیشینه',total:'اندازهٔ نمونه',group:'گروه',branch:'شاخه',change:'تغییر',dates:'تأیید تاریخ'
};
export const unique = values => [...new Set(values.filter(v=>v!=null))];
export function choices(p,data,control){
 const [mode,key]=control.split(':');
 if(mode==='columns')return p.columns;
 if(mode==='sort')return key.split(',');
 if(mode==='base'||mode==='next')return unique(data.rows.map(r=>r.date)).sort();
 return unique(data.rows.flatMap(r=>r[key]??[]));
}
export function initial(p,data) {
 const state={};
 for(const c of p.controls){
  const [mode]=c.split(':'), vals=choices(p,data,c);
  state[c]=mode==='columns'||mode==='multi'?vals:mode==='base'||mode==='one'||mode==='sort'?vals[0]:mode==='next'?vals.at(-1):'';
 }
 return state;
}
export function view(p,data,state){
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
 if(p.kind==='discount'){
  rows=rows.map(r=>({...r,percent:r.original>0&&r.discounted!=null?+(100*(r.original-r.discounted)/r.original).toFixed(1):null}));columns.push('percent');
 }
 if(p.kind==='snapshot'){
  const a=state['base:date'],b=state['next:date'];
  const left=new Map(rows.filter(r=>r.date===a).map(r=>[r.id,r])),right=new Map(rows.filter(r=>r.date===b).map(r=>[r.id,r]));
  rows=unique([...left.keys(),...right.keys()]).map(id=>{
   const l=left.get(id),r=right.get(id);
   return {id,title:(r||l).title,before:l?.price??null,after:r?.price??null,change:!l?'اضافه شده':!r?'حذف از نمونه':l.price==null||r.price==null?'نامشخص':l.price!==r.price?'تغییر قیمت':'بدون تغییر'};
  });
  columns=['id','title','before','after','change'];
  if(a>=b){rows=[];note='تاریخ مقایسه باید بعد از تاریخ اولیه باشد.';}
 }
 if(p.kind==='distribution'){
  rows=rows.map(r=>({...r,unitPrice:r.size>0&&r.price!=null?Math.round(r.price/r.size):null}));
  columns.push('unitPrice');
  groups=unique(rows.map(r=>r.area)).map(name=>{
   const v=rows.filter(r=>r.area===name&&r.unitPrice!=null).map(r=>r.unitPrice).sort((a,b)=>a-b);
   const n=v.length,m=Math.floor(n/2);
   return {name,text:n?'تعداد '+n+'، کمینه '+v[0].toLocaleString('fa')+'، میانه '+((v[m]+v[Math.floor((n-1)/2)])/2).toLocaleString('fa')+'، بیشینه '+v[n-1].toLocaleString('fa')+' تومان در متر':'ردیف قابل محاسبه ندارد.'};
  });
 }
 if(p.kind==='skills'){
  const sample=rows.length;
  rows=unique(rows.flatMap(r=>r.skills)).map(skill=>{const hits=rows.filter(r=>r.skills.includes(skill));return {skill,count:hits.length,total:sample,evidence:hits.map(r=>({text:r.title,href:r.link}))};}).sort((a,b)=>b.count-a.count);
  columns=['skill','count','total','evidence'];
 }
 if(p.kind==='digest'){
  groups=unique(rows.map(r=>r.story)).map(name=>({name,text:rows.filter(r=>r.story===name).map(r=>r.summary).join(' ')}));
 }
 if(p.kind==='match'){
  const keyed=new Map();
  for(const r of rows){const key=r.name.trim()+'|'+r.area+'|'+r.category;const list=keyed.get(key)||[];list.push(r);keyed.set(key,list);}
  rows=rows.map(r=>{const list=keyed.get(r.name.trim()+'|'+r.area+'|'+r.category);const other=list.filter(x=>x.source!==r.source);
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
