<template>
  <ReusableCard 
    title="Related Services" 
    icon-name="services"
    class="mb-4"
  >
    <div class="related-services-content">
      <p v-if="introduction" class="related-intro txt-p-lg mb-4">
        {{ introduction }}
      </p>
      
      <div class="row g-3">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="col-md-6 col-lg-4"
        >
          <router-link :to="service.path" class="service-link-card">
            <div class="service-link-icon">
              <i :class="service.icon || 'bi bi-code-square'"></i>
            </div>
            <h4 class="service-link-title txt-h5-lg">{{ service.title }}</h4>
            <p class="service-link-description txt-p-md">{{ service.description }}</p>
            <div class="service-link-arrow">
              <i class="bi bi-arrow-right"></i>
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
  name: 'RelatedServices',
  components: {
    ReusableCard
  },
  props: {
    services: {
      type: Array,
      required: true,
      default: () => []
    },
    introduction: {
      type: String,
      default: 'Explore related professional software engineering services offered by this IT engineering consultant:'
    }
  }
}
</script>

<style scoped>
.related-services-content {
  padding: 20px 0;
}

.related-intro {
  color: #4b5563;
  text-align: center;
  line-height: 1.8;
}

.service-link-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 255, 0.95) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 25px;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.1);
  position: relative;
}

.service-link-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(250, 245, 255, 1) 100%);
  border-color: rgba(139, 92, 246, 0.5);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.25);
  text-decoration: none;
  color: inherit;
}

.service-link-icon {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(139, 92, 246, 0.15);
  border-radius: 50%;
  color: #7c3aed;
  font-size: 1.8rem;
  transition: all 0.3s ease;
}

.service-link-card:hover .service-link-icon {
  background: rgba(139, 92, 246, 0.25);
  transform: scale(1.1);
}

.service-link-title {
  color: #374151;
  margin-bottom: 12px;
  font-weight: 600;
  flex: 1;
}

.service-link-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 15px;
  flex: 1;
}

.service-link-arrow {
  margin-top: auto;
  color: rgba(139, 92, 246, 0.9);
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.service-link-card:hover .service-link-arrow {
  transform: translateX(5px);
  color: #7c3aed;
}
</style>
