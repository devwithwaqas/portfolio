/**
 * Semantic keywords (TF-IDF / NLP-style) for topical authority.
 * Used in: Person schema knowsAbout, meta keywords, and content strategy.
 * Single source of truth; no duplication.
 */

/** Topic key -> { primary, semanticVariants, entities } */
export const SEMANTIC_KEYWORDS = {
  azure: {
    primary: ['Azure Cloud Architecture', 'Azure cloud solutions'],
    semanticVariants: [
      'Azure landing zone design',
      'Microservices on AKS',
      'Azure DevOps pipelines for enterprise',
      'Cloud cost optimization strategies',
      'Event-driven architecture on Azure',
      'Azure Service Fabric patterns',
      'Azure Functions serverless',
      'Azure SQL and Cosmos DB',
      'Azure API Gateway',
      'Azure security and Key Vault'
    ],
    entities: ['Azure', 'AKS', 'Azure Service Fabric', 'Azure Functions', 'Azure DevOps', 'Cosmos DB']
  },
  microservices: {
    primary: ['Microservices Architecture', 'Microservices design'],
    semanticVariants: [
      'Microservices on AKS',
      'Event-driven microservices',
      'Service mesh and API Gateway',
      'Distributed systems patterns',
      'Container orchestration',
      'Domain-driven design for microservices',
      'Event sourcing and CQRS',
      'Circuit breaker and resilience'
    ],
    entities: ['Docker', 'Kubernetes', 'AKS', 'Service Fabric', 'gRPC', 'Message queues']
  },
  fullStack: {
    primary: ['Full Stack Development', 'Full stack .NET'],
    semanticVariants: [
      'Full stack .NET and Vue',
      'Full stack .NET and Angular',
      'Full stack .NET and React',
      'Enterprise full stack architecture',
      'API design for full stack',
      'Frontend-backend integration',
      'Single-page application architecture'
    ],
    entities: ['.NET Core', 'Vue.js', 'Angular', 'React', 'TypeScript', 'REST API']
  },
  database: {
    primary: ['Database Design & Optimization', 'Database architecture'],
    semanticVariants: [
      'SQL Server performance tuning',
      'Entity Framework optimization',
      'Database schema design',
      'Query optimization and indexing',
      'Azure SQL and Cosmos DB',
      'Data modeling for enterprise'
    ],
    entities: ['SQL Server', 'Entity Framework', 'Cosmos DB', 'Azure SQL']
  },
  technicalLeadership: {
    primary: ['Technical Leadership', 'Tech lead'],
    semanticVariants: [
      'Code reviews and best practices',
      'Team mentoring and growth',
      'Architecture decision records',
      'Technical debt management',
      'Sprint planning and delivery',
      'Engineering team leadership'
    ],
    entities: ['Code review', 'Mentoring', 'ADR', 'Sprint']
  },
  agile: {
    primary: ['Agile Project Management', 'Agile delivery'],
    semanticVariants: [
      'Scrum and Kanban',
      'Sprint planning and retrospectives',
      'Agile for distributed teams',
      'Backlog refinement',
      'Agile metrics and velocity'
    ],
    entities: ['Scrum', 'Kanban', 'Sprint', 'Retrospective']
  },
  mobile: {
    primary: ['Mobile Development', 'Mobile app development'],
    semanticVariants: [
      'Native iOS and Android',
      'Cross-platform mobile (React Native, Flutter)',
      'Mobile architecture patterns',
      'Mobile API design'
    ],
    entities: ['iOS', 'Android', 'React Native', 'Flutter', 'Xamarin']
  },
  /** Blog topic "Architecture" (design patterns, clean architecture, DDD, SOLID, AI/code tools) */
  architecture: {
    primary: ['Software Architecture', 'Enterprise architecture', 'Design patterns'],
    semanticVariants: [
      'Clean architecture .NET',
      'Domain-driven design',
      'SOLID principles',
      'Design patterns in C#',
      'AI coding tools',
      'Code review and testing',
      'Technical leadership',
      'Microservices design',
      'API design patterns',
      'Repository pattern and Unit of Work'
    ],
    entities: ['.NET', 'C#', 'DDD', 'CQRS', 'Event Sourcing', 'Clean Architecture']
  }
}

/** Blog article topic (display string) -> topic key in SEMANTIC_KEYWORDS */
export const BLOG_TOPIC_TO_KEY = {
  'Cloud': 'azure',
  'Full-Stack': 'fullStack',
  'Data': 'database',
  'Leadership': 'technicalLeadership',
  'Mobile': 'mobile',
  'Architecture': 'architecture'
}

/** Service route name (router) -> topic key in SEMANTIC_KEYWORDS */
export const SERVICE_TO_TOPIC = {
  FullStackDevelopment: 'fullStack',
  AzureCloudArchitecture: 'azure',
  TechnicalLeadership: 'technicalLeadership',
  MicroservicesArchitecture: 'microservices',
  AgileProjectManagement: 'agile',
  DatabaseDesignOptimization: 'database',
  MobileDevelopment: 'mobile'
}

/**
 * Get semantic variants for a topic (for meta keywords, descriptions).
 * @param {string} topicKey - Key from SEMANTIC_KEYWORDS (e.g. 'azure', 'fullStack')
 * @returns {string[]} Primary + semanticVariants (max 10 for meta)
 */
export function getSemanticVariantsForTopic(topicKey) {
  const topic = SEMANTIC_KEYWORDS[topicKey]
  if (!topic) return []
  return [...(topic.primary || []), ...(topic.semanticVariants || [])].slice(0, 10)
}

/**
 * Get full semantic terms for blog articles (maximize coverage like Home/Services).
 * No cap — return all primary + semanticVariants + entities for maximum search reach.
 * @param {string} topicKey - Key from SEMANTIC_KEYWORDS
 * @returns {string[]} Primary + semanticVariants + entities
 */
export function getSemanticTermsForBlogTopic(topicKey) {
  const topic = SEMANTIC_KEYWORDS[topicKey]
  if (!topic) return []
  return [
    ...(topic.primary || []),
    ...(topic.semanticVariants || []),
    ...(topic.entities || [])
  ]
}

/**
 * Get all semantic variants for Person knowsAbout (curated subset site-wide).
 * @returns {string[]} Flat list of variants across topics (for schema)
 */
export function getSemanticVariantsForPerson() {
  const out = []
  Object.values(SEMANTIC_KEYWORDS).forEach(topic => {
    if (topic.primary) out.push(...topic.primary)
    if (topic.semanticVariants) out.push(...topic.semanticVariants.slice(0, 3))
  })
  return [...new Set(out)]
}
