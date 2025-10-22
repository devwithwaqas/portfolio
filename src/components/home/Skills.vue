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
                      <img src="/assets/img/Icons/analytics.png" alt="Analytics" class="category-icon icon-img-lg" />
                      <h5>📊 Data & Analytics</h5>
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
                      <img src="/assets/img/Icons/pipelines.png" alt="Project Management" class="category-icon icon-img-lg" />
                      <h5>🎯 Project Management</h5>
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
                      <img src="/assets/img/Icons/power apps.png" alt="Microsoft Tools" class="category-icon icon-img-lg" />
                      <h5>🛠️ Microsoft & Enterprise Tools</h5>
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
import ReusableCard from '../common/ReusableCard.vue'
import SkillCard from '../common/SkillCard.vue'
import IconComponent from '../common/IconComponent.vue'

export default {
  name: 'Skills',
  components: {
    ReusableCard,
    SkillCard,
    IconComponent
  },
  data() {
    return {
      coreSkills: [
        { name: 'C# & .NET Core', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', percentage: 95, category: 'BACKEND', level: 'EXPERT LEVEL' },
        { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg', percentage: 90, category: 'DATABASE', level: 'EXPERT LEVEL' },
        { name: 'Angular', icon: '/assets/img/Icons/Angular.svg', percentage: 85, category: 'FRONTEND', level: 'ADVANCED' },
        { name: 'Azure Cloud & DevOps', icon: '/assets/img/Icons/Azure.svg', percentage: 90, category: 'CLOUD', level: 'EXPERT LEVEL' },
        { name: 'Microservices', icon: '/assets/img/Icons/Docker.svg', percentage: 85, category: 'ARCHITECTURE', level: 'ADVANCED' },
        { name: 'REST APIs', icon: '/assets/img/Icons/api.svg', percentage: 85, category: 'INTEGRATION', level: 'ADVANCED' },
        { name: 'GitHub & Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', percentage: 85, category: 'VERSION CONTROL', level: 'ADVANCED' },
        { name: 'Visual Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-original.svg', percentage: 90, category: 'IDE', level: 'EXPERT LEVEL' }
      ],
      frontendSkills: [
        { name: 'HTML5 & CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', percentage: 90, category: 'MARKUP', level: 'EXPERT LEVEL' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', percentage: 85, category: 'SCRIPTING', level: 'ADVANCED' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', percentage: 80, category: 'TYPED JS', level: 'INTERMEDIATE' },
        { name: 'Bootstrap', icon: '/assets/img/Icons/bootstrap.png', percentage: 85, category: 'FRAMEWORK', level: 'ADVANCED' },
        { name: 'jQuery', icon: '/assets/img/Icons/jquery.png', percentage: 80, category: 'LIBRARY', level: 'INTERMEDIATE' },
        { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', percentage: 75, category: 'FRAMEWORK', level: 'INTERMEDIATE' }
      ],
      backendSkills: [
        { name: 'ASP.NET Core', icon: '/assets/img/Icons/NET core.svg', percentage: 90, category: 'FRAMEWORK', level: 'EXPERT LEVEL' },
        { name: 'Entity Framework', icon: '/assets/img/Icons/entity framework.png', percentage: 85, category: 'ORM', level: 'ADVANCED' }
      ],
      cloudDevOpsSkills: [
        { name: 'Azure Key Vault', icon: '/assets/img/Icons/azure key vault.png', percentage: 80, category: 'SECURITY', level: 'INTERMEDIATE' },
        { name: 'Azure App Insights', icon: '/assets/img/Icons/insights.png', percentage: 85, category: 'MONITORING', level: 'ADVANCED' },
        { name: 'Azure Storage', icon: '/assets/img/Icons/Azure.svg', percentage: 80, category: 'STORAGE', level: 'INTERMEDIATE' },
        { name: 'Azure Functions', icon: '/assets/img/Icons/Azure Functions.png', percentage: 85, category: 'SERVERLESS', level: 'ADVANCED' },
        { name: 'Docker', icon: '/assets/img/Icons/Docker.svg', percentage: 80, category: 'CONTAINER', level: 'INTERMEDIATE' },
        { name: 'CI/CD Automation', icon: '/assets/img/Icons/CI CD.svg', percentage: 85, category: 'DEVOPS', level: 'ADVANCED' },
        { name: 'Azure App Services', icon: '/assets/img/Icons/app services.svg', percentage: 90, category: 'HOSTING', level: 'EXPERT LEVEL' },
        { name: 'Azure Service Fabric', icon: '/assets/img/Icons/Azure Service Fabric.png', percentage: 80, category: 'MICROSERVICES', level: 'INTERMEDIATE' },
        { name: 'Azure Cosmos DB', icon: '/assets/img/Icons/cosmos db.png', percentage: 75, category: 'DATABASE', level: 'INTERMEDIATE' }
      ],
      dataAnalyticsSkills: [
        { name: 'LINQ Query Optimization', icon: '/assets/img/Icons/linq2sql.png', percentage: 85, category: 'QUERY', level: 'ADVANCED' },
        { name: 'Data Analytics Framework', icon: '/assets/img/Icons/analytics.png', percentage: 80, category: 'ANALYTICS', level: 'INTERMEDIATE' },
        { name: 'Performance Monitoring', icon: '/assets/img/Icons/monitoring.png', percentage: 75, category: 'MONITORING', level: 'INTERMEDIATE' },
        { name: 'Database Indexing', icon: '/assets/img/Icons/sql server.svg', percentage: 90, category: 'DATABASE', level: 'EXPERT LEVEL' }
      ],
      projectManagementSkills: [
        { name: 'Agile/Scrum Methodologies', icon: '/assets/img/Icons/pipelines.png', percentage: 85, category: 'METHODOLOGY', level: 'ADVANCED' },
        { name: 'Team Leadership', icon: '/assets/img/Icons/partners.png', percentage: 80, category: 'LEADERSHIP', level: 'INTERMEDIATE' },
        { name: 'Code Review & Mentoring', icon: '/assets/img/Icons/security.png', percentage: 90, category: 'MENTORING', level: 'EXPERT LEVEL' },
        { name: 'Technical Architecture', icon: '/assets/img/Icons/framework.png', percentage: 85, category: 'ARCHITECTURE', level: 'ADVANCED' }
      ],
      microsoftToolsSkills: [
        { name: 'Power Apps', icon: '/assets/img/Icons/power apps.png', percentage: 75, category: 'PLATFORM', level: 'INTERMEDIATE' },
        { name: 'SharePoint', icon: '/assets/img/Icons/sharepoint.png', percentage: 80, category: 'COLLABORATION', level: 'INTERMEDIATE' },
        { name: 'SignalR', icon: '/assets/img/Icons/signalr.png', percentage: 85, category: 'REALTIME', level: 'ADVANCED' },
        { name: 'Swagger UI', icon: '/assets/img/Icons/Swagger.svg', percentage: 90, category: 'API DOCS', level: 'EXPERT LEVEL' }
      ]
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
</style>