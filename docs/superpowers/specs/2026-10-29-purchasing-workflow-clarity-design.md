# Purchasing workflow clarity design

## Intent

Address the remaining purchasing audit findings after the completed folder-to-open-columns replacement: expose the approval step, explain the receipt excerpt and its order reference, correct receipt hover movement, and improve small-text readability.

## Existing work to preserve

The current `velocity.html` and `velocity.css` include uncommitted implementation of the open columns. Preserve `.v-purchase-features`, `.v-purchase-feature`, their content, and their responsive styling. The abstract folder copy finding is already resolved. Do not reimplement the earlier folder plan.

## Proposed design decisions for this plan

- Keep the headline, introduction, two document previews, their paper backgrounds, and current mobile stacking. Add no third document or interactive controls.
- Place a semantic, non-interactive three-step ordered list between the demo caption and the document pair: **Create order**, **Review & approve**, **Record receipt**. Use three equal columns above `760px`, stacked items at and below `760px`. Numbers and fine rules communicate order without new decorative assets. Keep the existing connector purely decorative.
- Keep the PO's `Pending approval` status: it illustrates the first stage, not a completed order. Replace the stage note with: **“Illustrative stages: your team reviews and approves the order before recording a delivery.”** This explains that the two documents represent different points in time; no automatic approval or receipt is implied.
- Retain the goods receipt title and existing one-medicine detail. Change its `Receipt example` badge to **Receipt excerpt**. Add a visible line beneath the receipt heading: **Against PO–0024 · Showing 1 of 2 ordered medicines**. This describes the excerpt, not a partial-delivery status. Do not invent the missing medicine's receipt, batch, expiry, or fulfillment outcome.
- Change receipt hover from `translateY(48px)` to `translateY(-4px)`. Its normal `margin-top: 52px` stays; mobile keeps `margin-top: 0`. Preserve the order card's existing small lift. For `prefers-reduced-motion: reduce`, disable both documents' transitions and hover transforms, scoped to this section.
- Improve all document metadata, table headers, supporting medicine text, badges, counts, and footer microcopy to at least `0.8125rem` (13px at the default root size), with line-height at least `1.45`. Document body/table text must be at least `0.875rem` (14px). Existing larger text stays larger. Do not reduce font size at mobile breakpoints.
- Use `#555750` for secondary text on the light document backgrounds; retain existing dark heading/body colors. Change the stage note to `#b5b5b5`, `0.9375rem`, line-height `1.65`. Use `#f2f2ed` for sequence labels and the demo caption on black, with neutral rules `rgba(242, 242, 237, 0.24)`.
- Honor the user's no-gold preference within the purchasing section: make the caption, connector, document arrow accents, circular symbol borders, pending badge, and closing `Connected.` accent neutral. Pending badge: background `#e4e5df`, text `#454740`, border `#c7c9c0`; document symbols: text `#555750`, border `#c7c9c0`. Existing green receipt-status treatments and paper backgrounds may remain. Do not change sitewide tokens or other sections.

## Alternatives considered

- **Sequence above the documents (selected proposal):** keeps the documents legible and works with their existing narrow connector.
- **Approval label squeezed into the connector:** crowds the `56px` desktop connector and complicates mobile layout.
- **Third approval document or automated animation:** adds bulk or implies unsupported automation.
- **Receipt excerpt (selected proposal) versus adding the second medicine:** excerpt labeling explains the existing data without inventing receipt details.

## Acceptance

The approval sequence and manual handoff are visible, the receipt refers to the same PO and explicitly identifies its excerpt, neither preview moves downward on hover, the note remains unobscured, and small copy remains readable without horizontal overflow. Preserve the completed columns and neighboring sections. Verify at `1440`, `1024`, `761`, `760`, and `320` CSS pixels, plus 200% zoom and reduced motion. Small text must meet a measured contrast ratio of at least 4.5:1 against its rendered background.

## Scope boundary

This is static marketing preview content. No actual purchasing logic, new functionality, dependencies, JavaScript, global redesign, or deployment is required. Values above are concrete implementation proposals prepared for the requested plan.
