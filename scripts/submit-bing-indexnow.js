/**
 * Submit URLs to Bing / IndexNow
 *
 * 1. Key file must be hosted at root: https://<site>/<key>.txt (see public/<key>.txt)
 * 2. POSTs urlList to Bing IndexNow; they verify ownership via keyLocation.
 *
 * Run after deploy: node scripts/submit-bing-indexnow.js [baseUrl]
 * Or: npm run submit-bing
 *
 * Verify in Bing Webmaster Tools: https://www.bing.com/webmasters
 */

const fs = require('fs')
const path = require('path')

const INDEXNOW_KEY = process.env.BING_INDEXNOW_KEY || 'cbe5cb9f88984691af7d581e94e409f6'
const BASE_URL = (process.env.FIREBASE_SITE_URL || process.env.VITE_FIREBASE_SITE_URL || 'https://waqasahmad-portfolio.web.app').replace(/\/$/, '')
const KEY_FILE = `${INDEXNOW_KEY}.txt`
const KEY_LOCATION = `${BASE_URL}/${KEY_FILE}`
const BING_ENDPOINT = 'https://www.bing.com/indexnow'

const ROUTER_FILE = path.resolve(__dirname, '../src/router/index.js')

function extractPathsFromRouter() {
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

function getUrlList() {
  const paths = extractPathsFromRouter()
  return paths.map((p) => `${BASE_URL}${p}`)
}

async function submit() {
  const urlList = getUrlList()
  const host = new URL(BASE_URL).hostname
  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }

  console.log('Bing / IndexNow URL Submission')
  console.log('==============================')
  console.log(`Key:        ${INDEXNOW_KEY}`)
  console.log(`Key file:   ${KEY_LOCATION}`)
  console.log(`Endpoint:   ${BING_ENDPOINT}`)
  console.log(`URLs:       ${urlList.length}`)
  console.log('')

  const keyCheck = await fetch(KEY_LOCATION, { method: 'HEAD' })
  if (!keyCheck.ok) {
    console.error(`Key file not reachable at ${KEY_LOCATION} (${keyCheck.status}).`)
    console.error('Deploy the site first so the key file is live, then run this script.')
    process.exit(1)
  }
  console.log('Key file OK (reachable). Submitting...')
  console.log('')

  const res = await fetch(BING_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const resText = await res.text()
  if (!res.ok) {
    console.error(`IndexNow POST failed: ${res.status} ${res.statusText}`)
    console.error(resText)
    process.exit(1)
  }

  if (process.env.DEBUG) {
    console.log('Response:', res.status, resText || '(empty)')
  }

  console.log('Submission OK. Check IndexNow (not URL Submission):')
  console.log('  Bing Webmaster Tools > your site > left menu > IndexNow')
  console.log('  URL Submission = manual form only. IndexNow = API submissions.')
  console.log('')
  urlList.forEach((u) => console.log(`  ${u}`))
}

submit().catch((e) => {
  console.error(e)
  process.exit(1)
})
