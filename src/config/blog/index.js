/**
 * Blog articles — aggregated from one file per article for easier loading and maintenance.
 * Each article lives in blog/articles/<slug>.js. This module builds BLOG_ARTICLES and helpers.
 *
 * Articles are read from the glob on each access so that in dev (HMR) edits to article .js files
 * are picked up without restarting the dev server. New .js files under articles/ still require
 * a restart (or fresh build) because the glob itself is resolved at startup.
 */
const articleModules = import.meta.glob('./articles/*.js', { eager: true })

function getArticlesList() {
  return Object.keys(articleModules)
    .sort()
    .map((path) => {
      try {
        const m = articleModules[path]
        const article = m?.default ?? m?.article
        if (!article?.slug) return null
        return article
      } catch (err) {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('[blog] Failed to load article:', path, err)
        }
        return null
      }
    })
    .filter(Boolean)
}

// Live array: each access reads from current module state so HMR-updated article content is used
const BLOG_ARTICLES = new Proxy([], {
  get(_, prop) {
    const list = getArticlesList()
    if (prop === 'length') return list.length
    if (typeof prop === 'symbol') return list[prop]
    const i = Number(prop)
    if (!Number.isNaN(i) && i >= 0) return list[i]
    if (typeof list[prop] === 'function') return list[prop].bind(list)
    return list[prop]
  }
})

/** Get article by slug */
export function getArticleBySlug(slug) {
  return getArticlesList().find((a) => a.slug === slug) || null
}

/** Get all article slugs (for sitemap and router) */
export function getAllArticleSlugs() {
  return getArticlesList().map((a) => a.slug)
}

/** Get related articles by slugs (for RelatedArticles component) */
export function getRelatedArticlesBySlugs(slugs) {
  if (!slugs || !Array.isArray(slugs) || slugs.length === 0) return []
  return getArticlesList()
    .filter((a) => slugs.includes(a.slug))
    .slice(0, 3)
    .map((a) => ({ slug: a.slug, title: a.title, excerpt: a.excerpt, date: a.date }))
}

/** Get articles in same topic (for RelatedArticles when relatedArticleSlugs empty) */
export function getArticlesInSameTopic(topic, excludeSlug) {
  return getArticlesList()
    .filter((a) => a.topic === topic && a.slug !== excludeSlug)
    .slice(0, 3)
    .map((a) => ({ slug: a.slug, title: a.title, excerpt: a.excerpt, date: a.date }))
}

export { BLOG_ARTICLES }
