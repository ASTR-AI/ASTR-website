# Section 04: Hospital supply

## Intent

Show how a supply request connects the pharmacy and hospital store through request, picking, dispatch, and receipt. Match the typography, spacing, charcoal surfaces, and restrained gold accents of the preceding Velocity sections.

## Approaches

The user selected a supply-request preview with a connected four-step journey. The alternative was four large workflow cards with a smaller location connector; it would give the explanations more weight but reduce the sense of one connected request.

## Proposed presentation

1. Preserve the section label “04 / Hospital supply”, existing serif headline, and supporting copy. Use the shared container, spacious introduction, and muted sans-serif description.
2. Replace the capture-pending placeholder and side-by-side step list with one wide charcoal stage. Label it “Illustrative workflow · Demo data”.
3. Show a warm ivory supply-request document between two compact dark location panels: “Central pharmacy” as the source and “Hospital store” as the destination. These are illustrative locations, not assertions about a customer's setup. Fine gold connectors communicate stock movement.
4. The request document contains an example reference, requested medicines, quantities in clearly named units, and a short note that receipt is recorded by the receiving team. No fake action buttons, live counters, delivery guarantees, or automatic approval states.
5. Integrate a connected four-step journey along the bottom of the stage: Request / A supply request begins the workflow; Pick / The store team prepares the requested stock; Dispatch / Follow the medicines sent from the store; Receive / Record acceptance at the receiving location. Use small line icons, gold numbered labels, and concise descriptions. All steps are explanations, not a simulated live order progression.
6. Below the stage, retain a quiet note about approval workflows and supported returns for rejected deliveries. No additional cards or CTA needed.

## Responsive and motion

On narrow screens, stack source, request, and destination in reading order, and turn the four-step journey into a vertical timeline. Keep document text readable and all content visible without horizontal scrolling. No autoplay, pinned scroll, or animation implying automatic stock movement. Retain static visibility without JavaScript and respect reduced motion.

## Implementation and verification

Scope markup and styles to `#supply` in `velocity.html` and section-specific CSS in `velocity.css`. Preserve current purchasing edits and all adjacent sections. Reuse existing fonts and tokens, with no dependencies. Review desktop, tablet, 390px and 320px widths, semantic headings, text contrast, no overflow, and production build. Run existing inventory tests for adjacent-script regression coverage.

## Approval

Approach and detailed presentation approved by the user: “Approve and implement”.

## Floating-style refinement

The user requested removing the enclosing section treatment. The stage now has no background, border, corner radius, or padding at any breakpoint, and section 04 uses the page background rather than a tinted band. The individual request and location cards float directly on the page. Verified in desktop and 390px mobile preview; production build passed.
