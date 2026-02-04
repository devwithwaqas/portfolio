<template>
  <ReusableCard :title="title" class="mb-4">
    <div class="challenges-content">
      
      <!-- Challenge Items -->
      <div v-for="(challenge, index) in challenges" :key="index" class="challenge-layer">
        <h4 class="challenge-layer-title txt-h4-xl">
          <div class="challenge-layer-icon-wrapper icon-wrapper-xl">
            <span class="challenge-layer-icon icon-xl">
              <LazyImage 
                v-if="getChallengeIcon(challenge.icon).type === 'local'" 
                :src="getChallengeIcon(challenge.icon).src" 
                :alt="getChallengeIcon(challenge.icon).alt" 
                image-class="icon-img-xl"
                container-class="challenge-icon-container"
              />
              <span v-else class="icon-xl">{{ getChallengeIcon(challenge.icon).src }}</span>
            </span>
          </div>
          {{ challenge.title }}
        </h4>
        <p class="challenge-description txt-p-md"><strong class="txt-span-lg">Challenge:</strong> {{ challenge.problem }}</p>
        
        <!-- Solutions -->
        <div class="solutions-grid">
          <div 
            v-for="(solution, solutionIndex) in challenge.solutions" 
            :key="solutionIndex" 
            class="solution-item"
          >
            <div class="solution-header">
              <!-- Tech Icon -->
              <div class="solution-icon-wrapper icon-wrapper-xl">
                <img 
                  v-if="getSolutionIconData(solution).type === 'devicon'" 
                  :src="getDeviconSvgUrl(getSolutionIconData(solution).src)"
                  :alt="solution.name"
                  class="solution-tech-icon icon-img-xl"
                  :title="solution.name"
                />
                <img 
                  v-else-if="getSolutionIconData(solution).type === 'local'" 
                  :src="getSolutionIconData(solution).src" 
                  :alt="solution.name"
                  :title="solution.name"
                  class="solution-tech-icon icon-img-xl"
                />
                <span 
                  v-else 
                  class="solution-tech-icon icon-xl"
                >{{ getSolutionIconData(solution).src }}</span>
              </div>
              <strong class="solution-name txt-span-lg">{{ solution.name }}:</strong>
            </div>
            <p class="solution-description txt-p-sm">{{ solution.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Business Impact & Results -->
      <div class="business-impact">
        <h4 class="impact-title txt-h4-xl">
          <span class="impact-icon">
            <LazyImage 
              v-if="getChallengeIcon('target').type === 'local'" 
              :src="getChallengeIcon('target').src" 
              :alt="getChallengeIcon('target').alt" 
              image-class="icon-img-lg"
              container-class="impact-icon-container"
            />
            <span v-else class="icon-lg">{{ getChallengeIcon('target').src }}</span>
          </span>
          Business Impact & Results
        </h4>
        <p class="impact-description txt-p-md">{{ businessImpact }}</p>
      </div>
      
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import LazyImage from '../common/LazyImage.vue'
import { resolveIcon, getDeviconClass as getDeviconClassUtil, getDeviconSvgUrl as getDeviconSvgUrlUtil } from '../../utils/iconResolver.js'

export default {
  name: 'EngineeringChallenges',
  components: {
    ReusableCard,
    LazyImage
  },
  props: {
    title: {
      type: String,
      default: 'Engineering Challenges & Solutions'
    },
    challenges: {
      type: Array,
      required: true
    },
    businessImpact: {
      type: String,
      required: true
    }
  },
  methods: {
    getSolutionIconData(solution) {
      // Use icon property first, then fallback to name for intelligent mapping
      if (solution.icon) {
        return resolveIcon(solution.icon, solution.name)
      }
      return resolveIcon(solution.name)
    },
    getDeviconClass(iconName) {
      return getDeviconClassUtil(iconName)
    },
    getDeviconSvgUrl(iconName) {
      return getDeviconSvgUrlUtil(iconName)
    },
    getChallengeIcon(iconName) {
      return resolveIcon(iconName)
    }
  }
}
</script>

<style scoped>
.challenges-content {
  line-height: 1.7;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  row-gap: 0;
  align-items: start;
}

/* Challenge Layer Styles */
.challenge-layer {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

.challenge-layer:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.challenge-layer-title {
  color: #7c3aed;
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.challenge-layer-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.challenge-description {
  color: #374151;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* Solutions Grid */
.solutions-grid {
  display: grid;
  gap: 15px;
}

.solution-item {
  background: rgba(139, 92, 246, 0.03);
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
}

.solution-item:hover {
  background: rgba(139, 92, 246, 0.06);
  border-left-color: rgba(139, 92, 246, 0.4);
  transform: translateX(2px);
}

.solution-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.solution-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}


.solution-name {
  color: #7c3aed;
}

.solution-description {
  color: #4b5563;
  margin: 0;
  line-height: 1.5;
}


/* Business Impact */
.business-impact {
  margin: 0;
  padding: 25px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.03) 100%);
  border-radius: 12px;
  border: 1px solid rgba(139, 92, 246, 0.1);
  grid-column: 1 / -1; /* Span full width across both columns */
}

.impact-title {
  color: #7c3aed;
  font-weight: 600;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.impact-description {
  color: #374151;
  line-height: 1.6;
  margin: 0;
}



/* Responsive Design */
@media (max-width: 768px) {
  .challenges-content {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .challenge-layer {
    margin-bottom: 25px;
    padding-bottom: 20px;
  }
  
  
  .solution-item {
    padding: 12px;
  }
  
  .business-impact {
    padding: 20px;
    margin: 0;
  }
  
}
</style>
