<template>
  <ReusableCard title="Case Studies" icon-name="case studies" class="mb-4">
    <div class="service-case-studies-content">
      <p v-if="introduction" class="case-studies-intro txt-p-lg mb-4">
        {{ introduction }}
      </p>
      
      <div v-if="caseStudies && caseStudies.length > 0" class="case-studies-grid row g-4">
        <div 
          v-for="(study, index) in caseStudies" 
          :key="index"
          class="col-md-6 col-lg-4"
        >
          <div class="case-study-card">
            <div v-if="study.image" class="case-study-image">
              <img :src="study.image" :alt="`${study.project} - Case Study - Enterprise Software Project - Remote Consultant`" class="study-image" />
            </div>
            <div class="case-study-content">
              <h5 class="study-project txt-h5-lg">
                <a :href="study.link" class="study-link">{{ study.project }}</a>
              </h5>
              <p class="study-description txt-p-md">{{ study.description }}</p>
              <div v-if="study.metrics" class="study-metrics">
                <div class="metric-item">
                  <span class="metric-label">{{ study.metrics.label }}</span>
                  <span class="metric-value" style="font-size: 0.75rem !important;">{{ study.metrics.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'

export default {
  name: 'ServiceCaseStudies',
  components: {
    ReusableCard
  },
  props: {
    introduction: {
      type: String,
      default: ''
    },
    caseStudies: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.service-case-studies-content {
  padding: 20px 0;
}

.case-studies-intro {
  color: #4b5563;
  text-align: center;
  line-height: 1.8;
}

.case-study-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 255, 0.95) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
}

.case-study-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(250, 245, 255, 1) 100%);
  border-color: rgba(139, 92, 246, 0.5);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.25);
}

.case-study-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
}

.study-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.case-study-card:hover .study-image {
  transform: scale(1.1);
}

.case-study-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.study-project {
  margin-bottom: 12px;
}

.study-link {
  color: #374151;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.study-link:hover {
  color: #7c3aed;
}

.study-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 15px;
  flex: 1;
}

.study-metrics {
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid rgba(139, 92, 246, 0.2);
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.metric-value {
  color: #7c3aed;
  font-weight: 700;
  font-size: 0.75rem !important;
}
</style>
