/**
 * One-off: parse docs/SEO_KEYWORDS_UPGRADE.md and emit src/config/seoKeywords.js
 * Run: node scripts/generate-seo-keywords-config.js
 */
const fs = require('fs')
const path = require('path')

const docPath = path.join(__dirname, '..', 'docs', 'SEO_KEYWORDS_UPGRADE.md')
const outPath = path.join(__dirname, '..', 'src', 'config', 'seoKeywords.js')

const md = fs.readFileSync(docPath, 'utf8')
const blocks = []
const re = /```json\s*([\s\S]*?)```/g
let m
while ((m = re.exec(md)) !== null) {
  try {
    const obj = JSON.parse(m[1].trim())
    blocks.push(obj)
  } catch (e) {
    console.warn('Skip invalid JSON block:', e.message)
  }
}

const SEO_KEYWORDS = {}
for (const b of blocks) {
  let key = b.url
  if (!key) continue
  if (!key.startsWith('/')) key = '/blog/' + key
  SEO_KEYWORDS[key] = {
    primary: b.primary || '',
    secondary: Array.isArray(b.secondary) ? b.secondary : [],
    semantic: Array.isArray(b.semantic) ? b.semantic : []
  }
}

const header = `/**
 * SEO keywords by path — source: docs/SEO_KEYWORDS_UPGRADE.md (Format B).
 * primary (1) + secondary (6–8) + semantic (6–8). Meta: primary first, then secondary + semantic, max 8.
 */
const MAX_META_KEYWORDS = 8

export const SEO_KEYWORDS = `
const footer = `

/**
 * @param {string} path - Route path (e.g. '/', '/blog', '/blog/agile-delivery-enterprise-constraints', '/projects/heat-exchanger')
 * @returns {string[]} Up to 8 keywords for meta name="keywords"
 */
export function getMetaKeywords(pathKey) {
  if (!pathKey || typeof pathKey !== 'string') return []
  const normalized = pathKey.replace(/\\/$/, '') || '/'
  const set = SEO_KEYWORDS[normalized]
  if (!set) return []
  const combined = [
    set.primary,
    ...(set.secondary || []),
    ...(set.semantic || [])
  ].filter(Boolean)
  return combined.slice(0, MAX_META_KEYWORDS)
}
`

function escapeForJS(obj) {
  return JSON.stringify(obj, null, 2)
    .replace(/\n/g, '\n  ')
    .replace(/^  /, '')
}

const body = escapeForJS(SEO_KEYWORDS)
const full = header + body + footer
fs.writeFileSync(outPath, full, 'utf8')
console.log('Wrote', outPath, 'with', Object.keys(SEO_KEYWORDS).length, 'paths')
