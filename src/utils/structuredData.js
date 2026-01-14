/**
 * Structured Data (JSON-LD) Generator
 * Creates schema.org markup for better SEO and rich snippets
 */

import { APP_CONFIG } from '../config/constants.js'

const BASE_URL = import.meta.env.BASE_URL || '/portfolio/'
// Ensure SITE_URL always includes /portfolio/ for GitHub Pages
const SITE_URL = 'https://devwithwaqas.github.io/portfolio/'

/**
 * Inject JSON-LD script into document head
 * Supports both single schema objects and arrays of schemas
 * For arrays, creates separate script tags for better Google detection
 */
export function injectStructuredData(data) {
  // If data is an array, inject each schema separately
  if (Array.isArray(data)) {
    // Remove all existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach(script => {
      // Only remove our structured data scripts (not other JSON-LD that might exist)
      if (script.id && script.id.startsWith('structured-data')) {
        script.remove()
      }
    })
    
    // Inject each schema as a separate script tag
    data.forEach((schema, index) => {
      const script = document.createElement('script')
      script.id = `structured-data-${index}`
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(schema, null, 2)
      document.head.appendChild(script)
    })
  } else {
    // Single schema - remove existing and add new
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
  
  // Skills from resume/experience - Enhanced for SEO
  const skills = [
    // Core Technologies
    '.NET Core',
    '.NET Framework',
    'C#',
    'ASP.NET',
    'ASP.NET Core',
    'Entity Framework',
    'Entity Framework Core',
    // Cloud & Azure
    'Azure Cloud',
    'Azure Service Fabric',
    'Azure Functions',
    'Azure App Services',
    'Azure Key Vault',
    'Azure App Insights',
    'Azure API Gateway',
    'Azure DevOps',
    'Azure Cosmos DB',
    // Architecture & Patterns
    'Microservices Architecture',
    'Microservices',
    'Distributed Systems',
    'Enterprise Architecture',
    'System Architecture',
    'Software Architecture',
    'API Architecture',
    'RESTful APIs',
    'REST API',
    'API Development',
    'API Design',
    'API Gateway',
    // Frontend
    'Vue.js',
    'Angular',
    'TypeScript',
    'JavaScript',
    'React',
    // Database
    'SQL Server',
    'Cosmos DB',
    'Database Design',
    'Database Optimization',
    // DevOps & CI/CD
    'CI/CD',
    'DevOps',
    'Docker',
    'Kubernetes',
    'Continuous Integration',
    'Continuous Deployment',
    // Full Stack
    'Full Stack Development',
    'Full Stack',
    // Other
    'GraphQL',
    'SignalR',
    'Swagger',
    'API Documentation'
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
      'Technical Consultant',
      '.NET Consultant',
      '.NET Expert',
      'Microservices Architect',
      'API Development Expert',
      'Enterprise Architect',
      'DevOps Consultant'
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
    areaServed: [
      {
        '@type': 'Country',
        name: 'United States'
      },
      {
        '@type': 'Country',
        name: 'United Kingdom'
      },
      {
        '@type': 'Country',
        name: 'Germany'
      },
      {
        '@type': 'Country',
        name: 'Netherlands'
      },
      {
        '@type': 'Country',
        name: 'Switzerland'
      },
      {
        '@type': 'Country',
        name: 'Global'
      }
    ],
    availableLanguage: ['English'],
    workLocation: {
      '@type': 'Place',
      name: 'Remote',
      description: 'Available for remote work globally. Flexible timezone (EST, PST, GMT, CET)'
    }
  }
}

/**
 * Generate ProfessionalService schema
 */
export function generateProfessionalServiceSchema() {
  const fullName = APP_CONFIG.fullName
  const location = APP_CONFIG.location
  const phone = APP_CONFIG.phone
  const email = APP_CONFIG.email
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}#service`,
    name: `${fullName} - Software Engineering Services`,
    description: `Professional software engineering and technical consulting services. Specializing in Azure Cloud architecture, .NET development, microservices, and enterprise solutions.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.split(',')[0] || location,
      addressRegion: location.includes('Selangor') ? 'Selangor' : '',
      addressCountry: 'MY'
    },
    telephone: phone || undefined,
    email: email || undefined,
    provider: {
      '@type': 'Person',
      name: fullName,
      jobTitle: 'Senior Software Engineer & Technical Lead',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.split(',')[0] || location,
        addressRegion: location.includes('Selangor') ? 'Selangor' : '',
        addressCountry: 'MY'
      }
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'United States'
      },
      {
        '@type': 'Country',
        name: 'United Kingdom'
      },
      {
        '@type': 'Country',
        name: 'Germany'
      },
      {
        '@type': 'Country',
        name: 'Netherlands'
      },
      {
        '@type': 'Country',
        name: 'Switzerland'
      },
      {
        '@type': 'Country',
        name: 'Global'
      }
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'Remote',
      availableLanguage: ['English']
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
  
  // Ensure image is an array (required by Schema.org)
  const images = articleData.image 
    ? (Array.isArray(articleData.image) ? articleData.image : [articleData.image])
    : [`${SITE_URL}assets/img/profile-img.jpg`]
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}${articleData.url}`,
    headline: articleData.title,
    description: articleData.description,
    image: images,
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
  
  // Ensure screenshot is an array (required by Schema.org)
  const screenshots = projectData.images 
    ? (Array.isArray(projectData.images) ? projectData.images : [projectData.images])
    : [`${SITE_URL}assets/img/profile-img.jpg`]
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}${projectData.url}`,
    name: projectData.title,
    description: projectData.description,
    applicationCategory: 'EnterpriseApplication',
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
    screenshot: screenshots,
    softwareVersion: projectData.version || '1.0',
    datePublished: projectData.datePublished || new Date().toISOString()
  }
}

/**
 * Generate all structured data for home page
 * @param {Array} testimonials - Optional array of testimonial objects with name, title, text
 */
export function generateHomePageStructuredData(testimonials = []) {
  const person = generatePersonSchema()
  
  // Generate service schema with reviews if testimonials provided
  let service
  if (testimonials && testimonials.length > 0) {
    service = generateProfessionalServiceSchemaWithReviews(testimonials)
  } else {
    service = generateProfessionalServiceSchema()
  }
  
  const organization = generateOrganizationSchema()
  
  // Inject all schemas
  injectStructuredData([person, service, organization])
}

/**
 * Generate FAQPage schema
 */
export function generateFAQPageSchema(faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
}

/**
 * Generate Review schema for testimonials
 * Creates individual Review objects and AggregateRating
 */
export function generateReviewSchema(testimonials) {
  const fullName = APP_CONFIG.fullName
  
  // Filter testimonials that have text (some might be empty)
  const validTestimonials = testimonials.filter(t => t.text && t.text.trim())
  
  // All testimonials are 5 stars (as shown in UI)
  const ratingValue = 5
  const bestRating = 5
  const worstRating = 1
  
  // Generate individual reviews
  const reviews = validTestimonials.map(testimonial => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.name,
      jobTitle: testimonial.title || undefined
    },
    reviewBody: testimonial.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: ratingValue,
      bestRating: bestRating,
      worstRating: worstRating
    },
    datePublished: new Date().toISOString().split('T')[0] // Use current date as fallback
  }))
  
  // Generate AggregateRating
  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: ratingValue.toString(),
    bestRating: bestRating.toString(),
    worstRating: worstRating.toString(),
    ratingCount: validTestimonials.length.toString()
  }
  
  return {
    reviews: reviews,
    aggregateRating: aggregateRating
  }
}

/**
 * Generate ProfessionalService schema with reviews
 * Enhanced version that includes review data
 */
export function generateProfessionalServiceSchemaWithReviews(testimonials) {
  const serviceSchema = generateProfessionalServiceSchema()
  const reviewData = generateReviewSchema(testimonials)
  
  // Add reviews and aggregateRating to the service schema
  return {
    ...serviceSchema,
    review: reviewData.reviews,
    aggregateRating: reviewData.aggregateRating
  }
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(serviceData) {
  const fullName = APP_CONFIG.fullName
  const location = APP_CONFIG.location
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${serviceData.url}`,
    name: serviceData.title,
    description: serviceData.description,
    provider: {
      '@type': 'Person',
      name: fullName,
      jobTitle: 'Senior Software Engineer & Technical Lead',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.split(',')[0] || location,
        addressRegion: location.includes('Selangor') ? 'Selangor' : '',
        addressCountry: 'MY'
      }
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'United States'
      },
      {
        '@type': 'Country',
        name: 'United Kingdom'
      },
      {
        '@type': 'Country',
        name: 'Germany'
      },
      {
        '@type': 'Country',
        name: 'Netherlands'
      },
      {
        '@type': 'Country',
        name: 'Switzerland'
      },
      {
        '@type': 'Country',
        name: 'Global'
      }
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'Remote',
      availableLanguage: ['English']
    },
    serviceType: serviceData.serviceType || serviceData.title,
    offers: {
      '@type': 'Offer',
      availabilityStarts: '2022-01-01',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'USD'
      }
    }
  }
}

/**
 * Generate Offer schema (for availability)
 */
export function generateOfferSchema() {
  const fullName = APP_CONFIG.fullName
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: `${fullName} - Software Engineering Services`,
    description: 'Available for hire as Senior Software Engineer, Technical Lead, or Technical Consultant. Specializing in Azure Cloud, .NET, microservices, and enterprise solutions.',
    seller: {
      '@type': 'Person',
      name: fullName
    },
    availability: 'https://schema.org/InStock',
    priceCurrency: 'USD',
    eligibleRegion: [
      {
        '@type': 'Country',
        name: 'United States'
      },
      {
        '@type': 'Country',
        name: 'United Kingdom'
      },
      {
        '@type': 'Country',
        name: 'Germany'
      },
      {
        '@type': 'Country',
        name: 'Netherlands'
      },
      {
        '@type': 'Country',
        name: 'Switzerland'
      },
      {
        '@type': 'Country',
        name: 'Global'
      }
    ],
    availableAtOrFrom: {
      '@type': 'Place',
      name: 'Remote',
      description: 'Available for remote work in USA, Europe, and globally. Flexible timezone (EST, PST, GMT, CET)'
    },
    workLocation: {
      '@type': 'Place',
      name: 'Remote',
      description: 'Remote work available globally'
    }
  }
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

/**
 * Generate structured data for service page
 */
export function generateServicePageStructuredData(serviceData, faqItems = []) {
  const service = generateServiceSchema(serviceData)
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}#services` },
    { name: serviceData.title, url: `${SITE_URL}${serviceData.url}` }
  ])
  
  const schemas = [service, breadcrumbs]
  
  // Add FAQ schema if FAQs exist
  if (faqItems && faqItems.length > 0) {
    schemas.push(generateFAQPageSchema(faqItems))
  }
  
  // Add Offer schema for availability
  schemas.push(generateOfferSchema())
  
  injectStructuredData(schemas)
}

export default {
  injectStructuredData,
  generatePersonSchema,
  generateProfessionalServiceSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateSoftwareApplicationSchema,
  generateFAQPageSchema,
  generateServiceSchema,
  generateOfferSchema,
  generateHomePageStructuredData,
  generateProjectPageStructuredData,
  generateServicePageStructuredData
}
