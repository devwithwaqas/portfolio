<template>
  <!-- Mobile Hamburger Menu - OUTSIDE Header to avoid positioning inheritance -->
  <i class="header-toggle mobile-menu-toggle bi bi-list" @click="toggleMobileMenu"></i>
  
  <header id="header" class="header" :class="{ 'header-show': mobileMenuOpen }">

    <nav id="navmenu" class="navmenu">
      <div class="nav-header">
        <div class="logo-section">
        <div class="futuristic-logo">
          <div class="logo-simple">
            <div class="logo-icon">🎯</div>
          </div>
        </div>
        </div>
      </div>

      <ul>
        <li><a href="#hero" class="nav-link" :class="{ active: activeSection === 'hero' }"
            @click="scrollToSection('hero', $event)">
            <div class="icon-wrapper home-icon">
              <i class="fas fa-house navicon"></i>
            </div>
            <span>Home</span>
            <div class="active-indicator" v-if="activeSection === 'hero'"></div>
          </a></li>
        <li><a href="#about" class="nav-link" :class="{ active: activeSection === 'about' }"
            @click="scrollToSection('about', $event)">
            <div class="icon-wrapper about-icon">
              <i class="fas fa-user-circle navicon"></i>
            </div>
            <span>About</span>
            <div class="active-indicator" v-if="activeSection === 'about'"></div>
          </a></li>
        <li><a href="#resume" class="nav-link" :class="{ active: activeSection === 'resume' }"
            @click="scrollToSection('resume', $event)">
            <div class="icon-wrapper resume-icon">
              <i class="fas fa-file-lines navicon"></i>
            </div>
            <span>Resume</span>
            <div class="active-indicator" v-if="activeSection === 'resume'"></div>
          </a></li>
        <li><a href="#portfolio" class="nav-link" :class="{ active: activeSection === 'portfolio' }"
            @click="scrollToSection('portfolio', $event)">
            <div class="icon-wrapper portfolio-icon">
              <i class="fas fa-briefcase navicon"></i>
            </div>
            <span>Portfolio</span>
            <div class="active-indicator" v-if="activeSection === 'portfolio'"></div>
          </a></li>
        <li><a href="#services" class="nav-link" :class="{ active: activeSection === 'services' }"
            @click="scrollToSection('services', $event)">
            <div class="icon-wrapper services-icon">
              <i class="fas fa-gear navicon"></i>
            </div>
            <span>Services</span>
            <div class="active-indicator" v-if="activeSection === 'services'"></div>
          </a></li>
        <li><a href="#contact" class="nav-link" :class="{ active: activeSection === 'contact' }"
            @click="scrollToSection('contact', $event)">
            <div class="icon-wrapper contact-icon">
              <i class="fas fa-paper-plane navicon"></i>
            </div>
            <span>Contact</span>
            <div class="active-indicator" v-if="activeSection === 'contact'"></div>
          </a></li>
      </ul>

      <div class="nav-footer">
        <div class="theme-toggle">
          <i class="fas fa-moon"></i>
          <span>Dark Theme</span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { APP_CONFIG, COMPONENT_DEFAULTS } from '../config/constants.js'

export default {
  name: 'Navigation',
  data() {
    return {
      // VUE PROPER: Import constants from centralized config
      ...APP_CONFIG,
      navSections: COMPONENT_DEFAULTS.navigation.sections,
      mobileMenuOpen: false,
      activeSection: 'hero',
      // Swipe gesture tracking
      touchStartX: 0,
      touchStartY: 0,
      touchEndX: 0,
      touchEndY: 0,
      minSwipeDistance: 50,
    }
  },
  mounted() {
    this.setupScrollSpy()
    this.setupIntersectionObserver()
    this.setupClickOutsideListener()
    this.setupSwipeGestures()
    this.setupViewportResizeListener()
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener('scroll', this.updateActiveSection)
    document.removeEventListener('click', this.handleClickOutside)
    document.removeEventListener('touchstart', this.handleTouchStart)
    document.removeEventListener('touchend', this.handleTouchEnd)
    document.removeEventListener('touchmove', this.handleTouchMove)
    window.removeEventListener('resize', this.debouncedResizeHandler)
    window.removeEventListener('orientationchange', this.adjustButtonHeights)
  },
  watch: {
    activeSection(newSection, oldSection) {
      if (newSection !== oldSection) {
        this.$nextTick(() => {
          this.$forceUpdate()
        })
      }
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    scrollToSection(sectionId, event) {
      event.preventDefault()
      this.closeMobileMenu()
      
      if (this.$route.path === '/') {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        this.$router.push({ path: '/', hash: `#${sectionId}` })
      }
    },
    setupScrollSpy() {
      window.addEventListener('scroll', this.updateActiveSection)
    },
    setupIntersectionObserver() {
      const sections = ['hero', 'about', 'resume', 'portfolio', 'services', 'contact']
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            if (sections.includes(sectionId)) {
              this.activeSection = sectionId
              this.$nextTick(() => {
                this.$forceUpdate()
              })
            }
          }
        })
      }, {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      })
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.observe(element)
        }
      })
    },
    updateActiveSection() {
      const sections = ['hero', 'about', 'resume', 'portfolio', 'services', 'contact']
      const scrollPosition = window.scrollY + 100
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          const newActiveSection = sections[i]
          if (this.activeSection !== newActiveSection) {
            this.activeSection = newActiveSection
          this.$nextTick(() => {
            this.$forceUpdate()
          })
          }
          break
        }
      }
    },
    
    // Click outside to close menu
    setupClickOutsideListener() {
      document.addEventListener('click', this.handleClickOutside)
    },
    
    handleClickOutside(event) {
      // Only handle if menu is open and we're in mobile/tablet view
      if (!this.mobileMenuOpen) return
      
      const header = document.getElementById('header')
      const hamburger = document.querySelector('.header-toggle.mobile-menu-toggle')
      
      // Check if click is outside the menu and hamburger button
      if (header && hamburger && 
          !header.contains(event.target) && 
          !hamburger.contains(event.target)) {
        this.closeMobileMenu()
      }
    },
    
    // Swipe gesture handling
    setupSwipeGestures() {
      document.addEventListener('touchstart', this.handleTouchStart, { passive: false })
      document.addEventListener('touchend', this.handleTouchEnd, { passive: false })
      // Prevent browser's default swipe gestures
      document.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    },


    // Optimized button height adjustment - reduced DOM manipulation
    adjustButtonHeights() {
      // Use requestAnimationFrame to batch DOM updates and avoid layout thrashing
      requestAnimationFrame(() => {
        const navMenu = document.querySelector('.navmenu ul')
        const header = document.querySelector('.header')
        
        if (!navMenu || !header) return

        // Batch all DOM reads first to avoid layout thrashing
        const viewportWidth = window.innerWidth
        const isMobile = viewportWidth <= 767
        
        // Use cached values when possible to avoid repeated calculations
        const buttonCount = 6
        const minButtonHeight = isMobile ? 50 : 40
        const minGap = 8
        
        // Calculate dimensions without triggering layout
        let finalContainerHeight
        if (isMobile) {
          // For mobile, use a calculated height instead of measuring DOM
          finalContainerHeight = (buttonCount * minButtonHeight) + ((buttonCount - 1) * minGap)
        } else {
          // For desktop, use CSS classes instead of inline styles
          navMenu.classList.add('desktop-nav')
          navMenu.classList.remove('mobile-nav')
          return // Exit early for desktop to avoid unnecessary DOM manipulation
        }
        
        // Only proceed with mobile optimization
        if (isMobile) {
          navMenu.classList.add('mobile-nav')
          navMenu.classList.remove('desktop-nav')
          
          // Calculate button dimensions
          const topBottomPadding = Math.floor(finalContainerHeight * 0.1)
          const availableHeight = finalContainerHeight - (topBottomPadding * 2)
          const finalButtonHeight = Math.floor(availableHeight * 0.8 / buttonCount)
          
          // Calculate final values
          const glowBuffer = 2
          const actualButtonHeight = finalButtonHeight - glowBuffer
          const iconPercentage = 0.6
          const iconSize = Math.floor(actualButtonHeight * iconPercentage * 0.8)
          const wrapperSize = Math.floor(iconSize * 1.2)
          const padding = Math.max(2, Math.floor((actualButtonHeight - iconSize - 4 - 3) / 2))
          
          // FIXED: Batch all style modifications to avoid forced reflow
          requestAnimationFrame(() => {
            // Set CSS custom properties (more efficient than inline styles)
            header.style.setProperty('--nav-button-padding', `${padding}px 20px`, 'important')
            header.style.setProperty('--nav-icon-size', `${iconSize}px`, 'important')
            header.style.setProperty('--nav-icon-wrapper-size', `${wrapperSize}px`, 'important')
            header.style.setProperty('--nav-button-height', `${actualButtonHeight}px`, 'important')
            
            // Set container height
            navMenu.style.height = `${finalContainerHeight}px`
            navMenu.style.minHeight = `${finalContainerHeight}px`
          })
        }
      })
    },

        // Setup viewport resize listener - optimized for performance
        setupViewportResizeListener() {
          // FIXED: Defer initial adjustment to avoid forced reflows during mounting
          requestAnimationFrame(() => {
            this.adjustButtonHeights()
          })
          
          // Create debounced resize handler with longer delay to reduce calls
          this.debouncedResizeHandler = this.debounce(() => {
            // Use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
              this.adjustButtonHeights()
            })
          }, 300) // Increased debounce time from 150ms to 300ms
          
          // Listen for viewport changes
          window.addEventListener('resize', this.debouncedResizeHandler)
          
          // Listen for orientation changes on mobile with debouncing
          let orientationTimeout
          window.addEventListener('orientationchange', () => {
            clearTimeout(orientationTimeout)
            orientationTimeout = setTimeout(() => {
              this.adjustButtonHeights()
            }, 200) // Increased delay
          })
          
          // Listen for media query changes (desktop/mobile breakpoint) with debouncing
          if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(max-width: 767px)')
            let mediaTimeout
            mediaQuery.addListener(() => {
              clearTimeout(mediaTimeout)
              mediaTimeout = setTimeout(() => {
                this.adjustButtonHeights()
              }, 100) // Increased delay
            })
          }
        },

    // Debounce utility function
    debounce(func, wait) {
      let timeout
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout)
          func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    },
    
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX
      this.touchStartY = event.touches[0].clientY
      
      // If touch starts near the left edge, prevent default browser behavior
      if (this.touchStartX < 50) {
        event.preventDefault()
      }
    },
    
    handleTouchMove(event) {
      // Prevent browser's default swipe gestures when we're handling our own
      if (this.touchStartX < 50) {
        event.preventDefault()
      }
    },
    
    handleTouchEnd(event) {
      this.touchEndX = event.changedTouches[0].clientX
      this.touchEndY = event.changedTouches[0].clientY
      
      // Prevent default browser behavior if we're handling the swipe
      if (this.touchStartX < 50) {
        event.preventDefault()
      }
      
      this.handleSwipe()
    },
    
    handleSwipe() {
      const deltaX = this.touchEndX - this.touchStartX
      const deltaY = this.touchEndY - this.touchStartY
      
      // Check if it's a horizontal swipe (not vertical scroll)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
        
        // Swipe from left edge to right (open menu)
        if (deltaX > 0 && this.touchStartX < 50 && !this.mobileMenuOpen) {
          this.mobileMenuOpen = true
          // Prevent any browser navigation
          return false
        }
        
        // Swipe from right to left (close menu)
        else if (deltaX < 0 && this.mobileMenuOpen) {
          this.closeMobileMenu()
          // Prevent any browser navigation
          return false
        }
      }
      
      // If we handled the swipe, prevent default browser behavior
      if (Math.abs(deltaX) > this.minSwipeDistance) {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* ===== COMPACT GLASSMORPHISM NAVIGATION ===== */

// Navigation width is now automatically calculated using CSS custom properties
// No manual updates needed - change --nav-fraction in main.css to update the entire layout

/* Desktop Navigation - Simple fixed positioning */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: calc(100vw * var(--nav-fraction) / var(--total-fraction));
    z-index: 9999;
    background: 
      linear-gradient(135deg, rgba(60, 20, 120, 0.6) 0%, rgba(50, 15, 100, 0.65) 50%, rgba(40, 10, 80, 0.7) 100%),
      radial-gradient(circle at 20% 20%, rgba(80, 30, 140, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(90, 35, 150, 0.12) 0%, transparent 50%);
    backdrop-filter: blur(40px) saturate(130%) brightness(0.85);
    -webkit-backdrop-filter: blur(40px) saturate(130%) brightness(0.85);
    z-index: 997;
    padding: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.05), 
      0 12px 40px rgba(0, 0, 0, 0.3), 
      inset 0 1px 0 rgba(255, 255, 255, 0.1), 
      inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  }

  .navmenu {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px 0;
  }

  .nav-header {
    padding: 2px 20px 6px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    margin-bottom: 6px;
  }

  .logo-section {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .logo-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: 
      0 0 0 3px rgba(102, 126, 234, 0.8), 
      0 0 20px rgba(102, 126, 234, 0.6), 
      0 0 40px rgba(118, 75, 162, 0.4), 
      0 0 60px rgba(255, 107, 107, 0.3), 
      inset 0 0 20px rgba(255, 255, 255, 0.1);
    overflow: hidden;
    border: 2px solid rgba(102, 126, 234, 0.9);
    background: 
      linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 30%, rgba(255, 107, 107, 0.1) 60%, rgba(0, 184, 148, 0.05) 100%),
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 60%),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .logo-icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%),
      radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 60%);
    border-radius: 25px;
    z-index: 1;
    transition: all 0.4s ease;
  }

  .logo-icon::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg,
        rgba(102, 126, 234, 0.7) 0%,
        rgba(118, 75, 162, 0.7) 20%,
        rgba(255, 107, 107, 0.7) 40%,
        rgba(0, 184, 148, 0.7) 60%,
        rgba(253, 203, 110, 0.7) 80%,
        rgba(102, 126, 234, 0.7) 100%);
    border-radius: 33px;
    z-index: -1;
    opacity: 0;
    transition: all 0.4s ease;
    animation: rotate 3s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .logo-icon:hover {
    transform: scale(1.15) rotate(5deg);
    box-shadow: 
      0 0 0 4px rgba(102, 126, 234, 1), 
      0 0 30px rgba(102, 126, 234, 0.8), 
      0 0 60px rgba(118, 75, 162, 0.6), 
      0 0 90px rgba(255, 107, 107, 0.5), 
      0 0 120px rgba(0, 184, 148, 0.4), 
      inset 0 0 30px rgba(255, 255, 255, 0.2);
  }

  .logo-icon:hover::after {
    opacity: 1;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    border-radius: 50%;
    position: relative;
    z-index: 2;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: 
      drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) 
      drop-shadow(0 0 20px rgba(255, 255, 255, 0.4)) 
      drop-shadow(0 0 40px rgba(102, 126, 234, 0.3)) 
      drop-shadow(0 0 60px rgba(118, 75, 162, 0.2));
  }

  .logo-icon:hover .profile-image {
    transform: scale(1.05) rotate(2deg);
    filter: 
      drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4)) 
      drop-shadow(0 0 25px rgba(255, 255, 255, 0.6)) 
      drop-shadow(0 0 50px rgba(102, 126, 234, 0.5)) 
      drop-shadow(0 0 75px rgba(118, 75, 162, 0.4)) 
      drop-shadow(0 0 100px rgba(255, 107, 107, 0.3));
  }

  .logo-text {
    color: #9966ff;
    /* Font size handled by font-sizes.css */
    font-weight: 600;
    text-shadow: 
      0 0 10px #9966ff,
      0 0 20px rgba(153, 102, 255, 0.8),
      0 0 30px rgba(153, 102, 255, 0.6);
  }


  .navmenu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--nav-gap, 4px);
    overflow: hidden;
  }

  .navmenu a {
    display: flex;
    align-items: center;
    padding: var(--nav-button-padding, 0px 20px);
    height: var(--nav-button-height, auto) !important;
    min-height: var(--nav-button-height, auto) !important;
    max-height: var(--nav-button-height, auto) !important;
    overflow: hidden;
    justify-content: center;
    text-align: center;
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    font-weight: 500;
    background: transparent;
    border: 2px solid transparent;
    margin: 4px 8px;
    overflow: hidden;
    backdrop-filter: blur(20px);
  }

  .navmenu a::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(0, 255, 255, 0.1) 0%, 
      rgba(255, 0, 255, 0.1) 25%, 
      rgba(0, 255, 0, 0.1) 50%, 
      rgba(255, 255, 0, 0.1) 75%, 
      rgba(0, 255, 255, 0.1) 100%);
    background-size: 400% 400%;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: -1;
    animation: cyberpunkFlow 4s ease-in-out infinite;
  }

  .navmenu a::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  .navmenu a:hover::before {
    opacity: 1;
  }

  .navmenu a:hover::after {
    width: 200px;
    height: 200px;
  }

  .navmenu a:hover {
    color: #00ffff;
    transform: translateY(-2px);
    border-color: #00ffff;
    box-shadow: 
      0 0 20px rgba(0, 255, 255, 0.5),
      0 0 40px rgba(0, 255, 255, 0.3),
      inset 0 0 20px rgba(0, 255, 255, 0.1);
  }

  /* Cyberpunk color variations for each button */
  .navmenu li:nth-child(1) a:hover {
    color: #ff80ff;
    border-color: #ff80ff;
    box-shadow: 
      0 0 20px rgba(255, 128, 255, 0.9),
      0 0 40px rgba(255, 128, 255, 0.7),
      inset 0 0 20px rgba(255, 128, 255, 0.3);
  }

  .navmenu li:nth-child(2) a:hover {
    color: #80ff80;
    border-color: #80ff80;
    box-shadow: 
      0 0 20px rgba(128, 255, 128, 0.9),
      0 0 40px rgba(128, 255, 128, 0.7),
      inset 0 0 20px rgba(128, 255, 128, 0.3);
  }

  .navmenu li:nth-child(3) a:hover {
    color: #80bfff;
    border-color: #80bfff;
    box-shadow: 
      0 0 20px rgba(128, 191, 255, 0.9),
      0 0 40px rgba(128, 191, 255, 0.7),
      inset 0 0 20px rgba(128, 191, 255, 0.3);
  }

  .navmenu li:nth-child(4) a:hover {
    color: #80ffff;
    border-color: #80ffff;
    box-shadow: 0 0 20px rgba(128, 255, 255, 0.9), 0 0 40px rgba(128, 255, 255, 0.7), inset 0 0 20px rgba(128, 255, 255, 0.3);
  }

  .navmenu li:nth-child(5) a:hover {
    color: #ffcc80;
    border-color: #ffcc80;
    box-shadow: 
      0 0 20px rgba(255, 204, 128, 0.9),
      0 0 40px rgba(255, 204, 128, 0.7),
      inset 0 0 20px rgba(255, 204, 128, 0.3);
  }

  .navmenu li:nth-child(6) a:hover {
    color: #ff80ff;
    border-color: #ff80ff;
    box-shadow: 
      0 0 20px rgba(255, 128, 255, 0.9),
      0 0 40px rgba(255, 128, 255, 0.7),
      inset 0 0 20px rgba(255, 128, 255, 0.3);
  }

  .navmenu a.active {
    color: #00ffff;
    background: linear-gradient(135deg, 
      rgba(0, 255, 255, 0.1) 0%, 
      rgba(255, 0, 255, 0.1) 50%,
      rgba(0, 255, 255, 0.1) 100%);
    border: 2px solid #00ffff;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 0 15px rgba(0, 255, 255, 0.8),
      0 0 25px rgba(0, 255, 255, 0.6),
      inset 0 0 15px rgba(0, 255, 255, 0.2);
    backdrop-filter: blur(30px);
    position: relative;
    overflow: hidden;
    animation: cyberpunkPulse 2s ease-in-out infinite;
  }

  .navmenu a.active::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.1) 50%, 
      transparent 100%);
    animation: shimmer 2s ease-in-out infinite;
  }

  .navmenu a.active::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(102, 126, 234, 0.1) 0%, 
      rgba(118, 75, 162, 0.1) 25%, 
      rgba(255, 107, 107, 0.1) 50%, 
      rgba(0, 184, 148, 0.1) 75%, 
      rgba(102, 126, 234, 0.1) 100%);
    background-size: 400% 400%;
    animation: gradientShift 4s ease infinite;
    opacity: 0.6;
    z-index: -1;
  }

  /* Compact Colorful Icon Wrappers */
  .icon-wrapper {
    width: var(--nav-icon-wrapper-size, 24px);
    height: var(--nav-icon-wrapper-size, 24px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    border-radius: 8px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .navmenu a:hover .icon-wrapper {
    transform: scale(1.1) rotate(5deg);
    filter: brightness(1.2) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
    animation: iconPulse 2s ease-in-out infinite;
  }

  .icon-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .navmenu a:hover .icon-wrapper::before {
    opacity: 1;
  }

  .navmenu a.active .icon-wrapper::before {
    opacity: 0;
  }

  /* Individual active button colors matching hover */
  .navmenu li:nth-child(1) a.active {
    color: #ff80ff !important;
    background: linear-gradient(135deg, 
      rgba(255, 128, 255, 0.1) 0%, 
      rgba(255, 128, 255, 0.1) 50%,
      rgba(255, 128, 255, 0.1) 100%) !important;
    border: 2px solid #ff80ff !important;
    animation: cyberpunkPulsePink 2s ease-in-out infinite !important;
  }

  .navmenu li:nth-child(2) a.active {
    color: #80ff80 !important;
    background: linear-gradient(135deg, 
      rgba(128, 255, 128, 0.1) 0%, 
      rgba(128, 255, 128, 0.1) 50%,
      rgba(128, 255, 128, 0.1) 100%) !important;
    border: 2px solid #80ff80 !important;
    animation: cyberpunkPulseGreen 2s ease-in-out infinite !important;
  }

  .navmenu li:nth-child(3) a.active {
    color: #80bfff !important;
    background: linear-gradient(135deg, 
      rgba(128, 191, 255, 0.1) 0%, 
      rgba(128, 191, 255, 0.1) 50%,
      rgba(128, 191, 255, 0.1) 100%) !important;
    border: 2px solid #80bfff !important;
    animation: cyberpunkPulseBlue 2s ease-in-out infinite !important;
  }

  .navmenu li:nth-child(4) a.active {
    color: #80ffff !important;
    background: linear-gradient(135deg, 
      rgba(128, 255, 255, 0.1) 0%, 
      rgba(128, 255, 255, 0.1) 50%,
      rgba(128, 255, 255, 0.1) 100%) !important;
    border: 2px solid #80ffff !important;
    animation: cyberpunkPulseCyan 2s ease-in-out infinite !important;
  }

  .navmenu li:nth-child(5) a.active {
    color: #ffcc80 !important;
    background: linear-gradient(135deg, 
      rgba(255, 204, 128, 0.1) 0%, 
      rgba(255, 204, 128, 0.1) 50%,
      rgba(255, 204, 128, 0.1) 100%) !important;
    border: 2px solid #ffcc80 !important;
    animation: cyberpunkPulseOrange 2s ease-in-out infinite !important;
  }

  .navmenu li:nth-child(6) a.active {
    color: #ff80ff !important;
    background: linear-gradient(135deg, 
      rgba(255, 128, 255, 0.1) 0%, 
      rgba(255, 128, 255, 0.1) 50%,
      rgba(255, 128, 255, 0.1) 100%) !important;
    border: 2px solid #ff80ff !important;
    animation: cyberpunkPulsePink 2s ease-in-out infinite !important;
  }

  /* Home - Orange Gradient */
  .home-icon {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    box-shadow: 0 3px 12px rgba(255, 107, 107, 0.25);
  }

  .navmenu a:hover .home-icon {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 4px 16px rgba(255, 107, 107, 0.35);
  }

  .navmenu a.active .home-icon {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    box-shadow: 0 4px 16px rgba(255, 107, 107, 0.4);
    transform: scale(1.05);
  }

  /* About - Green Gradient */
  .about-icon {
    background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
    box-shadow: 0 3px 12px rgba(0, 184, 148, 0.25);
  }

  .navmenu a:hover .about-icon {
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 4px 16px rgba(0, 184, 148, 0.35);
  }

  .navmenu a.active .about-icon {
    background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
    box-shadow: 0 4px 16px rgba(0, 184, 148, 0.4);
    transform: scale(1.05);
  }

  /* Resume - Blue Gradient */
  .resume-icon {
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    box-shadow: 0 3px 12px rgba(116, 185, 255, 0.25);
  }

  .navmenu a:hover .resume-icon {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 4px 16px rgba(116, 185, 255, 0.35);
  }

  .navmenu a.active .resume-icon {
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    box-shadow: 0 4px 16px rgba(116, 185, 255, 0.4);
    transform: scale(1.05);
  }

  /* Portfolio - Cyberpunk Electric Blue */
  .portfolio-icon {
    background: linear-gradient(135deg, #0080ff 0%, #00bfff 100%);
    box-shadow: 0 3px 12px rgba(0, 128, 255, 0.25);
  }

  .navmenu a:hover .portfolio-icon {
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 4px 16px rgba(0, 128, 255, 0.35);
  }

  .navmenu a.active .portfolio-icon {
    background: linear-gradient(135deg, #0080ff 0%, #00bfff 100%);
    box-shadow: 0 4px 16px rgba(0, 128, 255, 0.4);
    transform: scale(1.05);
  }

  /* Services - Yellow Gradient */
  .services-icon {
    background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
    box-shadow: 0 3px 12px rgba(253, 203, 110, 0.25);
  }

  .navmenu a:hover .services-icon {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 4px 16px rgba(253, 203, 110, 0.35);
  }

  .navmenu a.active .services-icon {
    background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
    box-shadow: 0 4px 16px rgba(253, 203, 110, 0.4);
    transform: scale(1.05);
  }

  /* Contact - Pink Gradient */
  .contact-icon {
    background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
    box-shadow: 0 3px 12px rgba(253, 121, 168, 0.25);
  }

  .navmenu a:hover .contact-icon {
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 4px 16px rgba(253, 121, 168, 0.35);
  }

  .navmenu a.active .contact-icon {
    background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
    box-shadow: 0 4px 16px rgba(253, 121, 168, 0.4);
    transform: scale(1.05);
  }

  .navicon {
    /* Font size handled by font-sizes.css */
    color: white;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active-indicator {
    width: 4px;
    height: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
    margin-left: auto;
    box-shadow: 0 0 8px rgba(102, 126, 234, 0.5);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {

    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.6;
    }
  }

  .nav-footer {
    padding: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    margin-top: auto;
  }


  .theme-toggle {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.7);
    /* Font size handled by font-sizes.css */
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.06);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .theme-toggle i {
    margin-right: 6px;
    /* Font size handled by font-sizes.css */
  }

  /* Hide hamburger on desktop - handled by main.css */
}

/* Mobile Navigation */
@media (pointer: coarse) or (max-width: 1199px) {
  /* Hamburger menu styling handled by main.css */
  .header {
    position: fixed;
    top: 0;
    left: -100%;
    bottom: 0;
    width: 220px;
    background: 
      linear-gradient(135deg, rgba(60, 20, 120, 0.6) 0%, rgba(50, 15, 100, 0.65) 50%, rgba(40, 10, 80, 0.7) 100%),
      radial-gradient(circle at 20% 20%, rgba(80, 30, 140, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(90, 35, 150, 0.12) 0%, transparent 50%);
    backdrop-filter: blur(40px) saturate(130%) brightness(0.85);
    -webkit-backdrop-filter: blur(40px) saturate(130%) brightness(0.85);
    z-index: 997;
    padding: 0;
    transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.05), 
      0 12px 40px rgba(0, 0, 0, 0.3), 
      inset 0 1px 0 rgba(255, 255, 255, 0.1), 
      inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  }

  .header.header-show {
    left: 0;
  }

  /* Mobile Hamburger Button - Handled by main.css */

  /* Hover styles handled by main.css */

  .navmenu {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px 0;
  }

  .nav-header {
    padding: 2px 20px 6px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    margin-bottom: 6px;
  }

  .logo-section {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .logo-icon {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow: 
      0 0 0 3px rgba(102, 126, 234, 0.8), 
      0 0 20px rgba(102, 126, 234, 0.6), 
      0 0 40px rgba(118, 75, 162, 0.4), 
      0 0 60px rgba(255, 107, 107, 0.3), 
      inset 0 0 20px rgba(255, 255, 255, 0.1);
    overflow: hidden;
    border: 2px solid rgba(102, 126, 234, 0.9);
    background: 
      linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 30%, rgba(255, 107, 107, 0.1) 60%, rgba(0, 184, 148, 0.05) 100%),
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 60%),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .logo-icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%),
      radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 60%);
    border-radius: 25px;
    z-index: 1;
    transition: all 0.4s ease;
  }

  .logo-icon::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg,
        rgba(102, 126, 234, 0.7) 0%,
        rgba(118, 75, 162, 0.7) 20%,
        rgba(255, 107, 107, 0.7) 40%,
        rgba(0, 184, 148, 0.7) 60%,
        rgba(253, 203, 110, 0.7) 80%,
        rgba(102, 126, 234, 0.7) 100%);
    border-radius: 33px;
    z-index: -1;
    opacity: 0;
    transition: all 0.4s ease;
    animation: rotate 3s linear infinite;
  }

  .logo-icon:hover {
    transform: scale(1.15) rotate(5deg);
    box-shadow: 
      0 0 0 4px rgba(102, 126, 234, 1), 
      0 0 30px rgba(102, 126, 234, 0.8), 
      0 0 60px rgba(118, 75, 162, 0.6), 
      0 0 90px rgba(255, 107, 107, 0.5), 
      0 0 120px rgba(0, 184, 148, 0.4), 
      inset 0 0 30px rgba(255, 255, 255, 0.2);
  }

  .logo-icon:hover::after {
    opacity: 1;
  }

  .logo-text {
    color: #9966ff;
    /* Font size handled by font-sizes.css */
    font-weight: 600;
    text-shadow: 
      0 0 10px #9966ff,
      0 0 20px rgba(153, 102, 255, 0.8),
      0 0 30px rgba(153, 102, 255, 0.6);
  }


  .navmenu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--nav-gap, 4px);
    overflow: hidden;
  }

  .navmenu a {
    display: flex;
    align-items: center;
    padding: var(--nav-button-padding, 0px 20px);
    height: var(--nav-button-height, auto) !important;
    min-height: var(--nav-button-height, auto) !important;
    max-height: var(--nav-button-height, auto) !important;
    overflow: hidden;
    justify-content: center;
    text-align: center;
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    font-weight: 500;
    background: transparent;
    border: 2px solid transparent;
    margin: 4px 8px;
    overflow: hidden;
    backdrop-filter: blur(20px);
  }

  .navmenu a::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(0, 255, 255, 0.1) 0%, 
      rgba(255, 0, 255, 0.1) 25%, 
      rgba(0, 255, 0, 0.1) 50%, 
      rgba(255, 255, 0, 0.1) 75%, 
      rgba(0, 255, 255, 0.1) 100%);
    background-size: 400% 400%;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: -1;
    animation: cyberpunkFlow 4s ease-in-out infinite;
  }

  .navmenu a::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  .navmenu a:hover::before {
    opacity: 1;
  }

  .navmenu a:hover::after {
    width: 200px;
    height: 200px;
  }

  .navmenu a:hover {
    color: #00ffff;
    transform: translateY(-2px);
    border-color: #00ffff;
    box-shadow: 
      0 0 20px rgba(0, 255, 255, 0.5),
      0 0 40px rgba(0, 255, 255, 0.3),
      inset 0 0 20px rgba(0, 255, 255, 0.1);
  }

  /* Cyberpunk color variations for each button - Mobile */
  .navmenu li:nth-child(1) a:hover {
    color: #ff80ff;
    border-color: #ff80ff;
    box-shadow: 
      0 0 20px rgba(255, 128, 255, 0.9),
      0 0 40px rgba(255, 128, 255, 0.7),
      inset 0 0 20px rgba(255, 128, 255, 0.3);
  }

  .navmenu li:nth-child(2) a:hover {
    color: #80ff80;
    border-color: #80ff80;
    box-shadow: 
      0 0 20px rgba(128, 255, 128, 0.9),
      0 0 40px rgba(128, 255, 128, 0.7),
      inset 0 0 20px rgba(128, 255, 128, 0.3);
  }

  .navmenu li:nth-child(3) a:hover {
    color: #80bfff;
    border-color: #80bfff;
    box-shadow: 
      0 0 20px rgba(128, 191, 255, 0.9),
      0 0 40px rgba(128, 191, 255, 0.7),
      inset 0 0 20px rgba(128, 191, 255, 0.3);
  }

  .navmenu li:nth-child(4) a:hover {
    color: #80ffff;
    border-color: #80ffff;
    box-shadow: 0 0 20px rgba(128, 255, 255, 0.9), 0 0 40px rgba(128, 255, 255, 0.7), inset 0 0 20px rgba(128, 255, 255, 0.3);
  }

  .navmenu li:nth-child(5) a:hover {
    color: #ffcc80;
    border-color: #ffcc80;
    box-shadow: 
      0 0 20px rgba(255, 204, 128, 0.9),
      0 0 40px rgba(255, 204, 128, 0.7),
      inset 0 0 20px rgba(255, 204, 128, 0.3);
  }

  .navmenu li:nth-child(6) a:hover {
    color: #ff80ff;
    border-color: #ff80ff;
    box-shadow: 
      0 0 20px rgba(255, 128, 255, 0.9),
      0 0 40px rgba(255, 128, 255, 0.7),
      inset 0 0 20px rgba(255, 128, 255, 0.3);
  }

  .navmenu a.active {
    color: #00ffff;
    background: linear-gradient(135deg, 
      rgba(0, 255, 255, 0.1) 0%, 
      rgba(255, 0, 255, 0.1) 50%,
      rgba(0, 255, 255, 0.1) 100%);
    border: 2px solid #00ffff;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 0 15px rgba(0, 255, 255, 0.8),
      0 0 25px rgba(0, 255, 255, 0.6),
      inset 0 0 15px rgba(0, 255, 255, 0.2);
    backdrop-filter: blur(30px);
    position: relative;
    overflow: hidden;
    animation: cyberpunkPulse 2s ease-in-out infinite;
  }

  .navmenu a.active::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.1) 50%, 
      transparent 100%);
    animation: shimmer 2s ease-in-out infinite;
  }

  .navmenu a.active::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(102, 126, 234, 0.1) 0%, 
      rgba(118, 75, 162, 0.1) 25%, 
      rgba(255, 107, 107, 0.1) 50%, 
      rgba(0, 184, 148, 0.1) 75%, 
      rgba(102, 126, 234, 0.1) 100%);
    background-size: 400% 400%;
    animation: gradientShift 4s ease infinite;
    opacity: 0.6;
    z-index: -1;
  }

  /* Mobile Colorful Icons - Same as desktop but slightly larger */
  .icon-wrapper {
    width: var(--nav-icon-wrapper-size, 28px);
    height: var(--nav-icon-wrapper-size, 28px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
    border-radius: 9px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .navmenu a:hover .icon-wrapper {
    transform: scale(1.1) rotate(5deg);
    filter: brightness(1.2) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
    animation: iconPulse 2s ease-in-out infinite;
  }

  .icon-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 9px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .navmenu a:hover .icon-wrapper::before {
    opacity: 1;
  }

  .navmenu a.active .icon-wrapper::before {
    opacity: 0;
  }

  /* Individual active button colors matching hover - Mobile */
  .navmenu li:nth-child(1) a.active {
    color: #ff80ff !important;
    background: linear-gradient(135deg, 
      rgba(255, 128, 255, 0.1) 0%, 
      rgba(255, 128, 255, 0.1) 50%,
      rgba(255, 128, 255, 0.1) 100%) !important;
    border: 2px solid #ff80ff !important;
    animation: cyberpunkPulsePink 2s ease-in-out infinite !important;
  }

  .navmenu li:nth-child(2) a.active {
    color: #80ff80 !important;
    background: linear-gradient(135deg, 
      rgba(128, 255, 128, 0.1) 0%, 
      rgba(128, 255, 128, 0.1) 50%,
      rgba(128, 255, 128, 0.1) 100%) !important;
    border: 2px solid #80ff80 !important;
    animation: cyberpunkPulseGreen 2s ease-in-out infinite !important;
  }

  .navmenu li:nth-child(3) a.active {
    color: #80bfff !important;
    background: linear-gradient(135deg, 
      rgba(128, 191, 255, 0.1) 0%, 
      rgba(128, 191, 255, 0.1) 50%,
      rgba(128, 191, 255, 0.1) 100%) !important;
    border: 2px solid #80bfff !important;
    animation: cyberpunkPulseBlue 2s ease-in-out infinite !important;
  }

  .navmenu li:nth-child(4) a.active {
    color: #80ffff !important;
    background: linear-gradient(135deg, 
      rgba(128, 255, 255, 0.1) 0%, 
      rgba(128, 255, 255, 0.1) 50%,
      rgba(128, 255, 255, 0.1) 100%) !important;
    border: 2px solid #80ffff !important;
    animation: cyberpunkPulseCyan 2s ease-in-out infinite !important;
  }

  .navmenu li:nth-child(5) a.active {
    color: #ffcc80 !important;
    background: linear-gradient(135deg, 
      rgba(255, 204, 128, 0.1) 0%, 
      rgba(255, 204, 128, 0.1) 50%,
      rgba(255, 204, 128, 0.1) 100%) !important;
    border: 2px solid #ffcc80 !important;
    animation: cyberpunkPulseOrange 2s ease-in-out infinite !important;
  }

  .navmenu li:nth-child(6) a.active {
    color: #ff80ff !important;
    background: linear-gradient(135deg, 
      rgba(255, 128, 255, 0.1) 0%, 
      rgba(255, 128, 255, 0.1) 50%,
      rgba(255, 128, 255, 0.1) 100%) !important;
    border: 2px solid #ff80ff !important;
    animation: cyberpunkPulsePink 2s ease-in-out infinite !important;
  }

  /* Same colorful gradients for mobile with enhanced effects */
  .home-icon {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    box-shadow: 0 3px 12px rgba(255, 107, 107, 0.25);
  }

  .navmenu a:hover .home-icon {
    transform: scale(1.1) rotate(3deg);
    box-shadow: 0 4px 16px rgba(255, 107, 107, 0.35);
  }

  .navmenu a.active .home-icon {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    box-shadow: 0 4px 16px rgba(255, 107, 107, 0.4);
    transform: scale(1.05);
  }

  .about-icon {
    background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
    box-shadow: 0 3px 12px rgba(0, 184, 148, 0.25);
  }

  .navmenu a:hover .about-icon {
    transform: scale(1.1) rotate(-3deg);
    box-shadow: 0 4px 16px rgba(0, 184, 148, 0.35);
  }

  .navmenu a.active .about-icon {
    background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
    box-shadow: 0 4px 16px rgba(0, 184, 148, 0.4);
    transform: scale(1.05);
  }

  .resume-icon {
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    box-shadow: 0 3px 12px rgba(116, 185, 255, 0.25);
  }

  .navmenu a:hover .resume-icon {
    transform: scale(1.1) rotate(3deg);
    box-shadow: 0 4px 16px rgba(116, 185, 255, 0.35);
  }

  .navmenu a.active .resume-icon {
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
    box-shadow: 0 4px 16px rgba(116, 185, 255, 0.4);
    transform: scale(1.05);
  }

  .portfolio-icon {
    background: linear-gradient(135deg, #0080ff 0%, #00bfff 100%);
    box-shadow: 0 3px 12px rgba(0, 128, 255, 0.25);
  }

  .navmenu a:hover .portfolio-icon {
    transform: scale(1.1) rotate(-3deg);
    box-shadow: 0 4px 16px rgba(0, 128, 255, 0.35);
  }

  .navmenu a.active .portfolio-icon {
    background: linear-gradient(135deg, #0080ff 0%, #00bfff 100%);
    box-shadow: 0 4px 16px rgba(0, 128, 255, 0.4);
    transform: scale(1.05);
  }

  .services-icon {
    background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
    box-shadow: 0 3px 12px rgba(253, 203, 110, 0.25);
  }

  .navmenu a:hover .services-icon {
    transform: scale(1.1) rotate(3deg);
    box-shadow: 0 4px 16px rgba(253, 203, 110, 0.35);
  }

  .navmenu a.active .services-icon {
    background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
    box-shadow: 0 4px 16px rgba(253, 203, 110, 0.4);
    transform: scale(1.05);
  }

  .contact-icon {
    background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
    box-shadow: 0 3px 12px rgba(253, 121, 168, 0.25);
  }

  .navmenu a:hover .contact-icon {
    transform: scale(1.1) rotate(-3deg);
    box-shadow: 0 4px 16px rgba(253, 121, 168, 0.35);
  }

  .navmenu a.active .contact-icon {
    background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
    box-shadow: 0 4px 16px rgba(253, 121, 168, 0.4);
    transform: scale(1.05);
  }

  .navicon {
    /* Font size handled by font-sizes.css */
    color: white;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active-indicator {
    width: 5px;
    height: 22px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
    margin-left: auto;
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    animation: pulse 2s infinite;
  }

  .nav-footer {
    padding: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    margin-top: auto;
  }


  .theme-toggle {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.7);
    /* Font size handled by font-sizes.css */
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.06);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .theme-toggle i {
    margin-right: 8px;
    /* Font size handled by font-sizes.css */
  }
}

/* Tablet Styles */
@media (pointer: coarse) and (max-width: 768px) {
  .header {
    width: 240px;
  }

  .navmenu a {
    /* Dynamic sizing handled by JavaScript and font-sizes.css */
  }

  .icon-wrapper {
    width: var(--nav-icon-wrapper-size, 26px);
    height: var(--nav-icon-wrapper-size, 26px);
    margin-right: 12px;
  }

  .navicon {
    /* Fonts managed by font-sizes.css */
  }
}

/* Mobile Styles */
@media (pointer: coarse) and (max-width: 480px) {
  .header {
    width: 220px;
  }

  .navmenu a {
    /* Dynamic sizing handled by JavaScript and font-sizes.css */
  }

  .icon-wrapper {
    width: var(--nav-icon-wrapper-size, 24px);
    height: var(--nav-icon-wrapper-size, 24px);
    margin-right: 10px;
  }

  .navicon {
    /* Fonts managed by font-sizes.css */
  }
}

/* Additional media query to ensure hamburger menu is visible on all non-desktop screens */
@media (pointer: coarse) or (max-width: 1199px) {
  /* Hamburger menu styling handled by main.css */
}

/* Simple Logo Styles */
.futuristic-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.logo-simple {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 3px 15px rgba(0, 0, 0, 0.4),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
}

.logo-icon {
  font-size: 24px;
}




.logo-subtitle {
  display: block;
  font-size: 8px;
  color: rgba(0, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 4px;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
}








@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes cyberpunkFlow {
  0% { background-position: 0% 0%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 0%; }
}

        @keyframes cyberpunkPulse {
          0%, 100% { 
            box-shadow: 
              0 0 6px rgba(0, 255, 255, 0.8),
              0 0 10px rgba(0, 255, 255, 0.6),
              inset 0 0 6px rgba(0, 255, 255, 0.2);
          }
          50% { 
            box-shadow: 
              0 0 8px rgba(0, 255, 255, 1.0),
              0 0 14px rgba(0, 255, 255, 0.8),
              inset 0 0 8px rgba(0, 255, 255, 0.3);
          }
        }

        @keyframes cyberpunkPulsePink {
          0%, 100% { 
            box-shadow: 
              0 0 6px rgba(255, 128, 255, 0.8),
              0 0 10px rgba(255, 128, 255, 0.6),
              inset 0 0 6px rgba(255, 128, 255, 0.2);
          }
          50% { 
            box-shadow: 
              0 0 8px rgba(255, 128, 255, 1.0),
              0 0 14px rgba(255, 128, 255, 0.8),
              inset 0 0 8px rgba(255, 128, 255, 0.3);
          }
        }

        @keyframes cyberpunkPulseGreen {
          0%, 100% { 
            box-shadow: 
              0 0 6px rgba(128, 255, 128, 0.8),
              0 0 10px rgba(128, 255, 128, 0.6),
              inset 0 0 6px rgba(128, 255, 128, 0.2);
          }
          50% { 
            box-shadow: 
              0 0 8px rgba(128, 255, 128, 1.0),
              0 0 14px rgba(128, 255, 128, 0.8),
              inset 0 0 8px rgba(128, 255, 128, 0.3);
          }
        }

        @keyframes cyberpunkPulseBlue {
          0%, 100% { 
            box-shadow: 
              0 0 6px rgba(128, 191, 255, 0.8),
              0 0 10px rgba(128, 191, 255, 0.6),
              inset 0 0 6px rgba(128, 191, 255, 0.2);
          }
          50% { 
            box-shadow: 
              0 0 8px rgba(128, 191, 255, 1.0),
              0 0 14px rgba(128, 191, 255, 0.8),
              inset 0 0 8px rgba(128, 191, 255, 0.3);
          }
        }

        @keyframes cyberpunkPulseCyan {
          0%, 100% { 
            box-shadow: 
              0 0 6px rgba(128, 255, 255, 0.8),
              0 0 10px rgba(128, 255, 255, 0.6),
              inset 0 0 6px rgba(128, 255, 255, 0.2);
          }
          50% { 
            box-shadow: 
              0 0 8px rgba(128, 255, 255, 1.0),
              0 0 14px rgba(128, 255, 255, 0.8),
              inset 0 0 8px rgba(128, 255, 255, 0.3);
          }
        }

        @keyframes cyberpunkPulseOrange {
          0%, 100% { 
            box-shadow: 
              0 0 6px rgba(255, 204, 128, 0.8),
              0 0 10px rgba(255, 204, 128, 0.6),
              inset 0 0 6px rgba(255, 204, 128, 0.2);
          }
          50% { 
            box-shadow: 
              0 0 8px rgba(255, 204, 128, 1.0),
              0 0 14px rgba(255, 204, 128, 0.8),
              inset 0 0 8px rgba(255, 204, 128, 0.3);
          }
        }

@keyframes cyberpunkIconSpin {
  0%, 100% { 
    transform: scale(1.2) rotate(10deg);
  }
  25% { 
    transform: scale(1.3) rotate(15deg);
  }
  50% { 
    transform: scale(1.2) rotate(10deg);
  }
  75% { 
    transform: scale(1.1) rotate(5deg);
  }
}

@keyframes iconPulse {
  0%, 100% { 
    transform: scale(1.1) rotate(5deg);
    filter: brightness(1);
  }
  50% { 
    transform: scale(1.15) rotate(5deg);
    filter: brightness(1.2);
  }
}

/* Unique Active Backgrounds for Each Navigation Item */
.navmenu a.active[href="#hero"] {
  background: linear-gradient(135deg, 
    rgba(255, 107, 107, 0.25) 0%, 
    rgba(238, 90, 36, 0.25) 50%,
    rgba(255, 107, 107, 0.25) 100%);
  transform: translateX(4px) scale(1.01);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2), 
    0 0 0 1px rgba(255, 107, 107, 0.4), 
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 40px rgba(255, 107, 107, 0.5),
    0 0 60px rgba(238, 90, 36, 0.3);
}

.navmenu a.active[href="#about"] {
  background: linear-gradient(135deg, 
    rgba(0, 184, 148, 0.25) 0%, 
    rgba(0, 160, 133, 0.25) 50%,
    rgba(0, 184, 148, 0.25) 100%);
  transform: translateX(4px) scale(1.01);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2), 
    0 0 0 1px rgba(0, 184, 148, 0.4), 
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 40px rgba(0, 184, 148, 0.5),
    0 0 60px rgba(0, 160, 133, 0.3);
}

.navmenu a.active[href="#resume"] {
  background: linear-gradient(135deg, 
    rgba(116, 185, 255, 0.25) 0%, 
    rgba(9, 132, 227, 0.25) 50%,
    rgba(116, 185, 255, 0.25) 100%);
  transform: translateX(4px) scale(1.01);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2), 
    0 0 0 1px rgba(116, 185, 255, 0.4), 
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 40px rgba(116, 185, 255, 0.5),
    0 0 60px rgba(9, 132, 227, 0.3);
}

.navmenu a.active[href="#portfolio"] {
  background: linear-gradient(135deg, 
    rgba(162, 155, 254, 0.25) 0%, 
    rgba(108, 92, 231, 0.25) 50%,
    rgba(162, 155, 254, 0.25) 100%);
  transform: translateX(4px) scale(1.01);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2), 
    0 0 0 1px rgba(162, 155, 254, 0.4), 
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 40px rgba(162, 155, 254, 0.5),
    0 0 60px rgba(108, 92, 231, 0.3);
}

.navmenu a.active[href="#services"] {
  background: linear-gradient(135deg, 
    rgba(253, 203, 110, 0.25) 0%, 
    rgba(225, 112, 85, 0.25) 50%,
    rgba(253, 203, 110, 0.25) 100%);
  transform: translateX(4px) scale(1.01);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2), 
    0 0 0 1px rgba(253, 203, 110, 0.4), 
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 40px rgba(253, 203, 110, 0.5),
    0 0 60px rgba(225, 112, 85, 0.3);
}

.navmenu a.active[href="#contact"] {
  background: linear-gradient(135deg, 
    rgba(253, 121, 168, 0.25) 0%, 
    rgba(232, 67, 147, 0.25) 50%,
    rgba(253, 121, 168, 0.25) 100%);
  transform: translateX(4px) scale(1.01);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2), 
    0 0 0 1px rgba(253, 121, 168, 0.4), 
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 40px rgba(253, 121, 168, 0.5),
    0 0 60px rgba(232, 67, 147, 0.3);
}
</style>