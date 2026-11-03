# OpenAI overview versus Velocity: spacing and reading density

Reviewed 31 October 2026 using UI UX Designer's layout/proximity/typography guidance and Superpowers' root-cause-first investigation. Review only: no product changes.

## Method

Opened the requested live reference: https://chatgpt.com/overview/?openaicom_referred=true . Its initial browser challenge resolved without intervention. Inspected its desktop hero at 1280×720 and its mobile page at an actual 390×844. Captured current Velocity at the same 390×844 size. Read computed geometry and typography, inspected screenshots, and traced the previous changes in local CSS.

Evidence is in `screenshots/openai-spacing-comparison/`. The browser's viewport setting applied to the latest created tab rather than the older reference tab, so the same 390px tab was used sequentially for both pages. Widths were checked explicitly before measurement.

## Main finding

The earlier work standardized spacing and font tokens but treated that as sufficient evidence of reading comfort. That conclusion was too strong. Velocity's remaining density comes from equal treatment of many sections, repeated explanation, nested visual containers, long emphatic titles, and persistent interface controls. Simply increasing every margin would not resolve these together.

## What the reference actually does

1. **Large chapter breaks, small internal gaps.** At 390px, its sampled feature block ends at y=1608 and pricing begins at y=1720: 112px between section bounds. Pricing ends at y=2028 and Safety begins at y=2196: 168px. Safety ends at y=2837 and Inspiration begins at y=3005: another 168px. These are measured gaps between rendered section boxes, not individual CSS padding declarations. Within content, title/body gaps include 8px, 12px, 16px, and 20px; images and mode descriptions have 24px separation. The gap hierarchy is substantially stronger than Velocity's typical 32px+32px exterior padding.
2. **Different typography for different jobs.** Main editorial H2s are approximately 32.2px/500; smaller callout H2s are approximately 24.1px/500; mode labels are approximately 20px/500. The hero is approximately 41px/700. Most headings share the same sans-serif family. They do not give every H2 an identical visual size. Their role system is consistent despite intentional variation.
3. **Grouped information.** Chat/Work/Codex share one mode carousel. Use cases share another visual rail. A card explains one purpose, accompanied by a large image. Detailed information is available through links rather than repeated across every block.
4. **Space inside the composition.** The Writing card leaves a substantial quiet area between its short description and lower image. Some of the perceived air is inside cards, not outside sections. Large product imagery can be understood as a visual preview without requiring the reader to inspect every miniature label.
5. **Less persistent competition.** The inspected reference has top navigation and inline CTAs, with no bottom conversion strip in the sampled mobile viewport. Velocity's fixed header measures 56px and its active bottom conversion bar 65px—121px, approximately 14% of an 844px screen, reserved for persistent chrome.

## Where Velocity differs

- All ten main sections receive 32px top/bottom padding, despite large differences in length, detail, and purpose. Main section sizes range from roughly 650px to more than 1700px at 390px. Equal padding does not give these chapters equal perceptual breathing room.
- All main section titles now use 28px Lora 700. This solved accidental size drift, but bold serif headings plus frequent italic continuations create more visual texture than the reference's mostly weight-500 sans-serif headings. Serif typography itself is not a usability defect.
- Several headlines combine multiple tasks and wrap across two or three lines. They are followed by descriptions, rail controls, document previews, explanatory cards, and qualifications. A reader repeatedly has several levels of information to process.
- Inventory, Capabilities, Why Velocity, and Comparison revisit stock, batches, expiry, and purchasing. Repetition increases the amount to scan even when each block individually fits.
- Light documents sit inside dark frames, with nested panels, badges, borders, shadows, and sometimes animation. These increase perceived density and compete with the main story.
- The current page is approximately 12,669px tall versus 4,677px for the reference at the measured width. This is a description of these two page states, not proof that the longer page is inherently worse: the products and required content differ.
- Outer gutters are already reasonable. Changing the 20px Velocity gutter to match the reference's 16px main container is unlikely to solve the concern.

## Recommended next direction

These are hypotheses for the next design pass, not universal standards or changes implemented in this review.

- Use about 96–128px **total separation** at major chapter transitions, with 64–80px for related subsections. Test visually rather than copying the reference's 168px wholesale. Give the gap one owner to avoid compounded margins.
- Retain 12–16px for related text and 24–32px between introduction and visual. Keep card padding around 20–24px, but let image compositions contain quiet space.
- Define semantic roles: hero, major chapter, subsection/callout, card label, and metadata. Keep a consistent treatment within a role rather than treating all HTML H2s identically.
- Shorten multiline task-list headlines and their lead paragraphs. For example, a title such as “Medicine supply” can carry a single explanatory sentence below it. Treat final wording as a separate copy decision.
- Consolidate repeated stock/expiry messaging, and consider grouping related workflows into fewer chapters with progressive detail. Preserve required product qualifications and access to information.
- Reduce nested frames and decorative emphasis; retain a single clear visual focus per block. Product documents should support the message instead of asking visitors to read every small row.
- Reassess the persistent bottom CTA on mobile—its prominence, frequency, and occupied space—alongside the existing top demo action.
- Prototype one representative chapter and its neighboring transitions before changing every section again. Judge a real 390px reading viewport, including fixed controls, and get user feedback before rolling out the pattern.

## Interpretation and limits

The measurements and screenshot observations are direct evidence. Their contribution to perceived comfort is a design interpretation, supported by the user's report, not a controlled usability result. No claim is made that a specific font, gap, or page length is mandated by WCAG or SaaS design standards. This review did not modify code or run product tests.
