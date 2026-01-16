<template>
  <div class="project-gallery-section" data-aos="fade-up">
    
    <!-- Swiper Container -->
    <div class="gallery-carousel-container">
      
      <!-- Section Title - Inside Card -->
      <h3 class="gallery-title txt-h3-2xl">{{ title }}</h3>
      
      <!-- Custom Cool Carousel -->
      <div class="custom-cool-carousel">
        <div class="carousel-container" ref="carouselContainer">
          <div 
            class="carousel-track" 
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div 
              v-for="(image, index) in images" 
              :key="index"
              class="carousel-slide"
              :class="{ 
                'active': index === currentIndex,
                'prev': index === currentIndex - 1,
                'next': index === currentIndex + 1
              }"
            >
              <LazyImage 
                :src="image" 
                :alt="`${projectName} - Enterprise Software Project - Screenshot ${index + 1} - Remote Consultant`"
                :lazy="!shouldEagerLoad(index)"
                :priority="getImagePriority(index)"
                container-class="carousel-slide-image"
                image-class="carousel-slide-img"
              />
            </div>
          </div>
        </div>

        <!-- Custom Navigation -->
        <div class="custom-navigation">
          <button class="nav-btn prev-btn" @click="goToPrevious" :disabled="currentIndex === 0">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="nav-btn next-btn" @click="goToNext" :disabled="currentIndex === images.length - 1">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <!-- Custom Pagination - Overlay on image -->
        <div class="custom-pagination-overlay">
          <button
            v-for="(image, index) in images"
            :key="index"
            class="pagination-dot"
            :class="{ active: index === currentIndex }"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import LazyImage from '../common/LazyImage.vue'

export default {
  name: 'ProjectGallery',
  components: {
    LazyImage
  },
  props: {
    title: {
      type: String,
      default: 'Project Gallery'
    },
    projectName: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      autoplayInterval: null,
      isTransitioning: false
    }
  },
  mounted() {
    this.startAutoplay()
  },
  beforeUnmount() {
    this.stopAutoplay()
  },
  watch: {
    // When currentIndex changes, trigger loading of adjacent slides
    currentIndex() {
      // Force adjacent slides to load by updating the lazy state
      this.$nextTick(() => {
        // LazyImage will check shouldLoad when mounted, but we need to trigger
        // loading for slides that are now adjacent
        const prevIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1
        const nextIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1
        
        // The LazyImage component will handle loading based on lazy prop changes
        // Force update to ensure reactivity
        this.$forceUpdate()
      })
    }
  },
  methods: {
    shouldEagerLoad(index) {
      const prevIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1
      const nextIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1
      return index === this.currentIndex || index === prevIndex || index === nextIndex
    },
    getImagePriority(index) {
      if (index === this.currentIndex) return 'high'
      const prevIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1
      const nextIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1
      if (index === prevIndex || index === nextIndex) return 'auto'
      return 'low'
    },
    goToNext() {
      if (this.isTransitioning) return
      this.isTransitioning = true
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++
      } else {
        this.currentIndex = 0 // Loop back to start
      }
      setTimeout(() => {
        this.isTransitioning = false
      }, 800)
    },
    goToPrevious() {
      if (this.isTransitioning) return
      this.isTransitioning = true
      if (this.currentIndex > 0) {
        this.currentIndex--
      } else {
        this.currentIndex = this.images.length - 1 // Loop to end
      }
      setTimeout(() => {
        this.isTransitioning = false
      }, 800)
    },
    goToSlide(index) {
      if (this.isTransitioning) return
      this.isTransitioning = true
      this.currentIndex = index
      setTimeout(() => {
        this.isTransitioning = false
      }, 800)
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.goToNext()
      }, 4000)
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval)
        this.autoplayInterval = null
      }
    }
  }
}
</script>

<style scoped>
/* Project Gallery Section */
.project-gallery-section {
  margin-bottom: 30px;
  position: relative;
}

/* Section Title - Inside the card background */
.gallery-title {
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600 !important;
  margin: 0;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

/* Gallery Container with Animated Background */
.gallery-carousel-container {
  background: 
    radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
    linear-gradient(135deg, 
      rgba(75, 0, 130, 0.4) 0%,
      rgba(138, 43, 226, 0.35) 25%,
      rgba(147, 51, 234, 0.3) 50%,
      rgba(124, 58, 237, 0.35) 75%,
      rgba(109, 40, 217, 0.4) 100%
    ),
    linear-gradient(135deg, 
      rgba(20, 10, 40, 0.98) 0%, 
      rgba(30, 15, 50, 0.99) 50%,
      rgba(20, 10, 40, 0.98) 100%
    );
  border: 2px solid rgba(139, 92, 246, 0.5);
  border-radius: 20px;
  padding: 30px 30px 50px 30px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(139, 92, 246, 0.4),
    0 0 80px rgba(168, 85, 247, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* Animated Background Orbs */
.gallery-carousel-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  animation: floatingOrbs 20s ease-in-out infinite;
  pointer-events: none;
}

@keyframes floatingOrbs {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10%, -10%) rotate(90deg); }
  50% { transform: translate(-5%, 10%) rotate(180deg); }
  75% { transform: translate(-10%, -5%) rotate(270deg); }
}

/* Custom Cool Carousel */
.custom-cool-carousel {
  width: 100%;
  max-width: 900px;
  height: 500px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.carousel-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  perspective: 1000px;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  transform-style: preserve-3d;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.carousel-slide-image {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.carousel-slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 12px;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-style: preserve-3d;
}

/* Cool flip transition effects */
.carousel-slide.active {
  transform: scale(1) rotateY(0deg) rotateX(0deg);
  z-index: 3;
  opacity: 1;
}

.carousel-slide.prev {
  transform: scale(0.8) rotateY(90deg) rotateX(10deg) translateZ(-100px);
  opacity: 0.3;
  z-index: 1;
}

.carousel-slide.next {
  transform: scale(0.8) rotateY(-90deg) rotateX(-10deg) translateZ(-100px);
  opacity: 0.3;
  z-index: 1;
}

.carousel-slide.active img {
  transform: scale(1) rotateY(0deg);
  filter: brightness(1) contrast(1) saturate(1);
}

.carousel-slide.prev img,
.carousel-slide.next img {
  transform: scale(1.2) rotateY(0deg);
  filter: brightness(0.6) contrast(0.8) saturate(0.7) blur(2px);
}

.carousel-slide:hover img {
  transform: scale(1.05) rotateY(0deg);
  filter: brightness(1.1) contrast(1.1) saturate(1.1);
}

/* Custom Navigation */
.custom-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  pointer-events: none;
  z-index: 10;
}

.nav-btn {
  background: rgba(30, 15, 50, 0.9);
  width: 45px;
  height: 45px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(139, 92, 246, 0.5);
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 10;
  pointer-events: all;
  color: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(139, 92, 246, 0.7);
  border-color: rgba(139, 92, 246, 1);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.8);
  transform: scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-btn i {
  font-size: 16px;
}

/* Custom Pagination - Overlay on image */
.custom-pagination-overlay {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  justify-content: center;
  z-index: 15;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.pagination-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.8);
  padding: 0;
  margin: 0;
  transition: all 0.25s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.pagination-dot.active {
  background: linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(168, 85, 247, 1));
  width: 32px;
  border-radius: 6px;
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.9), 0 0 30px rgba(168, 85, 247, 0.5);
  border-color: rgba(168, 85, 247, 1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { 
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.9), 0 0 30px rgba(168, 85, 247, 0.5); 
  }
  50% { 
    box-shadow: 0 0 25px rgba(139, 92, 246, 1), 0 0 45px rgba(168, 85, 247, 0.7); 
  }
}


/* Tablet */
@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px) {
  .gallery-carousel-container {
    padding: 30px 25px 40px 25px;
    min-height: auto;
  }
  
  .custom-cool-carousel {
    max-width: 750px;
    height: 420px;
  }
  
  .carousel-slide {
    height: 420px;
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
  }
}

/* Mobile */
@media (pointer: coarse) and (max-width: 767px) {
  .gallery-carousel-container {
    padding: 25px 15px 35px 15px;
    min-height: auto;
    gap: 15px;
  }
  
  .custom-cool-carousel {
    max-width: 100%;
    height: 300px;
  }
  
  .carousel-slide {
    height: 300px;
  }
  
  .nav-btn {
    width: 35px;
    height: 35px;
  }
  
  .nav-btn i {
    font-size: 14px;
  }
}
</style>
