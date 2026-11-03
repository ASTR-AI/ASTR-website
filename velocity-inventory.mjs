// Multiple visible cards can share the same terminal scroll position.
export function getInventoryScrollTargets(cardStarts, maxScroll) {
  return cardStarts.map((start, index) =>
    index === cardStarts.length - 1
      ? Math.max(0, maxScroll)
      : Math.max(0, Math.min(start, maxScroll))
  );
}

export function getInventoryActiveIndex(targets, scrollLeft) {
  if (targets.length === 0 || targets.at(-1) <= 1 || scrollLeft <= 1) return 0;
  if (scrollLeft >= targets.at(-1) - 1) return targets.length - 1;
  return targets.reduce(
    (best, target, index) =>
      Math.abs(target - scrollLeft) < Math.abs(targets[best] - scrollLeft)
        ? index
        : best,
    0
  );
}

/**
 * Progressive-enhancement controller for the Velocity inventory carousel.
 * Native horizontal scrolling remains functional without this module.
 *
 * @param {HTMLElement} root - The [data-inventory-carousel] root element.
 * @returns {() => void} Cleanup function.
 */
export function initInventoryCarousel(root) {
  if (!root) return () => {};

  const track = root.querySelector('[data-inventory-track]');
  const cards = [...root.querySelectorAll('[data-inventory-card]')];
  const controls = root.querySelector('[data-inventory-controls]');
  const prevBtn = root.querySelector('[data-inventory-prev]');
  const nextBtn = root.querySelector('[data-inventory-next]');
  const dots = [...root.querySelectorAll('[data-inventory-dot]')];
  const statusEl = root.querySelector('[data-inventory-status]');

  if (!track || cards.length === 0 || !controls) {
    return () => {};
  }

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const cardNames = cards.map((card) => {
    const ariaLabel = card.getAttribute('aria-label') || '';
    const colonIndex = ariaLabel.indexOf(':');
    if (colonIndex !== -1) {
      return ariaLabel.slice(colonIndex + 1).trim();
    }
    const h3 = card.querySelector('h3');
    return h3 ? h3.textContent.trim() : '';
  });

  let activeIndex = 0;
  let scrollRafId = null;
  let settleTimerId = null;

  function getPaddingLeft() {
    return parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
  }

  function getScrollTargets() {
    const trackRect = track.getBoundingClientRect();
    const trackStart = trackRect.left + getPaddingLeft();
    return getInventoryScrollTargets(
      cards.map(
        (card) =>
          card.getBoundingClientRect().left - trackStart + track.scrollLeft
      ),
      track.scrollWidth - track.clientWidth
    );
  }

  function calculateActiveIndex() {
    return getInventoryActiveIndex(getScrollTargets(), track.scrollLeft);
  }

  function updateControlsState(index, isSettled = false) {
    activeIndex = index;

    // Update position indicators
    dots.forEach((dot, i) => {
      const isCurrent = i === activeIndex;
      dot.setAttribute('aria-current', isCurrent ? 'true' : 'false');
    });

    // Update arrows availability
    if (prevBtn) {
      prevBtn.disabled = activeIndex <= 0;
    }
    if (nextBtn) {
      nextBtn.disabled = activeIndex >= cards.length - 1;
    }

    // Update accessible status announcement once navigation settles
    if (isSettled && statusEl) {
      const name = cardNames[activeIndex] || `Feature ${activeIndex + 1}`;
      statusEl.textContent = `Feature ${activeIndex + 1} of ${cards.length}: ${name}`;
    }
  }

  function syncFromScroll() {
    const newIndex = calculateActiveIndex();
    updateControlsState(newIndex, false);

    clearTimeout(settleTimerId);
    settleTimerId = setTimeout(() => {
      updateControlsState(activeIndex, true);
    }, 150);
  }

  function onTrackScroll() {
    if (scrollRafId !== null) return;
    scrollRafId = requestAnimationFrame(() => {
      scrollRafId = null;
      syncFromScroll();
    });
  }

  function goTo(index, immediate = false) {
    const targetIndex = Math.max(0, Math.min(index, cards.length - 1));
    const targetCard = cards[targetIndex];
    if (!targetCard) return;

    const targetOffset = getScrollTargets()[targetIndex];
    const shouldBeImmediate = immediate || motionQuery.matches;

    track.scrollTo({
      left: Math.max(0, targetOffset),
      behavior: shouldBeImmediate ? 'auto' : 'smooth',
    });

    updateControlsState(targetIndex, false);

    clearTimeout(settleTimerId);
    settleTimerId = setTimeout(() => {
      updateControlsState(calculateActiveIndex(), true);
    }, 200);
  }

  function onPrevClick() {
    const targets = getScrollTargets();
    let previousIndex = activeIndex - 1;
    // Skip cards whose start is clamped to the same end position.
    while (
      previousIndex > 0 &&
      targets[previousIndex] >= targets[activeIndex] - 1
    ) {
      previousIndex -= 1;
    }
    goTo(previousIndex);
  }

  function onNextClick() {
    goTo(activeIndex + 1);
  }

  const dotClickHandlers = dots.map((dot, i) => {
    const handler = () => goTo(i);
    dot.addEventListener('click', handler);
    return { dot, handler };
  });

  function onTrackKeyDown(e) {
    // Only handle arrow/nav keys when focus is directly on the track itself
    if (e.target !== track) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        onPrevClick();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goTo(activeIndex + 1);
        break;
      case 'Home':
        e.preventDefault();
        goTo(0);
        break;
      case 'End':
        e.preventDefault();
        goTo(cards.length - 1);
        break;
      default:
        break;
    }
  }

  track.addEventListener('scroll', onTrackScroll, { passive: true });
  track.addEventListener('keydown', onTrackKeyDown);

  if ('onscrollend' in window) {
    track.addEventListener('scrollend', () => {
      clearTimeout(settleTimerId);
      updateControlsState(calculateActiveIndex(), true);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', onPrevClick);
  if (nextBtn) nextBtn.addEventListener('click', onNextClick);

  let resizeObserver = null;
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => {
      syncFromScroll();
    });
    resizeObserver.observe(track);
  }

  // Reveal progressive controls once verified
  controls.hidden = false;
  controls.removeAttribute('hidden');

  // Initial sync with DOM geometry
  syncFromScroll();

  const doc = root.ownerDocument || document;
  const dialogEl = doc.querySelector('#inventory-preview-dialog');
  const dialogCleanup = initInventoryPreviewDialog(dialogEl, root);

  return function cleanup() {
    dialogCleanup();
    if (scrollRafId !== null) {
      cancelAnimationFrame(scrollRafId);
      scrollRafId = null;
    }
    clearTimeout(settleTimerId);
    settleTimerId = null;

    track.removeEventListener('scroll', onTrackScroll);
    track.removeEventListener('keydown', onTrackKeyDown);

    if (prevBtn) prevBtn.removeEventListener('click', onPrevClick);
    if (nextBtn) nextBtn.removeEventListener('click', onNextClick);

    dotClickHandlers.forEach(({ dot, handler }) => {
      dot.removeEventListener('click', handler);
    });

    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  };
}

/**
 * Accessible dialog controller for enlarging inventory previews.
 *
 * @param {HTMLElement} dialog - The dialog element.
 * @param {HTMLElement} [root] - Container containing preview cards.
 * @returns {() => void} Cleanup function.
 */
export function initInventoryPreviewDialog(dialog, root) {
  if (!dialog) return () => {};

  const doc = dialog.ownerDocument || globalThis.document;
  const triggerContainer = root || doc;
  const triggers = triggerContainer
    ? [...triggerContainer.querySelectorAll('[data-enlarge-preview]')]
    : [];
  const closeBtn = dialog.querySelector('[data-dialog-close]');
  const backdrop = dialog.querySelector('[data-dialog-backdrop]');
  const dialogImg = dialog.querySelector('[data-dialog-img]');
  const dialogMockup = dialog.querySelector('[data-dialog-mockup]');
  const dialogTitle = dialog.querySelector('#inventory-preview-title');
  const scrollBody = dialog.querySelector('.v-preview-dialog-body');

  let activeTrigger = null;
  const removeListeners = [];

  function openDialog(trigger) {
    activeTrigger = trigger;
    const card =
      trigger.closest?.('[data-inventory-card]') ||
      trigger.closest?.('article, figure') ||
      trigger.parentElement;
    const img =
      card?.querySelector?.('.v-card-img') || card?.querySelector?.('img');
    const title =
      card?.querySelector?.('h3')?.textContent?.trim() || 'Product preview';

    const mockup = card?.querySelector?.('[data-inventory-mockup]');
    if (dialogMockup) {
      dialogMockup.replaceChildren();
      dialogMockup.hidden = !mockup;
      if (mockup) dialogMockup.append(mockup.cloneNode(true));
    }
    if (dialogImg) dialogImg.hidden = Boolean(mockup);
    if (dialogImg && img) {
      dialogImg.src =
        img.currentSrc || img.getAttribute?.('src') || img.src || '';
      dialogImg.alt =
        img.getAttribute?.('alt') || img.alt || 'Enlarged product preview';
    }
    if (dialogTitle) {
      dialogTitle.textContent = title;
    }

    dialog.removeAttribute('hidden');
    if (typeof dialog.showModal === 'function') {
      try {
        dialog.showModal();
      } catch {
        dialog.setAttribute('open', '');
      }
    } else {
      dialog.setAttribute('open', '');
    }

    if (scrollBody) {
      scrollBody.scrollTop = 0;
      scrollBody.scrollLeft = 0;
    }

    if (closeBtn && typeof closeBtn.focus === 'function') {
      closeBtn.focus();
    } else if (typeof dialog.focus === 'function') {
      dialog.focus();
    }
  }

  function closeDialog() {
    if (!dialog.hasAttribute('open') && dialog.hasAttribute('hidden')) return;

    if (typeof dialog.close === 'function') {
      try {
        dialog.close();
      } catch {
        dialog.removeAttribute('open');
      }
    } else {
      dialog.removeAttribute('open');
    }
    dialog.setAttribute('hidden', '');

    if (activeTrigger && typeof activeTrigger.focus === 'function') {
      activeTrigger.focus();
      activeTrigger = null;
    }
  }

  triggers.forEach((trigger) => {
    const onClick = (e) => {
      e.preventDefault();
      openDialog(trigger);
    };
    trigger.addEventListener('click', onClick);
    removeListeners.push(() => trigger.removeEventListener('click', onClick));
  });

  if (closeBtn) {
    const onCloseClick = (e) => {
      e.preventDefault();
      closeDialog();
    };
    closeBtn.addEventListener('click', onCloseClick);
    removeListeners.push(() =>
      closeBtn.removeEventListener('click', onCloseClick)
    );
  }

  if (backdrop) {
    const onBackdropClick = (e) => {
      e.preventDefault();
      closeDialog();
    };
    backdrop.addEventListener('click', onBackdropClick);
    removeListeners.push(() =>
      backdrop.removeEventListener('click', onBackdropClick)
    );
  }

  const onKeyDown = (e) => {
    if (!dialog.hasAttribute('open') && dialog.hasAttribute('hidden')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeDialog();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = [
        ...dialog.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ),
      ].filter(
        (el) =>
          !el.hasAttribute('disabled') &&
          el.getAttribute('aria-hidden') !== 'true'
      );

      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const currentActive = doc.activeElement;

      if (e.shiftKey) {
        if (currentActive === first || currentActive === dialog) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (currentActive === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  dialog.addEventListener('keydown', onKeyDown);
  removeListeners.push(() => dialog.removeEventListener('keydown', onKeyDown));

  const onCancel = (e) => {
    e.preventDefault();
    closeDialog();
  };
  dialog.addEventListener('cancel', onCancel);
  removeListeners.push(() => dialog.removeEventListener('cancel', onCancel));

  return function cleanup() {
    closeDialog();
    removeListeners.forEach((fn) => fn());
  };
}
