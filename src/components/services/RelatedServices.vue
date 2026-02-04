<template>
  <ReusableCard
    v-if="related.length > 0"
    title="Related services"
    icon-name="services"
    class="mb-4"
  >
    <p class="related-services-intro txt-p-lg mb-3">
      You might also need:
    </p>
    <div class="related-services-links">
      <router-link
        v-for="(item, index) in related"
        :key="index"
        :to="item.path"
        class="related-service-link"
      >
        <span class="related-service-title">{{ item.title }}</span>
        <i class="bi bi-arrow-right"></i>
      </router-link>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import { getRelatedServices } from '../../config/relatedServices.js'

export default {
  name: 'RelatedServices',
  components: {
    ReusableCard
  },
  props: {
    /** Current service path, e.g. /services/full-stack-development */
    currentPath: {
      type: String,
      required: true
    }
  },
  computed: {
    related() {
      return getRelatedServices(this.currentPath)
    }
  }
}
</script>

<style scoped>
.related-services-intro {
  color: #4b5563;
}

.related-services-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.related-service-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 245, 255, 0.98) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 10px;
  color: #374151;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.related-service-link:hover {
  border-color: rgba(139, 92, 246, 0.5);
  color: #7c3aed;
  background: rgba(139, 92, 246, 0.06);
}

.related-service-title {
  font-size: 1rem;
}

.related-service-link i {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
