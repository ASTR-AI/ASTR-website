import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getHeroTransition,
  getHeroChapterProgress,
} from '../velocity-hero.mjs';

test('getHeroChapterProgress clamps before start, tracks proportionately, and fills to release', () => {
  // Before landing
  assert.equal(getHeroChapterProgress(500, 1000, 500, 0), 0);
  assert.equal(getHeroChapterProgress(1000, 1000, 500, 0), 0);

  // Chapter 0 (1000 to 1500)
  assert.equal(getHeroChapterProgress(1250, 1000, 500, 0), 0.5);
  assert.equal(getHeroChapterProgress(1500, 1000, 500, 0), 1);
  assert.equal(getHeroChapterProgress(1800, 1000, 500, 0), 1);

  // Chapter 1 (1500 to 2000)
  assert.equal(getHeroChapterProgress(1250, 1000, 500, 1), 0);
  assert.equal(getHeroChapterProgress(1500, 1000, 500, 1), 0);
  assert.equal(getHeroChapterProgress(1750, 1000, 500, 1), 0.5);
  assert.equal(getHeroChapterProgress(2000, 1000, 500, 1), 1);

  // Chapter 2 (2000 to 2500)
  assert.equal(getHeroChapterProgress(1750, 1000, 500, 2), 0);
  assert.equal(getHeroChapterProgress(2000, 1000, 500, 2), 0);
  assert.equal(getHeroChapterProgress(2250, 1000, 500, 2), 0.5);
  assert.equal(getHeroChapterProgress(2500, 1000, 500, 2), 1);
  assert.equal(getHeroChapterProgress(3000, 1000, 500, 2), 1);

  // Reversing restores identical progress
  assert.equal(getHeroChapterProgress(1750, 1000, 500, 1), 0.5);

  // Invalid or degenerate cases
  assert.equal(getHeroChapterProgress(NaN, 1000, 500, 0), 0);
  assert.equal(getHeroChapterProgress(1250, 1000, 0, 0), 0);
  assert.equal(getHeroChapterProgress(1250, 1000, 500, -1), 0);
  assert.equal(getHeroChapterProgress(1250, 1000, 500, 3), 0);
});

test('hero stays at its initial state before pinning and lands after the range', () => {
  assert.deepEqual(getHeroTransition(50, 100, 500), {
    progress: 0,
    eased: 0,
    copyOpacity: 0,
  });
  assert.deepEqual(getHeroTransition(700, 100, 500), {
    progress: 1,
    eased: 1,
    copyOpacity: 1,
  });
});
test('mid-scroll produces a real intermediate position and readable incoming copy', () => {
  const state = getHeroTransition(300, 100, 500);
  assert.equal(state.progress, 0.5);
  assert.equal(state.eased, 0.5);
  assert.ok(state.copyOpacity > 0 && state.copyOpacity < 1);
});
test('reverse scrolling restores the same geometry without retained playback state', () => {
  const earlier = getHeroTransition(200, 100, 500);
  getHeroTransition(500, 100, 500);
  assert.deepEqual(getHeroTransition(200, 100, 500), earlier);
});
test('invalid or collapsed ranges leave the screen in its static initial state', () => {
  for (const args of [
    [100, 100, 100],
    [100, 500, 100],
    [NaN, 100, 500],
  ]) {
    assert.deepEqual(getHeroTransition(...args), {
      progress: 0,
      eased: 0,
      copyOpacity: 0,
    });
  }
});
test('easing approaches both ends gently and does not overshoot', () => {
  assert.ok(getHeroTransition(101, 100, 500).eased < 0.001);
  assert.ok(getHeroTransition(499, 100, 500).eased > 0.999);
  for (let y = 0; y <= 600; y += 10) {
    const state = getHeroTransition(y, 100, 500);
    assert.ok(state.eased >= 0 && state.eased <= 1);
    assert.ok(state.copyOpacity >= 0 && state.copyOpacity <= 1);
  }
});

import { initHeroTransition } from '../velocity-hero.mjs';

function createStyleObject(map) {
  return new Proxy(
    {},
    {
      get(target, prop) {
        if (prop === 'setProperty') return (key, value) => map.set(key, value);
        if (prop === 'removeProperty') return (key) => map.delete(key);
        if (prop === 'getPropertyValue') return (key) => map.get(key) || '';
        return map.get(prop);
      },
      set(target, prop, value) {
        map.set(prop, value);
        return true;
      },
    }
  );
}

function createHeroFixture() {
  const sceneStyles = new Map();
  const mediaStyles = new Map();
  const copyStyles = new Map();
  const classes = new Set();
  const listeners = new Map();
  const attributes = new Map();
  const mediaQueries = new Map();
  const image = {
    getAttribute: (name) => (name === 'height' ? '1842' : '2940'),
    addEventListener() {},
    removeEventListener() {},
  };
  const win = {
    innerHeight: 900,
    scrollY: 0,
    lastScrollTo: null,
    scrollTo(options) {
      this.lastScrollTo = options;
      if (typeof options === 'object' && options !== null && 'top' in options) {
        this.scrollY = options.top;
      }
    },
    matchMedia(query) {
      if (!mediaQueries.has(query))
        mediaQueries.set(query, {
          matches: !query.includes('reduce'),
          callbacks: new Set(),
          addEventListener(_, callback) {
            this.callbacks.add(callback);
          },
          removeEventListener(_, callback) {
            this.callbacks.delete(callback);
          },
        });
      return mediaQueries.get(query);
    },
    getComputedStyle: () => ({ getPropertyValue: () => '88' }),
    addEventListener: (key, value) => listeners.set(key, value),
    removeEventListener: (key) => listeners.delete(key),
    requestAnimationFrame: (callback) => {
      win.pendingFrame = callback;
      return 1;
    },
    cancelAnimationFrame() {},
  };
  const scene = {
    clientWidth: 1184,
    getBoundingClientRect: () => ({ top: 500 - win.scrollY }),
    style: createStyleObject(sceneStyles),
    removeAttribute: (name) => {
      if (name === 'style') sceneStyles.clear();
    },
  };
  const copy = {
    style: createStyleObject(copyStyles),
    setAttribute: (key, value) => attributes.set(key, value),
    removeAttribute: (key) => attributes.delete(key),
  };
  const media = {
    style: createStyleObject(mediaStyles),
    querySelector: () => image,
  };
  const nodes = {
    '[data-hero-scene]': scene,
    '[data-hero-pin]': {},
    '.v-hero-media': media,
    '[data-hero-copy]': copy,
  };
  const root = {
    ownerDocument: { defaultView: win },
    querySelector: (key) => nodes[key],
    classList: {
      toggle(key, on) {
        if (on) classes.add(key);
        else classes.delete(key);
      },
      remove: (key) => classes.delete(key),
    },
  };
  return {
    root,
    styles: sceneStyles,
    sceneStyles,
    mediaStyles,
    copyStyles,
    classes,
    listeners,
    attributes,
    mediaQueries,
    win,
  };
}

const FIXTURE_DOC_TOP = 500;
const FIXTURE_HEADER_OFFSET = 88;
const FIXTURE_PIN_TOP = FIXTURE_HEADER_OFFSET + 24; // 112
const FIXTURE_START = FIXTURE_DOC_TOP - FIXTURE_PIN_TOP; // 388
const FIXTURE_LANDING_TRAVEL = 900 * 1.2; // 1080
const FIXTURE_CHAPTER_STEP = 900 * 1.0; // 900
const FIXTURE_TOTAL_TRAVEL = FIXTURE_LANDING_TRAVEL + FIXTURE_CHAPTER_STEP * 3; // 3780
const FIXTURE_LANDING = FIXTURE_START + FIXTURE_LANDING_TRAVEL; // 1468
const FIXTURE_CH0_MID = FIXTURE_LANDING + FIXTURE_CHAPTER_STEP * 0.5; // 1918
const FIXTURE_CH1_MID = FIXTURE_LANDING + FIXTURE_CHAPTER_STEP * 1.5; // 2818
const FIXTURE_CH2_MID = FIXTURE_LANDING + FIXTURE_CHAPTER_STEP * 2.5; // 3718
const FIXTURE_RELEASE = FIXTURE_LANDING + FIXTURE_CHAPTER_STEP * 3.0; // 4168

test('benefit remains available to assistive technology before visual reveal', () => {
  const fixture = createHeroFixture();
  const cleanup = initHeroTransition(fixture.root);
  assert.notEqual(fixture.attributes.get('aria-hidden'), 'true');
  cleanup();
});

test('motion preference changes restore static layout and cleanup removes listeners', () => {
  const fixture = createHeroFixture();
  const cleanup = initHeroTransition(fixture.root);
  assert.equal(fixture.classes.has('v-hero-motion'), true);
  const reduced = fixture.mediaQueries.get('(prefers-reduced-motion: reduce)');
  reduced.matches = true;
  for (const callback of reduced.callbacks) callback();
  assert.equal(fixture.classes.has('v-hero-motion'), false);
  assert.equal(fixture.styles.size, 0);
  reduced.matches = false;
  for (const callback of reduced.callbacks) callback();
  assert.equal(fixture.classes.has('v-hero-motion'), true);
  cleanup();
  assert.equal(fixture.listeners.size, 0);
  assert.equal(fixture.styles.size, 0);
  assert.equal(fixture.classes.size, 0);
  for (const query of fixture.mediaQueries.values())
    assert.equal(query.callbacks.size, 0);
});

test('chapters follow the scroll after the hero lands and clamp at both ends', async () => {
  const { getHeroChapter } = await import('../velocity-hero.mjs');
  assert.equal(getHeroChapter(999, 1000, 500), -1);
  assert.equal(getHeroChapter(1000, 1000, 500), 0);
  assert.equal(getHeroChapter(1499, 1000, 500), 0);
  assert.equal(getHeroChapter(1500, 1000, 500), 1);
  assert.equal(getHeroChapter(2000, 1000, 500), 2);
  assert.equal(getHeroChapter(5000, 1000, 500), 2);
  assert.equal(getHeroChapter(NaN, 1000, 500), -1);
  assert.equal(getHeroChapter(1000, 1000, 0), -1);
});

test('chapter links target a stable point within the requested chapter', async () => {
  const { getHeroChapterTarget, getHeroChapter } =
    await import('../velocity-hero.mjs');
  for (const index of [0, 1, 2]) {
    const target = getHeroChapterTarget(index, 1000, 500);
    assert.equal(getHeroChapter(target, 1000, 500), index);
  }
  assert.equal(getHeroChapterTarget(-1, 1000, 500), null);
  assert.equal(getHeroChapterTarget(3, 1000, 500), null);
  assert.equal(getHeroChapterTarget(1, 1000, 0), null);
});

function withChapterControls(fixture) {
  const keys = ['stock', 'reorder', 'activity'];
  const chapters = keys.map((key) => {
    const callbacks = new Map();
    const summary = {
      addEventListener: (name, callback) => callbacks.set(name, callback),
      removeEventListener: (name) => callbacks.delete(name),
      click: () => callbacks.get('click')?.({ preventDefault() {} }),
    };
    const bodyStyles = new Map();
    const bodyAnimations = [];
    const body = {
      scrollHeight: 100,
      offsetHeight: 100,
      inert: false,
      style: createStyleObject(bodyStyles),
      animate(keyframes, options) {
        let onfinish = null;
        let oncancel = null;
        const anim = {
          keyframes,
          options,
          finish() {
            onfinish?.();
          },
          cancel() {
            oncancel?.();
          },
          set onfinish(cb) {
            onfinish = cb;
          },
          set oncancel(cb) {
            oncancel = cb;
          },
        };
        bodyAnimations.push(anim);
        return anim;
      },
    };
    const fillStyles = new Map();
    const fill = {
      style: createStyleObject(fillStyles),
    };
    return {
      dataset: { heroChapter: key },
      open: key === 'stock',
      summary,
      body,
      bodyStyles,
      bodyAnimations,
      fill,
      fillStyles,
      querySelector: (selector) => {
        if (selector.includes('fill')) return fill;
        return selector === 'summary' ? summary : body;
      },
      contains: (element) => element === summary || element === body,
    };
  });

  const panels = ['overview', ...keys].map((key) => {
    const classes = new Set(key === 'overview' ? ['is-current'] : []);
    const eventListeners = new Map();
    return {
      dataset: { heroPanel: key },
      hidden: key !== 'overview',
      inert: false,
      classList: {
        add(...names) {
          names.forEach((name) => classes.add(name));
        },
        remove(...names) {
          names.forEach((name) => classes.delete(name));
        },
        toggle(name, on) {
          if (on) classes.add(name);
          else classes.delete(name);
        },
        contains(name) {
          return classes.has(name);
        },
      },
      addEventListener(name, callback) {
        if (!eventListeners.has(name)) eventListeners.set(name, new Set());
        eventListeners.get(name).add(callback);
      },
      removeEventListener(name, callback) {
        eventListeners.get(name)?.delete(callback);
      },
      dispatchAnimationEnd(animationName = 'v-hero-fade-in-fwd') {
        const cbs = eventListeners.get('animationend');
        if (cbs) {
          for (const cb of [...cbs]) cb({ target: this, animationName });
        }
      },
      dispatchAnimationCancel(animationName = 'v-hero-fade-in-fwd') {
        const cbs = eventListeners.get('animationcancel');
        if (cbs) {
          for (const cb of [...cbs]) cb({ target: this, animationName });
        }
      },
      setAttribute(name, value) {
        if (name === 'aria-hidden') this.ariaHidden = value;
      },
      removeAttribute(name) {
        if (name === 'aria-hidden') delete this.ariaHidden;
      },
      get current() {
        return classes.has('is-current');
      },
      get entering() {
        return classes.has('is-entering');
      },
      get leaving() {
        return classes.has('is-leaving');
      },
      get reverse() {
        return classes.has('is-reverse');
      },
    };
  });

  fixture.root.querySelectorAll = (selector) =>
    selector.includes('chapter]') ? chapters : panels;
  return { chapters, panels };
}

test('hero travel and geometry scale to 1.2 landing viewports and 1.0 chapter viewports', () => {
  const fixture = createHeroFixture();
  const cleanup = initHeroTransition(fixture.root);

  assert.equal(
    fixture.sceneStyles.get('--hero-travel'),
    `${FIXTURE_TOTAL_TRAVEL}px`
  );
  assert.equal(
    fixture.sceneStyles.get('--hero-pin-top'),
    `${FIXTURE_PIN_TOP}px`
  );

  // Landing midpoint at 928px
  fixture.win.scrollY = 928;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();
  assert.ok(
    Math.abs(Number(fixture.copyStyles.get('opacity')) - 1 / 9) < 1e-10
  );

  // Landing completion at 1468px reaches full eased shift and scale
  fixture.win.scrollY = FIXTURE_LANDING;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();
  assert.equal(fixture.copyStyles.get('opacity'), '1');
  assert.ok(fixture.mediaStyles.get('transform').includes('scale('));

  cleanup();
});

test('chapter summary click targets land at (index + 0.25) * step and trigger smooth scroll', () => {
  const fixture = createHeroFixture();
  const { chapters } = withChapterControls(fixture);
  const cleanup = initHeroTransition(fixture.root);

  chapters[0].summary.click();
  assert.deepEqual(fixture.win.lastScrollTo, {
    top: FIXTURE_LANDING + 0.25 * FIXTURE_CHAPTER_STEP,
    behavior: 'smooth',
  });

  chapters[1].summary.click();
  assert.deepEqual(fixture.win.lastScrollTo, {
    top: FIXTURE_LANDING + 1.25 * FIXTURE_CHAPTER_STEP,
    behavior: 'smooth',
  });

  chapters[2].summary.click();
  assert.deepEqual(fixture.win.lastScrollTo, {
    top: FIXTURE_LANDING + 2.25 * FIXTURE_CHAPTER_STEP,
    behavior: 'smooth',
  });

  cleanup();
});

test('resize recalculates travel to 1.2 and 1.0 viewports with document-stable scene top', () => {
  const fixture = createHeroFixture();
  const cleanup = initHeroTransition(fixture.root);

  assert.equal(
    fixture.sceneStyles.get('--hero-travel'),
    `${FIXTURE_TOTAL_TRAVEL}px`
  );

  // Resize to 720px viewport height
  fixture.win.innerHeight = 720;
  fixture.listeners.get('resize')();

  // Landing travel: 720 * 1.2 = 864. Chapters: 720 * 1.0 * 3 = 2160. Total: 3024px.
  assert.equal(fixture.sceneStyles.get('--hero-travel'), '3024px');

  cleanup();
});

test('scrolling updates the open chapter without removing focus from its summary', () => {
  const fixture = createHeroFixture();
  const { chapters, panels } = withChapterControls(fixture);
  fixture.root.ownerDocument.activeElement = chapters[0].summary;
  const cleanup = initHeroTransition(fixture.root);
  fixture.win.scrollY = FIXTURE_CH1_MID;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();
  assert.equal(chapters[1].open, true);
  assert.equal(
    panels.find((panel) => panel.current).dataset.heroPanel,
    'reorder'
  );
  assert.equal(fixture.root.ownerDocument.activeElement, chapters[0].summary);
  cleanup();
});

test('static mobile chapters can be selected and restore the unenhanced fallback on cleanup', () => {
  const fixture = createHeroFixture();
  const desktop = fixture.win.matchMedia(
    '(min-width: 1024px) and (min-height: 700px)'
  );
  desktop.matches = false;
  const { chapters, panels } = withChapterControls(fixture);
  const cleanup = initHeroTransition(fixture.root);
  chapters[2].summary.click();
  assert.deepEqual(
    chapters.map((chapter) => chapter.open),
    [false, false, true]
  );
  assert.equal(
    panels.find((panel) => panel.current).dataset.heroPanel,
    'activity'
  );
  cleanup();
  assert.deepEqual(
    chapters.map((chapter) => chapter.open),
    [true, false, false]
  );
  assert.deepEqual(
    panels.map((panel) => panel.hidden),
    [false, true, true, true]
  );
});

test('changing chapters marks the previous complete window as leaving and the next as entering', () => {
  const fixture = createHeroFixture();
  const { panels } = withChapterControls(fixture);
  const cleanup = initHeroTransition(fixture.root);
  fixture.win.scrollY = FIXTURE_CH0_MID;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();
  fixture.win.scrollY = FIXTURE_CH1_MID;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();
  assert.equal(
    panels.find((panel) => panel.dataset.heroPanel === 'stock').leaving,
    true
  );
  assert.equal(
    panels.find((panel) => panel.dataset.heroPanel === 'reorder').entering,
    true
  );
  assert.equal(
    panels.find((panel) => panel.dataset.heroPanel === 'reorder').current,
    true
  );
  assert.equal(
    panels.find((panel) => panel.dataset.heroPanel === 'overview').leaving,
    false
  );
  cleanup();
  assert.equal(
    panels.some((panel) => panel.leaving || panel.entering),
    false
  );
});

test('hero markup uses exactly one persistent browser frame and bar with four content panels', async () => {
  const fs = await import('node:fs');
  const html = fs.readFileSync(
    new URL('../velocity.html', import.meta.url),
    'utf8'
  );
  const heroSection = html.slice(
    html.indexOf('data-hero-transition'),
    html.indexOf('id="inventory"')
  );
  const frameMatches =
    heroSection.match(/class="[^"]*v-window-frame[^"]*"/g) || [];
  const barMatches = heroSection.match(/class="[^"]*v-window-bar[^"]*"/g) || [];
  const panelMatches = heroSection.match(/data-hero-panel="([^"]+)"/g) || [];
  const hiddenPanels =
    heroSection.match(/data-hero-panel="([^"]+)"[^>]*hidden/g) || [];
  const overviewMatch = heroSection.match(/data-hero-panel="overview"[^>]*>/);

  assert.equal(frameMatches.length, 1);
  assert.equal(barMatches.length, 1);
  assert.equal(panelMatches.length, 4);
  assert.ok(overviewMatch && !overviewMatch[0].includes('hidden'));
  assert.equal(hiddenPanels.length, 3);
});

test('scroll updates media transform and copy styles directly without continuous vars on scene', () => {
  const fixture = createHeroFixture();
  const cleanup = initHeroTransition(fixture.root);
  fixture.win.scrollY = 928;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();

  assert.ok(fixture.mediaStyles.has('transform'));
  assert.ok(fixture.mediaStyles.get('transform').includes('scale('));
  assert.ok(fixture.copyStyles.has('opacity'));
  assert.ok(fixture.copyStyles.has('transform'));

  assert.equal(fixture.sceneStyles.has('--hero-shift'), false);
  assert.equal(fixture.sceneStyles.has('--hero-scale'), false);
  assert.equal(fixture.sceneStyles.has('--hero-copy-opacity'), false);
  assert.equal(fixture.sceneStyles.has('--hero-copy-offset'), false);
  assert.ok(fixture.sceneStyles.has('--hero-pin-top'));
  assert.ok(fixture.sceneStyles.has('--hero-travel'));

  cleanup();
  assert.equal(fixture.mediaStyles.has('transform'), false);
  assert.equal(fixture.copyStyles.has('opacity'), false);
  assert.equal(fixture.copyStyles.has('transform'), false);
});

test('scroll burst schedules exactly one animation frame', () => {
  const fixture = createHeroFixture();
  let frameCount = 0;
  fixture.win.requestAnimationFrame = (cb) => {
    frameCount++;
    fixture.win.pendingFrame = cb;
    return frameCount;
  };
  const cleanup = initHeroTransition(fixture.root);
  frameCount = 0;
  fixture.listeners.get('scroll')();
  fixture.listeners.get('scroll')();
  fixture.listeners.get('scroll')();
  assert.equal(frameCount, 1);
  cleanup();
});

test('panel transition direction, settlement on animationend, and rapid reversal', () => {
  const fixture = createHeroFixture();
  const { panels } = withChapterControls(fixture);
  const cleanup = initHeroTransition(fixture.root);

  // Scroll to chapter 0 (stock)
  fixture.win.scrollY = FIXTURE_CH0_MID;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();

  // Forward scroll to chapter 1 (reorder)
  fixture.win.scrollY = FIXTURE_CH1_MID;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();

  const stock = panels.find((p) => p.dataset.heroPanel === 'stock');
  const reorder = panels.find((p) => p.dataset.heroPanel === 'reorder');
  assert.equal(stock.leaving, true);
  assert.equal(stock.reverse, false);
  assert.equal(reorder.entering, true);
  assert.equal(reorder.reverse, false);

  // Dispatch animationend on reorder and stock
  reorder.dispatchAnimationEnd('v-hero-fade-in-fwd');
  stock.dispatchAnimationEnd('v-hero-fade-out-fwd');
  assert.equal(reorder.current, true);
  assert.equal(reorder.entering, false);
  assert.equal(stock.leaving, false);
  assert.equal(stock.current, false);

  // Reverse scroll back to chapter 0 (stock)
  fixture.win.scrollY = FIXTURE_CH0_MID;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();

  assert.equal(reorder.leaving, true);
  assert.equal(reorder.reverse, true);
  assert.equal(stock.entering, true);
  assert.equal(stock.reverse, true);

  // Rapid reversal to chapter 2 (activity) before settlement
  fixture.win.scrollY = FIXTURE_CH2_MID;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();
  const activity = panels.find((p) => p.dataset.heroPanel === 'activity');
  assert.equal(activity.entering, true);
  assert.equal(activity.current, true);
  assert.equal(stock.entering, false);

  cleanup();
});

test('disclosure bodies animate height on open/close and protect focused elements from collapse', () => {
  const fixture = createHeroFixture();
  const { chapters } = withChapterControls(fixture);
  const cleanup = initHeroTransition(fixture.root);

  // Scroll from chapter 0 to chapter 1
  fixture.win.scrollY = FIXTURE_CH1_MID;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();

  assert.ok(chapters[1].bodyAnimations.length > 0);
  const openAnim =
    chapters[1].bodyAnimations[chapters[1].bodyAnimations.length - 1];
  assert.equal(chapters[1].open, true);
  openAnim.finish();

  // Focus inside chapter 1 link prevents chapter 1 from closing even when scrolling to chapter 2
  const fakeLink = {};
  chapters[1].contains = (el) => el === fakeLink || el === chapters[1].summary;
  fixture.root.ownerDocument.activeElement = fakeLink;

  fixture.win.scrollY = FIXTURE_CH2_MID;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();

  assert.equal(chapters[1].open, true);

  cleanup();
});

test('reduced motion settles panels and disclosures immediately without WAAPI or transition classes', () => {
  const fixture = createHeroFixture();
  const reduced = fixture.win.matchMedia('(prefers-reduced-motion: reduce)');
  reduced.matches = true;
  const { chapters, panels } = withChapterControls(fixture);
  const cleanup = initHeroTransition(fixture.root);

  chapters[1].summary.click();
  const reorder = panels.find((p) => p.dataset.heroPanel === 'reorder');
  assert.equal(reorder.current, true);
  assert.equal(reorder.entering, false);
  assert.equal(reorder.leaving, false);
  assert.equal(chapters[1].open, true);
  assert.equal(chapters[1].bodyAnimations.length, 0);

  cleanup();
});

test('scroll updates chapter progress indicators proportionally and cleans up on teardown', () => {
  const fixture = createHeroFixture();
  const { chapters } = withChapterControls(fixture);
  const cleanup = initHeroTransition(fixture.root);

  // 1. Scroll to landing (start of chapter 0: FIXTURE_LANDING = 1468)
  fixture.win.scrollY = FIXTURE_LANDING;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();

  assert.equal(chapters[0].fillStyles.get('transform'), 'scaleX(0)');
  assert.equal(chapters[1].fillStyles.get('transform'), 'scaleX(0)');
  assert.equal(chapters[2].fillStyles.get('transform'), 'scaleX(0)');

  // 2. Scroll into chapter 1 (halfway: FIXTURE_CH1_MID = 2818)
  fixture.win.scrollY = FIXTURE_CH1_MID;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();

  assert.equal(chapters[0].fillStyles.get('transform'), 'scaleX(1)');
  assert.equal(chapters[1].fillStyles.get('transform'), 'scaleX(0.5)');
  assert.equal(chapters[2].fillStyles.get('transform'), 'scaleX(0)');

  // 3. Reverse scroll back to chapter 0 (halfway: FIXTURE_CH0_MID = 1918)
  fixture.win.scrollY = FIXTURE_CH0_MID;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();

  assert.equal(chapters[0].fillStyles.get('transform'), 'scaleX(0.5)');
  assert.equal(chapters[1].fillStyles.get('transform'), 'scaleX(0)');
  assert.equal(chapters[2].fillStyles.get('transform'), 'scaleX(0)');

  // 4. Scroll to end of chapter 2 (pin release: FIXTURE_RELEASE = 4168)
  fixture.win.scrollY = FIXTURE_RELEASE;
  fixture.listeners.get('scroll')();
  fixture.win.pendingFrame();

  assert.equal(chapters[0].fillStyles.get('transform'), 'scaleX(1)');
  assert.equal(chapters[1].fillStyles.get('transform'), 'scaleX(1)');
  assert.equal(chapters[2].fillStyles.get('transform'), 'scaleX(1)');

  cleanup();
  assert.equal(chapters[0].fillStyles.has('transform'), false);
  assert.equal(chapters[1].fillStyles.has('transform'), false);
  assert.equal(chapters[2].fillStyles.has('transform'), false);
});

test('hero nav arrows advance and rewind chapters and update disabled state', () => {
  const fixture = createHeroFixture();
  const desktop = fixture.win.matchMedia(
    '(min-width: 1024px) and (min-height: 700px)'
  );
  desktop.matches = false;
  const { chapters, panels } = withChapterControls(fixture);
  const prevListeners = new Map();
  const nextListeners = new Map();
  const prevClasses = new Set();
  const nextClasses = new Set();

  const prevBtn = {
    disabled: false,
    classList: {
      toggle(cls, on) {
        if (on) prevClasses.add(cls);
        else prevClasses.delete(cls);
      },
      contains: (cls) => prevClasses.has(cls),
    },
    setAttribute() {},
    addEventListener: (evt, handler) => prevListeners.set(evt, handler),
    removeEventListener: (evt) => prevListeners.delete(evt),
  };

  const nextBtn = {
    disabled: false,
    classList: {
      toggle(cls, on) {
        if (on) nextClasses.add(cls);
        else nextClasses.delete(cls);
      },
      contains: (cls) => nextClasses.has(cls),
    },
    setAttribute() {},
    addEventListener: (evt, handler) => nextListeners.set(evt, handler),
    removeEventListener: (evt) => nextListeners.delete(evt),
  };

  const origQuery = fixture.root.querySelector;
  fixture.root.querySelector = (sel) => {
    if (sel === '[data-hero-nav="prev"]') return prevBtn;
    if (sel === '[data-hero-nav="next"]') return nextBtn;
    return origQuery(sel);
  };

  const cleanup = initHeroTransition(fixture.root);

  // Initial state at chapter 0: prev is disabled, next is enabled
  assert.equal(prevBtn.disabled, true);
  assert.equal(prevBtn.classList.contains('is-disabled'), true);
  assert.equal(nextBtn.disabled, false);
  assert.equal(nextBtn.classList.contains('is-disabled'), false);

  // Click next -> advances to chapter 1
  let prevented = false;
  nextListeners.get('click')({ preventDefault: () => { prevented = true; } });
  assert.ok(prevented);
  assert.equal(prevBtn.disabled, false);
  assert.equal(prevBtn.classList.contains('is-disabled'), false);
  assert.equal(nextBtn.disabled, false);
  assert.equal(chapters[1].open, true);

  // Click next again -> advances to chapter 2 (last)
  nextListeners.get('click')({ preventDefault: () => {} });
  assert.equal(prevBtn.disabled, false);
  assert.equal(nextBtn.disabled, true);
  assert.equal(nextBtn.classList.contains('is-disabled'), true);
  assert.equal(chapters[2].open, true);

  // Click prev -> back to chapter 1
  prevListeners.get('click')({ preventDefault: () => {} });
  assert.equal(prevBtn.disabled, false);
  assert.equal(nextBtn.disabled, false);
  assert.equal(chapters[1].open, true);

  cleanup();
  assert.equal(prevListeners.size, 0);
  assert.equal(nextListeners.size, 0);
});
