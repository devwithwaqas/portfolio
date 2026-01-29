/**
 * Structured Data (JSON-LD) Generator
 * Creates schema.org markup for better SEO and rich snippets
 */

import { APP_CONFIG, SITE_URL } from '../config/constants.js'

const BASE_URL = import.meta.env.BASE_URL || '/portfolio/'

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
  
  // Build sameAs array with all social profiles and website
  const sameAs = [
    linkedin,
    github,
    website
  ].filter(Boolean)
  
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
  
  const alternateName = [
    'Waqas Ahmed',
    'Waqas Ahmand'
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}#person`,
    name: fullName,
    alternateName,
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
      'DevOps Consultant',
      'Software Engineering Consultant',
      'Software Engineering Specialist',
      'Software Engineering Expert',
      'IT Engineering Consultant',
      'IT Services Consultant',
      'IT Consultant',
      'IT Services Expert',
      'Top Software Engineering Consultant',
      'Best Software Engineering Expert'
    ],
    description: `Senior Software Engineer & Technical Lead with ${APP_CONFIG.stats.yearsExperience}+ years of experience in .NET, Azure Cloud, and enterprise architecture. Specializing in full-stack development, microservices, and cloud solutions. Available for remote work globally.`,
    // AI Search Optimization: Add more detailed description for AI engines
    about: `Waqas Ahmad is a Senior Software Engineer and Technical Lead with ${APP_CONFIG.stats.yearsExperience}+ years of professional experience. He specializes in reliable, enterprise-grade, mission-critical solutions with zero-downtime, high-availability, scalable architectures. Expert in .NET development, Azure Cloud architecture, microservices design, SSL/TLS security, real-time processing, high-performance systems, distributed systems, and large-scale enterprise projects. With experience working with Fortune 500 companies worldwide, he delivers production-ready, robust, resilient, and optimized solutions. Available for projects in USA, Europe, and globally with flexible timezone support (EST, PST, GMT, CET).`,
    url: website,
    // CRITICAL: Use ImageObject for better Google search result display
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`,
      width: 1200,
      height: 1200,
      caption: `${fullName} - Senior Software Engineer & Technical Lead`,
      description: `Profile picture of ${fullName}, ${APP_CONFIG.stats.yearsExperience}+ years experienced Senior Software Engineer, Technical Lead, and Software Engineering Consultant specializing in .NET, Azure Cloud, and enterprise architecture.`
    },
    email: email,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.split(',')[0] || location,
      addressRegion: location.includes('Selangor') ? 'Selangor' : '',
      addressCountry: 'MY'
    },
    sameAs: sameAs,
    // Add additionalProfilePage for social media visibility
    additionalType: 'https://schema.org/ProfilePage',
    knowsAbout: [
      ...skills,
      'IT Services',
      'IT Consulting',
      'IT Engineering',
      'IT Solutions',
      'University of Engineering and Technology Lahore',
      'UET Lahore',
      'Computer System Engineering',
      'Enterprise Architecture',
      'System Architecture',
      'Software Architecture',
      'Reliable Systems',
      'Enterprise-Grade Solutions',
      'Mission-Critical Applications',
      'Zero-Downtime Systems',
      'High Availability',
      'Fault Tolerance',
      'Scalable Architecture',
      'Distributed Systems',
      'SSL/TLS',
      'Enterprise Security',
      'Real-Time Processing',
      'High-Performance Systems',
      'Production-Ready Solutions',
      'Robust Architecture',
      'Resilient Systems',
      'Cloud-Native Applications',
      'Container Orchestration',
      'Large-Scale Projects',
      'Enterprise Projects',
      'Huge Projects',
      'Agile Methodology',
      'Scrum',
      'DevOps',
      'CI/CD',
      'Test-Driven Development',
      'Code Review',
      'Technical Leadership',
      'Team Leadership',
      'Mentoring',
      'Problem Solving',
      'Solution Architecture',
      'System Optimization',
      'Performance Optimization',
      'Database Optimization',
      'Legacy Modernization',
      'Cloud Migration',
      'System Integration',
      'Fortune 500 Experience',
      'Multi-Industry Experience',
      'Competitive Programming',
      'Algorithm Design',
      'National Programming Champion',
      'ACM Programming Competition',
      // Industry-Specific Expertise
      'Petroleum Software Development',
      'Oil and Gas Software Development',
      'Petroleum Systems',
      'Oil and Gas Systems',
      'Petroleum Heat Exchanger Systems',
      'Oil and Gas Heat Exchanger Systems',
      'Petroleum Refinery Software',
      'Oil and Gas Refinery Software',
      'Petroleum Maintenance Systems',
      'Oil and Gas Maintenance Systems',
      'Petroleum Monitoring Systems',
      'Oil and Gas Monitoring Systems',
      'Petroleum Analytics Software',
      'Oil and Gas Analytics Software',
      'Petroleum IoT Systems',
      'Oil and Gas IoT Systems',
      'Petroleum Real-Time Systems',
      'Oil and Gas Real-Time Systems',
      'Healthcare Software Development',
      'Medical Software Development',
      'Healthcare Systems',
      'Medical Systems',
      'Healthcare EHR Systems',
      'Medical EHR Systems',
      'Healthcare Patient Management',
      'Medical Patient Management',
      'Healthcare Hospital Systems',
      'Medical Hospital Systems',
      'Healthcare Telemedicine Systems',
      'Medical Telemedicine Systems',
      'Healthcare HIPAA Compliance',
      'Medical HIPAA Compliance',
      'Healthcare Data Security',
      'Medical Data Security',
      'Healthcare Real-Time Monitoring',
      'Medical Real-Time Monitoring',
      'Healthcare IoT Systems',
      'Medical IoT Systems',
      'FinTech Software Development',
      'Banking Software Development',
      'Financial Services Software Development',
      'FinTech Payment Systems',
      'Banking Payment Systems',
      'Financial Services Payment Systems',
      'FinTech Trading Systems',
      'Banking Trading Systems',
      'Financial Services Trading Systems',
      'FinTech Risk Management',
      'Banking Risk Management',
      'Financial Services Risk Management',
      'FinTech Compliance Systems',
      'Banking Compliance Systems',
      'Financial Services Compliance Systems',
      'FinTech Security Systems',
      'Banking Security Systems',
      'Financial Services Security Systems',
      'Aviation Software Development',
      'Aerospace Software Development',
      'Aviation Booking Systems',
      'Aerospace Booking Systems',
      'Aviation Employee Travel Systems',
      'Aerospace Employee Travel Systems',
      'Aviation Discount Systems',
      'Aerospace Discount Systems',
      'E-commerce Software Development',
      'Retail Software Development',
      'E-commerce POS Systems',
      'Retail POS Systems',
      'E-commerce Inventory Management',
      'Retail Inventory Management',
      'E-commerce Order Management',
      'Retail Order Management',
      'E-commerce Payment Processing',
      'Retail Payment Processing',
      'Manufacturing Software Development',
      'Industrial Software Development',
      'Manufacturing ERP Systems',
      'Industrial ERP Systems',
      'Manufacturing SCADA Systems',
      'Industrial SCADA Systems',
      'Manufacturing IoT Systems',
      'Industrial IoT Systems',
      // Technology Stack Expertise
      'Angular .NET Core',
      '.NET Core Angular',
      'Angular Azure',
      'Azure Angular',
      '.NET Core Azure',
      'Azure .NET Core',
      'Angular .NET Core Azure',
      '.NET Core Angular Azure',
      'Azure Angular .NET Core',
      'Full Stack Angular .NET Core',
      'Full Stack .NET Core Angular',
      'Full Stack Azure Angular',
      'Full Stack Angular Azure',
      'Angular .NET Core Microservices',
      '.NET Core Angular Microservices',
      'Azure Angular Microservices',
      'Angular Azure Microservices',
      'Enterprise Angular .NET Core',
      'Enterprise .NET Core Angular',
      'Enterprise Azure Angular',
      'Enterprise Angular Azure',
      'Mission Critical Angular .NET Core',
      'Mission Critical .NET Core Angular',
      'Mission Critical Azure Angular',
      'High Performance Angular .NET Core',
      'High Performance .NET Core Angular',
      'High Performance Azure Angular',
      'Scalable Angular .NET Core',
      'Scalable .NET Core Angular',
      'Scalable Azure Angular',
      'Real-Time Angular .NET Core',
      'Real-Time .NET Core Angular',
      'Real-Time Azure Angular'
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      '@id': 'https://www.uet.edu.pk',
      name: 'University of Engineering and Technology, Lahore',
      alternateName: ['UET Lahore', 'UET', 'University of Engineering and Technology'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lahore',
        addressRegion: 'Punjab',
        addressCountry: 'PK'
      },
      description: 'University of Engineering and Technology, Lahore - Premier engineering institution in Pakistan'
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
    description: `Professional software engineering and technical consulting services. Specializing in reliable, enterprise-grade, mission-critical solutions with zero-downtime, high-availability, scalable architectures. Expert in Azure Cloud architecture, .NET development, microservices, SSL/TLS security, real-time processing, high-performance systems, distributed systems, and large-scale enterprise projects.`,
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
      'CI/CD Implementation',
      'IT Services',
      'IT Consulting Services',
      'IT Engineering Services',
      'IT Solutions',
      'IT Services Consulting'
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
 * Generate ProfessionalService schema with reviews
 * Similar to generateProfessionalServiceSchema but includes review/rating data
 */
export function generateProfessionalServiceSchemaWithReviews(testimonials = []) {
  const baseSchema = generateProfessionalServiceSchema()
  
  // Add reviews if testimonials provided
  if (testimonials && testimonials.length > 0) {
    const reviewData = generateReviewSchema(testimonials)
    
    // Add reviews and aggregateRating to the service schema
    baseSchema.review = reviewData.reviews
    baseSchema.aggregateRating = reviewData.aggregateRating
  }
  
  return baseSchema
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
    logo: `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`,
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
    : [`${SITE_URL}assets/img/waqas-profile-hoodie.jpg`]
  
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
        url: `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${articleData.url}`
    },
    // AI Search Optimization: Add keywords for better understanding
    keywords: 'reliable, enterprise project, huge project, mission critical, zero downtime, high availability, scalable architecture, SSL/TLS, enterprise security, real-time processing, high-performance, distributed systems, production-ready, robust, resilient, cloud-native, large-scale enterprise project',
    about: {
      '@type': 'Thing',
      name: 'Enterprise Software Development',
      description: 'Reliable, enterprise-grade, mission-critical software solutions with zero-downtime, high-availability, scalable architectures'
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
    : [`${SITE_URL}assets/img/waqas-profile-hoodie.jpg`]
  
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
 * Generate WebSite schema
 * CRITICAL: Helps Google understand your website structure
 * Note: Sitemap discovery is primarily via HTML link tag and robots.txt
 * This schema helps with overall website understanding
 */
export function generateWebSiteSchema() {
  const fullName = APP_CONFIG.fullName
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    name: `${fullName} - Portfolio`,
    url: SITE_URL,
    description: `${fullName} - Software Engineering Consultant & Software Engineering Specialist with ${APP_CONFIG.stats.yearsExperience}+ years of experience. Available for remote work globally.`,
    publisher: {
      '@type': 'Person',
      name: fullName
    },
    // SearchAction helps with site search (if you have search functionality)
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
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
  
  // Add JobPosting schema for "available for hire" messaging - helps AI search and recruiters
  const jobPosting = generateJobPostingSchema()
  
  // CRITICAL: Add WebSite schema with sitemap reference for automatic discovery
  const website = generateWebSiteSchema()
  
  // Inject all schemas
  injectStructuredData([person, service, organization, jobPosting, website])
}

/**
 * Generate FAQPage schema - Enhanced for AI Search
 */
export function generateFAQPageSchema(faqItems) {
  const fullName = APP_CONFIG.fullName
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}#faq`,
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
        author: {
          '@type': 'Person',
          name: fullName,
          jobTitle: 'Senior Software Engineer & Technical Lead'
        },
        dateCreated: new Date().toISOString()
      }
    }))
  }
}

/**
 * Generate HowTo schema for AI search engines
 * AI engines love process-based content
 */
export function generateHowToSchema(howToData) {
  const fullName = APP_CONFIG.fullName
  
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}${howToData.url || ''}#howto`,
    name: howToData.name || 'How to Hire a Senior Software Engineer',
    description: howToData.description || `Learn how to hire ${fullName}, a Senior Software Engineer with ${APP_CONFIG.stats.yearsExperience}+ years of experience.`,
    image: howToData.image || `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`,
    totalTime: howToData.totalTime || 'PT1H', // 1 hour in ISO 8601
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: 'Contact for quote'
    },
    tool: howToData.tools || [],
    step: (howToData.steps || []).map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image || undefined,
      url: step.url || undefined
    })),
    supply: howToData.supplies || []
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

/**
 * Generate Service schema (service-focused, detailed for SEO / AI)
 */
export function generateServiceSchema(serviceData) {
  const fullName = APP_CONFIG.fullName
  const location = APP_CONFIG.location
  const title = serviceData.title || ''
  const desc = serviceData.description || ''
  
  // Service-focused SEO: type, category, engagement, outcomes, geography
  const serviceTypes = [
    serviceData.serviceType || title,
    'IT Services',
    'Software Engineering Services',
    'Enterprise Solutions',
    'Remote Consulting',
    'Freelance Development',
    'Contract Development',
    'Technical Consulting',
    'Architecture Consulting'
  ].filter(Boolean)
  
  const categoryStr = [
    'IT Services',
    'Software Engineering Services',
    'Enterprise Solutions',
    'Custom Software Development',
    'Cloud Architecture',
    'Full Stack Development',
    'Microservices Architecture',
    'Technical Leadership',
    'Agile Project Management',
    'Database Design & Optimization',
    'Mobile Development'
  ].join(', ')
  
  const keywordList = [
    'reliable services',
    'enterprise-grade services',
    'mission-critical services',
    'zero-downtime services',
    'high-availability services',
    'scalable architecture',
    'SSL/TLS security',
    'real-time processing',
    'high-performance services',
    'distributed systems',
    'production-ready',
    'robust architecture',
    'resilient systems',
    'large-scale projects',
    'freelance services',
    'contract services',
    'remote consulting',
    'USA services',
    'UK services',
    'Europe services',
    'global services',
    'Angular .NET Core',
    'Azure Cloud',
    'microservices',
    'full stack',
    'custom solutions',
    'legacy modernization',
    'cloud migration',
    'startup to enterprise',
    'Fortune 500 experience'
  ].join(', ')
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${serviceData.url}`,
    name: title,
    description: desc,
    serviceType: serviceTypes.length === 1 ? serviceTypes[0] : serviceTypes,
    category: categoryStr,
    keywords: keywordList,
    provider: {
      '@type': 'Person',
      name: fullName,
      jobTitle: 'Senior Software Engineer & Technical Lead',
      address: {
        '@type': 'PostalAddress',
        addressLocality: (location && location.split(',')[0]) || location || '',
        addressRegion: (location && location.includes('Selangor')) ? 'Selangor' : '',
        addressCountry: 'MY'
      }
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Country', name: 'Global' }
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'Remote',
      availableLanguage: ['English']
    },
    offers: {
      '@type': 'Offer',
      availabilityStarts: '2022-01-01',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceSpecification: { '@type': 'UnitPriceSpecification', priceCurrency: 'USD' }
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
 * Generate JobPosting schema - Enhanced for AI search and recruiter visibility
 * Helps AI search engines understand availability for hire
 */
export function generateJobPostingSchema() {
  const fullName = APP_CONFIG.fullName
  const location = APP_CONFIG.location
  const email = APP_CONFIG.email
  
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    '@id': `${SITE_URL}#jobposting`,
    title: 'Senior Software Engineer & Technical Lead - Remote',
    description: `${fullName} is available for remote work as Senior Software Engineer, Technical Lead, or Technical Consultant. Specializing in .NET, Azure Cloud, microservices, and enterprise architecture. ${APP_CONFIG.stats.yearsExperience}+ years of experience working with Fortune 500 companies worldwide.`,
    identifier: {
      '@type': 'PropertyValue',
      name: 'Portfolio',
      value: SITE_URL
    },
    datePosted: new Date().toISOString(),
    validThrough: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
    employmentType: ['CONTRACTOR', 'FREELANCE', 'PART_TIME', 'FULL_TIME'],
    hiringOrganization: {
      '@type': 'Organization',
      name: `${fullName} - Independent Consultant`,
      sameAs: [
        APP_CONFIG.contactLinks.linkedin,
        APP_CONFIG.contactLinks.github,
        SITE_URL
      ].filter(Boolean)
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.split(',')[0] || location,
        addressRegion: location.includes('Selangor') ? 'Selangor' : '',
        addressCountry: 'MY',
        addressLocality: 'Remote'
      }
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'Anywhere - Remote Work'
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        value: 'Contact for quote',
        unitText: 'HOUR'
      }
    },
    skills: [
      '.NET Core',
      '.NET Framework',
      'C#',
      'ASP.NET',
      'Azure Cloud',
      'Microservices Architecture',
      'API Development',
      'Full Stack Development',
      'Technical Leadership',
      'Enterprise Architecture'
    ],
    qualifications: `Bachelor's Degree in Computer System Engineering. ${APP_CONFIG.stats.yearsExperience}+ years of professional experience in software development and technical leadership.`,
    workHours: 'Flexible - Remote work with timezone flexibility (EST, PST, GMT, CET)',
    specialCommitments: 'Remote work available globally. Flexible timezone support for USA, Europe, and worldwide clients.'
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
 * Generate ImageObject schema for service images (for image search)
 */
export function generateServiceImageObjectSchema(serviceData) {
  const title = serviceData.title || ''
  const serviceUrl = `${SITE_URL}${serviceData.url}`
  
  // Get service images (hero, process, CTA, banners)
  const images = []
  
  // Hero image
  if (serviceData.heroImage) {
    images.push({
      '@type': 'ImageObject',
      '@id': `${serviceUrl}#hero-image`,
      url: serviceData.heroImage.startsWith('http') ? serviceData.heroImage : `${SITE_URL}${serviceData.heroImage.replace(/^\//, '')}`,
      caption: `${title} Services - Remote Consultant - Available USA, Europe, Global - 17+ Years Experience`,
      description: `Professional ${title.toLowerCase()} services by Waqas Ahmad, Senior Software Engineer with 17+ years of experience. Available for remote work globally.`,
      contentUrl: serviceData.heroImage.startsWith('http') ? serviceData.heroImage : `${SITE_URL}${serviceData.heroImage.replace(/^\//, '')}`,
      license: `${SITE_URL}`,
      creator: {
        '@type': 'Person',
        name: APP_CONFIG.fullName
      }
    })
  }
  
  // Process image
  if (serviceData.processImage) {
    images.push({
      '@type': 'ImageObject',
      '@id': `${serviceUrl}#process-image`,
      url: serviceData.processImage.startsWith('http') ? serviceData.processImage : `${SITE_URL}${serviceData.processImage.replace(/^\//, '')}`,
      caption: `${title} Service Process Flow - Remote Consultant`,
      description: `Process and workflow for ${title.toLowerCase()} services.`,
      contentUrl: serviceData.processImage.startsWith('http') ? serviceData.processImage : `${SITE_URL}${serviceData.processImage.replace(/^\//, '')}`,
      license: `${SITE_URL}`,
      creator: {
        '@type': 'Person',
        name: APP_CONFIG.fullName
      }
    })
  }
  
  // CTA image
  if (serviceData.ctaImage) {
    images.push({
      '@type': 'ImageObject',
      '@id': `${serviceUrl}#cta-image`,
      url: serviceData.ctaImage.startsWith('http') ? serviceData.ctaImage : `${SITE_URL}${serviceData.ctaImage.replace(/^\//, '')}`,
      caption: `Get Started with ${title} Services - Remote Consultant`,
      description: `Contact for ${title.toLowerCase()} services. Available for remote work in USA, Europe, and globally.`,
      contentUrl: serviceData.ctaImage.startsWith('http') ? serviceData.ctaImage : `${SITE_URL}${serviceData.ctaImage.replace(/^\//, '')}`,
      license: `${SITE_URL}`,
      creator: {
        '@type': 'Person',
        name: APP_CONFIG.fullName
      }
    })
  }
  
  // Banner images
  if (serviceData.bannerImages && Array.isArray(serviceData.bannerImages)) {
    serviceData.bannerImages.forEach((bannerImg, index) => {
      if (bannerImg) {
        images.push({
          '@type': 'ImageObject',
          '@id': `${serviceUrl}#banner-image-${index + 1}`,
          url: bannerImg.startsWith('http') ? bannerImg : `${SITE_URL}${bannerImg.replace(/^\//, '')}`,
          caption: `${title} Services - Banner ${index + 1} - Remote Consultant`,
          description: `${title} services showcase and capabilities.`,
          contentUrl: bannerImg.startsWith('http') ? bannerImg : `${SITE_URL}${bannerImg.replace(/^\//, '')}`,
          license: `${SITE_URL}`,
          creator: {
            '@type': 'Person',
            name: APP_CONFIG.fullName
          }
        })
      }
    })
  }
  
  return images
}

/**
 * Generate HowTo schema for service process (for featured snippets)
 */
export function generateServiceHowToSchema(serviceData, processSteps = []) {
  const title = serviceData.title || ''
  const fullName = APP_CONFIG.fullName
  
  if (!processSteps || processSteps.length === 0) {
    return null
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}${serviceData.url}#howto`,
    name: `How to Hire ${fullName} for ${title} Services`,
    description: `Learn how to engage ${fullName} for professional ${title.toLowerCase()} services. Step-by-step process for hiring a remote Senior Software Engineer with 17+ years of experience.`,
    image: serviceData.heroImage ? (serviceData.heroImage.startsWith('http') ? serviceData.heroImage : `${SITE_URL}${serviceData.heroImage.replace(/^\//, '')}`) : `${SITE_URL}assets/img/waqas-profile-hoodie.jpg`,
    totalTime: processSteps.length > 0 ? `PT${processSteps.length * 2}W` : 'PT8W', // 2 weeks per step
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: 'Contact for quote'
    },
    step: processSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title || step.name || `Step ${index + 1}`,
      text: step.description || step.text || '',
      url: `${SITE_URL}${serviceData.url}#step-${index + 1}`
    }))
  }
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
  
  // Add ImageObject schemas for service images (for image search)
  const serviceImages = generateServiceImageObjectSchema(serviceData)
  if (serviceImages && serviceImages.length > 0) {
    schemas.push(...serviceImages)
  }
  
  // Add HowTo schema for service process (for featured snippets)
  if (serviceData.processSteps && serviceData.processSteps.length > 0) {
    const howTo = generateServiceHowToSchema(serviceData, serviceData.processSteps)
    if (howTo) {
      schemas.push(howTo)
    }
  }
  
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
  generateHowToSchema,
  generateServiceSchema,
  generateOfferSchema,
  generateJobPostingSchema,
  generateJobPostingSchema,
  generateHomePageStructuredData,
  generateProjectPageStructuredData,
  generateServicePageStructuredData,
  generateServiceImageObjectSchema,
  generateServiceHowToSchema
}
