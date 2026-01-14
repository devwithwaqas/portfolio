/**
 * SEO Utility Functions
 * Handles dynamic meta tags, Open Graph, and Twitter Cards
 */

import { APP_CONFIG } from '../config/constants.js'

const BASE_URL = import.meta.env.BASE_URL || '/portfolio/'
// Ensure SITE_URL always includes /portfolio/ for GitHub Pages
const SITE_URL = 'https://devwithwaqas.github.io/portfolio/'

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
  setMetaTag('og:image', image || `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`, 'property')
  setMetaTag('og:url', url || window.location.href, 'property')
  setMetaTag('og:type', type, 'property')
  setMetaTag('og:site_name', 'Waqas Ahmad - Portfolio', 'property')
  setMetaTag('og:locale', 'en_US', 'property')
}

/**
 * Set Twitter Card tags
 */
export function setTwitterCard({ title, description, image, url, card = 'summary_large_image' }) {
  setMetaTag('twitter:card', card)
  setMetaTag('twitter:title', title)
  setMetaTag('twitter:description', description)
  setMetaTag('twitter:image', image || `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`)
  setMetaTag('twitter:url', url || window.location.href)
  setMetaTag('twitter:site', '@devwithwaqas') // Optional: Add your Twitter handle if you have one
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
    image,
    url
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
  
  // GLOBAL KEYWORDS - Remote, USA, Europe (HIGHEST PRIORITY)
  const remoteKeywords = [
    'remote senior software engineer',
    'remote technical lead',
    'remote azure cloud architect',
    'remote .net developer',
    'remote full stack developer',
    'remote devops engineer',
    'remote software architect',
    'remote technical consultant',
    'remote developer available',
    'hire remote senior software engineer',
    'looking for remote technical lead',
    'remote developer for hire',
    'remote consultant available',
    'freelance remote developer',
    'contract remote software engineer'
  ]
  
  // USA MARKET KEYWORDS
  const usaKeywords = [
    'remote software engineer usa',
    'senior software engineer usa',
    'technical lead united states',
    'azure cloud architect usa',
    'remote .net developer usa',
    'usa remote developer',
    'remote developer usa',
    'hire remote developer usa',
    'usa remote software engineer',
    'remote consultant usa',
    'remote software engineer california',
    'remote developer texas',
    'remote .net developer new york'
  ]
  
  // EUROPE MARKET KEYWORDS
  const europeKeywords = [
    'remote software engineer uk',
    'senior software engineer uk',
    'remote developer uk',
    'technical lead united kingdom',
    'remote .net developer uk',
    'hire remote developer uk',
    'uk remote software engineer',
    'remote software engineer germany',
    'remote developer germany',
    'remote software engineer netherlands',
    'remote developer europe',
    'senior software engineer europe',
    'remote consultant europe',
    'hire remote developer europe'
  ]
  
  // GLOBAL/INTERNATIONAL KEYWORDS
  const globalKeywords = [
    'global remote software engineer',
    'international remote developer',
    'worldwide remote consultant',
    'remote developer global',
    'international technical lead',
    'remote developer flexible timezone',
    'remote developer est pst gmt',
    'remote developer fortune 500',
    'remote consultant enterprise'
  ]
  
  // TECHNOLOGY-SPECIFIC KEYWORDS (CRITICAL)
  const technologyKeywords = [
    // .NET Keywords
    '.net consultant',
    '.net expert',
    '.net core consultant',
    '.net core expert',
    'asp.net consultant',
    'c# consultant',
    'c# expert',
    '.net architect',
    '.net development services',
    'hire .net consultant',
    'hire .net expert',
    '.net microservices consultant',
    '.net azure consultant',
    'enterprise .net consultant',
    'senior .net consultant',
    'experienced .net expert',
    '17 years .net experience',
    // Microservices Keywords
    'microservices architect',
    'microservices consultant',
    'microservices expert',
    'microservices developer',
    'microservices architecture services',
    'hire microservices architect',
    'microservices .net core',
    'azure microservices expert',
    'microservices design patterns',
    'distributed systems architect',
    'senior microservices architect',
    // API Development Keywords
    'api development expert',
    'api developer consultant',
    'restful api developer',
    'api architecture consultant',
    'api design expert',
    'api development services',
    'hire api developer',
    '.net api developer',
    'azure api developer',
    'api gateway expert',
    'rest api consultant',
    // Azure Cloud Keywords
    'azure cloud consultant',
    'azure cloud expert',
    'azure architect consultant',
    'azure devops consultant',
    'azure services expert',
    'azure migration consultant',
    'hire azure consultant',
    'azure cloud architect services',
    'senior azure consultant',
    // Full Stack Keywords
    'full stack consultant',
    'full stack expert',
    'full stack developer consultant',
    'hire full stack consultant',
    'full stack development services',
    // DevOps Keywords
    'devops consultant',
    'devops expert',
    'ci/cd consultant',
    'azure devops expert',
    'hire devops consultant',
    // Enterprise Architecture Keywords
    'enterprise architect consultant',
    'enterprise architecture expert',
    'system architect consultant',
    'software architecture consultant',
    'hire enterprise architect',
    'senior enterprise architect'
  ]
  
  // REMOTE WORK PLATFORM KEYWORDS
  const platformKeywords = [
    'remote work freelance',
    'freelance remote developer',
    'remote freelance software engineer',
    'upwork senior software engineer',
    'toptal .net developer',
    'freelancer azure architect',
    'remote work platform developer',
    'freelance platform software engineer',
    'remote freelance work',
    'remote contract developer',
    'remote consulting services',
    'remote project-based work',
    'remote part-time developer',
    'remote full-time consultant',
    'freelance remote .net developer',
    'remote freelance consultant'
  ]
  
  // Base keywords
  const baseKeywords = [
    'Senior Software Engineer',
    'Technical Lead',
    'Lead Software Engineer',
    'Azure Cloud Architect',
    '.NET Developer',
    'Full Stack Developer',
    'Technical Consultant',
    'DevOps Engineer',
    'Microservices',
    'Enterprise Architecture',
    'CI/CD',
    'Vue.js',
    'Angular',
    'Azure Service Fabric',
    'Available for Hire',
    'Freelance Developer',
    'Contract Software Engineer'
  ]
  
  return {
    title: `${fullName} - Remote Senior Software Engineer & Technical Lead | Available USA, Europe, Global | ${experience}+ Years`,
    description: `Hire ${fullName} - Remote Senior Software Engineer & Technical Lead with ${experience}+ years of experience. Available for remote work in USA, Europe, and globally. Specializing in .NET, Azure Cloud, microservices, and enterprise architecture. Flexible timezone (EST, PST, GMT, CET). Worked with Fortune 500 companies worldwide. Contact for remote consulting, freelance, and contract projects.`,
    keywords: [
      ...baseKeywords,
      ...technologyKeywords,
      ...platformKeywords,
      ...remoteKeywords,
      ...usaKeywords,
      ...europeKeywords,
      ...globalKeywords,
      location // Keep local for local searches
    ],
    type: 'profile',
    image: `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
  }
}

/**
 * Get SEO data for project pages (Enhanced with technology keywords)
 */
export function getProjectPageSEO(projectData) {
  const fullName = APP_CONFIG.fullName
  const location = APP_CONFIG.location
  const experience = APP_CONFIG.stats.yearsExperience
  
  const technologies = projectData.technologies || []
  const techNames = technologies.map(t => t.name || t)
  const techKeywords = techNames.join(', ')
  
  // Extract technology-specific keywords
  const hasDotNet = techNames.some(t => /\.net|asp\.net|c#/i.test(t))
  const hasMicroservices = techNames.some(t => /microservices|docker|kubernetes/i.test(t))
  const hasAPI = techNames.some(t => /api|rest|graphql/i.test(t))
  const hasAzure = techNames.some(t => /azure/i.test(t))
  
  // Build technology-specific keywords
  const technologyKeywords = []
  if (hasDotNet) {
    technologyKeywords.push(
      '.net project',
      '.net core project',
      'asp.net project',
      'c# project',
      '.net consultant project',
      '.net expert project'
    )
  }
  if (hasMicroservices) {
    technologyKeywords.push(
      'microservices project',
      'microservices architecture project',
      'microservices consultant project',
      'distributed systems project'
    )
  }
  if (hasAPI) {
    technologyKeywords.push(
      'api development project',
      'restful api project',
      'api consultant project',
      'api expert project'
    )
  }
  if (hasAzure) {
    technologyKeywords.push(
      'azure project',
      'azure cloud project',
      'azure consultant project',
      'azure expert project'
    )
  }
  
  // Build enhanced title with technology focus
  let enhancedTitle = projectData.title
  if (hasDotNet && hasMicroservices) {
    enhancedTitle = `${projectData.title} - .NET Core Microservices & API Development`
  } else if (hasDotNet) {
    enhancedTitle = `${projectData.title} - .NET Core Enterprise Application`
  } else if (hasMicroservices) {
    enhancedTitle = `${projectData.title} - Microservices Architecture`
  } else if (hasAPI) {
    enhancedTitle = `${projectData.title} - API Development & Integration`
  } else if (hasAzure) {
    enhancedTitle = `${projectData.title} - Azure Cloud Solution`
  }
  
  // Build enhanced description
  const techDescription = hasDotNet && hasMicroservices 
    ? `Enterprise .NET Core microservices architecture with RESTful API development`
    : hasDotNet 
    ? `Enterprise .NET Core application with modern architecture`
    : hasMicroservices
    ? `Microservices architecture with distributed systems design`
    : hasAPI
    ? `RESTful API development and integration`
    : hasAzure
    ? `Azure cloud-native solution`
    : 'Enterprise software solution'
  
  return {
    title: `${enhancedTitle} - ${fullName} | ${experience}+ Years Experience`,
    description: `${projectData.description || projectData.title}. ${techDescription}. Built by ${fullName}, ${experience}+ years experienced ${hasDotNet ? '.NET consultant' : ''} ${hasMicroservices ? 'microservices architect' : ''} ${hasAPI ? 'API development expert' : ''} ${hasAzure ? 'Azure cloud consultant' : ''} specializing in enterprise solutions. Available for remote work in USA, Europe, and globally.`,
    keywords: [
      projectData.title,
      enhancedTitle,
      ...techNames,
      ...technologyKeywords,
      'Portfolio Project',
      'Enterprise Project',
      'Software Project',
      fullName,
      `${fullName} project`,
      'Software Engineer',
      'Technical Lead',
      'Remote Software Engineer',
      'Remote Consultant',
      location,
      'USA',
      'Europe',
      'Global'
    ],
    type: 'article',
    image: projectData.image || `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
  }
}

/**
 * Get SEO data for service pages (Enhanced for GLOBAL remote/USA/Europe searches)
 */
export function getServicePageSEO(serviceData) {
  const fullName = APP_CONFIG.fullName
  const location = APP_CONFIG.location
  const experience = APP_CONFIG.stats.yearsExperience
  const serviceName = serviceData.title.toLowerCase()
  
  // REMOTE KEYWORDS (Highest Priority)
  const remoteKeywords = [
    `remote ${serviceName}`,
    `remote ${serviceName} developer`,
    `remote ${serviceName} consultant`,
    `remote ${serviceName} expert`,
    `hire remote ${serviceName} developer`,
    `remote ${serviceName} available`,
    `freelance remote ${serviceName}`,
    `contract remote ${serviceName}`
  ]
  
  // USA MARKET KEYWORDS
  const usaKeywords = [
    `remote ${serviceName} usa`,
    `${serviceName} usa`,
    `usa remote ${serviceName} developer`,
    `hire remote ${serviceName} usa`,
    `remote ${serviceName} consultant usa`
  ]
  
  // EUROPE MARKET KEYWORDS
  const europeKeywords = [
    `remote ${serviceName} uk`,
    `remote ${serviceName} europe`,
    `${serviceName} uk`,
    `hire remote ${serviceName} uk`,
    `remote ${serviceName} consultant europe`
  ]
  
  // GLOBAL KEYWORDS
  const globalKeywords = [
    `global remote ${serviceName}`,
    `international ${serviceName} consultant`,
    `worldwide remote ${serviceName}`,
    `remote ${serviceName} global`
  ]
  
  // TECHNOLOGY-SPECIFIC KEYWORDS for this service
  const serviceTechnologyKeywords = []
  
  // Add technology keywords based on service type
  if (serviceName.includes('full stack') || serviceName.includes('fullstack')) {
    serviceTechnologyKeywords.push(
      '.net full stack developer',
      'full stack .net consultant',
      'full stack .net expert',
      'vue.js full stack developer',
      'angular full stack developer',
      'react full stack developer'
    )
  }
  if (serviceName.includes('azure') || serviceName.includes('cloud')) {
    serviceTechnologyKeywords.push(
      'azure cloud consultant',
      'azure cloud expert',
      'azure architect consultant',
      'hire azure consultant',
      'azure migration consultant'
    )
  }
  if (serviceName.includes('microservices')) {
    serviceTechnologyKeywords.push(
      'microservices consultant',
      'microservices expert',
      'microservices architect',
      'hire microservices architect',
      'microservices .net core',
      'azure microservices expert'
    )
  }
  if (serviceName.includes('technical leadership') || serviceName.includes('leadership')) {
    serviceTechnologyKeywords.push(
      'technical lead consultant',
      'engineering manager consultant',
      'team lead consultant',
      'technical leadership expert'
    )
  }
  
  // Base service keywords
  const baseKeywords = [
    serviceData.title,
    `${serviceData.title} Services`,
    `hire ${serviceName}`,
    `looking for ${serviceName} consultant`,
    `${serviceName} expert`,
    `${serviceName} consultant`,
    `${serviceName} specialist`,
    `freelance ${serviceName} developer`,
    `contract ${serviceName} services`,
    fullName,
    'Software Engineer',
    'Technical Consultant',
    'Available for Hire',
    'Remote Software Engineer',
    ...serviceTechnologyKeywords
  ]
  
  // REMOTE WORK PLATFORM KEYWORDS
  const platformKeywords = [
    `remote work freelance ${serviceName}`,
    `freelance remote ${serviceName}`,
    `remote freelance ${serviceName} developer`,
    `remote contract ${serviceName}`,
    `remote consulting ${serviceName}`,
    `remote project ${serviceName}`
  ]
  
  // Combine all keywords
  const serviceKeywords = [
    ...baseKeywords,
    ...platformKeywords,
    ...remoteKeywords,
    ...usaKeywords,
    ...europeKeywords,
    ...globalKeywords,
    location // Keep for local searches
  ]
  
  // Add service-specific keywords if provided
  if (serviceData.keywords && Array.isArray(serviceData.keywords)) {
    serviceKeywords.push(...serviceData.keywords)
  }
  
  // Enhanced description with GLOBAL/REMOTE focus
  const description = serviceData.description 
    ? `${serviceData.description} Hire ${fullName} for remote ${serviceData.title} services. Available for remote work in USA, Europe, and globally. ${experience}+ years of experience with Fortune 500 companies. Flexible timezone (EST, PST, GMT, CET). Specializing in enterprise solutions, Azure Cloud, and .NET development.`
    : `Hire ${fullName} for remote ${serviceData.title} services. Available for remote work in USA, Europe, and globally. Senior Software Engineer & Technical Lead with ${experience}+ years of experience. Flexible timezone. Contact for remote consulting, freelance, and contract projects.`
  
  return {
    title: `Hire Remote ${serviceData.title} Expert - ${fullName} | Available USA, Europe, Global | ${experience}+ Years`,
    description,
    keywords: serviceKeywords,
    type: 'website',
    image: serviceData.image || `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
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
