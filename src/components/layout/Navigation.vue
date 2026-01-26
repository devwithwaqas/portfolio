<template>
  <!-- Mobile Hamburger Menu - only rendered on mobile (v-if), teleported to body -->
  <Teleport to="body">
    <i v-if="showMobileToggle" class="mobile-nav-toggle bi bi-list icon-lg" @click="toggleMobileMenu"></i>
  </Teleport>
  
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

      <!-- Technology Expertise Button -->
      <NavButton 
        href="#technology-expertise" 
        label="Expertise"
        buttonColor="5, 99, 187"
        :svgPaths="[{ d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' }]"
        :isActive="activeSection === 'technology-expertise'"
        @navigate="scrollToSection('technology-expertise', $event)"
      />

      <!-- Skills Button -->
      <NavButton 
        href="#skills" 
        label="Skills"
        buttonColor="147, 51, 234"
        :svgPaths="[{ d: 'M12 2L2 7l10 5 10-5-10-5z' }, { d: 'M2 17l10 5 10-5M2 12l10 5 10-5' }]"
        :isActive="activeSection === 'skills'"
        @navigate="scrollToSection('skills', $event)"
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
      showMobileToggle: typeof window !== 'undefined' && window.innerWidth < 1200,
      touchStartX: 0,
      touchStartY: 0,
      touchMoveX: 0,
      touchEndX: 0,
      touchEndY: 0,
      minSwipeDistance: 50,
      intersectionObserver: null,
      scrollTimeout: null,
      scrollIdleCallback: null,
      isUserScrolling: false,
      userScrollTimeout: null,
      orientationChangeHandler: null
    }
  },
  mounted() {
    this.checkMobileViewport()
    this.setActiveSectionFromRoute()
    // Only set up scroll observers on home page
    if (this.$route.path === '/') {
      // Wait for DOM to be fully rendered before setting up observers
      this.$nextTick(() => {
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          this.setupIntersectionObserver()
          // Check initial scroll position to set active section
          this.checkInitialScrollPosition()
          // Add scroll listener as fallback
          window.addEventListener('scroll', this.handleScroll, { passive: true })
        })
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
    if (this.scrollIdleCallback && window.cancelIdleCallback) {
      cancelIdleCallback(this.scrollIdleCallback)
    }
    if (this.userScrollTimeout) {
      clearTimeout(this.userScrollTimeout)
    }
    document.removeEventListener('click', this.handleClickOutside)
    document.removeEventListener('touchstart', this.handleTapOutside)
    document.removeEventListener('touchstart', this.handleTouchStart)
    document.removeEventListener('touchend', this.handleTouchEnd)
    document.removeEventListener('touchmove', this.handleTouchMove)
    window.removeEventListener('resize', this.debouncedResizeHandler)
    if (this.orientationChangeHandler) {
      window.removeEventListener('orientationchange', this.orientationChangeHandler)
    }
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
      
      // Re-setup intersection observer when navigating to/from home page
      if (to.path === '/' || from.path === '/') {
        this.$nextTick(() => {
          if (to.path === '/') {
            // Re-initialize observer when returning to home
            requestAnimationFrame(() => {
              this.setupIntersectionObserver()
              this.checkInitialScrollPosition()
            })
          } else {
            // Clean up observer when leaving home
            if (this.intersectionObserver) {
              this.intersectionObserver.disconnect()
              this.intersectionObserver = null
            }
          }
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
      
      // Clear any existing timeout
      if (this.userScrollTimeout) {
        clearTimeout(this.userScrollTimeout)
        this.userScrollTimeout = null
      }
      
      // Set flag to disable intersection observer temporarily
      this.isUserScrolling = true
      
      // Immediately set the clicked section as active
      this.activeSection = sectionId
      
      // Always scroll without changing URL - no hash fragments
      if (this.$route.path !== '/') {
        // If not on home page, navigate to home first, then scroll
        // Components load immediately, so scroll after navigation completes
        this.$router.push('/').then(() => {
          this.$nextTick(() => {
            const element = document.getElementById(sectionId)
            if (element) {
              // Position section at top of viewport (just below header)
              requestAnimationFrame(() => {
                const rect = element.getBoundingClientRect()
                const scrollY = window.pageYOffset || window.scrollY || 0
                const headerOffset = 120
                const offsetPosition = rect.top + scrollY - headerOffset
                
                // Scroll in next frame
                requestAnimationFrame(() => {
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                  // Re-enable intersection observer after scroll completes (smooth scroll takes ~500ms)
                  this.userScrollTimeout = setTimeout(() => {
                    this.isUserScrolling = false
                    this.userScrollTimeout = null
                  }, 800)
                })
              })
            }
          })
        })
      } else {
        // On home page, just scroll without hash
        // Components load immediately, so we can scroll right away
        const element = document.getElementById(sectionId)
        if (element) {
          // Position section at top of viewport (just below header)
          // OPTIMIZATION: Use offsetTop instead of getBoundingClientRect to avoid forced reflow
          requestAnimationFrame(() => {
            // BATCH: Read layout properties together
            const elementOffsetTop = element.offsetTop
            const headerOffset = 120
            const offsetPosition = elementOffsetTop - headerOffset
            
            // Scroll in next frame
            requestAnimationFrame(() => {
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              })
              // Re-enable intersection observer after scroll completes (smooth scroll takes ~500ms)
              this.userScrollTimeout = setTimeout(() => {
                this.isUserScrolling = false
                this.userScrollTimeout = null
              }, 800)
            })
          })
        }
      }
    },
    setupIntersectionObserver() {
      const sections = ['hero', 'about', 'technology-expertise', 'skills', 'resume', 'portfolio', 'services', 'contact']
      
      // Store observer reference for cleanup
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect()
      }
      
      const observer = new IntersectionObserver((entries) => {
        // Only update active section on home page
        if (this.$route.path !== '/') return
        
        // Ignore intersection observer updates ONLY if user clicked nav button (not during natural scroll)
        // The isUserScrolling flag is set when clicking nav, but should allow natural scroll detection
        if (this.isUserScrolling) {
          // Only block if we're in the middle of a programmatic scroll from nav click
          // Allow natural scroll and hash-based scrolls to update active section
          return
        }
        
        // Use requestAnimationFrame to batch updates and avoid conflicts
        requestAnimationFrame(() => {
          const viewportHeight = window.innerHeight
          const viewportCenter = viewportHeight / 2
          const scrollY = window.scrollY || window.pageYOffset || 0
          
          // Process all entries to build a complete picture
          const sectionData = new Map()
          
          // First, process IntersectionObserver entries
          entries.forEach(entry => {
            const sectionId = entry.target.id
            if (sections.includes(sectionId)) {
              const rect = entry.boundingClientRect
              const visibleTop = Math.max(rect.top, 0)
              const visibleBottom = Math.min(rect.bottom, viewportHeight)
              const visibleHeight = Math.max(0, visibleBottom - visibleTop)
              const visibilityRatio = rect.height > 0 ? visibleHeight / rect.height : 0
              const sectionCenterY = rect.top + (rect.height / 2)
              const distanceFromCenter = Math.abs(sectionCenterY - viewportCenter)
              
              sectionData.set(sectionId, {
                id: sectionId,
                isIntersecting: entry.isIntersecting,
                intersectionRatio: entry.intersectionRatio,
                visibilityRatio: visibilityRatio,
                distanceFromCenter: distanceFromCenter,
                boundingTop: rect.top,
                boundingBottom: rect.bottom,
                centerY: sectionCenterY
              })
            }
          })
          
          // OPTIMIZATION: Batch all getBoundingClientRect calls to minimize forced reflows
          // Also check sections that might be in view but not in current entries
          // This handles cases where observer hasn't fired yet
          // CRITICAL: Batch all layout reads together to avoid multiple forced reflows
          const sectionsToCheck = sections.filter(sectionId => !sectionData.has(sectionId))
          if (sectionsToCheck.length > 0) {
            // BATCH: Read all getBoundingClientRect in one operation
            const sectionRects = new Map()
            sectionsToCheck.forEach(sectionId => {
              const section = document.getElementById(sectionId)
              if (section) {
                // Single getBoundingClientRect call per section (batched in RAF)
                sectionRects.set(sectionId, section.getBoundingClientRect())
              }
            })
            
            // Process all rects together (no additional layout reads)
            sectionRects.forEach((rect, sectionId) => {
              const visibleTop = Math.max(rect.top, 0)
              const visibleBottom = Math.min(rect.bottom, viewportHeight)
              const visibleHeight = Math.max(0, visibleBottom - visibleTop)
              const visibilityRatio = rect.height > 0 ? visibleHeight / rect.height : 0
              
              // Only add if section has meaningful visibility
              if (visibleHeight > 50 || (rect.top < viewportHeight && rect.bottom > 0)) {
                const sectionCenterY = rect.top + (rect.height / 2)
                const distanceFromCenter = Math.abs(sectionCenterY - viewportCenter)
                
                sectionData.set(sectionId, {
                  id: sectionId,
                  isIntersecting: rect.top < viewportHeight && rect.bottom > 0,
                  intersectionRatio: visibilityRatio,
                  visibilityRatio: visibilityRatio,
                  distanceFromCenter: distanceFromCenter,
                  boundingTop: rect.top,
                  boundingBottom: rect.bottom,
                  centerY: sectionCenterY
                })
              }
            })
          }
          
          // Convert to array and filter to only sections with meaningful visibility
          const candidateSections = Array.from(sectionData.values()).filter(section => 
            section.visibilityRatio > 0.1 || 
            (section.boundingTop < viewportHeight && section.boundingBottom > 0)
          )
          
          // If no candidates, check if we're at top
          if (candidateSections.length === 0) {
            if (scrollY < 100) {
              this.activeSection = 'hero'
            }
            return
          }
          
          // Score each section: prioritize sections at the TOP of viewport
          // This ensures when resume is scrolled to, it's selected (not skills above it)
          candidateSections.forEach(section => {
            let score = section.visibilityRatio * 100
            
            // CRITICAL: Prioritize sections that are at the TOP of viewport
            // Sections with top edge near the top of viewport (after header) get highest priority
            const topEdgeDistance = Math.abs(section.boundingTop - 120) // 120 = header offset
            if (topEdgeDistance < 200) {
              // Section is near the top - boost score significantly
              score += (1 - topEdgeDistance / 200) * 200
            }
            
            // Boost score if section top is above viewport center (in upper half)
            if (section.boundingTop < viewportCenter) {
              score += 50
            }
            
            // Boost score if section is intersecting according to observer
            if (section.isIntersecting) {
              score += 30
            }
            
            // Penalize sections that are mostly above viewport (negative boundingTop)
            if (section.boundingTop < -100) {
              score -= 100
            }
            
            section.score = score
          })
          
          // Sort by score (highest first)
          candidateSections.sort((a, b) => b.score - a.score)
          
          // Set the highest scoring section as active
          const newActiveSection = candidateSections[0].id
          if (this.activeSection !== newActiveSection) {
            this.activeSection = newActiveSection
          }
        })
      }, {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], // Multiple thresholds for better detection
        rootMargin: '-20% 0px -20% 0px' // Standard margin - scoring logic will prioritize top sections
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
      
      // OPTIMIZATION: Batch all layout reads in one operation to avoid forced reflows
      // Read scroll position once, then check sections
      const scrollY = window.scrollY || window.pageYOffset || 0
      const viewportHeight = window.innerHeight || 0
      
      // If we're at the top of the page, ensure hero is active
      if (scrollY < 100) {
        this.activeSection = 'hero'
        return
      }
      
      // Use IntersectionObserver instead of offsetTop (which causes forced reflow)
      // This method is called before IntersectionObserver is set up, so defer to it
      // The IntersectionObserver will set the correct section shortly
      // This prevents forced reflow on initial page load
      this.$nextTick(() => {
        // Let IntersectionObserver handle it (already set up)
        // This is just a fallback
      })
    },
    handleScroll() {
      if (this.$route.path !== '/') return
      
      // Don't interfere if user clicked nav button (programmatic scroll)
      if (this.isUserScrolling) return
      
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout)
        this.scrollTimeout = null
      }
      if (this.scrollIdleCallback && window.cancelIdleCallback) {
        cancelIdleCallback(this.scrollIdleCallback)
        this.scrollIdleCallback = null
      }
      
      const performScrollCheck = () => {
        // OPTIMIZATION: Use single RAF and batch layout reads
        // IntersectionObserver handles most work, this is just a lightweight fallback
        requestAnimationFrame(() => {
          // Batch scroll read (single forced reflow)
          const scrollY = window.scrollY || window.pageYOffset || 0
          // Only update if at top and section is different (reduces Vue reactivity overhead)
          if (scrollY < 100 && this.activeSection !== 'hero') {
            this.activeSection = 'hero'
          }
          // For other sections, rely on IntersectionObserver (which is more efficient)
          // No need to check sections here - IntersectionObserver handles it
        })
      }
      
      if (window.requestIdleCallback) {
        this.scrollIdleCallback = requestIdleCallback(performScrollCheck, { timeout: 200 })
      } else {
        this.scrollTimeout = setTimeout(performScrollCheck, 200)
      }
    },
    setupClickOutsideListener() {
      document.addEventListener('click', this.handleClickOutside)
      document.addEventListener('touchstart', this.handleTapOutside, { passive: true })
    },
    handleClickOutside(event) {
      if (!this.showMobileToggle || !this.mobileMenuOpen) return
      const header = document.getElementById('header')
      const toggleButton = document.querySelector('.mobile-nav-toggle')
      if (!header) return
      if (toggleButton && toggleButton.contains(event.target)) return
      if (header.contains(event.target)) return
      this.closeMobileMenu()
    },
    handleTapOutside(event) {
      if (!this.showMobileToggle || !this.mobileMenuOpen) return
      const header = document.getElementById('header')
      const toggleButton = document.querySelector('.mobile-nav-toggle')
      if (!header) return
      if (toggleButton && toggleButton.contains(event.target)) return
      if (header.contains(event.target)) return
      this.closeMobileMenu()
    },
    setupSwipeGestures() {
      document.addEventListener('touchstart', this.handleTouchStart, { passive: true })
      document.addEventListener('touchend', this.handleTouchEnd, { passive: true })
    },
    handleTouchStart(event) {
      this.touchStartX = event.changedTouches[0].screenX
      this.touchStartY = event.changedTouches[0].screenY
      this.touchMoveX = this.touchStartX

      // Only attach non-passive touchmove during an active gesture
      document.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    },
    handleTouchEnd(event) {
      this.touchEndX = event.changedTouches[0].screenX
      this.touchEndY = event.changedTouches[0].screenY
      this.handleSwipe()

      // Clean up touchmove listener after gesture completes
      document.removeEventListener('touchmove', this.handleTouchMove)
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
    checkMobileViewport() {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1200
      const mobile = w < 1200
      if (this.showMobileToggle !== mobile) {
        this.showMobileToggle = mobile
        if (!mobile) this.mobileMenuOpen = false
      }
    },
    setupViewportResizeListener() {
      this.debouncedResizeHandler = this.debounce(() => {
        this.checkMobileViewport()
        this.adjustButtonHeights()
      }, 200)
      this.orientationChangeHandler = () => {
        this.checkMobileViewport()
        this.adjustButtonHeights()
      }
      
      window.addEventListener('resize', this.debouncedResizeHandler)
      window.addEventListener('orientationchange', this.orientationChangeHandler)
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

<style>
/* CRITICAL: Non-scoped styles for teleported button */
/* Button is teleported to body, so scoped styles won't apply */
i.mobile-nav-toggle,
.mobile-nav-toggle {
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  z-index: 9998 !important;
  width: 50px !important;
  height: 50px !important;
  min-width: 50px !important;
  min-height: 50px !important;
  max-width: 50px !important;
  max-height: 50px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: rgba(18, 18, 18, 0.95) !important;
  border: 1px solid rgba(139, 92, 246, 0.3) !important;
  border-radius: 50% !important;
  color: rgba(255, 255, 255, 0.8) !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  contain: none !important;
  will-change: auto !important;
  margin: 0 !important;
  padding: 0 !important;
  left: auto !important;
  bottom: auto !important;
  font-family: "bootstrap-icons", system-ui, -apple-system, sans-serif !important;
  font-size: 24px !important;
  line-height: 1 !important;
}

/* Purple overlay on hover - keep dark background visible (use ::after to avoid conflict with icon ::before) */
.mobile-nav-toggle::after {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: rgba(139, 92, 246, 0.15) !important;
  border-radius: 50% !important;
  opacity: 0 !important;
  transition: opacity 0.3s ease !important;
  pointer-events: none !important;
  z-index: 1 !important;
}

.mobile-nav-toggle:hover {
  /* Keep dark background - don't change it on hover */
  background: rgba(18, 18, 18, 0.95) !important;
  border-color: rgba(139, 92, 246, 0.6) !important;
  color: rgba(139, 92, 246, 1) !important;
  box-shadow: 
    0 4px 16px rgba(139, 92, 246, 0.3),
    0 0 20px rgba(139, 92, 246, 0.2) !important;
  transform: scale(1.05) !important;
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  left: auto !important;
  bottom: auto !important;
}

/* Show purple overlay on hover */
.mobile-nav-toggle:hover::after {
  opacity: 1 !important;
}

.mobile-nav-toggle:active {
  transform: scale(0.95) !important;
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  left: auto !important;
  bottom: auto !important;
}

.mobile-nav-toggle.bi::before {
  font-family: "bootstrap-icons" !important;
  font-weight: normal !important;
  font-style: normal !important;
  display: inline-block !important;
  content: "\f479" !important;
  position: relative !important;
  z-index: 2 !important;
  pointer-events: none !important;
}

/* Hamburger is only in DOM on mobile (v-if), so no hide/show media queries needed */
</style>

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
    overflow-y: hidden;
    overflow-x: hidden;
    z-index: 996;
    border-right: 1px solid rgba(139, 92, 246, 0.2);
    /* CRITICAL CLS FIX: Prevent desktop header layout shifts */
    /* Removed paint from contain to avoid breaking position: fixed on siblings */
    contain: layout style;
    /* Reserve space for font loading - prevent text shifts */
    min-height: 100vh;
    font-family: var(--nav-font), system-ui, -apple-system, sans-serif;
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
    transition: left 0.3s ease-in-out;
    /* CRITICAL FIX: Use left instead of transform to avoid breaking position: fixed */
    /* Transform creates containing block that breaks fixed positioning on siblings */
    /* Header always exists, just positioned off-screen using left */
    will-change: left;
    contain: layout style;
    /* Removed paint from contain to avoid containing block issues */
  }

  .header.header-show {
    left: 0;
    /* Use left instead of transform to avoid containing block */
  }
}

/* Navigation Menu */
.navmenu {
  padding: 15px 0 0 0;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* CRITICAL CLS FIX: Reserve space for nav menu to prevent shifts */
  min-height: 100vh;
  contain: layout style;
}

/* NOTE: mobile-nav-toggle styles are in non-scoped <style> block above */
/* Button is teleported to body, so scoped styles don't apply */
</style>
