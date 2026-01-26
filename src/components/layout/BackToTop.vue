<template>
  <!-- Back to Top Button - Teleported to body to avoid containing block issues -->
  <Teleport to="body">
    <button 
      class="scroll-top"
      :class="{ active: isVisible }"
      @click="scrollToTop"
      title="Back to Top"
      type="button"
      :style="{ 
        position: 'fixed', 
        zIndex: 9998, 
        contain: 'none',
        willChange: 'auto'
      }"
    >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
    </button>
  </Teleport>
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
    let lastScrollY = 0
    
    // CRITICAL: Force fixed positioning via JavaScript as backup
    // Wait a bit longer to ensure Teleport has rendered
    setTimeout(() => {
      const button = document.querySelector('.scroll-top')
      if (button && button.style) {
        // Ensure button is directly in body (Teleport should handle this, but verify)
        if (button.parentElement && button.parentElement !== document.body) {
          document.body.appendChild(button)
        }
        // Force fixed positioning via JavaScript (nuclear option)
        // CRITICAL: Don't set bottom/right here - let CSS media queries handle positioning
        button.style.setProperty('position', 'fixed', 'important')
        button.style.setProperty('z-index', '9998', 'important')
        button.style.setProperty('contain', 'none', 'important')
        button.style.setProperty('will-change', 'auto', 'important')
        
        // Remove any parent transforms that could create containing block
        let parent = button.parentElement
        while (parent && parent !== document.body && parent !== document.documentElement) {
          const computedStyle = window.getComputedStyle(parent)
          if (computedStyle.transform !== 'none' || 
              computedStyle.filter !== 'none' || 
              computedStyle.perspective !== 'none' ||
              computedStyle.willChange !== 'auto') {
            if (parent.style) {
              parent.style.setProperty('transform', 'none', 'important')
              parent.style.setProperty('filter', 'none', 'important')
              parent.style.setProperty('perspective', 'none', 'important')
              parent.style.setProperty('will-change', 'auto', 'important')
            }
          }
          parent = parent.parentElement
        }
      }
    }, 100)
    
    // OPTIMIZATION: Throttled scroll handler with debounce to reduce forced reflows
    // Only read scroll position once per animation frame
    this.scrollHandler = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          // Batch read operation (single reflow) - use cached value if possible
          lastScrollY = window.scrollY || window.pageYOffset || 0
          // Update state only if visibility changes (reduces Vue reactivity overhead)
          const shouldBeVisible = lastScrollY > 100
          if (this.isVisible !== shouldBeVisible) {
            this.isVisible = shouldBeVisible
          }
          ticking = false
        })
      }
    }
    
    window.addEventListener('scroll', this.scrollHandler, { passive: true })
    
    // Initial check - defer to avoid blocking mount
    this.$nextTick(() => {
      lastScrollY = window.scrollY || window.pageYOffset || 0
      this.isVisible = lastScrollY > 100
    })
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

<style>
/* CRITICAL: Non-scoped styles for fixed buttons to ensure they work */
/* These buttons are teleported to body, so scoped styles might not apply correctly */
/* OVERRIDE: Public CSS styles that might conflict */
.scroll-top,
button.scroll-top {
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  z-index: 9998 !important;
  contain: none !important;
  will-change: auto !important;
  /* CRITICAL: Override public CSS that might cause conflicts */
  background: rgba(18, 18, 18, 0.95) !important;
  width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
  /* Prevent duplicate visual artifacts from conflicting transforms */
  overflow: hidden !important;
  isolation: isolate !important;
}

/* Ensure hover effects work on all pages including home - Keep dark background with purple overlay */
.scroll-top:hover,
button.scroll-top:hover {
  /* Keep dark background and add purple overlay - match project pages behavior */
  background: rgba(18, 18, 18, 0.95) !important;
  transform: scale(1.05) translateY(0) !important;
  position: fixed !important;
  /* CRITICAL: Don't override bottom/right - let media queries handle positioning */
  z-index: 9998 !important;
  /* Prevent duplicate visual artifacts */
  overflow: hidden !important;
}

/* Desktop hover - respect desktop positioning */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .scroll-top:hover,
  button.scroll-top:hover {
    right: 30px !important;
    bottom: 30px !important;
  }
}
</style>

<style scoped>
/* Back to Top Button - Exact match to Hamburger Menu */
/* Position relative to VIEWPORT, not any parent container */
.scroll-top {
  /* Position - ALWAYS fixed to viewport, regardless of parent containers */
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  z-index: 9998 !important;
  /* CRITICAL: overflow hidden to prevent visual artifacts */
  overflow: hidden !important;
  /* Ensure it's positioned relative to viewport, not parent */
  /* Remove any transform/perspective/filter from parent that could create containing block */
  width: 50px !important;
  height: 50px !important;
  min-width: 50px !important;
  min-height: 50px !important;
  max-width: 50px !important;
  max-height: 50px !important;
  background: rgba(18, 18, 18, 0.95) !important;
  /* CRITICAL: Removed backdrop-filter - it can create containing blocks that break position: fixed */
  /* backdrop-filter: blur(10px) !important; */
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

/* Purple overlay on hover - keep dark background visible */
.scroll-top::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: rgba(139, 92, 246, 0.15) !important;
  border-radius: 50% !important;
  opacity: 0 !important;
  transition: opacity 0.3s ease !important;
  pointer-events: none !important;
  z-index: 1 !important;
  /* CRITICAL: Ensure it doesn't create visual duplicate */
  transform: none !important;
  will-change: opacity !important;
}

.scroll-top.active {
  visibility: visible !important;
  opacity: 1 !important;
  transform: translateY(0) !important;
  /* CRITICAL: Ensure active state doesn't conflict with hover */
  overflow: hidden !important;
}

.scroll-top:hover,
button.scroll-top:hover,
.scroll-top.active:hover,
button.scroll-top.active:hover {
  /* Keep dark background - don't change it on hover */
  background: rgba(18, 18, 18, 0.95) !important;
  border-color: rgba(139, 92, 246, 0.6) !important;
  color: rgba(139, 92, 246, 1) !important;
  box-shadow: 
    0 4px 16px rgba(139, 92, 246, 0.3),
    0 0 20px rgba(139, 92, 246, 0.2) !important;
  /* CRITICAL: Only scale transform, preserve translateY from active state */
  transform: scale(1.05) translateY(0) !important;
  position: fixed !important;
  /* CRITICAL: Don't override bottom/right - let media queries handle positioning */
  z-index: 9998 !important;
  /* Prevent any duplicate visual artifacts */
  overflow: hidden !important;
}

/* Desktop hover - respect desktop positioning */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .scroll-top:hover,
  button.scroll-top:hover,
  .scroll-top.active:hover,
  button.scroll-top.active:hover {
    right: 30px !important;
    bottom: 30px !important;
  }
}

/* Show purple overlay on hover */
.scroll-top:hover::before,
button.scroll-top:hover::before,
.scroll-top.active:hover::before,
button.scroll-top.active:hover::before {
  opacity: 1 !important;
  /* CRITICAL: Ensure ::before doesn't create duplicate - no transforms */
  transform: none !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
}

.scroll-top:active {
  transform: translateY(-2px) scale(0.95) !important;
  position: fixed !important;
  /* CRITICAL: Don't override bottom/right - let media queries handle positioning */
}

/* Desktop active state - respect desktop positioning */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .scroll-top:active {
    right: 30px !important;
    bottom: 30px !important;
  }
}

.scroll-top svg {
  width: 20px !important;
  height: 20px !important;
  flex-shrink: 0 !important;
  stroke: currentColor !important;
  transition: all 0.3s ease !important;
  pointer-events: none !important;
}

/* Reset any other pseudo-elements */
.scroll-top::after {
  display: none !important;
  content: none !important;
}

/* CRITICAL: Back to Top button - ALWAYS fixed and visible */
/* Default: Show on all views (mobile-first) */
.scroll-top {
  display: flex !important;
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  z-index: 9998 !important;
}

/* Desktop positioning - Keep it in content area, not over nav */
@media (hover: hover) and (pointer: fine) and (min-width: 1200px) {
  .scroll-top {
    right: 30px !important;
    bottom: 30px !important;
    display: flex !important;
    position: fixed !important;
  }
  
  /* Ensure active state also respects desktop positioning */
  .scroll-top.active {
    right: 30px !important;
    bottom: 30px !important;
  }
}

/* FORCE fixed position on ALL non-desktop views (mobile, tablet, touch) */
@media (max-width: 1199px) {
  .scroll-top {
    right: 20px !important;
    bottom: 20px !important;
    display: flex !important;
    position: fixed !important;
    z-index: 9998 !important;
  }
}

/* Also ensure it works on touch devices regardless of width */
@media (pointer: coarse) {
  .scroll-top {
    right: 20px !important;
    bottom: 20px !important;
    display: flex !important;
    position: fixed !important;
    z-index: 9998 !important;
  }
}
</style>
