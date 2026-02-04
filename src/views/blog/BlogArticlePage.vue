<template>
  <ArticlePageTemplate
    v-if="article"
    :article-title="article.title"
    :related-articles-list="relatedArticlesList"
    :related-service-keys="article.relatedServices || []"
    :article-topic="article.topic || ''"
  >
    <template #hero>
      <div id="article-hero" class="article-hero-block">
        <h1 class="article-title">{{ article.title }}</h1>
        <p class="article-lead">{{ article.excerpt }}</p>
        <span class="article-meta">{{ formatDate(article.date) }} · {{ article.author }}</span>
      </div>
    </template>
    <template #main>
      <MarkdownContent :content="mainContent" />
    </template>
    <template #faq v-if="faqContent">
      <MarkdownContent :content="faqContent" />
    </template>
    <template #sidebar>
      <!-- Optional TOC or author card -->
    </template>
  </ArticlePageTemplate>
  <div v-else class="container py-5">
    <p>Article not found.</p>
    <router-link to="/blog">Back to Blog</router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ArticlePageTemplate from '@/components/common/ArticlePageTemplate.vue'
import MarkdownContent from '@/components/blog/MarkdownContent.vue'
import { getArticleBySlug, getRelatedArticlesBySlugs, getArticlesInSameTopic } from '@/config/blogArticles.js'

export default {
  name: 'BlogArticlePage',
  components: {
    ArticlePageTemplate,
    MarkdownContent
  },
  setup() {
    const route = useRoute()
    const article = computed(() => getArticleBySlug(route.params.slug))
    const faqMarker = '## Frequently Asked Questions'
    const mainContent = computed(() => {
      const c = article.value?.content
      if (!c) return ''
      const idx = c.indexOf(faqMarker)
      return idx >= 0 ? c.slice(0, idx).trim() : c
    })
    const faqContent = computed(() => {
      const c = article.value?.content
      if (!c) return ''
      const idx = c.indexOf(faqMarker)
      return idx >= 0 ? c.slice(idx).trim() : ''
    })
    const relatedArticlesList = computed(() => {
      if (!article.value) return []
      const slugs = article.value.relatedArticleSlugs
      if (slugs && slugs.length > 0) {
        return getRelatedArticlesBySlugs(slugs).map(a => ({
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          date: a.date,
          path: `/blog/${a.slug}`
        }))
      }
      return getArticlesInSameTopic(article.value.topic, article.value.slug).map(a => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        date: a.date,
        path: `/blog/${a.slug}`
      }))
    })
    function formatDate(dateStr) {
      if (!dateStr) return ''
      try {
        const d = new Date(dateStr)
        return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      } catch {
        return dateStr
      }
    }
    return { article, mainContent, faqContent, relatedArticlesList, formatDate }
  }
}
</script>

<style scoped>
.article-hero-block {
  margin-bottom: 2rem;
}
.article-title {
  font-size: var(--pf-text-3xl, 1.875rem);
  font-weight: 700;
  color: var(--heading-color, #45505b);
  margin-bottom: 0.75rem;
  line-height: 1.25;
}
.article-lead {
  font-size: var(--pf-text-lg, 1.125rem);
  color: var(--pf-text-secondary, #4b5563);
  margin-bottom: 0.5rem;
  line-height: 1.6;
}
.article-meta {
  font-size: var(--pf-text-sm, 0.875rem);
  color: #6b7280;
}
@media (min-width: 768px) {
  .article-title {
    font-size: var(--pf-text-4xl, 2.25rem);
  }
}
</style>
