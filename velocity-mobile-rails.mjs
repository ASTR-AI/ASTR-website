/**
 * Progressive enhancement controller for native horizontal scroll rails on mobile devices.
 * Supports touch swipe, arrow buttons, keyboard navigation, and reduced-motion preferences.
 * At tablet and desktop viewports, enhancement controls are hidden and the native grid/flex is restored.
 */

/**
 * Calculates whether prev and next buttons should be disabled based on scroll position.
 * @param {number} scrollLeft - Current scroll offset.
 * @param {number} maxScroll - Maximum scroll offset (scrollWidth - clientWidth).
 * @param {number} [tolerance=2] - Pixel tolerance for boundary comparison.
 * @returns {{ canScrollPrev: boolean, canScrollNext: boolean }}
 */
export function getRailNavState(scrollLeft, maxScroll, tolerance = 2) {
  if (maxScroll <= tolerance) {
    return { canScrollPrev: false, canScrollNext: false };
  }
  const canScrollPrev = scrollLeft > tolerance;
  const canScrollNext = scrollLeft < maxScroll - tolerance;
  return { canScrollPrev, canScrollNext };
}

/**
 * Initializes a native mobile rail with progressive enhancement controls.
 *
 * @param {{
 *   rail: HTMLElement | null,
 *   controls?: HTMLElement | null,
 *   prevBtn?: HTMLButtonElement | null,
 *   nextBtn?: HTMLButtonElement | null,
 * }} options
 * @returns {() => void} Cleanup function
 */
export function initMobileRail(options) {
  if (!options || typeof options !== 'object') {
    return () => {};
  }
  const { rail, controls, prevBtn, nextBtn } = options;
  if (!rail || typeof rail !== 'object') {
    return () => {};
  }

  const hasControls = Boolean(controls && prevBtn && nextBtn);
  if (!hasControls) {
    return () => {};
  }

  // Unhide controls once JS is active
  controls.hidden = false;

  const motionQuery =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : { matches: false };

  const phoneQuery =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(max-width: 767px)')
      : { matches: true };

  let rafId = null;

  function updateButtonState() {
    if (phoneQuery && !phoneQuery.matches) {
      // In tablet/desktop mode, keep buttons in default state
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    const scrollLeft = rail.scrollLeft || 0;
    const maxScroll = Math.max(0, (rail.scrollWidth || 0) - (rail.clientWidth || 0));
    const { canScrollPrev, canScrollNext } = getRailNavState(scrollLeft, maxScroll);

    prevBtn.disabled = !canScrollPrev;
    nextBtn.disabled = !canScrollNext;
  }

  function onScroll() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      updateButtonState();
      rafId = null;
    });
  }

  function getStepDistance() {
    // Measure first visible child card
    const cards = Array.from(rail.children || []).filter(
      (el) =>
        el.nodeType === 1 &&
        !el.hasAttribute('aria-hidden') &&
        el.getAttribute('display') !== 'none'
    );
    if (cards.length > 0) {
      const cardRect = cards[0].getBoundingClientRect();
      if (cardRect.width > 0) {
        return cardRect.width + 16; // card width + 16px gap
      }
    }
    return (rail.clientWidth || 300) * 0.85;
  }

  function scrollByStep(direction) {
    const step = getStepDistance();
    const behavior = motionQuery.matches ? 'auto' : 'smooth';
    if (typeof rail.scrollBy === 'function') {
      rail.scrollBy({ left: direction * step, behavior });
    } else {
      rail.scrollLeft = (rail.scrollLeft || 0) + direction * step;
      updateButtonState();
    }
  }

  const onPrevClick = (e) => {
    e.preventDefault();
    scrollByStep(-1);
  };

  const onNextClick = (e) => {
    e.preventDefault();
    scrollByStep(1);
  };

  const onResize = () => {
    updateButtonState();
  };

  // Add event listeners
  rail.addEventListener('scroll', onScroll, { passive: true });
  prevBtn.addEventListener('click', onPrevClick);
  nextBtn.addEventListener('click', onNextClick);

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResize);
    if (typeof phoneQuery.addEventListener === 'function') {
      phoneQuery.addEventListener('change', onResize);
    }
  }

  // Initial update
  updateButtonState();

  // Cleanup
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    rail.removeEventListener('scroll', onScroll);
    prevBtn.removeEventListener('click', onPrevClick);
    nextBtn.removeEventListener('click', onNextClick);

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', onResize);
      if (typeof phoneQuery.removeEventListener === 'function') {
        phoneQuery.removeEventListener('change', onResize);
      }
    }
    controls.hidden = true;
  };
}
