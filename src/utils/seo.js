/**
 * seo.js — Clean, strict, future-proof SEO engine
 * Dynamic metadata for SPA environments (Vue/Vite)
 * Spam-free, geo-free, hiring-free, AI-compatible. Max 8 meta keywords (topic clusters only).
 */

import { SITE_URL, APP_CONFIG } from '../config/constants.js'

const CANONICAL_ROOT = 'https://waqasahmad-portfolio.web.app'
const MAX_KEYWORDS = 8
/** Default OG image — computed at call time to avoid TDZ when SITE_URL is minified and chunk order runs this before constants. */
function getDefaultOgImage() {
  return `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
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

export function setCanonical(url) {
  const path = url || window.location.pathname
  const finalUrl = path.startsWith('http') ? path : CANONICAL_ROOT + (path.startsWith('/') ? path : '/' + path)

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
  const u = url || CANONICAL_ROOT + window.location.pathname

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

/* --------------------------- Page-Level SEO --------------------------- */

function applySEO({ title, description, keywords, image, url, type, noindex = false }) {
  const name = APP_CONFIG.fullName
  // Avoid repeating name in title when it's already present (e.g. slug or custom title)
  const finalTitle = title && title.includes(name) ? title : `${title} | ${name}`
  const canonicalUrl = url || CANONICAL_ROOT + window.location.pathname

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
  const description = `${name} — software engineering portfolio showcasing experience, projects, and technical capabilities.`
  const keywords = [
    'software engineering',
    'system design',
    'cloud architecture',
    'backend development',
    'full stack',
    'technical lead'
  ]
  applySEO({
    title: name,
    description,
    keywords: keywords.slice(0, MAX_KEYWORDS),
    type: 'profile',
    image: getDefaultOgImage(),
    url: CANONICAL_ROOT + '/'
  })
}

export function applyBlogIndexSEO() {
  const name = APP_CONFIG.fullName
  applySEO({
    title: 'Blog',
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
    url: CANONICAL_ROOT + '/blog'
  })
}

export function applyBlogSEO(article) {
  const name = APP_CONFIG.fullName
  const description = article.excerpt || `${article.title} — an engineering insight authored by ${name}.`
  const topics = Array.isArray(article.topics) && article.topics.length
    ? article.topics.slice(0, MAX_KEYWORDS)
    : [article.title, article.topic].filter(Boolean).slice(0, MAX_KEYWORDS)
  applySEO({
    title: article.title,
    description,
    keywords: topics,
    type: 'article',
    image: article.image || getDefaultOgImage(),
    url: CANONICAL_ROOT + '/blog/' + (article.slug || '')
  })
}

export function applyProjectSEO(project) {
  const name = APP_CONFIG.fullName
  const summary = project.summary || project.description
  const description = summary || `${project.title} — a technical case study demonstrating engineering execution by ${name}.`
  const techKeywords = (project.technologies || [])
    .map((t) => (typeof t === 'string' ? t : t.name))
    .filter(Boolean)
    .slice(0, 5)
  const keywords = [project.title, 'case study', 'project', ...techKeywords].filter(Boolean).slice(0, MAX_KEYWORDS)
  applySEO({
    title: project.title,
    description,
    keywords,
    type: 'article',
    image: project.image || getDefaultOgImage(),
    url: project.url ? CANONICAL_ROOT + project.url : undefined
  })
}

export function applyServiceSEO(service) {
  const name = APP_CONFIG.fullName
  const description = service.description || `${service.title} — overview of capabilities, technologies, and experience.`
  const topics = (service.topics || service.keywords || []).slice(0, 3)
  const keywords = [
    service.title,
    'software engineering',
    'capabilities',
    'system design',
    'architecture',
    ...topics
  ].filter(Boolean).slice(0, MAX_KEYWORDS)
  applySEO({
    title: service.title,
    description,
    keywords,
    type: 'website',
    image: service.image || getDefaultOgImage(),
    url: service.url ? CANONICAL_ROOT + service.url : undefined
  })
}

/**
 * Set SEO from a plain object (Privacy, 404, default fallback).
 * Pass noindex: true for 404 / noindex pages.
 */
export function setPageSEO({ title, description, keywords = [], image, url, type = 'website', noindex = false }) {
  const name = APP_CONFIG.fullName
  const finalTitle = title && title.includes(name) ? title : `${title} | ${name}`
  const canonicalUrl = url || CANONICAL_ROOT + window.location.pathname
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
