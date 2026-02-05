/**
 * Prepare dist/ for GitHub Pages deploy: redirect-only to main site.
 * Same idea as ensure-dist-redirect.js for Firebase waqas project.
 * Canonical main site: waqas.ragnorx.com
 *
 * Creates:
 *   dist/portfolio/index.html  - redirect + noindex + canonical
 *   dist/index.html            - copy for root
 *   dist/robots.txt            - Disallow: /
 *   dist/portfolio/robots.txt  - copy
 *
 * Run: node scripts/ensure-dist-github-pages-redirect.js
 * Then: push to main (or trigger workflow) to deploy, or use npm run deploy:github-pages
 */

const fs = require('fs')
const path = require('path')

const TARGET = 'https://waqas.ragnorx.com'
const TARGET_SLASH = TARGET + '/'
const DIST = path.resolve(__dirname, '..', 'dist')

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex, nofollow">
  <link rel="canonical" href="${TARGET_SLASH}">
  <meta http-equiv="refresh" content="0; url=${TARGET_SLASH}">
  <title>Redirecting to Waqas Ahmad Portfolio...</title>
  <script>
    // Redirect to main site, preserving path and query params
    const path = window.location.pathname.replace(/^\\/portfolio\\/?/, '/') || '/';
    const search = window.location.search;
    const hash = window.location.hash;
    window.location.replace('${TARGET}' + path + search + hash);
  </script>
</head>
<body>
  <p>This site has moved to <a href="${TARGET_SLASH}">${TARGET_SLASH}</a></p>
  <p>Redirecting...</p>
</body>
</html>
`

const ROBOTS_TXT = `# Redirect-only; do not index
User-agent: *
Disallow: /
`

if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST, { recursive: true })
}
const portfolioDir = path.join(DIST, 'portfolio')
if (!fs.existsSync(portfolioDir)) {
  fs.mkdirSync(portfolioDir, { recursive: true })
}

fs.writeFileSync(path.join(portfolioDir, 'index.html'), INDEX_HTML, 'utf-8')
fs.writeFileSync(path.join(DIST, 'index.html'), INDEX_HTML, 'utf-8')
fs.writeFileSync(path.join(DIST, 'robots.txt'), ROBOTS_TXT, 'utf-8')
fs.writeFileSync(path.join(portfolioDir, 'robots.txt'), ROBOTS_TXT, 'utf-8')

console.log('[OK] dist/ ready for GitHub Pages redirect-only deploy →', TARGET_SLASH)
