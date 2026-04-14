function doTrack(){
  const val=document.getElementById('track-inp').value.trim();
  if(!val)return;
  document.getElementById('t-id').textContent=val;
  const result=document.getElementById('track-result');
  result.style.display='block';
  const steps=[
    {title:'Order received at warehouse',time:'March 18, 2025 · 09:41 AM IST',done:true},
    {title:'Package photographed & logged',time:'March 18, 2025 · 10:15 AM IST',done:true},
    {title:'Export customs cleared — Mumbai',time:'March 19, 2025 · 02:30 PM IST',done:true},
    {title:'In flight to Dubai (DXB)',time:'March 20, 2025 · 11:00 PM IST',done:true,active:true},
    {title:'Arrived at destination facility',time:'Est. March 22, 2025',done:false},
    {title:'Out for delivery',time:'Est. March 22, 2025',done:false},
    {title:'Delivered',time:'Est. March 22–23, 2025',done:false},
  ];
  const ml=document.getElementById('milestones');
  ml.innerHTML='';
  steps.forEach((s,i)=>{
    const d=document.createElement('div');d.className='milestone';
    d.innerHTML='<div class="ms-dot'+(s.done?' done':'')+(s.active?' active':'')+'"><svg width="12" height="12" viewBox="0 0 12 12" fill="none">'+(s.done?'<path d="M2.5 6l2.5 2.5 4.5-5" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>':(s.active?'<circle cx="6" cy="6" r="3" fill="#fff"/>':''))+'</svg></div><div><div class="ms-title" style="color:'+(s.done?'var(--text)':'var(--muted)')+'">'+s.title+'</div><div class="ms-time">'+s.time+'</div></div>';
    ml.appendChild(d);
  });
}
document.getElementById('track-inp').addEventListener('keydown',e=>{if(e.key==='Enter')doTrack()});

const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>60)});
const io=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>io.observe(el));