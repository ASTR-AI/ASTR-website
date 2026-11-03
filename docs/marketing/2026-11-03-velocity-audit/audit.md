# Velocity visual consistency audit — 3 November 2026

Scope: current local checkout at /velocity.html; desktop 1440×900, mobile 390×844, narrow mobile 320×740. Read-only product review; no application changes. Screenshots in this directory were captured during this review. Judgments concern visual consistency, not conversion performance measured with users.

## Verdict and scorecard

The serif headings, dark canvas, warm accent and cream document previews make a coherent base. The page needs consolidation, rather than a redesign. Four named font families are present in computed styles: Lora, Geist Variable, Space Grotesk and JetBrains Mono. Four families are not inherently excessive; the avoidable issue is two interchangeable sans-serif body families and inconsistent role assignments.

Subjective scores: typography consistency 3/5; color consistency 4/5; spacing rhythm 3/5; responsive layout 4/5. No page-wide horizontal overflow measured at 390px or 320px. Horizontal feature rails deliberately clip the next card and provide controls; that clipping is not a layout defect.

## Findings

| ID | Issue and evidence | Heuristic | Severity | Effort | Recommendation |
| --- | --- | --- | --- | --- | --- |
| 1 | Footer navigation and legal text are extremely faint. Computed link colors include rgba(209,213,219,.4); legal links use .2 at 8.8px with 3px letter spacing. Screenshots 03 and 10 show the readability problem. | Visibility; recognition | Major | Small | Raise useful footer text contrast, enlarge legal links and reduce tracking. Keep decorative system labels visually subordinate. |
| 2 | Marketing body text switches from Geist section leads to Space Grotesk stock-card descriptions and operations text, then back to Geist workflow descriptions. Evidence: 02, 07, 14, 15 and computed styles. | Consistency | Minor | Medium | Use Geist for marketing body text and controls, Lora for headings, and monospace only for short IDs/metadata. Keep a separate preview type system where warranted. |
| 3 | Demo form introduces italic serif instructions/placeholders, small widely tracked uppercase labels, serif inputs, and a monospace CTA. At 390px, the 15.2px italic introductory paragraph wraps to four lines. Labels are 11.2px with 2.24px tracking; submit tracking is 4.2px. Evidence: 09, 10, 13. | Consistency; minimal design | Minor | Small | Retain the serif heading; use upright body text and inputs, 12–14px labels, and less tracking on labels/submit. This is a readability recommendation, not evidence the form fails. |
| 4 | Supporting text has many near-duplicate sizes and gray treatments: desktop examples include 11.2, 11.52, 12.16, 12.48, 12.8, 13.12, 13.6, 14.4 and 15.2px. Some are preview text, so these should not all be collapsed into one scale. Marketing notes vary between #9d9d98, #a3a19a-like warm grays and white at .45 opacity. Evidence: 02, 07, 12, 14 and computed styles. | Consistency; visibility | Minor | Medium | Consolidate marketing roles to body, compact body, caption and metadata tokens; consolidate light-on-dark text to primary, secondary and muted. Audit preview text separately. |
| 5 | Equivalent-looking section starts use different heading sizes and spacing. Most headings are 48px desktop/28px mobile; Medicine workflows and Risks and activity are 36px/24px. Source intentionally marks these as detail sections, so this is not an accidental CSS failure. Their full section presentation can still make the smaller scale look inconsistent. Evidence: 12 vs 14; 06 vs 07. | Consistency; hierarchy | Minor | Small | Preserve the smaller scale if they are clearly subordinate to an adjacent chapter; otherwise use the main section-heading token. Do not flatten a deliberate hierarchy without deciding its meaning. |
| 6 | Mobile whitespace is uneven: stock rail controls/note, supply lead-to-tabs/card internals, workflow footnotes, and the footer preamble create repeated empty bands. Padding varies from 24 to 56px at section starts, and paired section padding can accumulate. Evidence: 05–08 and 10. | Minimal design; consistency | Minor | Medium | Define major chapter and related-detail spacing, then measure the visible content-to-content gap, including notes, controls and both neighboring paddings. Reduce redundant gaps rather than forcing every section to identical padding. |
| 7 | Mobile hero drops both the product category and explanatory sentence present on desktop. The headline is attractive, but visitors see a tiny dashboard image before explicit retail/hospital pharmacy context. Evidence: 01 vs 04 and 11. | Match with real world; recognition | Minor | Small | Consider retaining one short 16px explanatory line under the headline. Keep the italic headline accent; it serves a clear role. |

## Measured hierarchy and spacing

| Section | Desktop H2 | Mobile H2 | Desktop padding top/bottom | Mobile padding top/bottom |
| --- | --- | --- | --- | --- |
| Stock | 48px | 28px | 80/80px | 56/56px |
| Reordering | 48px | 28px | 64/64px | 40/40px |
| Purchasing | 48px | 28px | 80/80px | 56/56px |
| Supply | 48px | 28px | 80/80px | 24/56px |
| Operations | 48px | 28px | 80/80px | 40/48px |
| Medicine workflows | 36px | 24px | 56/56px | 40/48px |
| Risks/activity | 36px | 24px | 56/56px | 40/48px |
| Comparison, FAQ, demo | 48px | 28px | 80/80px | 56/56px |

The black/cream/gold/olive palette works. Green/red inside product screenshots and statuses have a semantic purpose and are not evidence of too many brand colors. Gray variants are the consolidation opportunity.

## Top five quick wins

1. Make footer links and legal text readable.
2. Standardize marketing body copy and controls on Geist.
3. Simplify demo instructions, labels, inputs and CTA typography.
4. Consolidate marketing caption sizes and muted text colors.
5. Normalize mobile content-to-content gaps while preserving intentional chapter/detail hierarchy.

## Review sequence and health

1. Desktop hero/navigation — strong visual identity; tiny tracked actions and a long animated overview merit restraint (01).
2. Desktop stock — clear card hierarchy; body-family drift and small preview annotations (02).
3. Desktop footer — poor text visibility (03, filename retains its original capture label).
4. Mobile hero — fits at both tested widths; category/context omitted and dashboard details too small to read directly (04, 11).
5. Mobile stock/reordering transition — functional rail; excess whitespace around supporting controls/notes (05, 15).
6. Mobile hospital supply — readable card and clear stages; generous internal/section whitespace (06).
7. Mobile medicine workflows/risks transition — readable, deliberate next-card preview; smaller section scale and stacked notes (07).
8. Mobile FAQ — comfortable question rows; long questions wrap naturally, serif styling remains coherent (08).
9. Mobile demo — coherent structure, over-varied typography (09).
10. Mobile demo/footer transition — prominent submit, faint footer and substantial preamble spacing (10).
11. Desktop risks — clear active scenario, inactive supporting details faint; smaller heading role is intentional (12).
12. Desktop demo — clear two-column composition; form typography is noticeably different from surrounding body copy (13).
13. Desktop operations — clear hierarchy and product document; tiny metadata and sans-serif-family drift (14).

Limits: selected rendered states and computed styles were inspected. Purchasing and comparison were inspected through DOM/style measurements and adjacent transitions, not exhaustively screenshotted in all expanded states. Alternate operations tabs, every carousel card, form submission/error states, keyboard navigation and screen-reader behavior were not exhaustively tested. This is not a WCAG compliance certification. Footer contrast is a strong visual/accessibility concern; no exhaustive per-pixel contrast matrix was generated. No redesign mockup is necessary to communicate this consistency audit.
