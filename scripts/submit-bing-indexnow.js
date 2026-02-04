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
// Official IndexNow endpoint (works for all IndexNow-compatible engines: Bing, Yandex, etc.)
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow'

const ROUTER_FILE = path.resolve(__dirname, '../src/router/index.js')
const BLOG_ARTICLES_DIR = path.resolve(__dirname, '../src/config/blog/articles')

/**
 * Extract blog article slugs from blog/articles/*.js (one file per article; filename = slug)
 */
function getBlogArticleSlugs() {
  if (!fs.existsSync(BLOG_ARTICLES_DIR)) return []
  return fs.readdirSync(BLOG_ARTICLES_DIR)
    .filter((f) => f.endsWith('.js'))
    .map((f) => f.replace(/\.js$/, ''))
    .sort()
}

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
    if (p.includes('pathMatch') || p.includes(':') || redirects.has(p) || name === 'NotFound') continue
    paths.push(p.startsWith('/') ? p : `/${p}`)
  }
  return paths
}

function getUrlList() {
  const paths = extractPathsFromRouter()
  const blogSlugs = getBlogArticleSlugs()
  blogSlugs.forEach((slug) => {
    paths.push(`/blog/${slug}`)
  })
  return paths.map((p) => `${BASE_URL}${p.startsWith('/') ? p : '/' + p}`)
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

  console.log('IndexNow URL Submission (Bing, Yandex, and other IndexNow engines)')
  console.log('====================================================================')
  console.log(`Key:        ${INDEXNOW_KEY}`)
  console.log(`Key file:   ${KEY_LOCATION}`)
  console.log(`Endpoint:   ${INDEXNOW_ENDPOINT}`)
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

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  const resText = await res.text()

  // Handle official IndexNow response codes
  if (res.status === 200) {
    // Success
    if (process.env.DEBUG) {
      console.log('Response:', res.status, resText || '(empty)')
    }
    console.log('Submission OK. URLs submitted to IndexNow (Bing, Yandex, and other engines).')
    console.log('  Check in Bing Webmaster Tools > your site > left menu > IndexNow')
    console.log('  URL Submission = manual form only. IndexNow = API submissions (broader coverage).')
    console.log('')
    urlList.forEach((u) => console.log(`  ${u}`))
  } else if (res.status === 400) {
    console.error('❌ 400 Bad Request: Invalid format')
    console.error('   Check that your request body matches IndexNow spec:')
    console.error('   - host, key, keyLocation, urlList (all required)')
    console.error('   - urlList must be an array of full URLs')
    console.error(`   Response: ${resText || '(empty)'}`)
    process.exit(1)
  } else if (res.status === 403) {
    console.error('❌ 403 Forbidden: Key not valid')
    console.error('   Possible causes:')
    console.error(`   1. Key file not found at: ${KEY_LOCATION}`)
    console.error(`   2. Key file exists but doesn't contain: ${INDEXNOW_KEY}`)
    console.error('   3. Key file not accessible (CORS, auth, etc.)')
    console.error(`   Response: ${resText || '(empty)'}`)
    process.exit(1)
  } else if (res.status === 422) {
    console.error('❌ 422 Unprocessable Entity')
    console.error('   Possible causes:')
    console.error(`   1. URLs don't belong to host: ${new URL(BASE_URL).hostname}`)
    console.error(`   2. Key doesn't match schema (key must be in file at keyLocation)`)
    console.error(`   Response: ${resText || '(empty)'}`)
    process.exit(1)
  } else if (res.status === 429) {
    console.error('❌ 429 Too Many Requests (potential spam)')
    console.error('   You\'ve submitted too many requests. Wait before retrying.')
    console.error(`   Response: ${resText || '(empty)'}`)
    process.exit(1)
  } else {
    console.error(`❌ IndexNow POST failed: ${res.status} ${res.statusText}`)
    console.error(`   Response: ${resText || '(empty)'}`)
    process.exit(1)
  }
}

submit().catch((e) => {
  console.error(e)
  process.exit(1)
})
