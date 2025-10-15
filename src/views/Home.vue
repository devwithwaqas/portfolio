<template>
  <div>
    <!-- Hero Section -->
    <Hero />
    
    <!-- About Section -->
    <About />
    
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
import About from '../components/home/About.vue'
import Stats from '../components/home/Stats.vue'
import Skills from '../components/home/Skills.vue'
import Resume from '../components/home/Resume.vue'
import Portfolio from '../components/home/Portfolio.vue'
import Services from '../components/home/Services.vue'
import Testimonials from '../components/home/Testimonials.vue'
import Contact from '../components/home/Contact.vue'
import BackToTop from '../components/layout/BackToTop.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    About,
    Stats,
    Skills,
    Resume,
    Portfolio,
    Services,
    Testimonials,
    Contact,
    BackToTop
  },
  mounted() {
    // VUE ROUTER: Hash navigation is already handled by router/index.js scrollBehavior
    // No need to duplicate DOM manipulation here - Vue Router handles this properly
  }
}
</script>
