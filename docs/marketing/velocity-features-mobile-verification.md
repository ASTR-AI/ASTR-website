# Compact medicine workflow carousel

Verified October 31, 2026 in the local browser preview.

- Mobile cards occupy 80% of the content width, capped at 280px, exposing the adjacent card. Previews use compact natural document layouts rather than full-width square frames. Main card titles and descriptions remain intact.
- At 390 × 844, the section measures 699px. The heading begins at 104px and both footer notes end at 755px, above the fixed enquiry bar.
- At 320 × 740, the section measures 556px. The heading begins at 88px and both notes end at 628px, above the fixed enquiry bar. Short-screen styling omits the general introduction, swipe hint, and secondary thumbnail details; main descriptions are retained.
- At 375 × 667, the section measures 517px.
- Arrow navigation reached the middle and final cards, enabled Previous after advancing, and disabled Next at the end. The existing rail tests pass (3 tests).
- At 768px, the original three-column grid and square preview proportions remain active. Changes apply only below 768px.
- Production build and whitespace checks pass. Build output still includes CSS at-rule and Browserslist warnings.
- Screenshots: `screenshots/mobile-responsiveness/features-compact-390x844.png` and `screenshots/mobile-responsiveness/features-compact-320x740.png`.

No fixed section height or internal vertical scrolling was added. Enlarged text can require natural page scrolling.
