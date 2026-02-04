/**
 * Injects per-article blocks for all blog articles into public/llms.txt.
 * Reads article .js files, extracts slug/title/excerpt/keywords, and replaces the Blog section
 * with the index block plus 61 article blocks (Title, URL, Summary, Keywords) for AI engines.
 * Run before or as part of build; copy-llms-txt.js then copies public/llms.txt to dist.
 */

const fs = require('fs')
const path = require('path')

const ARTICLES_DIR = path.resolve(__dirname, '../src/config/blog/articles')
const LLMS_PATH = path.resolve(__dirname, '../public/llms.txt')
const BLOG_BASE_URL = 'https://waqasahmad-portfolio.web.app/blog'

function extractArticleMeta(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const slugMatch = content.match(/\bslug\s*:\s*["']([^"']+)["']/)
  const titleMatch = content.match(/\btitle\s*:\s*["']((?:[^"\\]|\\.)*)["']/)
  const excerptMatch = content.match(/\bexcerpt\s*:\s*["']((?:[^"\\]|\\.)*)["']/)
  let keywords = []
  const kwArrayMatch = content.match(/\bkeywords\s*:\s*\[([\s\S]*?)\]\s*,/)
  if (kwArrayMatch) {
    const inner = kwArrayMatch[1]
    const quoted = inner.match(/["']([^"']*)["']/g)
    if (quoted) keywords = quoted.map((s) => s.slice(1, -1))
  }
  if (!slugMatch || !titleMatch) return null
  const title = (titleMatch[1] || '').replace(/\\"/g, '"')
  const excerpt = (excerptMatch ? excerptMatch[1] : '').replace(/\\"/g, '"').replace(/\s+/g, ' ').trim()
  return { slug: slugMatch[1], title, excerpt, keywords }
}

function buildBlogSection(articles) {
  const lines = [
    '# Blog',
    'Title: Blog - Technical Articles by Waqas Ahmad',
    'URL: https://waqasahmad-portfolio.web.app/blog',
    'Summary: Technical blog: Azure, .NET, microservices, enterprise architecture. Articles by Waqas Ahmad, Senior Software Engineer with 17+ years experience.',
    'Description: Technical blog covering Azure microservices, full-stack .NET and Angular, database optimization, technical leadership, event-driven architecture, case studies (BAT, AirAsia ID90), CI/CD, observability, and Vue/mobile. Code examples, Mermaid diagrams, and practical patterns from production systems.',
    'Attribution: Waqas Ahmad. Blog: https://waqasahmad-portfolio.web.app/blog',
    'Keywords: Azure microservices, .NET Core, Entity Framework, Angular, Vue, technical leadership, agile, database optimization, Azure DevOps, observability, case study, enterprise architecture.',
    ''
  ]
  for (const a of articles) {
    if (!a || !a.slug) continue
    const safeTitle = (a.title || '').replace(/\n/g, ' ')
    const safeSummary = (a.excerpt || a.title || '').replace(/\n/g, ' ').trim().slice(0, 500)
    const kwStr = Array.isArray(a.keywords) && a.keywords.length ? a.keywords.slice(0, 30).join(', ') : ''
    lines.push(`## ${safeTitle}`)
    lines.push(`Title: ${safeTitle}`)
    lines.push(`URL: ${BLOG_BASE_URL}/${a.slug}`)
    lines.push(`Summary: ${safeSummary}`)
    if (kwStr) lines.push(`Keywords: ${kwStr}`)
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
  const blogStart = llms.indexOf('\n# Blog\n')
  const nextHash = llms.indexOf('\n# ', blogStart + 1)
  const blogEnd = nextHash !== -1 ? nextHash : llms.length
  const before = llms.slice(0, blogStart + 1)
  const after = llms.slice(blogEnd)
  llms = before + blogSection + after
  fs.writeFileSync(LLMS_PATH, llms, 'utf8')
  console.log('[OK] llms.txt updated with', articles.length, 'blog article blocks')
}

main()
