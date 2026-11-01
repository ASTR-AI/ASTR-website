/** Manual hospital supply preview; native document links remain usable without JS. */
const activeControllers = new WeakMap();
const STAGES = ['request', 'pick', 'dispatch', 'receive'];
const OUTCOMES = [
  { owner: 'Hospital store', title: 'Request raised' },
  { owner: 'Central pharmacy', title: 'Stock prepared' },
  { owner: 'Central pharmacy', title: 'Medicines dispatched' },
  { owner: 'Hospital store', title: 'Receipt recorded' },
];

export function initMobileSupplyDemo(root) {
  if (!root?.querySelector) return () => {};
  activeControllers.get(root)?.();
  const demo = root.matches?.('[data-supply-demo]')
    ? root
    : root.querySelector('[data-supply-demo]');
  const deck = root.querySelector('[data-supply-card]');
  const steps = Array.from(root.querySelectorAll('[data-supply-mobile-step]'));
  const cards = Array.from(root.querySelectorAll('.v-supply-document'));
  if (!demo || !deck || steps.length !== 4 || cards.length !== 4)
    return () => {};
  const orderedSteps = STAGES.map((id) =>
    steps.find((step) => step.getAttribute('data-supply-mobile-step') === id)
  );
  const orderedCards = orderedSteps.map((step) =>
    cards.find(
      (card) => `#${card.getAttribute('id')}` === step?.getAttribute('href')
    )
  );
  if (orderedSteps.some((step) => !step) || orderedCards.some((card) => !card))
    return () => {};
  const summary = root.querySelector('[data-supply-mobile-summary]');
  const owner = root.querySelector('[data-supply-summary-owner]');
  const title = root.querySelector('[data-supply-summary-title]');
  const verified = root.querySelector('[data-supply-summary-verified]');
  const fullExample = root.querySelector('[data-supply-full-example]');

  function select(index) {
    demo.setAttribute('data-supply-state', STAGES[index]);
    if (owner) owner.textContent = OUTCOMES[index].owner;
    if (title) title.textContent = OUTCOMES[index].title;
    if (verified) verified.hidden = index !== 3;
    if (fullExample) fullExample.open = false;
    orderedCards.forEach((card, i) => {
      card.hidden = i !== index;
    });
    orderedSteps.forEach((step, i) => {
      if (i === index) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
  }
  const handlers = orderedSteps.map((step, index) => {
    const onClick = (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      select(index);
    };
    step.addEventListener('click', onClick);
    return onClick;
  });
  demo.setAttribute('data-supply-manual', '');
  if (summary) summary.hidden = false;
  const hash = root.ownerDocument?.defaultView?.location?.hash;
  const initialIndex = orderedCards.findIndex(
    (card) => `#${card.getAttribute('id')}` === hash
  );
  select(initialIndex < 0 ? 0 : initialIndex);
  if (fullExample && initialIndex >= 0) fullExample.open = true;
  let disposed = false;
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    orderedSteps.forEach((step, index) => {
      step.removeEventListener('click', handlers[index]);
      step.removeAttribute('aria-current');
    });
    orderedCards.forEach((card) => {
      card.hidden = false;
    });
    if (summary) summary.hidden = true;
    if (fullExample) fullExample.open = true;
    demo.removeAttribute('data-supply-manual');
    demo.removeAttribute('data-supply-state');
    activeControllers.delete(root);
  };
  activeControllers.set(root, cleanup);
  return cleanup;
}
