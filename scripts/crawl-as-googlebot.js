/**
 * Crawl-as-Googlebot: Simulate Google's crawl of the live site
 *
 * 1. Fetches the main page with Googlebot User-Agent (no JS execution).
 * 2. Parses HTML for all subresources: link[href], script[src], img[src], source[src],
 *    preload fonts, etc.
 * 3. Fetches each same-origin URL with Googlebot UA.
 * 4. Explicitly checks llms.txt, robots.txt, sitemap.xml, favicon.ico, site.webmanifest.
 *
 * Use this to catch "Other error"–style issues (404s, blocked resources) before
 * Google recrawls. Run: node scripts/crawl-as-googlebot.js [baseUrl] [--save-html=path]
 *
 * Example: node scripts/crawl-as-googlebot.js https://waqasahmad-portfolio.web.app
 * Example: node scripts/crawl-as-googlebot.js --save-html=scripts/.cache/googlebot-crawl.html
 */

const fs = require('fs')
const path = require('path')

const GOOGLEBOT_UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

const DEFAULT_BASE = 'https://waqasahmad-portfolio.web.app'

const CRITICAL_PATHS = [
  '/',
  '/llms.txt',
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
  '/favicon-48x48.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/site.webmanifest',
]

function resolveUrl(href, baseOrigin) {
  if (!href || href.startsWith('#')) return null
  try {
    const u = new URL(href, baseOrigin)
    return u.origin === baseOrigin ? u.href : null
  } catch {
    return null
  }
}

function extractUrls(html, baseOrigin) {
  const seen = new Set()
  const push = (url) => {
    const resolved = resolveUrl(url, baseOrigin)
    if (resolved) seen.add(resolved)
  }

  const patterns = [
    /<link[^>]+href\s*=\s*["']([^"']+)["']/gi,
    /<script[^>]+src\s*=\s*["']([^"']+)["']/gi,
    /<img[^>]+src\s*=\s*["']([^"']+)["']/gi,
    /<source[^>]+src\s*=\s*["']([^"']+)["']/gi,
    /<link[^>]+imagesrcset\s*=\s*["']([^"']+)["']/gi,
  ]

  for (const re of patterns) {
    let m
    while ((m = re.exec(html)) !== null) {
      const v = m[1].trim().split(/\s+/)[0]
      if (v) push(v)
    }
  }

  const srcsetRe = /<[^>]+(?:srcset|imagesrcset)\s*=\s*["']([^"']+)["']/gi
  let srcsetM
  while ((srcsetM = srcsetRe.exec(html)) !== null) {
    const parts = srcsetM[1].split(/\s*,\s*/)
    for (const p of parts) {
      const url = p.trim().split(/\s+/)[0]
      if (url) push(url)
    }
  }

  return [...seen]
}

async function fetchAsGooglebot(url) {
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: { 'User-Agent': GOOGLEBOT_UA },
  })
  return { url, status: res.status, ok: res.ok, contentType: res.headers.get('content-type') || '' }
}

function typeLabel(url) {
  if (/\.(css|woff2?|ttf|eot)(\?|$)/i.test(url)) return 'Stylesheet/Font'
  if (/\.js(\?|$)/i.test(url)) return 'Script'
  if (/\.(jpg|jpeg|png|gif|webp|avif|ico|svg)(\?|$)/i.test(url)) return 'Image'
  if (/sitemap\.xml/i.test(url)) return 'Sitemap'
  if (/robots\.txt/i.test(url)) return 'robots.txt'
  if (/llms\.txt/i.test(url)) return 'llms.txt'
  if (/webmanifest/i.test(url)) return 'Manifest'
  if (/favicon/i.test(url)) return 'Favicon'
  return 'Page'
}

/**
 * Run crawl as Googlebot. Returns { html, ok, fail, baseOrigin }.
 * Optionally writes HTML to saveHtml path (absolute or relative to cwd).
 */
async function runCrawl(baseUrl = DEFAULT_BASE, opts = {}) {
  const { saveHtml } = opts
  const base = baseUrl.replace(/\/$/, '')
  const baseOrigin = new URL(base).origin

  const toFetch = new Set()
  for (const p of CRITICAL_PATHS) {
    toFetch.add(p === '/' ? base : `${base}${p}`)
  }

  const pageRes = await fetch(base, {
    method: 'GET',
    redirect: 'follow',
    headers: { 'User-Agent': GOOGLEBOT_UA },
  })
  if (!pageRes.ok) {
    throw new Error(`Page fetch failed: ${pageRes.status} ${base}`)
  }
  const html = await pageRes.text()

  const subresourceUrls = extractUrls(html, baseOrigin)
  subresourceUrls.forEach((u) => toFetch.add(u))

  const ok = []
  const fail = []
  const fetched = new Set()

  for (const url of toFetch) {
    if (fetched.has(url)) continue
    fetched.add(url)
    try {
      const r = await fetchAsGooglebot(url)
      const label = typeLabel(url)
      const short = url.replace(baseOrigin, '')
      if (r.ok) ok.push({ url: short, label })
      else fail.push({ url: short, status: r.status, label })
    } catch (e) {
      fail.push({
        url: url.replace(baseOrigin, ''),
        status: 'error',
        label: typeLabel(url),
        message: e.message,
      })
    }
  }

  if (saveHtml) {
    const out = path.isAbsolute(saveHtml) ? saveHtml : path.resolve(process.cwd(), saveHtml)
    const dir = path.dirname(out)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(out, html, 'utf8')
  }

  return { html, ok, fail, baseOrigin, base }
}

function parseArgs() {
  const args = process.argv.slice(2)
  let baseUrl = DEFAULT_BASE
  let saveHtml = null
  for (const a of args) {
    if (a.startsWith('--save-html=')) {
      saveHtml = a.slice('--save-html='.length).trim()
    } else if (!a.startsWith('--')) {
      baseUrl = a
    }
  }
  return { baseUrl, saveHtml }
}

async function main() {
  const { baseUrl, saveHtml } = parseArgs()
  const base = baseUrl.replace(/\/$/, '')
  const baseOrigin = new URL(base).origin

  console.log('Crawl-as-Googlebot')
  console.log('=================')
  console.log(`Base: ${base}`)
  console.log(`UA:   ${GOOGLEBOT_UA}`)
  if (saveHtml) console.log(`Save HTML: ${saveHtml}`)
  console.log('')

  let ok, fail
  try {
    const result = await runCrawl(baseUrl, { saveHtml })
    ok = result.ok
    fail = result.fail
  } catch (e) {
    console.error('Crawl failed:', e.message)
    process.exit(1)
  }

  const isCritical = (u) => {
    const p = u.replace(baseOrigin, '') || '/'
    return (
      p === '/' ||
      /\/llms\.txt|\/robots\.txt|\/sitemap\.xml|\/favicon|\/site\.webmanifest/.test(p)
    )
  }
  const all = [...ok, ...fail].map((x) => ({ ...x, fullUrl: baseOrigin + x.url }))
  const critical = [...new Map(all.filter((x) => isCritical(x.fullUrl)).map((x) => [x.url || '/', x])).values()]
  const subresources = all.filter((x) => !isCritical(x.fullUrl))

  console.log('Critical paths (llms.txt, robots, sitemap, favicon, manifest)')
  console.log('-------------------------------------------------------------')
  const seenCritical = new Set()
  for (const x of critical) {
    const display = x.url || '/'
    if (seenCritical.has(display)) continue
    seenCritical.add(display)
    const r = ok.some((o) => o.url === x.url) ? 'OK' : `FAIL ${fail.find((f) => f.url === x.url)?.status || '?'}`
    console.log(`  ${r.padEnd(8)} ${display}`)
  }

  console.log('')
  console.log('Subresources (CSS, JS, images, fonts)')
  console.log('--------------------------------------')
  for (const x of subresources) {
    const r = ok.some((o) => o.url === x.url) ? 'OK' : `FAIL ${fail.find((f) => f.url === x.url)?.status || '?'}`
    console.log(`  ${r.padEnd(8)} ${(x.label || typeLabel(x.fullUrl)).padEnd(18)} ${x.url}`)
  }

  console.log('')
  console.log('Summary')
  console.log('-------')
  console.log(`  OK:   ${ok.length}`)
  console.log(`  FAIL: ${fail.length}`)
  if (fail.length) {
    console.log('')
    console.log('Failed URLs (Googlebot would report "Other error" for these):')
    fail.forEach(({ url, status, label }) =>
      console.log(`  ${status}  ${label.padEnd(18)} ${url}`)
    )
    process.exit(1)
  }
  console.log('All crawled resources returned 200. No issues detected.')
}

const isMain = require.main === module
if (isMain) {
  main().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}

module.exports = { runCrawl, GOOGLEBOT_UA, DEFAULT_BASE }
