/**
 * seo.js — Clean, strict, future-proof SEO engine
 * Dynamic metadata for SPA environments (Vue/Vite)
 * Spam-free, geo-free, hiring-free, AI-compatible.
 * Best practice: 5–8 meta keywords per page (topic clusters only); all apply* and setPageSEO respect this.
 */

import { SITE_URL, APP_CONFIG } from '../config/constants.js'
import { getMetaKeywords } from '../config/seoKeywords.js'

/** Max meta keywords per page (Google-friendly; no stuffing). Target 5–8 per page type. */
const MAX_KEYWORDS = 8
/** Target length for <title> to avoid truncation in SERPs (Bing/Google ~50–60). */
const TITLE_MAX_LENGTH = 60
/** Root URL for canonicals/OG (no trailing slash). Uses SITE_URL so runtime origin works for multi-deploy. */
function getSeoRoot() {
  return (typeof SITE_URL === 'string' ? SITE_URL : '').replace(/\/$/, '') || 'https://waqas.ragnorx.com'
}
/** Default OG image — computed at call time to avoid TDZ when SITE_URL is minified and chunk order runs this before constants. */
function getDefaultOgImage() {
  return `${getSeoRoot()}/assets/img/waqas-profile-hoodie.jpg`
}

/* --------------------------- Core Helpers --------------------------- */

function ensureMeta(attribute, name, content) {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export function setTitle(title) {
  document.title = title
}

/** Strip HTML tags so meta description is plain text (safe for crawlers). */
function stripHtml(text) {
  return typeof text === 'string' ? text.replace(/<[^>]+>/g, '').trim() : text
}

export function setDescription(text) {
  const clean = stripHtml(text)
  if (!clean) return
  ensureMeta('name', 'description', clean)
  ensureMeta('property', 'og:description', clean)
  ensureMeta('name', 'twitter:description', clean)
}

/** Author name is not a meaningful keyword for Google; exclude from keyword arrays. */
function withoutAuthorName(list, name) {
  if (!name || !Array.isArray(list)) return list || []
  return list.filter((x) => x !== name && String(x).trim() !== '')
}

export function setKeywords(list) {
  if (!Array.isArray(list)) return
  const name = APP_CONFIG.fullName
  const clean = withoutAuthorName(list.filter(Boolean), name).slice(0, MAX_KEYWORDS)
  if (clean.length === 0) return
  ensureMeta('name', 'keywords', clean.join(', '))
}

/** Normalize URL for canonical: strip trailing slash so /path/ and /path resolve to the same canonical. */
function normalizeCanonicalUrl(url) {
  if (typeof url !== 'string' || !url) return url
  return url.replace(/\/$/, '')
}

export function setCanonical(url) {
  const path = url || window.location.pathname
  const root = getSeoRoot()
  let finalUrl = path.startsWith('http') ? path : root + (path.startsWith('/') ? path : '/' + path)
  finalUrl = normalizeCanonicalUrl(finalUrl)

  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = finalUrl
}

export function setSocialMeta({ title, description, image, url, type }) {
  const img = image || getDefaultOgImage()
  const u = normalizeCanonicalUrl(url || getSeoRoot() + window.location.pathname)

  ensureMeta('property', 'og:title', title)
  ensureMeta('property', 'og:description', description)
  ensureMeta('property', 'og:image', img)
  ensureMeta('property', 'og:url', u)
  ensureMeta('property', 'og:type', type || 'website')
  ensureMeta('property', 'og:site_name', `${APP_CONFIG.fullName} — Portfolio`)

  ensureMeta('name', 'twitter:card', 'summary_large_image')
  ensureMeta('name', 'twitter:title', title)
  ensureMeta('name', 'twitter:description', description)
  ensureMeta('name', 'twitter:image', img)
}

function setRobots(indexFollow = true) {
  ensureMeta('name', 'robots', indexFollow ? 'index, follow' : 'noindex, nofollow')
}

/** Truncate at word boundary so SERP title stays under maxLen; no ellipsis (clean for SEO). */
function truncateAtWordBoundary(str, maxLen) {
  if (typeof str !== 'string' || str.length <= maxLen) return str
  const cut = str.slice(0, maxLen)
  const lastSpace = cut.lastIndexOf(' ')
  return lastSpace > 0 ? cut.slice(0, lastSpace) : cut
}

/**
 * Build page title for SERPs: "Title Part | Name", clamped to TITLE_MAX_LENGTH.
 * Shared for blog, project, and service pages so Google/Bing get consistent, non-truncated titles.
 */
function buildSEOTitle(titlePart, name) {
  const part = typeof titlePart === 'string' && titlePart.trim() ? titlePart.trim() : 'Page'
  const hasName = part.includes(name)
  const suffix = hasName ? '' : ` | ${name}`
  const candidate = hasName ? part : `${part} | ${name}`
  if (candidate.length <= TITLE_MAX_LENGTH) return candidate
  const maxPartLen = TITLE_MAX_LENGTH - suffix.length
  const truncated = truncateAtWordBoundary(part, maxPartLen)
  return truncated + suffix
}

/* --------------------------- Page-Level SEO --------------------------- */

function applySEO({ title, description, keywords, image, url, type, noindex = false }) {
  const name = APP_CONFIG.fullName
  // Avoid repeating name in title when it's already present (e.g. slug or custom title)
  const finalTitle = title && title.includes(name) ? title : `${title} | ${name}`
  const canonicalUrl = url || getSeoRoot() + window.location.pathname

  setTitle(finalTitle)
  setDescription(description)
  setKeywords(keywords) // setKeywords strips author name from array internally
  setCanonical(canonicalUrl)
  setSocialMeta({
    title: finalTitle,
    description,
    image: image || getDefaultOgImage(),
    url: canonicalUrl,
    type: type || 'website'
  })
  setRobots(!noindex)
}

/* --------------------------- Page Generators --------------------------- */

export function applyHomeSEO() {
  const name = APP_CONFIG.fullName
  const tagline = APP_CONFIG.titleTagline || 'Software Consultant, Architect & Tech Lead'
  const title = `${name} | ${tagline}`
  const description = `${name} — software engineering portfolio showcasing experience, projects, and technical capabilities.`
  const keywords = getMetaKeywords('/').length
    ? getMetaKeywords('/')
    : ['software engineering', 'system design', 'cloud architecture', 'backend development', 'full stack', 'technical lead'].slice(0, MAX_KEYWORDS)
  applySEO({
    title,
    description,
    keywords,
    type: 'profile',
    image: getDefaultOgImage(),
    url: getSeoRoot() + '/'
  })
}

export function applyBlogIndexSEO() {
  const name = APP_CONFIG.fullName
  // Descriptive, ~50–60 chars: topic first (authority), then brand. Pipe for segment separation.
  const title = `Software Architecture & Engineering Blog | ${name}`
  applySEO({
    title,
    description: `Technical articles and engineering insights authored by ${name}.`,
    keywords: [
      'engineering blog',
      'software architecture',
      'cloud',
      'web development',
      'programming',
      'best practices'
    ].slice(0, MAX_KEYWORDS),
    type: 'website',
    image: getDefaultOgImage(),
    url: getSeoRoot() + '/blog'
  })
}

export function applyBlogSEO(article) {
  const name = APP_CONFIG.fullName
  const title = buildSEOTitle(article.title || 'Article', name)
  const description = article.excerpt || `${article.title} — an engineering insight authored by ${name}.`
  const path = '/blog/' + (article.slug || '')
  const keywords = getMetaKeywords(path).length
    ? getMetaKeywords(path)
    : (Array.isArray(article.topics) && article.topics.length ? article.topics : [article.title, article.topic].filter(Boolean)).slice(0, MAX_KEYWORDS)
  applySEO({
    title,
    description,
    keywords,
    type: 'article',
    image: article.image || getDefaultOgImage(),
    url: getSeoRoot() + path
  })
}

export function applyProjectSEO(project) {
  const name = APP_CONFIG.fullName
  const title = buildSEOTitle(project.title, name)
  const summary = project.summary || project.description
  const description = summary || `${project.title} — a technical case study demonstrating engineering execution by ${name}.`
  const path = project.url && typeof project.url === 'string' ? project.url : ''
  const fromConfig = path ? getMetaKeywords(path) : []
  const fallback = (project.technologies || []).map((t) => (typeof t === 'string' ? t : t.name)).filter(Boolean).slice(0, 5)
  const keywords = fromConfig.length ? fromConfig : [project.title, 'case study', 'project', ...fallback].filter(Boolean).slice(0, MAX_KEYWORDS)
  applySEO({
    title,
    description,
    keywords,
    type: 'article',
    image: project.image || getDefaultOgImage(),
    url: project.url ? getSeoRoot() + project.url : undefined
  })
}

export function applyServiceSEO(service) {
  const name = APP_CONFIG.fullName
  const title = buildSEOTitle(service.title, name)
  const description = service.description || `${service.title} — overview of capabilities, technologies, and experience.`
  const path = service.url && typeof service.url === 'string' ? service.url : ''
  const fromConfig = path ? getMetaKeywords(path) : []
  const fallback = (service.topics || service.keywords || []).slice(0, 3)
  const keywords = fromConfig.length ? fromConfig : [service.title, 'software engineering', 'capabilities', 'system design', 'architecture', ...fallback].filter(Boolean).slice(0, MAX_KEYWORDS)
  applySEO({
    title,
    description,
    keywords,
    type: 'website',
    image: service.image || getDefaultOgImage(),
    url: service.url ? getSeoRoot() + service.url : undefined
  })
}

/**
 * Set SEO from a plain object (Privacy, 404, default fallback).
 * Pass noindex: true for 404 / noindex pages.
 */
export function setPageSEO({ title, description, keywords = [], image, url, type = 'website', noindex = false }) {
  const name = APP_CONFIG.fullName
  const root = (typeof SITE_URL === 'string' ? SITE_URL : '').replace(/\/$/, '') || 'https://waqas.ragnorx.com'
  const finalTitle = title && title.includes(name) ? title : `${title} | ${name}`
  const canonicalUrl = url || root + window.location.pathname
  const kw = Array.isArray(keywords) ? withoutAuthorName(keywords, name).slice(0, MAX_KEYWORDS) : []

  setTitle(finalTitle)
  setDescription(description)
  setKeywords(kw)
  setCanonical(canonicalUrl)
  setSocialMeta({
    title: finalTitle,
    description,
    image: image || getDefaultOgImage(),
    url: canonicalUrl,
    type
  })
  setRobots(!noindex)
}

/* --------------------------- Legacy compatibility (getters for structured data / callers that expect object) --------------------------- */

export function getHomePageSEO() {
  return { title: APP_CONFIG.fullName, description: '', keywords: [], type: 'profile', image: getDefaultOgImage() }
}

export function getProjectPageSEO(projectData) {
  return {
    title: projectData.title,
    description: projectData.description || projectData.title,
    keywords: [],
    type: 'article',
    image: projectData.image || getDefaultOgImage()
  }
}

export function getServicePageSEO(serviceData) {
  return {
    title: serviceData.title,
    description: serviceData.description || '',
    keywords: [],
    type: 'website',
    image: serviceData.image || getDefaultOgImage()
  }
}

export function getBlogIndexSEO() {
  return { title: 'Blog', description: '', keywords: [], type: 'website', image: getDefaultOgImage() }
}

export function getBlogArticleSEO(article) {
  return {
    title: article.title,
    description: article.excerpt || article.title,
    keywords: (article.topics || [article.topic]).filter(Boolean).slice(0, MAX_KEYWORDS),
    type: 'article',
    image: article.image || getDefaultOgImage()
  }
}

export default {
  setTitle,
  setDescription,
  setKeywords,
  setCanonical,
  setSocialMeta,
  setPageSEO,
  applyHomeSEO,
  applyBlogIndexSEO,
  applyBlogSEO,
  applyProjectSEO,
  applyServiceSEO,
  getHomePageSEO,
  getProjectPageSEO,
  getServicePageSEO,
  getBlogIndexSEO,
  getBlogArticleSEO
}
