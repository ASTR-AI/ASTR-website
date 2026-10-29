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

/** Return -1 while the hero is still landing, otherwise the active chapter. */
export function getHeroChapter(scrollY, landing, step) {
  if (
    ![scrollY, landing, step].every(Number.isFinite) ||
    step <= 0 ||
    scrollY < landing
  )
    return -1;
  return Math.min(2, Math.floor((scrollY - landing) / step));
}

/** A chapter link lands safely within that chapter's scroll interval. */
export function getHeroChapterTarget(index, landing, step) {
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index > 2 ||
    !Number.isFinite(landing) ||
    !Number.isFinite(step) ||
    step <= 0
  )
    return null;
  return landing + (index + 0.25) * step;
}

export function initHeroTransition(root) {
  if (!root) return () => {};
  instances.get(root)?.();
  const scene = root.querySelector('[data-hero-scene]');
  const pin = root.querySelector('[data-hero-pin]');
  const media = root.querySelector('.v-hero-media');
  const copy = root.querySelector('[data-hero-copy]');
  if (!scene || !pin || !media || !copy) return () => {};
  const chapters = [...(root.querySelectorAll?.('[data-hero-chapter]') || [])];
  const panels = [...(root.querySelectorAll?.('[data-hero-panel]') || [])];
  const chapterKeys = ['stock', 'reorder', 'activity'];
  const canSelect =
    chapters.length === 3 &&
    panels.length === 4 &&
    chapterKeys.every(
      (key, index) =>
        chapters[index].dataset.heroChapter === key &&
        panels.some((panel) => panel.dataset.heroPanel === key)
    ) &&
    panels.some((panel) => panel.dataset.heroPanel === 'overview');
  const win = root.ownerDocument.defaultView;
  const desktop = win.matchMedia('(min-width: 1024px) and (min-height: 700px)');
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = null;
  let disposed = false;
  let enabled = false;
  let geometry = null;
  let observer;
  let activeChapter = 0;
  let activePanel = null;
  const removeChapterListeners = [];

  function selectPanel(key) {
    if (!canSelect || activePanel === key) return;
    const previous = activePanel;
    activePanel = key;
    panels.forEach((panel) => {
      const active = panel.dataset.heroPanel === key;
      const leaving = previous !== null && panel.dataset.heroPanel === previous;
      panel.classList.toggle('is-current', active);
      panel.classList.toggle('is-entering', active && previous !== null);
      panel.classList.toggle('is-leaving', leaving);
      panel.setAttribute('aria-hidden', String(!active));
      panel.inert = !active;
    });
  }

  function selectChapter(index, { showPanel = true } = {}) {
    if (!canSelect) return;
    activeChapter = index;
    chapters.forEach((chapter, position) => {
      // Never hide a link that currently has keyboard focus.
      if (
        position !== index &&
        root.ownerDocument.activeElement !== chapter.querySelector('summary') &&
        chapter.contains(root.ownerDocument.activeElement)
      )
        return;
      chapter.open = position === index;
    });
    selectPanel(showPanel ? chapterKeys[index] : 'overview');
  }

  if (canSelect) {
    root.classList.toggle('v-hero-chapters-ready', true);
    panels.forEach((panel) => {
      panel.hidden = false;
    });
    chapters.forEach((chapter, index) => {
      const summary = chapter.querySelector('summary');
      const onClick = (event) => {
        event.preventDefault();
        if (enabled && geometry) {
          const target = getHeroChapterTarget(
            index,
            geometry.end,
            geometry.step
          );
          if (target !== null)
            win.scrollTo({ top: target, behavior: 'smooth' });
        } else {
          selectChapter(index);
        }
      };
      summary.addEventListener('click', onClick);
      removeChapterListeners.push(() =>
        summary.removeEventListener('click', onClick)
      );
    });
  }

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
    if (canSelect) {
      const chapter = getHeroChapter(win.scrollY, geometry.end, geometry.step);
      selectChapter(chapter < 0 ? 0 : chapter, { showPanel: chapter >= 0 });
    }
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
      if (canSelect) selectChapter(activeChapter);
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
    const chapterStep = win.innerHeight * 0.7;
    scene.style.setProperty('--hero-pin-top', `${top}px`);
    scene.style.setProperty('--hero-pin-height', `${height}px`);
    scene.style.setProperty('--hero-travel', `${travel + chapterStep * 3}px`);
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
      step: chapterStep,
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
    removeChapterListeners.forEach((remove) => remove());
    if (canSelect) {
      root.classList.remove('v-hero-chapters-ready');
      panels.forEach((panel) => {
        const initial = panel.dataset.heroPanel === 'overview';
        panel.hidden = !initial;
        panel.classList.toggle('is-current', initial);
        panel.classList.toggle('is-entering', false);
        panel.classList.toggle('is-leaving', false);
        panel.removeAttribute('aria-hidden');
        panel.inert = false;
      });
      chapters.forEach((chapter, index) => {
        chapter.open = index === 0;
      });
    }
    root.classList.remove('v-hero-motion');
    scene.removeAttribute('style');
    instances.delete(root);
  };
  instances.set(root, cleanup);
  return cleanup;
}
