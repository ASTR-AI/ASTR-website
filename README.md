# ASTR AI Landing Page

A high-fidelity UI/UX web design for a deep-tech company named 'ASTR AI'.

## Design System

The website features a modern, premium design system with a specific aesthetic:

### Color Palette

- **Background**: `#121212` (Deep Space Dark)
- **Primary Accent**: `#E6CD99` (Elegant Gold)
- **Text Color**: `#D1D5DB` (Soft Light Gray)

### Typography

- **Primary Font**: [Lora](https://fonts.google.com/specimen/Lora) (Serif)
  - Used across the entire site for a sophisticated, trustworthy, and modern feel.

### UI Effects

- **Apple Vision OS Liquid Glass**:
  - **Floating Pills**: Use aggressive rounding. `border-radius: 100px;` for thin strips (navbars, toolbars) and `border-radius: 64px;` for large content containers (hero, floating windows).
  - **Backdrop Blur**: Strong frosted glass effect. `backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);` applied over a translucent white/dark background (e.g., `rgba(255, 255, 255, 0.08)` or `rgba(10, 10, 10, 0.6)`).
  - **Specular Inner Highlight**: The crucial "liquid" effect. Use `inset 0 1px 1px rgba(255, 255, 255, 0.3)` internally on the top edge to mimic light catching the rim.
  - **Depth Shadow**: Strong outer drop shadow lifting elements off the background. E.g., `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);`
- **Glassmorphism**: Standard content cards utilize minimal frosted glass textures with subtle golden borders and background blur (`backdrop-filter`) to create a futuristic layered effect.
- **Scroll Reveal**: Sections smoothly fade in and slide up as you scroll down the page.
- **Micro-interactions**: Liquid glass hover effects that encase elements in soft translucent bubbles.

## Content Structure

The landing page features 5 distinct sections:

1. **Hero Section (Dark Theme)**
   - Interactive HTML Canvas background featuring a neural network visualization (nodes and connections) reacting to mouse movements.
   - Main headline ("Intelligence for What Matters.") with dual Call-to-Action buttons.

2. **Our Philosophy (Light Theme)**
   - Details the inspiration behind the name ASTR (from Sanskrit "Astra") and what the acronym stands for (Advanced System for Technology, Robotics and AI).

3. **Three Synergistic Pillars (Dark Theme with Glassmorphism)**
   - Displays three core verticals: AI Solutions, Infrastructure, and Drone Solutions using sleek glassmorphism cards.

4. **Pioneering the Future & Trust (Light Theme)**
   - Highlights R&D focus, government trust, and building the talent pipeline.

5. **Footer / Contact (Dark Theme)**
   - Clean layout containing contact information, quick links, social links, and physical headquarters address.

## Technologies Used

- **Vite**: Next-generation frontend tooling for fast builds and hot module replacement.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Three.js & GSAP**: For high-performance 3D particle systems and cinematic animations.
- **Vanilla HTML/JS**: Core architecture for maximum performance and portability.

## Development Workflow

The project is configured for **Continuous Development vs. Deployment**. 

- `index.html`: The public "Coming Soon" page (what visitors see at `astrai.in/`).
- `main-site.html`: The actual website currently in development.
- `philosophy.html` & `solutions.html`: Internal sub-pages.

## Running Locally

To start the development server:

```sh
npm run dev
```

- **To preview the Coming Soon page**: Visit `http://localhost:5173/`
- **To develop the actual site**: Visit `http://localhost:5173/main-site.html`

Internal navigation in `components.js` is currently mapped to `main-site.html` to allow for a seamless development experience between sub-pages.

## Deployment & Building

To build the project for production:

```sh
npm run build
```

The build output will be in the `dist/` directory, including all development pages. When ready for full launch, simply rename `main-site.html` to `index.html`.
