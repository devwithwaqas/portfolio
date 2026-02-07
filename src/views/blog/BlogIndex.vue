<template>
  <div class="blog-index-page">
    <Breadcrumbs
      currentPage="Blog"
      parentLink="/"
      parentLabel="Home"
    />
    <div class="container blog-container" data-aos="fade-up">
      <ReusableCard
        title="Blog"
        icon-name="services"
        title-tag="h1"
        body-padding="20px"
        class="mb-4"
      >
        <p class="blog-intro article-lead">
          Technical blog: Azure, .NET, microservices, enterprise architecture. {{ sortedArticles.length }} articles by Waqas Ahmad, Senior Software Engineer with 17+ years experience.
        </p>
        <div class="row g-4 mt-2 blog-grid-row">
          <div
            v-for="(article, index) in sortedArticles"
            :key="article.slug"
            class="col-12 col-md-6 col-lg-4 d-flex"
          >
            <div class="blog-col-inner w-100">
              <LazyWrapper v-if="index >= 6" class="blog-lazy-wrap h-100">
                <BlogCard :article="article" />
              </LazyWrapper>
              <BlogCard v-else :article="article" class="h-100" />
            </div>
          </div>
        </div>
        <p v-if="sortedArticles.length === 0" class="text-muted">No articles yet. Check back soon.</p>
      </ReusableCard>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/projects/Breadcrumbs.vue'
import ReusableCard from '@/components/common/ReusableCard.vue'
import LazyWrapper from '@/components/common/LazyWrapper.vue'
import BlogCard from '@/components/blog/BlogCard.vue'
import { BLOG_ARTICLES } from '@/config/blogArticles.js'

export default {
  name: 'BlogIndex',
  components: {
    Breadcrumbs,
    ReusableCard,
    LazyWrapper,
    BlogCard
  },
  computed: {
    sortedArticles() {
      return [...BLOG_ARTICLES].sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  }
}
</script>

<style scoped>
.blog-index-page {
  background: transparent;
  padding: 0;
}
.blog-container {
  max-width: 1200px;
  padding-top: 20px;
  padding-bottom: 1.5rem;
}
.blog-container > :first-child :deep(.reusable-card.mb-4) {
  margin-top: 0 !important;
}
.blog-container > :last-child :deep(.reusable-card.mb-4) {
  margin-bottom: 0 !important;
}
.blog-intro {
  color: #4b5563;
  margin-bottom: 0;
}

/* Equal-height columns in same row (same approach as Services grid) */
.blog-grid-row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.blog-grid-row > [class*="col-"] {
  display: flex;
  align-items: stretch;
}
.blog-col-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
}
.blog-col-inner > .blog-lazy-wrap,
.blog-col-inner > a {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.blog-lazy-wrap {
  min-height: 220px;
}
</style>
