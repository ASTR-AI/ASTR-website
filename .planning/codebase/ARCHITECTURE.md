# Architecture

**Analysis Date:** 2025-03-05

## Pattern Overview

**Overall:** Single Page Application (SPA) / Multi-Page Static Site with modern build tools.

**Key Characteristics:**

- **Build Tooling:** Uses [Vite](https://vitejs.dev/) as the frontend build tool and development server.
- **Styling Strategy:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling, configured via `tailwind.config.js` and `postcss.config.js`.
- **Logic Separation:** Vanilla JavaScript in `main.js` handles interactive elements (Three.js, D3/SVG physics-based graphs, and tab logic).

## Layers

**UI Layer:**

- Purpose: Direct rendering of the interface and styling.
- Location: `./*.html` and `index.css`
- Contains: HTML templates and Tailwind/Custom CSS.
- Depends on: `main.js` and `index.css`.
- Used by: Browser directly.

**Interactivity Layer:**

- Purpose: Logic for visual effects and dynamic UI elements.
- Location: `main.js`
- Contains: Initialization for Three.js, IntersectionObserver, and custom DOM logic.
- Depends on: External libraries (Three.js, GSAP via CDN) and DOM structure.

## Data Flow

**Asset Loading Flow:**

1. [Entry Point]: Vite loads `index.html`.
2. [Styles]: Browser (via Vite) loads `index.css` which includes Tailwind layers.
3. [Scripts]: `main.js` is loaded as a script module.
4. [External Dependencies]: `index.html` loads Three.js and GSAP via CDNs.

**State Management:**

- [Local DOM State]: Managed through class manipulation in `main.js` (e.g., `.active`, `.scrolled`, `.visible`).
- [Animation State]: Managed by Three.js `clock` and GSAP in `main.js`.

## Key Abstractions

**Ecosystem Graph:**

- Purpose: Physics-based knowledge graph visualization.
- Examples: `main.js` (Class `EcosystemGraph`)
- Pattern: SVG-based Force-Directed Graph using custom physics logic.

**Pillar Tabs:**

- Purpose: Content switching for technical pillars (Custom Software, AI, etc.).
- Examples: `main.js` (`initPillarTabs`)
- Pattern: Tab-based interface with sliding highlights and visibility toggling.

## Entry Points

**HTML Entry Point:**

- Location: `index.html`
- Triggers: User visits the site.
- Responsibilities: Loads all assets, including `index.css` and `main.js`.

**CSS Entry Point:**

- Location: `index.css`
- Triggers: Included in `index.html`.
- Responsibilities: Main stylesheet containing Tailwind directives and custom component styles.

**JavaScript Entry Point:**

- Location: `main.js`
- Triggers: `DOMContentLoaded` event.
- Responsibilities: Initializes all UI components and visualizations.

## Error Handling

**Strategy:** Console-based reporting and graceful degradation.

**Patterns:**

- [Condition Checks]: Checking for element existence before initialization (e.g., `if (!canvas) return;`).
- [Dependency Checks]: Verifying external libraries (Three.js) before use in `main.js`.

## Cross-Cutting Concerns

**Logging:** Uses `console.error` for missing dependencies or elements in `main.js`.
**Validation:** Basic presence checks for DOM elements in `main.js`.
**Authentication:** Not detected (Public-facing static site).

---

_Architecture analysis: 2025-03-05_
