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
          class="slider-arrow slider-arrow-prev" 
          @click="goToPrevious"
          :disabled="!canGoPrevious"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button 
          class="slider-arrow slider-arrow-next" 
          @click="goToNext"
          :disabled="!canGoNext"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <!-- Pagination Dots -->
      <div class="slider-pagination" v-if="showPagination">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          class="slider-dot"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
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
    this.updateHeight()
    this.startAutoplay()
    this.setupResizeObserver()
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
      this.$nextTick(() => {
        const activeSlide = this.$refs.slideRefs
        const track = this.$refs.sliderTrack
        if (activeSlide && track) {
          // Reset height to auto to get natural height
          activeSlide.style.height = 'auto'
          track.style.height = 'auto'
          
          // Force a reflow
          activeSlide.offsetHeight
          track.offsetHeight
          
          // Get the natural height
          const naturalHeight = activeSlide.scrollHeight
          
          // Set the height to just the content height (no extra padding)
          this.currentHeight = naturalHeight
          
          // Apply the height to the track
          track.style.height = `${this.currentHeight}px`
          
          // console.log(`📏 Slide ${this.currentIndex} height: ${naturalHeight}px`)
        }
      })
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
        this.resizeObserver = new ResizeObserver(() => {
          this.updateHeight()
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
      // Delay height update to allow transition to complete
      setTimeout(() => {
        this.updateHeight()
      }, 100)
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
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%);
  color: white;
  font-size: 18px;
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
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  background: rgba(60, 20, 120, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-dot:hover {
  background: rgba(60, 20, 120, 0.6);
  transform: scale(1.2);
}

.slider-dot.active {
  background: linear-gradient(135deg, rgba(60, 20, 120, 0.8) 0%, rgba(50, 15, 100, 0.85) 50%, rgba(40, 10, 80, 0.9) 100%);
  transform: scale(1.3);
  box-shadow: 0 4px 15px rgba(60, 20, 120, 0.4);
}

/* Mobile pagination dots fix - prevent vertical squeezing */
@media (max-width: 768px) {
  .slider-pagination {
    flex-direction: row !important;
    justify-content: center !important;
    align-items: center !important;
    flex-wrap: nowrap !important;
  }
  
  .slider-dot {
    width: 12px !important;
    height: 12px !important;
    border-radius: 50% !important;
    flex-shrink: 0 !important;
    min-width: 12px !important;
    min-height: 12px !important;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .slider-controls {
    gap: 15px;
    margin-top: 15px;
    padding: 15px 0;
  }
  
  .slider-nav {
    gap: 25px;
  }
  
  .slider-arrow {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }
  
  .slider-dot {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .slider-controls {
    gap: 12px;
    margin-top: 12px;
    padding: 12px 0;
  }
  
  .slider-nav {
    gap: 20px;
  }
  
  .slider-arrow {
    width: 35px;
    height: 35px;
    font-size: 12px;
  }
  
  .slider-dot {
    width: 8px;
    height: 8px;
  }
}
</style>
