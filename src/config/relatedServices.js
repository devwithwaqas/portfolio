/**
 * Single source of truth for service pages and related-service links.
 * Used for internal linking (SEO reach) with no duplication across pages.
 */

/** Full list: path (slug) → display title */
export const SERVICE_PATHS = {
  'full-stack-development': 'Full Stack Development',
  'azure-cloud-architecture': 'Azure Cloud Architecture',
  'technical-leadership': 'Technical Leadership',
  'microservices-architecture': 'Microservices Architecture',
  'agile-project-management': 'Agile Project Management',
  'database-design-optimization': 'Database Design & Optimization',
  'mobile-development': 'Mobile Development'
}

/** Base path for service routes */
const SERVICES_BASE = '/services'

/** For each service path key, list 2–3 related service path keys (no duplication of mapping) */
const RELATED_MAP = {
  'full-stack-development': ['azure-cloud-architecture', 'microservices-architecture', 'database-design-optimization'],
  'azure-cloud-architecture': ['full-stack-development', 'microservices-architecture', 'technical-leadership'],
  'technical-leadership': ['agile-project-management', 'full-stack-development', 'microservices-architecture'],
  'microservices-architecture': ['azure-cloud-architecture', 'full-stack-development', 'database-design-optimization'],
  'agile-project-management': ['technical-leadership', 'full-stack-development'],
  'database-design-optimization': ['full-stack-development', 'azure-cloud-architecture', 'microservices-architecture'],
  'mobile-development': ['full-stack-development', 'azure-cloud-architecture']
}

const PROJECTS_BASE = '/projects'

/** For each project path key, list 2–3 relevant service path keys (SEO: project pages link to services) */
const PROJECT_TO_SERVICES = {
  'heat-exchanger': ['full-stack-development', 'microservices-architecture', 'azure-cloud-architecture'],
  'g5-pos': ['full-stack-development', 'database-design-optimization', 'azure-cloud-architecture'],
  'uk-property-management': ['full-stack-development', 'azure-cloud-architecture'],
  'airasia-id90': ['full-stack-development', 'azure-cloud-architecture', 'technical-leadership'],
  'bat-inhouse-app': ['microservices-architecture', 'azure-cloud-architecture', 'technical-leadership'],
  'mobile-games': ['mobile-development', 'full-stack-development'],
  'pj-smart-city': ['full-stack-development', 'azure-cloud-architecture', 'technical-leadership'],
  'gamified-employee-management': ['full-stack-development', 'agile-project-management'],
  'chubb-insurance-applications': ['full-stack-development', 'azure-cloud-architecture', 'database-design-optimization'],
  'valet-parking': ['full-stack-development', 'mobile-development']
}

/**
 * Get 2–3 related services for a given current service path.
 * @param {string} currentServicePath - Full path (e.g. /services/full-stack-development) or path key (e.g. full-stack-development)
 * @returns {{ path: string, title: string }[]}
 */
export function getRelatedServices(currentServicePath) {
  const raw = (currentServicePath || '').trim()
  const key = raw.startsWith(SERVICES_BASE)
    ? raw.replace(SERVICES_BASE, '').replace(/^\/+/, '')
    : raw.replace(/^\/+/, '')
  const relatedKeys = RELATED_MAP[key]
  if (!relatedKeys || !Array.isArray(relatedKeys)) return []
  return relatedKeys
    .filter(k => SERVICE_PATHS[k])
    .map(k => ({
      path: `${SERVICES_BASE}/${k}`,
      title: SERVICE_PATHS[k]
    }))
}

/**
 * Get 2–3 related services for a project page (SEO: internal links from projects to services).
 * @param {string} projectPath - Full path (e.g. /projects/heat-exchanger) or path key (e.g. heat-exchanger)
 * @returns {{ path: string, title: string }[]}
 */
export function getRelatedServicesForProject(projectPath) {
  const raw = (projectPath || '').trim()
  const key = raw.startsWith(PROJECTS_BASE)
    ? raw.replace(PROJECTS_BASE, '').replace(/^\/+/, '')
    : raw.replace(/^\/+/, '')
  const serviceKeys = PROJECT_TO_SERVICES[key]
  if (!serviceKeys || !Array.isArray(serviceKeys)) return []
  return serviceKeys
    .filter(k => SERVICE_PATHS[k])
    .map(k => ({
      path: `${SERVICES_BASE}/${k}`,
      title: SERVICE_PATHS[k]
    }))
}
