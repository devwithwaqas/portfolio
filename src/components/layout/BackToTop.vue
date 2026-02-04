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
    let ticking = false
    
    // Throttled scroll handler - only updates once per frame
    this.scrollHandler = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          // Batch read operation (single reflow)
          const scrollY = window.scrollY
          // Then update state
          this.isVisible = scrollY > 100
          ticking = false
        })
      }
    }
    
    window.addEventListener('scroll', this.scrollHandler, { passive: true })
    
    // Initial check
    this.isVisible = window.scrollY > 100
  },
  beforeUnmount() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler)
    }
  },
  methods: {
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

/* Desktop positioning - Keep it in content area, not over nav */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .scroll-top {
    right: 30px !important;
    bottom: 30px !important;
  }
}

/* Mobile/Touch positioning */
@media (pointer: coarse), (max-width: 1199px) {
  .scroll-top {
    right: 20px !important;
    bottom: 20px !important;
  }
}
</style>
