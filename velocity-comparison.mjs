const cleanups = new WeakMap();

export function initComparisonDisclosure(root) {
  if (!root) return () => {};
  cleanups.get(root)?.();
  const button = root.querySelector('[data-comparison-toggle]');
  const extra = root.querySelector('[data-comparison-extra]');
  const label = root.querySelector('[data-comparison-toggle-label]');
  if (!button || !extra || !label) return () => {};

  let expanded = false;
  function render() {
    extra.hidden = !expanded;
    button.setAttribute('aria-expanded', String(expanded));
    label.textContent = expanded
      ? 'Show fewer features'
      : 'Show 4 more features';
  }
  function toggle() {
    expanded = !expanded;
    render();
    if (!expanded)
      button.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }
  render();
  button.hidden = false;
  button.addEventListener('click', toggle);
  const cleanup = () => {
    button.removeEventListener('click', toggle);
    extra.hidden = false;
    button.hidden = true;
    cleanups.delete(root);
  };
  cleanups.set(root, cleanup);
  return cleanup;
}
