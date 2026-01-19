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
import Hero from '../components/home/Hero.vue'
import BackToTop from '../components/layout/BackToTop.vue'
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

    // Generate structured data for SEO with reviews (defer to idle)
    runWhenIdle(async () => {
      const [{ generateHomePageStructuredData }, { testimonialsData }] = await Promise.all([
        import('../utils/structuredData.js'),
        import('../config/testimonials.js')
      ])
      generateHomePageStructuredData(testimonialsData)
    })

    // Handle scroll restoration for back navigation
    const navEntry = performance.getEntriesByType('navigation')[0]
    const navType = navEntry ? navEntry.type : 'navigate'

    if (navType === 'back_forward') {
      // Let browser handle scroll restoration naturally
      // Clear any stored state
      try {
        sessionStorage.removeItem('home:returnSection')
        sessionStorage.removeItem('home:forceAll')
      } catch (error) {
        // Ignore storage errors
      }
    }

    if (navType === 'reload') {
      // On reload, DON'T clear scroll - let browser restore it
      // Only clear return section flags
      try {
        sessionStorage.removeItem('home:returnSection')
        sessionStorage.removeItem('home:forceAll')
      } catch (error) {
        // Ignore storage errors
      }
    }

    // Handle return section scrolling (from project/service pages)
    const returnSection = (() => {
      try {
        return sessionStorage.getItem('home:returnSection')
      } catch (error) {
        return null
      }
    })()

    if (returnSection) {
      const scrollToSection = () => {
        const element = document.getElementById(returnSection)
        if (element) {
          const headerOffset = 100
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
          try {
            sessionStorage.removeItem('home:returnSection')
          } catch (error) {
            // Ignore storage errors
          }
        }
      }

      // Wait for content to render
      setTimeout(scrollToSection, 500)
    }
  }
}
</script>
