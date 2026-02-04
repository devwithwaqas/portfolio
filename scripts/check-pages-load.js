/**
 * Check that all app pages load (HTTP 200 + expected HTML).
 * No Playwright/Puppeteer – just fetch() against the preview server.
 *
 * Checked: HTTP 200, body contains id="app", body does not contain
 * known error phrases, and local dev error log (dev-error-log.txt)
 * has no entries from recent dev sessions.
 * Production errors go to VITE_ERROR_REPORT_URL (Cloud Function); check
 * Google Cloud logs for those. NOT checked: console/runtime errors
 * during this script (would require a headless browser).
 *
 * Usage:
 *   npm run build && node scripts/check-pages-load.js
 *   # or if the server is ALREADY running (e.g. in Chrome):
 *   node scripts/check-pages-load.js --no-start
 *   node scripts/check-pages-load.js --no-start --port=3001
 *   # dev server usually uses base / (not /portfolio):
 *   node scripts/check-pages-load.js --no-start --port=3001 --base=/
 *
 * Options: --no-start  --port=4173  --base=/ or --base=/portfolio
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const ROUTER_FILE = path.join(ROOT, 'src/router/index.js')
const BLOG_ARTICLES_DIR = path.join(ROOT, 'src/config/blog/articles')
const DIST_DIR = path.join(ROOT, 'dist')
const DEV_ERROR_LOG_PATH = path.join(ROOT, 'dev-error-log.txt')

const args = process.argv.slice(2)
const noStart = args.includes('--no-start')
const portArg = args.find((a) => a.startsWith('--port='))
const baseArg = args.find((a) => a.startsWith('--base='))
const PORT = portArg ? parseInt(portArg.split('=')[1], 10) : 4173
const BASE = `http://127.0.0.1:${PORT}`

function getBasePath() {
  if (baseArg) return baseArg.split('=')[1].replace(/\/$/, '') || ''
  const indexPath = path.join(DIST_DIR, 'index.html')
  if (!fs.existsSync(indexPath)) return ''
  const html = fs.readFileSync(indexPath, 'utf8')
  const baseMatch = html.match(/<base[^>]+href=["']([^"']+)["']/i)
  if (baseMatch) return baseMatch[1].replace(/\/$/, '') // e.g. /portfolio
  if (html.includes('src="/portfolio/')) return '/portfolio'
  return ''
}

function getRoutesFromRouter() {
  if (!fs.existsSync(ROUTER_FILE)) return []
  const content = fs.readFileSync(ROUTER_FILE, 'utf8')
  const routePattern = /\{\s*path:\s*['"`]([^'"`]+)['"`]\s*,\s*name:\s*['"`]([^'"`]+)['"`]/g
  const redirectPattern = /\{\s*path:\s*['"`]([^'"`]+)['"`]\s*,\s*redirect:/g
  const redirects = new Set()
  let m
  while ((m = redirectPattern.exec(content)) !== null) redirects.add(m[1])
  const paths = []
  let match
  while ((match = routePattern.exec(content)) !== null) {
    const p = match[1]
    const name = match[2]
    if (p.includes('pathMatch') || p.includes(':') || redirects.has(p) || name === 'NotFound') continue
    if (p === '/blog/:slug') {
      // add blog slugs below
      continue
    }
    paths.push(p)
  }
  return paths
}

function getBlogSlugs() {
  if (!fs.existsSync(BLOG_ARTICLES_DIR)) return []
  return fs
    .readdirSync(BLOG_ARTICLES_DIR)
    .filter((f) => f.endsWith('.js'))
    .map((f) => f.replace(/\.js$/, ''))
    .sort()
}

function allPaths() {
  const fromRouter = getRoutesFromRouter()
  const blogSlugs = getBlogSlugs()
  const blogPaths = blogSlugs.map((s) => `/blog/${s}`)
  return [...fromRouter, ...blogPaths]
}

function waitForServer(maxWaitMs = 25000) {
  const start = Date.now()
  return new Promise((resolve) => {
    const basePath = getBasePath()
    const tryUrl = basePath ? `${BASE}${basePath}/` : `${BASE}/`
    function attempt() {
      fetch(tryUrl, { method: 'GET' })
        .then((r) => {
          if (r.ok) return resolve(true)
          if (Date.now() - start > maxWaitMs) return resolve(false)
          setTimeout(attempt, 500)
        })
        .catch(() => {
          if (Date.now() - start > maxWaitMs) return resolve(false)
          setTimeout(attempt, 500)
        })
    }
    attempt()
  })
}

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
      cwd: ROOT,
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe']
    })
    let resolved = false
    server.stdout.on('data', (d) => {
      if (d.toString().includes('Local:') && !resolved) {
        resolved = true
        resolve(server)
      }
    })
    server.stderr.on('data', () => {})
    server.on('error', (err) => {
      if (!resolved) {
        resolved = true
        reject(err)
      }
    })
    setTimeout(() => {
      if (!resolved) {
        resolved = true
        server.kill()
        reject(new Error('Preview server failed to start within 30s'))
      }
    }, 30000)
  })
}

// Contexts that are not real errors (boot = app start, beforeunload/pagehide = tab close/navigate)
const IGNORED_CONTEXTS = ['boot', 'beforeunload', 'pagehide']

/** Parse dev-error-log.txt (written by vite-dev-error-logger when app sends errors in dev). Returns array of error blocks (real errors only). */
function getDevErrorLogEntries() {
  if (!fs.existsSync(DEV_ERROR_LOG_PATH)) return []
  const raw = fs.readFileSync(DEV_ERROR_LOG_PATH, 'utf8')
  const blocks = raw.split(/---/).filter((b) => b.trim().length > 0)
  const entries = []
  for (const block of blocks) {
    if (block.includes('dev-error-logger ready')) continue
    const contextMatch = block.match(/context:\s*(.+)/m)
    const messageMatch = block.match(/message:\s*(.+)/m)
    const urlMatch = block.match(/url:\s*(.+)/m)
    const context = (contextMatch && contextMatch[1].trim()) || ''
    if (IGNORED_CONTEXTS.includes(context)) continue
    if (contextMatch || messageMatch) {
      entries.push({
        context,
        message: (messageMatch && messageMatch[1].trim()) || '',
        url: (urlMatch && urlMatch[1].trim()) || ''
      })
    }
  }
  return entries
}

// Strings that suggest an error state in the response body (SPA often returns same shell; these may appear after hydration or in prerendered HTML)
const ERROR_PHRASES = [
  'Article not found',
  'Failed to fetch dynamically imported module',
  'Loading chunk',
  'Loading CSS chunk',
  'Page Not Found',
  '404 - Page Not Found'
]

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow' })
    const ok = res.ok
    const text = ok ? await res.text() : ''
    const hasApp = text.includes('id="app"') || text.includes('id=\'app\'')
    const errorPhrase = ERROR_PHRASES.find((phrase) => text.includes(phrase))
    return { ok, status: res.status, hasApp, url, errorPhrase: errorPhrase || null }
  } catch (err) {
    return { ok: false, status: 0, hasApp: false, url, error: err.message, errorPhrase: null }
  }
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('[ERROR] dist/ not found. Run: npm run build')
    process.exit(1)
  }

  const basePath = getBasePath()
  const paths = allPaths()
  console.log('Checking', paths.length, 'pages (base:', basePath || '/', ')')
  if (basePath) console.log('URLs will be:', BASE + basePath + '<path>')
  console.log('')

  let server = null
  if (!noStart) {
    try {
      server = await startPreviewServer()
      console.log('Preview server started on port', PORT)
      console.log('(Tip: if the server is already running, use --no-start to skip starting it.)')
      const ready = await waitForServer()
      if (!ready) {
        console.error('[ERROR] Server did not respond in time')
        if (server) server.kill()
        process.exit(1)
      }
    } catch (err) {
      console.error('[ERROR] Failed to start preview server:', err.message)
      process.exit(1)
    }
  } else {
    console.log('Using already-running server (--no-start). Port:', PORT)
    const ready = await waitForServer(8000)
    if (!ready) {
      console.error('[WARN] No response from', BASE, '- is the server running on port', PORT + '?')
      console.error('       Start dev with: npm run dev   or preview with: npx vite preview --port', PORT)
      process.exit(1)
    }
    console.log('Server responded. Checking pages...')
  }

  const prefix = basePath ? basePath : ''
  const results = []
  for (let i = 0; i < paths.length; i++) {
    const p = paths[i]
    const url = `${BASE}${prefix}${p}`
    process.stdout.write(`  [${i + 1}/${paths.length}] ${p} ... `)
    const r = await checkUrl(url)
    results.push({ path: p, ...r })
    if (!r.ok) {
      console.log('FAIL', r.status || r.error)
    } else if (r.errorPhrase) {
      console.log('WARN – possible error in body:', r.errorPhrase)
    } else if (r.hasApp) {
      console.log('OK')
    } else {
      console.log('OK (no #app in body)')
    }
  }

  if (server) {
    server.kill()
    console.log('Preview server stopped.')
  }

  const failed = results.filter((r) => !r.ok)
  const noApp = results.filter((r) => r.ok && !r.hasApp)
  const withErrorPhrase = results.filter((r) => r.errorPhrase)
  console.log('')
  console.log('Summary:', results.length, 'checked,', failed.length, 'failed,', noApp.length, 'OK but no #app,', withErrorPhrase.length, 'with error phrase in body')
  if (withErrorPhrase.length > 0) {
    console.log('Pages with error phrase in HTML:')
    withErrorPhrase.forEach((r) => console.log('  ', r.path, '–', r.errorPhrase))
  }
  if (failed.length > 0) {
    console.log('Failed URLs:')
    failed.forEach((r) => console.log('  ', r.url, r.status || r.error))
    process.exit(1)
  }
  if (withErrorPhrase.length > 0) process.exit(1)

  // Check local dev error log (from errorTracker.js → sendBeacon → vite-dev-error-logger → dev-error-log.txt)
  const devErrors = getDevErrorLogEntries()
  if (devErrors.length > 0) {
    console.log('')
    console.log('Local dev error log (dev-error-log.txt) has', devErrors.length, 'entry/entries:')
    devErrors.slice(0, 10).forEach((e, i) => {
      console.log(`  ${i + 1}. [${e.context}] ${(e.message || '').slice(0, 80)}${(e.message || '').length > 80 ? '...' : ''}`)
      if (e.url) console.log('     url:', e.url)
    })
    if (devErrors.length > 10) console.log('  ... and', devErrors.length - 10, 'more (see dev-error-log.txt)')
    console.log('  → Clear with: echo. > dev-error-log.txt  (Windows) or  : > dev-error-log.txt  (bash)')
    console.log('  → Production errors are sent to VITE_ERROR_REPORT_URL; check Google Cloud / Cloud Function logs.')
    process.exit(1)
  }

  console.log('All pages loaded successfully.')
  console.log('(Local dev-error-log.txt: no entries. Production errors → VITE_ERROR_REPORT_URL; check Cloud logs.)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
