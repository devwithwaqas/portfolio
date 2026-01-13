/**
 * SEO Utility Functions
 * Handles dynamic meta tags, Open Graph, and Twitter Cards
 */

import { APP_CONFIG } from '../config/constants.js'

const BASE_URL = import.meta.env.BASE_URL || '/'
const SITE_URL = 'https://devwithwaqas.github.io' + (BASE_URL === '/' ? '' : BASE_URL)

/**
 * Update document title
 */
export function setTitle(title) {
  document.title = title
}

/**
 * Update or create meta tag
 */
export function setMetaTag(name, content, attribute = 'name') {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

/**
 * Update meta description
 */
export function setDescription(description) {
  setMetaTag('description', description)
  setMetaTag('og:description', description, 'property')
  setMetaTag('twitter:description', description)
}

/**
 * Update meta keywords
 */
export function setKeywords(keywords) {
  if (Array.isArray(keywords)) {
    keywords = keywords.join(', ')
  }
  setMetaTag('keywords', keywords)
}

/**
 * Set Open Graph tags
 */
export function setOpenGraph({ title, description, image, url, type = 'website' }) {
  setMetaTag('og:title', title, 'property')
  setMetaTag('og:description', description, 'property')
  setMetaTag('og:image', image || `${SITE_URL}assets/img/profile-img.jpg`, 'property')
  setMetaTag('og:url', url || window.location.href, 'property')
  setMetaTag('og:type', type, 'property')
  setMetaTag('og:site_name', 'Waqas Ahmad - Portfolio', 'property')
  setMetaTag('og:locale', 'en_US', 'property')
}

/**
 * Set Twitter Card tags
 */
export function setTwitterCard({ title, description, image, card = 'summary_large_image' }) {
  setMetaTag('twitter:card', card)
  setMetaTag('twitter:title', title)
  setMetaTag('twitter:description', description)
  setMetaTag('twitter:image', image || `${SITE_URL}assets/img/profile-img.jpg`)
}

/**
 * Set canonical URL
 */
export function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url || window.location.href)
}

/**
 * Set all SEO meta tags for a page
 */
export function setPageSEO({ 
  title, 
  description, 
  keywords = [], 
  image, 
  url, 
  type = 'website',
  noindex = false 
}) {
  // Title
  const fullTitle = title.includes('Waqas Ahmad') ? title : `${title} | Waqas Ahmad`
  setTitle(fullTitle)
  
  // Description
  setDescription(description)
  
  // Keywords
  if (keywords.length > 0) {
    setKeywords(keywords)
  }
  
  // Open Graph
  setOpenGraph({
    title: fullTitle,
    description,
    image,
    url,
    type
  })
  
  // Twitter Card
  setTwitterCard({
    title: fullTitle,
    description,
    image
  })
  
  // Canonical
  setCanonical(url)
  
  // Robots
  if (noindex) {
    setMetaTag('robots', 'noindex, nofollow')
  } else {
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  }
}

/**
 * Get default SEO data for home page
 */
export function getHomePageSEO() {
  const fullName = APP_CONFIG.fullName
  const location = APP_CONFIG.location
  const experience = APP_CONFIG.stats.yearsExperience
  
  return {
    title: `${fullName} - Senior Software Engineer & Technical Lead | ${location}`,
    description: `Senior Software Engineer & Technical Lead with ${experience}+ years of experience in .NET, Azure Cloud, and enterprise architecture. Specializing in full-stack development, microservices, and cloud solutions. Based in ${location}. Available for consulting and freelance projects.`,
    keywords: [
      'Senior Software Engineer',
      'Technical Lead',
      'Lead Software Engineer',
      'Azure Cloud Architect',
      '.NET Developer',
      'Full Stack Developer',
      'Technical Consultant',
      'DevOps Engineer',
      'Malaysia',
      location,
      'Microservices',
      'Enterprise Architecture',
      'CI/CD',
      'Vue.js',
      'Angular',
      'Azure Service Fabric',
      'Remote Software Engineer'
    ],
    type: 'profile',
    image: `${SITE_URL}assets/img/profile-img.jpg`
  }
}

/**
 * Get SEO data for project pages
 */
export function getProjectPageSEO(projectData) {
  const fullName = APP_CONFIG.fullName
  const location = APP_CONFIG.location
  
  const technologies = projectData.technologies || []
  const techKeywords = technologies.map(t => t.name || t).join(', ')
  
  return {
    title: `${projectData.title} - ${fullName} | Portfolio Project`,
    description: `${projectData.description || projectData.title}. Built by ${fullName}, ${projectData.title} showcases expertise in ${techKeywords}. ${location} based software engineer specializing in enterprise solutions.`,
    keywords: [
      projectData.title,
      ...technologies.map(t => t.name || t),
      'Portfolio',
      'Project',
      fullName,
      location,
      'Software Engineer',
      'Technical Lead'
    ],
    type: 'article',
    image: projectData.image || `${SITE_URL}assets/img/profile-img.jpg`
  }
}

/**
 * Get SEO data for service pages
 */
export function getServicePageSEO(serviceData) {
  const fullName = APP_CONFIG.fullName
  const location = APP_CONFIG.location
  const experience = APP_CONFIG.stats.yearsExperience
  
  return {
    title: `${serviceData.title} Services - ${fullName} | ${location}`,
    description: `${serviceData.description || serviceData.title} services by ${fullName}, ${location} based ${serviceData.title} expert. ${experience}+ years of experience delivering enterprise solutions.`,
    keywords: [
      serviceData.title,
      `${serviceData.title} Services`,
      `${serviceData.title} ${location}`,
      fullName,
      location,
      'Software Engineer',
      'Technical Consultant',
      'Malaysia'
    ],
    type: 'website',
    image: serviceData.image || `${SITE_URL}assets/img/profile-img.jpg`
  }
}

export default {
  setTitle,
  setMetaTag,
  setDescription,
  setKeywords,
  setOpenGraph,
  setTwitterCard,
  setCanonical,
  setPageSEO,
  getHomePageSEO,
  getProjectPageSEO,
  getServicePageSEO
}
