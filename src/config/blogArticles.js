/**
 * Blog articles — re-exported from blog/index.js (one file per article under blog/articles/).
 * This file keeps existing imports working; actual data lives in src/config/blog/articles/<slug>.js
 */
export {
  BLOG_ARTICLES,
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticlesBySlugs,
  getArticlesInSameTopic
} from './blog/index.js'
