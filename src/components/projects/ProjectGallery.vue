<template>
  <div class="project-gallery-section" data-aos="fade-up">
    
    <!-- Swiper Container -->
    <div class="gallery-carousel-container">
      
      <!-- Section Title - Inside Card -->
      <h3 class="gallery-title txt-h3-2xl">📸 {{ title }}</h3>
      
      <!-- Vue3 Carousel -->
      <Carousel 
        :items-to-show="1"
        :autoplay="3500"
        :wrap-around="true"
        :transition="1500"
        :pause-autoplay-on-hover="true"
        class="gallery-carousel"
      >
        <Slide v-for="(image, index) in images" :key="index">
          <div class="carousel-slide">
            <img :src="image" :alt="`${projectName} Screenshot ${index + 1}`" />
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
      
    </div>
    
  </div>
</template>

<script>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  name: 'ProjectGallery',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
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

/* Carousel Wrapper */
.gallery-carousel {
  width: 100%;
  max-width: 900px;
  height: 500px;
  position: relative;
  border-radius: 12px;
  overflow: visible;
}

.carousel-slide {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 0;
  overflow: hidden;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 0;
}

/* Override Vue3-Carousel default styles - Keep it simple */
:deep(.carousel) {
  background: transparent !important;
  border-radius: 12px !important;
  overflow: hidden !important;
}

:deep(.carousel__viewport) {
  height: 500px !important;
  background: transparent !important;
  border-radius: 12px !important;
  overflow: hidden !important;
}

:deep(.carousel__track) {
  height: 500px !important;
  background: transparent !important;
}

:deep(.carousel__slide) {
  padding: 0 !important;
  background: transparent !important;
  height: 500px !important;
}

/* Navigation Buttons - Positioned relative to carousel only */
:deep(.carousel__prev),
:deep(.carousel__next) {
  background: rgba(30, 15, 50, 0.9) !important;
  width: 45px !important;
  height: 45px !important;
  border-radius: 8px !important;
  backdrop-filter: blur(10px) !important;
  border: 2px solid rgba(139, 92, 246, 0.5) !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
  position: absolute !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  z-index: 10 !important;
}

:deep(.carousel__prev) {
  left: 10px !important;
}

:deep(.carousel__next) {
  right: 10px !important;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background: rgba(139, 92, 246, 0.5) !important;
  border-color: rgba(139, 92, 246, 0.8) !important;
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.5) !important;
  transform: translateY(-50%) scale(1.05) !important;
}

:deep(.carousel__icon) {
  width: 20px !important;
  height: 20px !important;
  fill: rgba(255, 255, 255, 0.95) !important;
}

/* Pagination */
:deep(.carousel__pagination) {
  padding: 20px 0 0 0 !important;
  display: flex !important;
  gap: 8px !important;
  justify-content: center !important;
}

:deep(.carousel__pagination-button) {
  width: 14px !important;
  height: 14px !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.8) !important;
  border: 2px solid rgba(139, 92, 246, 0.5) !important;
  padding: 0 !important;
  margin: 0 !important;
  transition: all 0.4s ease !important;
}

:deep(.carousel__pagination-button--active) {
  background: linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(168, 85, 247, 1)) !important;
  width: 40px !important;
  border-radius: 8px !important;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(168, 85, 247, 0.4) !important;
  border-color: rgba(168, 85, 247, 0.8) !important;
}

/* Tablet */
@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px) {
  .gallery-carousel-container {
    padding: 30px 25px 40px 25px;
    min-height: auto;
  }
  
  .gallery-carousel {
    max-width: 750px;
    height: 420px;
  }
  
  .carousel-slide {
    height: 420px;
  }
  
  :deep(.carousel__viewport),
  :deep(.carousel__track) {
    height: 420px !important;
  }
  
  :deep(.carousel__slide) {
    height: 420px !important;
  }
  
  :deep(.carousel__prev),
  :deep(.carousel__next) {
    width: 40px !important;
    height: 40px !important;
  }
}

/* Mobile */
@media (pointer: coarse) and (max-width: 767px) {
  .gallery-carousel-container {
    padding: 25px 15px 35px 15px;
    min-height: auto;
    gap: 15px;
  }
  
  .gallery-carousel {
    max-width: 100%;
    height: 300px;
  }
  
  .carousel-slide {
    height: 300px;
  }
  
  :deep(.carousel__viewport),
  :deep(.carousel__track) {
    height: 300px !important;
  }
  
  :deep(.carousel__slide) {
    height: 300px !important;
  }
  
  :deep(.carousel__prev),
  :deep(.carousel__next) {
    width: 35px !important;
    height: 35px !important;
  }
  
  :deep(.carousel__icon) {
    width: 14px !important;
    height: 14px !important;
  }
}
</style>
