<template>
  <ReusableCard 
    title="Related Projects" 
    icon-name="project portfolio"
    class="mb-4"
  >
    <div class="related-projects-content">
      <p v-if="introduction" class="related-intro txt-p-lg mb-4">
        {{ introduction }}
      </p>
      
      <div class="row g-3">
        <div 
          v-for="(project, index) in projects" 
          :key="index"
          class="col-md-6 col-lg-4"
        >
          <router-link :to="project.path" class="project-link-card">
            <div v-if="project.image" class="project-link-image">
              <img :src="project.image" :alt="`${project.title} - Enterprise Software Project`" />
            </div>
            <div class="project-link-content">
              <h5 class="project-link-title txt-h5-lg">{{ project.title }}</h5>
              <p class="project-link-description txt-p-md">{{ project.description }}</p>
              <div class="project-link-tech">
                <span 
                  v-for="(tech, techIndex) in project.technologies" 
                  :key="techIndex"
                  class="tech-badge"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="project-link-arrow">
                <i class="bi bi-arrow-right"></i> View Project
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from './ReusableCard.vue'

export default {
  name: 'RelatedProjects',
  components: {
    ReusableCard
  },
  props: {
    projects: {
      type: Array,
      required: true,
      default: () => []
    },
    introduction: {
      type: String,
      default: 'Explore related projects I\'ve worked on:'
    }
  }
}
</script>

<style scoped>
.related-projects-content {
  padding: 20px 0;
}

.related-intro {
  color: #4b5563;
  text-align: center;
  line-height: 1.8;
}

.project-link-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 255, 0.95) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
}

.project-link-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(250, 245, 255, 1) 100%);
  border-color: rgba(139, 92, 246, 0.5);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.25);
  text-decoration: none;
  color: inherit;
}

.project-link-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
}

.project-link-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-link-card:hover .project-link-image img {
  transform: scale(1.1);
}

.project-link-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-link-title {
  color: #374151;
  margin-bottom: 12px;
  font-weight: 600;
}

.project-link-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 15px;
  flex: 1;
}

.project-link-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.tech-badge {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #7c3aed;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.project-link-arrow {
  margin-top: auto;
  color: rgba(139, 92, 246, 0.9);
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.project-link-card:hover .project-link-arrow {
  transform: translateX(5px);
  color: #7c3aed;
}
</style>
