<template>
  <ReusableCard
    v-if="readingList.length > 0"
    title="Related reading"
    icon-name="services"
    class="mb-4 service-related-reading"
  >
    <p class="related-reading-intro txt-p-lg mb-3">
      Technical deep dives and articles that support this service:
    </p>
    <div class="related-reading-list">
      <router-link
        v-for="(item, index) in readingList"
        :key="index"
        :to="`/blog/${item.slug}`"
        class="related-reading-link"
      >
        <span class="related-reading-title">{{ item.title }}</span>
        <i class="bi bi-arrow-right"></i>
      </router-link>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '@/components/common/ReusableCard.vue'
import { getBlogSlugsForService } from '@/config/topicClusterLinking.js'
import { getArticleBySlug } from '@/config/blogArticles.js'

export default {
  name: 'ServiceRelatedReading',
  components: { ReusableCard },
  props: {
    /** Current path, e.g. /services/full-stack-development */
    currentPath: {
      type: String,
      default: ''
    }
  },
  computed: {
    readingList() {
      const slugs = getBlogSlugsForService(this.currentPath)
      return slugs
        .map((slug) => {
          const article = getArticleBySlug(slug)
          return { slug, title: article ? article.title : slug }
        })
        .filter((item) => item.title)
    }
  }
}
</script>

<style scoped>
.related-reading-intro {
  color: #4b5563;
}
.related-reading-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.related-reading-link {
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
.related-reading-link:hover {
  border-color: rgba(139, 92, 246, 0.5);
  color: #7c3aed;
  background: rgba(139, 92, 246, 0.06);
}
.related-reading-title {
  font-size: 1rem;
}
.related-reading-link i {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
