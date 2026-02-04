<template>
  <ReusableCard
    v-if="articles.length > 0"
    title="Related articles"
    icon-name="services"
    class="mb-4"
  >
    <p class="related-articles-intro txt-p-lg mb-3">You might also like:</p>
    <div class="related-articles-links">
      <router-link
        v-for="(item, index) in articles"
        :key="index"
        :to="item.path || `/blog/${item.slug}`"
        class="related-article-link"
      >
        <span class="related-article-title">{{ item.title || item.slug }}</span>
        <i class="bi bi-arrow-right"></i>
      </router-link>
    </div>
  </ReusableCard>
</template>

<script>
import ReusableCard from '../common/ReusableCard.vue'

export default {
  name: 'RelatedArticles',
  components: { ReusableCard },
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.related-articles-intro {
  color: #4b5563;
}
.related-articles-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.related-article-link {
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
.related-article-link:hover {
  border-color: rgba(139, 92, 246, 0.5);
  color: #7c3aed;
  background: rgba(139, 92, 246, 0.06);
}
.related-article-title {
  font-size: 1rem;
}
</style>
