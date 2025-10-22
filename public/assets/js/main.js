/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  // Compatibility stubs for pages that don't load optional vendor libs
  if (typeof window !== 'undefined' && typeof window.PureCounter === 'undefined') {
    // No-op constructor so `new PureCounter()` doesn't throw where vendor isn't included
    window.PureCounter = function() { return {}; };
  }

  /* ======================================================
   * JavaScript Organization (per section)
   * - Global: header toggle, scroll-top, AOS, scrollspy
   * - Hero: typed.js headline
   * - Stats: PureCounter
   * - Skills: progress reveal on scroll
   * - Portfolio: GLightbox + Isotope filters
   * - Testimonials: Swiper sliders
   * - Contact: (form handled by vendor validate.js)
   * Each initializer is safe to call even if section is absent.
   * ====================================================== */

  /**
   * Header toggle
   */
  // Global: Header toggle (exposed for template-loader)
  function _initializeHeaderFunctionality() {
    const headerToggleBtn = document.querySelector('.header-toggle');
    
    if (headerToggleBtn) {
      function headerToggle() {
        document.querySelector('#header').classList.toggle('header-show');
        headerToggleBtn.classList.toggle('bi-list');
        headerToggleBtn.classList.toggle('bi-x');
      }
      headerToggleBtn.addEventListener('click', headerToggle);

      // Expose a safe global closer for mobile: hide if open
      window.hideHeaderMenu = function() {
        const headerEl = document.querySelector('#header');
        if (!headerEl) return;
        if (headerEl.classList.contains('header-show')) {
          headerEl.classList.remove('header-show');
          if (headerToggleBtn) {
            headerToggleBtn.classList.add('bi-list');
            headerToggleBtn.classList.remove('bi-x');
          }
        }
      };
    }
  }
  // Expose globally
  window.initializeHeaderFunctionality = _initializeHeaderFunctionality;

  // (Removed early nav hide handler to avoid referencing local headerToggle; handled in navigation initializer)

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    // Hide preloader immediately to prevent it from getting stuck
    preloader.style.display = 'none';
    
    // Also listen for window load as backup
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  function _initializeScrollTop() {
    let scrollTop = document.querySelector('.scroll-top');

    if (scrollTop) {
      function toggleScrollTop() {
        if (scrollTop) {
          window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
      }
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      window.addEventListener('load', toggleScrollTop);
      document.addEventListener('scroll', toggleScrollTop);
    }
  }
  // Expose globally
  window.initializeScrollTop = _initializeScrollTop;

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  // Hero: typed.js headline
  function initHeroSection() {
    const selectTyped = document.querySelector('.typed');
    if (!selectTyped || typeof Typed === 'undefined') return;
    let typedStrings = selectTyped.getAttribute('data-typed-items');
    if (!typedStrings) return;
    typedStrings = typedStrings.split(',');
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  // Stats: PureCounter (only when counters and library are present)
  function initStatsSection() {
    const hasCounters = !!document.querySelector('[data-purecounter]');
    const hasLib = typeof window.PureCounter !== 'undefined';
    if (!hasCounters || !hasLib) return;
    new window.PureCounter();
  }

  /**
   * Animate the skills items on reveal
   */
  // Skills: animate progress bars when revealed
  function initSkillsSection() {
    if (typeof Waypoint === 'undefined') return;
    document.querySelectorAll('.skills-animation').forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function() {
          item.querySelectorAll('.progress .progress-bar').forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });
  }

  /**
   * Initiate glightbox
   */
  // Portfolio: GLightbox
  function initPortfolioLightbox() {
    if (typeof GLightbox === 'undefined') return;
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      keyboardNavigation: true,
      onOpen: () => {
        setTimeout(() => {
          const descriptions = document.querySelectorAll('.glightbox-container .gslide-description');
          descriptions.forEach(desc => {
            desc.style.display = 'none';
            desc.style.opacity = '0';
            desc.style.visibility = 'hidden';
          });
          const images = document.querySelectorAll('.glightbox-container .gslide-media img');
          images.forEach(img => {
            img.addEventListener('click', function() {
              if (this.classList.contains('zoomed')) {
                this.classList.remove('zoomed');
                this.style.cursor = 'zoom-in';
              } else {
                this.classList.add('zoomed');
                this.style.cursor = 'zoom-out';
              }
            });
          });
        }, 100);
      },
      onClose: () => {
        // Clean up narration state when GLightbox closes
        try {
          if (window.hxNarratorPro && typeof window.hxNarratorPro.stop === 'function') {
            window.hxNarratorPro.stop();
          }
        } catch (e) {
          console.warn('Error cleaning up narration on GLightbox close:', e);
        }
      }
    });
  }

  /**
   * Init isotope layout and filters
   */
  // Portfolio: Isotope filters
  function initPortfolioIsotope() {
    if (typeof Isotope === 'undefined' || typeof imagesLoaded === 'undefined') return;
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope;
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
    });
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  // Testimonials: Swiper (ensure init called)
  function initTestimonialsSection() {
    if (typeof Swiper === 'undefined') return;
    initSwiper();
  }

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // Orchestrator: initialize sections based on presence
  function initializeSections() {
    // Global helpers
    _initializeHeaderFunctionality();
    _initializeScrollTop();
    
    // Section-specific
    if (document.getElementById('hero')) initHeroSection();
    // Safe: returns immediately if library/elements absent
    initStatsSection();
    if (document.getElementById('skills')) initSkillsSection();
    if (document.getElementById('portfolio')) {
      initPortfolioLightbox();
      initPortfolioIsotope();
    }
    if (document.getElementById('testimonials')) initTestimonialsSection();
    // Contact section presently uses vendor validate.js
  }

  window.addEventListener('DOMContentLoaded', initializeSections);

  /**
   * Initialize navigation functionality after navigation loads
   * This function can be called by template-loader.js
   */
  window.initializeNavigationFunctionality = function() {
    console.log('🔧 Initializing navigation functionality from main.js...');
    
    // Re-query navigation elements since they might not have existed when main.js first ran
    const navmenuLinks = document.querySelectorAll('#navmenu a');
    if (navmenuLinks.length > 0) {
      // Add mobile nav hide functionality
      navmenuLinks.forEach(navmenu => {
        navmenu.addEventListener('click', () => {
          if (document.querySelector('.header-show') && typeof window.hideHeaderMenu === 'function') {
            window.hideHeaderMenu();
          }
        });
      });
      
      // Update scrollspy elements
      navmenulinks = navmenuLinks;
      console.log('✅ Navigation functionality initialized from main.js');
    } else {
      console.warn('⚠️ No navigation elements found for initialization');
    }
  };

})();