<template>
  <section id="blog" class="blog section" itemscope itemtype="https://schema.org/CollectionPage">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <ReusableCard
        title="Latest from the blog"
        icon-name="services"
        body-padding="20px"
        class="mb-4"
      >
        <p class="blog-section-intro txt-p-lg mb-3">
          Technical articles on Azure, .NET, microservices, and enterprise architecture. Written by Waqas Ahmad, Senior Software Engineer with 17+ years experience.
        </p>
        <div class="row g-4 mt-2 blog-grid-row">
          <div
            v-for="article in latestArticles"
            :key="article.slug"
            class="col-12 col-md-6 col-lg-4 d-flex"
          >
            <div class="blog-col-inner w-100">
              <BlogCard :article="article" class="h-100" />
            </div>
          </div>
        </div>
        <div class="blog-view-all mt-4">
          <router-link to="/blog" class="blog-view-all-link">
            View all articles <i class="bi bi-arrow-right"></i>
          </router-link>
        </div>
        <!-- STEP 8: Top 5 blog clusters — Azure, .NET, AI, Architecture Patterns, Leadership -->
        <p class="blog-explore-label txt-p-md mt-4 mb-2">Explore by topic:</p>
        <div class="blog-explore-clusters">
          <router-link to="/services/azure-cloud-architecture" class="blog-cluster-link">Azure</router-link>
          <router-link to="/services/full-stack-development" class="blog-cluster-link">.NET</router-link>
          <router-link to="/blog" class="blog-cluster-link">AI</router-link>
          <router-link to="/services/microservices-architecture" class="blog-cluster-link">Architecture Patterns</router-link>
          <router-link to="/services/technical-leadership" class="blog-cluster-link">Leadership</router-link>
        </div>
      </ReusableCard>
    </div>
  </section>
</template>

<script>
import ReusableCard from '@/components/common/ReusableCard.vue'
import BlogCard from '@/components/blog/BlogCard.vue'
import { BLOG_ARTICLES } from '@/config/blogArticles.js'

export default {
  name: 'LatestFromBlog',
  components: {
    ReusableCard,
    BlogCard
  },
  computed: {
    latestArticles() {
      return [...BLOG_ARTICLES]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)
    }
  }
}
</script>

<style scoped>
.blog-section-intro {
  color: #4b5563;
  margin-bottom: 0;
}
.blog-view-all {
  text-align: center;
}
.blog-view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 245, 255, 0.98) 100%);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 10px;
  color: #374151;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}
.blog-view-all-link:hover {
  border-color: rgba(139, 92, 246, 0.5);
  color: #7c3aed;
  background: rgba(139, 92, 246, 0.06);
}

.blog-explore-label {
  color: #4b5563;
  margin-bottom: 0.5rem;
}

.blog-explore-clusters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.blog-cluster-link {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-radius: 8px;
  color: #5b21b6;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.blog-cluster-link:hover {
  border-color: rgba(139, 92, 246, 0.5);
  color: #7c3aed;
  background: rgba(139, 92, 246, 0.12);
}

/* Equal-height columns in same row (same as blog index) */
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
.blog-col-inner > a {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
