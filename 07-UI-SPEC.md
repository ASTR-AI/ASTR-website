---
phase: 7
slug: ethereal-architectural-footer
status: draft
shadcn_initialized: false
preset: none
created: 2026-04-02
---

# Phase 7 — Ethereal Architectural Footer

> Visual and interaction contract for a 'simple yet aesthetic' footer redesign. Moving away from dashboard-like clutter towards an 'Architectural Minimalism' aesthetic with 'Ethereal Tech' lighting effects.

---

## Design System

| Property          | Value                         | Source             |
| ----------------- | ----------------------------- | ------------------ |
| Tool              | none                          | Project state      |
| Preset            | not applicable                | Project state      |
| Component library | none (manual HTML/CSS/GSAP)   | Project state      |
| Icon library      | Lucide / Phosphor             | RESEARCH.md        |
| Font              | Lora (Body), Cinzel (Display) | tailwind.config.js |

---

## Spacing Scale (Architectural Airy)

Maintaining the 8pt scale but increasing the primary gaps to create "Architectural Whitespace."

| Token | Value | Usage                                 |
| ----- | ----- | ------------------------------------- |
| xs    | 4px   | Fine letter spacing (tracking-widest) |
| sm    | 8px   | Navigation link gaps                  |
| md    | 16px  | Content to Label spacing              |
| lg    | 24px  | Gutter width                          |
| 2xl   | 48px  | Vertical gaps between link categories |
| 4xl   | 96px  | **Primary Vertical Section Gaps**     |
| 6xl   | 160px | **Top/Bottom Section Padding**        |

---

## Typography

Sophisticated pairings with high tracking for a "luxury/ethereal" feel.

| Role    | Size                   | Weight | Line Height | Font   | Notes                    |
| ------- | ---------------------- | ------ | ----------- | ------ | ------------------------ |
| Display | clamp(2rem, 5vw, 4rem) | 500    | 1.1         | Cinzel | Branding signature       |
| Heading | 12px (0.75rem)         | 600    | 1.0         | Mono   | Uppercase, tracked (4px) |
| Link    | 16px (1rem)            | 400    | 1.6         | Lora   | Main navigation          |
| Tagline | 14px (0.875rem)        | 400    | 1.8         | Lora   | Italicized Mission brief |
| System  | 10px (0.625rem)        | 400    | 1.0         | Mono   | Metadata / Status        |

---

## Color & Lighting (The 'Aura' Contract)

| Role            | Value     | Usage                            |
| --------------- | --------- | -------------------------------- |
| Dominant (60%)  | #050505   | Deepest void surface             |
| Secondary (30%) | #0a0a0a   | Subtle architectural panels      |
| Accent (10%)    | #E6CD99   | Gold highlights / 'Halogen' glow |
| Lighting        | #E6CD9910 | Soft radial aura (low opacity)   |

**Aura/Halogen Effects:**

- **Primary Aura**: A massive `radial-gradient` centered behind the footer content (opacity 5-8%).
- **Halogen Leak**: A soft linear gradient appearing from the bottom edge (Gold to transparent).

---

## Visual & Interaction Contract

### 1. Architectural Signature

- **Layout**: Centered or asymmetric large "ASTR AI" branding.
- **Styling**: `opacity-80`, `font-cinzel`. No shadows, just clean typography.
- **Background**: A "Halogen" radial glow (`bg-gold/5 blur-[120px]`) that subtly pulses.

### 2. Floating Navigation Columns

- **Structure**: 3-4 columns of links.
- **Visuals**: No vertical dividers. Just "ghostly" labels (tracked-widest Mono) above the links.
- **Interaction**: On link hover, a thin horizontal line (Gold) grows from left to right beneath the text.

### 3. 'Ethereal' Metadata (Bottom Bar)

- **Content**: `SYSTEM_VERSION // 2026_04_02 // UPTIME: 99.99%`.
- **Visuals**: Positioned at the very bottom, separated by a 1px line that fades out at the edges.
- **Interaction**: Data points subtly flicker or "glitch" into view on scroll.

---

## Copywriting Contract

| Element          | Copy                                                        |
| ---------------- | ----------------------------------------------------------- |
| Branding         | "ASTR AI"                                                   |
| Tagline          | "Architecting Intelligence for Mission-Critical Frontiers." |
| Link Group 1     | "INTELLIGENCE: Integration, Neural, Audit, R&D"             |
| Link Group 2     | "SYSTEMS: Drone Ops, Infrastructure, Security"              |
| Status Indicator | "SYSTEMS_NOMINAL // UPLINK_ACTIVE"                          |
| Copyright        | "© 2026 ASTR AI. All rights reserved."                      |

---

## Implementation Details (Tailwind/CSS)

```css
/* Ethereal Aura Background */
.footer-aura {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(230, 205, 153, 0.08) 0%,
    transparent 70%
  );
}

/* Halogen Light Leak */
.footer-halogen-leak {
  background: linear-gradient(
    to top,
    rgba(230, 205, 153, 0.05) 0%,
    transparent 100%
  );
}

/* Architectural Link Hover */
.arch-link {
  position: relative;
  transition: color 0.3s ease;
}
.arch-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-gold-DEFAULT);
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.arch-link:hover::after {
  width: 100%;
}
```

---

## Registry Safety

| Registry | Blocks Used | Safety Gate                         |
| -------- | ----------- | ----------------------------------- |
| none     | none        | view passed — no flags — 2026-04-02 |

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PENDING
- [ ] Dimension 2 Visuals: PENDING
- [ ] Dimension 3 Color: PENDING
- [ ] Dimension 4 Typography: PENDING
- [ ] Dimension 5 Spacing: PENDING
- [ ] Dimension 6 Registry Safety: PENDING

**Approval:** pending
