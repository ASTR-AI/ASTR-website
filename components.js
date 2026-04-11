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
            class="logo-image bg-transparent absolute top-[0.4em] left-[24px] h-[64px] w-auto block object-contain z-[1002] max-[768px]:h-[48px] max-[768px]:top-[0.15em] max-[768px]:left-[16px]"
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
            href="rd.html"
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
      <footer class="bg-[#050505] pt-32 pb-16 relative overflow-hidden border-t border-white/5" id="footer">
        <!-- Blueprint Grid Background (Subtle) -->
        <div class="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 80px 80px;"></div>
        
        <div class="container max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
          
          <!-- Metadata Header Line -->
          <div class="flex items-center gap-6 mb-24 opacity-40">
            <span class="font-mono text-[0.6rem] text-gold tracking-[4px] uppercase">Archive_Closure</span>
            <div class="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            <span class="font-mono text-[0.5rem] text-white/20 uppercase tracking-[2px]">EOF_SYSTEM_READY</span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
            
            <!-- Column 1: Brand & Philosophy (6/12) -->
            <div class="lg:col-span-6 space-y-12">
              <div class="space-y-8">
                <div class="space-y-2">
                  <img src="/Pictures/without bg 02.png" alt="ASTR AI Logo" class="h-16 w-auto block object-contain" />
                  <span class="block font-mono text-[0.6rem] text-gold/60 uppercase tracking-[4px]">Private Limited</span>
                </div>
                <h2 class="font-cinzel text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1]">
                  Architecting <span class="italic font-light opacity-60 text-white/80">Intelligence.</span>
                </h2>
                <div class="relative max-w-[450px]">
                  <p class="text-white/40 text-lg leading-relaxed italic">
                    Building the foundations for a future where autonomy and human-centric logic coexist in perfect synchronization.
                  </p>
                  <!-- Handwritten Annotation -->
                  <div class="absolute -bottom-16 left-0">
                    <span class="font-caveat text-gold/40 text-[1.4rem] block -rotate-2">
                      // Not just code—a mission for the collective.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Column 2: Navigation (3/12) -->
            <div class="lg:col-span-3 space-y-10">
              <h4 class="font-mono text-[0.65rem] text-gold/60 uppercase tracking-[4px] border-b border-white/5 pb-4">Internal_Links</h4>
              <ul class="space-y-4">
                <li><a href="philosophy.html" class="group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
                  <span class="w-1.5 h-[1px] bg-gold/20 group-hover:w-4 transition-all"></span>
                  Philosophy
                </a></li>
                <li><a href="solutions.html" class="group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
                  <span class="w-1.5 h-[1px] bg-gold/20 group-hover:w-4 transition-all"></span>
                  Solutions
                </a></li>
                <li><a href="rd.html" class="group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
                  <span class="w-1.5 h-[1px] bg-gold/20 group-hover:w-4 transition-all"></span>
                  R&D Lab
                </a></li>
                <li><a href="mission-docs.html#careers" class="group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
                  <span class="w-1.5 h-[1px] bg-gold/20 group-hover:w-4 transition-all"></span>
                  Careers
                </a></li>
              </ul>
            </div>

            <!-- Column 3: Contact & Social (3/12) -->
            <div class="lg:col-span-3 space-y-10">
              <h4 class="font-mono text-[0.65rem] text-gold/60 uppercase tracking-[4px] border-b border-white/5 pb-4">Communication</h4>
              <div class="space-y-8">
                <a href="mailto:hello@astrai.in" class="block font-lora text-xl text-white/80 hover:text-gold transition-colors">
                  hello@astrai.in
                </a>
                <div class="flex gap-8">
                  <a href="https://www.linkedin.com/company/astr-ai/?viewAsMember=true" target="_blank" class="text-white/20 hover:text-white transition-colors text-sm uppercase tracking-widest font-mono">LinkedIn</a>
                  <a href="https://instagram.com/astrai.in" target="_blank" class="text-white/20 hover:text-white transition-colors text-sm uppercase tracking-widest font-mono">Instagram</a>
                </div>
                <div class="pt-4 space-y-2">
                  <span class="font-mono text-[0.6rem] text-white/20 uppercase block tracking-widest">Base_Ops</span>
                  <p class="text-white/40 text-xs leading-relaxed font-mono">
                    22/44 A HARNAM NAGAR,<br />KAPURTHALA, PB, INDIA
                  </p>
                </div>
              </div>
            </div>

          </div>

          <!-- Final Metadata Bar -->
          <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 font-mono text-[0.6rem] uppercase tracking-[3px] text-white/20">
            <div class="flex flex-wrap justify-center md:justify-start gap-8">
              <span>&copy; 2026 ASTR AI PRIVATE LIMITED</span>
              <span class="hidden md:inline text-white/5">|</span>
              <span class="flex items-center gap-2">
                <span class="w-1 h-1 rounded-full bg-green-500/40"></span>
                Uptime: 99.9%
              </span>
              <span class="hidden md:inline text-white/5">|</span>
              <span>v1.0.4_LATEST</span>
            </div>
            
            <div class="flex gap-8">
              <a href="mission-docs.html#privacy" class="hover:text-white transition-colors">Privacy</a>
              <a href="mission-docs.html#terms" class="hover:text-white transition-colors">Terms</a>
            </div>
          </div>

          <div class="mt-16 text-center opacity-30">
            <p class="font-mono text-[0.5rem] tracking-[6px] uppercase">Architected by ASTR AI Collective &bull; Built with AI</p>
          </div>
        </div>
      </footer>
    `;
  }
}

// Define Custom Elements
customElements.define('astr-navbar', AstrNavbar);
customElements.define('astr-footer', AstrFooter);
