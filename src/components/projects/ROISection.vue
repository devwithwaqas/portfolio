<template>
  <div class="roi-section" data-aos="fade-up">
    
    <!-- Main Title -->
    <h3 class="roi-main-title txt-h3-2xl">🎯 {{ mainTitle }}</h3>
    
    <!-- Business Impact Grid (2 columns) -->
    <div class="roi-impact-grid">
      
      <!-- Left Column: Cost Optimization -->
      <div class="impact-column">
        <h4 class="impact-title txt-h4-lg">💰 {{ leftTitle }}</h4>
        <div class="impact-items">
          <div v-for="(item, index) in leftItems" :key="index" class="impact-item">
            <strong class="txt-label-md">{{ item.label }}</strong> <span class="txt-p-sm">{{ item.value }}</span>
          </div>
        </div>
      </div>
      
      <!-- Right Column: Operational Excellence -->
      <div class="impact-column">
        <h4 class="impact-title txt-h4-lg">🚀 {{ rightTitle }}</h4>
        <div class="impact-items">
          <div v-for="(item, index) in rightItems" :key="index" class="impact-item">
            <strong class="txt-label-md">{{ item.label }}</strong> <span class="txt-p-sm">{{ item.value }}</span>
          </div>
        </div>
      </div>
      
    </div>
    
    <!-- Success Metrics Cards -->
    <div class="success-metrics-section">
      <h4 class="metrics-subtitle txt-h4-lg">🏆 {{ metricsTitle }}</h4>
      <div class="metrics-grid">
        <div 
          v-for="(metric, index) in metrics" 
          :key="index" 
          class="metric-card"
          :class="`metric-${metric.color}`"
        >
          <div class="metric-value txt-h2-2xl">{{ metric.value }}</div>
          <div class="metric-label txt-p-sm">{{ metric.label }}</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'ROISection',
  props: {
    mainTitle: {
      type: String,
      default: 'Business Impact & ROI'
    },
    leftTitle: {
      type: String,
      default: 'Cost Optimization'
    },
    rightTitle: {
      type: String,
      default: 'Operational Excellence'
    },
    leftItems: {
      type: Array,
      required: true
    },
    rightItems: {
      type: Array,
      required: true
    },
    metricsTitle: {
      type: String,
      default: 'Project Success Metrics'
    },
    metrics: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
/* ROI Section - Matches Hero/Gallery Theme */
.roi-section {
  background: 
    radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
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
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(139, 92, 246, 0.4),
    0 0 80px rgba(168, 85, 247, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
}

/* Main Title */
.roi-main-title {
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Business Impact Grid */
.roi-impact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin-bottom: 50px;
}

.impact-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.impact-title {
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.impact-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.impact-item {
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
}

.impact-item strong {
  color: #ffffff;
  font-weight: 700;
  display: block;
  margin-bottom: 2px;
}

/* Success Metrics Section */
.success-metrics-section {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(10px);
}

.metrics-subtitle {
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.metric-card {
  padding: 25px 20px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

/* Metric Colors */
.metric-green {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.95));
}

.metric-purple {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(124, 58, 237, 0.95));
}

.metric-pink {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.9), rgba(219, 39, 119, 0.95));
}

.metric-cyan {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.9), rgba(8, 145, 178, 0.95));
}

.metric-value {
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.metric-label {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

/* Tablet */
@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px) {
  .roi-section {
    padding: 35px;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

/* Mobile */
@media (pointer: coarse) and (max-width: 767px) {
  .roi-section {
    padding: 25px;
  }
  
  .roi-impact-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
