<template>
  <section id="skills" class="skills section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      
      <!-- Skills Card -->
      <ReusableCard 
        title="Technical Skills" 
        icon-name="skills"
        body-padding="0"
      >

              <!-- Core Technologies -->
              <div class="row g-2 g-md-3 g-lg-4 mb-5">
                <div class="col-12">
                  <h3 class="text-center mb-4 txt-h3-2xl skills-section-title">
                    <IconComponent icon-name="core technologies" fallback-emoji="🏆" size="lg" style="margin-right: 10px;" />
                    Core Technologies
                  </h3>
                </div>
                
                <SkillCard v-for="(skill, index) in coreSkills" :key="'core-' + index"
                  :name="skill.name"
                  :icon="skill.icon"
                  :percentage="skill.percentage"
                  :category="skill.category"
                  :level="skill.level"
                />
              </div>

              <!-- Frontend Technologies -->
              <div class="row g-2 g-md-3 g-lg-4 mb-5">
                <div class="col-12">
                  <h3 class="text-center mb-4 txt-h3-2xl skills-section-title">
                    <IconComponent icon-name="frontend technologies" fallback-emoji="🎨" size="lg" style="margin-right: 10px;" />
                    Frontend Technologies
                  </h3>
                </div>
                
                <SkillCard v-for="(skill, index) in frontendSkills" :key="'frontend-' + index"
                  :name="skill.name"
                  :icon="skill.icon"
                  :percentage="skill.percentage"
                  :category="skill.category"
                  :level="skill.level"
                />
              </div>

              <!-- Backend & Database -->
              <div class="row g-2 g-md-3 g-lg-4 mb-5">
                <div class="col-12">
                  <h3 class="text-center mb-4 txt-h3-2xl skills-section-title">
                    <IconComponent icon-name="backend & database" fallback-emoji="⚙️" size="lg" style="margin-right: 10px;" />
                    Backend & Database
                  </h3>
                </div>
                
                <SkillCard v-for="(skill, index) in backendSkills" :key="'backend-' + index"
                  :name="skill.name"
                  :icon="skill.icon"
                  :percentage="skill.percentage"
                  :category="skill.category"
                  :level="skill.level"
                />
              </div>

              <!-- Cloud & DevOps -->
              <div class="row g-2 g-md-3 g-lg-4 mb-5">
                <div class="col-12">
                  <h3 class="text-center mb-4 txt-h3-2xl skills-section-title">
                    <IconComponent icon-name="cloud & devops" fallback-emoji="☁️" size="lg" style="margin-right: 10px;" />
                    Cloud & DevOps
                  </h3>
                </div>
                
                <SkillCard v-for="(skill, index) in cloudDevOpsSkills" :key="'cloud-' + index"
                  :name="skill.name"
                  :icon="skill.icon"
                  :percentage="skill.percentage"
                  :category="skill.category"
                  :level="skill.level"
                />
              </div>

              <!-- Additional Skills -->
              <div class="row g-2 g-md-3 g-lg-4">
                <div class="col-12">
                  <h3 class="text-center mb-4 txt-h3-2xl skills-section-title">
                    <IconComponent icon-name="additional skills" fallback-emoji="🛠️" size="lg" style="margin-right: 10px;" />
                    Additional Skills
                  </h3>
                </div>
                
                <!-- Data & Analytics -->
                <div class="col-12 mb-5">
                  <div class="skill-category-card">
                    <div class="category-header">
                      <LazyImage 
                        :src="$assetPath('/assets/img/Icons/analytics.png')" 
                        alt="Data Analytics - Performance Monitoring - Database Optimization - Remote Consultant" 
                        image-class="category-icon icon-img-lg"
                        container-class="category-icon-container"
                      />
                      <h3>📊 Data & Analytics</h3>
                    </div>
                    <div class="row">
                      <SkillCard v-for="(skill, index) in dataAnalyticsSkills" :key="'data-' + index"
                        :name="skill.name"
                        :icon="skill.icon"
                        :percentage="skill.percentage"
                        :category="skill.category"
                        :level="skill.level"
                      />
                    </div>
                  </div>
                </div>
                
                <!-- Project Management -->
                <div class="col-12 mb-5">
                  <div class="skill-category-card">
                    <div class="category-header">
                      <LazyImage 
                        :src="$assetPath('/assets/img/Icons/pipelines.png')" 
                        alt="Project Management - Agile Scrum - Team Leadership - Remote Consultant" 
                        image-class="category-icon icon-img-lg"
                        container-class="category-icon-container"
                      />
                      <h4>🎯 Project Management</h4>
                    </div>
                    <div class="row">
                      <SkillCard v-for="(skill, index) in projectManagementSkills" :key="'pm-' + index"
                        :name="skill.name"
                        :icon="skill.icon"
                        :percentage="skill.percentage"
                        :category="skill.category"
                        :level="skill.level"
                      />
                    </div>
                  </div>
                </div>
                
                <!-- Microsoft & Enterprise Tools -->
                <div class="col-12">
                  <div class="skill-category-card">
                    <div class="category-header">
                      <LazyImage 
                        :src="$assetPath('/assets/img/Icons/power apps.png')" 
                        alt="Microsoft Enterprise Tools - Power Apps SharePoint SignalR - Remote Consultant" 
                        image-class="category-icon icon-img-lg"
                        container-class="category-icon-container"
                      />
                      <h4>🛠️ Microsoft & Enterprise Tools</h4>
                    </div>
                    <div class="row">
                      <SkillCard v-for="(skill, index) in microsoftToolsSkills" :key="'ms-' + index"
                        :name="skill.name"
                        :icon="skill.icon"
                        :percentage="skill.percentage"
                        :category="skill.category"
                        :level="skill.level"
                      />
                    </div>
                  </div>
                </div>
              </div>

      </ReusableCard>

    </div>
  </section><!-- /Skills Section -->
</template>

<script>
import { defineAsyncComponent } from 'vue'
import ReusableCard from '../common/ReusableCard.vue'
import IconComponent from '../common/IconComponent.vue'
import LazyImage from '../common/LazyImage.vue'
import { getSkillsData } from '../../data/skillsData.js'

const SkillCard = defineAsyncComponent(() => import('../common/SkillCard.vue'))

const skillsData = getSkillsData()

export default {
  name: 'Skills',
  components: {
    ReusableCard,
    SkillCard,
    IconComponent,
    LazyImage
  },
  data() {
    return {
      coreSkills: skillsData.coreSkills,
      frontendSkills: skillsData.frontendSkills,
      backendSkills: skillsData.backendSkills,
      cloudDevOpsSkills: skillsData.cloudDevOpsSkills,
      dataAnalyticsSkills: skillsData.dataAnalyticsSkills,
      projectManagementSkills: skillsData.projectManagementSkills,
      microsoftToolsSkills: skillsData.microsoftToolsSkills
    }
  }
}
</script>

<style scoped>
/* All cyber card styling now handled by SkillCard.vue component */
/* Subcategory card styling */

.skill-category-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
  border-radius: 20px;
  padding: 25px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(5, 99, 187, 0.1);
  margin-bottom: 20px;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(5, 99, 187, 0.2);
}

.category-icon {
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(5, 99, 187, 0.3));
}

.category-icon-container {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 !important;
  padding: 0 !important;
  width: auto !important;
  height: auto !important;
  line-height: 0 !important;
  vertical-align: middle !important;
  flex-shrink: 0 !important;
}

.category-icon-container img {
  display: block !important;
  width: auto !important;
  height: auto !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
  object-position: center !important;
  margin: 0 !important;
  padding: 0 !important;
}

.skills-section-title {
  color: #0563bb;
  font-weight: 600;
}

.category-header h5 {
  margin: 0;
  color: #0563bb;
  font-weight: 600;
  /* Font size handled by font-sizes.css */
}

/* Remove icon wrapper boxes (background, border, border-radius) in Skills section */
.skills-section-title .icon-wrapper-xs,
.skills-section-title .icon-wrapper-sm,
.skills-section-title .icon-wrapper-md,
.skills-section-title .icon-wrapper-lg,
.skills-section-title .icon-wrapper-xl,
.skills-section-title .icon-wrapper-2xl {
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transform: none !important;
}

.skills-section-title .icon-wrapper-xs:hover,
.skills-section-title .icon-wrapper-sm:hover,
.skills-section-title .icon-wrapper-md:hover,
.skills-section-title .icon-wrapper-lg:hover,
.skills-section-title .icon-wrapper-xl:hover,
.skills-section-title .icon-wrapper-2xl:hover {
  background: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  transform: none !important;
}
</style>