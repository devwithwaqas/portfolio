/**
 * Ensure dist-redirect/ exists with a minimal index.html for Firebase Hosting.
 * Used when deploying waqasahmad-portfolio as redirect-only (no full site).
 * Indexable so GSC "Request indexing" works; canonical + redirect consolidate to main site.
 */

const fs = require('fs')
const path = require('path')

const DIST_REDIRECT = path.resolve(__dirname, '../dist-redirect')
const TARGET = 'https://waqas.ragnorx.com/'
const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="canonical" href="${TARGET}">
  <meta http-equiv="refresh" content="0;url=${TARGET}">
  <script>var b="${TARGET.replace(/\/$/, '')}";location.replace(b+location.pathname+location.search+location.hash);</script>
  <title>Redirect</title>
</head>
<body style="margin:0;background:#0d1117"></body>
</html>
`

if (!fs.existsSync(DIST_REDIRECT)) {
  fs.mkdirSync(DIST_REDIRECT, { recursive: true })
}
fs.writeFileSync(path.join(DIST_REDIRECT, 'index.html'), INDEX_HTML, 'utf-8')
console.log('[OK] dist-redirect/ ready for 301-only deploy (→ waqas.ragnorx.com)')
