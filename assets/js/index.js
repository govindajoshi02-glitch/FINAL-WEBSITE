const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>60)});

const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>io.observe(el));

let statsDone=false;
const statsObs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !statsDone){
      statsDone=true;
      [0,1,2,3].forEach((i,idx)=>{
        const el=document.getElementById('si'+i);
        if(!el)return;
        el.style.transitionDelay=(idx*.12)+'s';
        el.classList.add('in');
      });
      function count(id,target,suffix,dur){
        const el=document.getElementById(id);
        if(!el)return;
        const t0=performance.now();
        (function run(now){
          const p=Math.min((now-t0)/dur,1);
          const ease=1-Math.pow(1-p,3);
          const v=Math.round(ease*target);
          el.textContent=(v>=1000?v.toLocaleString():v)+suffix;
          if(p<1)requestAnimationFrame(run);
        })(performance.now());
      }
      setTimeout(()=>count('sn0',100000,'+',1800),200);
      setTimeout(()=>count('sn1',200,'+',1300),300);
      setTimeout(()=>count('sn2',98,'%',1100),400);
      setTimeout(()=>count('sn3',60,'',900),500);
    }
  });
},{threshold:.2});
const statsGrid=document.getElementById('stats-grid');
if(statsGrid)statsObs.observe(statsGrid);

let stepsDone=false;
const stepsObs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !stepsDone){
      stepsDone=true;
      document.querySelectorAll('.step-card').forEach((el,i)=>{
        el.style.transitionDelay=(i*.15)+'s';
        setTimeout(()=>el.classList.add('in'),i*150);
      });
      const fill=document.getElementById('step-fill');
      if(fill){
        setTimeout(()=>{fill.style.width='100%'},300);
      }
    }
  });
},{threshold:.15});
const stepsSection=document.querySelector('.steps-flow');
if(stepsSection)stepsObs.observe(stepsSection);

document.querySelectorAll('.feat-item').forEach((el,i)=>{
  const fo=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.transitionDelay=(i*.1)+'s';
        entry.target.classList.add('in');
        fo.unobserve(entry.target);
      }
    });
  },{threshold:.1});
  fo.observe(el);
});

function updateCalc(){
  const n=parseInt(document.getElementById('sl-pkgs').value,10);
  const w=parseFloat(document.getElementById('sl-wt').value);
  document.getElementById('cv-pkgs').textContent=n+' package'+(n>1?'s':'');
  document.getElementById('cv-wt').textContent=w.toFixed(1)+' kg';
  const base=1499,fk=749,pk=375;
  const sep=n*(base+fk+Math.max(0,(w-1)*pk));
  const cw=n*w;
  const con=base+fk+Math.max(0,(cw-1)*pk*0.82);
  const sav=Math.max(0,sep-con);
  document.getElementById('cr-sep').textContent='\u20B9'+Math.round(sep).toLocaleString('en-IN');
  document.getElementById('cr-con').textContent='\u20B9'+Math.round(con).toLocaleString('en-IN');
  document.getElementById('cr-sav').textContent='\u20B9'+Math.round(sav).toLocaleString('en-IN');
}
updateCalc();

const row1=[
  {img:'United States.png',n:'United States'},
  {img:'UAE.png',n:'UAE'},
  {img:'United Kingdom.png',n:'United Kingdom'},
  {img:'Canada.png',n:'Canada'},
  {img:'Australia.jpg',n:'Australia'},
  {img:'Singapore.png',n:'Singapore'},
  {img:'Germany.png',n:'Germany'},
  {img:'Qatar.png',n:'Qatar'},
  {img:'New Zealand.png',n:'New Zealand'},
  {img:'South Africa.png',n:'South Africa'},
  {img:'Neatherlands.png',n:'Netherlands'},
  {img:'Japan.png',n:'Japan'},
  {img:'France.png',n:'France'},
  {img:'Italy.png',n:'Italy'},
  {img:'Malaysia.png',n:'Malaysia'}
];
const row2=[
  {img:'Bahrain.png',n:'Bahrain'},
  {img:'Sweden.png',n:'Sweden'},
  {img:'Kuwait.png',n:'Kuwait'},
  {img:'Ireland.png',n:'Ireland'},
  {img:'Belgium.png',n:'Belgium'},
  {img:'Oman.png',n:'Oman'},
  {img:'Norway.png',n:'Norway'},
  {img:'Denmark.png',n:'Denmark'},
  {img:'Switzerland.png',n:'Switzerland'},
  {img:'Philiphines.png',n:'Philippines'},
  {img:'Mauritius.jpg',n:'Mauritius'},
  {img:'Pakistan.png',n:'Pakistan'},
  {img:'Bangladesh.png',n:'Bangladesh'},
  {img:'Nepal.png',n:'Nepal'},
  {img:'Srilanka.png',n:'Sri Lanka'}
];
function buildTicker(id,data){
  const el=document.getElementById(id);
  if(!el)return;
  [...data,...data].forEach(d=>{
    const s=document.createElement('span');
    s.className='dest-chip';
    s.innerHTML=`<img src="assets/images/flags/${d.img}" alt="${d.n} flag" class="dest-chip-flag">${d.n}`;
    el.appendChild(s);
  });
}
buildTicker('dt1',row1);
buildTicker('dt2',row2);


const faqs=[
  {q:'What is ShipMySpree?',a:'ShipMySpree is an international parcel forwarding service that gives you a free India virtual address to shop from Indian e-commerce websites and forward purchases worldwide.'},
  {q:'Is it really free to sign up?',a:'Yes. Creating your account and receiving your India virtual address costs nothing. You only pay for shipping and any optional add-on services you choose.'},
  {q:'How does package consolidation work?',a:'When your packages arrive at the Mumbai warehouse, you can hold them, then combine orders into one repacked shipment when you are ready to send them internationally.'},
  {q:'Do I need an Indian payment card?',a:'No. The Shopping Concierge service can help place orders when local payment methods or contact details are required.'},
  {q:'How long do you store my packages for free?',a:'Packages can be stored for up to 60 days free before storage fees apply.'},
  {q:'Does ShipMySpree handle customs clearance?',a:'ShipMySpree is presented as a managed forwarding service with customs support through Aipex Worldwide across key shipping lanes.'},
  {q:'Which couriers do you use?',a:'Courier options include DHL, FedEx, Aramex, UPS, Aipex Worldwide, and India Post for lightweight shipments.'},
  {q:'What items are prohibited from shipping?',a:'Restricted items include perishables, alcohol and tobacco, hazardous materials, weapons, prescription medicines, counterfeit goods, and items restricted by export or import law.'}
];
const faqGrid=document.getElementById('faq-grid');
if(faqGrid){
  faqs.forEach(item=>{
    const div=document.createElement('div');
    div.className='faq-item reveal';
    div.innerHTML=`<div class="faq-q" onclick="toggleFaq(this.parentNode)"><span class="faq-q-text">${item.q}</span><span class="faq-icon">+</span></div><div class="faq-a">${item.a}</div>`;
    faqGrid.appendChild(div);
    io.observe(div);
  });
}
function toggleFaq(el){
  const isOpen=el.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(x=>x.classList.remove('open'));
  if(!isOpen)el.classList.add('open');
}
