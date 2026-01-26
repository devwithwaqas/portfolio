<template>
  <div id="app">
    <!-- Navigation Component - Fixed position -->
    <Navigation />
    
    <!-- Main Content - Offset by navigation width -->
    <div class="main-content">
      <main>
        <router-view />
      </main>
      
      <!-- Footer Component -->
      <Footer />
    </div>
    
    <!-- Back to Top Button - Outside main-content to avoid containing block issues -->
    <BackToTop />
  </div>
</template>

<script>
import Navigation from './components/layout/Navigation.vue'
import Footer from './components/layout/Footer.vue'
import BackToTop from './components/layout/BackToTop.vue'

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

/* Loading spinner for async route components */
.page-loading {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(139, 92, 246, 0.2);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
