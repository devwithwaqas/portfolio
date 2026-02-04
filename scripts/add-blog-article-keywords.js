/**
 * Add keywords array to each blog article that doesn't have one.
 * Uses topic -> semantic-style terms; one run only (idempotent: skips if keywords already present).
 */

const fs = require('fs')
const path = require('path')

const ARTICLES_DIR = path.resolve(__dirname, '../src/config/blog/articles')

const TOPIC_KEYWORDS = {
  Cloud: ['Azure microservices', 'AKS', 'Azure Service Fabric', 'event-driven Azure', 'cloud architecture', 'Azure DevOps', '.NET Azure'],
  'Full-Stack': ['Full stack .NET', 'Angular Vue React', 'enterprise web apps', 'REST API', 'C# backend', 'frontend backend'],
  Data: ['Database optimization', 'SQL Server', 'Entity Framework', 'query performance', 'data modeling', 'Azure SQL'],
  Leadership: ['Technical leadership', 'code review', 'team mentoring', 'agile delivery', 'remote teams', 'engineering leadership'],
  Mobile: ['Mobile development', 'iOS Android', 'React Native', 'cross-platform', 'mobile architecture', 'Vue Capacitor'],
  Architecture: ['Software architecture', 'design patterns', 'clean architecture', 'DDD', 'SOLID', 'enterprise patterns', 'AI coding tools']
}

function getKeywordsForTopic(topic, title) {
  const list = TOPIC_KEYWORDS[topic] || ['blog', 'technical article', 'software engineering']
  const titleShort = title.length > 50 ? title.slice(0, 47) + '...' : title
  return [titleShort, topic, ...list].slice(0, 12)
}

function addKeywordsToFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  if (/^\s*keywords\s*:/m.test(content)) return false
  const topicMatch = content.match(/\btopic\s*:\s*["']([^"']+)["']\s*,/)
  const titleMatch = content.match(/\btitle\s*:\s*["']([^"']+)["']\s*,/)
  const topic = topicMatch ? topicMatch[1] : 'Architecture'
  const title = titleMatch ? titleMatch[1] : 'Blog article'
  const keywords = getKeywordsForTopic(topic, title)
  const keywordsLine = '  keywords: [' + keywords.map(k => JSON.stringify(k)).join(', ') + '],'
  const insertAfter = topicMatch ? topicMatch[0] : '  topic: "Architecture",'
  const newContent = content.replace(insertAfter, insertAfter + '\n' + keywordsLine)
  if (newContent === content) return false
  fs.writeFileSync(filePath, newContent, 'utf8')
  return true
}

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.js'))
let added = 0
files.forEach(f => {
  const full = path.join(ARTICLES_DIR, f)
  if (addKeywordsToFile(full)) {
    added++
    console.log('Added keywords:', f)
  }
})
console.log('Done. Added keywords to', added, 'of', files.length, 'articles.')
