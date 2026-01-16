<template>
  <ReusableCard title="Service Overview" icon-name="overview" class="mb-4">
    <div class="service-overview-content">
      <!-- Banner Slider at Top (if images provided) -->
      <div v-if="bannerImages && bannerImages.length > 0" class="overview-banner-slider mb-4">
        <div ref="carouselElement" class="carousel slide" data-bs-ride="false" data-bs-interval="5000">
          <div class="carousel-inner">
            <div 
              v-for="(bannerImg, index) in bannerImages" 
              :key="index"
              class="carousel-item"
              :class="{ active: index === 0 }"
            >
              <img :src="bannerImg" :alt="`${title} Services - Banner ${index + 1} - Remote Consultant - Available USA, Europe, Global`" class="banner-image" :loading="index === 0 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'low'" />
            </div>
          </div>
          <button 
            v-if="bannerImages.length > 1"
            ref="prevButton"
            class="carousel-control-prev" 
            type="button" 
            data-bs-slide="prev"
            @click="goToPrev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button 
            v-if="bannerImages.length > 1"
            ref="nextButton"
            class="carousel-control-next" 
            type="button" 
            data-bs-slide="next"
            @click="goToNext"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
          <div class="carousel-indicators" v-if="bannerImages.length > 1">
            <button 
              v-for="(bannerImg, index) in bannerImages" 
              :key="index"
              type="button" 
              :data-bs-slide-to="index"
              :class="{ active: index === currentSlide }"
              :aria-current="index === currentSlide ? 'true' : 'false'"
              :aria-label="`Slide ${index + 1}`"
              @click="goToSlide(index)"
            ></button>
          </div>
        </div>
      </div>
      
      <!-- Content Section (Full Width) -->
      <!-- What Section -->
      <div v-if="content.what" class="overview-section mb-4">
        <h4 class="section-title txt-h4-xl mb-3">
          <span class="title-icon">💡</span>
          What is {{ title }}?
        </h4>
        <p class="section-text txt-p-lg">{{ content.what }}</p>
      </div>
      
      <!-- Who Section -->
      <div v-if="content.who" class="overview-section mb-4">
        <h4 class="section-title txt-h4-xl mb-3">
          <span class="title-icon">👥</span>
          Who Needs This Service?
        </h4>
        <p class="section-text txt-p-lg">{{ content.who }}</p>
      </div>
      
      <!-- Value Propositions -->
      <div v-if="content.valuePropositions && content.valuePropositions.length > 0" class="overview-section mb-4">
        <h4 class="section-title txt-h4-xl mb-3">
          <span class="title-icon">✨</span>
          Key Value Propositions
        </h4>
        <ul class="value-props-list">
          <li v-for="(prop, index) in content.valuePropositions" :key="index" class="value-prop-item">
            <span class="prop-icon">✓</span>
            <span class="prop-text">{{ prop }}</span>
          </li>
        </ul>
      </div>
      
      <!-- Use Cases -->
      <div v-if="content.useCases && content.useCases.length > 0" class="overview-section">
        <h4 class="section-title txt-h4-xl mb-3">
          <span class="title-icon">🎯</span>
          When to Use This Service
        </h4>
        <ul class="use-cases-list">
          <li v-for="(useCase, index) in content.useCases" :key="index" class="use-case-item">
            <span class="case-icon">→</span>
            <span class="case-text">{{ useCase }}</span>
          </li>
        </ul>
      </div>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'

export default {
  name: 'ServiceOverview',
  components: {
    ReusableCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true,
      default: () => ({
        what: '',
        who: '',
        valuePropositions: [],
        useCases: []
      })
    },
    image: {
      type: String,
      default: ''
    },
    bannerImages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      carouselInstance: null,
      currentSlide: 0,
      carouselInterval: null
    }
  },
  mounted() {
    // Initialize Bootstrap carousel using Vue refs (proper Vue way)
    this.$nextTick(() => {
      this.initCarousel()
    })

    // Listen to page visibility changes to pause/resume carousel
    this.setupPageVisibilityListener()
  },
  beforeUnmount() {
    // Clean up Bootstrap carousel instance and interval
    this.cleanupCarousel()
    
    // Remove page visibility listener
    this.removePageVisibilityListener()
  },
  methods: {
    initCarousel() {
      // Use Vue refs instead of getElementById (proper Vue way)
      if (!this.$refs.carouselElement) return
      if (!this.bannerImages || this.bannerImages.length <= 1) return
      if (typeof bootstrap === 'undefined') return

      try {
        // Initialize carousel using Vue ref
        this.carouselInstance = new bootstrap.Carousel(this.$refs.carouselElement, {
          interval: 5000,
          ride: false, // Don't auto-start to save memory
          wrap: true
        })

        // Set up auto-advance interval manually (only when tab is visible)
        this.startCarouselInterval()

        // Listen to carousel events to update currentSlide
        this.$refs.carouselElement.addEventListener('slid.bs.carousel', (event) => {
          this.currentSlide = event.to
        })
      } catch (error) {
        console.warn('Carousel initialization error:', error)
      }
    },
    startCarouselInterval() {
      // Only start interval if page is visible (saves memory when tab is hidden)
      if (document.hidden) return
      
      this.stopCarouselInterval()
      this.carouselInterval = setInterval(() => {
        if (!document.hidden && this.carouselInstance) {
          this.carouselInstance.next()
        }
      }, 5000)
    },
    stopCarouselInterval() {
      if (this.carouselInterval) {
        clearInterval(this.carouselInterval)
        this.carouselInterval = null
      }
    },
    goToPrev() {
      if (this.carouselInstance) {
        this.carouselInstance.prev()
      }
    },
    goToNext() {
      if (this.carouselInstance) {
        this.carouselInstance.next()
      }
    },
    goToSlide(index) {
      if (this.carouselInstance) {
        this.carouselInstance.to(index)
      }
    },
    cleanupCarousel() {
      // Stop interval
      this.stopCarouselInterval()

      // Dispose Bootstrap carousel instance
      if (this.carouselInstance) {
        try {
          this.carouselInstance.dispose()
          this.carouselInstance = null
        } catch (error) {
          console.warn('Carousel cleanup error:', error)
        }
      }
    },
    setupPageVisibilityListener() {
      // Pause carousel when tab is hidden, resume when visible (saves memory)
      this.handleVisibilityChange = () => {
        if (document.hidden) {
          this.stopCarouselInterval()
        } else {
          this.startCarouselInterval()
        }
      }

      // Use standard Page Visibility API
      if (typeof document.hidden !== 'undefined') {
        document.addEventListener('visibilitychange', this.handleVisibilityChange)
      } else if (typeof document.webkitHidden !== 'undefined') {
        document.addEventListener('webkitvisibilitychange', this.handleVisibilityChange)
      } else if (typeof document.mozHidden !== 'undefined') {
        document.addEventListener('mozvisibilitychange', this.handleVisibilityChange)
      } else if (typeof document.msHidden !== 'undefined') {
        document.addEventListener('msvisibilitychange', this.handleVisibilityChange)
      }
    },
    removePageVisibilityListener() {
      if (this.handleVisibilityChange) {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange)
        document.removeEventListener('webkitvisibilitychange', this.handleVisibilityChange)
        document.removeEventListener('mozvisibilitychange', this.handleVisibilityChange)
        document.removeEventListener('msvisibilitychange', this.handleVisibilityChange)
        this.handleVisibilityChange = null
      }
    }
  }
}
</script>

<style scoped>
.service-overview-content {
  padding: 20px 0;
}

/* Banner Slider Styles */
.overview-banner-slider {
  width: 100%;
  margin-bottom: 30px;
}

.overview-banner-slider .carousel {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.carousel-inner {
  border-radius: 12px;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
  display: block;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: auto;
  -ms-interpolation-mode: bicubic;
}

.carousel-control-prev,
.carousel-control-next {
  width: 50px;
  height: 50px;
  background: rgba(139, 92, 246, 0.8);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.carousel-control-prev {
  left: 20px;
}

.carousel-control-next {
  right: 20px;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  background: rgba(139, 92, 246, 1);
  opacity: 1;
}

.carousel-indicators {
  margin-bottom: 20px;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  margin: 0 5px;
}

.carousel-indicators button.active {
  background: rgba(139, 92, 246, 1);
  border-color: rgba(255, 255, 255, 1);
}

.overview-section {
  padding: 15px 0;
}

.section-title {
  color: #374151;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.title-icon {
  font-size: 1.5rem;
}

.section-text {
  color: #4b5563;
  line-height: 1.8;
  margin: 0;
}

.value-props-list,
.use-cases-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.value-prop-item,
.use-case-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  color: #4b5563;
  line-height: 1.6;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

.value-prop-item:last-child,
.use-case-item:last-child {
  border-bottom: none;
}

.prop-icon {
  color: rgba(34, 197, 94, 0.9);
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.case-icon {
  color: rgba(139, 92, 246, 0.9);
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.prop-text,
.case-text {
  flex: 1;
}

@media (max-width: 992px) {
  .overview-image {
    min-height: 250px;
  }
}
</style>
