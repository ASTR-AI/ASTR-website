# Purchasing open columns design

## Intent and agreed direction

Replace the three glossy folder-shaped feature cards beneath the purchasing document previews with three open text columns. The user selected this direction and requested off-white instead of gold. Match the existing black background, serif headings, and sans-serif body text.

## Approaches considered

- **Open text columns (selected):** restrained typography and fine dividers; gives the document previews visual priority.
- **Numbered workflow:** communicates sequence, but the supplier/payment content is a supporting capability rather than a single sequential step.
- **Outlined cards:** a smaller visual change, but retains the box-heavy appearance the user wants to remove.

## Scope and constraints

- Change only the supporting feature block in `#purchasing`, plus its dedicated CSS and obsolete folder styles.
- Use no gold, yellow, beige, or warm metallic accents in the replacement. Use off-white `#f2f2ed`, body grey `#b5b5b5`, and divider `rgba(242, 242, 237, 0.18)`.
- Desktop: three equal-width columns on the existing section background, two vertical dividers, no enclosing boxes. Mobile at `760px` and below: stack in source order with two horizontal dividers.
- Use an `h3` and a paragraph in each column. The heading serves as the label; do not add redundant labels, numbers, or icons.
- No folder SVGs, gradients, shadows, card backgrounds, rounded containers, hover lift, or new animation.
- Keep existing fonts. No dependencies, new assets, JavaScript changes, or global theme changes.
- Existing gold elsewhere on the page is outside this localized replacement; do not introduce any gold in this work.
- Keep the section headline, introductory copy, document previews, connector, note, footer, and other sections unchanged. Earlier audit suggestions are separate work.

## Exact content

1. **Orders & approvals** — Create purchase orders and review them before ordering.
2. **Receiving** — Record delivered quantities, batches, expiry dates, and supplier bills.
3. **Suppliers & payments** — Keep supplier details, recorded payments, and bill corrections together.

## Acceptance

The replacement reads as part of the section, without folder/card silhouettes. It has equal columns above `760px`, stacked content at and below `760px`, readable copy at `320px`, no horizontal overflow, and no movement on hover. Existing purchasing previews and neighboring sections retain their behavior. Verify visually and run the production build.
