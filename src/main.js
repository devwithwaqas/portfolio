import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import CSS
import './assets/css/font-sizes.css'
import './assets/css/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

// Global Animation Control System
class AnimationController {
  constructor() {
    this.isScrolling = false
    this.isMenuTransitioning = false
    this.scrollTimeout = null
    this.menuTransitionTimeout = null
    this.animationPaused = false
    
    this.init()
  }

  init() {
    this.setupScrollDetection()
    this.setupMenuTransitionDetection()
    this.setupGlobalCSS()
    this.setupDeviceDetection()
    
    // FIXED: Defer heavy DOM operations to avoid forced reflows during DOMContentLoaded
    requestAnimationFrame(() => {
      this.setupIntersectionObserver()
      this.setupDeviceDetection()
      // REMOVED: setupHoverOptimization - moved to Skills.vue
    })
  }

  setupGlobalCSS() {
    // Add global CSS for animation control
    const style = document.createElement('style')
    style.id = 'global-animation-control'
    style.textContent = `
      /* Global animation control classes */
      .animations-paused * {
        animation-play-state: paused !important;
        transition: none !important;
      }
      
      /* Keep essential animations running during pause */
      .animations-paused [data-aos] {
        animation-play-state: running !important;
      }
      
      .animations-paused .header,
      .animations-paused .navmenu,
      .animations-paused .header-toggle {
        transition: all 0.3s ease !important;
      }
      
      /* Smooth scroll behavior */
      html {
        scroll-behavior: smooth;
      }
      
      /* Performance optimization during scroll */
      .scrolling {
        pointer-events: none;
      }
      
      .scrolling * {
        pointer-events: none;
      }
    `
    document.head.appendChild(style)
  }

  setupIntersectionObserver() {
    try {
      // Ensure observer is created first
      if (!this.intersectionObserver) {
        this.intersectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            // Simple fallback logic for off-screen animations
            if (entry.target.classList.contains('cyber-container')) {
              if (!entry.isIntersecting) {
                entry.target.classList.add('off-screen')
              } else {
                entry.target.classList.remove('off-screen')
              }
            }
          })
        }, { 
          root: null, 
          rootMargin: '50px', 
          threshold: 0.1 
        })
      }
    
      // Now safely trigger the observe calls
      setTimeout(() => {
        const cyberCards = document.querySelectorAll('.cyber-container')
        cyberCards.forEach(card => {
          if (this.intersectionObserver) {
            this.intersectionObserver.observe(card)
          }
        })
      }, 1000)
    } catch (error) {
      console.warn('IntersectionObserver setup error:', error)
    }
  }

  // MOVED TO SKILLS.VUE component where it belongs - removing main.js global hover DOM manipulation
  // VUE ARCHITECTURE: Hover management should be in parent component for DOM isolation

  // placeholder to maintain compatibility if needed
  setupHoverOptimization() { /* NO-OP: Moved to Skills.vue */ }
  addOptimizedHoverListeners() { /* NO-OP: Moved to Skills.vue */ } 
  optimizeHoverStart() { /* NO-OP: Moved to Skills.vue */ }
  optimizeHoverEnd() { /* NO-OP: Moved to Skills.vue */ }

  enableCardAnimations(card) {
    // FIXED: Batch enables animation state changes to avoid forced reflow
    requestAnimationFrame(() => {
      const animatedElements = card.querySelectorAll('*')
      animatedElements.forEach(element => {
        element.style.animationPlayState = 'running'
      })
      
      // Set optimized will-change properties
      this.setOptimizedWillChange(card)
    })
  }

  disableCardAnimations(card) {
    // FIXED: Batch disables animation state changes to avoid forced reflow
    requestAnimationFrame(() => {
      const animatedElements = card.querySelectorAll('*')
      animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused'
      })
      
      // Reset will-change properties to save memory
      this.resetWillChange(card)
    })
  }

  setOptimizedWillChange(card) {
    // FIXED: Wrap all will-change modifications in requestAnimationFrame to avoid forced reflow
    requestAnimationFrame(() => {
      const trackers = card.querySelectorAll('.cyber-tracker')
      const glows = card.querySelectorAll('.cyber-glow-1, .cyber-glow-2, .cyber-glow-3')
      const particles = card.querySelectorAll('.cyber-card-particles span')
      const scanLine = card.querySelector('.cyber-scan-line')
      const lines = card.querySelectorAll('.cyber-lines span')
      const images = card.querySelectorAll('img')
      
      trackers.forEach(tracker => {
        tracker.style.willChange = 'transform'
      })
      
      glows.forEach(glow => {
        glow.style.willChange = 'opacity, transform, filter'
      })
      
      particles.forEach(particle => {
        particle.style.willChange = 'transform, opacity'
      })
      
      if (scanLine) {
        scanLine.style.willChange = 'transform'
      }
      
      lines.forEach(line => {
        line.style.willChange = 'transform'
      })
      
      images.forEach(img => {
        img.style.willChange = 'transform, filter'
      })
    })
  }

  resetWillChange(card) {
    // FIXED: Batch will-change resets to avoid forced reflow 
    requestAnimationFrame(() => {
      const allElements = card.querySelectorAll('*')
      allElements.forEach(element => {
        element.style.willChange = 'auto'
      })
    })
  }

  setupScrollDetection() {
    // Check if mobile device
    const isMobile = /Mobi|Android|iPhone|iPod/i.test(navigator.userAgent)
    
    // MOBILE: Disable aggressive animation pausing to prevent rendering issues
    if (isMobile) {
      window.addEventListener('scroll', () => {
        if (!this.isScrolling) {
          this.isScrolling = true
          requestAnimationFrame(() => {
            document.body.classList.add('scrolling')
          })
        }
        
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout)
        }
        
        this.scrollTimeout = setTimeout(() => {
          this.isScrolling = false
          requestAnimationFrame(() => {
            document.body.classList.remove('scrolling')
          })
        }, 100)
      }, { passive: true })
      return // Skip heavy animation pausing on mobile
    }
    
    // DESKTOP: Full animation pause/resume  
    window.addEventListener('scroll', () => {
      if (!this.isScrolling) {
        this.isScrolling = true
        requestAnimationFrame(() => {
          document.body.classList.add('scrolling')
          document.documentElement.classList.add('vue-scrolling')
        })
        this.pauseAnimations()
      }
      
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout)
      }
      
      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false
        requestAnimationFrame(() => {
          document.body.classList.remove('scrolling') 
          document.documentElement.classList.remove('vue-scrolling')
        })
        this.resumeAnimations()
      }, 150)
    }, { passive: true })
  }

  // REMOVED: Complex Contact pause mechanisms that were causing MORE forced reflows
  // Instead focus on light global animation control only

  setupDeviceDetection() {
    // DEBUG: Print all dimensions and device info to console
    const ua = navigator.userAgent;
    const width = screen.width;
    const height = screen.height;
    const dpr = window.devicePixelRatio || 1;
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    // DEVICE DETECTION LOGS
    // ID EMPLOY STANDARD DEVICE-RANGES TO NORMALIZE REAL PIXEL RESOLUTION
    const realWidth = width * dpr;
    const realHeight = height * dpr;
    const realInnerWidth = innerWidth * dpr;

    let deviceType;

    if (/Mobi|Android|iPhone|iPod/i.test(ua)) {
      deviceType = "Mobile Phone";
    } else if (/iPad|Tablet|PlayBook/i.test(ua) || (realWidth <= 1366 && realHeight <= 1366 && !/Mobi/i.test(ua))) {
      deviceType = "Tablet";
    } else {
      deviceType = "Desktop";
    }

    // WRAP all body.classList manipulations in RAF to prevent forced reflows
    requestAnimationFrame(() => {
      document.body.setAttribute('data-device', deviceType.toLowerCase());
      document.body.classList.add(deviceType.toLowerCase().replace(' ','-').toLowerCase());
      
      // CRITICAL FIX: Only apply tablet layout class if it's NOT an actual mobile device
      // Mobile devices should keep mobile layout regardless of width
      const isActualMobile = /Mobi|Android|iPhone|iPod/i.test(ua);
      
      // FIXED: Check WINDOW realSize for responsive breakpoints, not screen size!
      const windowRealWidth = realInnerWidth;
      
      // DEBUG: iPad Mini detection logging
      console.log('🔍 DEVICE DETECTION DEBUG:');
      console.log('Device Type:', deviceType);
      console.log('Window Real Width:', windowRealWidth);
      console.log('Screen Width:', screen.width);
      console.log('Screen Height:', screen.height);
      console.log('Is Actual Mobile:', isActualMobile);
      console.log('User Agent:', ua);
      
      if (!isActualMobile && windowRealWidth >= 768 && windowRealWidth < 1200) { 
        document.body.classList.add('devicestate-tablet');
        console.log('✅ Added devicestate-tablet class');
      }
      if (isActualMobile || windowRealWidth < 768) { 
        document.body.classList.add('devicestate-mobile');
        console.log('✅ Added devicestate-mobile class');
      }
      
      // DEBUG: Final body classes and attributes
      console.log('Final data-device:', document.body.getAttribute('data-device'));
      console.log('Final body classes:', document.body.className);

      // Inspect PROFESSIONAL STATISTICS specifically 
      setTimeout(() => {
        this.debugStatsMobileOnly();
        debugSkillsTabletOnly();
      }, 500); // Allow some rendering time
    });
  }

  debugStatsMobileOnly() {
    console.log('%c🎯 PROFESSIONAL STATISTICS + MOBILE DEBUG:', 'color: #444; background: #f8f8f8; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; font-weight: bold;');

    const statsSection = document.getElementById('stats');
    const bodyClasses = document.body.className;
    const isMobile = /mobi|android|iphone|ipod/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 767;
    
    console.log(`🔍 DEBUG Info:`);
    console.log(`Device Type: ${isMobile ? 'MOBILE' : 'DESKTOP/TABLET'}`);
    console.log(`Window Width: ${window.innerWidth}px (small=${isSmallScreen})`);
    console.log(`Body Classes: ${bodyClasses}`);
    
    if (statsSection) {
      const statsCards = statsSection.querySelectorAll('.col-lg-3, .col-md-6, .col-sm-12');
      console.log(`\n📊 Professional Statistics Found: ${statsCards.length} cards`);
      
      statsCards.forEach((card, i) => {
        const css = window.getComputedStyle(card);
        const classes = Array.from(card.classList).filter(c => c.startsWith('col-')).join(' ');
        
        console.log(`\n📱 Card ${i + 1}:`);
        console.log(`   Classes: ${card.className.replace('e-card playing', '').trim()}`);
        console.log(`   Bootstrap: ${classes}`);
        console.log(`   Flex: ${css.flex} (Basis: ${css.flexBasis})`);
        console.log(`   FlexBox: flex-basis=${css.flexBasis} & max-width=${css.maxWidth}`);
        console.log(`   Actual Width: ${card.offsetWidth}px`);
        console.log(`   Container Width: ${statsSection.offsetWidth}px`);
        
        // USAGE: Check classes for mobile responsiveness
        const isFullWidthOnMobile = classes.includes('col-sm-12') || (isSmallScreen && css.flexBasis === '100%' && css.maxWidth === '100%');
        console.log(`   Full-Width Mobile: ${isFullWidthOnMobile} ✓❌`);
      });
    } else {
      console.log('⚠️  Professional Statistics section NOT found');
    }
  }


  setupMenuTransitionDetection() {
    // Listen for menu toggle events
    const hamburgerButton = document.querySelector('.header-toggle.mobile-menu-toggle')
    const header = document.querySelector('.header')
    
    if (hamburgerButton && header) {
      hamburgerButton.addEventListener('click', () => {
        this.handleMenuTransition()
      })
      
      // Listen for clicks outside menu to close it
      document.addEventListener('click', (e) => {
        if (this.isMenuTransitioning) return
        
        const isClickInsideMenu = header.contains(e.target)
        const isClickOnHamburger = hamburgerButton.contains(e.target)
        const isMenuOpen = header.classList.contains('mobile-nav-open')
        
        if (isMenuOpen && !isClickInsideMenu && !isClickOnHamburger) {
          this.handleMenuTransition()
        }
      })
    }
  }

  handleMenuTransition() {
    if (this.isMenuTransitioning) return
    
    this.isMenuTransitioning = true
    this.pauseAnimations()
    
    // Menu transition duration (should match CSS transition duration)
    const menuTransitionDuration = 300 // 300ms
    
    this.menuTransitionTimeout = setTimeout(() => {
      this.isMenuTransitioning = false
      this.resumeAnimations()
    }, menuTransitionDuration)
  }

  pauseAnimations() {
    if (this.animationPaused) return
    
    this.animationPaused = true
    // VUE: Use requestAnimationFrame to prevent forced reflows
    requestAnimationFrame(() => {
      document.body.classList.add('animations-paused')
      document.documentElement.classList.add('vue-paused')
    })
    
    // Pause specific animations - use RAF for DOM ops
    this.pauseCSSAnimations()
    this.pauseJSAnimations()
  }

  resumeAnimations() {
    if (!this.animationPaused) return
    
    this.animationPaused = false
    // VUE: Use requestAnimationFrame to prevent forced reflows
    requestAnimationFrame(() => {
      document.body.classList.remove('animations-paused')
      document.documentElement.classList.remove('vue-paused')
    })
    
    // Resume specific animations - use RAF for DOM ops 
    this.resumeCSSAnimations()
    this.resumeJSAnimations()
  }

  pauseCSSAnimations() {
    // VUE: Add CSS class to pause animations with RAF to prevent forced reflows
    requestAnimationFrame(() => {
      const style = document.createElement('style')
      style.id = 'animation-pause-override'
      style.textContent = `
        .animations-paused *, 
        .vue-paused * {
          animation-play-state: paused !important;
          transition: none !important;
        }
        
        /* Keep scroll-triggered animations running */
        .animations-paused [data-aos],
        .vue-paused [data-aos] {
          animation-play-state: running !important;
        }
        
        /* Keep menu transition animations running */
        .animations-paused .header,
        .animations-paused .navmenu,
        .animations-paused .header-toggle,
        .vue-paused .header,
        .vue-paused .navmenu,
        .vue-paused .header-toggle {
          transition: all 0.3s ease !important;
        }
      `
      document.head.appendChild(style)
    })
  }

  resumeCSSAnimations() {
    // VUE: Use RAF to prevent forced reflows on style removal
    requestAnimationFrame(() => {
      const style = document.getElementById('animation-pause-override')
      if (style) {
        style.remove()
      }
    })
  }

  pauseJSAnimations() {
    // VUE: Wrap all style changes in RAF to avoid forced reflows
    requestAnimationFrame(() => {
      // Pause Swiper autoplay
      const swipers = document.querySelectorAll('.swiper')
      swipers.forEach(swiper => {
        if (swiper.swiper && swiper.swiper.autoplay) {
          swiper.swiper.autoplay.pause()
        }
      })
      
      // Pause Typed.js animations
      const typedElements = document.querySelectorAll('.typed')
      typedElements.forEach(typed => {
        if (typed.typed) {
          typed.typed.stop()
        }
      })
      
      // Pause SVG border animations
      const borderAnimations = document.querySelectorAll('.border-overlay')
      borderAnimations.forEach(border => {
        border.style.animationPlayState = 'paused'
      })
      
      // Pause floating shapes and other CSS animations
      const floatingShapes = document.querySelectorAll('.floating-shapes .shape')
      floatingShapes.forEach(shape => {
        shape.style.animationPlayState = 'paused'
      })
      
      // Pause profile glow animations
      const profileGlows = document.querySelectorAll('.profile-glow, .profile-ring')
      profileGlows.forEach(glow => {
        glow.style.animationPlayState = 'paused'
      })
      
      // Pause scroll indicator animations
      const scrollIndicators = document.querySelectorAll('.scroll-indicator, .scroll-arrow')
      scrollIndicators.forEach(indicator => {
        indicator.style.animationPlayState = 'paused'
      })
      
      // Pause tech stack icon animations
      const techIcons = document.querySelectorAll('.tech-stack-icon')
      techIcons.forEach(icon => {
        icon.style.animationPlayState = 'paused'
      })
      
      // Pause Skills section complex animations for better scroll performance
      this.pauseSkillsAnimations()
    })
  }

  resumeJSAnimations() {
    // VUE: Wrap all style changes in RAF to avoid forced reflows
    requestAnimationFrame(() => {
      // Resume Swiper autoplay
      const swipers = document.querySelectorAll('.swiper')
      swipers.forEach(swiper => {
        if (swiper.swiper && swiper.swiper.autoplay) {
          swiper.swiper.autoplay.resume()
        }
      })
      
      // Resume Typed.js animations
      const typedElements = document.querySelectorAll('.typed')
      typedElements.forEach(typed => {
        if (typed.typed) {
          typed.typed.start()
        }
      })
      
      // Resume SVG border animations
      const borderAnimations = document.querySelectorAll('.border-overlay')
      borderAnimations.forEach(border => {
        border.style.animationPlayState = 'running'
      })
      
      // Resume floating shapes and other CSS animations
      const floatingShapes = document.querySelectorAll('.floating-shapes .shape')
      floatingShapes.forEach(shape => {
        shape.style.animationPlayState = 'running'
      })
      
      // Resume profile glow animations
      const profileGlows = document.querySelectorAll('.profile-glow, .profile-ring')
      profileGlows.forEach(glow => {
        glow.style.animationPlayState = 'running'
      })
      
      // Resume scroll indicator animations
      const scrollIndicators = document.querySelectorAll('.scroll-indicator, .scroll-arrow')
      scrollIndicators.forEach(indicator => {
        indicator.style.animationPlayState = 'running'
      })
      
      // Resume tech stack icon animations
      const techIcons = document.querySelectorAll('.tech-stack-icon')
      techIcons.forEach(icon => {
        icon.style.animationPlayState = 'running'
      })
      
      // Resume Skills section animations
      this.resumeSkillsAnimations()
    })
  }

  pauseSkillsAnimations() {
    // VUE: Use RAF for all DOM manipulations to prevent forced reflows
    requestAnimationFrame(() => {
      // Pause all cyber card animations
      const cyberCards = document.querySelectorAll('.cyber-container')
      cyberCards.forEach(card => {
        // Pause all animations within each card
        const animatedElements = card.querySelectorAll('*')
        animatedElements.forEach(element => {
          element.style.animationPlayState = 'paused'
          element.style.transition = 'none'
        })
        
        // Disable expensive hover effects during scroll
        card.style.pointerEvents = 'none'
      })
      
      // Pause specific expensive animations
      const expensiveElements = document.querySelectorAll(`
        .cyber-tracker,
        .cyber-glow-1,
        .cyber-glow-2, 
        .cyber-glow-3,
        .cyber-card-particles,
        .cyber-scan-line,
        .cyber-lines,
        .cyber-shimmer
      `)
      expensiveElements.forEach(element => {
        element.style.animationPlayState = 'paused'
        element.style.willChange = 'auto' // Reset will-change for performance
      })
    })
  }

  resumeSkillsAnimations() {
    // VUE: Use RAF for all DOM manipulations to prevent forced reflows
    requestAnimationFrame(() => {
      // Resume all cyber card animations
      const cyberCards = document.querySelectorAll('.cyber-container')
      cyberCards.forEach(card => {
        // Resume all animations within each card
        const animatedElements = card.querySelectorAll('*')
        animatedElements.forEach(element => {
          element.style.animationPlayState = 'running'
          element.style.transition = '' // Reset to default
        })
        
        // Re-enable hover effects
        card.style.pointerEvents = 'auto'
      })
      
      // Resume specific expensive animations with optimized will-change
      const expensiveElements = document.querySelectorAll(`
        .cyber-tracker,
        .cyber-glow-1,
        .cyber-glow-2, 
        .cyber-glow-3,
        .cyber-card-particles,
        .cyber-scan-line,
        .cyber-lines,
        .cyber-shimmer
      `)
      expensiveElements.forEach(element => {
        element.style.animationPlayState = 'running'
        element.style.willChange = 'transform, opacity, filter' // Optimize for GPU
      })
    })
  }
}

// Initialize vendor libraries after Vue app is mounted
document.addEventListener('DOMContentLoaded', function() {
  // FIXED: Use requestAnimationFrame to avoid blocking DOMContentLoaded
  requestAnimationFrame(() => {
    // Initialize Global Animation Controller
    window.animationController = new AnimationController()
    
    // LIGHT AOS: Use minimal global AOS for page transitions since managed by components
    if (typeof AOS !== 'undefined') {
      requestAnimationFrame(() => {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        })
      })
    }

    // VUE INTERGATION: These are handled by individual Vue components:
    // Stats.vue: handles PureCounter animations internally with Vue reactive counters
    // Portfolio.vue: handles GLightbox in initGLightbox()
    // Testimonials already uses CustomSlider.vue (properly integrated)
    // Contact.vue: IntersectionObserver already integrated 
  })

  // VUE INTEGRATION COMPLETED: All external libraries moved to their appropriate Vue component
  // NOTE: Removed global Swiper and Isotope initializations - now handled properly by Vue
  // Testimonials: uses CustomSlider.vue (Vue-based)
  // Portfolio: image gallery logic can be built into Portfolio.vue if needed  
  // AOS animations: remains global since used across components for page animations
})

// Debug function for Skills section
function debugSkillsTabletOnly() {
  console.log('%c⚡ SKILLS SECTION + TABLET DEBUG:', 'color: #444; background: #f8f8f8; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; font-weight: bold;');

  const skillsSection = document.getElementById('skills');
  const bodyClasses = document.body.className;
  const dataDevice = document.body.getAttribute('data-device');
  const isTablet = bodyClasses.includes('devicestate-tablet') || dataDevice === 'tablet';
  const windowWidth = window.innerWidth;
  
  console.log(`🔍 SKILLS DEBUG Info:`);
  console.log(`Window Width: ${windowWidth}px`);
  console.log(`Data Device: ${dataDevice}`);
  console.log(`Body Classes: ${bodyClasses}`);
  console.log(`Is Tablet: ${isTablet}`);
  
  if (skillsSection) {
    const skillsCards = skillsSection.querySelectorAll('.col-lg-3, .col-md-4, .col-sm-6');
    console.log(`\n⚡ Skills Found: ${skillsCards.length} cards`);
    
    skillsCards.forEach((card, i) => {
      const css = window.getComputedStyle(card);
      const classes = Array.from(card.classList).filter(c => c.startsWith('col-')).join(' ');
      const flexBasis = css.flexBasis;
      const maxWidth = css.maxWidth;
      const width = css.width;
      
      console.log(`Card ${i+1}: ${classes}`);
      console.log(`  Flex Basis: ${flexBasis}`);
      console.log(`  Max Width: ${maxWidth}`);
      console.log(`  Width: ${width}`);
      
      // Check if iPad Mini override should apply
      if (windowWidth >= 768 && windowWidth <= 1024 && isTablet) {
        console.log(`  🎯 iPad Mini Range (768-1024px) + Tablet detected`);
        console.log(`  Expected: flex-basis: 33.333% (3 cards per row)`);
        if (flexBasis.includes('33.333%')) {
          console.log(`  ✅ Override applied correctly`);
        } else {
          console.log(`  ❌ Override NOT applied - flex-basis is ${flexBasis}`);
        }
      }
    });
  } else {
    console.log('❌ Skills section not found');
  }
}