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
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    Footer
  }
}
</script>

<style>
/* Global styles will be imported from main.css */
</style>
