const stepsObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');stepsObs.unobserve(x.target)}})},{threshold:.15});
[0,1,2].forEach(i=>{const el=document.getElementById('sr'+i);if(el){el.style.transitionDelay=(i*.15)+'s';stepsObs.observe(el)}});

const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>60)});
const io=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>io.observe(el));