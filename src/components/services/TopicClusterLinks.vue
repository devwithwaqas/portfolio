<template>
  <ReusableCard
    v-if="cluster"
    title="Part of cluster"
    icon-name="services"
    class="mb-4 topic-cluster-links"
  >
    <p class="topic-cluster-intro txt-p-lg mb-3">
      {{ cluster.name }} — explore related topics:
    </p>
    <div class="topic-cluster-links-list">
      <router-link
        v-for="(item, index) in cluster.members"
        :key="index"
        :to="item.path"
        class="topic-cluster-link"
      >
        <span class="topic-cluster-title">{{ item.title }}</span>
        <i class="bi bi-arrow-right"></i>
      </router-link>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'
import { getClusterForService, getClusterForProject, getClusterForBlog } from '../../config/topicClusters.js'

export default {
  name: 'TopicClusterLinks',
  components: { ReusableCard },
  props: {
    /** Current path, e.g. /services/full-stack-development or /projects/heat-exchanger (not used when pageType is 'blog') */
    currentPath: {
      type: String,
      default: ''
    },
    /** 'service', 'project', or 'blog' — which cluster lookup to use */
    pageType: {
      type: String,
      default: 'service',
      validator: (v) => ['service', 'project', 'blog'].includes(v)
    },
    /** Article topic for pageType='blog', e.g. "Cloud", "Architecture" */
    topic: {
      type: String,
      default: ''
    }
  },
  computed: {
    cluster() {
      if (this.pageType === 'blog') return getClusterForBlog(this.topic)
      if (this.pageType === 'project') return getClusterForProject(this.currentPath)
      return getClusterForService(this.currentPath)
    }
  }
}
</script>

<style scoped>
.topic-cluster-intro {
  color: #4b5563;
}

.topic-cluster-links-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.topic-cluster-link {
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

.topic-cluster-link:hover {
  border-color: rgba(139, 92, 246, 0.5);
  color: #7c3aed;
  background: rgba(139, 92, 246, 0.06);
}

.topic-cluster-title {
  font-size: 1rem;
}

.topic-cluster-link i {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
