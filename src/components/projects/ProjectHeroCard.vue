<template>
  <div class="project-hero-card" data-aos="fade-up">
    
    <div class="hero-content">
      
      <!-- Title -->
      <h1 class="hero-main-title txt-h1-4xl">{{ title }}</h1>
      
      <!-- Description -->
      <p class="project-description txt-p-lg">{{ description }}</p>
      
      <!-- Tags/Badges -->
      <div class="project-tags">
        <span 
          v-for="(tag, index) in tags" 
          :key="index" 
          class="tag-badge txt-label-sm"
        >
          <span v-if="getTagIcon(tag)" class="tag-icon">
            <img v-if="getTagIcon(tag).type === 'local'" 
                 :src="getTagIcon(tag).src" 
                 :alt="getTagIcon(tag).alt" 
                 class="icon-img-xs" />
            <span v-else class="icon-xs">{{ getTagIcon(tag).src }}</span>
          </span>
          {{ tag }}
        </span>
      </div>
      
      <!-- Key Achievements (2 columns) -->
      <div class="achievements-grid">
        <div class="achievement-column">
          <div 
            v-for="(achievement, index) in achievementsCol1" 
            :key="index" 
            class="achievement-item"
          >
            <span class="achievement-emoji icon-lg">
              <img v-if="getAchievementIcon(achievement.emoji).type === 'local'" 
                   :src="getAchievementIcon(achievement.emoji).src" 
                   :alt="getAchievementIcon(achievement.emoji).alt" 
                   class="icon-img-lg" />
              <span v-else class="icon-lg">{{ getAchievementIcon(achievement.emoji).src }}</span>
            </span>
            <span class="achievement-label txt-label-md">{{ achievement.label }}:</span>
            <span class="achievement-value txt-p-md">{{ achievement.value }}</span>
          </div>
        </div>
        
        <div class="achievement-column">
          <div 
            v-for="(achievement, index) in achievementsCol2" 
            :key="index" 
            class="achievement-item"
          >
            <span class="achievement-emoji icon-lg">
              <img v-if="getAchievementIcon(achievement.emoji).type === 'local'" 
                   :src="getAchievementIcon(achievement.emoji).src" 
                   :alt="getAchievementIcon(achievement.emoji).alt" 
                   class="icon-img-lg" />
              <span v-else class="icon-lg">{{ getAchievementIcon(achievement.emoji).src }}</span>
            </span>
            <span class="achievement-label txt-label-md">{{ achievement.label }}:</span>
            <span class="achievement-value txt-p-md">{{ achievement.value }}</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { resolveIcon } from '../../utils/iconResolver.js'

export default {
  name: 'ProjectHeroCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    achievementsCol1: {
      type: Array,
      required: true
    },
    achievementsCol2: {
      type: Array,
      required: true
    }
  },
  methods: {
    getTagIcon(tagText) {
      // Map tag text to icon names
      const tagIconMap = {
        'Mission Critical': 'critical',
        'Real-time Processing': 'realtime',
        'Enterprise Scale': 'enterprise',
        'Zero Downtime': 'uptime',
        'Revolutionary Employee Benefits': 'award',
        '90% Flight Discounts': 'financial',
        'Machine Learning Analytics': 'analytics',
        'Last-Minute Bookings': 'realtime',
        '90% Employee Discount': 'financial',
        'Refund Management': 'automation',
        'Enterprise Application': 'enterprise',
        'Microservices': 'microservices',
        'Azure Service Fabric': 'azure service fabric',
        'SAP Integration': 'integration',
        'Enterprise Architecture': 'architecture',
        'Large Scale Project': 'enterprise',
        'Smart City Solutions': 'smart city',
        'GIS Integration': 'gis',
        'IoT Monitoring': 'iot',
        'Municipal Management': 'municipal',
        'Real-time Analytics': 'analytics',
        'Urban Planning': 'urban planning',
        'Point of Sale': 'ecommerce',
        'F&B Management': 'enterprise',
        'Restaurant Technology': 'services',
        'Microservices': 'microservices',
        'Real-time Processing': 'realtime',
        'Multi-location': 'location',
        'Gamification': 'automation',
        'Employee Engagement': 'user',
        'Performance Management': 'performance',
        'Analytics': 'analytics'
      }
      const iconName = tagIconMap[tagText]
      return iconName ? resolveIcon(iconName) : null
    },
    getAchievementIcon(iconName) {
      return resolveIcon(iconName)
    }
  }
}
</script>

<style scoped>
/* Project Hero Card - Custom Purple Gradient Design */
.project-hero-card {
  background: 
    radial-gradient(circle at 15% 20%, rgba(139, 92, 246, 0.22) 0%, transparent 45%),
    radial-gradient(circle at 85% 80%, rgba(168, 85, 247, 0.18) 0%, transparent 45%),
    radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.12) 0%, transparent 55%),
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
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

/* Glassmorphism effect - Top border */
.project-hero-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    transparent 100%
  );
  z-index: 1;
}

/* Vibrant Gradient Overlay */
.project-hero-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.12) 0%, transparent 40%),
    linear-gradient(135deg, 
      rgba(147, 51, 234, 0.08) 0%, 
      rgba(168, 85, 247, 0.06) 25%,
      rgba(236, 72, 153, 0.05) 50%,
      rgba(59, 130, 246, 0.06) 75%,
      rgba(139, 92, 246, 0.08) 100%
    );
  pointer-events: none;
  z-index: 0;
  opacity: 0.8;
  animation: pulseGlow 8s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100%;
}

/* Title */
.hero-main-title {
  color: #ffffff;
  font-weight: 600 !important;
  margin-bottom: 20px;
  line-height: 1.3;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Description */
.project-description {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  margin-bottom: 30px;
  text-align: justify;
  text-justify: inter-word;
  
  /* Mobile: Use hyphen-based justification */
  @media (max-width: 768px) {
    text-justify: auto;
    hyphens: auto;
  }
}

/* Tags Container */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 30px;
  justify-content: flex-start;
}

.tag-badge {
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.4);
  color: rgba(255, 255, 255, 0.95);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-style: normal;
  white-space: nowrap;
}

.tag-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tag-badge:hover {
  background: rgba(139, 92, 246, 0.3);
  border-color: rgba(139, 92, 246, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

/* Achievements Grid */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
}

.achievement-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.achievement-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateX(5px);
}

.achievement-emoji {
  flex-shrink: 0;
  line-height: 1;
  font-style: normal;
  display: inline-block;
  min-width: 24px;
}

.achievement-label {
  font-weight: 600;
  color: #7c3aed;
}

.achievement-value {
  color: rgba(255, 255, 255, 0.85);
}

/* Tablet */
@media (pointer: coarse) and (min-width: 768px) and (max-width: 1199px) {
  .project-hero-card {
    padding: 35px;
  }
  
  .achievements-grid {
    gap: 16px;
  }
  
  .achievement-column {
    gap: 14px;
  }
}

/* Mobile */
@media (pointer: coarse) and (max-width: 767px) {
  .project-hero-card {
    padding: 25px;
  }
  
  .achievements-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .achievement-column {
    gap: 12px;
  }
  
  .project-tags {
    gap: 8px;
    justify-content: center;
  }
  
  .tag-badge {
    padding: 6px 12px;
    flex: 0 0 auto;
  }
}

</style>

