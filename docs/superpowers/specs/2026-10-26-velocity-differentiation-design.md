# Velocity differentiation section — design proposal

## Purpose and evidence

Place a new section after section 06 and before the FAQ. Move from the preceding benefit cards to an interactive demonstration of owner visibility. The user reports feedback from two deployed pharmacies: difficulty identifying expired and low stock without nightly checking; uncertainty around stock discrepancies and staff actions; lack of visibility when the owner is absent; and difficulty using existing software. These are paraphrased field signals from two deployments, not direct customer quotations or market-wide findings.

The user confirms Velocity is cloud/web based. The product story documents batch and expiry views, low-stock information, reorder recommendations, permission-controlled adjustments and recorded activity. It also says some reports use snapshots. Exact activity-log fields and remote views must be checked against the current product before illustrating them as supported.

## Approaches and recommendation

1. Recommended: one interactive owner overview, with three question-led tabs. Each tab answers an actual question from the deployment feedback. This builds on the previously proposed scenario approach without repeating the feature catalogue.
2. Before/after switch: easy to understand, but risks implying that all competing products behave like the two reported customer situations.
3. Competitor table: useful during evaluation, but needs maintained evidence and is less experiential.

The user has supplied the positioning evidence; this document proposes the final interaction. No implementation is requested or approved by this document.

## Copy and composition

Eyebrow: Why Velocity

Heading: Your pharmacy. Fewer blind spots.

Introduction: Know what needs attention, understand recorded stock changes, and stay informed when you’re away.

Use a single bounded dark-and-gold panel with three native button tabs. Keep it approximately 440–520px tall on desktop, allowing content to grow without clipping on mobile. Each tab contains a brief explanation beside a focused, legible illustrative interface. No full-page dashboard, auto-rotation, scroll hijacking, or second grid of three cards.

### Tab 1 — What needs attention?

Benefit heading: See the stock that needs a closer look.

Supporting copy: Review low stock and batches nearing expiry before preparing your next order.

Illustration: a short list of synthetic medicine records with clearly separate Low stock, Expiring soon, and Expired states. The selected view shows its as-of date. A visitor selects a status to filter the sample records. The expired view must not be conflated with expiring-soon stock. Do not invent a one-click reorder flow if that flow is not implemented.

Takeaway: Start with the items that need attention.

Do not imply that recorded inventory eliminates physical verification or discovers unrecorded missing stock.

### Tab 2 — What changed?

Benefit heading: Follow the record behind a stock change.

Supporting copy: Review recorded inventory activity to understand changes and who made them.

Illustration: a short activity timeline. Selecting one entry reveals available details. Staff identity, timestamp, action, medicine, quantity change, and reason are candidate fields, not confirmed fields; verify each before including it. Omit unsupported fields rather than fabricating a complete audit trail. Keep the example neutral, such as a stock adjustment, with no accusation of theft.

Takeaway: A clearer record for investigating discrepancies.

Do not promise theft detection, continuous staff surveillance, tamper-proof logs, or logging of every action.

### Tab 3 — How is the pharmacy doing?

Benefit heading: Stay informed when you’re away.

Supporting copy: Access your pharmacy’s available reports and recorded activity through your browser, wherever you have an internet connection.

Illustration: a compact owner overview with one stock summary, attention items, and recorded activity, drawn only from confirmed remotely accessible views. Include a visible last-updated time. Let visitors switch a sample reporting period only if the underlying view supports it. Do not make unsupported smartphone-product claims; test real mobile usability before showing an actual mobile product view.

Takeaway: Keep visibility beyond the pharmacy counter.

Do not label all reports live or real time; avoid implying offline availability or guaranteed global access.

## Ease of use

Demonstrate ease through short labels, readable type, a clear next action, and one meaningful interaction per scenario. Do not publish “best UI/UX,” “easy for everyone,” or superiority based on PHP or another implementation language. Technology choice does not itself establish the customer experience. Any stronger usability claim should use observed task completion or grounded customer feedback.

## Conversion

Finish the panel with: See how this works for your pharmacy.

CTA: Book a demo, using the existing destination. Keep the same destination across tab states. Do not add a form or collect interaction data as part of this section without a separate requirement.

## Interaction and accessibility

- Default to the stock-attention tab, with a useful answer visible immediately.
- One active tab; keyboard arrow navigation and visible focus; correctly linked tab/panel semantics.
- Support touch and keyboard equivalents for every action; no hover-only information.
- Stack explanation and illustration on narrow screens. Keep tabs readable and avoid page overflow.
- Short opacity transition only; respect reduced motion; do not animate essential information into view.
- Label the panel Illustrative example · Demo data. Use synthetic records and readable HTML for interactive details.
- Provide the three core explanations when scripting is unavailable.

## Implementation plan after the direction is agreed

1. Verify actual log fields, expiry filters, remotely accessible reports, timestamps, and mobile behavior. Map each proposed display to evidence; simplify unsupported interactions.
2. Finalise the copy and synthetic examples around verified behavior. No new customer statistics or competitor assertions.
3. Implement one semantic section using existing HTML/CSS/JavaScript conventions. Scope classes and handlers to this section; update FAQ numbering if needed while preserving anchors.
4. Check all tabs and sample interactions with mouse, touch, and keyboard. Verify mobile layout, focus, reduced motion, no-script content, and no overflow.
5. Run the production build and review the rendered section between the benefit cards and FAQ. Confirm it adds proof and answers rather than duplicating feature lists.

## Open decisions

- Whether these three questions reflect the strongest customer priorities.
- Which activity fields and owner reports are actually supported in the deployed version.
- Whether future customer evidence supports quantified time or loss reductions. None are assumed here.

## Sources

- User feedback in this conversation, 26 October 2026: two deployments; paraphrases only.
- Solutions/Velocity/Marketing/astr-pharmacy-product-story.md: stock, expiry, adjustment history, reporting, and snapshot qualifications. Repository documentation is implementation evidence, not customer outcome proof.
- https://margcompusoft.com/landingPages/new24/pharmacy/ and https://healthray.com/pharmacy-management-system/: examples of vendors publicly advertising overlapping inventory/expiry/reorder capabilities. Their public marketing does not establish implementation parity or inferiority. No named comparison is proposed for this section.

Knowledge/files used: local product story. CRM, transcripts, internal messaging and sales intelligence are not needed for this scoped design proposal. No measured outcomes or independent usability study were supplied.
