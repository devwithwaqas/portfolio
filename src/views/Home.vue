<template>
  <div>
    <!-- Hero Section -->
    <Hero />
    
    <!-- About Section -->
    <About />
    
    <!-- Technology Expertise Section -->
    <TechnologyExpertise />
    
    <!-- Stats Section -->
    <Stats />
    
    <!-- Skills Section -->
    <Skills />
    
    <!-- Resume Section -->
    <Resume />
    
    <!-- Portfolio Section -->
    <Portfolio />
    
    <!-- Services Section -->
    <Services />
    
    <!-- FAQ Section -->
    <HomeFAQ />
    
    <!-- Testimonials Section -->
    <Testimonials />
    
    <!-- Contact Section -->
    <Contact />
    
    <!-- Back to Top Button -->
    <BackToTop />
  </div>
</template>

<script>
// All components load immediately (no lazy loading to avoid scroll issues)
// Internal images/charts within components can still be lazy loaded
import Hero from '../components/home/Hero.vue'
import About from '../components/home/About.vue'
import TechnologyExpertise from '../components/home/TechnologyExpertise.vue'
import Stats from '../components/home/Stats.vue'
import Skills from '../components/home/Skills.vue'
import Resume from '../components/home/Resume.vue'
import Portfolio from '../components/home/Portfolio.vue'
import Services from '../components/home/Services.vue'
import Testimonials from '../components/home/Testimonials.vue'
import HomeFAQ from '../components/home/HomeFAQ.vue'
import Contact from '../components/home/Contact.vue'
import BackToTop from '../components/layout/BackToTop.vue'
import { scrollToSection as scrollToSectionUtil } from '../utils/scrollToSection.js'

export default {
  name: 'Home',
  components: {
    Hero,
    About,
    TechnologyExpertise,
    Stats,
    Skills,
    Resume,
    Portfolio,
    Services,
    Testimonials,
    HomeFAQ,
    Contact,
    BackToTop
  },
  data() {
    return {
      isScrollingToSection: false, // Flag to prevent double-scroll
      lastScrolledSection: null, // Track last section to prevent duplicate scrolls
      scrollTimeout: null // Timeout reference for cleanup
    }
  },
  watch: {
    // Watch for hash changes when navigating from other pages
    '$route.hash'(newHash, oldHash) {
      // Only process if hash actually changed and we're on home page
      if (newHash && newHash !== oldHash && this.$route.path === '/') {
        const sectionId = newHash.substring(1) // Remove '#'
        this.handleHashNavigation(sectionId, 'hash-watcher')
      } else if (!newHash && oldHash && this.$route.path === '/') {
        // Hash was removed - clear flags
        this.clearScrollFlags()
      }
    },
    // Also watch for route path changes (when navigating from other pages to home)
    '$route.path'(newPath, oldPath) {
      // If we just navigated TO home from another page, check for hash
      if (newPath === '/' && oldPath !== '/' && this.$route.hash) {
        const sectionId = this.$route.hash.substring(1)
        this.handleHashNavigation(sectionId, 'path-watcher')
      }
    }
  },
  methods: {
    handleHashNavigation(sectionId, source) {
      // Prevent double-scroll: if already scrolling to this section, ignore
      if (this.isScrollingToSection && this.lastScrolledSection === sectionId) {
        return
      }
      
      const validSections = ['hero', 'about', 'technology-expertise', 'skills', 'resume', 'portfolio', 'services', 'contact']
      if (!validSections.includes(sectionId)) {
        return
      }
      
      // Set flags to prevent duplicate scrolls
      this.isScrollingToSection = true
      this.lastScrolledSection = sectionId
      
      // Clear any existing timeout
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout)
      }
      
      // Mark as pending in sessionStorage (for mounted() fallback)
      try {
        sessionStorage.setItem('home:hashSection', sectionId)
        sessionStorage.setItem('home:scrollPending', 'true')
      } catch (e) {
        // Ignore storage errors
      }
      
      // Unified behavior: show home at top briefly, then scroll to section
      // path-watcher = from another page (user sees top then scroll); hash-watcher = same page
      const delay = source === 'path-watcher' ? 250 : 100
      
      this.$nextTick(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (delay > 0) {
              this.scrollTimeout = setTimeout(() => {
                this.performScroll(sectionId)
              }, delay)
            } else {
              this.performScroll(sectionId)
            }
          })
        })
      })
    },
    performScroll(sectionId) {
      scrollToSectionUtil(sectionId)
      
      // Reset flags after scroll completes (smooth scroll takes ~500ms)
      setTimeout(() => {
        this.isScrollingToSection = false
        this.clearScrollFlags()
      }, 600)
    },
    clearScrollFlags() {
      try {
        sessionStorage.removeItem('home:scrollPending')
        // Don't remove home:hashSection here - mounted() might need it
      } catch (e) {
        // Ignore storage errors
      }
    }
  },
  mounted() {
    const runWhenIdle = (callback) => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout: 2000 })
      } else {
        setTimeout(callback, 1000)
      }
    }

    // Set dynamic SEO meta tags (router sets basic SEO, but we enhance it here)
    runWhenIdle(async () => {
      try {
        const { setPageSEO, getHomePageSEO } = await import('../utils/seo.js')
        const { SITE_URL } = await import('../config/constants.js')
        const seo = getHomePageSEO()
        setPageSEO({
          ...seo,
          url: SITE_URL
        })
      } catch (error) {
        // Silently fail - SEO is optional
        console.warn('[Home] Failed to set SEO:', error.message)
      }
    })

    // Generate structured data for SEO with reviews (defer to idle)
    runWhenIdle(async () => {
      try {
        const [{ generateHomePageStructuredData }, { testimonialsData }] = await Promise.all([
          import('../utils/structuredData.js'),
          import('../config/testimonials.js')
        ])
        generateHomePageStructuredData(testimonialsData)
      } catch (error) {
        // Silently fail - structured data is optional for SEO, not critical for functionality
        console.warn('[Home] Failed to generate structured data:', error.message)
      }
    })

    // Handle scroll restoration - CRITICAL: Only restore on navigation, NOT on refresh
    const navEntry = performance.getEntriesByType('navigation')[0]
    const navType = navEntry ? navEntry.type : 'navigate'

    // On reload/refresh: Clear all scroll restoration flags (let browser handle natural scroll)
    if (navType === 'reload') {
      try {
        sessionStorage.removeItem('home:returnSection')
        sessionStorage.removeItem('home:forceAll')
        // Also clear any saved scroll positions to prevent restoration on refresh
        sessionStorage.removeItem('scroll:/')
      } catch (error) {
        // Ignore storage errors
      }
      // Don't restore scroll on refresh - let browser handle it naturally
      return
    }

    // On back/forward navigation: Let browser handle scroll restoration naturally
    if (navType === 'back_forward') {
      try {
        sessionStorage.removeItem('home:returnSection')
        sessionStorage.removeItem('home:forceAll')
      } catch (error) {
        // Ignore storage errors
      }
      // Browser will handle scroll restoration for back/forward
      return
    }

    // Use centralized scroll utility for uniform behavior
    const scrollToSection = scrollToSectionUtil

    // Handle hash fragments from URL (e.g., #resume)
    // Smart reload detection: prevents double-scroll by waiting for page stability
    const handleHashFragment = async () => {
      let hash = window.location.hash
      let sectionId = null
      
      // If hash exists in URL, use it and store it
      if (hash) {
        sectionId = hash.substring(1)
        // Always store in sessionStorage as backup (survives reloads)
        try {
          sessionStorage.setItem('home:hashSection', sectionId)
          // Mark that we have a pending scroll (prevents double-scroll)
          sessionStorage.setItem('home:scrollPending', 'true')
        } catch (e) {
          // Ignore storage errors
        }
      } else {
        // No hash in URL - check sessionStorage (might have been lost during reload)
        try {
          const storedSection = sessionStorage.getItem('home:hashSection')
          const scrollPending = sessionStorage.getItem('home:scrollPending')
          if (storedSection && scrollPending === 'true') {
            sectionId = storedSection
            // Restore hash in URL (for better UX and browser history)
            window.history.replaceState(null, '', `#${storedSection}`)
          }
        } catch (e) {
          // Ignore storage errors
        }
      }
      
      if (sectionId) {
        const validSections = ['hero', 'about', 'technology-expertise', 'skills', 'resume', 'portfolio', 'services', 'contact']
        
        if (validSections.includes(sectionId)) {
          // Check if reload is likely (service worker update, etc.)
          const isReloadLikely = await checkIfReloadLikely()
          
          if (isReloadLikely) {
            // Reload is likely - skip scroll now, will scroll after reload
            return
          }
          
          // No reload: short delay for layout (cross-page hash nav), not 2s
          await new Promise(r => setTimeout(r, 350))
          
          // Check again if scroll is still pending (might have been cleared by reload)
          try {
            const scrollPending = sessionStorage.getItem('home:scrollPending')
            if (scrollPending !== 'true') {
              // Scroll was already handled or cancelled
              return
            }
          } catch (e) {
            // Ignore storage errors
          }
          
          // Wait for Vue to render all components
          this.$nextTick(() => {
            // Wait for next tick to ensure all child components are mounted
            this.$nextTick(() => {
              // Wait longer for layout to stabilize - especially important for sections near bottom
              setTimeout(() => {
                // Wait for browser layout
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    // Additional delay for sections that might have lazy-loaded content
                    const additionalDelay = sectionId === 'resume' || sectionId === 'portfolio' || sectionId === 'services' || sectionId === 'contact' ? 200 : 100
                    
                    setTimeout(() => {
                      // Final check and scroll - this ensures all sections are properly positioned
                      scrollToSection(sectionId)
                      // Clear flags after successful scroll
                      try {
                        sessionStorage.removeItem('home:hashSection')
                        sessionStorage.removeItem('home:scrollPending')
                      } catch (e) {
                        // Ignore storage errors
                      }
                    }, additionalDelay)
                  })
                })
              }, 200)
            })
          })
        }
      }
    }
    
    // Check if a page reload is likely (service worker update, router chunk error, etc.)
    const checkIfReloadLikely = async () => {
      try {
        // Check for router chunk reload (matches router/index.js CHUNK_RELOAD_KEY)
        const chunkReloadKey = 'portfolio_chunk_reload'
        const hasChunkReload = sessionStorage.getItem(chunkReloadKey)
        if (hasChunkReload) {
          return true
        }
      } catch (e) {
        // Ignore storage errors
      }
      
      if (import.meta.env.DEV) {
        // In dev, service workers are unregistered, so no SW reload expected
        return false
      }
      
      try {
        
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations()
          for (const registration of registrations) {
            // Check if there's a waiting service worker (update pending)
            if (registration.waiting) {
              return true
            }
            // Check if there's an installing service worker
            if (registration.installing) {
              return true
            }
            // Listen for updatefound event (new SW version detected)
            registration.addEventListener('updatefound', () => {
              // Mark that reload is coming
              try {
                sessionStorage.setItem('home:reloadExpected', 'true')
              } catch (e) {}
            })
          }
          
          // Check if we just detected a reload is expected
          const reloadExpected = sessionStorage.getItem('home:reloadExpected')
          if (reloadExpected === 'true') {
            sessionStorage.removeItem('home:reloadExpected')
            return true
          }
        }
      } catch (e) {
        // Ignore errors - assume no reload
      }
      
      return false
    }
    
    // Wait for page to be stable (no reloads for a period)
    const waitForPageStability = () => {
      return new Promise((resolve) => {
        // Wait 2 seconds to ensure no reload happens
        // If reload happens, this promise won't resolve (page will reload)
        const stabilityTimeout = setTimeout(() => {
          resolve()
        }, 2000)
        
        // If page is about to unload, clear timeout (reload is happening)
        const beforeUnloadHandler = () => {
          clearTimeout(stabilityTimeout)
        }
        window.addEventListener('beforeunload', beforeUnloadHandler, { once: true })
      })
    }

    // Only restore scroll position when coming from another page (navigation, not refresh)
    // Handle return section scrolling (from project/service pages)
    const returnSection = (() => {
      try {
        return sessionStorage.getItem('home:returnSection')
      } catch (error) {
        return null
      }
    })()

    // Check for hash in URL first (takes priority over returnSection for explicit navigation)
    // Only process if watchers haven't already handled it
    const hash = window.location.hash || this.$route.hash
    const hashSectionId = hash ? hash.substring(1) : null
    
    if (hashSectionId) {
      const validSections = ['hero', 'about', 'technology-expertise', 'skills', 'resume', 'portfolio', 'services', 'contact']
      if (validSections.includes(hashSectionId)) {
        // Check if this was already handled by watchers (prevent double-scroll)
        const scrollPending = (() => {
          try {
            return sessionStorage.getItem('home:scrollPending') === 'true'
          } catch (e) {
            return false
          }
        })()
        
        // Only scroll if not already handled by watchers
        if (!scrollPending && !this.isScrollingToSection) {
          this.handleHashNavigation(hashSectionId, 'mounted')
        }
        return // Don't process returnSection if we have a hash
      }
    }
    
    // If no hash, check for return section (from router's beforeEach)
    if (returnSection) {
      // Components load immediately (no lazy loading), so scroll after render
      this.$nextTick(() => {
        scrollToSection(returnSection)
        try {
          sessionStorage.removeItem('home:returnSection')
        } catch (error) {
          // Ignore storage errors
        }
      })
    } else {
      // No return section and no hash - check for hash fragment in sessionStorage (fallback)
      handleHashFragment()
    }
  }
}
</script>
