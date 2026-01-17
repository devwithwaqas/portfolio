<template>
  <div class="col-xxl-120-30 col-xl-120-40 col-lg-120-40 col-md-120-60 col-sm-120-120 col-xs-120-120 col-us-120-120 col-120-120 portfolio-item isotope-item filter-app" style="background: transparent !important; border: none !important; box-shadow: none !important;">
    <div class="card-wrapper" :data-card-id="uniqueId">
      <div class="card-container">
        <div class="epic-card" :data-card-id="uniqueId">
          <!-- SVG Border Animation -->
          <svg class="border-overlay" viewBox="0 0 400 570" preserveAspectRatio="none">
            <defs>
              <filter :id="glowId" x="-300%" y="-300%" width="600%" height="600%">
                <feGaussianBlur stdDeviation="8" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <linearGradient :id="gradientAId" x1="0" x2="1">
                <stop offset="0" stop-color="#00e5ff"/>
                <stop offset="1" stop-color="#00ffd6"/>
              </linearGradient>
              <linearGradient :id="gradientBId" x1="0" x2="1">
                <stop offset="0" stop-color="#ff2aff"/>
                <stop offset="1" stop-color="#ff6bf5"/>
              </linearGradient>
            </defs>
            <path ref="track" d="" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="16" stroke-linecap="round" />
            <path ref="seg1" d="" :stroke="`url(#${gradientAId})`" stroke-width="70" fill="none" stroke-linecap="round" :filter="`url(#${glowId})`" />
            <path ref="seg2" d="" :stroke="`url(#${gradientBId})`" stroke-width="70" fill="none" stroke-linecap="round" :filter="`url(#${glowId})`" />
          </svg>
          
          <!-- Tech Stack Row -->
          <div class="tech-stack-section">
            <div class="built-with-text txt-label-xs">Built with</div>
            <div class="tech-stack-row">
              <div v-for="(tech, index) in techStack" :key="index" class="tech-icon-box">
                <LazyImage 
                  :src="tech.icon" 
                  :alt="`${tech.name} - ${title} - Enterprise Development`" 
                  image-class="tech-stack-icon icon-img-md"
                  container-class="tech-icon-container"
                />
              </div>
            </div>
          </div>
          
          <!-- Main Banner -->
          <div class="banner-section">
            <LazyImage 
              :src="bannerImage" 
              :alt="`${title} - ${subtitle} - Remote Consultant - Available USA, Europe, Global`" 
              image-class="banner-img"
              container-class="banner-image-container"
            />
            <div class="banner-overlay"></div>
          </div>
          
          <!-- Content Section -->
          <div class="content-section">
            <div class="project-header">
              <div class="text-overlay"></div>
              <h3 class="project-title txt-h3-xl">{{ title }}</h3>
              <p class="project-subtitle txt-p-sm">{{ subtitle }}</p>
            </div>
            
            <!-- Action Buttons -->
            <div class="action-section">
              <div class="epic-buttons">
                <button class="button preview-btn" @click="openPreview">
                  <span class="button_lg">
                    <span class="button_sl"></span>
                    <span class="button_text txt-btn-sm">Preview</span>
                  </span>
                </button>
                <router-link :to="detailsLink" title="More Details" class="button details-btn">
                  <span class="button_lg">
                    <span class="button_sl"></span>
                    <span class="button_text txt-btn-sm">Details</span>
                  </span>
                </router-link>
              </div>
            </div>
            
            <!-- Image Preview Modal -->
            <ImagePreview 
              ref="imagePreview"
              :imageSrc="bannerImage" 
              :imageAlt="title"
            />
          </div>
          
          <!-- Glow Effect -->
          <div class="card-glow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImagePreview from './ImagePreview.vue'
import LazyImage from './LazyImage.vue'

export default {
  name: 'EpicCard',
  components: {
    ImagePreview,
    LazyImage
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    bannerImage: {
      type: String,
      required: true
    },
    detailsLink: {
      type: String,
      required: true
    },
    techStack: {
      type: Array,
      required: true,
      // Array of objects: [{ name: 'Angular', icon: 'path/to/icon.svg' }]
    }
  },
  data() {
    return {
      borderResizeObserver: null,
      intersectionObserver: null,
      animationFrame: null,
      animationStart: null,
      isPaused: false,
      isTouchAnimating: false,
      lastTapTime: 0,
      touchStartX: 0,
      touchStartY: 0,
      touchMoved: false,
      uniqueId: `epic-${Math.random().toString(36).substr(2, 9)}`,
      resizeTimeout: null
    }
  },
  computed: {
    glowId() {
      return `glow-${this.uniqueId}`
    },
    gradientAId() {
      return `gA-${this.uniqueId}`
    },
    gradientBId() {
      return `gB-${this.uniqueId}`
    }
  },
  mounted() {
    this.initBorderAnimation()
  },
  beforeUnmount() {
    // Clean up all observers and animations
    if (this.borderResizeObserver) {
      this.borderResizeObserver.disconnect()
      this.borderResizeObserver = null
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
      this.intersectionObserver = null
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = null
    }
  },
  methods: {
    openPreview() {
      this.$refs.imagePreview.show()
    },
    initBorderAnimation() {
      // VUE NATIVE SOLUTION: No more direct DOM querying to avoid forced reflows
      this.$nextTick(() => {
        const vm = this
        
        // Use $refs for proper Vue component isolation
        const track = this.$refs.track
        const seg1 = this.$refs.seg1  
        const seg2 = this.$refs.seg2

        if (!track || !seg1 || !seg2) {
          return
        }

        // Get actual card dimensions to build path
        const card = vm.$el.querySelector(`.epic-card[data-card-id="${vm.uniqueId}"]`)
        const cardWrapper = vm.$el.querySelector(`.card-wrapper[data-card-id="${vm.uniqueId}"]`)
        const borderOverlay = vm.$el.querySelector('.border-overlay')
        
        if (!card || !cardWrapper || !borderOverlay) return
        
        // Cache for expensive operations
        let cachedWrapperPadding = null
        let lastCardSize = { width: 0, height: 0 }
        
        // Calculate aspect ratio and adjust offsets dynamically
        function updateSVGPosition() {
          const rect = card.getBoundingClientRect()
          
          // Skip update if size hasn't changed significantly (within 1px tolerance)
          if (Math.abs(rect.width - lastCardSize.width) < 1 && Math.abs(rect.height - lastCardSize.height) < 1) {
            return
          }
          lastCardSize = { width: rect.width, height: rect.height }
          
          // Cache wrapper padding to avoid repeated getComputedStyle calls
          if (cachedWrapperPadding === null) {
            const wrapperStyle = getComputedStyle(cardWrapper)
            cachedWrapperPadding = parseFloat(wrapperStyle.getPropertyValue('--wrapper-padding')) || 20.25
          }
          
          // Calculate desired stroke in pixels (105% of padding)
          const desiredStrokePx = cachedWrapperPadding * 1.05
          
          // Convert to viewBox units: (desiredPx / actualWidth) × viewboxWidth
          const viewboxWidth = 400
          const viewboxHeight = 570
          const strokeWidthViewbox = (desiredStrokePx / rect.width) * viewboxWidth
          
          const baseOffset = 10
          
          // Update the actual SVG stroke-width attributes dynamically
          seg1.setAttribute('stroke-width', strokeWidthViewbox)
          seg2.setAttribute('stroke-width', strokeWidthViewbox)
          track.setAttribute('stroke-width', strokeWidthViewbox * 0.23) // Track is ~23% of main stroke
          
          // Calculate actual stroke width in pixels for EACH dimension separately
          // This is the key: stroke scales differently in X and Y directions
          const strokeFullHorizontal = (strokeWidthViewbox / viewboxWidth) * rect.width
          const strokeHalfHorizontal = strokeFullHorizontal / 2
          
          const strokeFullVertical = (strokeWidthViewbox / viewboxHeight) * rect.height
          const strokeHalfVertical = strokeFullVertical / 2
          
          // Horizontal offset: use horizontal stroke calculation
          // Don't multiply by aspectRatio - just add the full strokeHalf
          const horizontalOffset = baseOffset + strokeHalfHorizontal
          
          // Vertical offset: use vertical stroke calculation (not affected by aspect ratio)
          const verticalOffset = baseOffset + strokeHalfVertical
          
          // Apply calculated offsets
          borderOverlay.style.top = `-${verticalOffset}px`
          borderOverlay.style.left = `-${horizontalOffset}px`
          borderOverlay.style.width = `calc(100% + ${horizontalOffset * 2}px)`
          borderOverlay.style.height = `calc(100% + ${verticalOffset * 2}px)`
        }
        
        // Initial position update
        updateSVGPosition()

        function buildPath() {
          // Use viewBox coordinates (400x570), not pixel dimensions
          // The SVG scales automatically with preserveAspectRatio="none"
          const w = 400
          const h = 570
          const r = 36 // Border radius - 6x the original to create smooth rounded corners
          const inset = 0 // No inset - follow card edges exactly
          
          // Rounded corners path with smooth arcs
          return `M${r+inset},${inset} 
                  L${w-r-inset},${inset} 
                  Q${w-inset},${inset} ${w-inset},${r+inset} 
                  L${w-inset},${h-r-inset} 
                  Q${w-inset},${h-inset} ${w-r-inset},${h-inset} 
                  L${r+inset},${h-inset} 
                  Q${inset},${h-inset} ${inset},${h-r-inset} 
                  L${inset},${r+inset} 
                  Q${inset},${inset} ${r+inset},${inset} Z`
        }

        const d = buildPath();
        [track, seg1, seg2].forEach(el => el.setAttribute('d', d))
        
        // Wait for SVG to render before getting length
        setTimeout(() => {
          const P = track.getTotalLength()
          
          if (!P || P === 0) {
            console.warn('SVG path length is 0, skipping animation')
            return
          }
          
          const SEG_WANTED = 700
          const SPEED = 600
          const SEG_LEN = Math.min(SEG_WANTED, P * 0.3)
          const gap = P - SEG_LEN
          const dash = `${SEG_LEN} ${gap}`
          
          // Set stroke patterns WITH RAF to avoid forced reflows
          requestAnimationFrame(() => {
            seg1.style.strokeDasharray = dash
            seg2.style.strokeDasharray = dash
            seg1.style.strokeDashoffset = '0'
            seg2.style.strokeDashoffset = `-${P / 2}`
          })
          
          // Now set up the animation step function with the correct P value
          setupAnimation(P, SPEED)
        }, 100)
        
        function setupAnimation(P, SPEED) {
        
        const step = (ts) => {
          // Check if animations are paused globally
          if (window.animationController && window.animationController.animationPaused) {
            vm.isPaused = true
            vm.animationFrame = requestAnimationFrame(step)
            return
          }
          
          if (vm.isPaused) {
            vm.animationStart = ts - (vm.animationStart || 0)
            vm.isPaused = false
          }
          
          if (!vm.animationStart) vm.animationStart = ts
          
          // IMPROVED: Direct style assignment bundled to avoid forced reflow
          const dist = ((ts - vm.animationStart) / 1000 * SPEED) % P
          seg1.style.strokeDashoffset = -dist
          seg2.style.strokeDashoffset = -(dist + P / 2)
          
          vm.animationFrame = requestAnimationFrame(step)
        }
        
        const startAnim = () => { 
          if (!vm.animationFrame) { 
            vm.animationStart = 0
            vm.animationFrame = requestAnimationFrame(step)
          } 
        }
        
        const stopAnim = () => { 
          if (vm.animationFrame) {
            cancelAnimationFrame(vm.animationFrame)
            vm.animationFrame = null
          }
        }

        // Event listeners setup
        if (card && borderOverlay && cardWrapper) {
            // Mouse-triggered animation for all devices
            card.addEventListener('mouseenter', () => {
              requestAnimationFrame(() => {
                if (borderOverlay) {
                  borderOverlay.style.opacity = '1'
                }
              })
              startAnim()
            })
            
            card.addEventListener('mouseleave', () => {
              requestAnimationFrame(() => {
                if (borderOverlay) {
                  borderOverlay.style.opacity = '0'
                }
              })
              stopAnim()
            })
            
            // Touch devices: Toggle animation on tap (persistent until tapped again)
            // Detect drag vs tap to prevent accidental animation triggers
            card.addEventListener('touchstart', (e) => {
              vm.touchStartX = e.touches[0].clientX
              vm.touchStartY = e.touches[0].clientY
              vm.touchMoved = false
            })
            
            card.addEventListener('touchmove', (e) => {
              const touchX = e.touches[0].clientX
              const touchY = e.touches[0].clientY
              const deltaX = Math.abs(touchX - vm.touchStartX)
              const deltaY = Math.abs(touchY - vm.touchStartY)
              
              // If moved more than 10px, it's a drag
              if (deltaX > 10 || deltaY > 10) {
                vm.touchMoved = true
              }
            })
            
            card.addEventListener('touchend', (e) => {
              // Ignore if it was a drag
              if (vm.touchMoved) {
                return
              }
              
              const currentTime = new Date().getTime()
              const tapInterval = currentTime - vm.lastTapTime
              
              // Detect double-tap (taps within 300ms)
              if (tapInterval < 300 && tapInterval > 0) {
                // Double-tap: do nothing
                return
              }
              
              vm.lastTapTime = currentTime
              
              // Check current animation state from the DOM
              const isCurrentlyAnimating = borderOverlay && borderOverlay.style.opacity === '1'
              
              // Toggle based on ACTUAL current state, not flag
              vm.isTouchAnimating = !isCurrentlyAnimating
              
              requestAnimationFrame(() => {
                if (borderOverlay) {
                  borderOverlay.style.opacity = vm.isTouchAnimating ? '1' : '0'
                }
              })
              
              if (vm.isTouchAnimating) {
                startAnim()
              } else {
                stopAnim()
              }
            })
            
            // Initialize: Start with animations hidden on all devices
            requestAnimationFrame(() => {
              if (borderOverlay) {
                borderOverlay.style.opacity = '0'
              }
            })
            
            // Add resize observer to recalculate SVG path when card size changes
            if (window.ResizeObserver) {
              const resizeObserver = new ResizeObserver(() => {
                // Debounce resize events to avoid excessive recalculations
                if (vm.resizeTimeout) {
                  clearTimeout(vm.resizeTimeout)
                }
                vm.resizeTimeout = setTimeout(() => {
                  // Use RAF to batch all DOM updates and avoid forced reflows
                  requestAnimationFrame(() => {
                    // Recalculate SVG position based on new aspect ratio
                    updateSVGPosition()
                    
                    // Recalculate and update border path (viewBox is fixed, so path doesn't need to change)
                    const adjustedD = buildPath()
                    ;[track, seg1, seg2].forEach(el => el.setAttribute('d', adjustedD))
                    
                    // Update animation parameters
                    const newP = track.getTotalLength()
                    const newSEG_WANTED = Math.min(700, newP * 0.4)
                    const newSEG_LEN = Math.min(newSEG_WANTED, newP * 0.3)
                    const newGap = newP - newSEG_LEN
                    const newDash = `${newSEG_LEN} ${newGap}`
                    
                    seg1.style.strokeDasharray = newDash
                    seg2.style.strokeDasharray = newDash
                  })
                }, 100) // 100ms debounce
              })
              
              // Observe the card element for size changes
              resizeObserver.observe(card)
              
              // Store observer for cleanup
              vm.borderResizeObserver = resizeObserver
            }
        }
        } // End of setupAnimation function
      })
    }
  }
}
</script>

<style scoped>
/* Epic Card Styles */
.card-wrapper {
  --wrapper-padding: 20.25px; /* Base padding value */
  --desired-stroke-px: calc(var(--wrapper-padding) * 1.05); /* Stroke = 105% of padding = 21.26px */
  padding: var(--wrapper-padding);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible; /* Allow border animation to show fully */
  border-radius: 0px; /* Remove border-radius to eliminate gray corner artifacts */
  background: transparent !important; /* Remove any background */
  border: none !important; /* Remove any borders */
  box-shadow: none !important; /* Remove any shadows */
}

.card-container {
  position: relative;
  width: 100%; /* Allow container to fill available column width */
  max-width: 100%; /* Remove fixed max-width to prevent overflow */
  min-height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent !important; /* Remove any background */
  border: none !important; /* Remove any borders */
  box-shadow: none !important; /* Remove any shadows */
}

.epic-card {
  --border-width: 12px;
  position: relative;
  width: 100%; /* Allow card to fill available container width */
  min-height: auto; /* Let cards be their natural height */
  background: linear-gradient(135deg, rgba(30,20,50,0.95), rgba(45,30,70,0.9));
  border: 1px solid rgba(124,58,237,0.3);
  box-shadow: 
    0px 10px 40px 0px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255,255,255,0.05),
    inset 0 1px 0 rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
  border-radius: 12px; /* Subtle rounded corners */
  overflow: visible;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  z-index: 3;
  padding: 8px;
  box-sizing: border-box;
  max-width: 100%; /* Remove fixed max-width constraint */
}

.epic-card:hover,
.epic-card.touch-active {
  transform: translateY(0); /* Removed scale to prevent animation clipping */
  background: linear-gradient(135deg, rgba(30,20,50,1), rgba(45,30,70,0.95));
  box-shadow: 
    0px 20px 60px 0px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(124,58,237,0.4),
    inset 0 1px 0 rgba(255,255,255,0.2),
    0 0 50px rgba(124,58,237,0.3);
  border-color: rgba(124,58,237,0.5);
}

/* SVG Border Overlay - Dynamic Stroke Compensation */
.epic-card {
  --stroke-width-viewbox: 70; /* Stroke width in viewBox units (change this to adjust thickness) */
  --viewbox-width: 400; /* ViewBox width */
  --base-offset: 10px; /* Base offset from epic-card edge */
  /* Auto-calculated: stroke-width in pixels = (70/400) * cardWidth ≈ 61px for 350px card */
  --stroke-half: 30.5px; /* Half of actual stroke width (70/400 * 350 / 2) - UPDATE when changing stroke-width */
  --stroke-full: 61px; /* Full actual stroke width (70/400 * 350) - UPDATE when changing stroke-width */
}

.border-overlay {
  position: absolute;
  /* Dynamic calculation using CSS variables */
  top: calc(-1 * var(--base-offset) - var(--stroke-half)); /* Auto-compensate for stroke expansion */
  left: calc(-1 * var(--base-offset) - var(--stroke-half)); /* Auto-compensate for stroke expansion */
  width: calc(100% + (2 * var(--base-offset)) + var(--stroke-full)); /* Auto-extend for stroke */
  height: calc(100% + (2 * var(--base-offset)) + var(--stroke-full)); /* Auto-extend for stroke */
  pointer-events: none;
  z-index: 10;
  border-radius: 24px; /* Matches card's subtle rounded corners */
}

/* Tech Stack Section */
.tech-stack-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px 10px 10px;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
  border-radius: 0px 0px 8px 8px;
  position: relative;
  z-index: 5;
}

.built-with-text {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-align: center;
}

.tech-stack-row {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.tech-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tech-stack-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}


/* Banner Section */
.banner-section {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 8px;
  margin: 0;
  flex-shrink: 0;
  background: linear-gradient(135deg, rgba(20, 20, 30, 0.5), rgba(30, 30, 50, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.epic-card:hover .banner-img {
  transform: scale(1.05);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%);
  pointer-events: none;
}

/* Content Section */
.content-section {
  flex: 1; /* Restore flex: 1 to fill available space */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Push buttons to bottom */
  padding: 15px 10px 10px 10px;
  position: relative;
  z-index: 5;
  border-radius: 12px; /* Match project-header border-radius for consistent corners */
}

.project-header {
  text-align: center;
  margin: 0px 0px 5px 0px;
  position: relative;
  z-index: 2;
  background: 
    radial-gradient(circle at 20% 50%, rgba(0, 200, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(255, 100, 150, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, 
      rgba(10, 15, 30, 0.9) 0%, 
      rgba(20, 25, 45, 0.95) 50%,
      rgba(10, 15, 30, 0.9) 100%);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 20px 15px;
  border: none;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.project-header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, 
      rgba(0, 200, 255, 0.1) 0%, 
      transparent 20%,
      transparent 80%,
      rgba(255, 100, 150, 0.1) 100%),
    radial-gradient(ellipse at center, 
      rgba(0, 200, 255, 0.05) 0%, 
      transparent 70%);
  pointer-events: none;
  z-index: -1;
  border-radius: 12px; /* Match project-header border-radius */
}

.project-header:hover::after {
  background: 
    linear-gradient(90deg, 
      rgba(0, 200, 255, 0.2) 0%, 
      transparent 20%,
      transparent 80%,
      rgba(255, 100, 150, 0.2) 100%),
    radial-gradient(ellipse at center, 
      rgba(0, 200, 255, 0.1) 0%, 
      transparent 70%);
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(124,58,237,0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
  border-radius: 12px; /* Match project-header border-radius */
}

.project-title {
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.3),
    0 0 20px rgba(0, 200, 255, 0.2);
  background: linear-gradient(135deg, #ffffff 0%, #00c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.project-subtitle {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.4;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

/* Action Section */
.action-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px; /* Reduced from 10px to minimize gap */
}

.epic-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Ensure ImagePreview wrapper takes equal space */
.epic-buttons > * {
  flex: 1;
  min-width: 0;
}

/* Epic Button Styles - Complete Heat Exchanger Match */
.button {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background: none;
  color: #0f1923;
  cursor: pointer;
  position: relative;
  padding: 8px;
  text-transform: uppercase;
  font-weight: bold;
  /* Font size handled by font-sizes.css */
  transition: all .15s ease;
  text-decoration: none;
  flex: 1;
  width: 100%;
  display: block;
}

.button::before,
.button::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  left: 0;
  height: calc(50% - 5px);
  border: 1px solid #7D8082;
  transition: all .15s ease;
}

.button::before {
  top: 0;
  border-bottom-width: 0;
}

.button::after {
  bottom: 0;
  border-top-width: 0;
}

.button:active,
.button:focus {
  outline: none;
}

.button:active::before,
.button:active::after {
  right: 3px;
  left: 3px;
}

.button:active::before {
  top: 3px;
}

.button:active::after {
  bottom: 3px;
}

.button_lg {
  position: relative;
  display: block;
  padding: 10px 20px;
  color: #fff;
  background-color: #1a0b2e;
  overflow: hidden;
  box-shadow: inset 0px 0px 0px 1px transparent;
}

.button_lg::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background-color: #1a0b2e;
}

.button_lg::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 4px;
  height: 4px;
  background-color: #1a0b2e;
  transition: all .2s ease;
}

.button_sl {
  display: block;
  position: absolute;
  top: 0;
  bottom: -1px;
  left: -8px;
  width: 0;
  transform: skew(-15deg);
  transition: all .2s ease;
}

.button_text {
  position: relative;
  /* Font size handled by font-sizes.css */
}

.button:hover {
  color: #0f1923;
}

.button:hover .button_sl {
  width: calc(100% + 15px);
}

.button:hover .button_lg::after {
  background-color: #fff;
}

/* Preview Button Theme Colors */
.preview-btn .button_sl {
  background-color: #ff6b35;
}

/* Details Button Theme Colors */
.details-btn .button_sl {
  background-color: #8b5cf6;
}

/* RESPONSIVE EPIC CARD BUTTONS - Aligned with 120-column breakpoints */

/* Extra extra large devices (1400px and up) - 4 cards per row */
@media (min-width: 1400px) {
  .epic-buttons .button_lg {
    padding: 6px 18px !important;
    text-align: center !important;
    min-height: 28px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
  }
}

/* Extra large devices (1200px and up) - 3 cards per row */
@media (min-width: 1200px) and (max-width: 1399px) {
  .epic-buttons .button_lg {
    padding: 5px 15px !important;
    text-align: center !important;
    min-height: 26px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
  }
}

/* Large devices (992px and up) - 3 cards per row */
@media (min-width: 992px) and (max-width: 1199px) {
  .epic-buttons .button_lg {
    padding: 4px 12px !important;
    text-align: center !important;
    min-height: 24px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
  }
}

/* Medium devices (768px and up) - 2 cards per row */
@media (min-width: 768px) and (max-width: 991px) {
  .epic-buttons .button_lg {
    padding: 4px 10px !important;
    text-align: center !important;
    min-height: 22px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
  }
}

/* Small devices (576px and up) - 2 cards per row */
@media (min-width: 576px) and (max-width: 767px) {
  .epic-buttons .button_lg {
    padding: 3px 8px !important;
    text-align: center !important;
    min-height: 20px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
  }
}

/* Extra small devices (400px and up) - 2 cards per row */
@media (min-width: 400px) and (max-width: 575px) {
  .epic-buttons .button_lg {
    padding: 3px 6px !important;
    text-align: center !important;
    min-height: 18px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
  }
}

/* Ultra small devices (400px and up) - 2 cards per row */
@media (min-width: 400px) and (max-width: 549px) {
  .epic-buttons .button_lg {
    padding: 2px 6px !important;
    text-align: center !important;
    min-height: 16px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
  }
}

/* Very small devices (below 400px) - 1 card per row */
@media (max-width: 399px) {
  .epic-buttons .button_lg {
    padding: 2px 4px !important;
    text-align: center !important;
    min-height: 14px !important;
  }
  
  .epic-buttons .button_text {
    text-align: center !important;
  }
}

/* Card Glow Effect */
.card-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
}

.epic-card:hover .card-glow {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .epic-card {
    min-height: auto; /* Let cards be their natural height */
  }
  
  .banner-section {
    height: 140px;
  }
  
  .tech-stack-row {
    gap: 6px;
  }
  
  .epic-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .button {
    width: 100%;
  }
  
  .button_lg {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .epic-card {
    min-height: auto; /* Let cards be their natural height */
    padding: 6px;
  }
  
  .banner-section {
    height: 120px;
  }
  
  .content-section {
    padding: 12px 8px 8px 8px;
  }
  
  .project-header {
    margin-bottom: 12px;
  }
}
</style>
