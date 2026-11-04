import { animate, hover, inView, stagger } from 'motion';

// Keep the page's existing interactive demos in charge of their own transforms.
const headingGroups = [
  '.v-copy',
  '.v-purchasing-intro',
  '.v-hospital-intro',
  '.v-operations-intro',
  '.v-capabilities-header',
  '.v-why-header',
  '.v-comparison-header',
  '.v-demo-intro',
];
const ease = [0.22, 1, 0.36, 1];

export function initVelocityMotion(
  root = document.querySelector('#velocity-main')
) {
  if (!root) return () => {};
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let dispose = () => {};
  const seen = new WeakSet();

  function setup() {
    dispose();
    if (preference.matches) return;

    const stops = [];
    const animations = new Map();
    const styles = new Map();
    const remember = (element) => {
      if (!styles.has(element)) {
        styles.set(element, {
          opacity: element.style.opacity,
          transform: element.style.transform,
        });
      }
    };
    const play = (element, frames, options) => {
      remember(element);
      animations.get(element)?.stop();
      const animation = animate(element, frames, options);
      animations.set(element, animation);
      return animation;
    };
    const reveal = (elements, distance = 24) => {
      elements.forEach((element, index) => {
        if (seen.has(element)) return;
        seen.add(element);
        play(
          element,
          { opacity: [0, 1], y: [distance, 0] },
          { duration: 0.7, delay: Math.min(index * 0.09, 0.27), ease }
        );
      });
    };
    const observe = (element, children) => {
      stops.push(
        inView(
          element,
          () => {
            reveal(children);
          },
          { margin: '0px 0px -40px 0px', amount: 'some' }
        )
      );
    };

    // Animate on entry, without hiding content in CSS or before it is in view.
    const hero = root.querySelector('.v-hero-header');
    if (hero && !seen.has(hero)) {
      seen.add(hero);
      const children = [...hero.children];
      children.forEach(remember);
      const entrance = animate(
        children,
        { opacity: [0, 1], y: [20, 0] },
        {
          duration: 0.85,
          delay: stagger(0.12),
          ease,
        }
      );
      stops.push(() => entrance.stop());
    }

    root.querySelectorAll(headingGroups.join(',')).forEach((group) => {
      const children = [...group.children].filter((child) =>
        child.matches('h2, .v-lead, .v-comparison-eyebrow, .v-demo-email-alt')
      );
      if (children.length) observe(group, children);
    });
    // Stagger the static cards, never the moving slides or sticky hero scene.
    root
      .querySelectorAll(
        '.v-capabilities-grid, .v-workflow-steps, .v-purchase-features'
      )
      .forEach((group) => {
        const cards = [...group.children].filter((child) =>
          child.matches('article, .v-workflow-step, .v-purchase-feature')
        );
        if (window.matchMedia('(max-width: 768px)').matches) {
          cards.forEach((card) => observe(card, [card]));
        } else if (cards.length) {
          observe(group, cards);
        }
      });
    root
      .querySelectorAll(
        '.v-inventory-carousel, .v-purchase-stage, .v-why-grid, .v-comparison-scroll, .v-demo-card'
      )
      .forEach((element) => {
        observe(element, [element]);
      });
    root.querySelectorAll('.v-faq-list > details').forEach((element) => {
      observe(element, [element]);
      const onToggle = () => {
        if (!element.open) return;
        const answer = element.querySelector('p');
        if (answer)
          play(answer, { opacity: [0, 1], y: [6, 0] }, { duration: 0.3, ease });
      };
      element.addEventListener('toggle', onToggle);
      stops.push(() => element.removeEventListener('toggle', onToggle));
    });

    const buttons = [
      ...document.querySelectorAll(
        '.v-button, .v-nav-demo, .v-demo-submit-btn, .v-hero .liquid-glass-button'
      ),
    ];
    buttons.forEach((button) => {
      button.classList.add('v-motion-button');
      const settle = () => {
        play(button, { scale: 1, y: 0 }, { duration: 0.25, ease });
      };
      stops.push(
        hover(button, () => {
          play(button, { scale: 1.025, y: -2 }, { duration: 0.25, ease });
          return settle;
        })
      );
      const onPress = () => {
        if (button.disabled) return;
        play(button, { scale: 0.97, y: 0 }, { duration: 0.12 });
      };
      button.addEventListener('pointerdown', onPress);
      button.addEventListener('pointerup', settle);
      button.addEventListener('pointercancel', settle);
      button.addEventListener('pointerleave', settle);
      button.addEventListener('blur', settle);
      stops.push(() => {
        button.removeEventListener('pointerdown', onPress);
        button.removeEventListener('pointerup', settle);
        button.removeEventListener('pointercancel', settle);
        button.removeEventListener('pointerleave', settle);
        button.removeEventListener('blur', settle);
        button.classList.remove('v-motion-button');
      });
    });

    root.querySelectorAll('.v-capability-card').forEach((card) => {
      const visual = card.querySelector('.v-mockup-doc');
      if (!visual) return;
      stops.push(
        hover(card, () => {
          play(visual, { y: -5, rotate: -0.5 }, { duration: 0.4, ease });
          return () => {
            play(visual, { y: 0, rotate: 0 }, { duration: 0.4, ease });
          };
        })
      );
    });

    stops.push(initCardSpotlight(root));

    // Keyboard users should never have to wait for an entrance to finish.
    const onFocus = (event) => {
      animations.forEach((animation, element) => {
        if (element.contains(event.target)) animation.complete();
      });
    };
    root.addEventListener('focusin', onFocus);
    dispose = () => {
      stops.forEach((stop) => stop());
      animations.forEach((animation) => animation.stop());
      root.removeEventListener('focusin', onFocus);
      styles.forEach((original, element) => {
        element.style.opacity = original.opacity;
        element.style.transform = original.transform;
      });
    };
  }

  setup();
  preference.addEventListener('change', setup);
  return () => {
    dispose();
    preference.removeEventListener('change', setup);
  };
}

export function initCardSpotlight(
  root = document.querySelector('#velocity-main')
) {
  if (!root) return () => {};
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (preference.matches || !finePointer.matches) return () => {};

  const cards = root.querySelectorAll(
    '.v-inventory-card, .v-reorder-panel, .v-reorder-summary-card, .v-supply-dept-card, .v-capability-card-visual'
  );
  if (!cards.length) return () => {};

  const cleanups = [];

  cards.forEach((card) => {
    card.classList.add('v-ambient-card');

    const onEnter = () => {
      card.classList.add('has-spotlight');
    };

    const onMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left);
      const y = Math.round(event.clientY - rect.top);
      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
    };

    const onLeave = () => {
      card.classList.remove('has-spotlight');
    };

    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointermove', onMove, { passive: true });
    card.addEventListener('pointerleave', onLeave);

    cleanups.push(() => {
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
      card.classList.remove('v-ambient-card', 'has-spotlight');
      card.style.removeProperty('--spotlight-x');
      card.style.removeProperty('--spotlight-y');
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
