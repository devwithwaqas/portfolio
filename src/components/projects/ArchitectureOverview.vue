<template>
  <ReusableCard :title="title" class="mb-4">
    <div class="architecture-content">
      
      <!-- Architecture Layers -->
      <div v-for="(layer, index) in architectureLayers" :key="index" class="architecture-layer">
        <h4 class="txt-h4-xl layer-title">
          <div class="layer-icon-wrapper icon-wrapper-xl">
            <span class="layer-icon icon-xl">
              <LazyImage 
                v-if="getLayerIcon(layer.icon).type === 'local'" 
                :src="getLayerIcon(layer.icon).src" 
                :alt="getLayerIcon(layer.icon).alt" 
                image-class="icon-img-xl"
                container-class="layer-icon-container"
              />
              <span v-else class="icon-xl">{{ getLayerIcon(layer.icon).src }}</span>
            </span>
          </div>
          <span class="layer-title-text">{{ layer.title }}</span>
        </h4>
        <p class="txt-p-md">{{ layer.description }}</p>
        
        <!-- Layer Features -->
        <div class="layer-features">
          <div 
            v-for="(feature, featureIndex) in layer.features" 
            :key="featureIndex" 
            class="feature-item"
          >
            <div class="feature-header">
              <!-- Tech Icon -->
              <div class="tech-icon-wrapper icon-wrapper-xl">
                <img 
                  v-if="getFeatureIconData(feature).type === 'devicon'" 
                  :src="getDeviconSvgUrl(getFeatureIconData(feature).src)"
                  :alt="feature.name"
                  class="feature-tech-icon icon-img-xl"
                  :title="feature.name"
                />
                <LazyImage 
                  v-else-if="getFeatureIconData(feature).type === 'local'" 
                  :src="getFeatureIconData(feature).src" 
                  :alt="feature.name"
                  :title="feature.name"
                  image-class="feature-tech-icon icon-img-xl"
                  container-class="feature-icon-container"
                />
                <span 
                  v-else 
                  class="feature-tech-icon icon-xl"
                >{{ getFeatureIconData(feature).src }}</span>
              </div>
              <span class="feature-name">{{ feature.name }}:</span>
            </div>
            <p class="txt-p-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Architecture Benefits -->
      <div class="architecture-benefits">
        <h4 class="txt-h4-xl layer-title">
          <div class="layer-icon-wrapper icon-wrapper-xl">
            <span class="benefits-icon icon-xl">
              <LazyImage 
                v-if="getLayerIcon('diamond').type === 'local'" 
                :src="getLayerIcon('diamond').src" 
                :alt="getLayerIcon('diamond').alt" 
                image-class="icon-img-xl"
                container-class="benefits-icon-container"
              />
              <span v-else class="icon-xl">{{ getLayerIcon('diamond').src }}</span>
            </span>
          </div>
          <span class="layer-title-text">Architecture Benefits</span>
        </h4>
        <p class="txt-p-md">{{ benefitsDescription }}</p>
      </div>
      
      
      
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import LazyImage from '../common/LazyImage.vue'
import { resolveIcon, getDeviconClass as getDeviconClassUtil, getDeviconSvgUrl as getDeviconSvgUrlUtil } from '../../utils/iconResolver.js'

export default {
  name: 'ArchitectureOverview',
  components: {
    ReusableCard,
    LazyImage
  },
  props: {
    title: {
      type: String,
      default: 'Architecture Overview'
    },
    architectureLayers: {
      type: Array,
      required: true
    },
    benefitsDescription: {
      type: String,
      required: true
    }
  },
  methods: {
    getFeatureIconData(feature) {
      // Use icon property first, then fallback to name for intelligent mapping
      if (feature.icon) {
        return resolveIcon(feature.icon, feature.name)
      }
      return resolveIcon(feature.name)
    },
    getLayerIcon(iconName) {
      return resolveIcon(iconName)
    },
    getDeviconClass(iconName) {
      return getDeviconClassUtil(iconName)
    },
    getDeviconSvgUrl(iconName) {
      return getDeviconSvgUrlUtil(iconName)
    }
  }
}
</script>

<style scoped>
.architecture-content {
  line-height: 1.7;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px; /* Horizontal gap between columns */
  row-gap: 0; /* No vertical gap between grid items */
  align-items: start;
}

/* Architecture Layer Styles */
.architecture-layer {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

.architecture-layer:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.layer-title {
  color: #7c3aed;
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.layer-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.layer-title-text {
  flex: 1;
}

.feature-name {
  color: #7c3aed;
  font-weight: 600;
  font-size: 1.1rem;
}

.layer-description {
  color: #374151;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* Layer Features */
.layer-features {
  display: grid;
  gap: 15px;
}

.feature-item {
  background: rgba(139, 92, 246, 0.03);
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(139, 92, 246, 0.06);
  border-left-color: rgba(139, 92, 246, 0.4);
  transform: translateX(2px);
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.tech-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
}


.feature-name {
  color: #7c3aed;
}

.feature-description {
  color: #4b5563;
  margin: 0;
  line-height: 1.5;
}


/* Architecture Benefits */
.architecture-benefits {
  margin: 0;
  padding: 25px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.03) 100%);
  border-radius: 12px;
  border: 1px solid rgba(139, 92, 246, 0.1);
  grid-column: 1 / -1; /* Span full width across both columns */
}

.benefits-title {
  color: #7c3aed;
  font-weight: 600;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.benefits-description {
  color: #374151;
  line-height: 1.6;
  margin: 0;
}



/* Responsive Design */
@media (max-width: 768px) {
  .architecture-content {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .architecture-layer {
    margin-bottom: 25px;
    padding-bottom: 20px;
  }
  
  
  .feature-item {
    padding: 12px;
  }
  
  .architecture-benefits {
    padding: 20px;
    margin: 0;
  }
  
  .challenge-section,
  .business-impact {
    padding: 20px;
    margin: 25px 0;
  }
  
}
</style>
