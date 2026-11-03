# Risks and activity mobile spacing

## Refinement after screenshot feedback

The user found the full-screen distribution too sparse. Removed the viewport minimum height and flex growth, replaced space-evenly with start alignment, and set 32px between the intro and preview plus 24px between preview and scenarios. The mobile section now follows its natural content height. At 440×956 its height is 616.516px (previously 892px); preview remains 400×245px. Checked all three scenarios at 440, 390, 320, and 1440px: stable section heights, no page horizontal overflow, and unchanged desktop section height (932.773px). Build, formatting, and diff checks pass. Viewport override reset. Current evidence: screenshots/risks-mobile-spacing/440-956-refined.png and refined-metrics.json.

The original implementation record follows for context; its full-screen spacing has been superseded.

Applied the established single-screen phone rhythm below 768px: minimum section height equals the small viewport minus the header, 40px top / 48px bottom padding, 48px minimum introduction gap, and 40px minimum gap between the preview and scenario rail. Remaining room is distributed around those two elements. Existing preview and card dimensions remain governed by their original rules. Short/narrow phones use 24px gaps and 24px / 32px outer padding. Content can grow naturally.

Verified all three scenarios at 440×956, 430×932, 390×844, 320×740, and 1440×1000. No page-level horizontal overflow; section heights remain stable when switching scenarios. Phone section heights are 892 / 868 / 780 / 676px respectively. At 440px, preview remains 400×245px and the next section is below the viewport. Desktop preview remains 460×520px; new layout rules do not apply there.

Production build, formatting checks, and git diff --check pass. Temporary viewport override reset. Physical devices were not tested.

Evidence: screenshots/risks-mobile-spacing/440-956.png and metrics.json.
