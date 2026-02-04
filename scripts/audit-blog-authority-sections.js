/**
 * Audit all blog articles for authority-style content:
 * - "What Most Guides Miss" (and similar: what most people ignore, critical fact often missed)
 * - "Trade-Offs & Failure Modes" / mistakes / pitfalls
 * - Substance: word count and whether content is specific (not generic placeholder)
 *
 * Run: node scripts/audit-blog-authority-sections.js
 */

const fs = require('fs')
const path = require('path')

const ARTICLES_DIR = path.resolve(__dirname, '../src/config/blog/articles')

function extractSection(content, sectionTitle) {
  // Match ## Section Title or ## Section Title (with optional subsections)
  const escaped = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`^##\\s+${escaped}\\s*$`, 'im')
  const match = content.match(regex)
  if (!match) return null
  const start = match.index + match[0].length
  // Find next ## at start of line (not ###)
  const rest = content.slice(start)
  const nextH2 = rest.match(/\n##\s+/)
  const end = nextH2 ? nextH2.index : rest.length
  return rest.slice(0, end).trim()
}

function wordCount(text) {
  if (!text || !text.trim()) return 0
  return text.trim().split(/\s+/).length
}

function hasMistakesPitfallsLanguage(text) {
  if (!text) return false
  const lower = text.toLowerCase()
  const patterns = [
    /common\s+mistakes?/i,
    /mistakes?\s+(people|developers|teams)\s+make/i,
    /failure\s+modes?/i,
    /pitfalls?/i,
    /what\s+goes\s+wrong/i,
    /often\s+get\s+wrong/i,
    /wrong\s+column\s+order/i,
    /early\s+warning\s+signs/i,
    /how\s+it\s+fails/i,
    /where\s+it\s+degrades/i,
    /misapplied/i,
    /common\s+(issues?|errors?)/i
  ]
  return patterns.some(p => p.test(lower))
}

function hasWhatMostIgnoreLanguage(text) {
  if (!text) return false
  const lower = text.toLowerCase()
  const patterns = [
    /what\s+most\s+guides\s+miss/i,
    /most\s+(guides|people)\s+(ignore|miss|overlook)/i,
    /often\s+ignored/i,
    /commonly\s+missed/i,
    /critical.*(miss|ignore)/i,
    /gap:?\s+/i,
    /the\s+hard\s+part\s+is/i,
    /don'?t\s+stress?\s+/i,
    /rarely\s+(tied|mentioned)/i
  ]
  return patterns.some(p => p.test(lower))
}

function isSubstantive(text, minWords = 25) {
  if (!text || wordCount(text) < minWords) return false
  // Reject if it's mostly generic (e.g. "Use X when Y. Avoid Z when W." with no specifics)
  const hasSpecifics = /\b(column order|INCLUDE|statistics|key lookup|dependency rule|DI registration|interface|DbContext|seek|scan)\b/i.test(text) ||
    /\d+\s*(files|layers|endpoints|columns)/i.test(text) ||
    /(e\.g\.|for example|i\.e\.|such as)\s+/i.test(text) ||
    /\[.*\]\(\/blog\/.*\)/.test(text) // internal link
  return hasSpecifics || wordCount(text) >= 60
}

function getDedicatedMistakesSection(content) {
  // Check for a ## Common mistakes or ## Pitfalls in the main body (before authority block)
  const beforeAuthority = content.split(/##\s+Decision Context\b/i)[0] || content
  const hasCommonMistakes = /##\s+Common\s+mistakes?/i.test(beforeAuthority) || /##\s+Pitfalls?/i.test(beforeAuthority)
  const hasMistakesInBody = /(common\s+mistakes?|pitfalls?|what\s+goes\s+wrong)/i.test(beforeAuthority)
  return { hasDedicatedSection: hasCommonMistakes, hasMistakesLanguage: hasMistakesInBody }
}

function auditArticle(filePath) {
  const slug = path.basename(filePath, '.js')
  const raw = fs.readFileSync(filePath, 'utf8')
  // Extract content from export default { ... content: `...` }
  const contentMatch = raw.match(/content:\s*`([\s\S]*?)`\s*,?\s*(?:author|faqs|relatedServices)/m) ||
    raw.match(/content:\s*`([\s\S]*?)`\s*}/m)
  const content = contentMatch ? contentMatch[1] : ''

  const wmgm = extractSection(content, 'What Most Guides Miss')
  const tradeOffs = extractSection(content, 'Trade-Offs & Failure Modes')

  const wmgmWords = wordCount(wmgm)
  const tradeOffsWords = wordCount(tradeOffs)

  const hasWmgm = !!wmgm && wmgmWords > 0
  const hasTradeOffs = !!tradeOffs && tradeOffsWords > 0
  const wmgmSubstantive = isSubstantive(wmgm)
  const tradeOffsSubstantive = isSubstantive(tradeOffs)
  const wmgmHasIgnoreLanguage = hasWhatMostIgnoreLanguage(wmgm)
  const tradeOffsHasMistakesLanguage = hasMistakesPitfallsLanguage(tradeOffs)
  const bodyMistakes = getDedicatedMistakesSection(content)

  return {
    slug,
    hasWmgm,
    wmgmWords,
    wmgmSubstantive,
    wmgmHasIgnoreLanguage,
    hasTradeOffs,
    tradeOffsWords,
    tradeOffsSubstantive,
    tradeOffsHasMistakesLanguage,
    bodyHasDedicatedMistakesSection: bodyMistakes.hasDedicatedSection,
    bodyHasMistakesLanguage: bodyMistakes.hasMistakesLanguage,
    // Overall authority strength for "important thing people ignore" + "mistakes"
    hasBothSections: hasWmgm && hasTradeOffs,
    bothSubstantive: wmgmSubstantive && tradeOffsSubstantive
  }
}

function run() {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.js'))
  const results = files.map(f => auditArticle(path.join(ARTICLES_DIR, f)))

  const out = []
  out.push('# Blog authority sections audit')
  out.push('')
  out.push('**Criteria:**')
  out.push('- **What Most Guides Miss** = section exists, has substance (specific facts, not generic), uses “what most ignore/miss” type language.')
  out.push('- **Trade-Offs & Failure Modes** = section exists, has substance, covers mistakes/failure modes/pitfalls.')
  out.push('- **Dedicated “Common mistakes” in body** = article has a ## Common mistakes or ## Pitfalls section in main content (not only in authority block).')
  out.push('')
  out.push('| # | Slug | WMGM present | WMGM words | WMGM substantive | Trade-offs present | Trade-offs words | Trade-offs substantive | Body has “mistakes” section? | Status |')
  out.push('|---|------|--------------|------------|------------------|--------------------|------------------|------------------------|------------------------------|--------|')

  let missingWmgm = 0
  let missingTradeOffs = 0
  let weakWmgm = 0
  let weakTradeOffs = 0
  let noBodyMistakes = 0

  results.forEach((r, i) => {
    const status = []
    if (!r.hasWmgm) { status.push('no WMGM'); missingWmgm++ }
    else if (!r.wmgmSubstantive) { status.push('WMGM thin'); weakWmgm++ }
    if (!r.hasTradeOffs) { status.push('no Trade-offs'); missingTradeOffs++ }
    else if (!r.tradeOffsSubstantive) { status.push('Trade-offs thin'); weakTradeOffs++ }
    if (!r.bodyHasDedicatedMistakesSection && !r.bodyHasMistakesLanguage) noBodyMistakes++
    const statusStr = status.length ? status.join('; ') : (r.bothSubstantive ? 'OK' : 'review')
    out.push(`| ${i + 1} | ${r.slug} | ${r.hasWmgm ? '✓' : '—'} | ${r.wmgmWords} | ${r.wmgmSubstantive ? '✓' : '—'} | ${r.hasTradeOffs ? '✓' : '—'} | ${r.tradeOffsWords} | ${r.tradeOffsSubstantive ? '✓' : '—'} | ${r.bodyHasDedicatedMistakesSection ? '✓' : (r.bodyHasMistakesLanguage ? 'partial' : '—')} | ${statusStr} |`)
  })

  out.push('')
  out.push('## Summary')
  out.push('')
  out.push(`- **Total articles:** ${results.length}`)
  out.push(`- **Missing "What Most Guides Miss" section:** ${missingWmgm}`)
  out.push(`- **Missing "Trade-Offs & Failure Modes" section:** ${missingTradeOffs}`)
  out.push(`- **WMGM present but thin (< ~25 words or not specific):** ${weakWmgm}`)
  out.push(`- **Trade-offs present but thin:** ${weakTradeOffs}`)
  out.push(`- **No dedicated "Common mistakes" / "Pitfalls" in body (and no such language):** ${noBodyMistakes}`)
  out.push('')
  out.push('## Recommendations')
  out.push('')
  const needWmgm = results.filter(r => !r.hasWmgm || !r.wmgmSubstantive)
  const needTradeOffs = results.filter(r => !r.hasTradeOffs || !r.tradeOffsSubstantive)
  if (needWmgm.length) {
    out.push('### Add or strengthen "What Most Guides Miss"')
    out.push('Articles where WMGM is missing or thin (add 1–3 specific facts that most guides ignore):')
    needWmgm.forEach(r => out.push(`- \`${r.slug}\` (${r.wmgmWords} words)`))
    out.push('')
  }
  if (needTradeOffs.length) {
    out.push('### Add or strengthen "Trade-Offs & Failure Modes"')
    out.push('Articles where Trade-offs is missing or thin (add what goes wrong, early warning signs, misapplication):')
    needTradeOffs.forEach(r => out.push(`- \`${r.slug}\` (${r.tradeOffsWords} words)`))
    out.push('')
  }
  const noMistakes = results.filter(r => !r.bodyHasDedicatedMistakesSection && !r.bodyHasMistakesLanguage)
  if (noMistakes.length > 0 && noMistakes.length <= 30) {
    out.push('### Consider adding "Common mistakes" or "Pitfalls" in body')
    out.push('Articles with no dedicated mistakes/pitfalls section in main content (authority block only):')
    noMistakes.forEach(r => out.push(`- \`${r.slug}\``))
  }

  const reportPath = path.resolve(__dirname, '../docs/BLOG_AUTHORITY_SECTIONS_AUDIT.md')
  fs.writeFileSync(reportPath, out.join('\n'), 'utf8')
  console.log('Wrote', reportPath)
  console.log('Summary:', { missingWmgm, missingTradeOffs, weakWmgm, weakTradeOffs, noBodyMistakes })
}

run()
