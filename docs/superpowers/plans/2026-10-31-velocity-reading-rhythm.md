# Velocity Reading Rhythm Implementation Plan

**Approved direction:** `docs/marketing/2026-10-31-openai-velocity-spacing-comparison.md`; user requested implementation throughout the page.

**Goal:** Reduce perceived density through content hierarchy, meaningful chapter spacing, progressive detail, quiet visual framing, and fewer persistent controls.

## Decisions

- Main chapter padding: 56px per side on phones (112px between ordinary chapters), 80px on larger screens. Connected workflows and attention/oversight are related detail sections: 40px per side on phones / 56px larger screens. One owner controls exterior padding. Keep existing mobile internal 16px text / 32px intro gaps.
- Shorten all ten section titles and lead text around one purpose each. Retain Lora; major section headings use 500 weight with no repeated italic continuations. Hero identity remains intact.
- Keep every capability and qualification available. Use native disclosures for explanatory reorder and purchasing steps, outside interactive document rails, and for the optional comparison checklist. Related detail titles are 24px on phones / 36px larger screens. Keep all existing section IDs, table semantics, controllers, forms, and product examples.
- Remove the redundant bottom enquiry strip from this page. Existing fixed-header demo action, hero CTA, demo form, and email links remain. The conversion initializer already supports an absent bar and retains CTA telemetry.
- Calm mobile card frames, shadows, gradients, and nested visual shells; retain document typography and meaningful badges. Put the reorder summary below its image in natural flow.
- Implement and inspect Inventory/Reordering as a representative pair, then validate the complete page at 320/390/430/768/1440px.

## Work

- [x] Update `velocity.html` and owning CSS rules; preserve unrelated work.
- [x] Verify hierarchy, default/expanded details, all rails, Operations tabs, comparison disclosure, FAQ, and demo layout. Confirm no horizontal page overflow and no fixed bottom CTA.
- [x] Run existing Node tests, production build, and diff checks. Save screenshots and a verification note. Use browser geometry and visual inspection for CSS, without implementation-mirroring tests.
