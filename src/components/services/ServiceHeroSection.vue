<template>
  <ReusableCard :title="title" :icon-name="iconName" class="mb-4">
    <div class="service-hero-content">
      <!-- Hero Image -->
      <div v-if="heroImage" class="hero-image-container mb-4">
        <ResponsiveImage
          :src="heroImage"
          :alt="`${title} Services - Remote Consultant - Available USA, Europe, Global - 17+ Years Experience`"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          :lazy="false"
          priority="high"
          container-class="hero-image-wrapper"
          image-class="hero-image"
          :image-style="{ borderRadius: '12px' }"
        />
      </div>
      
      <!-- Remote Available Badge -->
      <div class="remote-available-badge mb-4" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 12px 20px; border-radius: 25px; display: inline-block; box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);">
        <span style="font-size: 0.95rem; font-weight: 600;">
          <i class="fas fa-globe" style="margin-right: 8px;"></i>
          <strong>Remote Available:</strong> USA, Europe, Global | Flexible Timezone (EST, PST, GMT, CET)
        </span>
      </div>
      
      <!-- Tagline -->
      <p v-if="tagline" class="service-tagline txt-p-xl mb-4">
        {{ tagline }}
      </p>
      
      <!-- Key Benefits -->
      <div v-if="benefits && benefits.length > 0" class="key-benefits row g-3 mb-4">
        <div 
          v-for="(benefit, index) in benefits" 
          :key="index"
          class="col-md-6 col-lg-4"
        >
          <div class="benefit-card">
            <!-- CLS FIX: Reserve space for icon to prevent layout shift -->
            <div class="benefit-icon">
              <img 
                v-if="getBenefitIcon(benefit.icon)" 
                :src="getBenefitIcon(benefit.icon)" 
                :alt="`${benefit.label} - ${title} Services - Remote Consultant`"
                class="icon-img-4xl"
                loading="lazy"
                decoding="async"
              />
              <i v-else-if="benefit.icon" :class="benefit.icon + ' icon-4xl'"></i>
              <!-- Placeholder to reserve space if icon is loading -->
              <span v-if="!benefit.icon && !getBenefitIcon(benefit.icon)" class="icon-placeholder" aria-hidden="true"></span>
            </div>
            <div class="benefit-content">
              <h4 class="benefit-label txt-label-md">{{ benefit.label }}</h4>
              <span class="benefit-value" style="font-size: 0.75rem !important;">{{ benefit.value }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Category Badges -->
      <div v-if="badges && badges.length > 0" class="category-badges">
        <span 
          v-for="(badge, index) in badges" 
          :key="index"
          class="badge badge-pill"
        >
          {{ badge }}
        </span>
      </div>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import ResponsiveImage from '../common/ResponsiveImage.vue'
import { resolveIcon } from '../../utils/iconResolver.js'

export default {
  name: 'ServiceHeroSection',
  components: {
    ReusableCard,
    ResponsiveImage
  },
  props: {
    title: {
      type: String,
      required: true
    },
    iconName: {
      type: String,
      default: 'services'
    },
    tagline: {
      type: String,
      default: ''
    },
    heroImage: {
      type: String,
      default: ''
    },
    benefits: {
      type: Array,
      default: () => []
    },
    badges: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getBenefitIcon(iconName) {
      if (!iconName) return null
      const iconData = resolveIcon(iconName)
      if (iconData && iconData.type === 'local') {
        return iconData.src
      }
      return null
    }
  }
}
</script>

<style scoped>
/* Ensure card body allows shadows to show */
:deep(.card-body) {
  overflow: visible !important;
}
.service-hero-content {
  padding: 20px 0;
}

.hero-image-container {
  width: 100%;
  /* Remove white background - only glossy border on image */
  background: transparent;
  padding: 20px; /* Add padding to accommodate shadows */
  overflow: visible !important; /* Allow shadows to show */
  position: relative; /* Ensure proper stacking */
}
.hero-image-wrapper,
.hero-image-container .responsive-image-container {
  width: 100%;
  border-radius: 12px !important; /* Rounded corners */
  overflow: visible !important; /* Allow shadows to show */
  background: transparent; /* No white background */
  position: relative; /* Ensure proper stacking */
}
/* Target ResponsiveImage component structure - use :deep() to penetrate scoped styles */
.hero-image-container :deep(.responsive-image-container),
.hero-image-container :deep(.responsive-image-container.hero-image-wrapper) {
  overflow: visible !important;
  position: relative;
}

/* Apply shadow directly to the img element using :deep() - this is the key */
.hero-image-container :deep(img),
.hero-image-container :deep(.responsive-image-container img),
.hero-image-container :deep(.hero-image-wrapper img),
.hero-image-container :deep(.responsive-image-container.hero-image-wrapper img),
.hero-image-container :deep(picture img),
.hero-image-container :deep(.responsive-image-container picture img),
.hero-image-container :deep(.hero-image) {
  width: 100% !important;
  height: auto !important;
  max-height: 500px !important;
  object-fit: cover !important;
  display: block !important;
  border-radius: 12px !important;
  /* 3D Embossed effect - image appears to come out of the page */
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.4),
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 5px 15px rgba(139, 92, 246, 0.3),
    0 2px 8px rgba(168, 85, 247, 0.2),
    inset 0 1px 2px rgba(255, 255, 255, 0.15),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateZ(0) scale(1.01) !important;
  filter: drop-shadow(0 8px 15px rgba(0, 0, 0, 0.25)) !important;
  background: transparent !important;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: auto;
  -ms-interpolation-mode: bicubic;
  position: relative;
  z-index: 1;
}

.service-tagline {
  color: #4b5563;
  text-align: center;
  font-weight: 500;
  line-height: 1.6;
}

.key-benefits {
  margin: 30px 0;
  /* CLS FIX: Reserve space for benefits section to prevent layout shift */
  min-height: 200px;
  /* CLS FIX: Use contain layout to prevent shifts */
  contain: layout style;
}

.benefit-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 255, 0.95) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  /* CLS FIX: Set min-height to prevent layout shift as content loads */
  min-height: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
  /* CLS FIX: Ensure consistent sizing */
  box-sizing: border-box;
}

.benefit-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(250, 245, 255, 1) 100%);
  border-color: rgba(139, 92, 246, 0.5);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.25);
}

.benefit-icon {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  min-height: 80px;
  /* CLS FIX: Reserve space to prevent layout shift when icons load */
  width: 100%;
  position: relative;
}

.benefit-icon img {
  width: 60px;
  height: 60px;
  /* CLS FIX: Set explicit dimensions to prevent layout shift */
  object-fit: contain;
  display: block;
}

.benefit-icon i {
  color: rgba(139, 92, 246, 0.9);
  font-size: 3.5rem;
  /* CLS FIX: Reserve space for icon font */
  line-height: 1;
  display: block;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* CLS FIX: Placeholder to reserve space if icon is loading */
.benefit-icon .icon-placeholder {
  width: 60px;
  height: 60px;
  display: block;
  visibility: hidden;
}

.benefit-content {
  text-align: center;
  /* CLS FIX: Reserve space for content to prevent layout shift */
  min-height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.benefit-label {
  color: #4b5563;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Benefit Value - Force small font size with maximum specificity */
.benefit-value {
  color: #7c3aed !important;
  font-weight: 700 !important;
  margin: 0 !important;
  font-size: 0.75rem !important;
  line-height: 1.4 !important;
  display: block !important;
}

/* Multiple specific selectors to ensure it applies */
.benefit-card .benefit-content .benefit-value,
.service-hero-content .benefit-value,
.key-benefits .benefit-value,
.benefit-content .benefit-value,
.benefit-card .benefit-value,
.service-hero-content .benefit-card .benefit-value {
  font-size: 0.75rem !important;
}

/* Prevent parent font-size inheritance */
.benefit-content {
  font-size: 1rem !important;
}

.benefit-content .benefit-value {
  font-size: 0.75rem !important;
}

.category-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.badge {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.15));
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #7c3aed;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.badge:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.25));
  border-color: rgba(139, 92, 246, 0.5);
  color: #6d28d9;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .hero-image {
    max-height: 300px;
  }
  
  .benefit-card {
    padding: 15px;
  }
}
</style>
