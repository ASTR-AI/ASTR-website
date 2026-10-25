# Combined sections 05–07: Everyday operations

## Intent and evidence

Combine counter/ward work, accounts/exports, and reports/responsibility into one compact section after Hospital supply. The current page and `Solutions/Velocity/Marketing/astr-pharmacy-product-story.md` ground the capability claims. Present supporting breadth without calling these features secondary to buyers: counter billing may be central for an independent pharmacy.

## Approaches

The user selected a tabbed showcase with four visible workflow labels. A four-card carousel would echo inventory but conceal later categories until navigation; a static grid would expose everything but leave less space for each workflow. Tabs give visitors a direct choice and keep one readable illustration in view.

## Section presentation

- Label: “05 / Everyday operations”. Heading: “Everyday work. <em>Connected.</em>” Supporting copy: “From counter sales to accounting exports, give each team a clearer view of their work.”
- Retain the near-black page background and floating style. No enclosing section panel. Reuse serif headlines, muted sans-serif descriptions, monospace labels, and restrained gold accents.
- Four labelled selectors remain visible: Counter & billing; Ward operations; Accounts & exports; Reports & access. Default to Counter & billing.
- Beneath the selectors, show one two-column presentation: an outcome-led heading, short description and three capability points on the left; a floating illustrative product document on the right. Use warm ivory and soft sage surfaces consistent with purchasing. Show “Illustrative preview · Demo data” with every illustration.
- Each illustration demonstrates the category without fake clickable controls, real customer data, invented performance metrics, or claims of a real screenshot.

## Panel content

1. **Counter & billing** — “Keep the counter moving.” Sales, recorded payments, downloadable bills, transaction history, credit settlements, and daily summaries. Preview: an illustrative bill with medicine line items and payment record. No patient data.
2. **Ward operations** — “Follow medicines beyond the pharmacy.” Ward issues, consumption, scan-based workflows and returns. Preview: a location-based issue/consumption/return record. Explicit note: available for enabled hospital setups.
3. **Accounts & exports** — “Prepare the next accounting step.” Supplier payment history, ledger mappings, organization/GST settings, Tally XML and GST audit spreadsheet exports, previews and history. Preview: two clearly named export documents plus mapping/history details. No implication of automatic filing or continuous Tally synchronization.
4. **Reports & access** — “See what needs attention.” Stock, purchasing, supplier, hospital and financial reporting; low stock, expiry and slow-moving items; role-based access, approvals and recorded inventory activity. Preview: a small stock-attention report labelled as an example reporting period. Explicit note that some reports use snapshots and users should check periods/freshness.

Condense prose while retaining these capabilities; the existing full feature reference provides the detailed index. Use one small note below the showcase that module availability depends on the configured setup. No repeated demo CTA is needed.

## Interaction, responsive behaviour, accessibility

- Clicking a tab switches its illustration and content together. No autoplay or automatic cycling.
- Use accessible tab semantics, an evident active state, keyboard arrows plus Home/End, visible focus and touch targets at least 44px. On mobile use a two-by-two selector layout, then stack text and illustration. No horizontal page overflow.
- All panels are readable in normal document flow without JavaScript. Add tab semantics and hide inactive panels only after successful enhancement.
- Retain existing `#daily-work`, `#accounts` and `#visibility` deep-link destinations and activate their associated view when enhanced. Add a ward-specific deep link.
- Keep essential content static and respect reduced motion.

## Implementation scope and checks

Replace the three sections with one section in `velocity.html`; add scoped CSS and a small isolated tabs controller initialized by `velocity-page.js`. Preserve sections 01–04 and their current edits. Renumber the following full-feature index to 06 and FAQ to 07, without changing their content.

Verify all four click targets, keyboard navigation, legacy deep links, fallback markup, 1280px/768px/390px/320px reflow, no overflow, production build and existing inventory tests. No new packages, publication or commit needed.

## Approval

Tabbed approach and detailed design approved by the user: “Approve and implement”.
