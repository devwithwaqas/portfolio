<template>
  <ReusableCard title="Our Process" icon-name="process" class="mb-4">
    <div class="service-process-content">
      <!-- Process Flow Image (if provided) -->
      <div v-if="processImage" class="process-image-container mb-5">
        <img :src="processImage" alt="Process Flow" class="process-image" />
      </div>
      
      <!-- Process Steps -->
      <div v-if="steps && steps.length > 0" class="process-steps mb-5">
        <div class="row g-4">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="col-md-6 col-lg-4"
          >
            <div class="process-step-card">
              <div class="step-number">{{ step.step }}</div>
              <h5 class="step-title txt-h5-lg">{{ step.title }}</h5>
              <p class="step-description txt-p-md">{{ step.description }}</p>
              <div v-if="step.duration" class="step-duration">
                <i class="bi bi-clock"></i>
                <span>{{ step.duration }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Timeline & Engagement Models -->
      <div class="row g-4">
        <!-- Timeline -->
        <div v-if="timeline" class="col-md-6">
          <div class="info-card">
            <div class="info-icon">
              <i class="bi bi-calendar-check"></i>
            </div>
            <h5 class="info-title txt-h5-lg">Typical Timeline</h5>
            <p class="info-text txt-p-lg">{{ timeline }}</p>
          </div>
        </div>
        
        <!-- Engagement Models -->
        <div v-if="engagementModels && engagementModels.length > 0" class="col-md-6">
          <div class="info-card">
            <div class="info-icon">
              <i class="bi bi-people"></i>
            </div>
            <h5 class="info-title txt-h5-lg">Engagement Models</h5>
            <ul class="engagement-models-list">
              <li v-for="(model, index) in engagementModels" :key="index" class="engagement-model-item">
                <span class="model-icon">✓</span>
                <span class="model-text">{{ model }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'

export default {
  name: 'ServiceProcess',
  components: {
    ReusableCard
  },
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    timeline: {
      type: String,
      default: ''
    },
    engagementModels: {
      type: Array,
      default: () => []
    },
    processImage: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.service-process-content {
  padding: 20px 0;
}

.process-image-container {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.process-image {
  width: 100%;
  height: auto;
  display: block;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: auto;
  -ms-interpolation-mode: bicubic;
}

.process-steps {
  margin: 30px 0;
}

.process-step-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 255, 0.95) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 25px;
  height: 100%;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
}

.process-step-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(250, 245, 255, 1) 100%);
  border-color: rgba(139, 92, 246, 0.5);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.25);
}

.step-number {
  position: absolute;
  top: -15px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(168, 85, 247, 1));
  border: 3px solid rgba(20, 0, 40, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
}

.step-title {
  color: #374151;
  margin-top: 15px;
  margin-bottom: 12px;
  font-weight: 600;
}

.step-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 15px;
  flex: 1;
}

.step-duration {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(139, 92, 246, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: auto;
}

.info-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 255, 0.95) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 25px;
  height: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
}

.info-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(250, 245, 255, 1) 100%);
  border-color: rgba(139, 92, 246, 0.5);
}

.info-icon {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: rgba(139, 92, 246, 0.15);
  border-radius: 50%;
  color: #7c3aed;
  font-size: 2.5rem;
}

.info-title {
  color: #374151;
  margin-bottom: 12px;
  font-weight: 600;
}

.info-text {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

.engagement-models-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.engagement-model-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  color: #4b5563;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

.engagement-model-item:last-child {
  border-bottom: none;
}

.model-icon {
  color: rgba(34, 197, 94, 0.9);
  font-weight: bold;
  font-size: 1.1rem;
}

.model-text {
  flex: 1;
}
</style>
