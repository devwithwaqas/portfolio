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
        const seo = getHomePageSEO()
        const BASE_URL = import.meta.env.BASE_URL || '/portfolio/'
        const SITE_URL = 'https://devwithwaqas.github.io/portfolio/'
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
      // Components load immediately (no lazy loading), so scroll immediately after render
      this.$nextTick(() => {
        const element = document.getElementById(returnSection)
        if (element) {
          // Batch all layout reads in one operation to avoid forced reflows
          requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect()
            const scrollY = window.pageYOffset || window.scrollY || 0
            const headerOffset = 100
            const offsetPosition = rect.top + scrollY - headerOffset
            
            // Scroll in next frame
            requestAnimationFrame(() => {
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
              try {
                sessionStorage.removeItem('home:returnSection')
              } catch (error) {
                // Ignore storage errors
              }
            })
          })
        } else {
          // Element not found - try once more after a brief delay
          setTimeout(() => {
            const element = document.getElementById(returnSection)
            if (element) {
              const rect = element.getBoundingClientRect()
              const scrollY = window.pageYOffset || window.scrollY || 0
              const headerOffset = 100
              const offsetPosition = rect.top + scrollY - headerOffset
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
              try {
                sessionStorage.removeItem('home:returnSection')
              } catch (error) {
                // Ignore storage errors
              }
            }
          }, 100)
        }
      })
    }
  }
}
</script>
