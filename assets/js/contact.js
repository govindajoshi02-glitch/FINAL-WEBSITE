function handleSubmit(e){
  e.preventDefault();
  const btn=document.getElementById('submit-btn');
  btn.textContent='Sending...';
  btn.disabled=true;
  setTimeout(()=>{
    btn.style.background='var(--green)';
    btn.textContent="Message sent! We'll respond within 1 business day.";
  },1200);
}

const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>60)});
const io=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>io.observe(el));
