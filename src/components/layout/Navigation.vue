<template>
  <!-- Mobile Hamburger Menu -->
  <i class="mobile-nav-toggle bi bi-list icon-lg" @click="toggleMobileMenu"></i>
  
  <header id="header" class="header" :class="{ 'header-show': mobileMenuOpen }">
    <nav id="navmenu" class="navmenu">
      <!-- Home Button -->
      <NavButton 
        href="#hero" 
        label="Home"
        buttonColor="236, 72, 153"
        :svgPaths="[{ d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }]"
        :svgPolylines="[{ points: '9 22 9 12 15 12 15 22' }]"
        :isActive="activeSection === 'hero'"
        @navigate="scrollToSection('hero', $event)"
      />

      <!-- About Button -->
      <NavButton 
        href="#about" 
        label="About"
        buttonColor="16, 185, 129"
        :svgPaths="[{ d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }]"
        :svgCircles="[{ cx: '12', cy: '7', r: '4' }]"
        :isActive="activeSection === 'about'"
        @navigate="scrollToSection('about', $event)"
      />

      <!-- Resume Button -->
      <NavButton 
        href="#resume" 
        label="Resume"
        buttonColor="255, 215, 0"
        :svgPaths="[{ d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }]"
        :svgPolylines="[
          { points: '14 2 14 8 20 8' },
          { points: '10 9 9 9 8 9' }
        ]"
        :svgLines="[
          { x1: '16', y1: '13', x2: '8', y2: '13' },
          { x1: '16', y1: '17', x2: '8', y2: '17' }
        ]"
        :isActive="activeSection === 'resume'"
        @navigate="scrollToSection('resume', $event)"
      />

      <!-- Portfolio Button -->
      <NavButton 
        href="#portfolio" 
        label="Portfolio"
        buttonColor="6, 182, 212"
        :svgPaths="[{ d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' }]"
        :svgRects="[{ x: '2', y: '7', width: '20', height: '14', rx: '2', ry: '2' }]"
        :isActive="activeSection === 'portfolio'"
        @navigate="scrollToSection('portfolio', $event)"
      />

      <!-- Services Button -->
      <NavButton 
        href="#services" 
        label="Services"
        buttonColor="251, 146, 60"
        :svgPaths="[{ d: 'M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2' }]"
        :svgCircles="[{ cx: '12', cy: '12', r: '3' }]"
        :isActive="activeSection === 'services'"
        @navigate="scrollToSection('services', $event)"
      />

      <!-- Contact Button -->
      <NavButton 
        href="#contact" 
        label="Contact"
        buttonColor="139, 92, 246"
        :svgPaths="[{ d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }]"
        :svgPolylines="[{ points: '22,6 12,13 2,6' }]"
        :isActive="activeSection === 'contact'"
        @navigate="scrollToSection('contact', $event)"
      />
    </nav>
  </header>
</template>

<script>
import { APP_CONFIG, COMPONENT_DEFAULTS } from '../../config/constants.js'
import NavButton from '../common/NavButton.vue'

export default {
  name: 'Navigation',
  components: {
    NavButton
  },
  data() {
    return {
      ...APP_CONFIG,
      navSections: COMPONENT_DEFAULTS.navigation.sections,
      mobileMenuOpen: false,
      activeSection: 'hero',
      touchStartX: 0,
      touchStartY: 0,
      touchMoveX: 0,
      touchEndX: 0,
      touchEndY: 0,
      minSwipeDistance: 50,
      intersectionObserver: null, // Store observer for cleanup
      scrollTimeout: null, // Store scroll timeout for debouncing
    }
  },
  mounted() {
    this.setActiveSectionFromRoute()
    // Only set up scroll observers on home page
    if (this.$route.path === '/') {
      // Wait for DOM to be fully rendered before setting up observers
      this.$nextTick(() => {
        setTimeout(() => {
          this.setupIntersectionObserver()
          // Check initial scroll position to set active section
          this.checkInitialScrollPosition()
          // Add scroll listener as fallback
          window.addEventListener('scroll', this.handleScroll, { passive: true })
        }, 100)
      })
    }
    this.setupClickOutsideListener()
    this.setupSwipeGestures()
    this.setupViewportResizeListener()
  },
  beforeUnmount() {
    // Clean up IntersectionObserver
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
      this.intersectionObserver = null
    }
    // Clean up scroll listener
    window.removeEventListener('scroll', this.handleScroll)
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout)
    }
    document.removeEventListener('click', this.handleClickOutside)
    document.removeEventListener('touchstart', this.handleTapOutside)
    document.removeEventListener('touchstart', this.handleTouchStart)
    document.removeEventListener('touchend', this.handleTouchEnd)
    document.removeEventListener('touchmove', this.handleTouchMove)
    window.removeEventListener('resize', this.debouncedResizeHandler)
    window.removeEventListener('orientationchange', this.adjustButtonHeights)
  },
  watch: {
    activeSection(newSection, oldSection) {
      // No need to force update - Vue's reactivity will handle this automatically
      if (newSection !== oldSection) {
        // Optional: Add any custom logic here if needed
      }
    },
    '$route'(to, from) {
      // Update active section when route changes
      this.setActiveSectionFromRoute()
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    setActiveSectionFromRoute() {
      // Check if we're on a project page
      if (this.$route.path.startsWith('/projects/')) {
        this.activeSection = 'portfolio'
      } else if (this.$route.path.startsWith('/services/')) {
        // If we're on a service page, highlight Services
        this.activeSection = 'services'
      } else if (this.$route.path === '/') {
        // If we're on the home page, let scroll spy handle it
        this.activeSection = 'hero'
      }
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
    setupIntersectionObserver() {
      const sections = ['hero', 'about', 'resume', 'portfolio', 'services', 'contact']
      
      // Store observer reference for cleanup
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect()
      }
      
      const observer = new IntersectionObserver((entries) => {
        // Only update active section on home page
        if (this.$route.path !== '/') return
        
        // Find the entry with the highest intersection ratio (most visible)
        let mostVisible = null
        let highestRatio = 0
        
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio
            mostVisible = entry
          }
        })
        
        // If we have a visible section, update active section
        if (mostVisible) {
          const sectionId = mostVisible.target.id
          if (sections.includes(sectionId)) {
            this.activeSection = sectionId
          }
        }
      }, {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], // Multiple thresholds for better detection
        rootMargin: '-10% 0px -10% 0px' // More lenient margin
      })

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId)
        if (section) {
          observer.observe(section)
        }
      })
      
      // Store observer for cleanup
      this.intersectionObserver = observer
    },
    checkInitialScrollPosition() {
      // Only check scroll position on home page
      if (this.$route.path !== '/') return
      
      // If we're at the top of the page, ensure hero is active
      if (window.scrollY < 100) {
        this.activeSection = 'hero'
      } else {
        // Check which section is currently in view
        const sections = ['hero', 'about', 'resume', 'portfolio', 'services', 'contact']
        const scrollPosition = window.scrollY + window.innerHeight / 3 // Check at 1/3 from top
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i])
          if (section && section.offsetTop <= scrollPosition) {
            this.activeSection = sections[i]
            break
          }
        }
      }
    },
    handleScroll() {
      // Only handle scroll on home page
      if (this.$route.path !== '/') return
      
      // Debounced scroll handler with RAF to batch DOM reads
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout)
      }
      
      this.scrollTimeout = setTimeout(() => {
        // Use requestAnimationFrame to batch DOM reads and avoid forced reflows
        requestAnimationFrame(() => {
          const sections = ['hero', 'about', 'resume', 'portfolio', 'services', 'contact']
          const scrollY = window.scrollY
          const windowHeight = window.innerHeight
          const viewportCenter = scrollY + windowHeight / 3
          
          // Batch all DOM reads in a single frame
          const sectionData = sections.map(sectionId => {
            const section = document.getElementById(sectionId)
            if (!section) return null
            
            // Single getBoundingClientRect call per section
            const rect = section.getBoundingClientRect()
            const offsetTop = section.offsetTop
            const offsetHeight = section.offsetHeight
            
            // Calculate visibility without additional DOM reads
            const visibleTop = Math.max(0, -rect.top)
            const visibleBottom = Math.min(offsetHeight, windowHeight - rect.top)
            const visibleHeight = Math.max(0, visibleBottom - visibleTop)
            const visibility = visibleHeight / offsetHeight
            
            return {
              id: sectionId,
              visibility,
              top: rect.top,
              offsetTop,
              isInView: rect.top <= windowHeight / 2 && rect.bottom >= 0
            }
          }).filter(Boolean)
          
          // Find the section that's currently most visible
          let currentSection = 'hero'
          let maxVisibility = 0
          
          sectionData.forEach(data => {
            if (data.visibility > maxVisibility && data.isInView) {
              maxVisibility = data.visibility
              currentSection = data.id
            }
          })
          
          // Only update if different to avoid unnecessary reactivity
          if (this.activeSection !== currentSection) {
            this.activeSection = currentSection
          }
        })
      }, 100) // Increased debounce for better performance
    },
    setupClickOutsideListener() {
      document.addEventListener('click', this.handleClickOutside)
      document.addEventListener('touchstart', this.handleTapOutside, { passive: true })
    },
    handleClickOutside(event) {
      const header = document.getElementById('header')
      const toggleButton = document.querySelector('.mobile-nav-toggle')
      
      if (
        this.mobileMenuOpen &&
        header && 
        !header.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target)
      ) {
        this.closeMobileMenu()
      }
    },
    handleTapOutside(event) {
      const header = document.getElementById('header')
      const toggleButton = document.querySelector('.mobile-nav-toggle')
      
      if (
        this.mobileMenuOpen &&
        header && 
        !header.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target)
      ) {
        this.closeMobileMenu()
      }
    },
    setupSwipeGestures() {
      document.addEventListener('touchstart', this.handleTouchStart, { passive: true })
      document.addEventListener('touchend', this.handleTouchEnd, { passive: true })
      document.addEventListener('touchmove', this.handleTouchMove, { passive: false }) // Non-passive to allow preventDefault
    },
    handleTouchStart(event) {
      this.touchStartX = event.changedTouches[0].screenX
      this.touchStartY = event.changedTouches[0].screenY
      this.touchMoveX = this.touchStartX
    },
    handleTouchEnd(event) {
      this.touchEndX = event.changedTouches[0].screenX
      this.touchEndY = event.changedTouches[0].screenY
      this.handleSwipe()
    },
    handleTouchMove(event) {
      this.touchMoveX = event.changedTouches[0].screenX
      const diffX = this.touchMoveX - this.touchStartX
      const diffY = Math.abs(event.changedTouches[0].screenY - this.touchStartY)
      
      // Prevent default browser back/forward gesture for edge swipes
      if (Math.abs(diffX) > 10 && diffY < 100) {
        // Swipe from left edge
        if (this.touchStartX < 50 && diffX > 0) {
          event.preventDefault()
        }
        // Swipe to close menu
        else if (this.mobileMenuOpen && diffX < -10) {
          event.preventDefault()
        }
      }
    },
    handleSwipe() {
      const diffX = this.touchEndX - this.touchStartX
      const diffY = Math.abs(this.touchEndY - this.touchStartY)

      // Only process horizontal swipes (vertical difference less than 100px)
      if (Math.abs(diffX) > this.minSwipeDistance && diffY < 100) {
        // Swipe from left edge (diffX > 0) - Open menu
        if (diffX > 0 && this.touchStartX < 50 && !this.mobileMenuOpen) {
          this.mobileMenuOpen = true
        }
        // Swipe right to left (diffX < 0) - Close menu
        else if (diffX < 0 && this.mobileMenuOpen) {
          this.closeMobileMenu()
        }
      }
    },
    setupViewportResizeListener() {
      this.debouncedResizeHandler = this.debounce(() => {
        this.adjustButtonHeights()
      }, 200)
      
      window.addEventListener('resize', this.debouncedResizeHandler)
      window.addEventListener('orientationchange', this.adjustButtonHeights)
    },
    adjustButtonHeights() {
      // No need to force update - Vue's reactivity will handle this automatically
      // The NavButton components will update their heights based on CSS media queries
    },
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
    }
  }
}
</script>

<style scoped>
/* ===================================
   HEADER & NAV LAYOUT
   =================================== */

/* Desktop Navigation - Only for mouse/trackpad devices */
@media (hover: hover) and (pointer: fine) {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 16.66%;
    padding: 0;
    background: linear-gradient(180deg, rgba(30, 15, 50, 1) 0%, rgba(20, 10, 35, 1) 100%);
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 996;
    border-right: 1px solid rgba(139, 92, 246, 0.2);
  }
}

/* Touch Devices & Mobile - Hamburger menu for ALL touch devices regardless of width */
@media (pointer: coarse), (max-width: 1199px) {
  .header {
    position: fixed;
    top: 0;
    left: -100%;
    bottom: 0;
    width: 280px;
    padding: 0;
    background: linear-gradient(180deg, rgba(30, 15, 50, 1) 0%, rgba(20, 10, 35, 1) 100%);
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 996;
    border-right: 1px solid rgba(139, 92, 246, 0.2);
    transition: all 0.3s ease-in-out;
  }

  .header.header-show {
    left: 0;
  }
}

/* Navigation Menu */
.navmenu {
  padding: 20px 0 0 0;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* ===================================
   MOBILE HAMBURGER BUTTON
   =================================== */

.mobile-nav-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9998;
  width: 50px;
  height: 50px;
  background: rgba(18, 18, 18, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.mobile-nav-toggle:hover {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.6);
  color: rgba(139, 92, 246, 1);
  box-shadow: 
    0 4px 16px rgba(139, 92, 246, 0.3),
    0 0 20px rgba(139, 92, 246, 0.2);
  transform: scale(1.05);
}

.mobile-nav-toggle:active {
  transform: scale(0.95);
}

/* Hide hamburger only on desktop with mouse/trackpad AND wide screen */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .mobile-nav-toggle {
    display: none;
  }
}
</style>
