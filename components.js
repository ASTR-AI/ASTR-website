console.log('ASTR Components Loaded');
/* ===================================
   ASTR AI — Global Components
   =================================== */

// --- NAVBAR COMPONENT ---
class AstrNavbar extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';
    this.innerHTML = `
      <nav
        class="navbar fixed top-[32px] max-[768px]:top-[16px] left-[24px] right-[24px] max-[768px]:left-[16px] max-[768px]:right-[16px] mx-auto w-auto max-w-[1200px] rounded-[96px] z-[1000] py-[16px] px-[40px] flex items-center justify-between bg-white/10 backdrop-blur-[15px] border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-400 [&.scrolled]:bg-[#0a0a0a]/60 [&.scrolled]:backdrop-blur-[24px] [&.scrolled]:py-[12px] [&.scrolled]:px-[40px] [&.scrolled]:border-white/10 [&.scrolled]:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] max-[768px]:px-[24px]"
        id="navbar"
      >
        <a
          href="index.html"
          class="nav-logo flex items-center gap-[8px] text-[1.4rem] font-extrabold tracking-[2px] max-[768px]:w-auto"
        >
          <img
            src="/Pictures/without bg 02.png"
            alt="ASTR AI Logo"
            class="logo-image bg-transparent relative h-[48px] w-auto block object-contain z-[1002] max-[768px]:h-[40px]"
          />
        </a>
        <div
          class="nav-links flex items-center gap-[16px] max-[1100px]:pl-0 max-[768px]:fixed max-[768px]:top-0 max-[768px]:left-0 max-[768px]:translate-x-full max-[768px]:opacity-0 max-[768px]:pointer-events-none max-[768px]:w-full max-[768px]:h-screen max-[768px]:bg-[#0a0a0a]/95 max-[768px]:backdrop-blur-[24px] max-[768px]:flex-col max-[768px]:justify-center max-[768px]:gap-[32px] max-[768px]:transition-all max-[768px]:duration-500 max-[768px]:z-[1000] [&.nav-active]:translate-x-0 [&.nav-active]:opacity-100 [&.nav-active]:pointer-events-auto relative"
          id="navLinks"
        >
          <div class="nav-indicator hidden md:block" id="navIndicator"></div>
          <a
            class="text-[0.875rem] font-lora font-medium text-white/70 transition-all duration-200 relative py-[8px] px-[16px] rounded-[24px] border border-transparent hover:text-white hover:text-shadow-glow focus-visible:ring-2 focus-visible:ring-gold/50 outline-none max-[768px]:text-[1.25rem] z-10 cursor-pointer"
            href="philosophy.html"
            >Philosophy</a
          >
          <a
            class="text-[0.875rem] font-lora font-medium text-white/70 transition-all duration-200 relative py-[8px] px-[16px] rounded-[24px] border border-transparent hover:text-white hover:text-shadow-glow focus-visible:ring-2 focus-visible:ring-gold/50 outline-none max-[768px]:text-[1.25rem] z-10 cursor-pointer"
            href="solutions.html"
            >Solutions</a
          >
          <a
            class="text-[0.875rem] font-lora font-medium text-white/70 transition-all duration-200 relative py-[8px] px-[16px] rounded-[24px] border border-transparent hover:text-white hover:text-shadow-glow focus-visible:ring-2 focus-visible:ring-gold/50 outline-none max-[768px]:text-[1.25rem] z-10 cursor-pointer"
            href="rd.html"
            >R&amp;D</a
          >
        </div>
        <div
          class="nav-hamburger hidden flex-col gap-[4px] cursor-pointer z-[1001] max-[768px]:flex [&>span]:w-6 [&>span]:h-[2px] [&>span]:bg-white [&>span]:transition-all [&>span]:duration-300 [&.active>span:nth-child(1)]:rotate-45 [&.active>span:nth-child(1)]:translate-y-[6px] [&.active>span:nth-child(2)]:opacity-0 [&.active>span:nth-child(3)]:-rotate-45 [&.active>span:nth-child(3)]:-translate-y-[6px]"
          id="hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    `;

    this.initLogic();
  }

  initLogic() {
    const navbar = this.querySelector('#navbar');
    const hamburger = this.querySelector('#hamburger');
    const navLinks = this.querySelector('#navLinks');

    if (!navbar || !hamburger || !navLinks) return;

    // Scroll Effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Hamburger Toggle
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('nav-active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('nav-active');
      });
    });

    // Sliding Indicator Logic
    const indicator = this.querySelector('#navIndicator');
    const links = navLinks.querySelectorAll('a');

    let activeLink = null;
    let animationTimeout = null;
    const currentPath =
      window.location.pathname.split('/').pop() || 'index.html';

    const moveIndicator = (element) => {
      if (!indicator || !element) {
        if (indicator) indicator.style.opacity = '0';
        return;
      }

      const { offsetLeft, offsetWidth } = element;
      const currentLeft = parseFloat(indicator.style.left) || 0;

      // Determine movement direction for liquid animation
      if (currentLeft !== 0 && Math.abs(currentLeft - offsetLeft) > 5) {
        const direction =
          offsetLeft > currentLeft ? 'moving-right' : 'moving-left';

        if (animationTimeout) clearTimeout(animationTimeout);
        indicator.classList.remove('moving-left', 'moving-right', 'pulse');
        void indicator.offsetWidth; // Trigger reflow for animation restart
        indicator.classList.add(direction, 'pulse');

        // Remove classes after animation completes (900ms to match new viscous CSS)
        animationTimeout = setTimeout(() => {
          indicator.classList.remove('moving-left', 'moving-right', 'pulse');
        }, 900);
      }

      indicator.style.left = `${offsetLeft}px`;
      indicator.style.width = `${offsetWidth}px`;
      indicator.style.opacity = '1';
    };

    // Highlight Active Link & Event Listeners
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('text-white');
        link.classList.remove('text-white/70');
        activeLink = link;
      }

      link.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) moveIndicator(link);
      });

      link.addEventListener('click', (e) => {
        if (window.innerWidth > 768) {
          activeLink = link;
          moveIndicator(link);
          links.forEach((l) => {
            l.classList.remove('text-white');
            l.classList.add('text-white/70');
          });
          link.classList.add('text-white');
          link.classList.remove('text-white/70');
        }
      });
    });

    // Reset to active on mouse leave nav-links
    navLinks.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) moveIndicator(activeLink);
    });

    // Set initial position
    if (activeLink && window.innerWidth > 768) {
      setTimeout(() => moveIndicator(activeLink), 100);
    }

    // Handle Resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        moveIndicator(activeLink);
      }
    });
  }
}

// --- FOOTER COMPONENT ---
class AstrFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="relative pt-32 pb-16 overflow-hidden border-t border-white/10" id="footer">
        <!-- Blueprint Grid Background -->
        <div class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 60px 60px;"></div>

        <div class="container max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
          
          <!-- Metadata Header Bar -->
          <div class="flex flex-col md:flex-row md:items-center justify-between py-6 border-y border-white/10 mb-20 gap-4 reveal">
            <div class="flex items-center gap-6">
              <span class="font-mono text-[0.7rem] text-gold tracking-[4px] uppercase font-bold">Terminal_Output</span>
              <span class="w-[1px] h-4 bg-white/20"></span>
              <span class="font-mono text-[0.7rem] text-white/40 tracking-[2px] uppercase">Ref: ARC_F01 // Global_Footer_V.07</span>
            </div>
            <div class="flex items-center gap-4 font-mono text-[0.6rem] text-white/20 uppercase tracking-widest">
              <span>Connection: Secure</span>
              <span class="w-1 h-1 rounded-full bg-gold/40"></span>
              <span class="animate-pulse">Uplink: Active</span>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
            
            <!-- Column 1: Brand & Philosophy (5/12) -->
            <div class="lg:col-span-5 space-y-10 relative lg:pr-16">
              <div class="relative inline-block reveal">
                <a href="index.html" class="flex flex-col items-start gap-1 group">
                  <img src="/Pictures/without bg 02.png" alt="ASTR AI Logo" class="h-20 w-auto opacity-90 group-hover:scale-105 transition-transform duration-500" />
                  <span class="font-mono text-[0.6rem] text-gold/60 tracking-[4px] uppercase font-bold">Private Limited</span>
                </a>
                <!-- Handwritten Annotation -->
                <div class="absolute -top-8 -right-12 hidden lg:block pointer-events-none">
                  <span class="font-caveat text-gold/40 text-[1.4rem] -rotate-6 whitespace-nowrap pb-1 leading-tight block">// Architecting Intelligence</span>
                </div>
              </div>
              
              <p class="font-lora text-white/40 text-lg leading-relaxed max-w-[450px] reveal reveal-delay-1">
                Building the bridge between your ideas and technology. 
                Built on the philosophy of complete accuracy and trust.
              </p>
              <div class="flex gap-4 pt-4 reveal reveal-delay-2">
                <div class="relative h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group hover:border-gold/30 transition-colors duration-500">
                  <span class="font-mono text-[0.5rem] text-white/20 group-hover:text-gold/40">ASTR</span>
                </div>
                <div class="space-y-1">
                  <span class="font-mono text-[0.5rem] text-white/20 uppercase tracking-[2px] block">Status</span>
                  <span class="font-mono text-[0.6rem] text-gold/60 uppercase tracking-[1px] block">Systems_Nominal</span>
                </div>
              </div>
            </div>

            <!-- Column 2: Intelligence (3/12) -->
            <div class="lg:col-span-3 space-y-10 relative lg:px-12 lg:border-l lg:border-white/5">
              <!-- Dimension Marker (Desktop) -->
              <div class="absolute -left-1.5 top-0 bottom-0 w-3 flex flex-col justify-between py-4 pointer-events-none hidden lg:flex">
                <div class="w-full h-[1px] bg-white/10"></div>
                <span class="font-mono text-[0.4rem] text-white/10 -rotate-90 origin-left">H: 320.0mm</span>
                <div class="w-full h-[1px] bg-white/10"></div>
              </div>

              <div class="reveal reveal-delay-3">
                <h4 class="font-mono text-[0.65rem] text-gold/60 uppercase tracking-[4px] mb-8 flex items-center gap-3">
                  <span class="w-4 h-[1px] bg-gold/30"></span>
                  Intelligence
                </h4>
                <ul class="space-y-5">
                  <li><a href="philosophy.html" class="group flex items-center justify-between text-white/40 hover:text-white transition-all duration-300 focus-visible:ring-1 focus-visible:ring-gold/30 outline-none p-1 rounded cursor-pointer">
                    <span class="font-lora uppercase tracking-[1px] text-[0.85rem]">Philosophy</span>
                    <span class="font-mono text-[0.5rem] opacity-0 group-hover:opacity-100 transition-opacity">REF_P01</span>
                  </a></li>
                  <li><a href="solutions.html" class="group flex items-center justify-between text-white/40 hover:text-white transition-all duration-300 focus-visible:ring-1 focus-visible:ring-gold/30 outline-none p-1 rounded cursor-pointer">
                    <span class="font-lora uppercase tracking-[1px] text-[0.85rem]">Solutions</span>
                    <span class="font-mono text-[0.5rem] opacity-0 group-hover:opacity-100 transition-opacity">REF_S01</span>
                  </a></li>
                  <li><a href="rd.html" class="group flex items-center justify-between text-white/40 hover:text-white transition-all duration-300 focus-visible:ring-1 focus-visible:ring-gold/30 outline-none p-1 rounded cursor-pointer">
                    <span class="font-lora uppercase tracking-[1px] text-[0.85rem]">R&D Lab</span>
                    <span class="font-mono text-[0.5rem] opacity-0 group-hover:opacity-100 transition-opacity">REF_R01</span>
                  </a></li>
                  <li><a href="internship.html" class="group flex items-center justify-between text-white/40 hover:text-white transition-all duration-300 focus-visible:ring-1 focus-visible:ring-gold/30 outline-none p-1 rounded cursor-pointer">
                    <span class="font-lora uppercase tracking-[1px] text-[0.85rem]">Internship</span>
                    <span class="font-mono text-[0.5rem] opacity-0 group-hover:opacity-100 transition-opacity">REF_I01</span>
                  </a></li>
                </ul>
              </div>
            </div>

            <!-- Column 3: Communication (4/12) -->
            <div class="lg:col-span-4 space-y-10 relative lg:pl-16 lg:border-l lg:border-white/5">
              <!-- Dimension Marker (Desktop) -->
              <div class="absolute -left-1.5 top-0 bottom-0 w-3 flex flex-col justify-between py-4 pointer-events-none hidden lg:flex">
                <div class="w-full h-[1px] bg-white/10"></div>
                <span class="font-mono text-[0.4rem] text-white/10 -rotate-90 origin-left">H: 320.0mm</span>
                <div class="w-full h-[1px] bg-white/10"></div>
              </div>

              <div class="reveal reveal-delay-4">
                <h4 class="font-mono text-[0.65rem] text-gold/60 uppercase tracking-[4px] mb-8 flex items-center gap-3">
                  <span class="w-4 h-[1px] bg-gold/30"></span>
                  Communication
                </h4>
                <div class="space-y-10">
                  <a href="connect.html" class="block group">
                    <span class="font-mono text-[0.55rem] text-gold uppercase tracking-[2px] block mb-2">Establish_Connection</span>
                    <span class="font-lora text-xl text-white group-hover:text-gold transition-colors duration-300">Technical Portal →</span>
                  </a>
                  <a href="mailto:hello@astrai.in" class="block group">
                    <span class="font-mono text-[0.55rem] text-white/20 uppercase tracking-[2px] block mb-2">Secure_Uplink</span>
                    <span class="font-lora text-lg text-white/80 group-hover:text-gold transition-colors duration-300">hello@astrai.in</span>
                  </a>
                  <div class="flex gap-12">
                    <a href="https://www.linkedin.com/company/astr-ai/" target="_blank" class="group flex flex-col gap-1">
                      <span class="font-mono text-[0.5rem] text-white/20 uppercase tracking-widest">LinkedIn</span>
                      <span class="w-0 h-[1px] bg-gold/40 group-hover:w-full transition-all duration-500"></span>
                    </a>
                    <a href="https://instagram.com/astrai.in" target="_blank" class="group flex flex-col gap-1">
                      <span class="font-mono text-[0.5rem] text-white/20 uppercase tracking-widest">Instagram</span>
                      <span class="w-0 h-[1px] bg-gold/40 group-hover:w-full transition-all duration-500"></span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Location Detail -->
              <div class="pt-8 mt-8 border-t border-white/5 reveal reveal-delay-5">
                <div class="flex items-start gap-4">
                  <span class="font-mono text-[0.5rem] text-white/20 uppercase tracking-widest mt-1">Base_Ops</span>
                  <p class="font-mono text-[0.6rem] text-white/30 leading-relaxed uppercase tracking-wider">
                    22/44 A HARNAM NAGAR,<br />KAPURTHALA, PB, INDIA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Status Bar -->
          <div class="mt-24 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 reveal">
            <div class="flex flex-wrap justify-center md:justify-start gap-8 font-mono text-[0.55rem] uppercase tracking-[3px] text-white/20">
              <span class="flex items-center gap-3">
                <span class="w-1.5 h-[1px] bg-gold/40"></span>
                &copy; 2026 ASTR AI PRIVATE LIMITED
              </span>
              <span class="hidden md:inline text-white/5">/</span>
              <a href="mission-docs.html#privacy" class="hover:text-white transition-colors">Privacy_Policy</a>
              <span class="hidden md:inline text-white/5">/</span>
              <a href="mission-docs.html#terms" class="hover:text-white transition-colors">Terms_of_Service</a>
            </div>
            
            <div class="flex items-center gap-6">
              <span class="font-caveat text-white/20 text-[1.2rem] -rotate-2 pb-1 leading-tight select-none block">// Mission_Success</span>
              <div class="px-3 py-1 border border-white/10 rounded-sm font-mono text-[0.5rem] text-white/20">v1.0.7</div>
            </div>
          </div>

          <div class="mt-16 text-center opacity-10">
            <p class="font-mono text-[0.55rem] tracking-[6px] uppercase">Architected by ASTR AI, Made with AI</p>
          </div>

          <!-- Sanskrit Watermark Bottom -->
          <div class="absolute -bottom-10 right-10 opacity-[0.03] select-none pointer-events-none hidden lg:block">
            <span class="font-serif text-[10rem]">अस्त्र</span>
          </div>
        </div>
      </footer>
    `;
  }
}

// --- TELEMETRY HUD COMPONENT ---
class AstrTelemetry extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';
    this.innerHTML = `
      <div class="telemetry-hud absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-40 font-mono">
        <!-- Corner Markers -->
        <div class="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-gold/30"></div>
        <div class="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-gold/30"></div>
        <div class="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-gold/30"></div>
        <div class="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-gold/30"></div>

        <!-- Scanning Line -->
        <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-scan"></div>

        <!-- Coordinates Label (Rotating) -->
        <div class="absolute top-12 left-12 text-[0.6rem] text-gold/60 tracking-[3px] uppercase">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-gold/40 animate-pulse"></span>
            LAT: <span id="lat-val">00.0000</span>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <span class="w-2 h-2 rounded-full border border-gold/40"></span>
            LON: <span id="lon-val">00.0000</span>
          </div>
        </div>

        <!-- System Status -->
        <div class="absolute bottom-12 right-12 text-right">
          <div class="text-[0.5rem] text-white/20 uppercase tracking-[4px] mb-1">System_Integrity</div>
          <div class="text-[0.7rem] text-gold/60 uppercase tracking-[2px] font-bold">
            <span id="status-text">Scanning...</span>
            <span class="inline-block w-[2px] h-3 bg-gold/60 ml-1 animate-cursor"></span>
          </div>
        </div>

        <!-- Vertical Altitude Marker -->
        <div class="absolute right-12 top-1/2 -translate-y-1/2 h-32 flex flex-col justify-between items-end opacity-20">
          <div class="w-4 h-[1px] bg-white"></div>
          <div class="w-8 h-[1px] bg-white"></div>
          <div class="w-4 h-[1px] bg-white"></div>
          <div class="w-4 h-[1px] bg-white"></div>
          <div class="w-12 h-[1px] bg-gold"></div>
          <div class="w-4 h-[1px] bg-white"></div>
        </div>
      </div>
    `;

    this.initTelemetry();
  }

  initTelemetry() {
    const latVal = this.querySelector('#lat-val');
    const lonVal = this.querySelector('#lon-val');
    const statusText = this.querySelector('#status-text');

    const statuses = [
      'Analyzing_Flow',
      'Optimizing_Logic',
      'Syncing_Nodes',
      'ASTR_OS_v1.07',
      'Mission_Active',
    ];
    let statusIndex = 0;

    setInterval(() => {
      if (latVal) latVal.innerText = (Math.random() * 90).toFixed(4);
      if (lonVal) lonVal.innerText = (Math.random() * 180).toFixed(4);
    }, 2000);

    setInterval(() => {
      if (statusText) {
        statusIndex = (statusIndex + 1) % statuses.length;
        statusText.innerText = statuses[statusIndex];
      }
    }, 4500);
  }
}

// --- SELECT / DROPDOWN COMPONENT ---
class AstrSelect extends HTMLElement {
  connectedCallback() {
    const placeholder = this.getAttribute('placeholder') || 'Select Option';
    const name = this.getAttribute('name') || '';
    const options = Array.from(this.querySelectorAll('option')).map((opt) => ({
      value: opt.value,
      label: opt.textContent,
      shortcut: opt.getAttribute('data-shortcut') || '',
    }));

    this.innerHTML = `
      <div class="astr-select" id="select-container">
        <input type="hidden" name="${name}" id="select-input" required>
        <div class="astr-select-trigger" id="select-trigger" tabindex="0">
          <span class="placeholder">${placeholder}</span>
          <svg class="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="astr-select-options" id="select-options">
          ${options
            .map(
              (opt) => `
            <div class="astr-select-option" data-value="${opt.value}">
              ${opt.label}
              ${opt.shortcut ? `<span class="shortcut">${opt.shortcut}</span>` : ''}
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;

    this.initLogic();
  }

  initLogic() {
    const container = this.querySelector('#select-container');
    const trigger = this.querySelector('#select-trigger');
    const optionsList = this.querySelector('#select-options');
    const options = this.querySelectorAll('.astr-select-option');
    const input = this.querySelector('#select-input');
    const placeholder = trigger.querySelector('.placeholder');

    const toggleOpen = () => {
      const isOpen = optionsList.classList.contains('open');
      if (isOpen) {
        optionsList.classList.remove('open');
        trigger.classList.remove('active');
      } else {
        // Close other selects if any
        document.querySelectorAll('.astr-select-options.open').forEach((el) => {
          el.classList.remove('open');
          el.parentElement.querySelector('.astr-select-trigger').classList.remove('active');
        });
        optionsList.classList.add('open');
        trigger.classList.add('active');
      }
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleOpen();
    });

    options.forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = opt.getAttribute('data-value');
        const label = opt.textContent.split('\n')[1]?.trim() || opt.textContent.trim();
        
        input.value = val;
        placeholder.textContent = label;
        placeholder.classList.remove('placeholder');
        placeholder.classList.add('selected-value');

        options.forEach((o) => o.classList.remove('selected'));
        opt.classList.add('selected');

        optionsList.classList.remove('open');
        trigger.classList.remove('active');
      });
    });

    // Close on outside click
    document.addEventListener('click', () => {
      optionsList.classList.remove('open');
      trigger.classList.remove('active');
    });

    // Keyboard Navigation
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleOpen();
      }
    });
  }
}

// Define Custom Elements
customElements.define('astr-navbar', AstrNavbar);
customElements.define('astr-footer', AstrFooter);
customElements.define('astr-telemetry', AstrTelemetry);
customElements.define('astr-select', AstrSelect);
