// ─── SCROLL REVEAL ───
document.documentElement.classList.add('js-on');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.05 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── COUNTER ANIMATION ───
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const dur = 1600, step = target / (dur / 16);
  let cur = 0;
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = Math.floor(cur);
  }, 16);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.s-num[data-target]').forEach(n => counterObs.observe(n));

// ─── FORM ───
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const privacy = document.getElementById('privacy');
    if (!privacy.checked) { privacy.focus(); return; }
    const btn = document.getElementById('formSubmit');
    const label = document.getElementById('submitLabel');
    const spinner = document.getElementById('submitSpinner');
    btn.disabled = true; label.style.display = 'none'; spinner.style.display = 'inline';
    try {
      const res = await fetch(form.action, {
        method: 'POST', body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
      } else {
        alert('Something went wrong. Please email us directly at info@stenvisbi.com');
        btn.disabled = false; label.style.display = 'inline'; spinner.style.display = 'none';
      }
    } catch {
      alert('Network error. Please try WhatsApp or email instead.');
      btn.disabled = false; label.style.display = 'inline'; spinner.style.display = 'none';
    }
  });
}

// ─── FAQ ───
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
