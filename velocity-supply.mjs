import { initMobileSupplyDemo } from './velocity-supply-mobile.mjs';

/** Automatic hospital supply shuffle; progressive enhancement with static fallbacks. */
const STAGES = [
  {
    id: 'request',
    status: 'Request raised',
    caption: 'Hospital store requests medicines from Central pharmacy.',
  },
  {
    id: 'pick',
    status: 'Stock prepared',
    caption: 'Central pharmacy prepares the requested medicines.',
  },
  {
    id: 'dispatch',
    status: 'Dispatched',
    caption: 'Central pharmacy records dispatch to Hospital store.',
  },
  {
    id: 'receive',
    status: 'Receipt recorded',
    caption: 'Hospital store reviews the delivery and records receipt.',
  },
];
const STAGE_DURATION = 5000;
const activeControllers = new WeakMap();

function initAutomaticSupplyDemo(root, options = {}) {
  if (!root?.querySelector) return () => {};
  activeControllers.get(root)?.();
  const win = options.window ?? (typeof window !== 'undefined' ? window : null);
  const doc =
    options.document ?? (typeof document !== 'undefined' ? document : null);
  const demo = root.matches?.('[data-supply-demo]')
    ? root
    : root.querySelector('[data-supply-demo]');
  const deck = root.querySelector('[data-supply-card]');
  const cards = Array.from(root.querySelectorAll('.v-supply-shuffle-card'));
  const steps = Array.from(root.querySelectorAll('[data-supply-step]'));
  const controls = root.querySelector('[data-supply-controls]');
  const playback = root.querySelector('[data-supply-playback]');
  const counter = root.querySelector('[data-supply-counter]');
  if (!demo || !deck || steps.length !== 4) return () => {};
  const motion = win?.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (motion?.matches || !win?.IntersectionObserver) return () => {};
  const now = options.now ?? (() => win.performance.now());
  let index = 0;
  let elapsed = 0;
  let lastTime = null;
  let rafId = null;
  let visible = false;
  let paused = false;
  let disposed = false;
  let staticMode = false;
  let observer;

  function render(outgoing = null) {
    demo.setAttribute('data-supply-state', STAGES[index].id);
    cards.forEach((card, i) => {
      const tier = (i - index + cards.length) % cards.length;
      for (let n = 0; n < cards.length; n++) card.classList.remove(`tier-${n}`);
      card.classList.add(`tier-${tier}`);
      card.setAttribute('aria-hidden', String(tier !== 0));
      if (i === outgoing) card.setAttribute('data-shuffling', '');
      else card.removeAttribute('data-shuffling');
    });
    // Legacy single-document fallback; each shuffle document keeps its own content.
    if (!cards.length) {
      const status = root.querySelector('[data-supply-status]');
      const caption = root.querySelector('[data-supply-caption]');
      if (status) status.textContent = STAGES[index].status;
      if (caption) caption.textContent = STAGES[index].caption;
    }
    steps.forEach((step) => {
      const current =
        step.getAttribute('data-supply-step') === STAGES[index].id;
      step.classList.toggle('is-active', current);
      if (current) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
    if (counter) counter.textContent = `Step ${index + 1} of 4`;
    if (playback) {
      playback.textContent = paused ? 'Resume' : 'Pause';
      playback.setAttribute(
        'aria-label',
        `${paused ? 'Resume' : 'Pause'} workflow animation`
      );
    }
  }
  function stop() {
    if (rafId !== null) win.cancelAnimationFrame(rafId);
    rafId = null;
    lastTime = null;
  }
  function canPlay() {
    return (
      !disposed &&
      !staticMode &&
      visible &&
      !doc?.hidden &&
      !paused &&
      !motion?.matches
    );
  }
  function start() {
    if (!canPlay() || rafId !== null) return;
    lastTime = now();
    rafId = win.requestAnimationFrame(tick);
  }
  function tick() {
    rafId = null;
    if (!canPlay()) return;
    const time = now();
    elapsed += Math.max(0, time - lastTime);
    lastTime = time;
    if (elapsed >= STAGE_DURATION) {
      const outgoing = index;
      index = (index + Math.floor(elapsed / STAGE_DURATION)) % STAGES.length;
      elapsed %= STAGE_DURATION;
      render(outgoing);
    }
    rafId = win.requestAnimationFrame(tick);
  }
  function onPlayback() {
    paused = !paused;
    if (paused) stop();
    render();
    start();
  }
  function onVisibility() {
    if (doc?.hidden) stop();
    else start();
  }
  function onAnimationEnd(event) {
    if (event.target?.hasAttribute?.('data-shuffling'))
      event.target.removeAttribute('data-shuffling');
  }
  function showStatic() {
    demo.removeAttribute('data-supply-enhanced');
    cards.forEach((card) => {
      card.removeAttribute('aria-hidden');
      card.removeAttribute('data-shuffling');
    });
    if (controls) controls.hidden = true;
  }
  function onMotion(event) {
    if (!event.matches) return;
    staticMode = true;
    stop();
    index = 3;
    render();
    showStatic();
  }
  function cleanup() {
    if (disposed) return;
    disposed = true;
    stop();
    observer?.disconnect();
    playback?.removeEventListener('click', onPlayback);
    deck.removeEventListener?.('animationend', onAnimationEnd);
    doc?.removeEventListener?.('visibilitychange', onVisibility);
    motion?.removeEventListener?.('change', onMotion);
    showStatic();
    activeControllers.delete(root);
  }
  try {
    observer = new win.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target !== deck || disposed || staticMode) continue;
          visible =
            entry.isIntersecting && (entry.intersectionRatio ?? 1) >= 0.25;
          if (visible) {
            render();
            start();
          } else stop();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(deck);
  } catch {
    cleanup();
    return () => {};
  }
  demo.setAttribute('data-supply-enhanced', '');
  if (cards.length) render();
  if (controls) {
    controls.removeAttribute('hidden');
    controls.hidden = false;
  }
  playback?.addEventListener('click', onPlayback);
  deck.addEventListener?.('animationend', onAnimationEnd);
  doc?.addEventListener?.('visibilitychange', onVisibility);
  motion?.addEventListener?.('change', onMotion);
  activeControllers.set(root, cleanup);
  return cleanup;
}

// The preview has different interaction policies at the phone breakpoint.
const responsiveControllers = new WeakMap();
export function initSupplyDemo(root, options = {}) {
  if (!root?.querySelector) return () => {};
  responsiveControllers.get(root)?.();
  const win = options.window ?? (typeof window !== 'undefined' ? window : null);
  const phone = win?.matchMedia?.('(max-width: 767px)');
  let modeCleanup = () => {};
  function configure() {
    modeCleanup();
    modeCleanup = phone?.matches
      ? initMobileSupplyDemo(root)
      : initAutomaticSupplyDemo(root, options);
  }
  configure();
  phone?.addEventListener?.('change', configure);
  let disposed = false;
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    phone?.removeEventListener?.('change', configure);
    modeCleanup();
    responsiveControllers.delete(root);
  };
  responsiveControllers.set(root, cleanup);
  return cleanup;
}
