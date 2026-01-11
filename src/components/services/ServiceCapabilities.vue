<template>
  <ReusableCard title="Capabilities & Offerings" icon-name="capabilities" class="mb-4">
    <div class="service-capabilities-content">
      <!-- Core Capabilities -->
      <div v-if="capabilities && capabilities.length > 0" class="capabilities-section mb-5">
        <h4 class="section-title txt-h4-xl mb-4">Core Capabilities</h4>
        <div class="row g-4">
          <div 
            v-for="(capability, index) in capabilities" 
            :key="index"
            class="col-md-6 col-lg-4"
          >
            <div class="capability-card">
              <div class="capability-icon">
                <img 
                  v-if="getCapabilityIcon(capability.icon)" 
                  :src="getCapabilityIcon(capability.icon)" 
                  :alt="capability.title"
                  class="icon-img-4xl"
                />
                <i v-else-if="capability.icon" :class="capability.icon + ' icon-4xl'"></i>
                <span v-else class="default-icon icon-4xl">⚙️</span>
              </div>
              <h5 class="capability-title txt-h5-lg">{{ capability.title }}</h5>
              <p class="capability-description txt-p-md">{{ capability.description }}</p>
              <div v-if="capability.technologies && capability.technologies.length > 0" class="capability-tech-tags">
                <span 
                  v-for="(tech, techIndex) in capability.technologies" 
                  :key="techIndex"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Methodologies -->
      <div v-if="methodologies && methodologies.length > 0" class="methodologies-section mb-5">
        <h4 class="section-title txt-h4-xl mb-4">Methodologies & Practices</h4>
        <div class="methodologies-badges">
          <span 
            v-for="(methodology, index) in methodologies" 
            :key="index"
            class="methodology-badge"
          >
            {{ methodology }}
          </span>
        </div>
      </div>
      
      <!-- Deliverables -->
      <div v-if="deliverables && deliverables.length > 0" class="deliverables-section">
        <h4 class="section-title txt-h4-xl mb-4">Deliverables</h4>
        <ul class="deliverables-list">
          <li v-for="(deliverable, index) in deliverables" :key="index" class="deliverable-item">
            <span class="deliverable-icon">📦</span>
            <span class="deliverable-text">{{ deliverable }}</span>
          </li>
        </ul>
      </div>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import { resolveIcon } from '../../utils/iconResolver.js'

export default {
  name: 'ServiceCapabilities',
  components: {
    ReusableCard
  },
  props: {
    capabilities: {
      type: Array,
      default: () => []
    },
    methodologies: {
      type: Array,
      default: () => []
    },
    deliverables: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getCapabilityIcon(iconName) {
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
.service-capabilities-content {
  padding: 20px 0;
}

.section-title {
  color: #374151;
  margin-bottom: 20px;
}

.capability-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 255, 0.95) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 25px;
  height: 100%;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
}

.capability-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(250, 245, 255, 1) 100%);
  border-color: rgba(139, 92, 246, 0.5);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.25);
}

.capability-icon {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  min-height: 80px;
}

.capability-icon img {
  width: 60px;
  height: auto;
}

.capability-icon i {
  color: rgba(139, 92, 246, 0.9);
  font-size: 3.5rem;
}

.default-icon {
  font-size: 3.5rem;
}

.capability-title {
  color: #374151;
  margin-bottom: 12px;
  font-weight: 600;
}

.capability-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 15px;
  flex: 1;
}

.capability-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}

.tech-tag {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #7c3aed;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.methodologies-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.methodology-badge {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.15));
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #7c3aed;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.methodology-badge:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.25));
  border-color: rgba(139, 92, 246, 0.5);
  color: #6d28d9;
  transform: scale(1.05);
}

.deliverables-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.deliverable-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 15px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(250, 245, 255, 0.8) 100%);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.deliverable-item:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 255, 1) 100%);
  border-color: rgba(139, 92, 246, 0.4);
}

.deliverable-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.deliverable-text {
  color: #4b5563;
  line-height: 1.6;
  flex: 1;
}
</style>
