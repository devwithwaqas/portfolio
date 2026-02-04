/**
 * Topical clusters for SEO: group services (and later blog/projects) into named clusters.
 * Used for "Part of cluster" internal linking on service and project pages.
 */

import { SERVICE_PATHS } from './relatedServices.js'

const SERVICES_BASE = '/services'

/** Cluster id -> { name, slugs } (service path keys) */
export const CLUSTERS = {
  cloud: {
    name: 'Cloud & Azure',
    slugs: ['azure-cloud-architecture', 'microservices-architecture']
  },
  fullStack: {
    name: 'Full-Stack & Data',
    slugs: ['full-stack-development', 'database-design-optimization']
  },
  leadership: {
    name: 'Leadership & Delivery',
    slugs: ['technical-leadership', 'agile-project-management']
  },
  mobile: {
    name: 'Mobile & Frontend',
    slugs: ['mobile-development', 'full-stack-development']
  }
}

/** Service path key -> cluster id (each service in at most one cluster for "Part of" label) */
export const SERVICE_CLUSTER_MAP = {
  'full-stack-development': 'fullStack',
  'azure-cloud-architecture': 'cloud',
  'technical-leadership': 'leadership',
  'microservices-architecture': 'cloud',
  'agile-project-management': 'leadership',
  'database-design-optimization': 'fullStack',
  'mobile-development': 'mobile'
}

const PROJECTS_BASE = '/projects'

/** Project path key -> cluster id (for "Part of cluster" on project pages) */
export const PROJECT_CLUSTER_MAP = {
  'heat-exchanger': 'cloud',
  'airasia-id90': 'cloud',
  'bat-inhouse-app': 'cloud',
  'pj-smart-city': 'cloud',
  'uk-property-management': 'cloud',
  'gamified-employee-management': 'fullStack',
  'valet-parking': 'mobile',
  'mobile-games': 'mobile',
  'g5-pos': 'fullStack',
  'chubb-insurance-applications': 'fullStack'
}

/**
 * Get cluster info for a service page (for "Part of cluster" section).
 * @param {string} currentServicePath - Full path or path key (e.g. /services/full-stack-development or full-stack-development)
 * @returns {{ name: string, members: { path: string, title: string }[] } | null} Cluster name and other members (excluding current), or null
 */
export function getClusterForService(currentServicePath) {
  const raw = (currentServicePath || '').trim()
  const key = raw.startsWith(SERVICES_BASE)
    ? raw.replace(SERVICES_BASE, '').replace(/^\/+/, '')
    : raw.replace(/^\/+/, '')
  const clusterId = SERVICE_CLUSTER_MAP[key]
  if (!clusterId) return null
  const cluster = CLUSTERS[clusterId]
  if (!cluster || !cluster.slugs || cluster.slugs.length === 0) return null
  const otherSlugs = cluster.slugs.filter(s => s !== key)
  if (otherSlugs.length === 0) return null
  const members = otherSlugs
    .filter(s => SERVICE_PATHS[s])
    .map(s => ({
      path: `${SERVICES_BASE}/${s}`,
      title: SERVICE_PATHS[s]
    }))
  return { name: cluster.name, members }
}

/**
 * Get cluster info for a project page (for "Part of cluster" section). Links to services in that cluster.
 * @param {string} projectPath - Full path or path key (e.g. /projects/heat-exchanger or heat-exchanger)
 * @returns {{ name: string, members: { path: string, title: string }[] } | null}
 */
export function getClusterForProject(projectPath) {
  const raw = (projectPath || '').trim()
  const key = raw.startsWith(PROJECTS_BASE)
    ? raw.replace(PROJECTS_BASE, '').replace(/^\/+/, '')
    : raw.replace(/^\/+/, '')
  const clusterId = PROJECT_CLUSTER_MAP[key]
  if (!clusterId) return null
  const cluster = CLUSTERS[clusterId]
  if (!cluster || !cluster.slugs || cluster.slugs.length === 0) return null
  const members = cluster.slugs
    .filter(s => SERVICE_PATHS[s])
    .map(s => ({
      path: `${SERVICES_BASE}/${s}`,
      title: SERVICE_PATHS[s]
    }))
  return { name: cluster.name, members }
}

/** Blog article topic (display string) -> cluster id for "Part of cluster" on article pages */
export const BLOG_TOPIC_TO_CLUSTER = {
  'Cloud': 'cloud',
  'Full-Stack': 'fullStack',
  'Data': 'fullStack',
  'Leadership': 'leadership',
  'Mobile': 'mobile',
  'Architecture': 'fullStack'
}

/**
 * Get cluster info for a blog article page (for "Part of cluster" section). Links to services in that cluster.
 * @param {string} articleTopic - Article topic, e.g. "Cloud", "Architecture"
 * @returns {{ name: string, members: { path: string, title: string }[] } | null}
 */
export function getClusterForBlog(articleTopic) {
  const clusterId = BLOG_TOPIC_TO_CLUSTER[articleTopic]
  if (!clusterId) return null
  const cluster = CLUSTERS[clusterId]
  if (!cluster || !cluster.slugs || cluster.slugs.length === 0) return null
  const members = cluster.slugs
    .filter(s => SERVICE_PATHS[s])
    .map(s => ({
      path: `${SERVICES_BASE}/${s}`,
      title: SERVICE_PATHS[s]
    }))
  return { name: cluster.name, members }
}
