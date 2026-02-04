<template>
  <section id="hero" class="hero section">
    <div class="container">
      <div class="row">
        <!-- Profile Card -->
        <div class="hero-profile-side">
          <div class="profile-image-container-side">
            <OptimizedImage 
              :src="$assetPath('/assets/img/waqas-microsoft-profile-optimized.jpg')" 
              :alt="`${fullName} - Senior Software Engineer & Technical Lead - Available USA, Europe, Global - 17+ Years Experience`" 
              image-class="profile-image-side"
              container-class="profile-image-container"
              :lazy="false"
              priority="high"
              :image-style="{ width: '100%', height: 'auto' }"
              width="365"
              height="116"
            />
          </div>
        </div>
        
        <!-- Content Section -->
        <div class="hero-content">
          <div class="hero-typed">
            <span class="typed-label txt-label-md">Hi, I'm</span>
          </div>
          
          <h1 class="hero-name txt-h1-6xl">
            <span class="name-text">Waqas Ahmad</span>
          </h1>
          
          <h2 class="hero-title txt-h2-4xl">
            <span class="title-prefix">Senior Software Engineer & Technical Lead</span>
            <span class="title-name" data-typed-items="Scalable Microservices, Robust APIs, Cloud-Native Solutions, DevOps Automation, .NET Enterprise Applications, Azure Cloud Solutions">{{ rotating }}</span>
          </h2>
          
          <!-- Available for Remote Work Badge -->
          <div class="available-badge">
            <span class="badge-text">
              <i class="fas fa-globe" style="margin-right: 8px;"></i>
              <strong>Available for Remote Work</strong> - USA, Europe, Global | Flexible Timezone (EST, PST, GMT, CET) | 17+ Years Experience
            </span>
          </div>
          
          <p class="hero-description txt-p-xl">
            <span class="emoji">🚀</span><span class="highlight-text">Building robust APIs</span><span class="emoji">☁️</span><span class="highlight-text">, cloud-native services</span><span class="emoji">⚙️</span><span class="highlight-text">, and DevOps pipelines</span><span class="emoji">🎯</span><span class="highlight-text"> — with a focus on reliability and scale.</span>
            <br>
            <span class="emoji">🌍</span><span class="highlight-text">Worked with Fortune 500 companies worldwide. Specializing in .NET, Azure Cloud, microservices, and enterprise architecture.</span>
            <br>
            <span class="emoji">💼</span><span class="highlight-text">Available for consulting, freelance, and contract projects.</span>
          </p>
          
          <!-- SEO Keywords - Visually Hidden but Accessible to Search Engines -->
          <div class="visually-hidden" aria-hidden="true">
            Senior Software Engineer and Technical Lead. Remote consulting available globally (USA, Europe, GMT, CET).
          </div>
          
          <!-- Analytics Stats -->
          <AnalyticsStats v-if="showAnalytics" />
          
          <!-- Action Buttons -->
          <div class="hero-actions">
            <a href="#portfolio" class="btn btn-primary txt-btn-lg">
              <i class="fas fa-briefcase icon-md"></i>
              <span>View Projects</span>
            </a>
            <a href="#contact" class="btn btn-secondary txt-btn-lg">
              <i class="fas fa-envelope icon-md"></i>
              <span>Get in touch</span>
            </a>
          </div>
          
          <!-- Social Media -->
          <div class="hero-social">
            <a :href="linkedin" class="social-link linkedin" target="_blank" title="LinkedIn">
              <i class="fab fa-linkedin-in icon-md"></i>
              <span>LI</span>
            </a>
            <a :href="github" class="social-link github" target="_blank" title="GitHub">
              <i class="fab fa-github icon-md"></i>
              <span>GH</span>
            </a>
            <a :href="contactLinks.email" class="social-link email" title="Email">
              <i class="fas fa-envelope icon-md"></i>
              <span>EM</span>
            </a>
            <a :href="contactLinks.whatsapp" class="social-link whatsapp" target="_blank" title="WhatsApp">
              <i class="fab fa-whatsapp icon-md"></i>
              <span>WA</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    
            <!-- Scroll Hint -->
            <div class="scroll-indicator">
              <div class="scroll-arrow" @click="scrollToNextSection">
                <i class="fas fa-chevron-down icon-lg"></i>
              </div>
            </div>
            
            <!-- Rotating Rings -->
            <div class="rings">
              <div class="ring ring-1"></div>
              <div class="ring ring-2"></div>
              <div class="ring ring-3"></div>
              <div class="ring ring-4"></div>
            </div>
          </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { APP_CONFIG } from '../../config/constants.js'
import OptimizedImage from '../common/OptimizedImage.vue'

const AnalyticsStats = defineAsyncComponent(() => import('./AnalyticsStats.vue'))

export default {
  name: 'Hero',
  components: {
    AnalyticsStats,
    OptimizedImage
  },
  data() {
    return {
      ...APP_CONFIG,
      // Rotating text functionality - Technology focus areas
      phrases: [
        'Scalable Microservices',
        'Robust APIs',
        'Cloud-Native Solutions',
        'DevOps Automation',
        '.NET Enterprise Applications',
        'Azure Cloud Solutions',
        'API Development',
        'Microservices Architecture',
        '.NET Core Solutions',
        'RESTful API Design'
      ],
      i: 0,
      rotating: 'Scalable Microservices',
      rotTimer: null,
      showAnalytics: false,
      animationsStarted: false // Track if animations have been started
    }
  },
  mounted() {
    // TEMPORARILY DISABLED: LCP inline image fix - troubleshooting
    // MOBILE LCP FIX: Move inline hero image into hero section
    // this.$nextTick(() => {
    //   const inlineImage = document.getElementById('hero-image-inline')
    //   const imageContainer = this.$el.querySelector('.profile-image-container-side')
    //   
    //   if (inlineImage && imageContainer) {
    //     // Move inline image into the hero section container
    //     imageContainer.insertBefore(inlineImage, imageContainer.firstChild)
    //   }
    // })
    
    // LCP OPTIMIZATION: Don't start animations on mount
    // Wait for LCP to complete before starting animations
    
    // Start animations after LCP (not just page load)
    const startAnimations = () => {
      if (this.animationsStarted) return
      this.animationsStarted = true
      
      // Add class to enable CSS animations
      if (this.$el) {
        this.$el.classList.add('animations-active')
      }
      
      // Start rotating text
      this.rotTimer = setInterval(() => {
        this.i = (this.i + 1) % this.phrases.length
        this.rotating = this.phrases[this.i]
      }, 3000) // Change phrase every 3s
    }
    
    // OPTIMIZATION: Animations already deferred to user interaction (touch/click)
    // No need to wait for LCP - animations only start on interaction
    // This keeps the code simple and avoids PerformanceObserver overhead
    
    // Also start on first user interaction (touch/click/scroll)
    const interactionEvents = ['touchstart', 'click', 'scroll', 'mousemove']
    const onInteraction = () => {
      if (!this.animationsStarted) {
        startAnimations()
        interactionEvents.forEach(event => {
          window.removeEventListener(event, onInteraction, { passive: true })
        })
      }
    }
    interactionEvents.forEach(event => {
      window.addEventListener(event, onInteraction, { passive: true, once: true })
    })

    const runWhenIdle = (callback) => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout: 2000 })
      } else {
        setTimeout(callback, 1000)
      }
    }

    runWhenIdle(() => {
      this.showAnalytics = true
    })
    
    // DEBUG CODE REMOVED - Was causing forced reflows:
    // - Multiple getComputedStyle() calls
    // - MutationObserver calling getComputedStyle() on every style change
    // - setInterval calling getComputedStyle() every 3 seconds
    // This was contributing to Style & Layout work (923ms)
  },
  beforeUnmount() {
    if (this.rotTimer) {
      clearInterval(this.rotTimer)
    }
  },
  methods: {
    scrollToNextSection() {
      // Find the next section after hero (usually About section)
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        aboutSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        // Fallback: scroll down by viewport height
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style scoped>
/* TEMPORARILY DISABLED: LCP inline image fix - troubleshooting page visibility */
/* Ensure image is always visible */
.hero-profile-side .optimized-image-container {
  display: block !important;
}
</style>
