<template>
  <ReusableCard title="Service Overview" icon-name="overview" class="mb-4">
    <div class="service-overview-content">
      <!-- Banner Slider at Top (if images provided) -->
      <div v-if="bannerImages && bannerImages.length > 0" class="overview-banner-slider mb-4">
        <CustomSlider
          v-if="bannerImages.length > 1"
          :slides="bannerImages"
          :autoplay="true"
          :autoplay-interval="5000"
          :show-arrows="true"
          :show-pagination="true"
          :loop="true"
        >
          <template #default="{ slide, index }">
            <ResponsiveImage
              :src="slide"
              :alt="`${title} Services - Banner ${index + 1} - Remote Consultant - Available USA, Europe, Global`"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              :lazy="index !== 0"
              :priority="index === 0 ? 'high' : 'low'"
              container-class="banner-image-wrapper"
              image-class="banner-image"
              :image-style="{ borderRadius: '12px' }"
            />
          </template>
        </CustomSlider>
        <!-- Single image (no carousel needed) -->
        <div v-else class="single-banner-image">
          <ResponsiveImage
            :src="bannerImages[0]"
            :alt="`${title} Services - Banner - Remote Consultant - Available USA, Europe, Global`"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            :lazy="false"
            priority="high"
            container-class="banner-image-wrapper"
            image-class="banner-image"
            :image-style="{ borderRadius: '12px' }"
          />
        </div>
        <!-- OLD BOOTSTRAP CAROUSEL - REMOVED -->
        <!-- <div ref="carouselElement" class="carousel slide" data-bs-ride="false" data-bs-interval="5000">
          <div class="carousel-inner">
            <div 
              v-for="(bannerImg, index) in bannerImages" 
              :key="index"
              class="carousel-item"
              :class="{ active: index === 0 }"
            >
              <ResponsiveImage
                :src="bannerImg"
                :alt="`${title} Services - Banner ${index + 1} - Remote Consultant - Available USA, Europe, Global`"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                :lazy="index !== 0"
                :priority="index === 0 ? 'high' : 'low'"
                container-class="banner-image-wrapper"
                image-class="banner-image"
              />
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
        </div> -->
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
import ResponsiveImage from '../common/ResponsiveImage.vue'
import CustomSlider from '../common/CustomSlider.vue'

export default {
  name: 'ServiceOverview',
  components: {
    ReusableCard,
    ResponsiveImage,
    CustomSlider
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
      // No longer needed - CustomSlider handles everything
    }
  }
}
</script>

<style scoped>
.service-overview-content {
  padding: 20px 0;
}

/* Banner Slider Styles - Glossy border effect (no white background) */
.overview-banner-slider {
  width: 100%;
  margin-bottom: 30px;
  /* Remove white background - only glossy border on image */
  background: transparent;
}

/* CLS FIX: Fixed height container to prevent layout shift */
.banner-image-wrapper {
  width: 100% !important;
  height: 400px !important; /* Fixed height to prevent CLS */
  min-height: 400px !important;
  max-height: 400px !important;
  border-radius: 12px !important; /* Rounded corners */
  overflow: visible !important; /* Allow shadows to show */
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 10px; /* Add padding to accommodate shadows */
}

/* CLS FIX: Fixed height image with rounded corners and 3D embossed effect */
.banner-image-wrapper img,
.banner-image-wrapper picture,
.banner-image-wrapper picture img,
.banner-image {
  width: 100% !important;
  height: 400px !important; /* Fixed height to prevent CLS - override ResponsiveImage's height: auto */
  min-height: 400px !important;
  max-height: 400px !important;
  object-fit: cover !important; /* Maintain aspect ratio, crop if needed */
  object-position: center;
  display: block;
  border-radius: 12px !important; /* Rounded corners - ensure it's applied */
  overflow: hidden !important; /* Clip content to rounded corners */
  /* 3D Embossed effect - image appears to come out of the page */
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.4),
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 5px 15px rgba(139, 92, 246, 0.3),
    0 2px 8px rgba(168, 85, 247, 0.2),
    inset 0 1px 2px rgba(255, 255, 255, 0.15),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateZ(0) scale(1.01); /* Slight scale to enhance 3D effect */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: auto;
  -ms-interpolation-mode: bicubic;
  background: transparent; /* No white background */
}

.single-banner-image {
  width: 100%;
  height: 400px !important; /* Fixed height to prevent CLS */
  min-height: 400px !important;
  max-height: 400px !important;
  border-radius: 12px !important;
  overflow: hidden !important; /* Keep overflow hidden to maintain fixed height */
  background: transparent; /* No white background */
}

/* CustomSlider styles for banner images - 3D embossed effect */
.overview-banner-slider :deep(.custom-slider) {
  border-radius: 12px !important; /* Rounded corners */
  overflow: visible !important; /* Allow controls to show */
  height: 400px !important; /* Fixed height to prevent CLS */
  min-height: 400px !important;
  max-height: 400px !important;
  background: transparent; /* No white background */
  position: relative !important; /* For z-index stacking */
}

/* Ensure navigation controls appear above images and are clickable */
.overview-banner-slider :deep(.slider-controls) {
  position: absolute !important;
  bottom: 15px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: 1000 !important; /* Well above images - high z-index */
  pointer-events: auto !important; /* Enable clicks */
  width: auto !important;
  margin-top: 0 !important; /* Override default margin */
  padding: 0 !important; /* Remove default padding */
  display: flex !important;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.overview-banner-slider :deep(.slider-nav) {
  position: relative !important;
  z-index: 1001 !important; /* Above images */
  pointer-events: auto !important; /* Enable clicks on controls */
  display: flex !important;
  gap: 30px;
}

.overview-banner-slider :deep(.slider-pagination) {
  position: relative !important;
  z-index: 1001 !important; /* Above images */
  pointer-events: auto !important; /* Enable clicks on controls */
  display: flex !important;
  gap: 10px;
}

.overview-banner-slider :deep(.slider-arrow) {
  position: relative !important;
  z-index: 1002 !important; /* Above images */
  pointer-events: auto !important; /* Enable clicks */
  cursor: pointer !important;
  /* Ensure button is visible and clickable */
  opacity: 1 !important;
  visibility: visible !important;
  /* Make buttons more visible over images */
  background: linear-gradient(135deg, rgba(60, 20, 120, 0.95) 0%, rgba(50, 15, 100, 0.95) 50%, rgba(40, 10, 80, 0.95) 100%) !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5) !important;
}

.overview-banner-slider :deep(.slider-dot) {
  position: relative !important;
  z-index: 1002 !important; /* Above images */
  pointer-events: auto !important; /* Enable clicks */
  cursor: pointer !important;
  /* Ensure dots are visible and clickable */
  opacity: 1 !important;
  visibility: visible !important;
}

.overview-banner-slider :deep(.slider-track) {
  height: 400px !important; /* Fixed height to prevent CLS */
  min-height: 400px !important;
  max-height: 400px !important;
  border-radius: 12px !important; /* Rounded corners */
  overflow: visible !important; /* Allow shadows to show */
  background: transparent; /* No white background */
  padding: 10px; /* Add padding to accommodate shadows */
}

.overview-banner-slider :deep(.slider-slides) {
  height: 400px !important; /* Fixed height to prevent CLS */
  min-height: 400px !important;
  max-height: 400px !important;
  border-radius: 12px !important; /* Rounded corners */
  overflow: visible !important; /* Allow shadows to show */
  background: transparent; /* No white background */
}

.overview-banner-slider :deep(.slider-slide) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px !important; /* Fixed height to prevent CLS - override CustomSlider's height: auto */
  min-height: 400px !important;
  max-height: 400px !important;
  border-radius: 12px !important; /* Rounded corners */
  overflow: visible !important; /* Allow shadows to show */
  background: transparent; /* No white background */
  padding: 5px; /* Add padding to accommodate shadows */
}

/* Ensure images inside slider slides have rounded corners and 3D embossed effect */
.overview-banner-slider :deep(.slider-slide img),
.overview-banner-slider :deep(.slider-slide picture),
.overview-banner-slider :deep(.slider-slide picture source),
.overview-banner-slider :deep(.slider-slide .responsive-image-container),
.overview-banner-slider :deep(.slider-slide .responsive-image-container img),
.overview-banner-slider :deep(.slider-slide .responsive-image-container picture),
.overview-banner-slider :deep(.slider-slide .responsive-image-container picture img) {
  border-radius: 12px !important; /* Rounded corners - ensure it's applied */
  width: 100% !important;
  height: 400px !important; /* Fixed height - override ResponsiveImage's height: auto */
  object-fit: cover !important;
  overflow: hidden !important; /* Ensure rounded corners work */
  /* 3D Embossed effect - image appears to come out of the page (only on actual img elements) */
  background: transparent; /* No white background */
  position: relative;
  z-index: 1; /* Behind navigation controls */
}

/* Apply 3D effect only to actual image elements, not containers */
.overview-banner-slider :deep(.slider-slide img),
.overview-banner-slider :deep(.slider-slide .responsive-image-container img),
.overview-banner-slider :deep(.slider-slide .responsive-image-container picture img) {
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.4),
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 5px 15px rgba(139, 92, 246, 0.3),
    0 2px 8px rgba(168, 85, 247, 0.2),
    inset 0 1px 2px rgba(255, 255, 255, 0.15),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateZ(0) scale(1.01); /* Slight scale to enhance 3D effect */
}

/* Picture element styling - no duplicate shadows */
.overview-banner-slider :deep(.banner-image-wrapper picture) {
  border-radius: 12px !important;
  overflow: hidden !important; /* Clip to rounded corners */
  width: 100% !important;
  height: 400px !important;
  display: block;
  background: transparent; /* No white background */
}

/* Mobile responsive height - reduced shadows to prevent overlay stacking */
@media (max-width: 768px) {
  .banner-image-wrapper,
  .banner-image-wrapper img,
  .banner-image,
  .single-banner-image,
  .overview-banner-slider :deep(.custom-slider),
  .overview-banner-slider :deep(.slider-track),
  .overview-banner-slider :deep(.slider-slides),
  .overview-banner-slider :deep(.slider-slide),
  .overview-banner-slider :deep(.slider-slide img),
  .overview-banner-slider :deep(.slider-slide .responsive-image-container),
  .overview-banner-slider :deep(.slider-slide .responsive-image-container img),
  .overview-banner-slider :deep(.slider-slide picture),
  .overview-banner-slider :deep(.slider-slide picture img) {
    height: 250px !important; /* Smaller fixed height on mobile */
    min-height: 250px !important;
    max-height: 250px !important;
    border-radius: 12px !important; /* Rounded corners on mobile too */
    overflow: hidden !important; /* Prevent shadow stacking issues */
    padding: 0 !important; /* Remove padding on mobile to prevent overlays */
  }
  
  /* Reduce shadow intensity on mobile to prevent overlay stacking */
  .banner-image-wrapper img,
  .banner-image,
  .overview-banner-slider :deep(.slider-slide img),
  .overview-banner-slider :deep(.slider-slide .responsive-image-container img),
  .overview-banner-slider :deep(.slider-slide picture img) {
    box-shadow: 
      0 10px 25px rgba(0, 0, 0, 0.3),
      0 5px 12px rgba(0, 0, 0, 0.2),
      0 2px 6px rgba(139, 92, 246, 0.25),
      inset 0 1px 1px rgba(255, 255, 255, 0.1) !important;
    transform: translateZ(0) scale(1.005) !important; /* Reduced scale on mobile */
  }
  
  /* Remove padding from containers on mobile */
  .banner-image-wrapper {
    padding: 0 !important;
  }
  
  .overview-banner-slider :deep(.slider-track),
  .overview-banner-slider :deep(.slider-slide) {
    padding: 0 !important;
  }
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
