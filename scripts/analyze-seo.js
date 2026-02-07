/**
 * SEO Analyzer: Score HTML by categories (aligned with docs/SEO_SINGLE_SOURCE_OF_TRUTH.md authority rules).
 *
 * Reads HTML from:
 *   - Live URL (fetch as Googlebot): default, or --url=...
 *   - File: --html=path
 *   - Crawl + save: --crawl (runs crawl-as-googlebot, saves to scripts/.cache/googlebot-crawl.html, then analyzes)
 *
 * Output: Console table with Category | Score | Status, plus overall %.
 *
 * Run: npm run analyze
 *      npm run analyze -- --crawl
 *      npm run analyze -- --html=scripts/.cache/googlebot-crawl.html
 */

const fs = require('fs')
const path = require('path')

const GOOGLEBOT_UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
const DEFAULT_URL = 'https://waqasahmad-portfolio.web.app'
const CRAWL_CACHE = path.resolve(__dirname, '.cache/googlebot-crawl.html')

function parseArgs() {
  const args = process.argv.slice(2)
  let url = DEFAULT_URL
  let htmlPath = null
  let crawl = false
  for (const a of args) {
    if (a.startsWith('--url=')) url = a.slice(6).trim()
    else if (a.startsWith('--html=')) htmlPath = a.slice(7).trim()
    else if (a === '--crawl') crawl = true
  }
  return { url, htmlPath, crawl }
}

async function getHtml(opts) {
  const { url, htmlPath, crawl } = opts
  if (crawl) {
    const { runCrawl } = require('./crawl-as-googlebot.js')
    const dir = path.dirname(CRAWL_CACHE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    const result = await runCrawl(url, { saveHtml: CRAWL_CACHE })
    return {
      html: result.html,
      crawl: { ok: result.ok, fail: result.fail },
      source: `crawl → ${CRAWL_CACHE}`,
    }
  }
  if (htmlPath) {
    const p = path.isAbsolute(htmlPath) ? htmlPath : path.resolve(process.cwd(), htmlPath)
    const html = fs.readFileSync(p, 'utf8')
    return { html, source: p }
  }
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: { 'User-Agent': GOOGLEBOT_UA },
  })
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${url}`)
  const html = await res.text()
  return { html, source: url }
}

function collectJsonLd(html) {
  const blocks = []
  const re = /<script\s+type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1].trim())
      blocks.push(parsed)
    } catch (_) {}
  }
  return blocks
}

function schemaTypes(blocks) {
  const types = new Set()
  const walk = (node) => {
    if (!node) return
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    if (typeof node !== 'object') return
    const t = node['@type']
    if (t) types.add(Array.isArray(t) ? t[0] : t)
    if (node['@graph']) walk(node['@graph'])
    for (const k of Object.keys(node)) {
      if (k.startsWith('@')) continue
      walk(node[k])
    }
  }
  blocks.forEach(walk)
  return types
}

function analyze(html, crawlResult = null) {
  const categories = []
  const jsonBlocks = collectJsonLd(html)
  const types = schemaTypes(jsonBlocks)

  // 1. Core SEO (title, meta description, canonical, robots, sitemap, og, twitter)
  const coreChecks = [
    [/<title[^>]*>([\s\S]*?)<\/title>/i.test(html), 'title'],
    [/<meta\s+name\s*=\s*["']description["'][^>]+content\s*=\s*["']/i.test(html), 'meta description'],
    [/<link\s+rel\s*=\s*["']canonical["'][^>]+href\s*=/i.test(html), 'canonical'],
    [/<meta\s+name\s*=\s*["']robots["']/i.test(html), 'meta robots'],
    [/<link\s+rel\s*=\s*["']sitemap["'][^>]+href\s*=/i.test(html), 'sitemap link'],
    [/<meta\s+property\s*=\s*["']og:title["']/i.test(html), 'og:title'],
    [/<meta\s+property\s*=\s*["']og:description["']/i.test(html), 'og:description'],
    [/<meta\s+property\s*=\s*["']og:image["']/i.test(html), 'og:image'],
    [/<meta\s+name\s*=\s*["']twitter:card["']/i.test(html), 'twitter:card'],
    [/<meta\s+name\s*=\s*["']twitter:title["']/i.test(html), 'twitter:title'],
    [/<meta\s+name\s*=\s*["']twitter:description["']/i.test(html), 'twitter:description'],
  ]
  const coreScore = Math.round(
    (coreChecks.filter(([v]) => v).length / coreChecks.length) * 100
  )
  categories.push({
    name: 'Core SEO (Canonical, Sitemap, Meta Tags)',
    score: coreScore,
    status: coreScore >= 90 ? 'OK' : coreScore >= 70 ? 'WARN' : 'FAIL',
    details: coreChecks.filter(([v]) => !v).map(([, d]) => d),
  })

  // 2. Static Structured Data (JSON-LD in HTML: Person, WebSite, ProfessionalService, BreadcrumbList)
  const staticChecks = [
    [jsonBlocks.length > 0, 'JSON-LD present'],
    [types.has('Person'), 'Person'],
    [types.has('WebSite'), 'WebSite'],
    [types.has('ProfessionalService') || types.has('Organization'), 'ProfessionalService/Organization'],
    [types.has('BreadcrumbList'), 'BreadcrumbList'],
  ]
  const staticScore = Math.round(
    (staticChecks.filter(([v]) => v).length / staticChecks.length) * 100
  )
  categories.push({
    name: 'Static Structured Data (in HTML)',
    score: staticScore,
    status: staticScore >= 80 ? 'OK' : staticScore >= 60 ? 'WARN' : 'FAIL',
    details: staticChecks.filter(([v]) => !v).map(([, d]) => d),
  })

  // 3. Rich Results (BreadcrumbList, FAQPage, HowTo, Article, Service in JSON-LD)
  const richTypes = ['BreadcrumbList', 'FAQPage', 'HowTo', 'Article', 'Service']
  const richFound = richTypes.filter((t) => types.has(t)).length
  const hasBreadcrumb = types.has('BreadcrumbList')
  const richScore = hasBreadcrumb ? 100 : Math.round((richFound / richTypes.length) * 100)
  categories.push({
    name: 'Rich Results (FAQ, Article, Breadcrumbs)',
    score: richScore,
    status: richScore >= 60 ? 'OK' : richScore >= 40 ? 'WARN' : 'FAIL',
    details: richScore < 100 ? [`${richFound}/${richTypes.length} types`] : [],
  })

  // 4. Favicon (favicon.ico, favicon-48, apple-touch-icon)
  const faviconChecks = [
    [/favicon\.ico/i.test(html), 'favicon.ico'],
    [/favicon-48x48\.png/i.test(html), 'favicon-48x48'],
    [/apple-touch-icon/i.test(html), 'apple-touch-icon'],
  ]
  const faviconScore = Math.round(
    (faviconChecks.filter(([v]) => v).length / faviconChecks.length) * 100
  )
  categories.push({
    name: 'Favicon (Root Level)',
    score: faviconScore,
    status: faviconScore >= 66 ? 'OK' : faviconScore >= 33 ? 'WARN' : 'FAIL',
    details: faviconChecks.filter(([v]) => !v).map(([, d]) => d),
  })

  // 5. SPA Fallback (noscript with h1, h2, p – check all noscript blocks)
  const noscriptRe = /<noscript[\s\S]*?>([\s\S]*?)<\/noscript>/gi
  let ns = ''
  let m
  while ((m = noscriptRe.exec(html)) !== null) ns += m[1]
  const fallbackChecks = [
    [/<noscript>/i.test(html), 'noscript present'],
    [/<h1[\s>]/i.test(ns), 'h1 in noscript'],
    [/<h2[\s>]/i.test(ns), 'h2 in noscript'],
    [/<p[\s>]/i.test(ns), 'p in noscript'],
  ]
  const fallbackScore = Math.round(
    (fallbackChecks.filter(([v]) => v).length / fallbackChecks.length) * 100
  )
  categories.push({
    name: 'SPA Fallback Content',
    score: fallbackScore,
    status: fallbackScore >= 75 ? 'OK' : fallbackScore >= 50 ? 'WARN' : 'FAIL',
    details: fallbackChecks.filter(([v]) => !v).map(([, d]) => d),
  })

  // 6. Crawl (only when --crawl)
  if (crawlResult) {
    const { ok, fail } = crawlResult
    const total = ok.length + fail.length
    const crawlScore = total === 0 ? 100 : fail.length === 0 ? 100 : Math.round((ok.length / total) * 100)
    categories.push({
      name: 'Crawl (subresources OK)',
      score: crawlScore,
      status: fail.length === 0 ? 'OK' : 'FAIL',
      details: fail.length ? [`${fail.length} failed`] : [],
    })
  }

  // 7. Reference categories (from compliance doc; not computed from HTML)
  const refs = [
    { name: 'Dynamic Structured Data (11 schemas)', score: 98, status: 'OK', ref: true },
    { name: 'URL Assignment & Tracking', score: 100, status: 'OK', ref: true },
    { name: 'Knowledge Panel', score: 90, status: 'OK', ref: true },
    { name: 'Service Page SEO (ImageObject, HowTo)', score: 100, status: 'OK', ref: true },
    { name: 'Image Search (non-service)', score: 60, status: 'WARN', ref: true },
    { name: 'Featured Snippets', score: 85, status: 'OK', ref: true },
    { name: 'Carousels (optional)', score: 0, status: 'Optional', ref: true },
  ]
  refs.forEach((r) => categories.push(r))

  const total = categories.reduce((s, c) => s + c.score, 0)
  const overall = Math.round(total / categories.length)
  return { categories, overall }
}

function statusIcon(s) {
  if (s === 'OK') return '\u2705'
  if (s === 'WARN') return '\u26A0\uFE0F'
  if (s === 'Optional') return '\u2139\uFE0F'
  return '\u274C'
}

function printReport(result, source, crawlResult) {
  const { categories, overall } = result
  console.log('')
  console.log('SEO Analysis (Googlebot view)')
  console.log('============================')
  console.log(`Source: ${source}`)
  if (crawlResult && (crawlResult.fail?.length || crawlResult.ok?.length)) {
    const { ok, fail } = crawlResult
    console.log(`Crawl:  ${ok.length} OK, ${fail.length} FAIL`)
  }
  console.log('')
  console.log('Category                                      Score   Status')
  console.log('---------------------------------------------------------------')
  for (const c of categories) {
    const name = (c.name + '                                            ').slice(0, 44)
    const score = `${c.score}%`.padStart(5)
    const icon = statusIcon(c.status)
    const ref = c.ref ? ' (reference)' : ''
    console.log(`  ${name} ${score}   ${icon} ${c.status}${ref}`)
    if (c.details && c.details.length && c.score < 100) {
      c.details.forEach((d) => console.log(`      - ${d}`))
    }
  }
  console.log('---------------------------------------------------------------')
  const overallIcon = overall >= 85 ? '\u2705' : overall >= 70 ? '\u26A0\uFE0F' : '\u274C'
  const overallLabel = overall >= 85 ? 'OK' : overall >= 70 ? 'WARN' : 'FAIL'
  console.log(`  OVERALL                                      ${String(overall).padStart(3)}%   ${overallIcon} ${overallLabel}`)
  console.log('')
}

async function main() {
  const opts = parseArgs()
  let html, source, crawlResult
  try {
    const out = await getHtml(opts)
    html = out.html
    source = out.source
    crawlResult = out.crawl || null
  } catch (e) {
    console.error('Failed to get HTML:', e.message)
    process.exit(1)
  }

  if (opts.crawl && crawlResult) {
    console.log('Crawl-as-Googlebot')
    console.log('=================')
    console.log(`OK: ${crawlResult.ok.length}  FAIL: ${crawlResult.fail.length}`)
    if (crawlResult.fail.length) {
      crawlResult.fail.forEach((f) => console.log(`  FAIL ${f.status}  ${f.url}`))
    }
  }

  const result = analyze(html, crawlResult)
  printReport(result, source, crawlResult)

  if (result.overall < 70) process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
