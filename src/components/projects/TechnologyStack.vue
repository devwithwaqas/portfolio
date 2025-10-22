<template>
  <ReusableCard :title="title" class="mb-4">
    <div class="row g-3">
      
      <!-- Dynamically render each category that has technologies -->
      <div 
        v-for="(category, index) in categoriesWithTech" 
        :key="index"
        :class="columnClass"
      >
        <!-- Category Card -->
        <div class="tech-category-card">
          <h4 class="tech-section-title">
            <div class="category-icon-wrapper icon-wrapper-xl">
              <!-- Devicon SVG -->
              <img 
                v-if="getCategoryIconData(category.icon).type === 'devicon'" 
                :src="getDeviconSvgUrl(getCategoryIconData(category.icon).src)"
                :alt="category.name"
                class="category-icon icon-img-xl"
                :title="category.name"
              />
              <!-- Local Image -->
              <img 
                v-else-if="getCategoryIconData(category.icon).type === 'local'" 
                :src="getCategoryIconData(category.icon).src" 
                :alt="category.name"
                class="category-icon icon-img-xl"
              />
              <!-- Emoji Fallback -->
              <span 
                v-else 
                class="category-icon icon-xl"
              >{{ getCategoryIconData(category.icon).src }}</span>
            </div>
            <span class="category-name">{{ category.name }}</span>
          </h4>
          <div class="tech-grid">
            <div 
              v-for="(tech, techIndex) in category.technologies" 
              :key="techIndex" 
              class="tech-item"
            >
              <div class="tech-icon-wrapper icon-wrapper-xl">
                <!-- Devicon SVG -->
                <img 
                  v-if="tech.iconData.type === 'devicon'" 
                  :src="getDeviconSvgUrl(tech.iconData.src)"
                  :alt="tech.name"
                  class="icon-img-xl"
                  :title="tech.name"
                />
                <!-- Local Image -->
                <img 
                  v-else-if="tech.iconData.type === 'local'" 
                  :src="tech.iconData.src" 
                  :alt="tech.iconData.alt"
                  class="icon-img-xl"
                />
                <!-- Emoji Fallback -->
                <span 
                  v-else 
                  class="icon-xl"
                >{{ tech.iconData.src }}</span>
              </div>
              <div class="tech-content">
                <strong class="tech-name txt-p-md">{{ tech.name }}</strong>
                <span v-if="tech.description" class="tech-desc txt-p-sm"> - {{ tech.description }}</span>
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
import { resolveIcon, getDeviconClass as getDeviconClassUtil, getDeviconSvgUrl as getDeviconSvgUrlUtil } from '../../utils/iconResolver.js'
import { TECH_CATEGORIES, TECH_CATEGORY_LABELS } from '../../config/constants.js'

// Define all possible categories using constants
const CATEGORIES = [
  { key: TECH_CATEGORIES.FRONTEND, name: TECH_CATEGORY_LABELS[TECH_CATEGORIES.FRONTEND], icon: 'frontend' },
  { key: TECH_CATEGORIES.BACKEND, name: TECH_CATEGORY_LABELS[TECH_CATEGORIES.BACKEND], icon: 'backend' },
  { key: TECH_CATEGORIES.DATABASE, name: TECH_CATEGORY_LABELS[TECH_CATEGORIES.DATABASE], icon: 'database' },
  { key: TECH_CATEGORIES.CLOUD, name: TECH_CATEGORY_LABELS[TECH_CATEGORIES.CLOUD], icon: 'cloud hosting' },
  { key: TECH_CATEGORIES.DEVOPS, name: TECH_CATEGORY_LABELS[TECH_CATEGORIES.DEVOPS], icon: 'ci/cd pipeline' },
  { key: TECH_CATEGORIES.MONITORING, name: TECH_CATEGORY_LABELS[TECH_CATEGORIES.MONITORING], icon: 'monitoring' },
  { key: TECH_CATEGORIES.ANALYTICS, name: TECH_CATEGORY_LABELS[TECH_CATEGORIES.ANALYTICS], icon: 'analytics' },
  { key: TECH_CATEGORIES.API, name: TECH_CATEGORY_LABELS[TECH_CATEGORIES.API], icon: 'api' },
  { key: TECH_CATEGORIES.SECURITY, name: TECH_CATEGORY_LABELS[TECH_CATEGORIES.SECURITY], icon: 'security' },
  { key: TECH_CATEGORIES.COMMUNICATION, name: TECH_CATEGORY_LABELS[TECH_CATEGORIES.COMMUNICATION], icon: 'communication' },
  { key: TECH_CATEGORIES.TESTING, name: TECH_CATEGORY_LABELS[TECH_CATEGORIES.TESTING], icon: 'testing' },
  { key: 'other', name: 'Other Technologies', icon: 'services' }
]

export default {
  name: 'TechnologyStack',
  components: {
    ReusableCard
  },
  props: {
    title: {
      type: String,
      default: 'Technology Stack'
    },
    technologies: {
      type: Array,
      required: true
    },
    columnsPerRow: {
      type: Number,
      default: 2,
      validator: (value) => [1, 2, 3, 4].includes(value)
    }
  },
  computed: {
    // Bootstrap column class based on columns per row
    columnClass() {
      const colMap = {
        1: 'col-12',
        2: 'col-12 col-md-6',
        3: 'col-12 col-md-6 col-lg-4',
        4: 'col-12 col-md-6 col-lg-3'
      }
      return colMap[this.columnsPerRow]
    },
    // Group technologies by category and resolve icons
    categoriesWithTech() {
      if (!this.technologies || this.technologies.length === 0) {
        console.warn('TechnologyStack: No technologies provided')
        return []
      }
      
      const grouped = {}
      
      // Initialize all categories
      CATEGORIES.forEach(cat => {
        grouped[cat.key] = {
          ...cat,
          technologies: []
        }
      })
      
      // Group technologies
      this.technologies.forEach(tech => {
        const category = tech.category || 'other'
        if (grouped[category]) {
          grouped[category].technologies.push({
            ...tech,
            iconData: resolveIcon(tech.name)
          })
        }
      })
      
      // Return only categories that have technologies
      const result = CATEGORIES
        .map(cat => grouped[cat.key])
        .filter(cat => cat.technologies.length > 0)
      
      console.log('TechnologyStack categories:', result)
      return result
    }
  },
  methods: {
    getDeviconClass(iconName) {
      return getDeviconClassUtil(iconName)
    },
    getDeviconSvgUrl(iconName) {
      return getDeviconSvgUrlUtil(iconName)
    },
    getCategoryIconData(iconName) {
      // Use iconResolver to get proper icons for categories
      return resolveIcon(iconName)
    }
  }
}
</script>

<style scoped>
/* Category Card Container */
.tech-category-card {
  position: relative;
  background: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 245, 255, 0.9) 100%
  );
  border: 2px solid transparent;
  border-radius: 16px;
  padding: 28px;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 20px rgba(139, 92, 246, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  background-clip: padding-box;
}

.tech-category-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.6) 0%, 
    rgba(236, 72, 153, 0.5) 50%,
    rgba(99, 102, 241, 0.6) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.5;
  transition: opacity 0.4s ease;
}

.tech-category-card:hover {
  box-shadow: 
    0 12px 40px rgba(139, 92, 246, 0.2),
    0 6px 16px rgba(236, 72, 153, 0.12),
    0 0 0 1px rgba(139, 92, 246, 0.1) inset;
  transform: translateY(-6px) scale(1.01);
}

.tech-category-card:hover::before {
  opacity: 1;
}

/* Tech Section Titles */
.tech-section-title {
  color: #7c3aed;
  font-weight: 600;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(139, 92, 246, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.local-category-icon {
  object-fit: contain;
}

.category-name {
  flex: 1;
}

/* Tech Grid - Each item in its own row */
.tech-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Tech Item - Modern chip/badge style */
.tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.06) 0%, 
    rgba(236, 72, 153, 0.04) 100%
  );
  border-radius: 10px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.tech-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, 
    rgba(139, 92, 246, 0.8) 0%, 
    rgba(236, 72, 153, 0.8) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tech-item:hover {
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.12) 0%, 
    rgba(236, 72, 153, 0.08) 100%
  );
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 
    0 6px 20px rgba(139, 92, 246, 0.18),
    0 2px 6px rgba(236, 72, 153, 0.1);
  transform: translateX(4px);
}

.tech-item:hover::before {
  opacity: 1;
}

/* Icon Wrapper - Modern gradient background */
.tech-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.12) 0%, 
    rgba(236, 72, 153, 0.1) 100%
  );
  border-radius: 10px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-item:hover .tech-icon-wrapper {
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.2) 0%, 
    rgba(236, 72, 153, 0.16) 100%
  );
  border-color: rgba(139, 92, 246, 0.4);
  transform: scale(1.1) rotate(-3deg);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

/* Icon sizes now managed by font-sizes.css */

/* Text Content - Flexible column */
.tech-content {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  line-height: 1.6;
  padding-top: 4px;
}

.tech-name {
  color: #7c3aed;
  font-weight: 600;
}

.tech-desc {
  color: #6b7280;
}

/* Mobile - Keep grid layout */
@media (max-width: 767px) {
  .tech-item {
    grid-template-columns: 36px 1fr;
    gap: 10px;
  }
  
  /* Icon sizes now managed by font-sizes.css responsive classes */
}
</style>
