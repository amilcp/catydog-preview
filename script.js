(()=>{
const root=document.getElementById('catydog-site');
if(!root)return;
const toggle=root.querySelector('.cd-menu');
const nav=root.querySelector('#cd-navigation');
function closeMenu(){nav.classList.remove('cd-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');nav.classList.toggle('cd-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!e.target.closest('.cd-navbar'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const wasOpen=toggle.getAttribute('aria-expanded')==='true';closeMenu();if(wasOpen)toggle.focus();}});
window.matchMedia('(min-width:801px)').addEventListener('change',closeMenu);
root.querySelector('#cd-year').textContent=new Date().getFullYear();
const reduce=window.matchMedia('(prefers-reduced-motion:reduce)');
if('IntersectionObserver' in window&&!reduce.matches){
 root.classList.add('cd-motion');
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('cd-visible',e.isIntersecting)),{threshold:0.05});
 root.querySelectorAll('[data-cd-reveal]').forEach(el=>{el.classList.add('cd-reveal');observer.observe(el);});
}
const paws=[...root.querySelectorAll('[data-cd-paw]')];
const hero=root.querySelector('.cd-hero');
const stage=root.querySelector('.cd-pet-stage');
let pending=false;
function draw(){
 pending=false;const vh=window.innerHeight;
 for(const el of paws){
  const top=el.parentElement.getBoundingClientRect().top+el.offsetTop;
  const p=reduce.matches?1:Math.max(0,Math.min(1,(vh*.87-top)/(vh*.46)));
  const ease=p*p*(3-2*p);const side=el.dataset.side==='left'?-1:1;
  el.style.setProperty('--cd-paw-opacity',ease.toFixed(3));
  el.style.setProperty('--cd-paw-x',(side*(1-ease)*el.offsetWidth*.83).toFixed(1)+'px');
  el.style.setProperty('--cd-paw-y',((1-ease)*35).toFixed(1)+'px');
 }
 const drift=reduce.matches?0:Math.max(-30,Math.min(0,hero.getBoundingClientRect().top*.055));
 stage.style.setProperty('--cd-hero-drift',drift.toFixed(1)+'px');
}
function schedule(){if(!pending){pending=true;requestAnimationFrame(draw);}}
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});reduce.addEventListener('change',schedule);
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
 stage.addEventListener('pointermove',e=>{if(reduce.matches)return;const box=stage.getBoundingClientRect();stage.style.setProperty('--cd-pet-x',((e.clientX-box.left)/box.width*14-7).toFixed(1)+'px');stage.style.setProperty('--cd-pet-y',((e.clientY-box.top)/box.height*10-5).toFixed(1)+'px');});
 stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--cd-pet-x','0px');stage.style.setProperty('--cd-pet-y','0px');});
}
schedule();
})();
