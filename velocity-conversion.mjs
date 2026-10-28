/**
 * Velocity Conversion & Mobile Bar Controller
 *
 * Manages the mobile conversion bar visibility, bottom spacing reservation,
 * and delegated conversion link telemetry without interfering with native
 * anchor navigation or accessibility focus.
 */

const rootCleanups = new WeakMap();

/**
 * Pure policy determining whether the mobile conversion bar should be shown.
 *
 * @param {{
 *   isMobile: boolean,
 *   heroPassed: boolean,
 *   demoVisible: boolean,
 *   menuOpen: boolean,
 *   focusInContent: boolean
 * }} state
 * @returns {boolean}
 */
export function shouldShowConversionBar(state) {
  if (!state || typeof state !== 'object') return false;
  return (
    Boolean(state.isMobile) &&
    Boolean(state.heroPassed) &&
    !state.demoVisible &&
    !state.menuOpen &&
    !state.focusInContent
  );
}

/**
 * Initializes mobile conversion bar state and CTA click delegation.
 *
 * @param {HTMLElement | null} root
 * @param {{ trackEvent?: (name: string, properties?: Record<string, unknown>) => void }} [options]
 * @returns {() => void} Cleanup function
 */
export function initVelocityConversion(root, { trackEvent } = {}) {
  if (!root || typeof root !== 'object') {
    return () => {};
  }

  // Idempotency: dispose previous instance on this root
  const existingCleanup = rootCleanups.get(root);
  if (existingCleanup) {
    existingCleanup();
  }

  const bar = root.querySelector
    ? root.querySelector('[data-conversion-bar]')
    : null;

  // Delegated CTA click handler on root
  const onPageClick = (event) => {
    const target = event?.target;
    if (!target || typeof target.closest !== 'function') return;
    const cta = target.closest('[data-velocity-cta]');
    if (!cta) return;

    const placement =
      cta.dataset?.placement ||
      (typeof cta.getAttribute === 'function'
        ? cta.getAttribute('data-placement')
        : null);
    const action =
      cta.dataset?.action ||
      (typeof cta.getAttribute === 'function'
        ? cta.getAttribute('data-action')
        : null);

    if (typeof trackEvent === 'function') {
      try {
        trackEvent('velocity_cta_click', { placement, action });
      } catch {
        // Fail safely
      }
    }
  };

  if (typeof root.addEventListener === 'function') {
    root.addEventListener('click', onPageClick);
  }

  // If no conversion bar is found, or in an environment without IntersectionObserver,
  // leave bar hidden (if bar exists) and only maintain click delegation.
  const hasBrowserFeatures =
    typeof window !== 'undefined' &&
    'IntersectionObserver' in window &&
    typeof window.matchMedia === 'function';

  if (!bar || !hasBrowserFeatures) {
    if (bar) bar.hidden = true;
    const cleanup = () => {
      if (typeof root.removeEventListener === 'function') {
        root.removeEventListener('click', onPageClick);
      }
      if (bar) bar.hidden = true;
      rootCleanups.delete(root);
    };
    rootCleanups.set(root, cleanup);
    return cleanup;
  }

  const hero = root.querySelector('#overview') || root.querySelector('header');
  const demo = root.querySelector('#demo');
  const productMenu =
    (typeof document !== 'undefined'
      ? document.querySelector('[data-product-menu]')
      : null) ||
    (root.querySelector ? root.querySelector('[data-product-menu]') : null);

  const mobileMedia = window.matchMedia('(max-width: 768px)');
  let isMobile = mobileMedia.matches;
  let heroPassed = false;
  let demoVisible = false;

  // Derive initial visibility from actual rectangles so direct deep links work
  if (hero && typeof hero.getBoundingClientRect === 'function') {
    const hr = hero.getBoundingClientRect();
    heroPassed = hr.bottom <= 0;
  }
  if (demo && typeof demo.getBoundingClientRect === 'function') {
    const dr = demo.getBoundingClientRect();
    const winHeight =
      typeof window.innerHeight === 'number' ? window.innerHeight : 800;
    demoVisible = dr.top < winHeight && dr.bottom > 0;
  }

  function checkFocusInContent() {
    if (typeof document === 'undefined') return false;
    const active = document.activeElement;
    if (
      !active ||
      active === document.body ||
      active === document.documentElement
    )
      return false;
    if (bar.contains && bar.contains(active)) return false;

    if (
      typeof active.matches === 'function' &&
      active.matches('input, select, textarea, [contenteditable="true"]')
    ) {
      return true;
    }

    if (
      typeof active.getBoundingClientRect === 'function' &&
      typeof bar.getBoundingClientRect === 'function'
    ) {
      const ar = active.getBoundingClientRect();
      const br = bar.getBoundingClientRect();
      const overlaps = !(
        ar.bottom <= br.top ||
        ar.top >= br.bottom ||
        ar.right <= br.left ||
        ar.left >= br.right
      );
      if (overlaps) return true;
    }

    return false;
  }

  function updateBarSpacing() {
    if (bar.hidden) {
      if (root.style?.removeProperty) {
        root.style.removeProperty('--v-conversion-bar-height');
      }
      return;
    }
    const height =
      bar.offsetHeight ||
      (typeof bar.getBoundingClientRect === 'function'
        ? bar.getBoundingClientRect().height
        : 0);
    if (height > 0 && root.style?.setProperty) {
      root.style.setProperty('--v-conversion-bar-height', `${height}px`);
    }
  }

  function updateBar() {
    const menuOpen = Boolean(productMenu && productMenu.open);
    const focusInContent = checkFocusInContent();
    const shouldShow = shouldShowConversionBar({
      isMobile,
      heroPassed,
      demoVisible,
      menuOpen,
      focusInContent,
    });
    bar.hidden = !shouldShow;
    updateBarSpacing();
  }

  // IntersectionObserver for hero and demo sections
  let intersectionObserver = null;
  try {
    intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) {
          heroPassed =
            !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
        } else if (entry.target === demo) {
          demoVisible = entry.isIntersecting;
        }
      }
      updateBar();
    });

    if (hero) intersectionObserver.observe(hero);
    if (demo) intersectionObserver.observe(demo);
  } catch {
    // Fail safely
  }

  // ResizeObserver for bar dimensions
  let resizeObserver = null;
  if (typeof ResizeObserver === 'function') {
    try {
      resizeObserver = new ResizeObserver(() => {
        if (!bar.hidden) {
          updateBarSpacing();
        }
      });
      resizeObserver.observe(bar);
    } catch {
      // Fail safely
    }
  }

  const onMediaChange = (e) => {
    isMobile = e.matches;
    updateBar();
  };
  const onMenuToggle = () => updateBar();
  const onFocusChange = () => updateBar();
  const onResize = () => updateBar();

  if (typeof mobileMedia.addEventListener === 'function') {
    mobileMedia.addEventListener('change', onMediaChange);
  }
  if (productMenu && typeof productMenu.addEventListener === 'function') {
    productMenu.addEventListener('toggle', onMenuToggle);
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('focusin', onFocusChange);
    document.addEventListener('focusout', onFocusChange);
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResize);
  }

  // Initial calculation
  updateBar();

  const cleanup = () => {
    if (typeof root.removeEventListener === 'function') {
      root.removeEventListener('click', onPageClick);
    }
    if (typeof mobileMedia.removeEventListener === 'function') {
      mobileMedia.removeEventListener('change', onMediaChange);
    }
    if (productMenu && typeof productMenu.removeEventListener === 'function') {
      productMenu.removeEventListener('toggle', onMenuToggle);
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('focusin', onFocusChange);
      document.removeEventListener('focusout', onFocusChange);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', onResize);
    }
    intersectionObserver?.disconnect();
    resizeObserver?.disconnect();

    bar.hidden = true;
    if (root.style?.removeProperty) {
      root.style.removeProperty('--v-conversion-bar-height');
    }
    rootCleanups.delete(root);
  };

  rootCleanups.set(root, cleanup);
  return cleanup;
}
