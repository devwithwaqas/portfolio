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
            <div class="benefit-icon">
              <img 
                v-if="getBenefitIcon(benefit.icon)" 
                :src="getBenefitIcon(benefit.icon)" 
                :alt="`${benefit.label} - ${title} Services - Remote Consultant`"
                class="icon-img-4xl"
              />
              <i v-else-if="benefit.icon" :class="benefit.icon + ' icon-4xl'"></i>
            </div>
            <div class="benefit-content">
              <h5 class="benefit-label txt-label-md">{{ benefit.label }}</h5>
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
.service-hero-content {
  padding: 20px 0;
}

.hero-image-container {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.hero-image-wrapper {
  width: 100%;
}
.hero-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  display: block;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: auto;
  -ms-interpolation-mode: bicubic;
}

.service-tagline {
  color: #4b5563;
  text-align: center;
  font-weight: 500;
  line-height: 1.6;
}

.key-benefits {
  margin: 30px 0;
}

.benefit-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 255, 0.95) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
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
}

.benefit-icon img {
  width: 60px;
  height: auto;
}

.benefit-icon i {
  color: rgba(139, 92, 246, 0.9);
  font-size: 3.5rem;
}

.benefit-content {
  text-align: center;
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
