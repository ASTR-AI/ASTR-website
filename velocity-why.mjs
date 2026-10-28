/**
 * Pure helpers and data for the "Why Velocity" interactive panel.
 */

export const DEMO_STOCK_ITEMS = [
  // Low stock items
  {
    id: 'med-1',
    category: 'low-stock',
    name: 'Amoxicillin 500 mg',
    dosageForm: 'Capsules',
    batch: 'BX-8941',
    currentQty: 6,
    unit: 'packs',
    reorderLevel: 20,
    statusText: 'Low stock',
    statusVariant: 'warning',
    note: '6 of 20 packs remaining',
  },
  {
    id: 'med-2',
    category: 'low-stock',
    name: 'Metformin 500 mg',
    dosageForm: 'Tablets',
    batch: 'MF-2041',
    currentQty: 4,
    unit: 'packs',
    reorderLevel: 15,
    statusText: 'Low stock',
    statusVariant: 'warning',
    note: '4 of 15 packs remaining',
  },
  {
    id: 'med-3',
    category: 'low-stock',
    name: 'Pantoprazole 40 mg',
    dosageForm: 'Tablets',
    batch: 'PT-1108',
    currentQty: 2,
    unit: 'packs',
    reorderLevel: 12,
    statusText: 'Critical low',
    statusVariant: 'danger',
    note: '2 of 12 packs remaining',
  },
  {
    id: 'med-3b',
    category: 'low-stock',
    name: 'Cefixime 200 mg',
    dosageForm: 'Tablets',
    batch: 'CX-3309',
    currentQty: 5,
    unit: 'packs',
    reorderLevel: 25,
    statusText: 'Low stock',
    statusVariant: 'warning',
    note: '5 of 25 packs remaining',
  },
  // Expiring soon items
  {
    id: 'med-4',
    category: 'expiring-soon',
    name: 'Azithromycin 250 mg',
    dosageForm: 'Tablets',
    batch: 'AZ-4412',
    currentQty: 18,
    unit: 'packs',
    expiryDate: 'Dec 2026',
    statusText: 'Expiring in 42 days',
    statusVariant: 'warning',
    note: 'Batch AZ-4412 · Dec 2026',
  },
  {
    id: 'med-5',
    category: 'expiring-soon',
    name: 'Cough Syrup 100 ml',
    dosageForm: 'Liquid',
    batch: 'CS-9021',
    currentQty: 8,
    unit: 'bottles',
    expiryDate: 'Nov 2026',
    statusText: 'Expiring in 18 days',
    statusVariant: 'danger',
    note: 'Batch CS-9021 · Nov 2026',
  },
  {
    id: 'med-5b',
    category: 'expiring-soon',
    name: 'Atorvastatin 20 mg',
    dosageForm: 'Tablets',
    batch: 'AT-1120',
    currentQty: 14,
    unit: 'packs',
    expiryDate: 'Dec 2026',
    statusText: 'Expiring in 38 days',
    statusVariant: 'warning',
    note: 'Batch AT-1120 · Dec 2026',
  },
  // Expired items
  {
    id: 'med-6',
    category: 'expired',
    name: 'Ceftriaxone 1 g Inj',
    dosageForm: 'Injection',
    batch: 'CF-7703',
    currentQty: 5,
    unit: 'vials',
    expiryDate: 'Sep 2026',
    statusText: 'Expired Sep 2026',
    statusVariant: 'expired',
    note: 'Quarantine recommended',
  },
  {
    id: 'med-7',
    category: 'expired',
    name: 'Eye Drops 10 ml',
    dosageForm: 'Ophthalmic',
    batch: 'ED-1092',
    currentQty: 3,
    unit: 'units',
    expiryDate: 'Oct 2026',
    statusText: 'Expired Oct 2026',
    statusVariant: 'expired',
    note: 'Quarantine recommended',
  },
  {
    id: 'med-7b',
    category: 'expired',
    name: 'Insulin Glargine 100 IU',
    dosageForm: 'Vial',
    batch: 'IN-5021',
    currentQty: 4,
    unit: 'pens',
    expiryDate: 'Oct 2026',
    statusText: 'Expired Oct 2026',
    statusVariant: 'expired',
    note: 'Quarantine recommended',
  },
];

export const DEMO_ACTIVITY_ENTRIES = [
  {
    id: 'act-1',
    type: 'stock_adjustment',
    badge: 'Adjustment',
    badgeVariant: 'warning',
    title: 'Stock adjustment',
    timestamp: 'Today, 14:32 IST',
    summary: 'Metformin 500 mg · 5 packs reconciled',
    details: {
      user: 'P. Sharma',
      role: 'Pharmacist',
      medicine: 'Metformin 500 mg',
      batch: 'BX-8941',
      flow: '45 → 40 packs (Δ -5)',
      reason: 'Physical count reconciliation: 5 damaged packs written off',
      reference: 'Adjustment #ADJ-104',
    },
  },
  {
    id: 'act-2',
    type: 'goods_receipt',
    badge: 'Receipt',
    badgeVariant: 'success',
    title: 'Goods receipt',
    timestamp: 'Today, 11:15 IST',
    summary: 'Amoxicillin 500 mg · 120 packs received',
    details: {
      user: 'R. Nair',
      role: 'Store Manager',
      medicine: 'Amoxicillin 500 mg',
      batch: 'AM-5520',
      flow: '0 → 120 packs (Δ +120)',
      reason: 'PO-0024 delivery verified against invoice',
      reference: 'Receipt #GR-0018',
    },
  },
  {
    id: 'act-3',
    type: 'pos_sale',
    badge: 'Counter',
    badgeVariant: 'info',
    title: 'Counter dispense',
    timestamp: 'Today, 09:40 IST',
    summary: 'Paracetamol 650 mg · 2 strips dispensed',
    details: {
      user: 'A. Gupta',
      role: 'Counter Staff',
      medicine: 'Paracetamol 650 mg',
      batch: 'PC-3310',
      flow: '84 → 82 strips (Δ -2)',
      reason: 'Retail counter sale invoice generated',
      reference: 'Bill #INV-8821',
    },
  },
];

export const DEMO_OWNER_PERIODS = {
  today: {
    key: 'today',
    label: 'Today',
    lastUpdated: 'Updated today at 18:45 IST · Snapshot',
    activeSkus: '1,248',
    totalMovements: '34 recorded',
    attentionItems: '5 items',
    attentionDetail: '3 low stock · 2 expiring',
    settledBills: '28 bills',
  },
  '7d': {
    key: '7d',
    label: 'Past 7 days',
    lastUpdated: 'Updated today at 18:45 IST · Snapshot',
    activeSkus: '1,248',
    totalMovements: '218 recorded',
    attentionItems: '8 items',
    attentionDetail: '5 low stock · 3 expiring',
    settledBills: '194 bills',
  },
  '30d': {
    key: '30d',
    label: 'Past 30 days',
    lastUpdated: 'Updated today at 18:45 IST · Snapshot',
    activeSkus: '1,254',
    totalMovements: '892 recorded',
    attentionItems: '12 items',
    attentionDetail: '7 low stock · 5 expiring',
    settledBills: '812 bills',
  },
};

/**
 * Filter medicines by category ('low-stock' | 'expiring-soon' | 'expired').
 */
export function filterStockItems(category, items = DEMO_STOCK_ITEMS) {
  if (!category) return items;
  return items.filter((item) => item.category === category);
}

/**
 * Find activity entry by ID.
 */
export function getActivityEntry(id, entries = DEMO_ACTIVITY_ENTRIES) {
  return entries.find((e) => e.id === id) || entries[0];
}

/**
 * Get owner overview stats by period key.
 */
export function getOwnerOverview(periodKey, data = DEMO_OWNER_PERIODS) {
  return data[periodKey] || data.today;
}

/**
 * Keyboard navigation index calculator.
 */
export function getWhyIndexForKey(key, current, count) {
  if (!count) return -1;
  if (key === 'ArrowRight' || key === 'ArrowDown') return (current + 1) % count;
  if (key === 'ArrowLeft' || key === 'ArrowUp')
    return (current - 1 + count) % count;
  if (key === 'Home') return 0;
  if (key === 'End') return count - 1;
  return -1;
}

/**
 * Progressive enhancement initializer for Why Velocity section.
 */
export function initWhyVelocity(root) {
  if (!root) return () => {};

  const triggers = [...root.querySelectorAll('[data-why-trigger]')];
  const items = [...root.querySelectorAll('[data-why-item]')];
  const panels = [...root.querySelectorAll('[data-why-panel]')];
  const bodies = [...root.querySelectorAll('[data-why-body]')];
  const desktopHost = root.querySelector('[data-why-desktop-host]');
  const removeListeners = [];

  if (!triggers.length || triggers.length !== panels.length) return () => {};

  function selectScenario(index, { focus = false } = {}) {
    triggers.forEach((btn, i) => {
      const isSelected = i === index;
      btn.setAttribute('aria-selected', String(isSelected));
      btn.setAttribute('aria-expanded', String(isSelected));
      btn.tabIndex = isSelected ? 0 : -1;
      btn.classList.toggle('is-active', isSelected);

      if (items[i]) {
        items[i].classList.toggle('is-active', isSelected);
      }
      if (bodies[i]) {
        bodies[i].hidden = !isSelected;
      }
    });

    panels.forEach((panel, i) => {
      const isSelected = i === index;
      panel.hidden = !isSelected;
      panel.classList.toggle('is-active', isSelected);
    });

    if (focus && triggers[index]) {
      triggers[index].focus();
    }
  }

  // Set up trigger keyboard & click navigation
  triggers.forEach((trigger, index) => {
    trigger.setAttribute('role', 'tab');
    trigger.setAttribute('aria-controls', panels[index]?.id || '');
    if (panels[index]) {
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', trigger.id);
      panels[index].tabIndex = 0;
    }

    const onClick = () => selectScenario(index);
    const onKeyDown = (event) => {
      const next = getWhyIndexForKey(event.key, index, triggers.length);
      if (next < 0 || event.altKey || event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      selectScenario(next, { focus: true });
    };

    trigger.addEventListener('click', onClick);
    trigger.addEventListener('keydown', onKeyDown);
    removeListeners.push(() => {
      trigger.removeEventListener('click', onClick);
      trigger.removeEventListener('keydown', onKeyDown);
    });
  });

  // Responsive DOM placement: Desktop (right host) vs Mobile (accordion item)
  const pageWindow = root.ownerDocument.defaultView || window;
  let mql = null;

  if (pageWindow.matchMedia) {
    mql = pageWindow.matchMedia('(max-width: 860px)');

    const syncLayout = (e) => {
      const isMobile = e.matches;
      if (isMobile) {
        panels.forEach((panel, i) => {
          if (items[i] && panel && panel.parentElement !== items[i]) {
            items[i].appendChild(panel);
          }
        });
      } else if (desktopHost) {
        panels.forEach((panel) => {
          if (panel && panel.parentElement !== desktopHost) {
            desktopHost.appendChild(panel);
          }
        });
      }
    };

    mql.addEventListener('change', syncLayout);
    syncLayout(mql);
    removeListeners.push(() => mql.removeEventListener('change', syncLayout));
  }

  // Scenario 1 Sub-interaction: Filter Buttons inside mockup
  const filterButtons = [...root.querySelectorAll('[data-stock-filter]')];
  const stockRows = [...root.querySelectorAll('[data-stock-category]')];

  function applyStockFilter(category) {
    filterButtons.forEach((btn) => {
      const isActive = btn.dataset.stockFilter === category;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('is-active', isActive);
    });
    stockRows.forEach((row) => {
      const matches = row.dataset.stockCategory === category;
      row.hidden = !matches;
    });
  }

  filterButtons.forEach((btn) => {
    const onFilterClick = () => applyStockFilter(btn.dataset.stockFilter);
    btn.addEventListener('click', onFilterClick);
    removeListeners.push(() => btn.removeEventListener('click', onFilterClick));
  });

  // Scenario 2 Sub-interaction: Activity item selection
  const activityButtons = [...root.querySelectorAll('[data-activity-id]')];
  const detailPanel = root.querySelector('[data-activity-detail]');

  function selectActivity(id) {
    activityButtons.forEach((btn) => {
      const isSelected = btn.dataset.activityId === id;
      btn.setAttribute('aria-pressed', String(isSelected));
      btn.classList.toggle('is-active', isSelected);
    });

    const entry = getActivityEntry(id);
    if (detailPanel && entry) {
      const userEl = detailPanel.querySelector('[data-field="user"]');
      const timeEl = detailPanel.querySelector('[data-field="time"]');
      const medEl = detailPanel.querySelector('[data-field="medicine"]');
      const flowEl = detailPanel.querySelector('[data-field="flow"]');
      const reasonEl = detailPanel.querySelector('[data-field="reason"]');
      const refEl = detailPanel.querySelector('[data-field="ref"]');

      if (userEl)
        userEl.textContent = `${entry.details.user} · ${entry.details.role}`;
      if (timeEl) timeEl.textContent = entry.timestamp;
      if (medEl)
        medEl.textContent = `${entry.details.medicine} (${entry.details.batch})`;
      if (flowEl) flowEl.textContent = entry.details.flow;
      if (reasonEl) reasonEl.textContent = entry.details.reason;
      if (refEl) refEl.textContent = entry.details.reference;
    }
  }

  activityButtons.forEach((btn) => {
    const onActClick = () => selectActivity(btn.dataset.activityId);
    btn.addEventListener('click', onActClick);
    removeListeners.push(() => btn.removeEventListener('click', onActClick));
  });

  // Scenario 3 Sub-interaction: Period switcher inside mockup
  const periodButtons = [...root.querySelectorAll('[data-owner-period]')];
  const overviewPanel = root.querySelector('[data-owner-overview]');

  function selectPeriod(periodKey) {
    periodButtons.forEach((btn) => {
      const isSelected = btn.dataset.ownerPeriod === periodKey;
      btn.setAttribute('aria-pressed', String(isSelected));
      btn.classList.toggle('is-active', isSelected);
    });

    const data = getOwnerOverview(periodKey);
    if (overviewPanel && data) {
      const skusEl = overviewPanel.querySelector('[data-stat="skus"]');
      const movementsEl = overviewPanel.querySelector(
        '[data-stat="movements"]'
      );
      const attentionEl = overviewPanel.querySelector(
        '[data-stat="attention"]'
      );
      const attentionDetailEl = overviewPanel.querySelector(
        '[data-stat="attention-detail"]'
      );
      const billsEl = overviewPanel.querySelector('[data-stat="bills"]');
      const updatedEl = overviewPanel.querySelector('[data-stat="updated"]');

      if (skusEl) skusEl.textContent = data.activeSkus;
      if (movementsEl) movementsEl.textContent = data.totalMovements;
      if (attentionEl) attentionEl.textContent = data.attentionItems;
      if (attentionDetailEl)
        attentionDetailEl.textContent = data.attentionDetail;
      if (billsEl) billsEl.textContent = data.settledBills;
      if (updatedEl) updatedEl.textContent = data.lastUpdated;
    }
  }

  periodButtons.forEach((btn) => {
    const onPeriodClick = () => selectPeriod(btn.dataset.ownerPeriod);
    btn.addEventListener('click', onPeriodClick);
    removeListeners.push(() => btn.removeEventListener('click', onPeriodClick));
  });

  // Initial selection
  selectScenario(0);
  applyStockFilter('low-stock');
  selectActivity('act-1');
  selectPeriod('today');

  root.classList.add('v-why-enhanced');

  return () => {
    removeListeners.forEach((cleanup) => cleanup());
  };
}
