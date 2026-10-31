# Compact mobile operations section

Verified October 31, 2026 in the local browser preview.

- At 390 × 844, the section measures 659px high. The heading, tabs, complete workflow copy, and module availability note fit between the fixed navigation and enquiry bar when aligned to the section.
- At 320 × 740, the section measures 576px high. Short-screen rules hide the generic introduction and repeated workflow eyebrow, reduce card padding, and retain all workflow descriptions, bullets, and qualifications. The accounts tab, including its longer qualification, fits above the enquiry bar.
- All four tabs were selected at 320px; selection and mockup hiding were verified. The shared grid keeps their card heights stable.
- Document mockups are hidden only below 768px. At 768px the document and tablet subgrid remain visible; at 1440px the two-column layout remains in place.
- Existing operations tests: 5 passed. Production build passed; the build still reports CSS at-rule and Browserslist warnings.
- Screenshots: `screenshots/mobile-responsiveness/operations-compact-320x740.png` and `screenshots/mobile-responsiveness/operations-compact-390x844.png`.

No fixed section height, clipped text, or internal vertical scroll was introduced. Very short viewports and enlarged text may still require natural page scrolling.
