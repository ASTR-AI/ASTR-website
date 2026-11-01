export function getOperationsIndexForHash(hash, panelIds) {
  try {
    return panelIds.indexOf(decodeURIComponent(hash.replace(/^#/, '')));
  } catch {
    return -1;
  }
}

export function getOperationsIndexForKey(key, current, count, columns = 1) {
  if (!count) return -1;
  if (columns <= 1) {
    if (key === 'ArrowRight') return (current + 1) % count;
    if (key === 'ArrowLeft') return (current - 1 + count) % count;
    if (key === 'Home') return 0;
    if (key === 'End') return count - 1;
    return -1;
  }

  // Multi-column grid navigation (e.g. 2-column mobile grid)
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;

  const col = current % columns;
  const numRows = Math.ceil(count / columns);

  if (key === 'ArrowRight') {
    return (current + 1) % count;
  }
  if (key === 'ArrowLeft') {
    return (current - 1 + count) % count;
  }
  if (key === 'ArrowDown') {
    const next = current + columns;
    return next < count ? next : col;
  }
  if (key === 'ArrowUp') {
    const prev = current - columns;
    if (prev >= 0) return prev;
    const bottomInCol = (numRows - 1) * columns + col;
    return bottomInCol < count ? bottomInCol : (numRows - 2) * columns + col;
  }
  return -1;
}

/** Enhance the static workflow articles with accessible, manually selected tabs. */
export function initOperationsTabs(root) {
  if (!root) return () => {};
  const controls = root.querySelector('[data-operations-controls]');
  const tabs = [...root.querySelectorAll('[data-operations-tab]')];
  const panels = [...root.querySelectorAll('[data-operations-panel]')];
  if (
    !controls ||
    !panels.length ||
    tabs.length !== panels.length ||
    panels.some(
      (panel, index) => tabs[index].dataset.operationsTab !== panel.id
    )
  ) {
    return () => {};
  }

  const slider = controls.querySelector('.nav-highlight');
  const panelIds = panels.map((panel) => panel.id);
  const pageWindow =
    root.ownerDocument?.defaultView || globalThis.window || globalThis;
  const removeListeners = [];
  let animationTimeout = null;

  function moveSlider(tab) {
    if (!slider || !tab) return;
    const currentLeft = parseFloat(slider.style.left) || 0;
    const targetLeft = tab.offsetLeft;
    const targetTop = tab.offsetTop;
    const targetWidth = tab.offsetWidth;
    const targetHeight = tab.offsetHeight;

    if (!targetWidth) return;

    if (currentLeft !== 0 && Math.abs(currentLeft - targetLeft) > 5) {
      const direction =
        targetLeft > currentLeft ? 'moving-right' : 'moving-left';

      if (animationTimeout) clearTimeout(animationTimeout);
      slider.classList.remove('moving-left', 'moving-right', 'pulse');
      if (typeof slider.offsetWidth === 'number') {
        void slider.offsetWidth; // Trigger reflow
      }
      slider.classList.add(direction, 'pulse');

      animationTimeout = setTimeout(() => {
        slider.classList.remove('moving-left', 'moving-right', 'pulse');
      }, 900);
    }

    slider.style.width = `${targetWidth}px`;
    slider.style.left = `${targetLeft}px`;
    if (typeof targetTop === 'number') {
      slider.style.top = `${targetTop}px`;
    }
    if (typeof targetHeight === 'number' && targetHeight > 0) {
      slider.style.height = `${targetHeight}px`;
    }
    slider.style.opacity = '1';
  }

  function select(index, { focus = false, updateHash = false } = {}) {
    panels.forEach((panel, panelIndex) => {
      const selected = panelIndex === index;
      panel.hidden = !selected;
      tabs[panelIndex].setAttribute('aria-selected', String(selected));
      tabs[panelIndex].classList.toggle('active', selected);
      tabs[panelIndex].tabIndex = selected ? 0 : -1;
    });
    moveSlider(tabs[index]);
    if (pageWindow.innerWidth <= 768 && tabs[index].scrollIntoView) {
      tabs[index].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
    if (focus) tabs[index].focus();
    if (updateHash && pageWindow.history?.replaceState) {
      // Updating the hash without native scrolling keeps the selectors in view.
      pageWindow.history.replaceState(null, '', `#${panelIds[index]}`);
    }
  }

  controls.setAttribute('role', 'tablist');
  controls.setAttribute('aria-label', 'Everyday operations workflows');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;

    const onClick = () => select(index, { updateHash: true });
    const onKeyDown = (event) => {
      const isMobileGrid =
        (typeof pageWindow.innerWidth === 'number' &&
          pageWindow.innerWidth <= 768) ||
        (pageWindow.matchMedia &&
          pageWindow.matchMedia('(max-width: 767px)').matches) ||
        false;
      const columns = isMobileGrid ? 2 : 1;
      const next = getOperationsIndexForKey(
        event.key,
        index,
        tabs.length,
        columns
      );
      if (next < 0 || event.altKey || event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      select(next, { focus: true, updateHash: true });
    };
    tab.addEventListener('click', onClick);
    tab.addEventListener('keydown', onKeyDown);
    removeListeners.push(() => {
      tab.removeEventListener('click', onClick);
      tab.removeEventListener('keydown', onKeyDown);
    });
  });

  const initial = getOperationsIndexForHash(
    pageWindow.location?.hash || '',
    panelIds
  );
  const initialIndex = initial >= 0 ? initial : 0;
  controls.hidden = false;
  root.classList.add('v-operations-enhanced');
  select(initialIndex);

  // Position slider after styles are applied
  if (pageWindow.requestAnimationFrame) {
    pageWindow.requestAnimationFrame(() => moveSlider(tabs[initialIndex]));
  } else {
    setTimeout(() => moveSlider(tabs[initialIndex]), 50);
  }

  const onResize = () => {
    const currentIndex = tabs.findIndex(
      (t) => t.getAttribute('aria-selected') === 'true'
    );
    if (currentIndex >= 0 && slider) {
      slider.style.transition = 'none';
      moveSlider(tabs[currentIndex]);
      if (pageWindow.requestAnimationFrame) {
        pageWindow.requestAnimationFrame(() => {
          slider.style.transition = '';
        });
      } else {
        setTimeout(() => {
          slider.style.transition = '';
        }, 50);
      }
    }
  };
  if (pageWindow.addEventListener) {
    pageWindow.addEventListener('resize', onResize);
    removeListeners.push(() => {
      pageWindow.removeEventListener('resize', onResize);
    });
  }

  function onHashChange() {
    const index = getOperationsIndexForHash(
      pageWindow.location?.hash || '',
      panelIds
    );
    if (index < 0 && pageWindow.location?.hash !== `#${root.id}`) return;
    if (index >= 0) select(index);
    root.scrollIntoView?.({ block: 'start', behavior: 'instant' });
  }
  if (pageWindow.addEventListener) {
    pageWindow.addEventListener('hashchange', onHashChange);
  }

  // Font and image loading may continue; scroll after the enhanced layout exists.
  const anchorFrame =
    (initial >= 0 || pageWindow.location?.hash === `#${root.id}`) &&
    pageWindow.requestAnimationFrame
      ? pageWindow.requestAnimationFrame(() =>
          root.scrollIntoView?.({ block: 'start', behavior: 'instant' })
        )
      : null;

  return () => {
    if (animationTimeout) clearTimeout(animationTimeout);
    if (anchorFrame !== null && pageWindow.cancelAnimationFrame) {
      pageWindow.cancelAnimationFrame(anchorFrame);
    }
    if (pageWindow.removeEventListener) {
      pageWindow.removeEventListener('hashchange', onHashChange);
    }
    removeListeners.forEach((remove) => remove());
    controls.hidden = true;
    controls.removeAttribute('role');
    controls.removeAttribute('aria-label');
    root.classList.remove('v-operations-enhanced');
    tabs.forEach((tab) => {
      ['role', 'aria-controls', 'aria-selected', 'tabindex'].forEach((name) =>
        tab.removeAttribute(name)
      );
      tab.classList.remove('active');
    });
    panels.forEach((panel) => {
      panel.hidden = false;
      ['role', 'aria-labelledby', 'tabindex'].forEach((name) =>
        panel.removeAttribute(name)
      );
    });
  };
}
