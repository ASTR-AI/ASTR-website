function onReady(fn) {
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function initSolutionsExpansion() {
  // 0. Adaptive Solutions Text Blocks & Divider Line ScrollTrigger
  const adaptiveBlocks = document.querySelectorAll('.adaptive-text-block');
  if (
    adaptiveBlocks.length > 0 &&
    typeof gsap !== 'undefined' &&
    typeof ScrollTrigger !== 'undefined'
  ) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      adaptiveBlocks,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.adaptive-text-column',
          start: 'top 80%',
        },
      }
    );

    const dividers = document.querySelectorAll('.adaptive-block-divider');
    dividers.forEach((divider) => {
      gsap.fromTo(
        divider,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: divider,
            start: 'top 90%',
          },
        }
      );
    });
  }

  // 1. Before & After Slider
  const baContainer = document.querySelector('.ba-container');
  if (baContainer) {
    const afterState = baContainer.querySelector('.ba-after');
    const handle = baContainer.querySelector('.ba-handle');
    let isDragging = false;

    const moveSlider = (e) => {
      if (!isDragging) return;
      const rect = baContainer.getBoundingClientRect();
      let x = (e.clientX || e.touches?.[0].clientX) - rect.left;
      x = Math.max(0, Math.min(x, rect.width)); // clamp
      const percent = (x / rect.width) * 100;

      handle.style.left = `${percent}%`;
      afterState.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
    };

    baContainer.addEventListener('mousedown', () => (isDragging = true));
    baContainer.addEventListener(
      'touchstart',
      () => {
        isDragging = true;
      },
      { passive: true }
    );
    window.addEventListener('mouseup', () => (isDragging = false));
    window.addEventListener('touchend', () => (isDragging = false));
    window.addEventListener('mousemove', moveSlider);
    window.addEventListener('touchmove', moveSlider, { passive: true });
  }

  // 2. Accordion with GSAP Entrance & Smooth Toggle
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (
    accordionItems.length > 0 &&
    typeof gsap !== 'undefined' &&
    typeof ScrollTrigger !== 'undefined'
  ) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      accordionItems,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.accordion-container',
          start: 'top 85%',
        },
      }
    );
  }

  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const icon = item.querySelector('.accordion-icon');
      const isActive = item.classList.contains('active');

      // Close all items smoothly
      document.querySelectorAll('.accordion-item').forEach((i) => {
        i.classList.remove('active');
        const c = i.querySelector('.accordion-content');
        const ic = i.querySelector('.accordion-icon');
        if (typeof gsap !== 'undefined') {
          gsap.to(c, {
            maxHeight: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          });
          if (ic) gsap.to(ic, { rotate: 0, duration: 0.3 });
        } else {
          c.style.maxHeight = '0px';
          c.style.opacity = '0';
        }
      });

      // Open selected item smoothly
      if (!isActive) {
        item.classList.add('active');
        if (typeof gsap !== 'undefined') {
          gsap.to(content, {
            maxHeight: content.scrollHeight + 40,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          });
          if (icon) gsap.to(icon, { rotate: 180, duration: 0.3 });
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.opacity = '1';
        }
      }
    });
  });

  // 2.5. Industry Section Entrance Animation
  const industriesSection = document.querySelector('.industries-section');
  if (
    industriesSection &&
    typeof gsap !== 'undefined' &&
    typeof ScrollTrigger !== 'undefined'
  ) {
    gsap.registerPlugin(ScrollTrigger);

    const industryReveals =
      industriesSection.querySelectorAll('.industry-reveal');
    const tabsWrapper = industriesSection.querySelector('.tabs-wrapper');
    const tabContentContainer = industriesSection.querySelector(
      '.tab-content-container'
    );

    const elementsToAnimate = [
      ...industryReveals,
      tabsWrapper,
      tabContentContainer,
    ].filter(Boolean);

    if (elementsToAnimate.length > 0) {
      gsap.fromTo(
        elementsToAnimate,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: industriesSection,
            start: 'top 85%',
          },
        }
      );
    }
  }

  // 3. Industry Tabs with Smooth Cross-Fade Panes
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const industrySlider = document.querySelector(
    '.industries-section .nav-highlight'
  );
  let industryAnimTimeout = null;

  function moveIndustrySlider(tab) {
    if (!industrySlider || !tab) return;

    const currentLeft = parseFloat(industrySlider.style.left) || 0;
    const targetLeft = tab.offsetLeft;

    if (currentLeft !== 0 && Math.abs(currentLeft - targetLeft) > 5) {
      const direction =
        targetLeft > currentLeft ? 'moving-right' : 'moving-left';

      if (industryAnimTimeout) clearTimeout(industryAnimTimeout);
      industrySlider.classList.remove('moving-left', 'moving-right', 'pulse');
      void industrySlider.offsetWidth;
      industrySlider.classList.add(direction, 'pulse');

      industryAnimTimeout = setTimeout(() => {
        industrySlider.classList.remove('moving-left', 'moving-right', 'pulse');
      }, 900);
    }

    industrySlider.style.width = `${tab.offsetWidth}px`;
    industrySlider.style.left = `${tab.offsetLeft}px`;
    industrySlider.style.opacity = '1';
  }

  // Initialize active tab indicator position
  const initialTab = document.querySelector('.tab-btn.active');
  if (initialTab) {
    setTimeout(() => moveIndustrySlider(initialTab), 100);
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Deactivate all button styles
      tabBtns.forEach((b) => {
        b.classList.remove('active', 'text-white');
        b.classList.add('text-white/50');
      });

      // Activate clicked button
      btn.classList.add('active', 'text-white');
      btn.classList.remove('text-white/50');
      moveIndustrySlider(btn);

      const targetId = btn.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);

      tabPanes.forEach((p) => {
        if (p === targetPane) return;
        p.classList.remove('active');
        if (typeof gsap !== 'undefined') {
          gsap.to(p, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            onComplete: () => {
              p.style.zIndex = '0';
              p.classList.add('pointer-events-none');
            },
          });
        } else {
          p.classList.add('opacity-0', 'pointer-events-none');
          p.style.zIndex = '0';
        }
      });

      if (targetPane) {
        targetPane.classList.add('active');
        targetPane.classList.remove('pointer-events-none');
        targetPane.style.zIndex = '10';

        if (typeof gsap !== 'undefined') {
          gsap.fromTo(
            targetPane,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          );
        } else {
          targetPane.classList.add('opacity-100');
          targetPane.classList.remove('opacity-0');
        }
      }
    });
  });

  // 4. Strategic Choice Entry Animations (The Slider Section)
  const strategicSection = document.querySelector('.before-after-section');
  if (
    strategicSection &&
    typeof gsap !== 'undefined' &&
    typeof ScrollTrigger !== 'undefined'
  ) {
    const card = strategicSection.querySelector('.ba-container');
    const annotations = strategicSection.querySelectorAll(
      '.strategic-annotation'
    );
    const mobileNotes = strategicSection.querySelectorAll(
      '.strategic-mobile-note'
    );

    // Card Entrance
    if (card) {
      gsap.fromTo(
        card,
        { scale: 0.95, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    }

    // Desktop Annotations Stagger
    if (annotations.length > 0) {
      gsap.fromTo(
        annotations,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: strategicSection,
            start: 'top 80%',
          },
        }
      );
    }

    // Mobile Notes Stagger
    if (mobileNotes.length > 0) {
      gsap.fromTo(
        mobileNotes,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: strategicSection,
            start: 'top 85%',
          },
        }
      );
    }
  }

  // 5. Timeline ScrollTrigger
  const timelineSection = document.querySelector('.timeline-section');
  if (
    timelineSection &&
    typeof gsap !== 'undefined' &&
    typeof ScrollTrigger !== 'undefined'
  ) {
    gsap.registerPlugin(ScrollTrigger);

    const steps = document.querySelectorAll('.timeline-step');
    const progressPath = document.getElementById('timeline-progress-path');
    const progressLineMobile = document.getElementById(
      'timeline-progress-line-mobile'
    );

    // Desktop: Curved SVG Path Animation
    if (progressPath && window.innerWidth >= 768) {
      let pathLength = 1000;
      try {
        pathLength = progressPath.getTotalLength() || 1000;
      } catch (e) {
        pathLength = 1000;
      }

      // Initialize path
      gsap.set(progressPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(progressPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-wrapper',
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: true,
        },
      });
    }

    // Mobile: Straight Line Animation (Fallback)
    if (progressLineMobile && window.innerWidth < 768) {
      gsap.to(progressLineMobile, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-wrapper',
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: true,
        },
      });
    }

    steps.forEach((step, i) => {
      const circle = step.querySelector('.step-circle');
      const textContent = step.querySelector('.timeline-text-content');
      const isEven = i % 2 !== 0;

      // Animate the entire step container opacity
      gsap.to(step, {
        opacity: 1,
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => step.classList.add('active'),
        },
      });

      // Animate the circle (scale and border glow)
      if (circle) {
        gsap.fromTo(
          circle,
          { scale: 0.8, borderColor: 'rgba(255,255,255,0.2)' },
          {
            scale: 1.25,
            borderColor: '#E6CD99',
            backgroundColor: 'rgba(230,205,153,0.15)',
            boxShadow: '0 0 25px rgba(230,205,153,0.4)',
            duration: 0.6,
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animate the text content (slide in cleanly)
      if (textContent) {
        gsap.fromTo(
          textContent,
          { x: isEven ? 40 : -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }
}

onReady(() => {
  initSolutionsExpansion();

  // Refresh ScrollTrigger to ensure all layout shifts are accounted for
  if (typeof ScrollTrigger !== 'undefined') {
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 500);
      setTimeout(() => ScrollTrigger.refresh(), 1500);
    });

    // Also observe the body for height changes in case of dynamic image loading
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);
  }
});
