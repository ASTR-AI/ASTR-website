# Section 06: The full picture

## Intent

Help customers understand the breadth of Velocity at a glance, while matching the existing Velocity page. Section 06 summarises the workflows demonstrated earlier on the page.

## Approaches

The user selected capability cards over expandable feature groups. Cards expose the offering immediately; expandable rows take less space but hide details behind interaction. A software navigation explorer would add unnecessary interaction to this summary.

## Proposed design

Retain “06 / The full picture” and use the heading “Everything your pharmacy needs. Connected.” with the supporting sentence “From medicine stock to purchasing, daily operations, and accounts—see what your team can manage with Velocity.”

Show four equally weighted cards in a two-column desktop grid, stacking on mobile:

1. **Inventory & medicines** — Know what is available and where. Cover catalogue and categories; batch/location stock and pack/loose quantities; expiry monitoring and authorised adjustments; separately tracked assistance-program stock where configured.
2. **Purchasing & suppliers** — Keep ordering and receiving connected. Cover purchase orders, approvals and receipts; supplier bills and direct purchases; supplier/payment and representative records; reorder recommendations using stock and consumption history.
3. **Pharmacy & hospital supply** — Follow medicines through daily work. Cover counter billing, transactions and credit settlement; transfers, picking, dispatch and receipt; ward issue, consumption and returns. Clearly mark hospital workflows as setup-dependent.
4. **Reports, accounts & access** — Give each team a clearer view. Cover stock/purchasing/supplier/hospital/financial reporting; Tally XML and GST audit spreadsheet exports; organisation, receipt and GST settings; access permissions and recorded activity.

Each card contains a small restrained gold line icon, a clear category heading, a short benefit sentence, and four concise capability rows. Use existing near-black surfaces, fine borders, serif category headings, sans-serif explanatory copy, and gold accents. Avoid dashboard mockups or fake controls: these cards are a readable offering summary. No carousel, tabs, or new JavaScript.

Replace the six audience descriptions with a compact closing line: “For independent pharmacies and hospital teams.” Add one availability note: “Module availability depends on your configured setup.” This keeps the focus on the offering and avoids repeating benefits from preceding sections.

## Scope and verification

Changes are scoped to section #features and its CSS; preserve earlier section edits and section 07. Keep all existing capability claims represented in concise language, including setup qualifications. Use semantic headings and lists, readable contrast, and decorative icons hidden from assistive technology. Verify desktop and mobile layout, no horizontal overflow, and production build. No new dependencies or publication.

## Approval

Capability-card approach and detailed design approved by the user: “okay finish it efficiently”.

## Reference-led revision

The user supplied a screenshot on 26 October and requested its aesthetic composition. Replace the grid with a large left product preview and four open numbered rows on the right, using fine horizontal rules, spacious headings, and concise capability copy. Reuse the real Velocity dashboard image rather than drawing a substitute UI. Retain the site's dark background, serif display type, gold accents, and all four capability areas. Numbers are index markers rather than product performance claims. On mobile, show the offering first and the product preview second. Preserve availability notes and the #features anchor.
