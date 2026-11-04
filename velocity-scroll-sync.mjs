/**
 * Industry-standard scroll retention, URL hash synchronization, and form draft preservation for Velocity.
 *
 * @param {object} [options]
 * @param {Window} [options.window]
 * @param {Document} [options.document]
 * @param {Storage} [options.sessionStorage]
 * @param {Element|Element[]} [options.sections]
 * @param {HTMLFormElement|null} [options.demoForm]
 * @param {typeof IntersectionObserver} [options.IntersectionObserverClass]
 * @returns {() => void} cleanup function
 */
export function initScrollSync(options = {}) {
  const win = options.window ?? (typeof window !== 'undefined' ? window : null);
  const doc =
    options.document ?? (typeof document !== 'undefined' ? document : null);
  const storage =
    options.sessionStorage ??
    (typeof sessionStorage !== 'undefined' ? sessionStorage : null);
  const ObserverClass =
    options.IntersectionObserverClass ??
    (typeof IntersectionObserver !== 'undefined' ? IntersectionObserver : null);

  if (!win || !doc) return () => {};

  let disposed = false;
  let rafId = null;
  const cleanups = [];

  const STORAGE_KEY = 'velocity_last_section';
  const FORM_DRAFT_KEY = 'velocity_demo_draft';

  // 1. Initial Hash & Scroll Alignment on Refresh
  const initialHash = (win.location?.hash || '').replace(/^#/, '');
  const cachedSection = storage?.getItem(STORAGE_KEY) || '';
  const targetId = initialHash || cachedSection;

  if (targetId) {
    const targetEl = doc.getElementById?.(targetId);
    if (targetEl) {
      const align = () => {
        rafId = null;
        if (disposed) return;
        targetEl.scrollIntoView?.({ block: 'start', behavior: 'instant' });
        if (win.history?.replaceState) {
          if (targetId === 'overview') {
            win.history.replaceState(null, '', win.location.pathname);
          } else {
            win.history.replaceState(null, '', '#' + targetId);
          }
        }
      };

      Promise.resolve(doc.fonts?.ready).then(() => {
        if (disposed) return;
        if (win.requestAnimationFrame) {
          rafId = win.requestAnimationFrame(align);
        } else {
          align();
        }
      });
    }
  }

  // 2. Landmark Sections Scroll Spy
  const sections = Array.isArray(options.sections)
    ? options.sections
    : Array.from(
        doc.querySelectorAll?.(
          '#overview, #inventory, #reordering, #purchasing, #supply, #operations, #features, #why-velocity, #comparison, #faq, #demo'
        ) || []
      );

  if (ObserverClass && sections.length > 0) {
    let currentActiveId = targetId || '';
    const observer = new ObserverClass(
      (entries) => {
        if (disposed) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target?.id) {
            const newId = entry.target.id;
            if (newId !== currentActiveId) {
              currentActiveId = newId;
              try {
                storage?.setItem(STORAGE_KEY, newId);
              } catch {
                // Storage may be quota-restricted or disabled
              }
              if (win.history?.replaceState) {
                if (newId === 'overview') {
                  win.history.replaceState(null, '', win.location.pathname);
                } else {
                  win.history.replaceState(null, '', '#' + newId);
                }
              }
            }
          }
        });
      },
      {
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    cleanups.push(() => observer.disconnect());
  }

  // 3. Demo Form Draft Persistence
  const demoForm =
    options.demoForm ??
    (doc.querySelector?.('[data-velocity-form]') ||
      doc.querySelector?.('#demo form'));

  if (demoForm && storage) {
    const fields = ['name', 'pharmacy', 'city', 'email', 'phone'];

    // Restore draft if exists
    try {
      const rawDraft = storage.getItem(FORM_DRAFT_KEY);
      if (rawDraft) {
        const draft = JSON.parse(rawDraft);
        fields.forEach((field) => {
          const input =
            demoForm.elements?.[field] ||
            demoForm.querySelector?.(`[name="${field}"]`);
          if (input && !input.value && draft[field]) {
            input.value = draft[field];
          }
        });
      }
    } catch {
      // Ignore parse errors
    }

    const onInput = () => {
      const data = {};
      fields.forEach((field) => {
        const input =
          demoForm.elements?.[field] ||
          demoForm.querySelector?.(`[name="${field}"]`);
        if (input) {
          data[field] = input.value || '';
        }
      });
      try {
        storage.setItem(FORM_DRAFT_KEY, JSON.stringify(data));
      } catch {
        // Quota full or disabled
      }
    };

    const onSubmit = () => {
      try {
        storage.removeItem(FORM_DRAFT_KEY);
      } catch {
        // No-op
      }
    };

    demoForm.addEventListener?.('input', onInput);
    demoForm.addEventListener?.('submit', onSubmit);

    cleanups.push(() => {
      demoForm.removeEventListener?.('input', onInput);
      demoForm.removeEventListener?.('submit', onSubmit);
    });
  }

  return () => {
    disposed = true;
    if (rafId !== null && win.cancelAnimationFrame) {
      win.cancelAnimationFrame(rafId);
      rafId = null;
    }
    cleanups.forEach((c) => c());
  };
}
