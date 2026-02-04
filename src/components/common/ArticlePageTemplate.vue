<template>
  <div class="article-page">
    <Breadcrumbs
      :currentPage="articleTitle"
      parentLink="/blog"
      parentLabel="Blog"
      variant="blog"
    />
    <article class="article-details section" id="article-details" itemscope itemtype="https://schema.org/BlogPosting">
      <div class="container" data-aos="fade-up">
        <!-- Hero (title, excerpt, date) - same ReusableCard as sections below for consistency -->
        <ReusableCard title="Article" icon-name="services" class="mb-4">
          <div id="article-hero" class="article-hero">
            <slot name="hero"></slot>
          </div>
        </ReusableCard>
        <!-- Main content - same ReusableCard for consistency; extra body padding for readability -->
        <ReusableCard title="Read the article" icon-name="services" class="mb-4 article-content-card" :body-padding="'24px 28px 24px 28px'">
          <div class="article-body">
            <slot name="main"></slot>
          </div>
        </ReusableCard>
        <!-- Sidebar (optional) -->
        <div v-if="$slots.sidebar" class="article-sidebar mt-4">
          <slot name="sidebar"></slot>
        </div>
        <!-- FAQ: same ReusableCard header padding as other cards for consistency -->
        <ReusableCard v-if="$slots.faq" title="Frequently Asked Questions" icon-name="services" class="mb-4 article-faq-card" :body-padding="'24px 28px 24px 28px'">
          <div class="article-body">
            <slot name="faq"></slot>
          </div>
        </ReusableCard>
        <!-- Related articles (same topic or relatedArticleSlugs) -->
        <RelatedArticles v-if="relatedArticles.length > 0" :articles="relatedArticles" class="mt-4" />
        <!-- Part of cluster (topic → service cluster for internal linking) -->
        <TopicClusterLinks v-if="articleTopic" page-type="blog" :topic="articleTopic" class="mt-4" />
        <!-- Related services (internal links) -->
        <div v-if="relatedServices.length > 0" class="article-related-services mt-4">
          <ReusableCard title="Related services" icon-name="services" class="mb-4">
            <p class="related-services-intro txt-p-lg mb-3">Services covered in this topic:</p>
            <div class="related-services-links">
              <router-link
                v-for="(item, index) in relatedServices"
                :key="index"
                :to="item.path"
                class="related-service-link"
              >
                <span class="related-service-title">{{ item.title }}</span>
                <i class="bi bi-arrow-right"></i>
              </router-link>
            </div>
          </ReusableCard>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Breadcrumbs from '../projects/Breadcrumbs.vue'
import ReusableCard from './ReusableCard.vue'
import RelatedArticles from '../blog/RelatedArticles.vue'
import TopicClusterLinks from '../services/TopicClusterLinks.vue'
import { SERVICE_PATHS } from '../../config/relatedServices.js'

const SERVICES_BASE = '/services'

export default {
  name: 'ArticlePageTemplate',
  components: {
    Breadcrumbs,
    ReusableCard,
    RelatedArticles,
    TopicClusterLinks
  },
  props: {
    articleTitle: { type: String, required: true },
    /** Array of { slug, title, excerpt?, date?, path } for related articles */
    relatedArticlesList: { type: Array, default: () => [] },
    relatedServiceKeys: { type: Array, default: () => [] },
    /** Article topic for TopicClusterLinks (e.g. "Cloud", "Architecture") */
    articleTopic: { type: String, default: '' }
  },
  computed: {
    relatedArticles() {
      return (this.relatedArticlesList || []).map(a => ({
        ...a,
        path: a.path || `/blog/${a.slug}`
      })).slice(0, 3)
    },
    relatedServices() {
      return (this.relatedServiceKeys || [])
        .filter(k => SERVICE_PATHS[k])
        .slice(0, 3)
        .map(k => ({ path: `${SERVICES_BASE}/${k}`, title: SERVICE_PATHS[k] }))
    }
  }
}
</script>

<style scoped>
.article-page {
  background: transparent;
  padding: 0;
}
.article-details {
  padding-bottom: 1.5rem;
}
.article-hero {
  padding-top: 0.5rem;
}
.article-body {
  width: 100%;
  max-width: 100%;
  padding-left: 0;
  padding-right: 0;
}
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
/* All cards (Article, Read the article, FAQ, Related services) use same header padding as ReusableCard default (25px 40px) for consistency */
.article-content-card :deep(.card-header),
.article-content-card :deep(.fancy-3d-header),
.article-faq-card :deep(.card-header),
.article-faq-card :deep(.fancy-3d-header) {
  padding-left: 40px !important;
  padding-right: 40px !important;
}
.article-faq-card :deep(.header-title-enhanced),
.article-content-card :deep(.header-title-enhanced) {
  justify-content: flex-start;
  text-align: left;
}
</style>
