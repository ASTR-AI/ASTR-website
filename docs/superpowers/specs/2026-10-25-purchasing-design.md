# Section 03: Purchasing & suppliers

## Intent and scope

Bring `#purchasing` up to the visual standard of the stock and reorder sections. Help visitors understand the connection between ordering, receiving medicines, and keeping supplier records. Change only purchasing markup in `velocity.html` and scoped rules in `velocity.css`; preserve existing uncommitted work.

## Approaches

The user selected a connected workflow with illustrative order and receipt previews. Two alternatives were feature cards echoing the inventory carousel (less clear sequence) and a typography-only workflow (less product context).

## Proposed design

- Keep the existing 03 label and headline, with a spacious, left-aligned introduction on the existing near-black background. Use the established Lora typography, shared container, muted supporting copy, and restrained gold accents.
- Replace the two capture-pending blocks with one cohesive charcoal stage containing two offset, complementary document previews: Purchase order and Goods receipt. Use warm light document surfaces, fine rules, clear headings, and restrained status details. A small connecting arrow communicates sequence without suggesting automatic approval or receipt.
- Label the stage “Illustrative workflow · Demo data”. Show only supported concepts: supplier, medicine and quantity on the order; received quantity, batch and expiry on the receipt. Example values are illustrative. Avoid fake interactive controls or claims that this is a real product screenshot.
- Beneath the stage, use three unboxed explanations: Prepare the order; Review and receive; Keep suppliers connected. Preserve the existing capabilities in concise copy: approval, rejection and cancellation; batch and expiry; supplier bills, controlled corrections and payment history.
- Close with a quiet divider and the statement “Orders, receipts, and supplier records. Connected.” No extra CTA or new animation is needed.
- Desktop: paired previews within a generous stage, approximately 24px outer radius, shared page gutters, and three explanation columns. Mobile: stack previews in reading order, replace the horizontal connector with a vertical one, and stack explanations. Text determines height; no miniature wide tables or clipped content.

## Builder decisions

Use semantic HTML/CSS and inline decorative SVG only. No dependencies, screenshot fabrication, carousel, or new JavaScript. Exact spacing, document proportions, and preview values may be tuned during browser review.

## Verification

Check desktop, tablet, and 390px mobile layouts, heading hierarchy, text contrast, overflow, and the adjacent sections. Run the existing inventory tests and production build. The illustrative label remains visible at every size.

## Approval

Approach and detailed design approved by the user: “Approve and implement”.
