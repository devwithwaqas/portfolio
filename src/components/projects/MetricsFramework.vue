<template>
  <ReusableCard :title="title" class="mb-4">
    <div class="metrics-framework-content">
      
      <!-- Introduction -->
      <p class="framework-intro">{{ introduction }}</p>
      
      <!-- Metrics Categories -->
      <div 
        v-for="(category, index) in metricsCategories" 
        :key="index" 
        class="metrics-category"
      >
        <h4 class="category-title">
              <div class="category-icon-wrapper icon-wrapper-xl">
                <i 
                  v-if="getCategoryIconData(category.title).type === 'devicon'" 
                  :class="[getDeviconClass(getCategoryIconData(category.title).src), 'category-icon', 'icon-xl']"
                ></i>
                <img 
                  v-else-if="getCategoryIconData(category.title).type === 'local'" 
                  :src="getCategoryIconData(category.title).src" 
                  :alt="category.title"
                  class="category-icon icon-img-xl"
                />
                <span 
                  v-else 
                  class="category-icon icon-xl"
                >{{ category.icon }}</span>
              </div>
          {{ category.title }}
        </h4>
        
        <!-- Metrics Items -->
        <div class="metrics-grid">
          <div 
            v-for="(metric, metricIndex) in category.metrics" 
            :key="metricIndex" 
            class="metric-item"
          >
            <div class="metric-header">
              <div class="metric-icon-wrapper icon-wrapper-xl">
                <i 
                  v-if="getMetricIconData(metric.name).type === 'devicon'" 
                  :class="[getDeviconClass(getMetricIconData(metric.name).src), 'metric-tech-icon', 'icon-xl']"
                  :title="metric.name"
                ></i>
                <img 
                  v-else-if="getMetricIconData(metric.name).type === 'local'" 
                  :src="getMetricIconData(metric.name).src" 
                  :alt="metric.name"
                  :title="metric.name"
                  class="metric-tech-icon icon-img-xl"
                />
                <span 
                  v-else 
                  class="metric-tech-icon icon-xl"
                >{{ metric.icon }}</span>
              </div>
              <strong class="metric-name">{{ metric.name }}</strong>
            </div>
            
            <div class="metric-details">
              <div class="metric-detail">
                <div class="detail-header">
                  <div class="detail-icon-wrapper icon-wrapper-xl">
                    <i 
                      v-if="getDetailIconData('measurement').type === 'devicon'" 
                      :class="[getDeviconClass(getDetailIconData('measurement').src), 'detail-icon', 'icon-xl']"
                    ></i>
                    <img 
                      v-else-if="getDetailIconData('measurement').type === 'local'" 
                      :src="getDetailIconData('measurement').src" 
                      alt="Measurement"
                      class="detail-icon icon-img-xl"
                    />
                    <span 
                      v-else 
                      class="detail-icon icon-xl"
                    >📏</span>
                  </div>
                  <strong class="detail-label txt-label-md">Measurement Method</strong>
                </div>
                <p class="detail-text">{{ metric.measurementMethod }}</p>
              </div>
              
              <div class="metric-detail">
                <div class="detail-header">
                  <div class="detail-icon-wrapper icon-wrapper-xl">
                    <i 
                      v-if="getDetailIconData('context').type === 'devicon'" 
                      :class="[getDeviconClass(getDetailIconData('context').src), 'detail-icon', 'icon-xl']"
                    ></i>
                    <img 
                      v-else-if="getDetailIconData('context').type === 'local'" 
                      :src="getDetailIconData('context').src" 
                      alt="Context"
                      class="detail-icon icon-img-xl"
                    />
                    <span 
                      v-else 
                      class="detail-icon icon-xl"
                    >🎯</span>
                  </div>
                  <strong class="detail-label txt-label-md">Project Context</strong>
                </div>
                <p class="detail-text">{{ metric.context }}</p>
              </div>
              
              <div class="metric-detail">
                <div class="detail-header">
                  <div class="detail-icon-wrapper icon-wrapper-xl">
                    <i 
                      v-if="getDetailIconData('validation').type === 'devicon'" 
                      :class="[getDeviconClass(getDetailIconData('validation').src), 'detail-icon', 'icon-xl']"
                    ></i>
                    <img 
                      v-else-if="getDetailIconData('validation').type === 'local'" 
                      :src="getDetailIconData('validation').src" 
                      alt="Validation"
                      class="detail-icon icon-img-xl"
                    />
                    <span 
                      v-else 
                      class="detail-icon icon-xl"
                    >✅</span>
                  </div>
                  <strong class="detail-label txt-label-md">Improvement Validation</strong>
                </div>
                <p class="detail-text">{{ metric.validation }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Measurement Framework Section -->
      <div class="measurement-framework">
        <h4 class="framework-title">
          <span class="framework-icon">📈</span>
          Measurement Framework & Validation
        </h4>
        <div class="framework-grid">
          <div 
            v-for="(item, index) in frameworkItems" 
            :key="index"
            class="framework-item"
          >
            <div class="framework-item-header">
              <div class="framework-item-icon-wrapper icon-wrapper-xl">
                <i 
                  v-if="getFrameworkIconData(item.title).type === 'devicon'" 
                  :class="[getDeviconClass(getFrameworkIconData(item.title).src), 'framework-item-icon', 'icon-xl']"
                ></i>
                <img 
                  v-else-if="getFrameworkIconData(item.title).type === 'local'" 
                  :src="getFrameworkIconData(item.title).src" 
                  :alt="item.title"
                  class="framework-item-icon icon-img-xl"
                />
                <span 
                  v-else 
                  class="framework-item-icon icon-xl"
                >{{ item.icon }}</span>
              </div>
              <strong class="framework-item-title">{{ item.title }}</strong>
            </div>
            <p class="framework-item-description">{{ item.description }}</p>
          </div>
        </div>
      </div>
      
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import { resolveIcon, getDeviconClass as getDeviconClassUtil } from '../../utils/iconResolver.js'

export default {
  name: 'MetricsFramework',
  components: {
    ReusableCard
  },
  props: {
    title: {
      type: String,
      default: '📈 Metrics & Measurement Framework'
    },
    introduction: {
      type: String,
      required: true
    },
    metricsCategories: {
      type: Array,
      required: true
    },
    frameworkItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    getMetricIconData(metricName) {
      return resolveIcon(metricName)
    },
    getCategoryIconData(categoryTitle) {
      // Map category titles to icon names
      const iconMap = {
        'System Performance Metrics': 'system performance',
        'Business Impact Metrics': 'business impact'
      }
      return resolveIcon(iconMap[categoryTitle] || categoryTitle)
    },
    getDetailIconData(detailType) {
      // Map detail types to icon names for resolution
      const iconMap = {
        'measurement': 'measurement',
        'context': 'context',
        'validation': 'validation'
      }
      return resolveIcon(iconMap[detailType] || detailType)
    },
    getFrameworkIconData(frameworkTitle) {
      // Map framework titles to icon names
      const iconMap = {
        'Baseline Establishment': 'baseline establishment',
        'Continuous Monitoring': 'continuous monitoring',
        'Validation Process': 'validation process'
      }
      return resolveIcon(iconMap[frameworkTitle] || frameworkTitle)
    },
    getDeviconClass(iconName) {
      return getDeviconClassUtil(iconName)
    }
  }
}
</script>

<style scoped>
.metrics-framework-content {
  line-height: 1.7;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  row-gap: 0;
  align-items: start;
}

.framework-intro {
  color: #374151;
  line-height: 1.6;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(139, 92, 246, 0.04);
  border-left: 4px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  grid-column: 1 / -1; /* Span full width */
}

/* Metrics Category */
.metrics-category {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

.metrics-category:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.category-title {
  color: #7c3aed;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  gap: 20px;
}

.metric-item {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.04) 0%, rgba(236, 72, 153, 0.03) 100%);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  transition: all 0.3s ease;
}

.metric-item:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.06) 100%);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.1);
  transform: translateY(-2px);
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(139, 92, 246, 0.1);
}

.metric-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Icon sizes now managed by font-sizes.css */

.metric-name {
  color: #7c3aed;
  flex: 1;
}

.metric-details {
  display: grid;
  gap: 16px;
  margin-top: 12px;
}

.metric-detail {
  margin: 0;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 8px 12px;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.08) 0%, 
    rgba(236, 72, 153, 0.06) 100%
  );
  border-left: 3px solid rgba(139, 92, 246, 0.4);
  border-radius: 6px;
}

.detail-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-label {
  color: #7c3aed;
  font-weight: 600;
}

.detail-text {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  padding-left: 12px;
}

/* Measurement Framework */
.measurement-framework {
  margin: 0;
  padding: 25px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.03) 100%);
  border-radius: 12px;
  border: 1px solid rgba(139, 92, 246, 0.1);
  grid-column: 1 / -1; /* Span full width across both columns */
}

.framework-title {
  color: #7c3aed;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.framework-icon {
  flex-shrink: 0;
}

.framework-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.framework-item {
  background: rgba(255, 255, 255, 0.7);
  padding: 18px;
  border-radius: 10px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  transition: all 0.3s ease;
}

.framework-item:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.12);
  transform: translateY(-2px);
}

.framework-item-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.framework-item-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.framework-item-icon {
  flex-shrink: 0;
}

.framework-item-title {
  color: #7c3aed;
}

.framework-item-description {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .metrics-framework-content {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .framework-intro {
    margin-bottom: 25px;
  }
  
  .metrics-category {
    margin-bottom: 25px;
    padding-bottom: 20px;
  }
  
  /* Font sizes managed by font-sizes.css */
  
  .metric-item {
    padding: 16px;
  }
  
  .measurement-framework {
    padding: 20px;
    margin: 0;
  }
  
  .framework-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
</style>

