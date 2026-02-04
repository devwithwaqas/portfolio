const fs = require('fs')
const path = require('path')
const dir = path.join(__dirname, '../src/config/blog/articles')

const aiSlugs = [
  'current-state-ai-coding-tools-2026',
  'cursor-vs-claude-code-vs-copilot-ai-ide',
  'developers-integrating-ai-daily-workflows',
  'where-ai-fails-real-world-software-development',
  'trade-offs-ai-code-generation',
  'ai-changing-code-review-testing',
  'why-ai-productivity-gains-plateau',
  'ai-ides-what-they-get-right-wrong',
  'impact-ai-tools-code-quality-maintainability',
  'what-developers-want-from-ai-assistants'
]

let total = 0
for (const slug of aiSlugs) {
  const file = path.join(dir, slug + '.js')
  const code = fs.readFileSync(file, 'utf8')
  const tick = '`'
  const startMarker = 'content: ' + tick
  const start = code.indexOf(startMarker)
  if (start === -1) {
    console.log('   ???  ' + slug + ' (no content marker)')
    continue
  }
  const contentStart = start + startMarker.length
  const endMarker = tick + ',\n  faqs:'
  const end = code.indexOf(endMarker, contentStart)
  const content = end > contentStart ? code.slice(contentStart, end) : code.slice(contentStart)
  const words = content.replace(/[#*\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length
  total += words
  console.log(String(words).padStart(6) + '  ' + slug)
}
console.log('------')
console.log('Total: ' + total)
console.log('Target per article: 10000+')
console.log('Short (under 4000): need expansion')
