const instances = new WeakMap();
const clamp = (value) => Math.min(1, Math.max(0, value));

/** Reversible scroll progress; no playback state or scroll interception. */
export function getHeroTransition(scrollY, start, end) {
  const progress =
    [scrollY, start, end].every(Number.isFinite) && end > start
      ? clamp((scrollY - start) / (end - start))
      : 0;
  return {
    progress,
    eased: progress * progress * (3 - 2 * progress),
    copyOpacity: clamp((progress - 0.45) / 0.45),
  };
}

export function initHeroTransition(root) {
  if (!root) return () => {};
  instances.get(root)?.();
  const scene = root.querySelector('[data-hero-scene]');
  const pin = root.querySelector('[data-hero-pin]');
  const media = root.querySelector('.v-hero-media');
  const copy = root.querySelector('[data-hero-copy]');
  if (!scene || !pin || !media || !copy) return () => {};
  const win = root.ownerDocument.defaultView;
  const desktop = win.matchMedia('(min-width: 1024px) and (min-height: 700px)');
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = null;
  let disposed = false;
  let enabled = false;
  let geometry = null;
  let observer;

  function render() {
    frame = null;
    if (!enabled || !geometry) return;
    const state = getHeroTransition(win.scrollY, geometry.start, geometry.end);
    const scale = 1 + (geometry.scale - 1) * state.eased;
    scene.style.setProperty(
      '--hero-shift',
      `${geometry.shift * state.eased}px`
    );
    scene.style.setProperty('--hero-scale', String(scale));
    scene.style.setProperty('--hero-copy-opacity', String(state.copyOpacity));
    scene.style.setProperty(
      '--hero-copy-offset',
      `${12 * (1 - state.eased)}px`
    );
  }

  function schedule() {
    if (enabled && frame === null) frame = win.requestAnimationFrame(render);
  }

  function measure() {
    if (disposed) return;
    enabled = desktop.matches && !reduced.matches;
    root.classList.toggle('v-hero-motion', enabled);
    if (!enabled) {
      scene.removeAttribute('style');
      geometry = null;
      if (frame !== null) win.cancelAnimationFrame(frame);
      frame = null;
      return;
    }
    const header =
      Number.parseFloat(
        win.getComputedStyle(root).getPropertyValue('--v-header-offset')
      ) || 88;
    const top = header + 24;
    const height = win.innerHeight - top - 32;
    const travel = win.innerHeight * 0.8;
    scene.style.setProperty('--hero-pin-top', `${top}px`);
    scene.style.setProperty('--hero-pin-height', `${height}px`);
    scene.style.setProperty(
      '--hero-travel',
      `${travel + win.innerHeight * 0.2}px`
    );
    // Fit the full dashboard plus browser bar inside the pinned viewport.
    const image = media.querySelector('img');
    const ratio = image
      ? Number(image.getAttribute('height')) /
        Number(image.getAttribute('width'))
      : 0.627;
    const width = Math.min(1040, scene.clientWidth, (height - 50) / ratio);
    scene.style.setProperty('--hero-media-width', `${width}px`);
    const start = scene.getBoundingClientRect().top + win.scrollY - top;
    geometry = {
      start,
      end: start + travel,
      shift: scene.clientWidth * 0.2,
      scale: Math.min(1, (scene.clientWidth * 0.6) / width),
    };
    render();
  }

  win.addEventListener('scroll', schedule, { passive: true });
  win.addEventListener('resize', measure);
  desktop.addEventListener('change', measure);
  reduced.addEventListener('change', measure);
  const image = media.querySelector('img');
  image?.addEventListener('load', measure);
  if (win.ResizeObserver) {
    observer = new win.ResizeObserver(measure);
    observer.observe(root);
  }
  root.ownerDocument.fonts?.ready.then(() => {
    if (!disposed) measure();
  });
  measure();

  const cleanup = () => {
    disposed = true;
    enabled = false;
    if (frame !== null) win.cancelAnimationFrame(frame);
    observer?.disconnect();
    win.removeEventListener('scroll', schedule);
    win.removeEventListener('resize', measure);
    desktop.removeEventListener('change', measure);
    reduced.removeEventListener('change', measure);
    image?.removeEventListener('load', measure);
    root.classList.remove('v-hero-motion');
    scene.removeAttribute('style');
    instances.delete(root);
  };
  instances.set(root, cleanup);
  return cleanup;
}
