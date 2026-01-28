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

    // Helper function to scroll to a section with proper timing
    const scrollToSection = (sectionId, retryCount = 0) => {
      const maxRetries = 12
      const element = document.getElementById(sectionId)
      
      if (!element) {
        // Element not found - retry if we haven't exceeded max retries
        if (retryCount < maxRetries) {
          setTimeout(() => scrollToSection(sectionId, retryCount + 1), 150 * (retryCount + 1))
        }
        return
      }
      
      // OPTIMIZATION: Batch all layout reads in a single RAF to avoid forced reflows
      // Wait for layout to be stable - use multiple RAFs to ensure content is rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // BATCH ALL LAYOUT READS TOGETHER (single forced reflow)
          // offsetTop doesn't force reflow, but getBoundingClientRect does
          // Use offsetTop as primary (no reflow), only use getBoundingClientRect if needed
          const elementOffsetTop = element.offsetTop
          
          // If offsetTop is 0 and we're not at the hero section, element might not be positioned yet
          if (elementOffsetTop === 0 && sectionId !== 'hero' && retryCount < maxRetries) {
            setTimeout(() => scrollToSection(sectionId, retryCount + 1), 150 * (retryCount + 1))
            return
          }
          
          // Calculate scroll position with header offset
          // Position section at the top of viewport (just below header), not centered
          const headerOffset = 120 // Header + padding offset
          
          // Calculate target scroll position using offsetTop (no forced reflow)
          const targetScrollPosition = elementOffsetTop - headerOffset
          
          // Ensure we're scrolling to a valid position
          if (targetScrollPosition >= 0) {
            // Scroll in next frame to ensure layout is stable
            requestAnimationFrame(() => {
              window.scrollTo({ top: targetScrollPosition, behavior: 'smooth' })
              
              // After smooth scroll completes, verify and fine-tune position
              // Smooth scroll takes ~500ms, so check after that
              // OPTIMIZATION: Batch layout reads in verification too
              setTimeout(() => {
                requestAnimationFrame(() => {
                  // BATCH: Read both layout properties together
                  const finalRect = element.getBoundingClientRect()
                  const finalScrollY = window.pageYOffset || window.scrollY || 0
                  
                  // Check if section top is at the correct position (just below header)
                  const sectionTopInViewport = finalRect.top
                  const idealTopPosition = headerOffset
                  
                  // If section is not at ideal position, adjust to place it at top of viewport
                  if (Math.abs(sectionTopInViewport - idealTopPosition) > 20) {
                    const adjustment = sectionTopInViewport - idealTopPosition
                    window.scrollTo({ 
                      top: finalScrollY + adjustment, 
                      behavior: 'smooth' 
                    })
                  }
                })
              }, 600)
            })
          } else if (retryCount < maxRetries) {
            // Invalid position - retry
            setTimeout(() => scrollToSection(sectionId, retryCount + 1), 150 * (retryCount + 1))
          }
        })
      })
    }

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
            // Hash is already stored in sessionStorage, so it will be handled after reload
            return
          }
          
          // No reload expected - wait for page stability, then scroll once
          await waitForPageStability()
          
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
      // No return section - check for hash fragment
      handleHashFragment()
    }
  }
}
</script>
