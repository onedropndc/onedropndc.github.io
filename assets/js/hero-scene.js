/* Decorative, bounded scroll motion; content stays usable without JavaScript. */
const hero = document.querySelector('.od-hero');
const scene = hero?.querySelector('.od-hero-scene');
if (hero && scene && window.matchMedia) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let queued = false;
  const update = () => {
    queued = false;
    if (reduced.matches) { scene.style.removeProperty('--hero-shift'); return; }
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const shift = Math.min(32, Math.max(0, -rect.top * 0.055));
    scene.style.setProperty('--hero-shift', `${shift.toFixed(1)}px`);
  };
  const requestUpdate = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', requestUpdate, { passive:true });
  window.addEventListener('resize', requestUpdate, { passive:true });
  reduced.addEventListener?.('change', requestUpdate);
  requestUpdate();
}
