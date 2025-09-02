document.addEventListener('DOMContentLoaded', ()=> {
  // small helpers
  const select = s=> document.querySelector(s);
  const selectAll = s=> document.querySelectorAll(s);

  // NAV: mobile toggle
  const mobileBtn = select('#mobileMenuBtn');
  if(mobileBtn){
    mobileBtn.addEventListener('click', ()=>{
      const m = document.createElement('div');
      m.style.position='fixed'; m.style.right='14px'; m.style.top='72px'; m.style.background='rgba(5,7,10,0.96)'; m.style.padding='12px'; m.style.borderRadius='10px'; m.style.zIndex=9999;
      m.style.boxShadow='0 12px 40px rgba(2,6,23,0.6)';
      m.innerHTML = '<a href="index.html#projects" style="display:block;padding:8px;color:#e6eef6">Work</a><a href="services.html" style="display:block;padding:8px;color:#e6eef6">Services</a><a href="about.html" style="display:block;padding:8px;color:#e6eef6">About</a><a href="contact.html" style="display:block;padding:8px;color:#e6eef6">Contact</a>';
      document.body.appendChild(m);
      setTimeout(()=> m.remove(), 4000);
    });
  }
  const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Highlight active nav link based on current page
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
});


  // GSAP: logo intro on index page
  if(typeof gsap !== 'undefined'){
    // simple logo intro (applies to any element with .logo-mark)
    gsap.from('.logo-mark', {duration:0.9, scale:0.6, opacity:0, ease:'back.out(1.4)', delay:0.12});
    // hero headline reveal
    gsap.utils.toArray('.headline, .eyebrow, .lead, .hero-actions').forEach((el,i)=>{
      gsap.fromTo(el, {y:18, opacity:0}, {y:0, opacity:1, duration:0.8, delay:0.25 + i*0.06, ease:'power3.out'});
    });

    // scroll triggers for sections with .reveal
    if(gsap && ScrollTrigger){
      gsap.utils.toArray('.reveal').forEach((section)=>{
        gsap.fromTo(section, {y:18, opacity:0}, {
          y:0, opacity:1, duration:0.8, ease:'power3.out',
          scrollTrigger: {trigger: section, start:'top 80%', toggleActions:'play none none none'}
        });
      });
    }
  }

  // project modal openers
  selectAll('.proj').forEach(card => {
    card.addEventListener('click', ()=> openProjModal(card));
    card.addEventListener('keydown', (e)=> { if(e.key === 'Enter') openProjModal(card); });
  });

  function openProjModal(card){
    const title = card.dataset.title || 'Project';
    const desc = card.dataset.desc || '';
    const img = card.dataset.img || '';
    const root = document.getElementById('modalRoot');
    root.innerHTML = `
      <div class="modal-backdrop" style="position:fixed;inset:0;display:grid;place-items:center;background:rgba(2,6,23,0.6);z-index:60">
        <div style="width:92%;max-width:920px;background:#071017;border-radius:12px;padding:18px;border:1px solid rgba(255,255,255,0.04);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <div style="font-weight:800">${title}</div>
            <button id="closeModal" style="background:transparent;border:none;color:#cbd5e1;font-weight:700;cursor:pointer;font-size:18px">✕</button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div style="min-height:200px;background-image:url('${img}'); background-size:cover; background-position:center; border-radius:8px"></div>
            <div>
              <p style="color:#94a3b8">${desc}</p>
              <p style="margin-top:10px;font-size:13px;color:#9ca3af">Services: Compositing • Roto • Paint • CG</p>
              <div style="margin-top:14px"><button id="contactFromModal" class="cta-primary" style="padding:10px 14px;border-radius:999px;background:linear-gradient(90deg,var(--pink),var(--teal));color:#041018;border:none">Discuss Project</button></div>
            </div>
          </div>
        </div>
      </div>
    `;
    root.querySelector('#closeModal').addEventListener('click', ()=> root.innerHTML = '');
    root.querySelector('.modal-backdrop').addEventListener('click', (e)=> { if(e.target.classList.contains('modal-backdrop')) root.innerHTML = ''; });
    root.querySelector('#contactFromModal').addEventListener('click', ()=>{
      root.innerHTML = '';
      window.location.href = 'contact.html';
    });
  }

  // partners auto scroll (simple)
  (function(){
    const el = document.getElementById('partners');
    if(!el) return;
    let pos = 0, dir = 1;
    setInterval(()=>{
      pos += dir * 1.6;
      if(pos > el.scrollWidth - el.clientWidth) dir = -1;
      if(pos < 0) dir = 1;
      el.scrollLeft = pos;
    }, 30);
  })();

  // contact demo
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      form.reset();
    });
  }

});
