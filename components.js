/* ===================================
   ASTR AI — Global Components
   =================================== */

// --- NAVBAR COMPONENT ---
class AstrNavbar extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';
    this.innerHTML = `
      <nav
        class="navbar fixed top-[32px] left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[1200px] rounded-[96px] z-[1000] py-[16px] px-[40px] flex items-center justify-between bg-white/10 backdrop-blur-[15px] border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-400 [&.scrolled]:bg-[#0a0a0a]/60 [&.scrolled]:backdrop-blur-[24px] [&.scrolled]:py-[12px] [&.scrolled]:px-[40px] [&.scrolled]:border-white/10 [&.scrolled]:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] max-[768px]:w-[calc(100%-32px)] max-[768px]:px-[24px]"
        id="navbar"
      >
        <a
          href="main-site.html"
          class="nav-logo flex items-center gap-[8px] text-[1.4rem] font-extrabold tracking-[2px]"
        >
          <img
            src="/Pictures/without bg 02.png"            alt="ASTR AI Logo"
            class="logo-image bg-transparent absolute top-[0.4em] left-[24px] h-[64px] w-auto block object-contain z-[1002] pointer-events-none max-[768px]:h-[48px] max-[768px]:top-[0.15em] max-[768px]:left-[16px]"
          />
        </a>
        <div
          class="nav-links flex items-center gap-[16px] pl-[128px] max-[1100px]:pl-0 max-[768px]:fixed max-[768px]:top-0 max-[768px]:right-[-100%] max-[768px]:w-full max-[768px]:h-screen max-[768px]:bg-[#0a0a0a]/95 max-[768px]:backdrop-blur-[24px] max-[768px]:flex-col max-[768px]:justify-center max-[768px]:gap-[32px] max-[768px]:transition-all max-[768px]:duration-500 max-[768px]:z-[1000] [&.nav-active]:right-0"
          id="navLinks"
        >
          <a
            class="text-[0.875rem] font-medium text-white/70 transition-all duration-200 relative py-[8px] px-[16px] rounded-[24px] border border-transparent hover:text-[#D1D5DB] hover:bg-white/5 hover:backdrop-blur-[10px] hover:border-white/10 hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)] max-[768px]:text-[1.25rem]"
            href="philosophy.html"
            >Philosophy</a
          >
          <a
            class="text-[0.875rem] font-medium text-white/70 transition-all duration-200 relative py-[8px] px-[16px] rounded-[24px] border border-transparent hover:text-[#D1D5DB] hover:bg-white/5 hover:backdrop-blur-[10px] hover:border-white/10 hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)] max-[768px]:text-[1.25rem]"
            href="solutions.html"
            >Solutions</a
          >
          <a
            class="text-[0.875rem] font-medium text-white/70 transition-all duration-200 relative py-[8px] px-[16px] rounded-[24px] border border-transparent hover:text-[#D1D5DB] hover:bg-white/5 hover:backdrop-blur-[10px] hover:border-white/10 hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)] max-[768px]:text-[1.25rem]"
            href="index.html#rd"
            >R&amp;D</a
          >
          <a
            class="nav-cta py-[12px] px-[24px] bg-gradient-to-br from-[#E6CD99] to-[#cba864] text-[#121212] font-bold rounded-[50px] text-[0.875rem] transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(230,205,153,0.35)] max-[768px]:text-[1.25rem]"
            href="#footer"
            >Contact Us</a
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

    // Highlight Active Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('text-white');
        link.classList.remove('text-white/70');
      }
    });
  }
}

// --- FOOTER COMPONENT ---
class AstrFooter extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';
    this.innerHTML = `
      <footer class="bg-transparent pt-section-y pb-16 relative overflow-hidden" id="footer">
        <div class="sun-rays"></div>
        <div class="container max-w-[1300px] mx-auto px-12 relative z-10">
          <!-- Architectural Signature Header -->
          <div class="flex flex-col lg:flex-row justify-between items-start gap-16 mb-[120px]">
            <div class="space-y-6">
              <img src="/Pictures/without bg 02.png" alt="ASTR AI Logo" class="h-[80px] max-[768px]:h-[60px] w-auto block object-contain mb-8" />
              <p class="text-white/40 leading-relaxed font-lora text-[1.1rem] max-w-[400px] italic">
                "Architecting intelligence for mission-critical frontiers."
              </p>
            </div>

            <div class="flex flex-col items-start lg:items-end gap-12">
              <div class="flex gap-12">
                <a href="#" class="arch-link">LinkedIn</a>
                <a href="#" class="arch-link">X / Twitter</a>
                <a href="#" class="arch-link">Instagram</a>
              </div>
              <div class="text-start lg:text-end">
                <span class="block font-mono text-[0.75rem] text-[var(--color-gold-DEFAULT)]/40 uppercase tracking-[4px] mb-4 font-semibold">Mission Briefing</span>
                <a href="mailto:hello@astrai.in" class="text-[clamp(1.25rem,3vw,1.75rem)] text-white hover:text-[var(--color-gold-DEFAULT)] transition-colors duration-500 font-lora font-light">
                  hello@astrai.in
                </a>
              </div>
            </div>
          </div>

          <!-- Floating Link Columns -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20 mb-[160px]">
            <div class="space-y-10">
              <h4 class="text-white/20 font-semibold text-[0.75rem] uppercase tracking-[4px] font-mono">Intelligence</h4>
              <ul class="space-y-6">
                <li><a href="#" class="arch-link">AI Integration</a></li>
                <li><a href="#" class="arch-link">Neural Networks</a></li>
                <li><a href="#" class="arch-link">System Audit</a></li>
                <li><a href="#" class="arch-link">R&D Roadmap</a></li>
              </ul>
            </div>
            <div class="space-y-10">
              <h4 class="text-white/20 font-semibold text-[0.75rem] uppercase tracking-[4px] font-mono">Operations</h4>
              <ul class="space-y-6">
                <li><a href="#" class="arch-link">Drone Fleet Ops</a></li>
                <li><a href="#" class="arch-link">Infrastructure</a></li>
                <li><a href="#" class="arch-link">Edge Security</a></li>
                <li><a href="#" class="arch-link">Logic Core</a></li>
              </ul>
            </div>
            <div class="space-y-10">
              <h4 class="text-white/20 font-semibold text-[0.75rem] uppercase tracking-[4px] font-mono">Company</h4>
              <ul class="space-y-6">
                <li><a href="philosophy.html" class="arch-link">Philosophy</a></li>
                <li><a href="solutions.html" class="arch-link">Solutions</a></li>
                <li><a href="#" class="arch-link">Careers</a></li>
                <li><a href="#" class="arch-link">Research</a></li>
              </ul>
            </div>
            <div class="space-y-10">
              <h4 class="text-white/20 font-semibold text-[0.75rem] uppercase tracking-[4px] font-mono">Status</h4>
              <div class="space-y-8">
                <div class="flex items-center gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-DEFAULT)] animate-pulse"></span>
                  <span class="font-mono text-[0.7rem] text-white/40 uppercase tracking-widest">Systems_Nominal</span>
                </div>
                <p class="text-white/20 font-lora text-[0.95rem] leading-relaxed">
                  22/44 A Harnam Nagar,<br />Kapurthala, Punjab, India
                </p>
              </div>
            </div>
          </div>

          <!-- Ethereal Metadata Bar -->
          <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <div class="system-metadata">
              <span>&copy; 2026 ASTR AI</span>
              <span class="separator"></span>
              <span>v1.0.4_MISSION_CRITICAL</span>
              <span class="separator"></span>
              <span>UPTIME: 99.99%</span>
            </div>
            <div class="flex gap-12 font-mono text-[0.6rem] uppercase tracking-[4px]">
              <a href="#" class="text-white/20 hover:text-white transition-colors">Privacy</a>
              <a href="#" class="text-white/20 hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          <div class="mt-20 pb-8 text-center border-t border-white/5 pt-12">
            <p class="text-white/40 text-[0.75rem] max-[480px]:text-[0.65rem] uppercase tracking-[4px] max-[480px]:tracking-[2px] font-mono font-medium">
              Developed by ASTR AI PRIVATE LIMITED &bull; MADE WITH AI
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}

// Define Custom Elements
customElements.define('astr-navbar', AstrNavbar);
customElements.define('astr-footer', AstrFooter);
