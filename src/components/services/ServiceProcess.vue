<template>
  <ReusableCard title="Our Process" icon-name="process" class="mb-4">
    <div class="service-process-content">
      <!-- Process Flow Image (if provided) -->
      <div v-if="processImage" class="process-image-container mb-5">
        <ResponsiveImage
          :src="processImage"
          :alt="`Service Process Flow - Remote Consultant - Available USA, Europe, Global`"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          :lazy="true"
          priority="auto"
          container-class="process-image-wrapper"
          image-class="process-image"
          :image-style="{ borderRadius: '12px' }"
        />
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
              <h4 class="step-title txt-h5-lg">{{ step.title }}</h4>
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
            <h4 class="info-title txt-h5-lg">Typical Timeline</h4>
            <p class="info-text txt-p-lg">{{ timeline }}</p>
          </div>
        </div>
        
        <!-- Engagement Models -->
        <div v-if="engagementModels && engagementModels.length > 0" class="col-md-6">
          <div class="info-card">
            <div class="info-icon">
              <i class="bi bi-people"></i>
            </div>
            <h4 class="info-title txt-h5-lg">Engagement Models</h4>
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
import ResponsiveImage from '../common/ResponsiveImage.vue'

export default {
  name: 'ServiceProcess',
  components: {
    ReusableCard,
    ResponsiveImage
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
/* Ensure card body allows shadows to show */
:deep(.card-body) {
  overflow: visible !important;
}
.service-process-content {
  padding: 20px 0;
}

.process-image-container {
  width: 100%;
  /* Remove white background - only glossy border on image */
  background: transparent;
  padding: 20px; /* Add padding to accommodate shadows */
  overflow: visible !important; /* Allow shadows to show */
  position: relative; /* Ensure proper stacking */
}
.process-image-wrapper,
.process-image-container .responsive-image-container {
  width: 100%;
  border-radius: 12px !important; /* Rounded corners */
  overflow: visible !important; /* Allow shadows to show */
  background: transparent; /* No white background */
  position: relative; /* Ensure proper stacking */
}
/* Target ResponsiveImage component structure - use :deep() to penetrate scoped styles */
.process-image-container :deep(.responsive-image-container),
.process-image-container :deep(.responsive-image-container.process-image-wrapper) {
  overflow: visible !important;
  position: relative;
}

/* Apply shadow directly to the img element using :deep() - this is the key */
.process-image-container :deep(img),
.process-image-container :deep(.responsive-image-container img),
.process-image-container :deep(.process-image-wrapper img),
.process-image-container :deep(.responsive-image-container.process-image-wrapper img),
.process-image-container :deep(picture img),
.process-image-container :deep(.responsive-image-container picture img),
.process-image-container :deep(.process-image) {
  width: 100% !important;
  height: auto !important;
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
