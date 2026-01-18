<template>
  <div>
    <!-- Hero Section -->
    <Hero />
    
    <!-- About Section -->
    <LazyRender>
      <About />
    </LazyRender>
    
    <!-- Technology Expertise Section -->
    <LazyRender>
      <TechnologyExpertise />
    </LazyRender>
    
    <!-- Stats Section -->
    <LazyRender>
      <Stats />
    </LazyRender>
    
    <!-- Skills Section -->
    <LazyRender>
      <Skills />
    </LazyRender>
    
    <!-- Resume Section -->
    <LazyRender>
      <Resume />
    </LazyRender>
    
    <!-- Portfolio Section -->
    <LazyRender>
      <Portfolio />
    </LazyRender>
    
    <!-- Services Section -->
    <LazyRender>
      <Services />
    </LazyRender>
    
    <!-- FAQ Section -->
    <LazyRender>
      <HomeFAQ />
    </LazyRender>
    
    <!-- Testimonials Section -->
    <LazyRender>
      <Testimonials />
    </LazyRender>
    
    <!-- Contact Section -->
    <LazyRender>
      <Contact />
    </LazyRender>
    
    <!-- Back to Top Button -->
    <BackToTop />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import Hero from '../components/home/Hero.vue'
import BackToTop from '../components/layout/BackToTop.vue'
import LazyRender from '../components/common/LazyRender.vue'

const About = defineAsyncComponent(() => import('../components/home/About.vue'))
const TechnologyExpertise = defineAsyncComponent(() => import('../components/home/TechnologyExpertise.vue'))
const Stats = defineAsyncComponent(() => import('../components/home/Stats.vue'))
const Skills = defineAsyncComponent(() => import('../components/home/Skills.vue'))
const Resume = defineAsyncComponent(() => import('../components/home/Resume.vue'))
const Portfolio = defineAsyncComponent(() => import('../components/home/Portfolio.vue'))
const Services = defineAsyncComponent(() => import('../components/home/Services.vue'))
const Testimonials = defineAsyncComponent(() => import('../components/home/Testimonials.vue'))
const HomeFAQ = defineAsyncComponent(() => import('../components/home/HomeFAQ.vue'))
const Contact = defineAsyncComponent(() => import('../components/home/Contact.vue'))

export default {
  name: 'Home',
  components: {
    Hero,
    LazyRender,
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
  }
}
</script>
