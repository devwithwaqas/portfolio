<template>
  <div class="custom-slider" ref="sliderContainer">
    <!-- Slider Track -->
    <div class="slider-track" ref="sliderTrack" :style="{ height: currentHeight + 'px' }">
      <div 
        class="slider-slides" 
        ref="sliderSlides"
      >
        <transition 
          name="slide-fade" 
          mode="out-in"
          @after-enter="onTransitionComplete"
        >
          <div 
            class="slider-slide active"
            ref="slideRefs"
            :key="currentIndex"
          >
            <slot :slide="slides[currentIndex]" :index="currentIndex"></slot>
          </div>
        </transition>
      </div>
    </div>

    <!-- Navigation Controls (outside slider track) -->
    <div class="slider-controls">
      <!-- Navigation Arrows -->
      <div class="slider-nav" v-if="showArrows">
        <button 
          class="slider-arrow slider-arrow-prev icon-wrapper-lg" 
          @click="goToPrevious"
          :disabled="!canGoPrevious"
          aria-label="Previous testimonial"
          :aria-disabled="!canGoPrevious"
        >
          <i class="fas fa-chevron-left icon-md" aria-hidden="true"></i>
        </button>
        <button 
          class="slider-arrow slider-arrow-next icon-wrapper-lg" 
          @click="goToNext"
          :disabled="!canGoNext"
          aria-label="Next testimonial"
          :aria-disabled="!canGoNext"
        >
          <i class="fas fa-chevron-right icon-md" aria-hidden="true"></i>
        </button>
      </div>

      <!-- Pagination Dots -->
      <div class="slider-pagination" v-if="showPagination" role="tablist" aria-label="Testimonials navigation">
        <button
          v-for="(slide, index) in slides"
          :key="`slide-${index}`"
          class="slider-dot"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1} of ${slides.length}`"
          :aria-selected="index === currentIndex"
          :aria-current="index === currentIndex ? 'true' : 'false'"
          role="tab"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSlider',
  props: {
    slides: {
      type: Array,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplayInterval: {
      type: Number,
      default: 5000
    },
    showArrows: {
      type: Boolean,
      default: true
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      currentHeight: 300,
      autoplayTimer: null,
      isTransitioning: false
    }
  },
  computed: {
    canGoPrevious() {
      return this.loop || this.currentIndex > 0
    },
    canGoNext() {
      return this.loop || this.currentIndex < this.slides.length - 1
    }
  },
  mounted() {
    const runWhenIdle = (callback) => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout: 2000 })
      } else {
        setTimeout(callback, 1000)
      }
    }

    // Height calculation can wait until idle to reduce main-thread work
    runWhenIdle(() => {
      this.updateHeight()
      this.startAutoplay()
      this.setupResizeObserver()
    })
  },
  beforeUnmount() {
    this.stopAutoplay()
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  },
  methods: {
    goToSlide(index) {
      if (this.isTransitioning || index === this.currentIndex) return
      
      this.isTransitioning = true
      this.currentIndex = index
      this.updateHeight()
      
      setTimeout(() => {
        this.isTransitioning = false
      }, 300)
    },
    goToNext() {
      if (!this.canGoNext) return
      
      const nextIndex = this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1
      this.goToSlide(nextIndex)
    },
    goToPrevious() {
      if (!this.canGoPrevious) return
      
      const prevIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1
      this.goToSlide(prevIndex)
    },
    updateHeight() {
      const activeSlide = this.$refs.slideRefs
      const track = this.$refs.sliderTrack
      if (activeSlide && track) {
        // OPTIMIZATION: Read layout BEFORE entering RAF to avoid forced reflow
        // Batch the read operation
        const estimatedHeight = activeSlide.scrollHeight || activeSlide.offsetHeight || 300
        
        // Only update if height change is significant (reduces unnecessary style updates)
        if (Math.abs(estimatedHeight - this.currentHeight) > 10) {
          requestAnimationFrame(() => {
            // VUE REACTIVE: height change handled by :style="{ height: currentHeight + 'px' }"
            this.currentHeight = estimatedHeight
          })
        }
      }
    },
    startAutoplay() {
      if (this.autoplay && this.slides.length > 1) {
        this.autoplayTimer = setInterval(() => {
          this.goToNext()
        }, this.autoplayInterval)
      }
    },
    stopAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer)
        this.autoplayTimer = null
      }
    },
    setupResizeObserver() {
      if (window.ResizeObserver) {
        // OPTIMIZATION: Debounce resize observer calls more aggressively
        // Use requestIdleCallback to defer non-critical layout work
        let resizeTimeout
        let rafId = null
        
        this.resizeObserver = new ResizeObserver((entries) => {
          // Cancel any pending updates
          if (rafId) {
            cancelAnimationFrame(rafId)
          }
          clearTimeout(resizeTimeout)
          
          // Batch resize updates using RAF + debounce
          rafId = requestAnimationFrame(() => {
            resizeTimeout = setTimeout(() => {
              this.updateHeight()
              rafId = null
            }, 50) // Increased debounce from 16ms to 50ms for less frequent updates
          })
        })
        
        // Observe the single active slide
        if (this.$refs.slideRefs) {
          this.resizeObserver.observe(this.$refs.slideRefs)
        }
      }
    },
    onTransitionComplete() {
      // Update height after transition is complete
      this.$nextTick(() => {
        this.updateHeight()
      })
    }
  },
  watch: {
    currentIndex() {
      this.$emit('slide-change', this.currentIndex)
      // Use requestAnimationFrame for better performance timing
      requestAnimationFrame(() => {
        this.updateHeight()
      })
    }
  }
}
</script>

<style scoped>
.custom-slider {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  min-height: 200px;
}

.slider-track {
  position: relative;
  width: 100%;
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}

.slider-slides {
  width: 100%;
  transition: height 0.3s ease-in-out;
}

.slider-slide {
  width: 100%;
  min-height: 200px;
  height: auto;
  overflow: visible;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vue Transition Styles */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}

.slide-fade-enter-to, .slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Slider Controls Container */
.slider-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  padding: 20px 0;
}

/* Navigation Arrows */
.slider-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  pointer-events: auto;
}

.slider-arrow {
  /* Size managed by icon-wrapper-lg */
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%);
  color: white;
  /* Font size handled by font-sizes.css */
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.slider-arrow:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(60, 20, 120, 0.4);
}

.slider-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Pagination Dots */
.slider-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
}

.slider-dot {
  /* Size managed by icon-wrapper-xs */
  border: none;
  border-radius: 50%;
  background: rgba(60, 20, 120, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-dot:hover {
  background: rgba(60, 20, 120, 0.6);
}

.slider-dot:hover::before {
  transform: scale(1.2);
}

.slider-dot.active {
  background: rgba(60, 20, 120, 0.2);
}

.slider-dot.active::before {
  background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%);
  transform: scale(1.3);
  box-shadow: 0 4px 15px rgba(60, 20, 120, 0.4);
}

/* Mobile pagination dots - maintain touch target size */
@media (pointer: coarse) and (max-width: 768px) {
  .slider-pagination {
    flex-direction: row !important;
    justify-content: center !important;
    align-items: center !important;
    flex-wrap: nowrap !important;
    gap: 8px !important;
  }
  
  .slider-dot {
    /* Maintain 44x44px touch target on mobile */
    width: 44px !important;
    height: 44px !important;
    min-width: 44px !important;
    min-height: 44px !important;
    padding: 16px !important;
  }
  
  .slider-dot::before {
    width: 12px !important;
    height: 12px !important;
  }
}

/* Responsive Design */
@media (pointer: coarse) and (max-width: 768px) {
  .slider-controls {
    gap: 15px;
    margin-top: 15px;
    padding: 15px 0;
  }
  
  .slider-nav {
    gap: 30px;
  }
  
  .slider-arrow {
    width: 55px;
    height: 55px;
    /* Font size handled by font-sizes.css */
  }
  
  .slider-dot {
    /* Maintain 44x44px touch target */
    width: 44px !important;
    height: 44px !important;
    min-width: 44px !important;
    min-height: 44px !important;
    padding: 16px !important;
  }
  
  .slider-dot::before {
    width: 12px !important;
    height: 12px !important;
  }
}

@media (pointer: coarse) and (max-width: 480px) {
  .slider-controls {
    gap: 15px;
    margin-top: 15px;
    padding: 15px 0;
  }
  
  .slider-nav {
    gap: 25px;
  }
  
  .slider-arrow {
    width: 50px;
    height: 50px;
    /* Font size handled by font-sizes.css */
  }
  
  .slider-dot {
    /* Maintain 44x44px touch target on small mobile */
    width: 44px !important;
    height: 44px !important;
    min-width: 44px !important;
    min-height: 44px !important;
    padding: 16px !important;
  }
  
  .slider-dot::before {
    width: 10px !important;
    height: 10px !important;
  }
}
</style>
