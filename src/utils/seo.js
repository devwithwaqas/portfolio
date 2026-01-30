/**
 * SEO Utility Functions
 * Handles dynamic meta tags, Open Graph, and Twitter Cards
 */

import { APP_CONFIG, SITE_URL } from '../config/constants.js'

const BASE_URL = import.meta.env.BASE_URL || '/portfolio/'

// CRITICAL: Firebase URL is always canonical (never GitHub Pages)
const FIREBASE_CANONICAL_URL = 'https://waqasahmad-portfolio.web.app'

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
 * Deduplicate keywords: trim, filter empty, case-insensitive dedupe, preserve first occurrence casing.
 * Use for service-focused SEO to avoid duplicate meta keywords.
 * @param {string[]} keywords - Array of keyword strings (or spread multiple arrays)
 * @returns {string[]} Deduplicated array
 */
function dedupeKeywords(...keywordArrays) {
  const flat = keywordArrays.flat(1).filter(k => k != null && String(k).trim() !== '')
  const seen = new Set()
  const out = []
  for (const k of flat) {
    const s = String(k).trim()
    const lower = s.toLowerCase()
    if (seen.has(lower)) continue
    seen.add(lower)
    out.push(s)
  }
  return out
}

/**
 * Skill-based "expert" / "developer" / "dev" keywords for home, service, and project pages.
 * Covers .NET, Angular, Vue, React, CSS, Bootstrap, Azure, SQL, etc. for discoverability.
 * Used in getHomePageSEO, getProjectPageSEO, getServicePageSEO.
 */
function getSkillExpertDeveloperKeywords() {
  return [
    '.net expert', '.net developer', '.net dev',
    '.net core expert', '.net core developer', '.net core dev',
    'c# expert', 'c# developer', 'c# dev',
    'asp.net expert', 'asp.net developer', 'asp.net dev',
    'asp.net core expert', 'asp.net core developer', 'asp.net core dev',
    'angular expert', 'angular developer', 'angular dev',
    'vue expert', 'vue developer', 'vue dev', 'vue.js expert', 'vue.js developer', 'vue.js dev',
    'react expert', 'react developer', 'react dev',
    'typescript expert', 'typescript developer', 'typescript dev',
    'javascript expert', 'javascript developer', 'javascript dev',
    'css expert', 'css developer', 'css dev',
    'bootstrap expert', 'bootstrap developer', 'bootstrap dev',
    'html expert', 'html developer', 'html5 expert', 'html5 developer',
    'azure expert', 'azure developer', 'azure dev',
    'azure cloud expert', 'azure cloud developer',
    'sql expert', 'sql developer', 'sql dev',
    'sql server expert', 'sql server developer', 'sql server dev',
    'entity framework expert', 'entity framework developer', 'entity framework dev',
    'cosmos db expert', 'cosmos db developer',
    'microservices expert', 'microservices developer', 'microservices dev',
    'api expert', 'api developer', 'api dev',
    'rest api expert', 'rest api developer', 'restful api expert', 'restful api developer',
    'graphql expert', 'graphql developer',
    'devops expert', 'devops developer', 'devops dev',
    'ci/cd expert', 'ci/cd developer',
    'docker expert', 'docker developer',
    'kubernetes expert', 'kubernetes developer',
    'signalr expert', 'signalr developer',
    'full stack expert', 'full stack developer', 'full stack dev',
    'frontend expert', 'frontend developer', 'frontend dev',
    'backend expert', 'backend developer', 'backend dev',
    'angular material expert', 'angular material developer',
    'angular rxjs expert', 'angular rxjs developer',
    'angular ngrx expert', 'angular ngrx developer',
    'react native expert', 'react native developer', 'react native dev',
    'flutter expert', 'flutter developer', 'flutter dev',
    'xamarin expert', 'xamarin developer',
    'ios developer', 'android developer',
    'azure service fabric expert', 'azure functions expert', 'azure devops expert',
    'database expert', 'database developer', 'database dev',
    'scrum expert', 'agile expert', 'kanban expert',
    'technical lead expert', 'tech lead expert', 'engineering manager',
    'spa expert', 'spa developer', 'pwa expert', 'pwa developer',
    'responsive design expert', 'responsive web design expert'
  ]
}

/**
 * Set Open Graph tags
 */
export function setOpenGraph({ title, description, image, url, type = 'website' }) {
  setMetaTag('og:title', title, 'property')
  setMetaTag('og:description', description, 'property')
  // Use provided image, or fallback to waqas-profile-hoodie.jpg
  const defaultImage = image || `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
  setMetaTag('og:image', defaultImage, 'property')
  setMetaTag('og:image:secure_url', defaultImage, 'property')
  setMetaTag('og:image:type', 'image/jpeg', 'property')
  // CRITICAL: Add image dimensions for Google search results display
  setMetaTag('og:image:width', '1200', 'property')
  setMetaTag('og:image:height', '1200', 'property')
  setMetaTag('og:image:alt', title, 'property')
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
  // Use provided image, or fallback to waqas-profile-hoodie.jpg
  const defaultImage = image || `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
  setMetaTag('twitter:image', defaultImage)
  setMetaTag('twitter:url', url || window.location.href)
  setMetaTag('twitter:site', '@devwithwaqas') // Optional: Add your Twitter handle if you have one
}

/**
 * Set canonical URL
 * CRITICAL: Always use Firebase URL as canonical, never GitHub Pages
 */
export function setCanonical(url) {
  // Always use Firebase URL as canonical (never GitHub Pages)
  let canonicalUrl = url || SITE_URL || window.location.href
  
  // CRITICAL: Replace any GitHub Pages URL with Firebase URL
  if (canonicalUrl.includes('devwithwaqas.github.io')) {
    const urlObj = new URL(canonicalUrl)
    canonicalUrl = FIREBASE_CANONICAL_URL + urlObj.pathname + urlObj.search + urlObj.hash
  }
  
  // Ensure canonical always points to Firebase
  if (!canonicalUrl.startsWith(FIREBASE_CANONICAL_URL)) {
    const currentPath = window.location.pathname + window.location.search + window.location.hash
    canonicalUrl = FIREBASE_CANONICAL_URL + currentPath
  }
  
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', canonicalUrl)
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
  
  // TECHNOLOGY-SPECIFIC KEYWORDS (CRITICAL) - Enhanced with Angular, .NET Core, Azure, Full Stack
  const technologyKeywords = [
    // .NET Core Keywords (Enhanced)
    '.net core consultant',
    '.net core expert',
    '.net core developer',
    '.net core architect',
    '.net core specialist',
    'asp.net core consultant',
    'asp.net core expert',
    'asp.net core developer',
    'asp.net core architect',
    'asp.net core specialist',
    '.net core microservices',
    '.net core api developer',
    '.net core full stack',
    '.net core azure developer',
    '.net core enterprise developer',
    'enterprise .net core consultant',
    'senior .net core developer',
    'experienced .net core expert',
    `${APP_CONFIG.stats.yearsExperience} years .net core experience`,
    'hire .net core consultant',
    'hire .net core expert',
    'hire .net core developer',
    '.net core remote developer',
    '.net core freelance developer',
    '.net core contract developer',
    
    // .NET Framework Keywords
    '.net consultant',
    '.net expert',
    '.net developer',
    '.net architect',
    'asp.net consultant',
    'asp.net expert',
    'asp.net developer',
    'asp.net architect',
    'c# consultant',
    'c# expert',
    'c# developer',
    'c# architect',
    '.net development services',
    'hire .net consultant',
    'hire .net expert',
    '.net microservices consultant',
    '.net azure consultant',
    'enterprise .net consultant',
    'senior .net consultant',
    'experienced .net expert',
    `${APP_CONFIG.stats.yearsExperience} years .net experience`,
    
    // Angular Keywords (Enhanced)
    'angular consultant',
    'angular expert',
    'angular developer',
    'angular architect',
    'angular specialist',
    'angular typescript developer',
    'angular full stack developer',
    'angular .net core developer',
    'angular azure developer',
    'angular microservices developer',
    'angular enterprise developer',
    'enterprise angular consultant',
    'senior angular developer',
    'experienced angular expert',
    `${APP_CONFIG.stats.yearsExperience} years angular experience`,
    'hire angular consultant',
    'hire angular expert',
    'hire angular developer',
    'angular remote developer',
    'angular freelance developer',
    'angular contract developer',
    'angular 12+ developer',
    'angular 13+ developer',
    'angular 14+ developer',
    'angular 15+ developer',
    'angular 16+ developer',
    'angular 17+ developer',
    'angular latest version',
    'modern angular developer',
    'angular material developer',
    'angular rxjs developer',
    'angular ngrx developer',
    'angular state management',
    'angular performance optimization',
    'angular lazy loading',
    'angular server-side rendering',
    'angular universal',
    'angular pwa developer',
    'angular progressive web app',
    
    // Azure Keywords (Enhanced)
    'azure consultant',
    'azure expert',
    'azure developer',
    'azure architect',
    'azure specialist',
    'azure cloud consultant',
    'azure cloud expert',
    'azure cloud developer',
    'azure cloud architect',
    'azure .net core developer',
    'azure angular developer',
    'azure full stack developer',
    'azure microservices developer',
    'azure enterprise developer',
    'enterprise azure consultant',
    'senior azure developer',
    'experienced azure expert',
    `${APP_CONFIG.stats.yearsExperience} years azure experience`,
    'hire azure consultant',
    'hire azure expert',
    'hire azure developer',
    'azure remote developer',
    'azure freelance developer',
    'azure contract developer',
    'azure service fabric expert',
    'azure functions expert',
    'azure app service expert',
    'azure sql database expert',
    'azure cosmos db expert',
    'azure key vault expert',
    'azure devops expert',
    'azure api management expert',
    'azure active directory expert',
    'azure storage expert',
    'azure event hub expert',
    'azure service bus expert',
    'azure notification hub expert',
    'azure monitor expert',
    'azure application insights expert',
    'azure container instances expert',
    'azure kubernetes service expert',
    'azure aks expert',
    'azure migration expert',
    'azure cloud migration',
    'azure infrastructure as code',
    'azure arm templates expert',
    'azure terraform expert',
    'azure bicep expert',
    
    // Full Stack Keywords (Enhanced)
    'full stack consultant',
    'full stack expert',
    'full stack developer',
    'full stack architect',
    'full stack specialist',
    '.net core full stack developer',
    'angular full stack developer',
    'vue.js full stack developer',
    'react full stack developer',
    'azure full stack developer',
    'full stack .net core',
    'full stack angular',
    'full stack vue.js',
    'full stack react',
    'full stack azure',
    'full stack microservices',
    'full stack enterprise developer',
    'enterprise full stack consultant',
    'senior full stack developer',
    'experienced full stack expert',
    `${APP_CONFIG.stats.yearsExperience} years full stack experience`,
    'hire full stack consultant',
    'hire full stack expert',
    'hire full stack developer',
    'full stack remote developer',
    'full stack freelance developer',
    'full stack contract developer',
    'full stack web developer',
    'full stack application developer',
    'full stack software engineer',
    'full stack solutions developer',
    'end-to-end developer',
    'full cycle developer',
    'full stack mvc developer',
    'full stack api developer',
    'full stack rest api developer',
    'full stack graphql developer',
    'full stack real-time developer',
    'full stack real-time applications',
    'full stack progressive web apps',
    'full stack pwa developer',
    'full stack responsive developer',
    'full stack mobile-first developer',
    
    // Technology Combinations
    'angular .net core',
    '.net core angular',
    'angular azure',
    'azure angular',
    '.net core azure',
    'azure .net core',
    'angular .net core azure',
    '.net core angular azure',
    'azure angular .net core',
    'full stack angular .net core',
    'full stack .net core angular',
    'full stack azure angular',
    'full stack angular azure',
    'angular .net core microservices',
    '.net core angular microservices',
    'azure angular microservices',
    'angular azure microservices',
    'full stack angular .net core azure',
    'full stack .net core angular azure',
    'enterprise angular .net core',
    'enterprise .net core angular',
    'enterprise azure angular',
    'enterprise angular azure',
    'mission critical angular .net core',
    'mission critical .net core angular',
    'mission critical azure angular',
    'high performance angular .net core',
    'high performance .net core angular',
    'high performance azure angular',
    'scalable angular .net core',
    'scalable .net core angular',
    'scalable azure angular',
    'real-time angular .net core',
    'real-time .net core angular',
    'real-time azure angular',
    // Microservices Keywords (Enhanced)
    'microservices architect',
    'microservices consultant',
    'microservices expert',
    'microservices developer',
    'microservices architecture services',
    'hire microservices architect',
    'microservices .net core',
    'microservices angular',
    'microservices azure',
    'angular microservices',
    '.net core microservices',
    'azure microservices expert',
    'azure microservices developer',
    'angular microservices developer',
    '.net core microservices developer',
    'full stack microservices',
    'microservices design patterns',
    'distributed systems architect',
    'senior microservices architect',
    'enterprise microservices',
    'mission critical microservices',
    'high performance microservices',
    'scalable microservices',
    'real-time microservices',
    
    // API Development Keywords (Enhanced)
    'api development expert',
    'api developer consultant',
    'restful api developer',
    'api architecture consultant',
    'api design expert',
    'api development services',
    'hire api developer',
    '.net api developer',
    '.net core api developer',
    'angular api developer',
    'azure api developer',
    'api gateway expert',
    'rest api consultant',
    'restful api .net core',
    'restful api angular',
    'restful api azure',
    'graphql .net core',
    'graphql angular',
    'graphql azure',
    'api microservices',
    'microservices api',
    'enterprise api developer',
    'high performance api',
    'scalable api',
    'real-time api',
    
    // DevOps Keywords (Enhanced)
    'devops consultant',
    'devops expert',
    'ci/cd consultant',
    'azure devops expert',
    'hire devops consultant',
    'azure devops .net core',
    'azure devops angular',
    'azure devops full stack',
    'ci/cd .net core',
    'ci/cd angular',
    'ci/cd azure',
    'azure pipelines expert',
    'azure pipelines .net core',
    'azure pipelines angular',
    'devops automation',
    'devops .net core',
    'devops angular',
    'devops azure',
    'enterprise devops',
    
    // Enterprise Architecture Keywords (Enhanced)
    'enterprise architect consultant',
    'enterprise architecture expert',
    'system architect consultant',
    'software architecture consultant',
    'hire enterprise architect',
    'senior enterprise architect',
    'enterprise .net core architect',
    'enterprise angular architect',
    'enterprise azure architect',
    'enterprise full stack architect',
    'enterprise microservices architect',
    'enterprise api architect'
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
  
  // EXPERT-LEVEL KEYWORDS (for "top consultant", "specialist", "best expert" searches)
  const expertLevelKeywords = [
    'top software engineering consultant',
    'software engineering specialist',
    'best software engineering expert',
    'IT engineering consultant',
    'professional software engineering services',
    'top software engineering specialist profile',
    'software engineering consultant expert',
    'leading software engineering consultant',
    'premier software engineering specialist',
    'elite software engineering expert'
  ]
  
  // NAME-BASED KEYWORDS (for "Waqas", "Waqas UET", "UET Lahore", "Waqas IT" searches)
  // DEEP DIVE: Single name, role+name, skills+name, education+name, work+name variations
  const nameBasedKeywords = [
    // Single name variations
    'Waqas',
    'Waqas only',
    'Waqas developer',
    'Waqas engineer',
    'Waqas consultant',
    'Waqas software engineer',
    'Waqas technical lead',
    'Waqas .NET developer',
    'Waqas Azure architect',
    'Waqas UET',
    'Waqas UET Lahore',
    'Waqas UET graduate',
    'Waqas UET software engineer',
    'Waqas UET Computer System Engineering',
    'Waqas Computer System Engineering',
    'Waqas IT',
    'Waqas IT services',
    'Waqas IT consultant',
    'Waqas IT expert',
    'Waqas Malaysia',
    'Waqas Selangor',
    'Waqas remote developer',
    'Waqas freelance',
    'Waqas contract',
    // Full name variations
    'Waqas Ahmad',
    'Waqas Ahmad only',
    'Waqas Ahmad portfolio',
    'Waqas Ahmad developer',
    'Waqas Ahmad software engineer',
    'Waqas Ahmad technical lead',
    'Waqas Ahmad consultant',
    'Waqas Ahmad UET',
    'Waqas Ahmad UET Lahore',
    'Waqas Ahmad IT',
    'Waqas Ahmad IT services',
    'Waqas Ahmad Malaysia',
    'Waqas Ahmad Selangor',
    'Waqas Ahmad remote',
    'Waqas Ahmad freelance',
    // Education + Name combinations
    'Waqas Ahmad UET Lahore graduate',
    'Waqas Ahmad UET Lahore Computer System Engineering',
    'Waqas Ahmad University of Engineering and Technology Lahore',
    'Waqas UET Lahore Computer System Engineering graduate',
    'UET Lahore Waqas Ahmad',
    'UET Lahore graduate Waqas Ahmad',
    'Computer System Engineering Waqas Ahmad',
    'University of Engineering and Technology Lahore Waqas Ahmad',
    // Work + Name combinations
    'Waqas Ahmad Fortune 500',
    'Waqas Ahmad enterprise developer',
    'Waqas Ahmad mission critical',
    'Waqas Ahmad zero downtime',
    'Waqas Ahmad high availability',
    'Waqas Ahmad 17 years experience',
    'Waqas Ahmad 17+ years experience',
    'Waqas Ahmad senior software engineer',
    'Waqas Ahmad technical lead experience',
    // Location + Name + Role
    'Waqas Ahmad Malaysia software engineer',
    'Waqas Ahmad Selangor developer',
    'Waqas Ahmad Malaysia remote',
    'Waqas Ahmad Selangor consultant'
  ]

  // COMMON MISSPELLINGS (e.g. "Waqas Ahmed" with e) – used in schema alternateName too
  const misspellingKeywords = [
    'Waqas Ahmed',
    'Waqas Ahmand'
  ]

  // PROFESSIONAL-STAT LONG-TAIL (e.g. "software engineer with 17 years experience", "experienced IT professional")
  const professionalStatLongTail = [
    `software engineer with ${experience} years experience`,
    `software engineer with ${experience}+ years experience`,
    `${experience} years experienced software engineer`,
    `${experience}+ years experienced software engineer`,
    'experienced IT professional',
    'experienced software engineer',
    'experienced developer',
    'experienced software developer',
    `IT professional with ${experience} years experience`,
    `developer with ${experience} years experience`,
    `senior software engineer with ${experience} years experience`,
    `technical lead with ${experience} years experience`,
    `software engineer ${experience} years experience`,
    `IT consultant ${experience} years experience`,
    'experienced .NET developer',
    'experienced Azure architect',
    'veteran software engineer',
    'seasoned software engineer'
  ]

  const locationRoleLongTail = [
    'software engineer Malaysia',
    'technical lead Malaysia',
    'senior software engineer Malaysia',
    'UET Lahore software engineer',
    'UET Lahore developer',
    'software engineer Selangor',
    'remote developer Malaysia',
    'Waqas Ahmad consultant',
    'Waqas Ahmad software consultant',
    'Waqas Ahmad IT consultant',
    'Waqas Ahmad technical consultant',
    'Waqas Ahmad .NET consultant',
    'Waqas Ahmad Azure consultant',
    'Waqas Ahmad remote consultant',
    'Waqas Ahmad consultant Malaysia',
    'consultant Waqas Ahmad',
    'Waqas Ahmad freelance consultant',
    'Waqas Ahmad contract consultant',
    'Waqas Ahmad freelance',
    'Waqas Ahmad remote'
  ]

  // SKILLS + NAME COMBINATIONS (e.g., ".NET Waqas Ahmad", "Azure Waqas Ahmad")
  // DEEP DIVE: Skills + Name, Skills + Ahmad, Ahmad + Skills variations
  const skillsNameKeywords = [
    // Skills + Waqas
    '.NET Waqas',
    'Azure Waqas',
    'Vue.js Waqas',
    'Angular Waqas',
    'React Waqas',
    'Microservices Waqas',
    'SQL Server Waqas',
    'Entity Framework Waqas',
    'Docker Waqas',
    'Kubernetes Waqas',
    'Full Stack Waqas',
    'API Development Waqas',
    'DevOps Waqas',
    'CI/CD Waqas',
    // Skills + Waqas Ahmad
    '.NET Waqas Ahmad',
    '.NET Core Waqas Ahmad',
    'ASP.NET Waqas Ahmad',
    'ASP.NET Core Waqas Ahmad',
    'C# Waqas Ahmad',
    'Azure Waqas Ahmad',
    'Azure Cloud Waqas Ahmad',
    'Azure Service Fabric Waqas Ahmad',
    'Azure Functions Waqas Ahmad',
    'Vue.js Waqas Ahmad',
    'Vue Waqas Ahmad',
    'Angular Waqas Ahmad',
    'React Waqas Ahmad',
    'TypeScript Waqas Ahmad',
    'JavaScript Waqas Ahmad',
    'Microservices Waqas Ahmad',
    'Microservices Architecture Waqas Ahmad',
    'SQL Server Waqas Ahmad',
    'Azure SQL Waqas Ahmad',
    'Cosmos DB Waqas Ahmad',
    'Entity Framework Waqas Ahmad',
    'Entity Framework Core Waqas Ahmad',
    'Docker Waqas Ahmad',
    'Kubernetes Waqas Ahmad',
    'Full Stack Waqas Ahmad',
    'Full Stack Developer Waqas Ahmad',
    'REST API Waqas Ahmad',
    'RESTful API Waqas Ahmad',
    'GraphQL Waqas Ahmad',
    'SignalR Waqas Ahmad',
    'DevOps Waqas Ahmad',
    'CI/CD Waqas Ahmad',
    'Azure DevOps Waqas Ahmad',
    'Database Design Waqas Ahmad',
    'Database Optimization Waqas Ahmad',
    'API Development Waqas Ahmad',
    'Technical Leadership Waqas Ahmad',
    'Agile Waqas Ahmad',
    'Scrum Waqas Ahmad',
    // Skills + Ahmad (without Waqas)
    '.NET Ahmad',
    '.NET Core Ahmad',
    'Azure Ahmad',
    'Azure Cloud Ahmad',
    'Vue.js Ahmad',
    'Angular Ahmad',
    'React Ahmad',
    'Microservices Ahmad',
    'SQL Server Ahmad',
    'Entity Framework Ahmad',
    'Docker Ahmad',
    'Kubernetes Ahmad',
    'Full Stack Ahmad',
    'API Development Ahmad',
    'DevOps Ahmad',
    'CI/CD Ahmad',
    // Ahmad + Skills (reverse order)
    'Ahmad .NET',
    'Ahmad .NET Core',
    'Ahmad Azure',
    'Ahmad Azure Cloud',
    'Ahmad Vue.js',
    'Ahmad Angular',
    'Ahmad React',
    'Ahmad Microservices',
    'Ahmad SQL Server',
    'Ahmad Entity Framework',
    'Ahmad Docker',
    'Ahmad Kubernetes',
    'Ahmad Full Stack',
    'Ahmad API Development',
    'Ahmad DevOps',
    'Ahmad CI/CD',
    // Waqas + Skills (reverse order)
    'Waqas .NET',
    'Waqas .NET Core',
    'Waqas Azure',
    'Waqas Azure Cloud',
    'Waqas Vue.js',
    'Waqas Angular',
    'Waqas React',
    'Waqas Microservices',
    'Waqas SQL Server',
    'Waqas Entity Framework',
    'Waqas Docker',
    'Waqas Kubernetes',
    'Waqas Full Stack',
    'Waqas API Development',
    'Waqas DevOps',
    'Waqas CI/CD',
    // Waqas Ahmad + Skills (reverse order)
    'Waqas Ahmad .NET',
    'Waqas Ahmad .NET Core',
    'Waqas Ahmad Azure',
    'Waqas Ahmad Azure Cloud',
    'Waqas Ahmad Vue.js',
    'Waqas Ahmad Angular',
    'Waqas Ahmad React',
    'Waqas Ahmad Microservices',
    'Waqas Ahmad SQL Server',
    'Waqas Ahmad Entity Framework',
    'Waqas Ahmad Docker',
    'Waqas Ahmad Kubernetes',
    'Waqas Ahmad Full Stack',
    'Waqas Ahmad API Development',
    'Waqas Ahmad DevOps',
    'Waqas Ahmad CI/CD'
  ]

  // EDUCATION + INSTITUTE + NAME COMBINATIONS
  // DEEP DIVE: UET Lahore, Computer System Engineering, graduate combinations
  const educationInstituteKeywords = [
    'UET Lahore Waqas',
    'UET Lahore Waqas Ahmad',
    'UET Lahore graduate Waqas',
    'UET Lahore graduate Waqas Ahmad',
    'UET Lahore Computer System Engineering Waqas',
    'UET Lahore Computer System Engineering Waqas Ahmad',
    'University of Engineering and Technology Lahore Waqas',
    'University of Engineering and Technology Lahore Waqas Ahmad',
    'Computer System Engineering Waqas',
    'Computer System Engineering Waqas Ahmad',
    'Computer System Engineering UET Lahore Waqas',
    'Computer System Engineering UET Lahore Waqas Ahmad',
    'UET Lahore software engineer Waqas',
    'UET Lahore software engineer Waqas Ahmad',
    'UET Lahore developer Waqas',
    'UET Lahore developer Waqas Ahmad',
    'UET Lahore .NET developer Waqas Ahmad',
    'UET Lahore Azure architect Waqas Ahmad',
    'UET Lahore graduate software engineer Waqas Ahmad',
    'UET Lahore Computer System Engineering graduate Waqas Ahmad',
    'Waqas UET Lahore Computer System Engineering',
    'Waqas Ahmad UET Lahore Computer System Engineering',
    'Waqas UET Lahore Computer System Engineering graduate',
    'Waqas Ahmad UET Lahore Computer System Engineering graduate',
    'Waqas University of Engineering and Technology Lahore',
    'Waqas Ahmad University of Engineering and Technology Lahore',
    'Waqas Computer System Engineering UET Lahore',
    'Waqas Ahmad Computer System Engineering UET Lahore'
  ]

  // WORK EXPERIENCE + FORTUNE 500 + NAME COMBINATIONS
  // DEEP DIVE: Fortune 500, enterprise, mission critical, years experience
  const workExperienceKeywords = [
    'Fortune 500 Waqas',
    'Fortune 500 Waqas Ahmad',
    'Fortune 500 developer Waqas Ahmad',
    'Fortune 500 software engineer Waqas Ahmad',
    'Fortune 500 consultant Waqas Ahmad',
    'enterprise Waqas',
    'enterprise Waqas Ahmad',
    'enterprise developer Waqas Ahmad',
    'enterprise software engineer Waqas Ahmad',
    'enterprise consultant Waqas Ahmad',
    'mission critical Waqas Ahmad',
    'mission critical developer Waqas Ahmad',
    'mission critical software engineer Waqas Ahmad',
    'zero downtime Waqas Ahmad',
    'zero downtime developer Waqas Ahmad',
    'high availability Waqas Ahmad',
    'high availability developer Waqas Ahmad',
    'scalable architecture Waqas Ahmad',
    'scalable architecture developer Waqas Ahmad',
    '17 years experience Waqas',
    '17 years experience Waqas Ahmad',
    '17+ years experience Waqas',
    '17+ years experience Waqas Ahmad',
    'experienced developer Waqas',
    'experienced developer Waqas Ahmad',
    'experienced software engineer Waqas',
    'experienced software engineer Waqas Ahmad',
    'senior software engineer 17 years Waqas Ahmad',
    'technical lead 17 years Waqas Ahmad',
    'Fortune 500 experience Waqas Ahmad',
    'enterprise experience Waqas Ahmad',
    'large scale projects Waqas Ahmad',
    'huge projects Waqas Ahmad',
    'enterprise projects Waqas Ahmad',
    'mission critical projects Waqas Ahmad',
    'production ready Waqas Ahmad',
    'robust architecture Waqas Ahmad',
    'resilient systems Waqas Ahmad',
    'real-time processing Waqas Ahmad',
    'high-performance systems Waqas Ahmad',
    'distributed systems Waqas Ahmad',
    'large-scale enterprise Waqas Ahmad'
  ]

  // COMPANY NAME + NAME COMBINATIONS
  // ENTERPRISE SEO: Following Fortune 500 patterns - company + name + role combinations
  // Based on actual companies worked with: AirAsia, British American Tobacco (BAT), Chubb Insurance, Microsoft
  const companyNameKeywords = [
    // AirAsia combinations
    'AirAsia Waqas',
    'AirAsia Waqas Ahmad',
    'AirAsia developer Waqas',
    'AirAsia developer Waqas Ahmad',
    'AirAsia software engineer Waqas',
    'AirAsia software engineer Waqas Ahmad',
    'AirAsia consultant Waqas Ahmad',
    'AirAsia .NET developer Waqas Ahmad',
    'AirAsia Azure developer Waqas Ahmad',
    'AirAsia full stack developer Waqas Ahmad',
    'AirAsia microservices Waqas Ahmad',
    'Waqas AirAsia',
    'Waqas Ahmad AirAsia',
    'Waqas AirAsia developer',
    'Waqas Ahmad AirAsia developer',
    'Waqas AirAsia software engineer',
    'Waqas Ahmad AirAsia software engineer',
    'Waqas Ahmad AirAsia consultant',
    'Waqas Ahmad AirAsia .NET',
    'Waqas Ahmad AirAsia Azure',
    'Waqas Ahmad AirAsia full stack',
    'Waqas Ahmad AirAsia microservices',
    'AirAsia ID90 Waqas',
    'AirAsia ID90 Waqas Ahmad',
    'AirAsia ID90 developer Waqas Ahmad',
    'AirAsia employee travel Waqas Ahmad',
    'AirAsia flight discount Waqas Ahmad',
    'AirAsia portal Waqas Ahmad',
    // British American Tobacco (BAT) combinations
    'BAT Waqas',
    'BAT Waqas Ahmad',
    'British American Tobacco Waqas',
    'British American Tobacco Waqas Ahmad',
    'BAT developer Waqas',
    'BAT developer Waqas Ahmad',
    'BAT software engineer Waqas',
    'BAT software engineer Waqas Ahmad',
    'BAT consultant Waqas Ahmad',
    'BAT .NET developer Waqas Ahmad',
    'BAT Azure developer Waqas Ahmad',
    'BAT microservices Waqas Ahmad',
    'BAT Service Fabric Waqas Ahmad',
    'BAT SAP integration Waqas Ahmad',
    'Waqas BAT',
    'Waqas Ahmad BAT',
    'Waqas British American Tobacco',
    'Waqas Ahmad British American Tobacco',
    'Waqas BAT developer',
    'Waqas Ahmad BAT developer',
    'Waqas BAT software engineer',
    'Waqas Ahmad BAT software engineer',
    'Waqas Ahmad BAT consultant',
    'Waqas Ahmad BAT .NET',
    'Waqas Ahmad BAT Azure',
    'Waqas Ahmad BAT microservices',
    'Waqas Ahmad BAT Service Fabric',
    'Waqas Ahmad BAT SAP',
    'BAT inhouse app Waqas Ahmad',
    'BAT enterprise app Waqas Ahmad',
    'BAT microservices platform Waqas Ahmad',
    // Chubb Insurance combinations
    'Chubb Waqas',
    'Chubb Waqas Ahmad',
    'Chubb Insurance Waqas',
    'Chubb Insurance Waqas Ahmad',
    'Chubb developer Waqas',
    'Chubb developer Waqas Ahmad',
    'Chubb software engineer Waqas',
    'Chubb software engineer Waqas Ahmad',
    'Chubb consultant Waqas Ahmad',
    'Chubb .NET developer Waqas Ahmad',
    'Chubb Azure developer Waqas Ahmad',
    'Chubb insurance systems Waqas Ahmad',
    'Chubb claims processing Waqas Ahmad',
    'Chubb policy management Waqas Ahmad',
    'Waqas Chubb',
    'Waqas Ahmad Chubb',
    'Waqas Chubb Insurance',
    'Waqas Ahmad Chubb Insurance',
    'Waqas Chubb developer',
    'Waqas Ahmad Chubb developer',
    'Waqas Chubb software engineer',
    'Waqas Ahmad Chubb software engineer',
    'Waqas Ahmad Chubb consultant',
    'Waqas Ahmad Chubb .NET',
    'Waqas Ahmad Chubb Azure',
    'Waqas Ahmad Chubb insurance',
    'Chubb insurance applications Waqas Ahmad',
    'Chubb enterprise insurance Waqas Ahmad',
    // Microsoft combinations
    'Microsoft Waqas',
    'Microsoft Waqas Ahmad',
    'Microsoft developer Waqas',
    'Microsoft developer Waqas Ahmad',
    'Microsoft software engineer Waqas',
    'Microsoft software engineer Waqas Ahmad',
    'Microsoft consultant Waqas Ahmad',
    'Microsoft .NET developer Waqas Ahmad',
    'Microsoft Azure developer Waqas Ahmad',
    'Microsoft Azure architect Waqas Ahmad',
    'Microsoft technologies Waqas Ahmad',
    'Waqas Microsoft',
    'Waqas Ahmad Microsoft',
    'Waqas Microsoft developer',
    'Waqas Ahmad Microsoft developer',
    'Waqas Microsoft software engineer',
    'Waqas Ahmad Microsoft software engineer',
    'Waqas Ahmad Microsoft consultant',
    'Waqas Ahmad Microsoft .NET',
    'Waqas Ahmad Microsoft Azure',
    'Waqas Ahmad Microsoft technologies',
    // Fortune 500 + Company combinations
    'Fortune 500 AirAsia Waqas Ahmad',
    'Fortune 500 BAT Waqas Ahmad',
    'Fortune 500 Chubb Waqas Ahmad',
    'Fortune 500 Microsoft Waqas Ahmad',
    'enterprise AirAsia Waqas Ahmad',
    'enterprise BAT Waqas Ahmad',
    'enterprise Chubb Waqas Ahmad',
    'enterprise Microsoft Waqas Ahmad'
  ]

  // SOCIAL MEDIA + NAME COMBINATIONS
  // ENTERPRISE SEO: Social profile discovery keywords
  // LinkedIn: linkedin.com/in/waqas1430
  // GitHub: github.com/devwithwaqas
  const socialMediaKeywords = [
    // LinkedIn combinations
    'LinkedIn Waqas',
    'LinkedIn Waqas Ahmad',
    'Waqas LinkedIn',
    'Waqas Ahmad LinkedIn',
    'Waqas Ahmad LinkedIn profile',
    'Waqas Ahmad LinkedIn developer',
    'Waqas Ahmad LinkedIn software engineer',
    'Waqas Ahmad LinkedIn consultant',
    'LinkedIn profile Waqas Ahmad',
    'LinkedIn developer Waqas Ahmad',
    'LinkedIn software engineer Waqas Ahmad',
    'LinkedIn consultant Waqas Ahmad',
    'waqas1430',
    'waqas1430 LinkedIn',
    'linkedin.com/in/waqas1430',
    'linkedin.com/in/waqas1430 Waqas Ahmad',
    'find Waqas Ahmad LinkedIn',
    'Waqas Ahmad on LinkedIn',
    'Waqas Ahmad LinkedIn page',
    'Waqas Ahmad LinkedIn account',
    'Waqas Ahmad LinkedIn contact',
    'connect Waqas Ahmad LinkedIn',
    // GitHub combinations
    'GitHub Waqas',
    'GitHub Waqas Ahmad',
    'Waqas GitHub',
    'Waqas Ahmad GitHub',
    'Waqas Ahmad GitHub profile',
    'Waqas Ahmad GitHub developer',
    'Waqas Ahmad GitHub software engineer',
    'Waqas Ahmad GitHub projects',
    'GitHub profile Waqas Ahmad',
    'GitHub developer Waqas Ahmad',
    'GitHub software engineer Waqas Ahmad',
    'devwithwaqas',
    'devwithwaqas GitHub',
    'github.com/devwithwaqas',
    'github.com/devwithwaqas Waqas Ahmad',
    'find Waqas Ahmad GitHub',
    'Waqas Ahmad on GitHub',
    'Waqas Ahmad GitHub page',
    'Waqas Ahmad GitHub account',
    'Waqas Ahmad GitHub repositories',
    'Waqas Ahmad GitHub code',
    // Google search combinations
    'Google Waqas Ahmad',
    'Waqas Ahmad Google',
    'Waqas Ahmad Google search',
    'find Waqas Ahmad Google',
    'Waqas Ahmad on Google',
    'Google search Waqas Ahmad',
    'search Waqas Ahmad Google',
    'Waqas Ahmad Google profile',
    // Social media platform combinations
    'Waqas Ahmad social media',
    'Waqas Ahmad social profiles',
    'Waqas Ahmad online profile',
    'Waqas Ahmad professional profile',
    'Waqas Ahmad developer profile',
    'Waqas Ahmad software engineer profile',
    'Waqas Ahmad consultant profile',
    'Waqas Ahmad portfolio LinkedIn',
    'Waqas Ahmad portfolio GitHub',
    'Waqas Ahmad contact LinkedIn',
    'Waqas Ahmad contact GitHub',
    'Waqas Ahmad email LinkedIn',
    'Waqas Ahmad email GitHub',
    // Cross-platform combinations
    'Waqas Ahmad LinkedIn GitHub',
    'Waqas Ahmad GitHub LinkedIn',
    'Waqas Ahmad social networks',
    'Waqas Ahmad professional networks',
    'Waqas Ahmad developer networks',
    'Waqas Ahmad software engineer networks'
  ]

  // ENTERPRISE SEO PATTERN KEYWORDS
  // Following Fortune 500 semantic SEO patterns: entity relationships, topic clusters, long-tail
  const enterpriseSEOKeywords = [
    // Entity relationship keywords (name + role + location + experience)
    'Waqas Ahmad senior software engineer Malaysia',
    'Waqas Ahmad technical lead Malaysia',
    'Waqas Ahmad consultant Malaysia remote',
    'Waqas Ahmad .NET developer Malaysia',
    'Waqas Ahmad Azure architect Malaysia',
    'Waqas Ahmad full stack developer Malaysia',
    'Malaysia senior software engineer Waqas Ahmad',
    'Malaysia technical lead Waqas Ahmad',
    'Malaysia consultant Waqas Ahmad',
    'Malaysia .NET developer Waqas Ahmad',
    'Malaysia Azure architect Waqas Ahmad',
    'Malaysia full stack developer Waqas Ahmad',
    // Topic cluster keywords (name + technology + industry)
    'Waqas Ahmad .NET enterprise solutions',
    'Waqas Ahmad Azure cloud solutions',
    'Waqas Ahmad microservices enterprise',
    'Waqas Ahmad full stack enterprise',
    'Waqas Ahmad API development enterprise',
    'Waqas Ahmad database optimization enterprise',
    'Waqas Ahmad technical leadership enterprise',
    'enterprise .NET Waqas Ahmad',
    'enterprise Azure Waqas Ahmad',
    'enterprise microservices Waqas Ahmad',
    'enterprise full stack Waqas Ahmad',
    'enterprise API development Waqas Ahmad',
    'enterprise database optimization Waqas Ahmad',
    'enterprise technical leadership Waqas Ahmad',
    // Long-tail semantic keywords (question-based, intent-driven)
    'who is Waqas Ahmad',
    'who is Waqas Ahmad developer',
    'who is Waqas Ahmad software engineer',
    'who is Waqas Ahmad consultant',
    'who is Waqas Ahmad .NET developer',
    'who is Waqas Ahmad Azure architect',
    'find Waqas Ahmad developer',
    'find Waqas Ahmad software engineer',
    'find Waqas Ahmad consultant',
    'find Waqas Ahmad .NET developer',
    'find Waqas Ahmad Azure architect',
    'hire Waqas Ahmad developer',
    'hire Waqas Ahmad software engineer',
    'hire Waqas Ahmad consultant',
    'hire Waqas Ahmad .NET developer',
    'hire Waqas Ahmad Azure architect',
    'contact Waqas Ahmad developer',
    'contact Waqas Ahmad software engineer',
    'contact Waqas Ahmad consultant',
    'contact Waqas Ahmad .NET developer',
    'contact Waqas Ahmad Azure architect',
    'Waqas Ahmad available for hire',
    'Waqas Ahmad available for projects',
    'Waqas Ahmad available for contract',
    'Waqas Ahmad available for freelance',
    'Waqas Ahmad available for consulting',
    'Waqas Ahmad available remote',
    'Waqas Ahmad available USA',
    'Waqas Ahmad available Europe',
    'Waqas Ahmad available globally',
    // Semantic variations (synonyms, related terms)
    'Waqas Ahmad software developer',
    'Waqas Ahmad application developer',
    'Waqas Ahmad systems developer',
    'Waqas Ahmad web developer',
    'Waqas Ahmad cloud developer',
    'Waqas Ahmad backend developer',
    'Waqas Ahmad frontend developer',
    'Waqas Ahmad full stack developer',
    'Waqas Ahmad software architect',
    'Waqas Ahmad solution architect',
    'Waqas Ahmad system architect',
    'Waqas Ahmad enterprise architect',
    'Waqas Ahmad cloud architect',
    'Waqas Ahmad technical specialist',
    'Waqas Ahmad software specialist',
    'Waqas Ahmad .NET specialist',
    'Waqas Ahmad Azure specialist',
    'Waqas Ahmad microservices specialist',
    'Waqas Ahmad API specialist',
    'Waqas Ahmad database specialist',
    // Industry + name combinations (semantic clusters)
    'petroleum software Waqas Ahmad',
    'oil gas software Waqas Ahmad',
    'healthcare software Waqas Ahmad',
    'medical software Waqas Ahmad',
    'fintech software Waqas Ahmad',
    'banking software Waqas Ahmad',
    'financial software Waqas Ahmad',
    'aviation software Waqas Ahmad',
    'airline software Waqas Ahmad',
    'e-commerce software Waqas Ahmad',
    'retail software Waqas Ahmad',
    'manufacturing software Waqas Ahmad',
    'insurance software Waqas Ahmad',
    'property management software Waqas Ahmad',
    'smart city software Waqas Ahmad',
    'Waqas Ahmad petroleum software',
    'Waqas Ahmad oil gas software',
    'Waqas Ahmad healthcare software',
    'Waqas Ahmad medical software',
    'Waqas Ahmad fintech software',
    'Waqas Ahmad banking software',
    'Waqas Ahmad financial software',
    'Waqas Ahmad aviation software',
    'Waqas Ahmad airline software',
    'Waqas Ahmad e-commerce software',
    'Waqas Ahmad retail software',
    'Waqas Ahmad manufacturing software',
    'Waqas Ahmad insurance software',
    'Waqas Ahmad property management software',
    'Waqas Ahmad smart city software'
  ]

  // FAQ-BASED EXPERIMENTAL KEYWORDS
  // DEEP DIVE: Based on actual FAQ content from service pages
  const faqBasedKeywords = [
    // Full Stack FAQ keywords
    'frontend frameworks Waqas Ahmad',
    'Vue.js React Angular Waqas Ahmad',
    'full stack development Waqas Ahmad',
    'existing technology stack Waqas Ahmad',
    'remote full stack developer Waqas Ahmad',
    'remote full stack developer available',
    'remote full stack developer USA',
    'remote full stack developer Europe',
    'flexible timezone developer Waqas Ahmad',
    'EST PST GMT CET developer Waqas Ahmad',
    'remote projects Waqas Ahmad',
    'contract freelance consulting Waqas Ahmad',
    // Azure FAQ keywords
    'Azure services Waqas Ahmad',
    'Azure migration Waqas Ahmad',
    'migrate to Azure Waqas Ahmad',
    'Azure cost optimization Waqas Ahmad',
    'Azure security compliance Waqas Ahmad',
    'Azure App Services Waqas Ahmad',
    'Azure Functions Waqas Ahmad',
    'Azure Service Fabric Waqas Ahmad',
    'Azure Kubernetes Service Waqas Ahmad',
    'Azure SQL Database Waqas Ahmad',
    // Database FAQ keywords
    'database platforms Waqas Ahmad',
    'SQL Server optimization Waqas Ahmad',
    'slow query optimization Waqas Ahmad',
    'database indexing Waqas Ahmad',
    'Entity Framework Core performance Waqas Ahmad',
    'query optimization Waqas Ahmad',
    'database migration Waqas Ahmad',
    // Technical Leadership FAQ keywords
    'technical leadership Waqas Ahmad',
    'code reviews Waqas Ahmad',
    'mentoring developers Waqas Ahmad',
    'team leadership Waqas Ahmad',
    'architecture decisions Waqas Ahmad',
    'best practices Waqas Ahmad',
    'existing teams Waqas Ahmad',
    'new teams Waqas Ahmad',
    // Microservices FAQ keywords
    'microservices architecture Waqas Ahmad',
    'microservices design Waqas Ahmad',
    'service decomposition Waqas Ahmad',
    'container orchestration Waqas Ahmad',
    'service communication Waqas Ahmad',
    'API Gateway Waqas Ahmad',
    'Service Mesh Waqas Ahmad',
    'event-driven architecture Waqas Ahmad',
    // Agile FAQ keywords
    'Agile project management Waqas Ahmad',
    'Scrum master Waqas Ahmad',
    'sprint planning Waqas Ahmad',
    'backlog grooming Waqas Ahmad',
    'Agile coach Waqas Ahmad',
    'Kanban Waqas Ahmad',
    // General FAQ keywords
    'available for hire Waqas Ahmad',
    'available for remote work Waqas Ahmad',
    'remote work available',
    'remote consultant available',
    'contact Waqas Ahmad',
    'hire Waqas Ahmad',
    'projects Waqas Ahmad',
    'estimates Waqas Ahmad',
    'engagement models Waqas Ahmad'
  ]

  // QUESTION-BASED SEO KEYWORDS (Q&A / question-intent / conversational queries)
  // Target: "Who is the best...", "How to choose...", "Who provides...", skill+service, local intent
  const questionBasedSEOKeywords = [
    // 1. "Best Provider" questions (long-tail, low competition)
    'best .NET software service provider for small businesses',
    'best .NET software services provider for startups',
    'best freelance .NET developer for API development',
    'best software services provider in .NET for small projects',
    'who offers custom .NET app development',
    'best .NET developer for API development',
    'best technical lead for cloud app development',
    'best .NET developer for cloud-based apps',
    'best software services provider in .NET',
    // 2. "How to choose" / "Which one should I hire" questions
    'how to choose a senior .NET developer',
    'which software service provider is best for cloud-based .NET apps',
    'who can build a .NET backend quickly',
    'how do I choose a .NET software provider',
    'which .NET developer to hire for APIs',
    'how to choose a technical lead for .NET',
    // 3. "Who provides" questions (hiring intent)
    'who provides technical lead services for .NET projects',
    'who provides full-stack .NET development services',
    'who can develop a .NET API with authentication',
    'who provides .NET backend development',
    'who provides Azure cloud architecture services',
    'who provides microservices development .NET',
    'who offers .NET consulting for enterprises',
    // 4. Skill + service combinations (low competition)
    'best .NET developer with Firebase integration skills',
    'full-stack developer for .NET and React apps',
    '.NET software engineer specializing in web APIs',
    '.NET developer with Azure and microservices',
    'technical lead .NET Azure microservices',
    'senior .NET developer API development',
    'full-stack .NET Angular developer',
    'full-stack .NET Vue developer',
    '.NET developer with Angular and Azure',
    // 5. Local / regional intent (entity-rich, optional)
    'best .NET developer in Malaysia',
    'technical lead for software development Malaysia',
    'best .NET developer Malaysia',
    'senior .NET developer Malaysia remote',
    'software engineering consultant Malaysia',
    'technical lead .NET Malaysia'
  ]

  // IT SERVICES KEYWORDS (for "IT services", "IT consulting" searches)
  const itServicesKeywords = [
    'IT services',
    'IT consulting services',
    'IT engineering services',
    'IT services consultant',
    'IT consultant',
    'IT engineering consultant',
    'IT services provider',
    'IT solutions',
    'IT services expert',
    'IT consulting',
    'IT services specialist',
    'IT services expert consultant',
    'professional IT services',
    'IT services for businesses',
    'enterprise IT services',
    'IT services remote',
    'remote IT services',
    'IT services USA',
    'IT services Europe',
    'IT services global'
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
  
  // TECHNICAL & QUALITY KEYWORDS (for home page)
  const technicalQualityKeywords = [
    'reliable',
    'enterprise',
    'enterprise-grade',
    'enterprise-level',
    'enterprise-scale',
    'huge projects',
    'large projects',
    'mission critical',
    'mission-critical',
    'zero downtime',
    'zero-downtime',
    'high availability',
    'high-availability',
    'fault tolerance',
    'fault-tolerant',
    'scalable',
    'scalable architecture',
    'enterprise architecture',
    'system architecture',
    'software architecture',
    'SSL',
    'SSL/TLS',
    'secure',
    'enterprise security',
    'enterprise-grade security',
    'real-time',
    'real-time processing',
    'high-performance',
    'distributed systems',
    'distributed architecture',
    'microservices architecture',
    'enterprise solution',
    'enterprise application',
    'enterprise platform',
    'enterprise system',
    'production-ready',
    'production-grade',
    'robust',
    'robust architecture',
    'resilient',
    'resilient architecture',
    'optimized',
    'performance-optimized',
    'cloud-native',
    'cloud-based',
    'containerized',
    'container orchestration'
  ]
  
  // INDUSTRY-SPECIFIC KEYWORDS (comprehensive industry coverage)
  const industryKeywords = [
    // Petroleum & Oil & Gas
    'petroleum software engineer',
    'oil and gas software engineer',
    'oil and gas software developer',
    'petroleum systems developer',
    'oil and gas systems developer',
    'petroleum software consultant',
    'oil and gas software consultant',
    'petroleum industry developer',
    'oil and gas industry developer',
    'petroleum engineering software',
    'oil and gas engineering software',
    'petroleum management systems',
    'oil and gas management systems',
    'petroleum operations software',
    'oil and gas operations software',
    'petroleum platform developer',
    'oil and gas platform developer',
    'petroleum enterprise software',
    'oil and gas enterprise software',
    'petroleum .net developer',
    'oil and gas .net developer',
    'petroleum azure developer',
    'oil and gas azure developer',
    'petroleum full stack developer',
    'oil and gas full stack developer',
    'petroleum angular developer',
    'oil and gas angular developer',
    'petroleum microservices developer',
    'oil and gas microservices developer',
    'petroleum heat exchanger systems',
    'oil and gas heat exchanger systems',
    'petroleum refinery software',
    'oil and gas refinery software',
    'petroleum maintenance systems',
    'oil and gas maintenance systems',
    'petroleum monitoring systems',
    'oil and gas monitoring systems',
    'petroleum analytics software',
    'oil and gas analytics software',
    'petroleum iot systems',
    'oil and gas iot systems',
    'petroleum sensor systems',
    'oil and gas sensor systems',
    'petroleum real-time systems',
    'oil and gas real-time systems',
    'petroleum mission critical systems',
    'oil and gas mission critical systems',
    
    // Healthcare & Medical
    'healthcare software engineer',
    'healthcare software developer',
    'healthcare systems developer',
    'healthcare software consultant',
    'healthcare industry developer',
    'medical software engineer',
    'medical software developer',
    'medical systems developer',
    'healthcare .net developer',
    'medical .net developer',
    'healthcare azure developer',
    'medical azure developer',
    'healthcare full stack developer',
    'medical full stack developer',
    'healthcare angular developer',
    'medical angular developer',
    'healthcare microservices developer',
    'medical microservices developer',
    'healthcare management systems',
    'medical management systems',
    'healthcare information systems',
    'medical information systems',
    'healthcare electronic health records',
    'medical electronic health records',
    'healthcare ehr systems',
    'medical ehr systems',
    'healthcare patient management',
    'medical patient management',
    'healthcare hospital systems',
    'medical hospital systems',
    'healthcare clinic systems',
    'medical clinic systems',
    'healthcare telemedicine systems',
    'medical telemedicine systems',
    'healthcare compliance systems',
    'medical compliance systems',
    'healthcare hipaa compliant',
    'medical hipaa compliant',
    'healthcare data security',
    'medical data security',
    'healthcare real-time monitoring',
    'medical real-time monitoring',
    'healthcare analytics software',
    'medical analytics software',
    'healthcare iot systems',
    'medical iot systems',
    'healthcare wearable integration',
    'medical wearable integration',
    
    // Financial Services & Banking
    'fintech software engineer',
    'fintech software developer',
    'fintech systems developer',
    'fintech software consultant',
    'banking software engineer',
    'banking software developer',
    'banking systems developer',
    'banking software consultant',
    'financial services developer',
    'financial services software engineer',
    'financial services systems developer',
    'financial services consultant',
    'fintech .net developer',
    'banking .net developer',
    'financial services .net developer',
    'fintech azure developer',
    'banking azure developer',
    'financial services azure developer',
    'fintech full stack developer',
    'banking full stack developer',
    'financial services full stack developer',
    'fintech angular developer',
    'banking angular developer',
    'financial services angular developer',
    'fintech microservices developer',
    'banking microservices developer',
    'financial services microservices developer',
    'fintech payment systems',
    'banking payment systems',
    'financial services payment systems',
    'fintech trading systems',
    'banking trading systems',
    'financial services trading systems',
    'fintech risk management systems',
    'banking risk management systems',
    'financial services risk management systems',
    'fintech compliance systems',
    'banking compliance systems',
    'financial services compliance systems',
    'fintech security systems',
    'banking security systems',
    'financial services security systems',
    'fintech real-time systems',
    'banking real-time systems',
    'financial services real-time systems',
    
    // Aviation & Aerospace
    'aviation software engineer',
    'aviation software developer',
    'aviation systems developer',
    'aviation software consultant',
    'aerospace software engineer',
    'aerospace software developer',
    'aerospace systems developer',
    'aviation .net developer',
    'aerospace .net developer',
    'aviation azure developer',
    'aerospace azure developer',
    'aviation full stack developer',
    'aerospace full stack developer',
    'aviation angular developer',
    'aerospace angular developer',
    'aviation microservices developer',
    'aerospace microservices developer',
    'aviation flight management systems',
    'aerospace flight management systems',
    'aviation booking systems',
    'aerospace booking systems',
    'aviation employee travel systems',
    'aerospace employee travel systems',
    'aviation discount systems',
    'aerospace discount systems',
    'aviation real-time systems',
    'aerospace real-time systems',
    'aviation mission critical systems',
    'aerospace mission critical systems',
    
    // E-commerce & Retail
    'ecommerce developer',
    'ecommerce software engineer',
    'ecommerce software developer',
    'ecommerce systems developer',
    'ecommerce software consultant',
    'retail software engineer',
    'retail software developer',
    'retail systems developer',
    'retail software consultant',
    'ecommerce .net developer',
    'retail .net developer',
    'ecommerce azure developer',
    'retail azure developer',
    'ecommerce full stack developer',
    'retail full stack developer',
    'ecommerce angular developer',
    'retail angular developer',
    'ecommerce microservices developer',
    'retail microservices developer',
    'ecommerce pos systems',
    'retail pos systems',
    'ecommerce inventory management',
    'retail inventory management',
    'ecommerce order management',
    'retail order management',
    'ecommerce payment processing',
    'retail payment processing',
    'ecommerce real-time systems',
    'retail real-time systems',
    
    // Manufacturing & Industrial
    'manufacturing software developer',
    'manufacturing software engineer',
    'manufacturing systems developer',
    'manufacturing software consultant',
    'industrial software developer',
    'industrial software engineer',
    'industrial systems developer',
    'industrial software consultant',
    'manufacturing .net developer',
    'industrial .net developer',
    'manufacturing azure developer',
    'industrial azure developer',
    'manufacturing full stack developer',
    'industrial full stack developer',
    'manufacturing angular developer',
    'industrial angular developer',
    'manufacturing microservices developer',
    'industrial microservices developer',
    'manufacturing erp systems',
    'industrial erp systems',
    'manufacturing mrp systems',
    'industrial mrp systems',
    'manufacturing scada systems',
    'industrial scada systems',
    'manufacturing iot systems',
    'industrial iot systems',
    'manufacturing real-time systems',
    'industrial real-time systems',
    
    // Telecommunications
    'telecommunications software engineer',
    'telecommunications software developer',
    'telecommunications systems developer',
    'telecommunications software consultant',
    'telecom software engineer',
    'telecom software developer',
    'telecom systems developer',
    'telecom software consultant',
    'telecommunications .net developer',
    'telecom .net developer',
    'telecommunications azure developer',
    'telecom azure developer',
    'telecommunications full stack developer',
    'telecom full stack developer',
    'telecommunications angular developer',
    'telecom angular developer',
    'telecommunications microservices developer',
    'telecom microservices developer',
    'telecommunications network systems',
    'telecom network systems',
    'telecommunications real-time systems',
    'telecom real-time systems',
    
    // Insurance
    'insurance software developer',
    'insurance software engineer',
    'insurance systems developer',
    'insurance software consultant',
    'insurance .net developer',
    'insurance azure developer',
    'insurance full stack developer',
    'insurance angular developer',
    'insurance microservices developer',
    'insurance claims systems',
    'insurance policy management',
    'insurance underwriting systems',
    'insurance real-time systems',
    
    // Energy & Utilities
    'energy software developer',
    'energy software engineer',
    'energy systems developer',
    'energy software consultant',
    'utilities software developer',
    'utilities software engineer',
    'utilities systems developer',
    'utilities software consultant',
    'energy .net developer',
    'utilities .net developer',
    'energy azure developer',
    'utilities azure developer',
    'energy full stack developer',
    'utilities full stack developer',
    'energy angular developer',
    'utilities angular developer',
    'energy microservices developer',
    'utilities microservices developer',
    'energy smart grid systems',
    'utilities smart grid systems',
    'energy iot systems',
    'utilities iot systems',
    'energy real-time systems',
    'utilities real-time systems',
    
    // Transportation & Logistics
    'transportation software developer',
    'transportation software engineer',
    'transportation systems developer',
    'transportation software consultant',
    'logistics software developer',
    'logistics software engineer',
    'logistics systems developer',
    'logistics software consultant',
    'transportation .net developer',
    'logistics .net developer',
    'transportation azure developer',
    'logistics azure developer',
    'transportation full stack developer',
    'logistics full stack developer',
    'transportation angular developer',
    'logistics angular developer',
    'transportation microservices developer',
    'logistics microservices developer',
    'transportation fleet management',
    'logistics fleet management',
    'transportation tracking systems',
    'logistics tracking systems',
    'transportation real-time systems',
    'logistics real-time systems',
    
    // Education & E-Learning
    'education software developer',
    'education software engineer',
    'education systems developer',
    'education software consultant',
    'elearning software developer',
    'elearning software engineer',
    'elearning systems developer',
    'elearning software consultant',
    'education .net developer',
    'elearning .net developer',
    'education azure developer',
    'elearning azure developer',
    'education full stack developer',
    'elearning full stack developer',
    'education angular developer',
    'elearning angular developer',
    'education microservices developer',
    'elearning microservices developer',
    'education lms systems',
    'elearning lms systems',
    'education student management',
    'elearning student management',
    
    // Government & Public Sector
    'government software developer',
    'government software engineer',
    'government systems developer',
    'government software consultant',
    'public sector software developer',
    'public sector software engineer',
    'public sector systems developer',
    'public sector software consultant',
    'government .net developer',
    'public sector .net developer',
    'government azure developer',
    'public sector azure developer',
    'government full stack developer',
    'public sector full stack developer',
    'government angular developer',
    'public sector angular developer',
    'government microservices developer',
    'public sector microservices developer',
    'government compliance systems',
    'public sector compliance systems',
    'government security systems',
    'public sector security systems',
    
    // General Enterprise
    'enterprise software consultant',
    'b2b software developer',
    'saas developer',
    'enterprise saas',
    'fortune 500 developer',
    'fortune 500 consultant',
    'enterprise client experience',
    'multi-industry experience',
    'cross-industry expertise',
    'enterprise solutions developer',
    'enterprise platform developer',
    'enterprise system developer'
  ]
  
  // EXPERIENCE-LEVEL KEYWORDS (variations)
  const experienceLevelKeywords = [
    'senior software engineer',
    'lead software engineer',
    'principal software engineer',
    'staff software engineer',
    'senior technical lead',
    'principal technical lead',
    'senior architect',
    'principal architect',
    'senior consultant',
    'principal consultant',
    'experienced software engineer',
    'veteran software engineer',
    'expert software engineer',
    'seasoned developer',
    'senior developer',
    'lead developer',
    'principal developer',
    `${experience} years experience`,
    `${experience}+ years experience`,
    `over ${experience} years`,
    `more than ${experience} years`
  ]
  
  // ACHIEVEMENT & CREDENTIAL KEYWORDS
  const achievementKeywords = [
    'award-winning software engineer',
    'champion programmer',
    'national programming champion',
    'acm programming champion',
    'guinness world records',
    'academic excellence',
    'honors graduate',
    'computer system engineering',
    'uet lahore graduate',
    'top performer',
    'elite developer',
    'expert problem solver',
    'algorithm expert',
    'competitive programming',
    'speed programming champion'
  ]
  
  // METHODOLOGY & PROCESS KEYWORDS
  const methodologyKeywords = [
    'agile methodology',
    'scrum master',
    'agile coach',
    'scrum practitioner',
    'kanban expert',
    'devops culture',
    'ci/cd expert',
    'continuous integration',
    'continuous deployment',
    'test-driven development',
    'tdd expert',
    'code review expert',
    'pair programming',
    'extreme programming',
    'lean development',
    'iterative development',
    'sprint planning',
    'retrospective facilitator'
  ]
  
  // TECHNOLOGY STACK COMBINATIONS (long-tail)
  const techStackKeywords = [
    '.net core vue.js',
    '.net core angular',
    '.net core react',
    'azure .net developer',
    'azure microservices',
    'azure service fabric .net',
    'sql server .net',
    'cosmos db azure',
    'docker kubernetes azure',
    'vue.js typescript',
    'angular typescript',
    'react typescript',
    'entity framework core',
    'asp.net core api',
    'restful api .net',
    'graphql .net',
    'signalr real-time',
    'redis caching',
    'azure functions serverless',
    'azure app service',
    'azure key vault',
    'azure devops ci/cd',
    'microservices .net core',
    'distributed systems azure',
    'full stack .net',
    'full stack vue.js',
    'full stack angular'
  ]
  
  // PROBLEM-SOLVING & SOLUTION KEYWORDS
  const solutionKeywords = [
    'problem solver',
    'solution architect',
    'technical problem solver',
    'complex problem solving',
    'system optimization',
    'performance optimization',
    'database optimization',
    'query optimization',
    'code optimization',
    'architecture optimization',
    'scalability solutions',
    'performance solutions',
    'reliability solutions',
    'security solutions',
    'integration solutions',
    'migration solutions',
    'modernization solutions',
    'legacy system modernization',
    'system refactoring',
    'code refactoring',
    'technical debt reduction'
  ]
  
  // TEAM & LEADERSHIP KEYWORDS
  const leadershipKeywords = [
    'team lead',
    'technical team lead',
    'development team lead',
    'engineering team lead',
    'tech lead',
    'team leadership',
    'technical leadership',
    'engineering leadership',
    'mentor',
    'technical mentor',
    'developer mentor',
    'code mentor',
    'team mentoring',
    'cross-functional team',
    'distributed team',
    'remote team lead',
    'global team lead',
    'team collaboration',
    'technical collaboration',
    'knowledge sharing',
    'technical training',
    'team building',
    'developer coaching'
  ]
  
  // ADDITIONAL ENTERPRISE SEO KEYWORDS (500-800 total target)
  // Following enterprise patterns: semantic relationships, entity connections, topic authority
  
  // Geographic + Name + Role combinations (comprehensive coverage)
  const geographicRoleKeywords = [
    'USA Waqas Ahmad',
    'United States Waqas Ahmad',
    'US Waqas Ahmad',
    'UK Waqas Ahmad',
    'United Kingdom Waqas Ahmad',
    'Europe Waqas Ahmad',
    'Germany Waqas Ahmad',
    'Netherlands Waqas Ahmad',
    'Switzerland Waqas Ahmad',
    'Malaysia Waqas Ahmad',
    'Selangor Waqas Ahmad',
    'Waqas Ahmad USA',
    'Waqas Ahmad United States',
    'Waqas Ahmad US',
    'Waqas Ahmad UK',
    'Waqas Ahmad United Kingdom',
    'Waqas Ahmad Europe',
    'Waqas Ahmad Germany',
    'Waqas Ahmad Netherlands',
    'Waqas Ahmad Switzerland',
    'Waqas Ahmad Malaysia',
    'Waqas Ahmad Selangor',
    'remote developer USA Waqas Ahmad',
    'remote developer UK Waqas Ahmad',
    'remote developer Europe Waqas Ahmad',
    'remote developer Germany Waqas Ahmad',
    'remote developer Netherlands Waqas Ahmad',
    'remote developer Malaysia Waqas Ahmad',
    'USA remote developer Waqas Ahmad',
    'UK remote developer Waqas Ahmad',
    'Europe remote developer Waqas Ahmad',
    'Germany remote developer Waqas Ahmad',
    'Netherlands remote developer Waqas Ahmad',
    'Malaysia remote developer Waqas Ahmad'
  ]

  // Technology + Name + Experience combinations
  const technologyExperienceKeywords = [
    '17 years .NET Waqas Ahmad',
    '17+ years .NET Waqas Ahmad',
    '17 years Azure Waqas Ahmad',
    '17+ years Azure Waqas Ahmad',
    '17 years microservices Waqas Ahmad',
    '17+ years microservices Waqas Ahmad',
    '17 years full stack Waqas Ahmad',
    '17+ years full stack Waqas Ahmad',
    '17 years experience Waqas Ahmad .NET',
    '17+ years experience Waqas Ahmad .NET',
    '17 years experience Waqas Ahmad Azure',
    '17+ years experience Waqas Ahmad Azure',
    '17 years experience Waqas Ahmad microservices',
    '17+ years experience Waqas Ahmad microservices',
    '17 years experience Waqas Ahmad full stack',
    '17+ years experience Waqas Ahmad full stack',
    'experienced .NET developer Waqas Ahmad',
    'experienced Azure developer Waqas Ahmad',
    'experienced microservices developer Waqas Ahmad',
    'experienced full stack developer Waqas Ahmad',
    'senior .NET developer Waqas Ahmad',
    'senior Azure developer Waqas Ahmad',
    'senior microservices developer Waqas Ahmad',
    'senior full stack developer Waqas Ahmad',
    'veteran .NET developer Waqas Ahmad',
    'veteran Azure developer Waqas Ahmad',
    'veteran microservices developer Waqas Ahmad',
    'veteran full stack developer Waqas Ahmad'
  ]

  // Service + Name combinations (all services)
  const serviceNameKeywords = [
    'full stack development Waqas Ahmad',
    'Azure cloud architecture Waqas Ahmad',
    'technical leadership Waqas Ahmad',
    'microservices architecture Waqas Ahmad',
    'agile project management Waqas Ahmad',
    'database design optimization Waqas Ahmad',
    'mobile development Waqas Ahmad',
    'Waqas Ahmad full stack development',
    'Waqas Ahmad Azure cloud architecture',
    'Waqas Ahmad technical leadership',
    'Waqas Ahmad microservices architecture',
    'Waqas Ahmad agile project management',
    'Waqas Ahmad database design optimization',
    'Waqas Ahmad mobile development',
    'hire Waqas Ahmad full stack',
    'hire Waqas Ahmad Azure cloud',
    'hire Waqas Ahmad technical leadership',
    'hire Waqas Ahmad microservices',
    'hire Waqas Ahmad agile',
    'hire Waqas Ahmad database',
    'hire Waqas Ahmad mobile',
    'Waqas Ahmad full stack services',
    'Waqas Ahmad Azure cloud services',
    'Waqas Ahmad technical leadership services',
    'Waqas Ahmad microservices services',
    'Waqas Ahmad agile services',
    'Waqas Ahmad database services',
    'Waqas Ahmad mobile services'
  ]

  // Project + Name combinations (all major projects)
  const projectNameKeywords = [
    'Heat Exchanger Waqas Ahmad',
    'AirAsia ID90 Waqas Ahmad',
    'BAT Inhouse App Waqas Ahmad',
    'Chubb Insurance Waqas Ahmad',
    'G5 POS Waqas Ahmad',
    'UK Property Management Waqas Ahmad',
    'Gamified Employee Management Waqas Ahmad',
    'PJ Smart City Waqas Ahmad',
    'Valet Parking Waqas Ahmad',
    'Mobile Games Waqas Ahmad',
    'Waqas Ahmad Heat Exchanger',
    'Waqas Ahmad AirAsia ID90',
    'Waqas Ahmad BAT Inhouse App',
    'Waqas Ahmad Chubb Insurance',
    'Waqas Ahmad G5 POS',
    'Waqas Ahmad UK Property Management',
    'Waqas Ahmad Gamified Employee Management',
    'Waqas Ahmad PJ Smart City',
    'Waqas Ahmad Valet Parking',
    'Waqas Ahmad Mobile Games',
    'Waqas Ahmad developed Heat Exchanger',
    'Waqas Ahmad developed AirAsia ID90',
    'Waqas Ahmad developed BAT Inhouse App',
    'Waqas Ahmad developed Chubb Insurance',
    'Waqas Ahmad developed G5 POS',
    'Waqas Ahmad developed UK Property Management',
    'Waqas Ahmad developed Gamified Employee Management',
    'Waqas Ahmad developed PJ Smart City',
    'Waqas Ahmad developed Valet Parking',
    'Waqas Ahmad developed Mobile Games'
  ]

  // Award + Achievement + Name combinations
  const achievementNameKeywords = [
    'National Programming Champion Waqas Ahmad',
    'ACM Programming Competition Waqas Ahmad',
    'UET Lahore programming champion Waqas Ahmad',
    'Waqas Ahmad National Programming Champion',
    'Waqas Ahmad ACM Programming Competition',
    'Waqas Ahmad UET Lahore programming champion',
    'Waqas Ahmad programming competition winner',
    'Waqas Ahmad competitive programming',
    'Waqas Ahmad algorithm design',
    'Waqas Ahmad coding champion',
    'Waqas Ahmad programming expert',
    'award winning developer Waqas Ahmad',
    'award winning software engineer Waqas Ahmad',
    'champion programmer Waqas Ahmad',
    'competitive programmer Waqas Ahmad'
  ]

  // Timezone + Availability + Name combinations
  const timezoneAvailabilityKeywords = [
    'EST Waqas Ahmad',
    'PST Waqas Ahmad',
    'GMT Waqas Ahmad',
    'CET Waqas Ahmad',
    'Waqas Ahmad EST',
    'Waqas Ahmad PST',
    'Waqas Ahmad GMT',
    'Waqas Ahmad CET',
    'Waqas Ahmad flexible timezone',
    'Waqas Ahmad timezone flexible',
    'Waqas Ahmad available EST',
    'Waqas Ahmad available PST',
    'Waqas Ahmad available GMT',
    'Waqas Ahmad available CET',
    'Waqas Ahmad available USA timezone',
    'Waqas Ahmad available Europe timezone',
    'Waqas Ahmad available global timezone',
    'flexible timezone developer Waqas Ahmad',
    'flexible timezone consultant Waqas Ahmad',
    'flexible timezone software engineer Waqas Ahmad'
  ]

  // Engagement Type + Name combinations
  const engagementTypeKeywords = [
    'freelance Waqas Ahmad',
    'contract Waqas Ahmad',
    'consulting Waqas Ahmad',
    'project-based Waqas Ahmad',
    'retainer Waqas Ahmad',
    'part-time Waqas Ahmad',
    'full-time Waqas Ahmad',
    'Waqas Ahmad freelance',
    'Waqas Ahmad contract',
    'Waqas Ahmad consulting',
    'Waqas Ahmad project-based',
    'Waqas Ahmad retainer',
    'Waqas Ahmad part-time',
    'Waqas Ahmad full-time',
    'hire Waqas Ahmad freelance',
    'hire Waqas Ahmad contract',
    'hire Waqas Ahmad consulting',
    'hire Waqas Ahmad project-based',
    'hire Waqas Ahmad retainer',
    'hire Waqas Ahmad part-time',
    'hire Waqas Ahmad full-time',
    'Waqas Ahmad available freelance',
    'Waqas Ahmad available contract',
    'Waqas Ahmad available consulting',
    'Waqas Ahmad available project-based',
    'Waqas Ahmad available retainer',
    'Waqas Ahmad available part-time',
    'Waqas Ahmad available full-time'
  ]

  const homeKeywords = dedupeKeywords(
    expertLevelKeywords,
    nameBasedKeywords,
    misspellingKeywords,
    professionalStatLongTail,
    locationRoleLongTail,
    skillsNameKeywords, // Skills + Name combinations
    educationInstituteKeywords, // Education + Institute keywords
    workExperienceKeywords, // Work experience + Fortune 500 keywords
    companyNameKeywords, // NEW: Company name + name combinations
    socialMediaKeywords, // NEW: Social media + name combinations
    enterpriseSEOKeywords, // NEW: Enterprise SEO pattern keywords
    geographicRoleKeywords, // NEW: Geographic + name + role
    technologyExperienceKeywords, // NEW: Technology + experience + name
    serviceNameKeywords, // NEW: Service + name combinations
    projectNameKeywords, // NEW: Project + name combinations
    achievementNameKeywords, // NEW: Achievement + name combinations
    timezoneAvailabilityKeywords, // NEW: Timezone + availability + name
    engagementTypeKeywords, // NEW: Engagement type + name
    faqBasedKeywords, // FAQ-based experimental keywords
    questionBasedSEOKeywords, // Q&A / question-intent SEO (best provider, how to choose, who provides, skill+service, local)
    itServicesKeywords,
    technicalQualityKeywords,
    industryKeywords,
    experienceLevelKeywords,
    achievementKeywords,
    methodologyKeywords,
    techStackKeywords,
    solutionKeywords,
    leadershipKeywords,
    baseKeywords,
    technologyKeywords,
    getSkillExpertDeveloperKeywords(),
    platformKeywords,
    remoteKeywords,
    usaKeywords,
    europeKeywords,
    globalKeywords,
    location ? [location] : []
  )

  // Intentionally long title/description for keyword coverage - Bing/Google truncate in display but still index full content
  return {
    title: `${fullName} - Software Engineering Consultant & Specialist | Best Software Engineering Expert | IT Engineering Consultant | ${experience}+ Years`,
    description: `Hire ${fullName} - Software Engineering Consultant & Software Engineering Specialist with ${experience}+ years of experience. Best Software Engineering Expert offering professional software engineering services. IT Engineering Consultant specializing in .NET, Azure Cloud, microservices, and enterprise architecture. Available for remote work in USA, Europe, and globally. Flexible timezone (EST, PST, GMT, CET). Worked with Fortune 500 companies worldwide. Contact for remote consulting, freelance, and contract projects.`,
    keywords: homeKeywords,
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
  const hasAngular = techNames.some(t => /angular/i.test(t))
  const hasVue = techNames.some(t => /vue/i.test(t))
  const hasReact = techNames.some(t => /react/i.test(t))
  const hasSQL = techNames.some(t => /sql|database|entity framework/i.test(t))
  const hasMobile = techNames.some(t => /mobile|ios|android|flutter|xamarin|react native/i.test(t))
  
  // Build technology-specific keywords (including expert/developer variants)
  const technologyKeywords = []
  if (hasDotNet) {
    technologyKeywords.push(
      '.net project',
      '.net core project',
      'asp.net project',
      'c# project',
      '.net consultant project',
      '.net expert project',
      '.net expert',
      '.net developer project',
      '.net developer'
    )
  }
  if (hasMicroservices) {
    technologyKeywords.push(
      'microservices project',
      'microservices architecture project',
      'microservices consultant project',
      'distributed systems project',
      'microservices expert project',
      'microservices developer project'
    )
  }
  if (hasAPI) {
    technologyKeywords.push(
      'api development project',
      'restful api project',
      'api consultant project',
      'api expert project',
      'api expert',
      'api developer project'
    )
  }
  if (hasAzure) {
    technologyKeywords.push(
      'azure project',
      'azure cloud project',
      'azure consultant project',
      'azure expert project',
      'azure expert',
      'azure developer project'
    )
  }
  if (hasAngular) {
    technologyKeywords.push(
      'angular project',
      'angular expert project',
      'angular developer project',
      'angular dev project',
      'angular expert',
      'angular developer',
      'angular dev'
    )
  }
  if (hasVue) {
    technologyKeywords.push(
      'vue project',
      'vue.js project',
      'vue expert project',
      'vue developer project',
      'vue.js expert',
      'vue.js developer',
      'vue dev'
    )
  }
  if (hasReact) {
    technologyKeywords.push(
      'react project',
      'react expert project',
      'react developer project',
      'react expert',
      'react developer',
      'react dev'
    )
  }
  if (hasSQL) {
    technologyKeywords.push(
      'sql project',
      'sql server project',
      'database project',
      'sql expert project',
      'sql developer project',
      'database expert',
      'database developer'
    )
  }
  if (hasMobile) {
    technologyKeywords.push(
      'mobile project',
      'mobile expert project',
      'mobile developer project',
      'react native expert',
      'react native developer',
      'flutter expert',
      'flutter developer',
      'ios developer',
      'android developer'
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
  
  const misspellingKeywords = ['Waqas Ahmed', 'Waqas Ahmand']
  const professionalStatLongTail = [
    `software engineer with ${experience} years experience`,
    `experienced software engineer`,
    'experienced IT professional',
    'experienced developer',
    `${experience}+ years experienced software engineer`,
    `senior software engineer with ${experience} years experience`,
    `technical lead with ${experience} years experience`
  ]

  const nameBasedKeywords = [
    `${fullName} project`,
    `Waqas project`,
    `Waqas UET project`,
    `Waqas IT project`,
    `${projectData.title} Waqas`,
    `${projectData.title} Waqas UET`,
    'Waqas portfolio project',
    'Waqas UET portfolio',
    'Waqas only',
    'Waqas Ahmad only',
    'Waqas Ahmad portfolio',
    'Waqas Ahmad Malaysia',
    'Waqas Ahmad Selangor',
    'Waqas Ahmad developer',
    `${fullName} portfolio`,
    `Waqas ${projectData.title}`
  ]
  
  // IT SERVICES KEYWORDS (if project involves IT services)
  const itServicesKeywords = [
    'IT services project',
    'IT consulting project',
    'IT engineering project',
    `${projectData.title} IT services`
  ]
  
  // TECHNICAL & QUALITY KEYWORDS (from project descriptions)
  const technicalKeywords = [
    'reliable',
    'enterprise project',
    'huge project',
    'large project',
    'enterprise-scale project',
    'enterprise-grade project',
    'mission critical',
    'mission-critical project',
    'zero downtime',
    'zero-downtime project',
    'high availability',
    'high-availability project',
    'fault tolerance',
    'fault-tolerant',
    'scalable project',
    'scalable architecture',
    'enterprise architecture',
    'system architecture',
    'software architecture',
    'SSL',
    'SSL/TLS',
    'secure project',
    'enterprise security',
    'enterprise-grade security',
    'real-time',
    'real-time processing',
    'high-performance',
    'high-performance project',
    'distributed systems',
    'distributed architecture',
    'microservices architecture',
    'enterprise solution',
    'enterprise application',
    'enterprise platform',
    'enterprise system',
    'enterprise-grade',
    'enterprise-level',
    'production-ready',
    'production-grade',
    'robust',
    'robust architecture',
    'resilient',
    'resilient architecture',
    'optimized',
    'performance-optimized',
    'cloud-native',
    'cloud-based',
    'containerized',
    'container orchestration'
  ]
  
  // PROJECT-SPECIFIC INDUSTRY KEYWORDS (Enhanced with Industries)
  const projectIndustryKeywords = [
    'fortune 500 project',
    'enterprise client project',
    'large enterprise project',
    'b2b software project',
    'saas project',
    'enterprise saas project',
    'mission-critical system',
    'production system',
    'live system',
    'deployed system',
    'operational system',
    'customer-facing system',
    'internal enterprise system',
    'integrated system',
    'legacy modernization',
    'system migration',
    'platform migration',
    'cloud migration project',
    // Petroleum & Oil & Gas Projects
    'petroleum project',
    'oil and gas project',
    'petroleum systems project',
    'oil and gas systems project',
    'petroleum .net core project',
    'oil and gas .net core project',
    'petroleum angular project',
    'oil and gas angular project',
    'petroleum azure project',
    'oil and gas azure project',
    'petroleum full stack project',
    'oil and gas full stack project',
    'petroleum microservices project',
    'oil and gas microservices project',
    'heat exchanger system',
    'petroleum heat exchanger',
    'oil and gas heat exchanger',
    'petroleum refinery system',
    'oil and gas refinery system',
    'petroleum maintenance system',
    'oil and gas maintenance system',
    'petroleum monitoring system',
    'oil and gas monitoring system',
    'petroleum analytics system',
    'oil and gas analytics system',
    // Healthcare Projects
    'healthcare project',
    'medical project',
    'healthcare systems project',
    'medical systems project',
    'healthcare .net core project',
    'medical .net core project',
    'healthcare angular project',
    'medical angular project',
    'healthcare azure project',
    'medical azure project',
    'healthcare full stack project',
    'medical full stack project',
    'healthcare microservices project',
    'medical microservices project',
    'healthcare management system',
    'medical management system',
    'healthcare ehr system',
    'medical ehr system',
    'healthcare patient management',
    'medical patient management',
    'healthcare hospital system',
    'medical hospital system',
    'healthcare telemedicine system',
    'medical telemedicine system',
    // Financial Services Projects
    'fintech project',
    'banking project',
    'financial services project',
    'fintech .net core project',
    'banking .net core project',
    'financial services .net core project',
    'fintech angular project',
    'banking angular project',
    'financial services angular project',
    'fintech azure project',
    'banking azure project',
    'financial services azure project',
    'fintech full stack project',
    'banking full stack project',
    'financial services full stack project',
    'fintech payment system',
    'banking payment system',
    'financial services payment system',
    // Aviation Projects
    'aviation project',
    'aerospace project',
    'aviation .net core project',
    'aerospace .net core project',
    'aviation angular project',
    'aerospace angular project',
    'aviation azure project',
    'aerospace azure project',
    'aviation full stack project',
    'aerospace full stack project',
    'aviation booking system',
    'aerospace booking system',
    'aviation employee travel system',
    'aerospace employee travel system',
    'aviation discount system',
    'aerospace discount system',
    // E-commerce & Retail Projects
    'ecommerce project',
    'retail project',
    'ecommerce .net core project',
    'retail .net core project',
    'ecommerce angular project',
    'retail angular project',
    'ecommerce azure project',
    'retail azure project',
    'ecommerce full stack project',
    'retail full stack project',
    'ecommerce pos system',
    'retail pos system',
    'ecommerce inventory system',
    'retail inventory system',
    // Manufacturing Projects
    'manufacturing project',
    'industrial project',
    'manufacturing .net core project',
    'industrial .net core project',
    'manufacturing angular project',
    'industrial angular project',
    'manufacturing azure project',
    'industrial azure project',
    'manufacturing full stack project',
    'industrial full stack project',
    'manufacturing erp system',
    'industrial erp system',
    'manufacturing scada system',
    'industrial scada system'
  ]
  
  // PROJECT ACHIEVEMENT KEYWORDS
  const projectAchievementKeywords = [
    'successful project',
    'delivered project',
    'completed project',
    'deployed project',
    'production project',
    'award-winning project',
    'high-impact project',
    'high-value project',
    'strategic project',
    'critical project',
    'innovative project',
    'cutting-edge project',
    'modern project',
    'advanced project'
  ]
  
  const projectKeywords = dedupeKeywords(
    [projectData.title, enhancedTitle],
    techNames,
    technologyKeywords,
    getSkillExpertDeveloperKeywords(),
    nameBasedKeywords,
    misspellingKeywords,
    professionalStatLongTail,
    itServicesKeywords,
    technicalKeywords,
    projectIndustryKeywords,
    projectAchievementKeywords,
    [
      'Portfolio Project',
      'Enterprise Project',
      'Software Project',
      'Large Scale Project',
      'Huge Project',
      'Case Study',
      'Project Case Study',
      'Portfolio Case Study',
      fullName,
      'Software Engineer',
      'Technical Lead',
      'Remote Software Engineer',
      'Remote Consultant',
      'USA',
      'Europe',
      'Global'
    ],
    location ? [location] : []
  )
  
  return {
    title: `${enhancedTitle} - ${fullName} | ${experience}+ Years Experience`,
    description: `${projectData.description || projectData.title}. ${techDescription}. Built by ${fullName}, ${experience}+ years experienced ${hasDotNet ? '.NET consultant' : ''} ${hasMicroservices ? 'microservices architect' : ''} ${hasAPI ? 'API development expert' : ''} ${hasAzure ? 'Azure cloud consultant' : ''} specializing in enterprise solutions. Available for remote work in USA, Europe, and globally.`,
    keywords: projectKeywords,
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
  
  if (serviceName.includes('full stack') || serviceName.includes('fullstack')) {
    serviceTechnologyKeywords.push(
      '.net full stack developer',
      'full stack .net consultant',
      'full stack .net expert',
      'full stack .net developer',
      'vue.js full stack developer',
      'vue.js expert',
      'vue.js dev',
      'angular full stack developer',
      'angular expert',
      'angular developer',
      'angular dev',
      'react full stack developer',
      'react expert',
      'react developer',
      'react dev',
      'css expert',
      'css developer',
      'bootstrap expert',
      'bootstrap developer',
      'typescript expert',
      'typescript developer',
      '.net expert',
      '.net developer',
      '.net dev'
    )
  }
  if (serviceName.includes('azure') || serviceName.includes('cloud')) {
    serviceTechnologyKeywords.push(
      'azure cloud consultant',
      'azure cloud expert',
      'azure cloud developer',
      'azure architect consultant',
      'azure expert',
      'azure developer',
      'azure dev',
      'hire azure consultant',
      'azure migration consultant'
    )
  }
  if (serviceName.includes('microservices')) {
    serviceTechnologyKeywords.push(
      'microservices consultant',
      'microservices expert',
      'microservices developer',
      'microservices architect',
      'microservices dev',
      'hire microservices architect',
      'microservices .net core',
      'azure microservices expert',
      '.net expert',
      '.net developer'
    )
  }
  if (serviceName.includes('technical leadership') || serviceName.includes('leadership')) {
    serviceTechnologyKeywords.push(
      'technical lead consultant',
      'technical lead expert',
      'engineering manager consultant',
      'team lead consultant',
      'technical leadership expert',
      'tech lead expert',
      'engineering manager'
    )
  }
  if (serviceName.includes('agile') || serviceName.includes('scrum')) {
    serviceTechnologyKeywords.push(
      'agile expert',
      'scrum expert',
      'kanban expert',
      'agile consultant',
      'scrum master consultant'
    )
  }
  if (serviceName.includes('database') || serviceName.includes('optimization')) {
    serviceTechnologyKeywords.push(
      'database expert',
      'database developer',
      'database consultant',
      'sql expert',
      'sql developer',
      'sql server expert',
      'sql server developer',
      'entity framework expert',
      'entity framework developer'
    )
  }
  if (serviceName.includes('mobile')) {
    serviceTechnologyKeywords.push(
      'mobile expert',
      'mobile developer',
      'mobile dev',
      'react native expert',
      'react native developer',
      'flutter expert',
      'flutter developer',
      'xamarin expert',
      'xamarin developer',
      'ios developer',
      'android developer'
    )
  }
  
  // IT SERVICES KEYWORDS (for all service pages)
  const itServicesKeywords = [
    'IT services',
    'IT consulting services',
    'IT engineering services',
    'IT services consultant',
    'IT consultant',
    'IT services provider',
    'IT solutions',
    'IT services expert',
    `${serviceName} IT services`,
    `IT services ${serviceName}`,
    `IT consulting ${serviceName}`,
    `${serviceName} IT consultant`
  ]
  
  const misspellingKeywords = ['Waqas Ahmed', 'Waqas Ahmand']
  const professionalStatLongTail = [
    `software engineer with ${experience} years experience`,
    'experienced software engineer',
    'experienced IT professional',
    'experienced developer',
    `${experience}+ years experienced software engineer`,
    `senior software engineer with ${experience} years experience`,
    `technical lead with ${experience} years experience`
  ]

  const nameBasedKeywords = [
    `${fullName} ${serviceName}`,
    `Waqas ${serviceName}`,
    `Waqas UET ${serviceName}`,
    `Waqas IT ${serviceName}`,
    `${fullName} IT services`,
    'Waqas IT services',
    'Waqas UET IT services',
    'Waqas only',
    'Waqas Ahmad only',
    'Waqas Ahmad portfolio',
    'Waqas Ahmad Malaysia',
    'Waqas Ahmad Selangor',
    'Waqas Ahmad developer'
  ]
  
  // TECHNICAL & QUALITY KEYWORDS (for service pages)
  const technicalKeywords = [
    'reliable',
    'reliable services',
    'enterprise services',
    'enterprise-grade services',
    'enterprise-level services',
    'enterprise solution',
    'enterprise architecture',
    'system architecture',
    'software architecture',
    'scalable services',
    'scalable architecture',
    'scalable solution',
    'secure services',
    'enterprise security',
    'enterprise-grade security',
    'SSL',
    'SSL/TLS',
    'high availability',
    'high-availability services',
    'fault tolerance',
    'fault-tolerant',
    'mission critical',
    'mission-critical services',
    'zero downtime',
    'zero-downtime services',
    'real-time',
    'real-time services',
    'high-performance',
    'high-performance services',
    'distributed systems',
    'distributed architecture',
    'microservices architecture',
    'production-ready',
    'production-grade',
    'robust',
    'robust architecture',
    'resilient',
    'resilient architecture',
    'optimized',
    'performance-optimized',
    'cloud-native',
    'cloud-based services',
    'containerized',
    'container orchestration',
    'enterprise platform',
    'enterprise system',
    'large scale',
    'huge projects',
    'enterprise-scale'
  ]
  
  // SERVICE-SPECIFIC METHODOLOGY KEYWORDS
  const serviceMethodologyKeywords = [
    'agile services',
    'scrum services',
    'devops services',
    'ci/cd services',
    'tdd services',
    'test-driven development services',
    'code review services',
    'technical review services',
    'architecture review services',
    'performance review services',
    'security audit services',
    'code audit services',
    'technical audit services'
  ]
  
  // SERVICE DELIVERY KEYWORDS
  const serviceDeliveryKeywords = [
    'consulting services',
    'development services',
    'implementation services',
    'integration services',
    'migration services',
    'modernization services',
    'optimization services',
    'refactoring services',
    'maintenance services',
    'support services',
    'training services',
    'mentoring services',
    'coaching services',
    'advisory services',
    'strategic consulting',
    'technical consulting',
    'architecture consulting',
    'solution consulting'
  ]
  
  // ---- SERVICE-FOCUSED SEO: engagement, client, outcome, use-case, intent, geo, timeline, quality ----
  
  // ENGAGEMENT TYPES (how clients hire)
  const engagementKeywords = [
    'freelance services',
    'contract services',
    'contractor',
    'consulting engagement',
    'project-based engagement',
    'retainer engagement',
    'hourly engagement',
    'fixed-price project',
    'staff augmentation',
    'dedicated developer',
    'dedicated team',
    'part-time consultant',
    'full-time consultant',
    'remote contractor',
    'remote freelancer',
    'remote consultant',
    'outsource developer',
    'outsource development',
    'offshore developer',
    'nearshore developer',
    'remote development team',
    'distributed team',
    'extended team',
    'flexible engagement',
    'short-term contract',
    'long-term contract',
    'ongoing support',
    'project-based work',
    'sprint-based engagement',
    'agile engagement'
  ]
  
  // CLIENT TYPES (who buys services)
  const clientTypeKeywords = [
    'startup developer',
    'startup consultant',
    'startup services',
    'smb software',
    'smb development',
    'mid-market developer',
    'mid-market consultant',
    'enterprise developer',
    'enterprise consultant',
    'enterprise services',
    'fortune 500 developer',
    'fortune 500 consultant',
    'fortune 500 services',
    'government contractor',
    'government developer',
    'public sector developer',
    'nonprofit developer',
    'agency partner',
    'software agency',
    'product company',
    'saas company',
    'b2b software',
    'b2c software',
    'internal tools',
    'customer-facing applications'
  ]
  
  // OUTCOMES & DELIVERABLES (what clients get)
  const outcomeKeywords = [
    'custom software development',
    'custom application development',
    'custom web application',
    'custom mobile application',
    'custom api development',
    'custom integration',
    'bespoke software',
    'bespoke development',
    'web application development',
    'web app development',
    'mobile app development',
    'api development',
    'api integration',
    'system integration',
    'cloud migration',
    'application migration',
    'legacy modernization',
    'legacy system modernization',
    'system modernization',
    'performance optimization',
    'database optimization',
    'architecture design',
    'architecture implementation',
    'technical assessment',
    'technical audit',
    'code audit',
    'security audit',
    'architecture review',
    'technical due diligence',
    'proof of concept',
    'mvp development',
    'product development',
    'feature development',
    'maintenance and support',
    'ongoing maintenance'
  ]
  
  // USE CASES & INTENT (why they search)
  const useCaseKeywords = [
    'build from scratch',
    'build new application',
    'build new system',
    'greenfield project',
    'brownfield project',
    'modernize legacy',
    'replace legacy system',
    'migrate to cloud',
    'scale existing system',
    'add new features',
    'extend existing application',
    'integrate systems',
    'connect applications',
    'automate processes',
    'improve performance',
    'reduce costs',
    'reduce technical debt',
    'accelerate delivery',
    'ship faster',
    'reduce time to market',
    'improve reliability',
    'improve security',
    'compliance requirements',
    'digital transformation',
    'digitalization'
  ]
  
  // HIRING INTENT & PAIN POINTS
  const intentKeywords = [
    'hire developer',
    'hire consultant',
    'hire expert',
    'hire specialist',
    'hire architect',
    'looking for developer',
    'looking for consultant',
    'looking for expert',
    'need developer',
    'need consultant',
    'need expert',
    'need specialist',
    'need architect',
    'find developer',
    'find consultant',
    'find expert',
    'experienced developer',
    'senior developer',
    'lead developer',
    'principal developer',
    'expert developer',
    'vetted developer',
    'qualified developer',
    'reliable developer',
    'trusted consultant',
    'proven expert',
    'top-rated developer',
    'best developer',
    'recommended consultant'
  ]
  
  // GEOGRAPHIC (service-focused)
  const geoKeywords = [
    'usa developer',
    'usa consultant',
    'usa services',
    'us-based developer',
    'us-based consultant',
    'uk developer',
    'uk consultant',
    'uk services',
    'europe developer',
    'europe consultant',
    'europe services',
    'germany developer',
    'germany consultant',
    'netherlands developer',
    'netherlands consultant',
    'canada developer',
    'canada consultant',
    'australia developer',
    'australia consultant',
    'global developer',
    'global consultant',
    'international developer',
    'international consultant',
    'worldwide services',
    'remote usa',
    'remote uk',
    'remote europe',
    'remote global',
    'timezone overlap',
    'est pst gmt cet',
    'flexible timezone'
  ]
  
  // TIMELINE & DELIVERY
  const timelineKeywords = [
    'quick turnaround',
    'fast delivery',
    'agile delivery',
    'sprint-based delivery',
    'iterative delivery',
    'fixed timeline',
    'fixed scope',
    'flexible scope',
    'phased delivery',
    'milestone-based',
    'continuous delivery',
    'ongoing engagement',
    'immediate availability',
    'available now',
    'start immediately'
  ]
  
  // QUALITY & TRUST
  const qualityKeywords = [
    'reliable developer',
    'reliable consultant',
    'reliable services',
    'proven track record',
    'proven experience',
    'experience proven',
    'vetted professional',
    'qualified professional',
    'certified expertise',
    'industry experience',
    'fortune 500 experience',
    'enterprise experience',
    'mission-critical experience',
    'production experience',
    'hands-on experience',
    'practical experience',
    'real-world experience',
    'client references',
    'portfolio',
    'case studies',
    'success stories'
  ]
  
  // SERVICE-SPECIFIC ASPECTS (generic aspects that apply to most services)
  const serviceAspectKeywords = [
    'end-to-end',
    'full-cycle',
    'turnkey',
    'white-label',
    'custom solutions',
    'tailored solutions',
    'scalable solutions',
    'secure solutions',
    'compliant solutions',
    'documented',
    'tested',
    'maintainable',
    'extensible',
    'best practices',
    'industry standards',
    'clean code',
    'code quality',
    'performance',
    'reliability',
    'availability',
    'monitoring',
    'observability',
    'documentation',
    'knowledge transfer',
    'handover'
  ]
  
  // SERVICE-SPECIFIC ASPECTS (per service type — detailed, deduplicated via dedupeKeywords)
  const serviceSpecificAspectKeywords = []
  if (serviceName.includes('full stack') || serviceName.includes('fullstack')) {
    serviceSpecificAspectKeywords.push(
      'frontend development',
      'backend development',
      'full stack development',
      'web development',
      'single-page application',
      'spa development',
      'responsive web',
      'progressive web app',
      'pwa development',
      'vue.js development',
      'angular development',
      'react development',
      '.net core backend',
      'asp.net core api',
      'entity framework',
      'database design',
      'api design',
      'rest api',
      'graphql',
      'real-time features',
      'state management',
      'authentication authorization',
      'ci/cd pipeline',
      'deployment',
      'hosting'
    )
  }
  if (serviceName.includes('azure') || serviceName.includes('cloud')) {
    serviceSpecificAspectKeywords.push(
      'cloud architecture',
      'cloud migration',
      'azure migration',
      'cloud design',
      'azure design',
      'infrastructure as code',
      'arm templates',
      'terraform',
      'azure devops',
      'azure pipelines',
      'azure app service',
      'azure functions',
      'azure service fabric',
      'azure sql',
      'azure cosmos db',
      'azure key vault',
      'azure ad',
      'azure monitor',
      'azure api management',
      'disaster recovery',
      'high availability',
      'cost optimization',
      'security hardening'
    )
  }
  if (serviceName.includes('microservices')) {
    serviceSpecificAspectKeywords.push(
      'microservices design',
      'service decomposition',
      'domain-driven design',
      'service boundaries',
      'api gateway',
      'service mesh',
      'event-driven',
      'message queues',
      'distributed tracing',
      'circuit breaker',
      'containerization',
      'docker',
      'kubernetes',
      'azure service fabric',
      'resilience',
      'fault tolerance',
      'independent deployment',
      'scalability'
    )
  }
  if (serviceName.includes('technical leadership') || serviceName.includes('leadership')) {
    serviceSpecificAspectKeywords.push(
      'team leadership',
      'technical lead',
      'engineering manager',
      'team lead',
      'sprint planning',
      'retrospectives',
      'standups',
      'code reviews',
      'architecture decisions',
      'technology selection',
      'mentoring',
      'coaching',
      'best practices',
      'process improvement',
      'stakeholder communication',
      'technical strategy',
      'roadmap'
    )
  }
  if (serviceName.includes('agile') || serviceName.includes('project management')) {
    serviceSpecificAspectKeywords.push(
      'scrum',
      'kanban',
      'sprint planning',
      'backlog grooming',
      'retrospectives',
      'ceremonies',
      'velocity',
      'story points',
      'user stories',
      'acceptance criteria',
      'daily standup',
      'stakeholder management',
      'risk management',
      'timeline management',
      'quality assurance'
    )
  }
  if (serviceName.includes('database') || serviceName.includes('optimization')) {
    serviceSpecificAspectKeywords.push(
      'schema design',
      'normalization',
      'indexing',
      'query optimization',
      'execution plans',
      'stored procedures',
      'entity framework optimization',
      'n+1 queries',
      'connection pooling',
      'data migration',
      'archiving',
      'partitioning',
      'performance tuning',
      'bottleneck analysis'
    )
  }
  if (serviceName.includes('mobile')) {
    serviceSpecificAspectKeywords.push(
      'ios development',
      'android development',
      'react native',
      'flutter',
      'xamarin',
      'swift',
      'kotlin',
      'mobile api',
      'push notifications',
      'offline support',
      'app store',
      'play store',
      'cross-platform',
      'native performance'
    )
  }
  
  // SERVICE-SPECIFIC INDUSTRY KEYWORDS (for service pages)
  const serviceIndustryKeywords = [
    // Petroleum & Oil & Gas Services
    `petroleum ${serviceName}`,
    `oil and gas ${serviceName}`,
    `petroleum ${serviceName} services`,
    `oil and gas ${serviceName} services`,
    `petroleum .net core ${serviceName}`,
    `oil and gas .net core ${serviceName}`,
    `petroleum angular ${serviceName}`,
    `oil and gas angular ${serviceName}`,
    `petroleum azure ${serviceName}`,
    `oil and gas azure ${serviceName}`,
    `petroleum full stack ${serviceName}`,
    `oil and gas full stack ${serviceName}`,
    `petroleum microservices ${serviceName}`,
    `oil and gas microservices ${serviceName}`,
    `petroleum systems ${serviceName}`,
    `oil and gas systems ${serviceName}`,
    `petroleum software ${serviceName}`,
    `oil and gas software ${serviceName}`,
    `petroleum enterprise ${serviceName}`,
    `oil and gas enterprise ${serviceName}`,
    `petroleum heat exchanger ${serviceName}`,
    `oil and gas heat exchanger ${serviceName}`,
    `petroleum refinery ${serviceName}`,
    `oil and gas refinery ${serviceName}`,
    `petroleum maintenance ${serviceName}`,
    `oil and gas maintenance ${serviceName}`,
    `petroleum monitoring ${serviceName}`,
    `oil and gas monitoring ${serviceName}`,
    `petroleum analytics ${serviceName}`,
    `oil and gas analytics ${serviceName}`,
    `petroleum iot ${serviceName}`,
    `oil and gas iot ${serviceName}`,
    `petroleum real-time ${serviceName}`,
    `oil and gas real-time ${serviceName}`,
    `petroleum mission critical ${serviceName}`,
    `oil and gas mission critical ${serviceName}`,
    
    // Healthcare & Medical Services
    `healthcare ${serviceName}`,
    `medical ${serviceName}`,
    `healthcare ${serviceName} services`,
    `medical ${serviceName} services`,
    `healthcare .net core ${serviceName}`,
    `medical .net core ${serviceName}`,
    `healthcare angular ${serviceName}`,
    `medical angular ${serviceName}`,
    `healthcare azure ${serviceName}`,
    `medical azure ${serviceName}`,
    `healthcare full stack ${serviceName}`,
    `medical full stack ${serviceName}`,
    `healthcare microservices ${serviceName}`,
    `medical microservices ${serviceName}`,
    `healthcare systems ${serviceName}`,
    `medical systems ${serviceName}`,
    `healthcare software ${serviceName}`,
    `medical software ${serviceName}`,
    `healthcare enterprise ${serviceName}`,
    `medical enterprise ${serviceName}`,
    `healthcare ehr ${serviceName}`,
    `medical ehr ${serviceName}`,
    `healthcare patient management ${serviceName}`,
    `medical patient management ${serviceName}`,
    `healthcare hospital ${serviceName}`,
    `medical hospital ${serviceName}`,
    `healthcare telemedicine ${serviceName}`,
    `medical telemedicine ${serviceName}`,
    `healthcare hipaa ${serviceName}`,
    `medical hipaa ${serviceName}`,
    `healthcare compliance ${serviceName}`,
    `medical compliance ${serviceName}`,
    `healthcare data security ${serviceName}`,
    `medical data security ${serviceName}`,
    `healthcare real-time ${serviceName}`,
    `medical real-time ${serviceName}`,
    `healthcare iot ${serviceName}`,
    `medical iot ${serviceName}`,
    
    // Financial Services & Banking Services
    `fintech ${serviceName}`,
    `banking ${serviceName}`,
    `financial services ${serviceName}`,
    `fintech ${serviceName} services`,
    `banking ${serviceName} services`,
    `financial services ${serviceName} services`,
    `fintech .net core ${serviceName}`,
    `banking .net core ${serviceName}`,
    `financial services .net core ${serviceName}`,
    `fintech angular ${serviceName}`,
    `banking angular ${serviceName}`,
    `financial services angular ${serviceName}`,
    `fintech azure ${serviceName}`,
    `banking azure ${serviceName}`,
    `financial services azure ${serviceName}`,
    `fintech full stack ${serviceName}`,
    `banking full stack ${serviceName}`,
    `financial services full stack ${serviceName}`,
    `fintech microservices ${serviceName}`,
    `banking microservices ${serviceName}`,
    `financial services microservices ${serviceName}`,
    `fintech payment ${serviceName}`,
    `banking payment ${serviceName}`,
    `financial services payment ${serviceName}`,
    `fintech trading ${serviceName}`,
    `banking trading ${serviceName}`,
    `financial services trading ${serviceName}`,
    `fintech risk management ${serviceName}`,
    `banking risk management ${serviceName}`,
    `financial services risk management ${serviceName}`,
    `fintech compliance ${serviceName}`,
    `banking compliance ${serviceName}`,
    `financial services compliance ${serviceName}`,
    `fintech security ${serviceName}`,
    `banking security ${serviceName}`,
    `financial services security ${serviceName}`,
    `fintech real-time ${serviceName}`,
    `banking real-time ${serviceName}`,
    `financial services real-time ${serviceName}`,
    
    // Aviation Services
    `aviation ${serviceName}`,
    `aerospace ${serviceName}`,
    `aviation ${serviceName} services`,
    `aerospace ${serviceName} services`,
    `aviation .net core ${serviceName}`,
    `aerospace .net core ${serviceName}`,
    `aviation angular ${serviceName}`,
    `aerospace angular ${serviceName}`,
    `aviation azure ${serviceName}`,
    `aerospace azure ${serviceName}`,
    `aviation full stack ${serviceName}`,
    `aerospace full stack ${serviceName}`,
    `aviation microservices ${serviceName}`,
    `aerospace microservices ${serviceName}`,
    `aviation booking ${serviceName}`,
    `aerospace booking ${serviceName}`,
    `aviation employee travel ${serviceName}`,
    `aerospace employee travel ${serviceName}`,
    `aviation discount ${serviceName}`,
    `aerospace discount ${serviceName}`,
    `aviation real-time ${serviceName}`,
    `aerospace real-time ${serviceName}`,
    
    // E-commerce & Retail Services
    `ecommerce ${serviceName}`,
    `retail ${serviceName}`,
    `ecommerce ${serviceName} services`,
    `retail ${serviceName} services`,
    `ecommerce .net core ${serviceName}`,
    `retail .net core ${serviceName}`,
    `ecommerce angular ${serviceName}`,
    `retail angular ${serviceName}`,
    `ecommerce azure ${serviceName}`,
    `retail azure ${serviceName}`,
    `ecommerce full stack ${serviceName}`,
    `retail full stack ${serviceName}`,
    `ecommerce microservices ${serviceName}`,
    `retail microservices ${serviceName}`,
    `ecommerce pos ${serviceName}`,
    `retail pos ${serviceName}`,
    `ecommerce inventory ${serviceName}`,
    `retail inventory ${serviceName}`,
    `ecommerce order management ${serviceName}`,
    `retail order management ${serviceName}`,
    `ecommerce payment ${serviceName}`,
    `retail payment ${serviceName}`,
    `ecommerce real-time ${serviceName}`,
    `retail real-time ${serviceName}`,
    
    // Manufacturing Services
    `manufacturing ${serviceName}`,
    `industrial ${serviceName}`,
    `manufacturing ${serviceName} services`,
    `industrial ${serviceName} services`,
    `manufacturing .net core ${serviceName}`,
    `industrial .net core ${serviceName}`,
    `manufacturing angular ${serviceName}`,
    `industrial angular ${serviceName}`,
    `manufacturing azure ${serviceName}`,
    `industrial azure ${serviceName}`,
    `manufacturing full stack ${serviceName}`,
    `industrial full stack ${serviceName}`,
    `manufacturing microservices ${serviceName}`,
    `industrial microservices ${serviceName}`,
    `manufacturing erp ${serviceName}`,
    `industrial erp ${serviceName}`,
    `manufacturing scada ${serviceName}`,
    `industrial scada ${serviceName}`,
    `manufacturing iot ${serviceName}`,
    `industrial iot ${serviceName}`,
    `manufacturing real-time ${serviceName}`,
    `industrial real-time ${serviceName}`
  ]
  
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
  
  // Service-prefixed/suffixed long-tail (engagement + outcome style)
  const serviceLongTailKeywords = [
    `${serviceName} freelance`,
    `${serviceName} contract`,
    `freelance ${serviceName}`,
    `contract ${serviceName}`,
    `${serviceName} consultant`,
    `${serviceName} expert`,
    `expert ${serviceName}`,
    `${serviceName} specialist`,
    `${serviceName} services usa`,
    `${serviceName} services uk`,
    `${serviceName} services europe`,
    `${serviceName} remote`,
    `remote ${serviceName} usa`,
    `remote ${serviceName} europe`,
    `hire ${serviceName} expert`,
    `hire ${serviceName} consultant`,
    `looking for ${serviceName} expert`
  ]

  // QUESTION-BASED SEO (per-service): "best provider", "who provides", "how to choose" for this service
  const serviceQuestionBasedKeywords = [
    `best ${serviceName} provider for small businesses`,
    `who provides ${serviceName} services`,
    `who offers ${serviceName} for .NET`,
    `how to choose a ${serviceName} consultant`,
    `who can provide ${serviceName} remotely`,
    `best ${serviceName} consultant for startups`,
    `who provides ${serviceName} USA`,
    `who provides ${serviceName} Europe`
  ]
  
  // Service-specific keywords from router/page (e.g. SERVICE_DATA_MAP)
  const extraKeywords = Array.isArray(serviceData.keywords) ? serviceData.keywords : []
  
  // Combine all service-focused keywords then deduplicate (single source of truth)
  const serviceKeywords = dedupeKeywords(
    baseKeywords,
    itServicesKeywords,
    nameBasedKeywords,
    misspellingKeywords,
    professionalStatLongTail,
    getSkillExpertDeveloperKeywords(),
    technicalKeywords,
    serviceMethodologyKeywords,
    serviceDeliveryKeywords,
    engagementKeywords,
    clientTypeKeywords,
    outcomeKeywords,
    useCaseKeywords,
    intentKeywords,
    geoKeywords,
    timelineKeywords,
    qualityKeywords,
    serviceAspectKeywords,
    serviceSpecificAspectKeywords,
    serviceLongTailKeywords,
    serviceQuestionBasedKeywords,
    serviceIndustryKeywords,
    platformKeywords,
    remoteKeywords,
    usaKeywords,
    europeKeywords,
    globalKeywords,
    extraKeywords,
    location ? [location] : []
  )
  
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
