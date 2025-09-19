<template>
  <div id="app">
    <!-- Navigation Component -->
    <Navigation />
    
    <!-- Main Content -->
    <main>
      <router-view />
    </main>
    
    <!-- Footer Component -->
    <Footer />
    
    <!-- Back to Top Button -->
    <BackToTop />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import BackToTop from './components/BackToTop.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
    BackToTop
  }
}
</script>

<style>
/* Global styles will be imported from main.css */
</style>
