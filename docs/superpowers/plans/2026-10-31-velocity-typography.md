# Velocity Typography Implementation Plan

**Goal:** Apply the heading hierarchy approved in `docs/marketing/2026-10-31-velocity-typography-review.md`.

**Approach:** Use explicit marketing heading roles and shared responsive CSS tokens. Keep the existing Lora/italic identity and separate product-document typography. Preserve prior spacing changes. Work inline in the current checkout.

- [x] Mark hero, main section, and marketing card/panel titles in `velocity.html`; use existing selectors for compact workflow titles and define role typography in `velocity.css`. Main titles: 28px phone, fluid 32–48px larger screens, 700 weight. Existing workflow !important declarations are updated at their owner. Hero: 32px narrow phones, 36px phones, fluid up to 64px desktop. Card/panel titles: 20px phone / 24px desktop, 600 weight. Compact workflow titles: 16px Geist 600. Italic accents: Lora 400. Preserve inset headings and demo-document details.
- [x] Verify computed sizes, families, weights, and wrapping at 320, 390, 430, 768, and 1440px. Inspect mobile cards, longest Operations heading, and demo form; confirm no page overflow or loss of spacing.
- [x] Run existing tests, build, and diff check. Save screenshots and verification notes. No CSS-string tests for a reversible presentation-only change.
