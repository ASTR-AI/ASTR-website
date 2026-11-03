# Velocity heading typography review

Review only; no product styles changed. UI UX Designer typography and hierarchy guidance applied. Read current CSS and measured computed heading styles at 320×740, 390×844, and 1440×900. Captured and inspected current 390px heading excerpts under `screenshots/mobile-typography-review/`.

## Verdict

The serif/italic brand direction is recognizable, but equivalent section headings and card titles do not follow one consistently applied type scale. The typography is readable in the inspected screenshots; readability alone does not establish a coherent hierarchy or accessibility compliance.

## Evidence

At 390px:

| Role / section | Size | Weight | Font |
| --- | --- | --- | --- |
| Hero H1 | 33.15px | 700 | Lora |
| Inventory H2 | 26.52px | 700 | Lora |
| Reordering H2 | 26.52px | 700 | Lora |
| Purchasing H2 | 32px | 700 | Lora |
| Supply H2 | 32px | 700 | Lora |
| Operations H2 | 26.52px | 700 | Lora |
| Capabilities H2 | 26.52px | 700 | Lora |
| Why Velocity H2 | 26.4px | 700 | Lora |
| Comparison H2 | 32px | 500 | Lora |
| FAQ H2 | 26.52px | 700 | Lora |
| Demo H2 | 32px | 700 | Lora |
| Inventory card H3 | 20.8px | 500 | Lora |
| Reorder workflow H3 | 14px | 600 | Space Grotesk / system fallback stack |
| Purchasing feature H3 | 16.8px | 600 | System sans-serif |
| Operations panel H3 | 22.23px | 500 | Lora |
| Capability card H3 | 17px | 600 | Lora |
| Demo form H3 | 26px | 600 | Cinzel |

The inset Key Capabilities heading is 18px Geist at 390px. It has a different visual role from a top-level section heading, so making it the same size solely because it uses H2 would be inappropriate.

At 320×740, Capabilities falls to 22px while Purchasing, Supply, Comparison, and Demo remain 32px—the same size as the H1. On desktop at 1440px, main section headings span 44.8–56px; the H1 is 60.8px. These differences come from independently defined clamps and overrides.

## Findings

1. **Major consistency issue:** equal-rank main section headings vary by approximately 21% in size at 390px. Standardize their scale, line height, and default weight.
2. **Major hierarchy issue on small phones:** several H2s equal the H1 size while the Capabilities H2 shrinks independently. Keep hero and section roles distinct without shrinking based on viewport height alone.
3. **Minor/medium card-system issue:** equivalent marketing feature titles mix Lora and system sans-serif stacks and vary from 16.8 to 22.23px. Establish normal card titles and compact workflow labels as two explicit roles. Product-document previews may retain separate typography.
4. **Minor brand inconsistency:** the form title introduces Cinzel and nearly matches a major section heading. Prefer the shared card/panel heading treatment for this title unless Cinzel is an intentional form-brand convention.
5. **Minor weight consistency issue:** Comparison uses weight 500 versus 700 for peers. Most section italics request weight 300 while Operations panel italics use 400. The imported Lora Google Fonts URL supplies 400–700; define supported weights intentionally rather than relying on requested 300 mapping.

## Recommended type system

These values are a page-specific recommendation, not a mandated SaaS or WCAG pixel scale.

| Role | Phone | Desktop | Style |
| --- | --- | --- | --- |
| Hero | 32px narrow / 36px typical | 56–64px | Lora 700, line height 1.15 |
| Main section title | 28px | 44–48px | Lora 700, line height 1.2 |
| Card / panel title | 20px | 24px | Lora 600, line height 1.3 |
| Compact workflow title | 16px | 16–18px | Geist 600, line height 1.4 |
| Eyebrow | 12px | 12px | Existing metadata face, restrained tracking |

Keep italic accents as the existing brand motif, with a consistent weight of 400 and restrained use. Use Lora for editorial headings, Geist for explanatory/interface text, and monospace for metadata. Avoid adding independent font families to individual marketing cards. Preserve special document-preview roles instead of forcing every H3 into the same appearance.

## Standards and limits

- NN/g recommends a clear visual hierarchy using relative size and consistent visual treatments: https://www.nngroup.com/articles/principles-visual-design/
- W3C requires meaningful heading structure; heading levels communicate content organization rather than prescribing exact pixel sizes: https://www.w3.org/WAI/tutorials/page-structure/headings/
- This review did not comprehensively test contrast, 200% zoom, text-spacing overrides, or screen-reader reading order. No full WCAG compliance claim is made.

No implementation was requested in this turn; existing typography remains unchanged.
