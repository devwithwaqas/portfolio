/**
 * Lists blog articles that still need authority content:
 * - With placeholder: have "I take a clear stance on when and how to apply"
 * - Missing bodies: have TOC link to Decision Context but no "## Decision Context" in content
 */

const fs = require('fs')
const path = require('path')

const ARTICLES_DIR = path.resolve(__dirname, '../src/config/blog/articles')

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.js')).sort()

const withPlaceholder = []
const missingBodies = []

for (const f of files) {
  const content = fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf8')
  if (content.includes('I take a clear stance on when and how to apply')) {
    withPlaceholder.push(f)
  }
  if (content.includes('[Decision Context](#decision-context)') && !content.includes('## Decision Context')) {
    missingBodies.push(f)
  }
}

console.log('Articles that still have generic placeholder (replace with topic-specific content):')
console.log(withPlaceholder.length)
withPlaceholder.forEach(f => console.log('  ', f))

console.log('\nArticles that have TOC link but no section bodies (insert full authority block + craft content):')
console.log(missingBodies.length)
missingBodies.forEach(f => console.log('  ', f))

console.log('\nTotal remaining:', withPlaceholder.length + missingBodies.length)
