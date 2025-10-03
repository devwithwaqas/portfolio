<template>
  <button 
    class="scroll-top"
    :class="{ active: isVisible }"
    @click="scrollToTop"
    title="Back to Top"
    type="button"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isVisible = window.scrollY > 100
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
/* Back to Top Button - Exact match to Hamburger Menu */
.scroll-top {
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  z-index: 9998 !important;
  width: 50px !important;
  height: 50px !important;
  min-width: 50px !important;
  min-height: 50px !important;
  max-width: 50px !important;
  max-height: 50px !important;
  background: rgba(18, 18, 18, 0.9) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(139, 92, 246, 0.3) !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: rgba(255, 255, 255, 0.8) !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
  visibility: hidden;
  opacity: 0;
  transform: translateY(20px);
  padding: 0 !important;
  margin: 0 !important;
  outline: none !important;
  text-decoration: none !important;
  font-size: 20px !important;
  line-height: 1 !important;
}

.scroll-top.active {
  visibility: visible !important;
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.scroll-top:hover {
  background: rgba(139, 92, 246, 0.15) !important;
  border-color: rgba(139, 92, 246, 0.6) !important;
  color: rgba(139, 92, 246, 1) !important;
  box-shadow: 
    0 4px 16px rgba(139, 92, 246, 0.3),
    0 0 20px rgba(139, 92, 246, 0.2) !important;
  transform: translateY(-4px) scale(1.05) !important;
}

.scroll-top:active {
  transform: translateY(-2px) scale(0.95) !important;
}

.scroll-top svg {
  width: 20px !important;
  height: 20px !important;
  flex-shrink: 0 !important;
  stroke: currentColor !important;
  transition: all 0.3s ease !important;
  pointer-events: none !important;
}

/* Reset any pseudo-elements or inherited styles */
.scroll-top::before,
.scroll-top::after {
  display: none !important;
  content: none !important;
}
</style>
