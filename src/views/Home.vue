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
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Stats from '../components/Stats.vue'
import Skills from '../components/Skills.vue'
import Resume from '../components/Resume.vue'
import Portfolio from '../components/Portfolio.vue'
import Services from '../components/Services.vue'
import Testimonials from '../components/Testimonials.vue'
import Contact from '../components/Contact.vue'

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
    Contact
  },
  mounted() {
    // Handle hash navigation when page loads
    this.$nextTick(() => {
      if (this.$route.hash) {
        setTimeout(() => {
          const element = document.querySelector(this.$route.hash)
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 300)
      }
    })
  }
}
</script>
