---
phase: 5
slug: cta-layout-refinement
status: draft
shadcn_initialized: false
preset: none
created: 2026-03-31
---

# Phase 5 — CTA Layout Refinement

> Visual and interaction contract for the CTA section layout. Addressing spacing issues between telemetry and actions.

---

## Design System

| Property          | Value                          |
| ----------------- | ------------------------------ |
| Tool              | none                           |
| Preset            | not applicable                 |
| Component library | none (manual HTML/CSS)         |
| Icon library      | Phosphor Icons / Lucide        |
| Font              | Lora (Body), Cinzel (Headings) |

---

## Spacing Scale (8pt Compliance)

Following the 8-point scale for layout gaps to ensure a "minimal, high-fidelity" aesthetic with generous whitespace.

| Token | Value | Usage                                        |
| ----- | ----- | -------------------------------------------- |
| md    | 16px  | Gap between Heading and Description          |
| xl    | 32px  | Gap between CTA Button and Secondary Info    |
| 1.5xl | 40px  | Gap between Description and Telemetry Log    |
| 3xl   | 64px  | **Primary Gap: Telemetry Log to CTA Button** |

### Implementation Mapping (Tailwind)

- `mb-4` (16px) -> Heading to Description
- `mb-10` (40px) -> Description to Telemetry Log
- `mb-16` (64px) -> Group 1 (Status) to Group 2 (Action)
- `space-y-8` (32px) -> CTA Button to Secure Channel Info

---

## Layout Refinement: Action Panel

The Right Panel of the "Engagement Blueprint" requires specific vertical spacing to prevent visual clutter and separate **Status/Feedback** (Telemetry) from **Intent/Action** (Button).

### 1. Vertical Stack Order

1. **Heading (H3)**: "Start Your Journey..."
2. **Description (P)**: "Connect with our specialists..."
3. **Telemetry Log (DIV)**: Selection feedback status.
4. **Primary CTA (A)**: "Establish Connection".
5. **Secondary Info**: "Secure Channel" + Email.

### 2. Spacing Contract

- **Heading to Description**: `mb-4` (16px).
- **Description to Telemetry Log**: `mb-10` (40px). _Provides clear distinction between static text and dynamic feedback._
- **Log Container to Action Container**: `mb-16` (64px). _The "Airy" gap that emphasizes the transition from configuration to execution._
- **Button to Email Link**: `space-y-8` (32px). _Standard separation for secondary actions/info._

### 3. Visual Polish

- **Telemetry Log Alignment**: Must remain centered (`mx-auto`) with a fixed `max-w-[320px]`.
- **Button Prominence**: The `liquid-glass-button` shadow should not overlap with the Telemetry Log's bottom border. The 64px gap ensures the shadow has room to "breathe" without muddying the log's background.

---

## Typography

| Role            | Size             | Weight | Line Height |
| --------------- | ---------------- | ------ | ----------- |
| H3 Heading      | 24px             | 500    | 1.2         |
| P Description   | 13.6px (0.85rem) | 400    | 1.625       |
| Monospace (Log) | 8.8px (0.55rem)  | 400    | 1.0         |

---

## Copywriting

| Element       | Copy                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Heading       | "Start Your <br />Journey With ASTR AI."                                                                                         |
| Description   | "Connect with our specialists to architect your AI infrastructure. We turn mission-critical requirements into scalable reality." |
| CTA Button    | "Establish Connection"                                                                                                           |
| Status READY  | "READY"                                                                                                                          |
| Status ACTIVE | "CONFIG_ACTIVE"                                                                                                                  |

---

## Interaction Contract (State Feedback)

| Event                  | Visual Response                                                              |
| ---------------------- | ---------------------------------------------------------------------------- |
| **Blueprint Selected** | `log-status` text changes to `CONFIG_ACTIVE` (Gold), `log-count` increments. |
| **Button Hover**       | Arrow icon `translate-x-1`, shadow glow intensifies.                         |
| **Email Hover**        | Underline grows to full width, text color shifts to Gold (`#E6CD99`).        |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate  |
| -------- | ----------- | ------------ |
| none     | none        | not required |

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PENDING
- [ ] Dimension 2 Visuals: PENDING
- [ ] Dimension 3 Color: PENDING
- [ ] Dimension 4 Typography: PENDING
- [ ] Dimension 5 Spacing: PENDING
- [ ] Dimension 6 Registry Safety: PENDING

**Approval:** pending
