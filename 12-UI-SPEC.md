---
status: draft
phase: 12
title: Philosophy Page Redesign (Impact & Visual Strike)
---

# UI Specification: Philosophy Page Redesign

## 1. Vision & Constraints

**Phase Objective:** Elevate `philosophy.html` from a standard content page to a "Brand Cornerstone" using high-fidelity architectural metaphors. The goal is to make the "Astra" concept feel like a precision-engineered reality rather than just a name.

**Design Pillars:**

- **Architectural Blueprint:** Use grid systems, technical annotations, and monospaced metadata.
- **Premium Glass Optics:** Layered transparency with high-intensity backdrop blurs.
- **Interactive Precision:** Elements that respond with surgical accuracy (SVG schematics, 3D hover states).

## 2. Spacing & Layout

The layout shifts from a simple two-column grid to a multi-layered "Blueprint Stage."

| Element        | Specification                   | Rationale                                                                  |
| -------------- | ------------------------------- | -------------------------------------------------------------------------- |
| Main Container | `max-w-[1300px] px-12`          | Consistent with the "Technical Journal" standard.                          |
| Hero Section   | `pt-[220px] pb-[120px]`         | Increased breathing room for the "Astra Schematic."                        |
| Acronym Stack  | `flex flex-col gap-4`           | "Vertically efficient" stack that mirrors a server rack or modular system. |
| Metadata Bar   | `py-6 border-y border-white/10` | Grounds the page in a "System Log" aesthetic.                              |

## 3. Typography (Hierarchy)

| Role             | Font Family   | Size Class                        | Weight   | Color      |
| ---------------- | ------------- | --------------------------------- | -------- | ---------- |
| Hero Title       | `font-lora`   | `text-[clamp(2.5rem,6vw,5.5rem)]` | Bold     | `white/90` |
| Annotations      | `font-caveat` | `text-[1.6rem]`                   | Regular  | `gold/60`  |
| Acronym Initials | `font-mono`   | `text-[4rem]`                     | Bold     | `white/5`  |
| System Labels    | `font-mono`   | `text-[0.65rem]`                  | Semibold | `gold/50`  |

## 4. Color & Visual Metaphors

- **Dominant:** `black` (#121212) - 70%
- **Secondary (Glass):** `glass-bg` (rgba(255, 255, 255, 0.04)) - 20%
- **Accent:** `gold` (#E6CD99) - 10% (Reserved for precision lines and annotations)

**Key Metaphors:**

- **The "Astra" Schematic:** An interactive SVG "Blueprint" of an abstract, geometric precision tool (Astra).
- **Layered Glass:** Using `backdrop-blur-glass` (24px) and `border-glass` to create "optics" depth.
- **3D Depth:** Applying `perspective: 1000px` to the Acronym Stack with subtle `rotate-x` on hover.

## 5. Interaction & Copywriting

### The "System Stack" Acronym

Instead of a horizontal grid, the acronym is a vertical modular stack.

| Letter | Title    | Metadata Tag                |
| ------ | -------- | --------------------------- |
| **A**  | Advanced | `MODULE_01 // INTELLIGENCE` |
| **S**  | System   | `MODULE_02 // ARCHITECTURE` |
| **T**  | Tech     | `MODULE_03 // CORE`         |
| **R**  | Robotics | `MODULE_04 // PHYSICAL`     |
| **AI** | Core     | `MODULE_05 // SYNTHESIS`    |

### Key Copy Elements

- **Primary CTA:** None (Informational page).
- **Empty State:** N/A.
- **"Our Core Origin" Annotation:** Placed at -rotate-6 degrees near the "Astra" definition.
- **Sanskrit Watermark:** "अस्त्र" (Astra) in large, subtle (`opacity-5`) serif font behind the hero.

## 6. Implementation Checklist (Technical)

- [ ] **Background:** Replace radial dots with a "Technical Grid" (thin lines at 60px intervals).
- [ ] **Hero:** Implement the "Astra Schematic" (SVG) with a pulsing "Core" light.
- [ ] **Acronym:** Build the vertical modular stack with `backdrop-blur-glass` and `hover:scale-[1.02]`.
- [ ] **Animation:** Use GSAP `ScrollTrigger` to stagger-reveal the modular stack.
- [ ] **Depth:** Add a "Scanning Line" animation (a subtle horizontal gradient moving top-to-bottom across the grid).

## 7. Registry & Components

- **Library:** Tailwind CSS + GSAP.
- **Custom Components:** `<astr-navbar>`, `<astr-footer>`.
- **Registry Blocks:** None (Custom implementation).
