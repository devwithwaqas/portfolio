/**
 * structuredData.js — Clean, safe, authority-focused Structured Data engine
 * Option B (Moderate), Architect-level identity, zero spam, Google-safe.
 */

import { SITE_URL, APP_CONFIG } from '../config/constants.js'

/* -----------------------------------------------------------
   Base injector
----------------------------------------------------------- */

export function injectStructuredData(data) {
  const existing = document.querySelectorAll('script[type="application/ld+json"]')
  existing.forEach(s => s.remove())

  const list = Array.isArray(data) ? data : [data]
  list.forEach((item, index) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = `structured-data-${index}`
    script.textContent = JSON.stringify(item, null, 2)
    document.head.appendChild(script)
  })
}

/* -----------------------------------------------------------
   CLEAN PERSON SCHEMA (Option B)
   Architect-level, high-signal, safe for SEO/AI
----------------------------------------------------------- */

export function generatePersonSchema() {
  const fullName = APP_CONFIG.fullName
  const website = APP_CONFIG.contactLinks.website || SITE_URL

  const coreSkills = [
    'Software Architecture',
    'Enterprise Application Architecture',
    'Distributed Systems Architecture',
    'Microservices Architecture',
    'Azure Cloud Architecture',
    'Cloud-native Application Design',
    'API Design & Architecture',
    'REST API Design',
    'Event-driven Architecture',
    'Observability & Distributed Tracing',
    'System Reliability Engineering',
    '.NET Platform Engineering'
  ]

  const specialty = [
    'Cloud Systems',
    'Enterprise Software',
    'Distributed Systems'
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}#person`,
    name: fullName,
    description: 'Senior Software Engineer, Technical Lead, and Architect with 17+ years designing and delivering enterprise systems, distributed architectures, and cloud-native platforms.',
    url: website,
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
    },
    sameAs: [
      APP_CONFIG.contactLinks.linkedin,
      APP_CONFIG.contactLinks.github,
      website,
      'https://www.linkedin.com/in/waqas1430/details/recommendations/?detailScreenTabIndex=0'
    ].filter(Boolean),
    jobTitle: ['Software Architect', 'Senior Software Engineer', 'Technical Lead'],
    knowsAbout: coreSkills,
    specialty,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of Engineering and Technology, Lahore'
    }
  }
}

/* -----------------------------------------------------------
   CLEAN WEBSITE SCHEMA
----------------------------------------------------------- */

export function generateWebSiteSchema() {
  const fullName = APP_CONFIG.fullName

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    name: `${fullName} — Portfolio`,
    url: SITE_URL,
    description: `${fullName} — portfolio and technical knowledge base on architecture, cloud systems, distributed systems, and engineering leadership.`,
    publisher: {
      '@type': 'Person',
      name: fullName,
      '@id': `${SITE_URL}#person`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

/* -----------------------------------------------------------
   CLEAN ORGANIZATION SCHEMA
   (Individual consultant identity, high-trust)
----------------------------------------------------------- */

export function generateOrganizationSchema() {
  const fullName = APP_CONFIG.fullName

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: fullName,
    url: SITE_URL,
    logo: `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`,
    founder: {
      '@type': 'Person',
      name: fullName,
      '@id': `${SITE_URL}#person`
    },
    sameAs: [
      APP_CONFIG.contactLinks.linkedin,
      APP_CONFIG.contactLinks.github
    ].filter(Boolean)
  }
}

/* -----------------------------------------------------------
   BreadcrumbList (shared)
----------------------------------------------------------- */

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

/* -----------------------------------------------------------
   WebPage (per-page identity for Google / AI)
----------------------------------------------------------- */

export function generateWebPageSchema({ path, title }) {
  const base = SITE_URL.replace(/\/$/, '')
  const pathNorm = (path && path.replace(/^\//, '')) || ''
  const url = pathNorm ? `${base}/${pathNorm}` : base + '/'
  const urlNoTrail = url.replace(/\/$/, '') || base
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${urlNoTrail}#webpage`,
    name: title || 'Page',
    url: url
  }
}

/* -----------------------------------------------------------
   Speakable (AI/Voice) — use stable selectors (IDs + .container)
----------------------------------------------------------- */

export function generateSpeakableSchema(selectors) {
  if (!selectors || !selectors.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: selectors
    }
  }
}

/* -----------------------------------------------------------
   ARTICLE (Project pages)
----------------------------------------------------------- */

export function generateArticleSchema(data) {
  const fullName = APP_CONFIG.fullName
  const images = Array.isArray(data.image)
    ? data.image
    : [data.image || `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`]

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}${data.url}`,
    headline: data.title,
    description: data.description,
    image: images,
    datePublished: data.datePublished || new Date().toISOString(),
    dateModified: data.dateModified || data.datePublished || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: fullName,
      '@id': `${SITE_URL}#person`
    },
    publisher: {
      '@type': 'Organization',
      name: `${fullName} — Portfolio`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
      }
    },
    mainEntityOfPage: `${SITE_URL}${data.url}`
  }
}

/* -----------------------------------------------------------
   SOFTWARE APPLICATION (optional project)
----------------------------------------------------------- */

export function generateSoftwareApplicationSchema(data) {
  const fullName = APP_CONFIG.fullName
  const screenshots = Array.isArray(data.images)
    ? data.images
    : [data.images || `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`]

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}${data.url}`,
    name: data.title,
    description: data.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    creator: {
      '@type': 'Person',
      name: fullName,
      '@id': `${SITE_URL}#person`
    },
    screenshot: screenshots,
    softwareVersion: data.version || '1.0'
  }
}

/* -----------------------------------------------------------
   FAQ (safe for AI/Google)
----------------------------------------------------------- */

export function generateFAQPageSchema(faqItems) {
  const fullName = APP_CONFIG.fullName

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
        author: {
          '@type': 'Person',
          name: fullName
        }
      }
    }))
  }
}

/* -----------------------------------------------------------
   SERVICE (Capability-only, zero sales)
----------------------------------------------------------- */

export function generateServiceSchema(service) {
  const fullName = APP_CONFIG.fullName
  const serviceUrl = `${SITE_URL}${service.url}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': serviceUrl,
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Person',
      name: fullName,
      '@id': `${SITE_URL}#person`
    }
  }
}

/* -----------------------------------------------------------
   BLOG POSTING
----------------------------------------------------------- */

const BLOG_KEYWORDS_MAX = 5

export function generateBlogArticleStructuredData(article, options = {}) {
  const fullName = APP_CONFIG.fullName
  const url = `${SITE_URL}blog/${article.slug}`
  const imageUrl = article.image || `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
  const kwArray = options.keywords && options.keywords.length
    ? options.keywords.slice(0, BLOG_KEYWORDS_MAX)
    : (article.topic ? [article.topic] : [])
  const keywords = (Array.isArray(kwArray) ? kwArray : [kwArray]).filter(Boolean).slice(0, BLOG_KEYWORDS_MAX).join(', ')

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    headline: article.title,
    description: article.excerpt,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: fullName,
      '@id': `${SITE_URL}#person`
    },
    datePublished: article.date,
    dateModified: article.dateModified || article.date,
    mainEntityOfPage: url,
    keywords: keywords,
    url: url
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}blog` },
    { name: article.title, url }
  ])

  const speakable = generateSpeakableSchema([
    '#article-hero',
    '.article-lead',
    '.article-body',
    '.container'
  ])

  const webPage = generateWebPageSchema({ path: `/blog/${article.slug}`, title: article.title })
  const schemas = [blogPosting, breadcrumbs, webPage]
  if (speakable) schemas.push(speakable)
  if (article.faqs) schemas.push(generateFAQPageSchema(article.faqs))

  injectStructuredData(schemas)
}

/* -----------------------------------------------------------
   BLOG INDEX
----------------------------------------------------------- */

/**
 * @param {Array<{ slug: string, title: string, date: string }>} [articles] - Blog articles list (passed from router to avoid pulling blog chunk into main bundle)
 */
export function generateBlogIndexStructuredData(articles = []) {
  const fullName = APP_CONFIG.fullName
  const url = `${SITE_URL}blog`

  const page = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    name: `Blog — ${fullName}`,
    description: 'Technical articles on architecture, cloud, distributed systems, and engineering leadership.',
    url: url
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url }
  ])

  const items = [...articles]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}blog/${a.slug}`,
      name: a.title
    }))

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#items`,
    numberOfItems: items.length,
    itemListElement: items
  }

  const speakable = generateSpeakableSchema(['.blog-intro', '.container'])

  const webPage = generateWebPageSchema({ path: '/blog', title: `Blog — ${fullName}` })
  const all = [page, breadcrumbs, itemList, webPage]
  if (speakable) all.push(speakable)

  injectStructuredData(all)
}

/* -----------------------------------------------------------
   PROJECT PAGE (Article + SoftwareApp + Breadcrumbs)
----------------------------------------------------------- */

export function generateProjectPageStructuredData(data, options = {}) {
  const article = generateArticleSchema(data)
  const software = generateSoftwareApplicationSchema(data)
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Projects', url: `${SITE_URL.replace(/\/$/, '')}/projects` },
    { name: data.title, url: `${SITE_URL}${data.url}` }
  ])

  const speakable = generateSpeakableSchema([
    '#portfolio-details',
    '.page-title',
    '.container'
  ])

  const webPage = generateWebPageSchema({ path: data.url, title: data.title })
  const schemas = [article, software, breadcrumbs, webPage]
  if (speakable) schemas.push(speakable)

  injectStructuredData(schemas)
}

/* -----------------------------------------------------------
   SERVICE PAGE
----------------------------------------------------------- */

export function generateServicePageStructuredData(serviceData, faqItems = []) {
  const service = generateServiceSchema(serviceData)

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL.replace(/\/$/, '')}/services` },
    { name: serviceData.title, url: `${SITE_URL}${serviceData.url}` }
  ])

  const webPage = generateWebPageSchema({ path: serviceData.url, title: serviceData.title })
  const schemas = [service, breadcrumbs, webPage]

  if (faqItems && faqItems.length) {
    schemas.push(generateFAQPageSchema(faqItems))
  }

  const speakable = generateSpeakableSchema([
    '#service-hero',
    '.service-lead',
    '.service-container',
    '.container'
  ])

  if (speakable) schemas.push(speakable)

  injectStructuredData(schemas)
}

/* -----------------------------------------------------------
   HOME PAGE
----------------------------------------------------------- */

export function generateHomePageStructuredData(testimonials = []) {
  const person = generatePersonSchema()
  const organization = generateOrganizationSchema()
  const website = generateWebSiteSchema()

  const speakable = generateSpeakableSchema([
    '#hero',
    '#about',
    '.container'
  ])

  const webPage = generateWebPageSchema({ path: '/', title: `${APP_CONFIG.fullName} — Portfolio` })
  const schemas = [person, organization, website, webPage]
  if (speakable) schemas.push(speakable)

  injectStructuredData(schemas)
}

export default {
  injectStructuredData,
  generatePersonSchema,
  generateWebSiteSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateSpeakableSchema,
  generateArticleSchema,
  generateSoftwareApplicationSchema,
  generateFAQPageSchema,
  generateServiceSchema,
  generateBlogArticleStructuredData,
  generateBlogIndexStructuredData,
  generateProjectPageStructuredData,
  generateServicePageStructuredData,
  generateHomePageStructuredData
}
