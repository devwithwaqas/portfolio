/**
 * Verify all IndexNow/sitemap URLs are allowed for indexing (robots + fetch 200).
 * Reads URL list from dist/sitemap.xml so it stays in sync with generate-sitemap and submit-bing.
 * Run after build: node scripts/verify-urls-indexing.js
 */

const path = require('path')
const fs = require('fs')

function robotsAllowed(pathname) {
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return false
  return true
}

async function main() {
  const sitemapPath = path.resolve(__dirname, '../dist/sitemap.xml')
  if (!fs.existsSync(sitemapPath)) {
    console.log('dist/sitemap.xml not found. Run build first (e.g. npm run build:firebase).')
    process.exit(1)
  }

  const xml = fs.readFileSync(sitemapPath, 'utf8')
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'))

  console.log('Verify URLs for indexing (robots + fetch)')
  console.log('====================================================')
  console.log(`Sitemap: ${urls.length} URLs`)
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
  console.log('All sitemap URLs allowed by robots and return 200.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
