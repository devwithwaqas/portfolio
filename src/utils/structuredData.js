/**
 * Structured Data (JSON-LD) Generator
 * Creates schema.org markup for better SEO and rich snippets
 */

import { APP_CONFIG } from '../config/constants.js'

const BASE_URL = import.meta.env.BASE_URL || '/'
const SITE_URL = 'https://devwithwaqas.github.io' + (BASE_URL === '/' ? '' : BASE_URL)

/**
 * Inject JSON-LD script into document head
 */
export function injectStructuredData(data) {
  // Remove existing script if updating
  const existing = document.getElementById('structured-data')
  if (existing) {
    existing.remove()
  }
  
  const script = document.createElement('script')
  script.id = 'structured-data'
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data, null, 2)
  document.head.appendChild(script)
}

/**
 * Generate Person schema (for home page)
 */
export function generatePersonSchema() {
  const fullName = APP_CONFIG.fullName
  const email = APP_CONFIG.email
  const phone = APP_CONFIG.phone
  const location = APP_CONFIG.location
  const website = APP_CONFIG.contactLinks.website || SITE_URL
  const linkedin = APP_CONFIG.contactLinks.linkedin
  const github = APP_CONFIG.contactLinks.github
  
  // Skills from resume/experience
  const skills = [
    '.NET Core',
    'Azure Cloud',
    'Microservices Architecture',
    'CI/CD',
    'Vue.js',
    'Angular',
    'SQL Server',
    'Cosmos DB',
    'Azure Service Fabric',
    'API Gateway',
    'Enterprise Architecture',
    'Full Stack Development',
    'DevOps',
    'Docker',
    'Kubernetes',
    'RESTful APIs',
    'GraphQL',
    'TypeScript',
    'JavaScript',
    'C#',
    'ASP.NET',
    'Entity Framework',
    'Azure Functions',
    'Azure App Services',
    'Azure Key Vault',
    'Azure App Insights'
  ]
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}#person`,
    name: fullName,
    jobTitle: [
      'Senior Software Engineer',
      'Technical Lead',
      'Lead Software Engineer',
      'Azure Cloud Architect',
      'Full Stack Developer',
      'Technical Consultant'
    ],
    description: `Senior Software Engineer & Technical Lead with ${APP_CONFIG.stats.yearsExperience}+ years of experience in .NET, Azure Cloud, and enterprise architecture. Specializing in full-stack development, microservices, and cloud solutions.`,
    url: website,
    image: `${SITE_URL}assets/img/profile-img.jpg`,
    email: email,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.split(',')[0] || location,
      addressRegion: location.includes('Selangor') ? 'Selangor' : '',
      addressCountry: 'MY'
    },
    sameAs: [
      linkedin,
      github,
      website
    ].filter(Boolean),
    knowsAbout: skills,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of Engineering and Technology, Lahore',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lahore',
        addressCountry: 'PK'
      }
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        educationalLevel: 'Bachelor\'s Degree',
        name: 'Bachelor of Computer System Engineering (Honors)'
      }
    ],
    award: [
      'National Speed Programming Champion - ACM All Pakistan Speed Programming Competition 2010',
      'HR IT Expert Award - Guinness World Records Pakistan - Punjab Youth Festival 2013'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Independent Consultant',
      jobTitle: 'Lead Software Engineer & Technical Consultant'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Global'
    }
  }
}

/**
 * Generate ProfessionalService schema
 */
export function generateProfessionalServiceSchema() {
  const fullName = APP_CONFIG.fullName
  const location = APP_CONFIG.location
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}#service`,
    name: `${fullName} - Software Engineering Services`,
    description: `Professional software engineering and technical consulting services. Specializing in Azure Cloud architecture, .NET development, microservices, and enterprise solutions.`,
    provider: {
      '@type': 'Person',
      name: fullName,
      jobTitle: 'Senior Software Engineer & Technical Lead'
    },
    areaServed: {
      '@type': 'Country',
      name: ['Malaysia', 'Global']
    },
    serviceType: [
      'Software Development',
      'Cloud Architecture',
      'Technical Consulting',
      'Full Stack Development',
      'DevOps Consulting',
      'Enterprise Solutions',
      'Microservices Architecture',
      'CI/CD Implementation'
    ],
    offers: {
      '@type': 'Offer',
      availabilityStarts: '2022-01-01',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'USD',
        valueAddedTaxIncluded: true
      }
    }
  }
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  const fullName = APP_CONFIG.fullName
  const website = APP_CONFIG.contactLinks.website || SITE_URL
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: `${fullName} - Software Engineering Services`,
    url: website,
    logo: `${SITE_URL}assets/img/profile-img.jpg`,
    founder: {
      '@type': 'Person',
      name: fullName
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Professional Services',
      email: APP_CONFIG.email,
      telephone: APP_CONFIG.phone,
      areaServed: 'Global',
      availableLanguage: ['English']
    },
    sameAs: [
      APP_CONFIG.contactLinks.linkedin,
      APP_CONFIG.contactLinks.github,
      website
    ].filter(Boolean)
  }
}

/**
 * Generate BreadcrumbList schema
 */
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

/**
 * Generate Article schema (for project pages)
 */
export function generateArticleSchema(articleData) {
  const fullName = APP_CONFIG.fullName
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}${articleData.url}`,
    headline: articleData.title,
    description: articleData.description,
    image: articleData.image || `${SITE_URL}assets/img/profile-img.jpg`,
    datePublished: articleData.datePublished || new Date().toISOString(),
    dateModified: articleData.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: fullName,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: `${fullName} - Portfolio`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}assets/img/profile-img.jpg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${articleData.url}`
    }
  }
}

/**
 * Generate SoftwareApplication schema (for project pages)
 */
export function generateSoftwareApplicationSchema(projectData) {
  const fullName = APP_CONFIG.fullName
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}${projectData.url}`,
    name: projectData.title,
    description: projectData.description,
    applicationCategory: 'Enterprise Application',
    operatingSystem: 'Web, Cloud',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    creator: {
      '@type': 'Person',
      name: fullName
    },
    screenshot: projectData.images || [`${SITE_URL}assets/img/profile-img.jpg`],
    softwareVersion: projectData.version || '1.0',
    datePublished: projectData.datePublished || new Date().toISOString()
  }
}

/**
 * Generate all structured data for home page
 */
export function generateHomePageStructuredData() {
  const person = generatePersonSchema()
  const service = generateProfessionalServiceSchema()
  const organization = generateOrganizationSchema()
  
  // Inject all schemas
  injectStructuredData([person, service, organization])
}

/**
 * Generate structured data for project page
 */
export function generateProjectPageStructuredData(projectData) {
  const article = generateArticleSchema(projectData)
  const software = generateSoftwareApplicationSchema(projectData)
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Portfolio', url: `${SITE_URL}#portfolio` },
    { name: projectData.title, url: `${SITE_URL}${projectData.url}` }
  ])
  
  injectStructuredData([article, software, breadcrumbs])
}

export default {
  injectStructuredData,
  generatePersonSchema,
  generateProfessionalServiceSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateSoftwareApplicationSchema,
  generateHomePageStructuredData,
  generateProjectPageStructuredData
}
