<template>
  <section id="hero" class="hero section">
    <div class="container">
      <div class="row">
        <!-- Profile Card -->
        <div class="hero-profile-side">
          <div class="profile-image-container-side">
            <img src="/assets/img/waqas-microsoft-profile.jpg" :alt="fullName" class="profile-image-side">
          </div>
        </div>
        
        <!-- Content Section -->
        <div class="hero-content">
          <div class="hero-typed">
            <span class="typed-label">Hi, I'm</span>
          </div>
          
          <h1 class="hero-name">
            <span class="name-text">Waqas Ahmad</span>
          </h1>
          
          <h2 class="hero-title">
            <span class="title-prefix">I craft</span>
            <span class="title-name" data-typed-items="Scalable Microservices, Robust APIs, Cloud-Native Solutions, DevOps Excellence">{{ rotating }}</span>
          </h2>
          
          <p class="hero-description">
            <span class="emoji">🚀</span><span class="highlight-text">Building robust APIs</span><span class="emoji">☁️</span><span class="highlight-text">, cloud-native services</span><span class="emoji">⚙️</span><span class="highlight-text">, and DevOps pipelines</span><span class="emoji">🎯</span><span class="highlight-text"> — with a focus on reliability and scale.</span>
          </p>
          
          <!-- Action Buttons -->
          <div class="hero-actions">
            <a href="#portfolio" class="btn btn-primary">
              <i class="fas fa-briefcase"></i>
              <span>View Projects</span>
            </a>
            <a href="#contact" class="btn btn-secondary">
              <i class="fas fa-envelope"></i>
              <span>Get in touch</span>
            </a>
          </div>
          
          <!-- Social Media -->
          <div class="hero-social">
            <a :href="linkedin" class="social-link linkedin" target="_blank" title="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
              <span>LI</span>
            </a>
            <a :href="github" class="social-link github" target="_blank" title="GitHub">
              <i class="fab fa-github"></i>
              <span>GH</span>
            </a>
            <a :href="contactLinks.email" class="social-link email" title="Email">
              <i class="fas fa-envelope"></i>
              <span>EM</span>
            </a>
            <a :href="contactLinks.whatsapp" class="social-link whatsapp" target="_blank" title="WhatsApp">
              <i class="fab fa-whatsapp"></i>
              <span>WA</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    
            <!-- Scroll Hint -->
            <div class="scroll-indicator">
              <div class="scroll-arrow" @click="scrollToNextSection">
                <i class="fas fa-chevron-down"></i>
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { APP_CONFIG } from '../config/constants.js'

export default {
  name: 'Hero',
  data() {
    return {
      ...APP_CONFIG,
      // Rotating text functionality
      phrases: [
        'Scalable Microservices',
        'Robust APIs',
        'Cloud-Native Solutions',
        'DevOps Excellence',
      ],
      i: 0,
      rotating: 'Scalable Microservices',
      rotTimer: null
    }
  },
  mounted() {
    // Start rotating text
    this.rotTimer = setInterval(() => {
      this.i = (this.i + 1) % this.phrases.length
      this.rotating = this.phrases[this.i]
    }, 3000) // Change phrase every 3s
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
