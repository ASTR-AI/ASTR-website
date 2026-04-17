/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './*.html',
    './main.js',
    './components.js',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        black: {
          DEFAULT: '#121212',
          rich: '#1a1a1a',
          soft: '#222222',
          card: '#181818',
        },
        gray: {
          dark: '#2a2a2a',
          mid: '#333333',
          light: '#888888',
        },
        white: '#D1D5DB',
        'off-white': '#f5f5f5',
        gold: {
          DEFAULT: '#E6CD99',
          light: '#f3e2ba',
          bright: '#fff2d1',
          dim: '#cba864',
          glow: 'rgba(230, 205, 153, 0.35)',
          border: 'rgba(230, 205, 153, 0.25)',
          bg: 'rgba(230, 205, 153, 0.06)',
        },
        blue: {
          DEFAULT: '#007AFF',
          glow: 'rgba(0, 122, 255, 0.3)',
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.04)',
          'bg-light': 'rgba(0, 0, 0, 0.03)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-gold': 'rgba(200, 162, 78, 0.2)',
        },
      },
      fontFamily: {
        lora: ['Lora', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        handwritten: ['Caveat', 'cursive'],
        caveat: ['Caveat', 'cursive'],
        sans: ['Geist Variable', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        tech: ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        hero: 'clamp(3rem, 6vw, 5.5rem)',
        h1: 'clamp(2rem, 4vw, 3.5rem)',
        h2: 'clamp(1.5rem, 3vw, 2.5rem)',
        h3: 'clamp(1.2rem, 2vw, 1.6rem)',
        body: 'clamp(1rem, 1.2vw, 1.125rem)',
        small: '0.875rem',
        xs: '0.75rem',
      },
      spacing: {
        'section-y': 'clamp(64px, 8vw, 100px)',
        'section-y-large': 'clamp(100px, 12vw, 160px)',
        'section-x': 'clamp(24px, 5vw, 80px)',
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        glass: '24px',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '32px',
        '2xl': '64px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
