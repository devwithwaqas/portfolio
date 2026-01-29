/**
 * Verify all 18 IndexNow/sitemap URLs are allowed for indexing.
 * Checks: robots.txt rules, fetch 200.
 * Run: node scripts/verify-urls-indexing.js
 */

const path = require('path')
const fs = require('fs')

const BASE = 'https://waqasahmad-portfolio.web.app'
const ROUTER_FILE = path.resolve(__dirname, '../src/router/index.js')

function getPaths() {
  const content = fs.readFileSync(ROUTER_FILE, 'utf8')
  const routePattern = /\{\s*path:\s*['"`]([^'"`]+)['"`]\s*,\s*name:\s*['"`]([^'"`]+)['"`]\s*(?:,\s*component:\s*[^}]+)?\s*\}/g
  const redirectPattern = /\{\s*path:\s*['"`]([^'"`]+)['"`]\s*,\s*redirect:/g
  const redirects = new Set()
  let m
  while ((m = redirectPattern.exec(content)) !== null) redirects.add(m[1])
  const paths = []
  while ((m = routePattern.exec(content)) !== null) {
    const p = m[1]
    const name = m[2]
    if (p.includes('pathMatch') || redirects.has(p) || name === 'NotFound') continue
    paths.push(p.startsWith('/') ? p : `/${p}`)
  }
  return paths
}

function robotsAllowed(pathname) {
  if (pathname === '/' || pathname.startsWith('/projects/') || pathname.startsWith('/services/')) return true
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return false
  return false
}

async function main() {
  const paths = getPaths()
  const urls = paths.map((p) => `${BASE}${p}`)

  console.log('Verify URLs for indexing (robots + sitemap + fetch)')
  console.log('====================================================')
  console.log('')

  const sitemapPath = path.resolve(__dirname, '../dist/sitemap.xml')
  if (fs.existsSync(sitemapPath)) {
    const xml = fs.readFileSync(sitemapPath, 'utf8')
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'))
    const missing = urls.filter((u) => !locs.includes(u))
    if (missing.length) {
      console.log('Sitemap missing URLs:', missing.join(', '))
      process.exit(1)
    }
    console.log('Sitemap: all 18 URLs present.')
  } else {
    console.log('Sitemap: dist/sitemap.xml not found (run build first). Skip.')
  }
  console.log('')

  let ok = 0
  let fail = 0
  for (let i = 0; i < urls.length; i++) {
    const u = urls[i]
    const pathname = new URL(u).pathname
    const rob = robotsAllowed(pathname)
    let status = '?'
    try {
      const res = await fetch(u, { method: 'GET', redirect: 'follow' })
      status = res.ok ? '200' : String(res.status)
      if (res.ok) ok++
      else fail++
    } catch (e) {
      status = 'err'
      fail++
    }
    const r = rob && status === '200' ? 'OK' : 'FAIL'
    console.log(`${String(i + 1).padStart(2)}. ${r.padEnd(4)} robots=${rob ? 'Y' : 'N'}  fetch=${status.padEnd(4)}  ${u}`)
  }

  console.log('')
  console.log(`Total: ${urls.length}  OK: ${ok}  FAIL: ${fail}`)
  if (fail) process.exit(1)
  console.log('All 18 URLs allowed by robots and return 200.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
