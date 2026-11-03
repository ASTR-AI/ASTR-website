# Velocity mobile conversion review — 1 November 2026

Scope: current local Velocity page, http://localhost:5173/velocity.html, at a verified 440 × 956 CSS-pixel viewport. Review only; no website changes. Audience assumption: retail pharmacy owners and hospital pharmacy/operations decision makers considering a demo. Applied UI UX Designer critique and Sales buyer-objection lenses; no customer interviews, CRM data, or analytics were supplied.

## Verdict

The mobile page looks polished and fits the viewport, but its persuasion is weaker than its styling. It communicates scope and gives visitors persistent access to a demo. It needs clearer product evidence, credible proof, switching reassurance, and a lower-friction request before it can be considered a strong conversion page. This is a qualitative assessment, not a measured conversion forecast.

## Prioritized findings

| Priority | Finding and evidence | Buyer consequence | Recommended action | Effort |
| --- | --- | --- | --- | --- |
| High | Reordering screenshot is visibly blurred; inventory dashboard is miniature and cannot communicate detailed workflows (steps 2–3). | The product remains difficult to evaluate despite taking substantial screen space. | Use a sharp mobile crop showing one medicine, consumption, and suggested quantity; offer an enlarged preview. Use specific stock views for each inventory card. | Medium |
| High | No customer testimonial, customer result, or attributable deployment proof appears in the reviewed page. Illustrative examples are not customer evidence. | A visitor can understand features without knowing whether to trust a new vendor. | Add one permissioned customer quote/case example near the first benefit or before the form. If unavailable, use verifiable product walkthrough and clear company/support information; invent no claims. | Medium; depends on evidence |
| High | FAQ addresses capabilities, but leaves migration, onboarding/training, support, pricing basis, and implementation expectations unresolved (step 10). | Existing software users have unanswered switching objections. | Add short truthful answers for importing existing stock, training/support, and how pricing is determined. State constraints plainly. | Small to medium |
| High | Five required information fields, including both email and phone, with no stated response window or demo duration (step 11). | More effort and uncertainty before a visitor receives value. | Test requiring name, organisation, and one contact method; collect remaining qualification later. State duration and response timing only when the team can commit. | Small |
| Medium | Hero names the task but does not immediately identify retail/hospital fit or a sharp reason to switch (step 1). | The visitor must interpret the product's relevance. | Add a brief audience/outcome sentence, such as “Stock, expiry tracking and billing for retail and hospital pharmacies,” adjusted to verified scope. | Small |
| Medium | Stock, expiry, packs/units, ordering and reports recur across multiple sections; demo section begins about 8,039 px down the default page, roughly 8.4 viewport heights (steps 2–9). | Browsing effort grows faster than new buyer information. The persistent header CTA mitigates this. | Merge repeated capability explanations; replace some of that space with proof and switching reassurance. Preserve useful breathing room. | Medium |
| Medium | Operations panel uses considerable blank space above and below its copy; later tabs are clipped beyond the right edge (step 6). | Important accounts/reporting capabilities require discovery and the section consumes almost a viewport. | Reduce vertical panel padding on mobile; provide a visible scroll cue or more discoverable tab layout. | Small |
| Medium | Header demo link measures 145 × 36 px; inventory pagination dots measure 6 px high, smaller than comfortable touch targets (steps 1–2). | Small controls are harder to activate reliably. | Give the CTA and dot buttons at least 44 px touch height; retain small visual dots inside larger hit areas. Existing 44 px arrows provide an alternative. | Small |
| Medium | Supporting copy, placeholders, field underlines, and privacy text appear faint on black (steps 1, 6, 11–12). | Visitors may miss instructions or perceive the form as disabled. | Increase contrast and input-boundary visibility; measure rendered contrast before claiming WCAG compliance. | Small |
| Low | Submit label is `[REQUEST_A_DEMO]`; footer uses terminal language and awkward wraps (step 12). | Technical styling adds reading work at the final decision. | Use “Request my demo”; simplify customer-facing footer labels while keeping the brand aesthetic. | Small |

## Journey and screenshot evidence

Screenshots were captured and visually inspected in this audit. Sections below follow the reading journey; filenames reflect capture order. A clipped next card is an intentional carousel cue, not page-wide horizontal overflow.

1. **First impression — good layout, moderate persuasion.** Clear headline, distinct branding, visible demo action and readable first benefit. Main hero preview's final note is clipped within its frame. Add audience relevance and improve preview framing.

![Hero](screenshots/velocity-audit-440x956/01-hero.jpg)

2. **Inventory — usable carousel, weak detailed product evidence.** Next-card peek, swipe instruction and arrows make exploration discoverable. Screenshot text is miniature; subdued captions and tiny dot targets need attention.

![Inventory](screenshots/velocity-audit-440x956/02-stock.jpg)

3. **Reordering — clear explanation, weak visual evidence.** Human review is explicit and avoids suggesting automatic ordering. Blurred interface cannot substantiate the feature.

![Reordering](screenshots/velocity-audit-440x956/12-reordering.jpg)

4. **Purchasing — strong.** Concrete purchase-order example, clear status, quantities and supplier. Readable white card. Could connect workflow more directly to an operational payoff.

![Purchasing](screenshots/velocity-audit-440x956/03-purchasing.jpg)

5. **Hospital supply — good.** Clear Request/Prepare/Dispatch/Receive progression and concise example. Retail visitors may need less emphasis on this hospital-specific detail.

![Hospital supply](screenshots/velocity-audit-440x956/04-supply.jpg)

6. **Everyday operations — readable, inefficient use of height.** Good billing explanation and audience statement. Large panel padding and horizontally hidden tabs reduce scanning efficiency.

![Operations](screenshots/velocity-audit-440x956/11-operations.jpg)

7. **Medicine workflows — good illustration, repetitive story.** Purpose-built stock example is more legible than the dashboard screenshots. Topics overlap with earlier stock/purchasing explanations.

![Medicine workflows](screenshots/velocity-audit-440x956/05-operations.jpg)

8. **Risks and activity — useful but interaction-dependent.** Clear risk language and visible next-card cue. This capture shows the tail of the risk example; it does not verify every filter/scenario.

9. **Comparison — moderate.** Checklist is collapsed, so the visible section promises differentiation without immediately supplying it. Surface two or three verified differentiators outside the disclosure.

![Risks and comparison](screenshots/velocity-audit-440x956/06-risks-comparison.jpg)

10. **FAQ — good layout, incomplete buying reassurance.** Questions are easy to scan. First FAQ expansion was tested and showed a relevant answer for retail and hospital pharmacies. Capability questions dominate switching questions.

![FAQ](screenshots/velocity-audit-440x956/07-faq.jpg)

![Expanded suitability answer](screenshots/velocity-audit-440x956/08-faq-open.jpg)

11. **Demo entry — works, requires effort.** Header CTA was tested and reached #demo. Clear email alternative, explicit labels, 16 px form text and 44 px inputs/selects. Five required information fields. Submit falls below the first demo viewport.

![Demo form](screenshots/velocity-audit-440x956/09-demo.jpg)

12. **Submit and footer transition — usable, needs polish.** Submit is a generous 358 × 62 px. Privacy link and data-use explanation are present but visually subdued. Terminal label and footer wraps distract from ordinary business language.

![Submit and footer](screenshots/velocity-audit-440x956/10-submit-footer.jpg)

## Suggested first pass

1. Replace blurred/minuscule product evidence with sharp, purposeful mobile crops.
2. Add genuine proof and truthful migration/support reassurance.
3. Clarify demo expectations and reduce required qualification where commercially acceptable.
4. Consolidate repeated feature sections and tighten the operations panel.
5. Improve muted text, small tap targets, and the submit label.

Keep the restrained palette, strong headings, readable purchasing/supply examples, persistent demo access and transparent demo-data labels.

## Evidence limits

Verified viewport 440 × 956, document width 440 px, default document height approximately 10,879 px. No page-wide horizontal overflow in the measured state. Tested logo anchor, FAQ expansion, and header demo anchor. No lead was submitted or contact information entered. Delivery, backend success/error states, device keyboard, performance on mobile networks, every carousel/tab/filter, screen readers, full keyboard navigation, measured contrast and other screen sizes were not tested. Apparent contrast concerns are visual risks rather than certified failures. Conversion impact requires analytics and preferably tests with target buyers.
