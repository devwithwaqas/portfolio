<template>
  <section id="hero" class="hero section">
    <!-- Animated Background -->
    <div class="hero-background">
      <div class="gradient-overlay"></div>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
    </div>
    
    <div class="container" data-aos="zoom-out">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <!-- Profile Section -->
          <div class="hero-profile">
            <div class="profile-image-container">
              <img src="/assets/img/waqas-microsoft-profile.jpg" :alt="fullName" class="profile-image">
              <div class="profile-glow"></div>
              <div class="profile-ring"></div>
            </div>
          </div>
          
          <!-- Content Section -->
          <div class="hero-content">
            <div class="hero-badge">
              <i class="fas fa-code"></i>
              <span>Available for Projects</span>
            </div>
            
            <h1 class="hero-title">
              <span class="title-line">Hello, I'm</span>
              <span class="title-name">{{ fullName }}</span>
            </h1>
            
            <div class="hero-typed">
              <span class="typed-label">I'm a</span>
              <span class="typed" data-typed-items="Senior Software Engineer, Technical Lead, Full Stack Developer, Azure Cloud Expert, Microservices Architect, API Development Specialist, DevOps Engineer, Enterprise Solution Architect">Senior Software Engineer</span>
              <span class="typed-cursor typed-cursor--blink" aria-hidden="true"></span>
            </div>
            
            <p class="hero-description">
              🚀 Crafting Scalable Microservices | 🔌 Building Robust APIs | ☁️ Azure Cloud Solutions | ⚡ DevOps Excellence
            </p>
            
            <!-- Action Buttons -->
            <div class="hero-actions">
              <a href="#about" class="btn btn-primary">
                <i class="fas fa-user"></i>
                <span>About Me</span>
              </a>
              <a href="#portfolio" class="btn btn-secondary">
                <i class="fas fa-briefcase"></i>
                <span>My Work</span>
              </a>
            </div>
            
            <!-- Social Links -->
            <div class="hero-social">
              <a :href="linkedin" class="social-link linkedin" target="_blank">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a :href="github" class="social-link github" target="_blank">
                <i class="fab fa-github"></i>
              </a>
              <a :href="contactLinks.email" class="social-link email">
                <i class="fas fa-envelope"></i>
              </a>
              <a :href="contactLinks.whatsapp" class="social-link whatsapp" target="_blank">
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <div class="scroll-arrow" @click="scrollToNextSection">
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
  </section>
</template>

<script>
import { APP_CONFIG } from '../config/constants.js'

export default {
  name: 'Hero',
  data() {
    return {
      // VUE PROPER: Import constants instead of deleted personalData.js
      ...APP_CONFIG
    }
  },
  mounted() {
    // Wait for DOM to be ready and Typed.js to be loaded
    this.$nextTick(() => {
      setTimeout(() => {
        if (typeof Typed !== 'undefined') {
          const typedElement = document.querySelector('.typed')
          if (typedElement && !typedElement.typed) {
            new Typed('.typed', {
              strings: [
                'Senior Software Engineer',
                'Technical Lead',
                'Full Stack Developer',
                'Azure Cloud Expert',
                'Microservices Architect',
                'API Development Specialist',
                'DevOps Engineer',
                'Enterprise Solution Architect'
              ],
              typeSpeed: 100,
              backSpeed: 50,
              backDelay: 2000,
              loop: true
            })
          }
        }
      }, 100)
    })
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
