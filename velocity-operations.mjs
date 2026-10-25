export function getOperationsIndexForHash(hash, panelIds) {
  try {
    return panelIds.indexOf(decodeURIComponent(hash.replace(/^#/, '')));
  } catch {
    return -1;
  }
}

export function getOperationsIndexForKey(key, current, count) {
  if (!count) return -1;
  if (key === 'ArrowRight') return (current + 1) % count;
  if (key === 'ArrowLeft') return (current - 1 + count) % count;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
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

  const panelIds = panels.map((panel) => panel.id);
  const pageWindow = root.ownerDocument.defaultView;
  const removeListeners = [];

  function select(index, { focus = false, updateHash = false } = {}) {
    panels.forEach((panel, panelIndex) => {
      const selected = panelIndex === index;
      panel.hidden = !selected;
      tabs[panelIndex].setAttribute('aria-selected', String(selected));
      tabs[panelIndex].tabIndex = selected ? 0 : -1;
    });
    if (focus) tabs[index].focus();
    if (updateHash) {
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
      const next = getOperationsIndexForKey(event.key, index, tabs.length);
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

  const initial = getOperationsIndexForHash(pageWindow.location.hash, panelIds);
  select(initial >= 0 ? initial : 0);
  controls.hidden = false;
  root.classList.add('v-operations-enhanced');

  function onHashChange() {
    const index = getOperationsIndexForHash(pageWindow.location.hash, panelIds);
    if (index < 0 && pageWindow.location.hash !== `#${root.id}`) return;
    if (index >= 0) select(index);
    root.scrollIntoView({ block: 'start', behavior: 'instant' });
  }
  pageWindow.addEventListener('hashchange', onHashChange);

  // Font and image loading may continue; scroll after the enhanced layout exists.
  const anchorFrame =
    initial >= 0 || pageWindow.location.hash === `#${root.id}`
      ? pageWindow.requestAnimationFrame(() =>
          root.scrollIntoView({ block: 'start', behavior: 'instant' })
        )
      : null;

  return () => {
    if (anchorFrame !== null) pageWindow.cancelAnimationFrame(anchorFrame);
    pageWindow.removeEventListener('hashchange', onHashChange);
    removeListeners.forEach((remove) => remove());
    controls.hidden = true;
    controls.removeAttribute('role');
    controls.removeAttribute('aria-label');
    root.classList.remove('v-operations-enhanced');
    tabs.forEach((tab) => {
      ['role', 'aria-controls', 'aria-selected', 'tabindex'].forEach((name) =>
        tab.removeAttribute(name)
      );
    });
    panels.forEach((panel) => {
      panel.hidden = false;
      ['role', 'aria-labelledby', 'tabindex'].forEach((name) =>
        panel.removeAttribute(name)
      );
    });
  };
}
