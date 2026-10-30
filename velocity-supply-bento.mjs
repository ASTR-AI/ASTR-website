const active = new WeakMap();

/**
 * Ensures reliable direct navigation to #supply with font and frame coordination.
 * Bento cards are static semantic elements requiring no intersection observers or scroll controllers.
 *
 * @param {HTMLElement|null} root
 * @param {object} [options]
 * @param {Window} [options.window]
 * @param {Document} [options.document]
 * @param {boolean} [options.alignOnInit=true]
 * @returns {() => void} cleanup
 */
export function initSupplyBento(root, options = {}) {
  if (!root) return () => {};
  active.get(root)?.();

  const win = options.window ?? (typeof window !== 'undefined' ? window : null);
  const doc =
    options.document ?? (typeof document !== 'undefined' ? document : null);
  const alignOnInit = options.alignOnInit ?? true;

  if (!win) return () => {};

  let disposed = false;
  let rafId = null;

  function cancelPending() {
    if (rafId !== null && win.cancelAnimationFrame) {
      win.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function alignAnchor() {
    cancelPending();
    Promise.resolve(doc?.fonts?.ready).then(() => {
      if (disposed) return;
      if (win.location?.hash !== '#supply') return;
      const align = () => {
        rafId = null;
        if (!disposed && win.location?.hash === '#supply') {
          root.scrollIntoView?.({ block: 'start', behavior: 'instant' });
        }
      };
      if (win.requestAnimationFrame) {
        rafId = win.requestAnimationFrame(align);
      } else {
        align();
      }
    });
  }

  function onHashChange() {
    if (win.location?.hash === '#supply') {
      alignAnchor();
    }
  }

  function cleanup() {
    if (disposed) return;
    disposed = true;
    cancelPending();
    win.removeEventListener?.('hashchange', onHashChange);
    active.delete(root);
  }

  win.addEventListener?.('hashchange', onHashChange);
  active.set(root, cleanup);

  if (alignOnInit && win.location?.hash === '#supply') {
    alignAnchor();
  }

  return cleanup;
}
