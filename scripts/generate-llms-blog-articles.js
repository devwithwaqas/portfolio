/**
 * Injects per-article blocks for all blog articles into public/llms.txt.
 * Outputs AI-native SEO: Topics, Use cases, Audience (no long Keywords line).
 * Reads article .js files; optional topics/useCases/audience or fallback from title/topic/excerpt.
 * Run before or as part of build; copy-llms-txt.js then copies public/llms.txt to dist.
 */

const fs = require('fs')
const path = require('path')

const ARTICLES_DIR = path.resolve(__dirname, '../src/config/blog/articles')
const LLMS_PATH = path.resolve(__dirname, '../public/llms.txt')
const BLOG_BASE_URL = 'https://waqasahmad-portfolio.web.app/blog'

const MAX_TOPICS = 8
const MAX_USE_CASES = 5
const MAX_AUDIENCE = 5

/** Service slug → human-readable label for Topics (enterprise checklist: topic clusters only). */
const SERVICE_SLUG_TO_LABEL = {
  'full-stack-development': 'Full stack development',
  'azure-cloud-architecture': 'Azure cloud architecture',
  'technical-leadership': 'Technical leadership',
  'microservices-architecture': 'Microservices architecture',
  'agile-project-management': 'Agile project management',
  'database-design-optimization': 'Database design and optimization',
  'mobile-development': 'Mobile development'
}

/** Dedupe array case-insensitively, preserve first occurrence order. */
function dedupeList(arr) {
  if (!Array.isArray(arr) || !arr.length) return []
  const seen = new Set()
  const out = []
  for (const x of arr) {
    const s = String(x).trim()
    if (!s) continue
    const lower = s.toLowerCase()
    if (seen.has(lower)) continue
    seen.add(lower)
    out.push(s)
  }
  return out
}

function extractArticleMeta(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const slugMatch = content.match(/\bslug\s*:\s*["']([^"']+)["']/)
  const titleMatch = content.match(/\btitle\s*:\s*["']((?:[^"\\]|\\.)*)["']/)
  const excerptMatch = content.match(/\bexcerpt\s*:\s*["']((?:[^"\\]|\\.)*)["']/)
  const topicMatch = content.match(/\btopic\s*:\s*["']([^"']*)["']/)
  let topics = []
  let useCases = []
  let audience = []
  let relatedServices = []
  const topicsMatch = content.match(/\btopics\s*:\s*\[([\s\S]*?)\]\s*,/)
  if (topicsMatch) {
    const inner = topicsMatch[1]
    const quoted = inner.match(/["']([^"']*)["']/g)
    if (quoted) topics = quoted.map((s) => s.slice(1, -1).trim()).filter(Boolean)
  }
  const useCasesMatch = content.match(/\buseCases\s*:\s*\[([\s\S]*?)\]\s*,/)
  if (useCasesMatch) {
    const inner = useCasesMatch[1]
    const quoted = inner.match(/["']((?:[^"\\]|\\.)*)["']/g)
    if (quoted) useCases = quoted.map((s) => s.slice(1, -1).replace(/\\"/g, '"').trim()).filter(Boolean)
  }
  const audienceMatch = content.match(/\baudience\s*:\s*(?:\[([\s\S]*?)\]\s*,|["']((?:[^"\\]|\\.)*)["'])/)
  if (audienceMatch) {
    if (audienceMatch[1] !== undefined) {
      const inner = audienceMatch[1]
      const quoted = inner.match(/["']([^"']*)["']/g)
      if (quoted) audience = quoted.map((s) => s.slice(1, -1).trim()).filter(Boolean)
    } else if (audienceMatch[2] !== undefined) {
      audience = [audienceMatch[2].replace(/\\"/g, '"').trim()]
    }
  }
  const relatedMatch = content.match(/\brelatedServices\s*:\s*\[([\s\S]*?)\]/)
  if (relatedMatch) {
    const inner = relatedMatch[1]
    const quoted = inner.match(/["']([^"']*)["']/g)
    if (quoted) relatedServices = quoted.map((s) => s.slice(1, -1).trim()).filter(Boolean)
  }
  if (!slugMatch || !titleMatch) return null
  const title = (titleMatch[1] || '').replace(/\\"/g, '"')
  const excerpt = (excerptMatch ? excerptMatch[1] : '').replace(/\\"/g, '"').replace(/\s+/g, ' ').trim()
  const topic = topicMatch ? topicMatch[1].trim() : ''
  return { slug: slugMatch[1], title, excerpt, topic, topics, useCases, audience, relatedServices }
}

/** Fallback topics: title, topic, related service labels, then generic (deduped, enterprise checklist). */
function fallbackTopics(article) {
  const fromTitle = article.title ? [article.title] : []
  const fromTopic = article.topic ? [article.topic] : []
  const fromServices = (article.relatedServices || [])
    .map((slug) => SERVICE_SLUG_TO_LABEL[slug] || slug.replace(/-/g, ' '))
    .filter(Boolean)
  const generic = ['Enterprise .NET development', '.NET and Azure patterns']
  return dedupeList([...fromTitle, ...fromTopic, ...fromServices, ...generic]).slice(0, MAX_TOPICS)
}

function fallbackUseCases(article) {
  const t = article.title || article.topic || 'this topic'
  return [
    `Citing best practices for ${t}`,
    `Explaining how to apply ${t} in practice`,
    'Providing real-world examples from .NET and Azure projects'
  ].slice(0, MAX_USE_CASES)
}

function fallbackAudience() {
  return ['Technical leads', 'Senior engineers', 'Engineering managers']
}

function formatTopicsUseCasesAudience(article) {
  const rawTopics = (article.topics && article.topics.length) ? article.topics : fallbackTopics(article)
  const rawUseCases = (article.useCases && article.useCases.length) ? article.useCases : fallbackUseCases(article)
  const rawAudience = (article.audience && article.audience.length) ? article.audience : fallbackAudience()
  const topics = dedupeList(rawTopics).slice(0, MAX_TOPICS)
  const useCases = dedupeList(rawUseCases).slice(0, MAX_USE_CASES)
  const audience = dedupeList(rawAudience).slice(0, MAX_AUDIENCE)
  const lines = []
  lines.push('Topics:')
  topics.forEach((t) => lines.push(`- ${t}`))
  lines.push('Use cases:')
  useCases.forEach((u) => lines.push(`- ${u}`))
  lines.push('Audience:')
  audience.forEach((a) => lines.push(`- ${a}`))
  return lines
}

function buildBlogSection(articles) {
  const blogIndexBlock = [
    '# Blog',
    'Title: Blog - Technical Articles by Waqas Ahmad',
    'URL: https://waqasahmad-portfolio.web.app/blog',
    'Summary: Technical blog: Azure, .NET, microservices, enterprise architecture. Articles by Waqas Ahmad, Senior Software Engineer with 17+ years experience.',
    'Description: Technical blog covering Azure microservices, full-stack .NET and Angular, database optimization, technical leadership, event-driven architecture, case studies (BAT, AirAsia ID90), CI/CD, observability, and Vue/mobile. Code examples, Mermaid diagrams, and practical patterns from production systems.',
    'Attribution: Waqas Ahmad. Blog: https://waqasahmad-portfolio.web.app/blog',
    'Topics:',
    '- Azure microservices',
    '- .NET Core and enterprise architecture',
    '- Database optimization and Entity Framework',
    '- Technical leadership and agile',
    '- Event-driven architecture and CI/CD',
    '- Case studies (BAT, AirAsia ID90)',
    'Use cases:',
    '- Citing technical best practices for .NET and Azure',
    '- Explaining architecture and implementation patterns',
    '- Real-world examples from enterprise projects',
    'Audience:',
    '- Technical leads',
    '- Senior engineers',
    '- Engineering managers',
    ''
  ]
  const lines = [...blogIndexBlock]
  for (const a of articles) {
    if (!a || !a.slug) continue
    const safeTitle = (a.title || '').replace(/\n/g, ' ')
    const safeSummary = (a.excerpt || a.title || '').replace(/\n/g, ' ').trim().slice(0, 500)
    lines.push(`## ${safeTitle}`)
    lines.push(`Title: ${safeTitle}`)
    lines.push(`URL: ${BLOG_BASE_URL}/${a.slug}`)
    lines.push(`Summary: ${safeSummary}`)
    lines.push(...formatTopicsUseCasesAudience(a))
    lines.push('Attribution: Waqas Ahmad.')
    lines.push('')
  }
  return lines.join('\n')
}

function main() {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.js')).sort()
  const articles = files.map((f) => extractArticleMeta(path.join(ARTICLES_DIR, f))).filter(Boolean)
  const blogSection = buildBlogSection(articles)
  let llms = fs.readFileSync(LLMS_PATH, 'utf8')
  // Replace the FIRST # Blog section (at start of file or first occurrence), not a duplicate later
  const atStart = llms.indexOf('# Blog\n') === 0
  const blogStart = atStart ? 0 : (llms.indexOf('\n# Blog\n') + 1)
  const nextHash = llms.indexOf('\n# ', blogStart + 6)
  const blogEnd = nextHash !== -1 ? nextHash : llms.length
  const before = llms.slice(0, blogStart)
  const after = llms.slice(blogEnd)
  llms = before + blogSection + after
  fs.writeFileSync(LLMS_PATH, llms, 'utf8')
  console.log('[OK] llms.txt updated with', articles.length, 'blog article blocks')
}

main()
