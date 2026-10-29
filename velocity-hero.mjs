const instances = new WeakMap();
const clamp = (value) => Math.min(1, Math.max(0, value));

const HERO_LANDING_VIEWPORTS = 1.2;
const HERO_CHAPTER_VIEWPORTS = 1.0;

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

/** Return progress (0 to 1) for the requested chapter index along its scroll interval. */
export function getHeroChapterProgress(scrollY, landing, step, index) {
  if (
    ![scrollY, landing, step, index].every(Number.isFinite) ||
    step <= 0 ||
    index < 0 ||
    index > 2
  )
    return 0;
  const start = landing + index * step;
  return clamp((scrollY - start) / step);
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
  const panelOrder = ['overview', 'stock', 'reorder', 'activity'];
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
  const removePanelListeners = [];
  const bodyAnimations = new Map();
  const fills = chapters.map(
    (chapter) => chapter.querySelector?.('.v-hero-chapter-fill') || null
  );
  let lastProgress = [-1, -1, -1];

  let lastShift = null;
  let lastScale = null;
  let lastCopyOpacity = null;
  let lastCopyOffset = null;
  let lastChapter = null;
  let lastShowPanel = null;

  function settlePanels() {
    panels.forEach((panel) => {
      panel.classList.remove('is-entering', 'is-leaving', 'is-reverse');
      const isCurr = panel.dataset.heroPanel === activePanel;
      panel.classList.toggle('is-current', isCurr);
      panel.setAttribute('aria-hidden', String(!isCurr));
      panel.inert = !isCurr;
    });
  }

  function selectPanel(key) {
    if (!canSelect || activePanel === key) return;
    const previous = activePanel;
    activePanel = key;

    if (previous === null) {
      settlePanels();
      return;
    }

    const prevIndex = panelOrder.indexOf(previous);
    const nextIndex = panelOrder.indexOf(key);
    const isReverse =
      prevIndex !== -1 && nextIndex !== -1 && nextIndex < prevIndex;

    if (reduced.matches) {
      settlePanels();
      return;
    }

    panels.forEach((panel) => {
      const pKey = panel.dataset.heroPanel;
      if (pKey === key) {
        panel.classList.add('is-current', 'is-entering');
        panel.classList.toggle('is-reverse', isReverse);
        panel.classList.remove('is-leaving');
        panel.setAttribute('aria-hidden', 'false');
        panel.inert = false;
      } else if (pKey === previous) {
        panel.classList.add('is-leaving');
        panel.classList.toggle('is-reverse', isReverse);
        panel.classList.remove('is-current', 'is-entering');
        panel.setAttribute('aria-hidden', 'true');
        panel.inert = true;
      } else {
        panel.classList.remove(
          'is-current',
          'is-entering',
          'is-leaving',
          'is-reverse'
        );
        panel.setAttribute('aria-hidden', 'true');
        panel.inert = true;
      }
    });
  }

  function updateDisclosure(chapter, position, targetIndex) {
    const summary = chapter.querySelector('summary');
    const body = chapter.querySelector('.v-hero-chapter-body');
    const shouldBeOpen = position === targetIndex;

    const hasFocus =
      root.ownerDocument.activeElement !== summary &&
      chapter.contains(root.ownerDocument.activeElement);
    if (!shouldBeOpen && hasFocus) {
      return;
    }

    if (
      !body ||
      typeof body.animate !== 'function' ||
      reduced.matches ||
      !enabled
    ) {
      bodyAnimations.get(body)?.cancel();
      bodyAnimations.delete(body);
      chapter.open = shouldBeOpen;
      if (body) {
        body.style.removeProperty('height');
        body.style.removeProperty('overflow');
        body.style.removeProperty('opacity');
        body.inert = false;
      }
      return;
    }

    if (shouldBeOpen) {
      if (chapter.open && !bodyAnimations.has(body)) {
        return;
      }
      bodyAnimations.get(body)?.cancel();
      chapter.open = true;
      body.inert = false;
      body.style.overflow = 'hidden';
      const naturalHeight = body.scrollHeight || body.offsetHeight || 0;
      const anim = body.animate(
        [
          { height: '0px', opacity: 0 },
          { height: `${naturalHeight}px`, opacity: 1 },
        ],
        { duration: 220, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
      bodyAnimations.set(body, anim);
      anim.onfinish = () => {
        bodyAnimations.delete(body);
        body.style.removeProperty('height');
        body.style.removeProperty('overflow');
        body.style.removeProperty('opacity');
      };
      anim.oncancel = () => {
        bodyAnimations.delete(body);
      };
    } else {
      if (!chapter.open) {
        return;
      }
      bodyAnimations.get(body)?.cancel();
      const currentHeight = body.offsetHeight || body.scrollHeight || 0;
      body.style.overflow = 'hidden';
      body.inert = true;
      const anim = body.animate(
        [
          { height: `${currentHeight}px`, opacity: 1 },
          { height: '0px', opacity: 0 },
        ],
        { duration: 220, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
      bodyAnimations.set(body, anim);
      anim.onfinish = () => {
        bodyAnimations.delete(body);
        chapter.open = false;
        body.style.removeProperty('height');
        body.style.removeProperty('overflow');
        body.style.removeProperty('opacity');
        body.inert = false;
      };
      anim.oncancel = () => {
        bodyAnimations.delete(body);
      };
    }
  }

  function selectChapter(index, { showPanel = true } = {}) {
    if (!canSelect) return;
    activeChapter = index;
    chapters.forEach((chapter, position) => {
      updateDisclosure(chapter, position, index);
    });
    selectPanel(showPanel ? chapterKeys[index] : 'overview');
  }

  if (canSelect) {
    root.classList.toggle('v-hero-chapters-ready', true);
    panels.forEach((panel) => {
      panel.hidden = false;
      const onAnimEnd = (event) => {
        if (event.target !== panel) return;
        if (
          !event.animationName ||
          !event.animationName.startsWith('v-hero-fade-')
        )
          return;
        panel.classList.remove('is-entering', 'is-leaving', 'is-reverse');
        if (panel.dataset.heroPanel !== activePanel) {
          panel.classList.remove('is-current');
          panel.setAttribute('aria-hidden', 'true');
          panel.inert = true;
        }
      };
      panel.addEventListener('animationend', onAnimEnd);
      panel.addEventListener('animationcancel', onAnimEnd);
      removePanelListeners.push(() => {
        panel.removeEventListener('animationend', onAnimEnd);
        panel.removeEventListener('animationcancel', onAnimEnd);
      });
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
          if (target !== null) {
            win.scrollTo({
              top: target,
              behavior: reduced.matches ? 'auto' : 'smooth',
            });
          }
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
    const shift = geometry.shift * state.eased;
    const scale = 1 + (geometry.scale - 1) * state.eased;
    const copyOpacity = state.copyOpacity;
    const copyOffset = 12 * (1 - state.eased);

    if (shift !== lastShift || scale !== lastScale) {
      lastShift = shift;
      lastScale = scale;
      media.style.transform = `translate(calc(-50% + ${shift}px), -50%) scale(${scale})`;
    }

    if (copyOpacity !== lastCopyOpacity || copyOffset !== lastCopyOffset) {
      lastCopyOpacity = copyOpacity;
      lastCopyOffset = copyOffset;
      copy.style.opacity = String(copyOpacity);
      copy.style.transform = `translateY(calc(-50% + ${copyOffset}px))`;
    }

    if (canSelect) {
      const chapter = getHeroChapter(win.scrollY, geometry.end, geometry.step);
      const targetChapter = chapter < 0 ? 0 : chapter;
      const showPanel = chapter >= 0;
      if (targetChapter !== lastChapter || showPanel !== lastShowPanel) {
        lastChapter = targetChapter;
        lastShowPanel = showPanel;
        selectChapter(targetChapter, { showPanel });
      }

      if (fills.some(Boolean)) {
        for (let i = 0; i < chapters.length; i++) {
          const p = getHeroChapterProgress(
            win.scrollY,
            geometry.end,
            geometry.step,
            i
          );
          if (p !== lastProgress[i]) {
            lastProgress[i] = p;
            if (fills[i]) {
              fills[i].style.transform = `scaleX(${p})`;
            }
          }
        }
      }
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
      media.style.removeProperty('transform');
      copy.style.removeProperty('opacity');
      copy.style.removeProperty('transform');
      geometry = null;
      lastShift = null;
      lastScale = null;
      lastCopyOpacity = null;
      lastCopyOffset = null;
      lastChapter = null;
      lastShowPanel = null;
      lastProgress = [-1, -1, -1];
      fills.forEach((fill) => fill?.style?.removeProperty?.('transform'));
      if (canSelect) {
        settlePanels();
        selectChapter(activeChapter);
      }
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
    const travel = win.innerHeight * HERO_LANDING_VIEWPORTS;
    const chapterStep = win.innerHeight * HERO_CHAPTER_VIEWPORTS;
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
    removePanelListeners.forEach((remove) => remove());
    bodyAnimations.forEach((anim) => anim.cancel());
    bodyAnimations.clear();
    lastProgress = [-1, -1, -1];
    fills.forEach((fill) => fill?.style?.removeProperty?.('transform'));

    if (canSelect) {
      root.classList.remove('v-hero-chapters-ready');
      panels.forEach((panel) => {
        const initial = panel.dataset.heroPanel === 'overview';
        panel.hidden = !initial;
        panel.classList.toggle('is-current', initial);
        panel.classList.remove('is-entering', 'is-leaving', 'is-reverse');
        panel.removeAttribute('aria-hidden');
        panel.inert = false;
      });
      chapters.forEach((chapter, index) => {
        chapter.open = index === 0;
        const body = chapter.querySelector('.v-hero-chapter-body');
        if (body) {
          body.style.removeProperty('height');
          body.style.removeProperty('overflow');
          body.style.removeProperty('opacity');
          body.inert = false;
        }
      });
    }
    root.classList.remove('v-hero-motion');
    media.style.removeProperty('transform');
    copy.style.removeProperty('opacity');
    copy.style.removeProperty('transform');
    scene.removeAttribute('style');
    instances.delete(root);
  };
  instances.set(root, cleanup);
  return cleanup;
}
