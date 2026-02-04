<template>
  <router-link :to="`/blog/${article.slug}`" class="blog-card-link">
    <div class="blog-card">
      <div v-if="article.image" class="blog-card-image">
        <img :src="article.image" :alt="article.title" loading="lazy" />
      </div>
      <div class="blog-card-body">
        <h3 class="blog-card-title">{{ article.title }}</h3>
        <p class="blog-card-excerpt article-lead">{{ article.excerpt }}</p>
        <span class="blog-card-date">{{ formatDate(article.date) }}</span>
      </div>
      <i class="bi bi-arrow-right blog-card-arrow"></i>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'BlogCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return ''
      try {
        const d = new Date(dateStr)
        return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      } catch {
        return dateStr
      }
    }
  }
}
</script>

<style scoped>
.blog-card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  min-height: 0;
}
.blog-card {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 245, 255, 0.98) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  transition: all 0.2s ease;
}
.blog-card-link:hover .blog-card {
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(139, 92, 246, 0.06);
}
.blog-card-image {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 12px;
}
.blog-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.blog-card-body {
  flex: 1;
}
.blog-card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.3;
}
.blog-card-excerpt {
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 8px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-card-date {
  font-size: 0.85rem;
  color: #6b7280;
}
.blog-card-arrow {
  margin-top: 8px;
  font-size: 1rem;
  color: rgba(139, 92, 246, 0.8);
}
</style>
