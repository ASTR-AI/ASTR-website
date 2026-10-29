# Velocity comparison section — proposed design

## Intent and scope

Replace “Plan a setup around your pharmacy” between Why Velocity and the FAQ with a buying comparison that explains Velocity's differentiators. The user requested an implementation plan; this document records the proposed design for that plan, not approval to implement or publish it.

Keep the current dark/gold identity, readable product copy, native document scrolling, and existing demo destination. Leave surrounding sections intact. No application features, integrations, tax-filing backend, or deployment are part of this website change.

## Approach

Recommended proposal: a semantic three-column table: “Capability”, “What to check in other software”, “Velocity”. The middle column contains evaluation questions, not unsupported statements about competitors. Highlight Velocity's column subtly. All rows remain visible without JavaScript; on small screens only the table scrolls horizontally, with a sticky capability column.

Alternatives considered: named competitor columns give a more direct comparison but require current product-specific research; a two-column capability list is simpler but does not provide the requested buying comparison. The recommended approach has not yet been selected explicitly by the user.

Heading: “Compare what matters to your pharmacy.”
Intro: “Look beyond billing. Compare how your team finds medicines, moves stock, collects payments, and plans the next order.”
Qualification below the table: “Use these questions when evaluating other software. Capabilities vary by product and plan. Confirm your Velocity setup in a demo.”
CTA: “Book a demo” → `/connect?product=velocity`.

## Proposed rows and exact capability wording

| Capability | What to check in other software | Velocity |
| --- | --- | --- |
| Search by salt composition | Can you find stocked medicines with matching salt composition? | Find medicines with the same salt composition and see where they are stocked. |
| Loose-medicine tracking | Can you track individual units as well as full packs? | Track loose units alongside full packs and see remaining quantities. |
| POS on staff devices | Can staff collect invoice payments from their own devices? | Staff can collect invoice payments directly on their devices, helping customers avoid a separate billing queue. |
| AI-powered reorder recommendations | Do reorder suggestions use stock and consumption patterns? | Use AI-based predictive analysis to recommend medicine reorders, with staff reviewing the suggestions. |
| Staff stock-transfer requests | Can staff request stock from other locations? | Staff across multiple locations can raise stock-transfer requests. |
| Stock across locations | Can you check medicine availability at each location? | See which medicines are available and in what quantities across locations. |
| Automatic narcotics tracking | How are narcotic medicines tracked? | Automatically track narcotic medicines within pharmacy operations. |
| Staff noticeboard and tasks | Can staff see operational notices and assigned tasks? | Give staff a shared place to see their tasks and operational notices. |
| In-depth operational analytics | Can you investigate operations beyond billing totals? | Explore inventory, purchasing, sales, supplier, and hospital reports, including slow-moving stock and expiry risk. |
| Remote owner visibility | Can owners access reports away from the pharmacy? | Access available reports and recorded activity through a browser with an internet connection. |
| Vendor payment records | Can you review supplier payments alongside purchasing records? | Record vendor payments and review payment history alongside purchasing records. |
| Batch and expiry tracking | Can you follow batches and identify stock nearing expiry? | Track medicine batches and identify stock nearing expiry across locations. |
| One-click Tally sync and GST audit export | How does pharmacy data reach the accounts team? | One-click Tally sync and GST audit export. |
| GST return filing | Is direct return filing available today? | Coming soon. |

Salt search, loose units, staff-device POS, predictive reordering and transfer requests lead the list as prominent differentiators. Do not add “only”, “exclusive”, competitor crosses, competitor logos, or an unsupported market-superiority badge. The user's belief about exclusive loose-unit tracking is not a verified market survey.

## Claim boundaries

- User-confirmed additions in this conversation are the source for staff-device POS, transfer requests, AI reordering, noticeboards, salt search, narcotics tracking, and the requested Tally wording. Existing product-story notes support reports, multi-location inventory, loose units, payments, and exports.
- The user explicitly superseded “Tally XML export” with “one-click Tally sync”. Use their wording here; do not infer continuous two-way sync or describe that architecture elsewhere. Product notes still describe exports, so reconcile the discrepancy against the app before release and record the result.
- GST return filing is a user-requested roadmap item. Its cell must visibly say “Coming soon”; never give it an available/checkmark treatment or a delivery date.
- Do not equate salt matches with safe clinical substitution, narcotics tracking with guaranteed regulatory compliance, or recorded stock with detection of unrecorded loss.
- Do not imply autonomous purchasing, universal device/payment-method support, or real-time freshness for every report.
- “Location” means stock availability at pharmacy locations, not staff GPS tracking.

## Accessibility and verification

Use a table caption, column headers and row headers. A labelled keyboard-focusable scroll container is appropriate where overflow exists. Text conveys availability; color alone does not. Keep essential content static and available without scripting. Verify narrow screens, 200% zoom, keyboard focus, reduced motion, and the sticky mobile conversion bar. No tabs, filters, new animation, runtime dependencies, or new product imagery are needed.

## Decisions left for review

Approve the proposed comparison columns and full 14-row selection before implementation. Named competitors would change the scope by adding a research task. The layout, copy and source boundaries above are the implementation proposal.
