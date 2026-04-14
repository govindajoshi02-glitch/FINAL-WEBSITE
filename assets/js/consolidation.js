function calcSav(){
  const n=parseInt(document.getElementById('sl-n').value);
  const w=parseFloat(document.getElementById('sl-w').value);
  document.getElementById('c-n').textContent=n+' package'+(n>1?'s':'');
  document.getElementById('c-w').textContent=w.toFixed(1)+' kg';
  const base=1499,fk=749,pk=375;
  const sep=n*(base+fk+Math.max(0,(w-1)*pk));
  const cw=n*w;const con=base+fk+Math.max(0,(cw-1)*pk*0.82);
  const sav=Math.max(0,sep-con);
  document.getElementById('r-sep').textContent='₹'+Math.round(sep).toLocaleString('en-IN');
  document.getElementById('r-con').textContent='₹'+Math.round(con).toLocaleString('en-IN');
  document.getElementById('r-sav').textContent='₹'+Math.round(sav).toLocaleString('en-IN');
}
calcSav();
const sbObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');sbObs.unobserve(x.target)}})},{threshold:.3});
[document.getElementById('sb1'),document.getElementById('sb2')].forEach(el=>{if(el)sbObs.observe(el)});

const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>60)});
const io=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>io.observe(el));
