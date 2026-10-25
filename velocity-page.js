import './components.js';
import { inject } from '@vercel/analytics';

inject();
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktop = window.matchMedia(
  '(min-width: 1024px) and (min-height: 720px)'
);
const frame = document.querySelector('.v-sticky-frame');
const callouts = [...document.querySelectorAll('[data-inventory-step]')];
let observer;

function updateMotion() {
  observer?.disconnect();
  document
    .querySelectorAll('.is-active')
    .forEach((el) => el.classList.remove('is-active'));
  const fits = frame && frame.offsetHeight < window.innerHeight - 180;
  frame?.classList.toggle(
    'can-stick',
    desktop.matches && fits && !preference.matches
  );
  if (preference.matches || !('IntersectionObserver' in window)) return;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target.hasAttribute('data-inventory-step')) {
          callouts.forEach((el) =>
            el.classList.toggle('is-active', el === entry.target)
          );
        } else {
          entry.target.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-20% 0px -30% 0px', threshold: 0.2 }
  );
  [...callouts, ...document.querySelectorAll('[data-supply-step]')].forEach(
    (el) => observer.observe(el)
  );
}
let resizeFrame;
function onResize() {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(updateMotion);
}
preference.addEventListener('change', updateMotion);
window.addEventListener('resize', onResize);
window.addEventListener('pageshow', updateMotion);
window.addEventListener('pagehide', () => {
  observer?.disconnect();
  cancelAnimationFrame(resizeFrame);
});
updateMotion();
