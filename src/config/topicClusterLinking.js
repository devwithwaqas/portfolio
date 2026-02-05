/**
 * Topic cluster linking — Service → Blog, Project → Blog, and 8 cluster definitions.
 * Used for "Related reading" / "Technical deep dives" on service and project pages.
 * Single source of truth for internal linking (STEP 2 & STEP 4).
 */

/** Service path key → blog slugs to link (STEP 2) */
export const SERVICE_TO_BLOG_SLUGS = {
  'azure-cloud-architecture': [
    'azure-cloud-architecture-patterns',
    'azure-microservices-best-practices',
    'event-driven-architecture-azure',
    'azure-serverless-functions-logic-apps',
    'azure-devops-vs-github-actions',
    'observability-dotnet-azure',
    'open-telemetry-distributed-tracing-dotnet',
    'azure-bicep-iac-basics',
    'data-engineering-batch-vs-streaming',
    'data-engineering-azure-pipelines-lakehouse'
  ],
  'microservices-architecture': [
    'microservices-resilience-circuit-breaker-retry',
    'api-gateway-vs-bff',
    'grpc-vs-rest-dotnet-apis',
    'event-sourcing-and-cqrs',
    'saga-pattern-orchestrator-vs-choreography',
    'clean-architecture-dotnet',
    'design-patterns-overview-creational-structural-behavioral',
    'creational-design-patterns-dotnet',
    'structural-design-patterns-dotnet',
    'behavioral-design-patterns-dotnet'
  ],
  'full-stack-development': [
    'vue-enterprise-scale',
    'vue-vs-angular-vs-react-full-comparison',
    'full-stack-net-angular-enterprise'
  ],
  'database-design-optimization': [
    'database-indexing-strategies',
    'sql-server-performance-tuning',
    'database-transactions-isolation-levels',
    'repository-pattern-unit-of-work-dotnet',
    'caching-strategies-redis-dotnet'
  ],
  'mobile-development': [
    'mobile-app-architecture-vue-capacitor'
  ],
  'technical-leadership': [
    'technical-leadership-remote-teams',
    'agile-delivery-enterprise-constraints',
    'developers-integrating-ai-daily-workflows',
    'testing-strategies-unit-integration-e2e'
  ],
  'agile-project-management': [
    'agile-delivery-enterprise-constraints',
    'testing-strategies-unit-integration-e2e'
  ]
}

/** Project path key → blog slugs to link (STEP 4) */
export const PROJECT_TO_BLOG_SLUGS = {
  'airasia-id90': [
    'microservices-resilience-circuit-breaker-retry',
    'event-driven-architecture-azure',
    'azure-cloud-architecture-patterns',
    'api-gateway-vs-bff',
    'clean-architecture-dotnet',
    'observability-dotnet-azure',
    'ci-cd-azure-devops'
  ],
  'bat-inhouse-app': [
    'clean-architecture-dotnet',
    'solid-principles-in-practice',
    'domain-driven-design-basics',
    'caching-strategies-redis-dotnet',
    'azure-devops-vs-github-actions'
  ],
  'chubb-insurance-applications': [
    'owasp-api-security-top-10',
    'securing-apis-dotnet',
    'oauth2-openid-connect-dotnet',
    'database-transactions-isolation-levels',
    'microservices-resilience-circuit-breaker-retry'
  ],
  'heat-exchanger': [
    'data-engineering-batch-vs-streaming',
    'data-engineering-azure-pipelines-lakehouse',
    'open-telemetry-distributed-tracing-dotnet',
    'microservices-resilience-circuit-breaker-retry'
  ],
  'pj-smart-city': [
    'event-driven-architecture-azure',
    'microservices-resilience-circuit-breaker-retry',
    'azure-serverless-functions-logic-apps'
  ],
  'uk-property-management': [
    'clean-architecture-dotnet',
    'sql-server-performance-tuning',
    'caching-strategies-redis-dotnet',
    'rest-vs-graphql-apis'
  ],
  'g5-pos': [
    'domain-driven-design-basics',
    'event-sourcing-and-cqrs',
    'repository-pattern-unit-of-work-dotnet',
    'microservices-resilience-circuit-breaker-retry'
  ],
  'mobile-games': [
    'mobile-app-architecture-vue-capacitor',
    'design-patterns-overview-creational-structural-behavioral'
  ],
  'gamified-employee-management': [
    'mobile-app-architecture-vue-capacitor',
    'design-patterns-overview-creational-structural-behavioral',
    'gamification-enterprise-apps'
  ],
  'valet-parking': [],
  'insurance-clients': []
}

/** 8 major topic clusters (STEP 1) — cluster id → { name, slugs } */
export const CLUSTERS_8 = {
  azure: {
    name: 'Azure & Cloud Architecture',
    slugs: [
      'azure-cloud-architecture-patterns',
      'azure-microservices-best-practices',
      'event-driven-architecture-azure',
      'azure-serverless-functions-logic-apps',
      'azure-devops-vs-github-actions',
      'observability-dotnet-azure',
      'open-telemetry-distributed-tracing-dotnet',
      'azure-bicep-iac-basics',
      'data-engineering-batch-vs-streaming',
      'data-engineering-azure-pipelines-lakehouse'
    ]
  },
  dotnet: {
    name: '.NET Backend & APIs',
    slugs: [
      'clean-architecture-dotnet',
      'solid-principles-in-practice',
      'rest-vs-graphql-apis',
      'api-gateway-vs-bff',
      'grpc-vs-rest-dotnet-apis',
      'owasp-api-security-top-10',
      'securing-apis-dotnet',
      'database-optimization-entity-framework',
      'database-transactions-isolation-levels',
      'dotnet-core-middleware-pipeline',
      'repository-pattern-unit-of-work-dotnet',
      'caching-strategies-redis-dotnet',
      'sql-server-performance-tuning',
      'dependency-injection-dotnet-core',
      'oauth2-openid-connect-dotnet'
    ]
  },
  distributed: {
    name: 'System Architecture / Distributed Systems',
    slugs: [
      'saga-pattern-orchestrator-vs-choreography',
      'event-sourcing-and-cqrs',
      'microservices-resilience-circuit-breaker-retry',
      'feature-flags-toggles-dotnet',
      'monorepo-vs-polyrepo'
    ]
  },
  ai: {
    name: 'AI in Engineering',
    slugs: [
      'current-state-ai-coding-tools-2026',
      'where-ai-fails-real-world-software-development',
      'why-ai-productivity-gains-plateau',
      'impact-ai-tools-code-quality-maintainability',
      'what-developers-want-from-ai-assistants',
      'cursor-vs-claude-code-vs-copilot-ai-ide',
      'ai-ides-what-they-get-right-wrong',
      'ai-models-claude-gemini-gpt-deepseek-comparison',
      'trade-offs-ai-code-generation',
      'ai-changing-code-review-testing'
    ]
  },
  leadership: {
    name: 'Leadership & Delivery',
    slugs: [
      'agile-delivery-enterprise-constraints',
      'technical-leadership-remote-teams',
      'developers-integrating-ai-daily-workflows',
      'testing-strategies-unit-integration-e2e'
    ]
  },
  patterns: {
    name: 'Architecture Patterns (Creational, Structural, Behavioral)',
    slugs: [
      'design-patterns-overview-creational-structural-behavioral',
      'creational-design-patterns-dotnet',
      'structural-design-patterns-dotnet',
      'behavioral-design-patterns-dotnet'
    ]
  },
  frontend: {
    name: 'Frontend / Mobile',
    slugs: [
      'vue-enterprise-scale',
      'vue-vs-angular-vs-react-full-comparison',
      'mobile-app-architecture-vue-capacitor'
    ]
  },
  caseStudies: {
    name: 'Case Studies',
    slugs: [
      'case-study-airasia-id90',
      'case-study-bat-inhouse-app'
    ]
  }
}

/**
 * Get blog slugs to show on a service page (Related reading).
 * @param {string} currentServicePath - e.g. /services/full-stack-development or full-stack-development
 * @returns {string[]}
 */
export function getBlogSlugsForService(currentServicePath) {
  const key = (currentServicePath || '')
    .replace(/^\/services\/?/, '')
    .replace(/^\//, '')
  return SERVICE_TO_BLOG_SLUGS[key] || []
}

/**
 * Get blog slugs to show on a project page (Related reading).
 * @param {string} projectPath - e.g. /projects/heat-exchanger or heat-exchanger
 * @returns {string[]}
 */
export function getBlogSlugsForProject(projectPath) {
  const key = (projectPath || '')
    .replace(/^\/projects\/?/, '')
    .replace(/^\//, '')
  return PROJECT_TO_BLOG_SLUGS[key] || []
}
