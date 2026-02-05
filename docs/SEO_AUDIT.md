# SEO Files Audit & Checklist

This doc lists all SEO-related assets and how they are set up for single-build, multi-deploy (waqas + ragnorx / CNAME).

---

## 1. llms.txt

| Item | Status | Notes |
|------|--------|--------|
| **Source** | `public/llms.txt` | Author/site identity, content sections, flagship article URLs. |
| **Build** | `scripts/copy-llms-txt.js` copies to `dist/llms.txt` during build. | In `build:firebase` after create-headers. |
| **URLs** | Default `https://waqasahmad-portfolio.web.app` in content. | **Deploy-time**: `deploy-firebase.js` rewrites `dist/llms.txt` so all URLs use the current target’s base URL (canonical or site URL). |
| **Generation** | `scripts/generate-llms-blog-articles.js` injects blog blocks into `public/llms.txt`. | Uses `BLOG_BASE_URL`; run before build or manually. Output is then copied and rewritten per deploy. |
| **Discovery** | `index.html` has `<link rel="alternate" type="text/plain" href="/llms.txt" title="AI Search Engine Index">`. | Relative; correct on any domain. |
| **Headers** | Firebase: `**/llms.txt` → `Content-Type: text/plain; charset=utf-8`. | So crawlers get correct MIME type. |

---

## 2. robots.txt

| Item | Status | Notes |
|------|--------|--------|
| **Source** | Not from `public/` for Firebase. | Generated into `dist/` only. |
| **Build** | `scripts/write-robots-firebase.js` writes `dist/robots.txt` during build. | Uses `FIREBASE_SITE_URL` (default waqas). |
| **Deploy** | **Deploy-time**: Before each target deploy, script runs again with that target’s base URL. | Sitemap URL in robots matches deployed domain. |
| **Content** | Allow `/`, Disallow `/admin/`, `/api/`, Sitemap: `{baseUrl}/sitemap.xml`. | Single Sitemap line. |
| **Headers** | Firebase: `**/robots.txt` → `Content-Type: text/plain`, Cache-Control. | Already configured. |

---

## 3. sitemap.xml

| Item | Status | Notes |
|------|--------|--------|
| **Source** | Generated from router routes + blog article slugs. | `scripts/generate-sitemap.js`. |
| **Build** | Runs during build; writes `dist/sitemap.xml` (and `public/` unless `DEPLOY_SITEMAP_DIST_ONLY=1`). | Default base URL from env or waqas. |
| **Deploy** | **Deploy-time**: Before each target deploy, runs with `FIREBASE_SITE_URL={baseUrl}` and `DEPLOY_SITEMAP_DIST_ONLY=1`. | Only `dist/sitemap.xml` updated; all `<loc>` use target base URL. |
| **Validation** | `scripts/validate-sitemap.js` after build. | Checks dist (or public) sitemap structure and URLs. |
| **Discovery** | robots.txt Sitemap line; index.html `<link rel="sitemap" href="...">` (rewritten at deploy). | Search Console can also submit URL. |
| **Headers** | Firebase: `**/sitemap.xml` → `Content-Type: application/xml`, Cache-Control. | Already configured. |

---

## 4. seo.js

| Item | Status | Notes |
|------|--------|--------|
| **Role** | Dynamic meta (title, description, keywords, canonical, OG, Twitter) for SPA routes. | Used by router and page components. |
| **Canonical / URL** | Uses `SITE_URL` from `src/config/constants.js`. | **Runtime**: In browser, `SITE_URL` = `window.location.origin + '/'` so canonicals and OG match the actual domain (waqas vs ragnorx/CNAME). |
| **Fallback** | Build/SSR: `VITE_FIREBASE_SITE_URL` or `https://waqasahmad-portfolio.web.app/`. | Only when `window` is undefined. |

---

## 5. structuredData.js

| Item | Status | Notes |
|------|--------|--------|
| **Role** | JSON-LD (Person, WebSite, Article, BlogPosting, FAQ, BreadcrumbList, etc.) injected per page. | Uses `SITE_URL` and `APP_CONFIG` from constants. |
| **URLs** | All `@id`, `url`, `image`, `mainEntityOfPage` use `SITE_URL`. | Same runtime origin as seo.js when in browser. |
| **Static fallback** | `index.html` includes a static LD+JSON graph (Person, WebSite, ProfessionalService, BreadcrumbList). | **Deploy-time**: `deploy-firebase.js` rewrites all `https://waqasahmad-portfolio.web.app` in `dist/index.html` to the target base URL so crawlers see correct URLs. |

---

## 6. index.html (static SEO)

| Item | Status | Notes |
|------|--------|--------|
| **Canonical** | `<link rel="canonical" href="...">`. | **Deploy-time**: Replaced with target base URL so each deployment has correct canonical. |
| **Sitemap link** | `<link rel="sitemap" href=".../sitemap.xml">`. | **Deploy-time**: Same rewrite. |
| **Meta url / identifier-URL** | `meta name="url"` and `identifier-URL`. | **Deploy-time**: Same rewrite. |
| **OG / Twitter** | `og:url`, `og:image`, `twitter:url`, `twitter:image`. | **Deploy-time**: Same rewrite. |
| **Static JSON-LD** | Inline `<script type="application/ld+json">` graph. | **Deploy-time**: Same rewrite. |
| **llms.txt link** | `href="/llms.txt"`. | Relative; no change. |

---

## 7. constants.js

| Item | Status | Notes |
|------|--------|--------|
| **SITE_URL** | In browser: `window.location.origin + '/'`. | Ensures one build works for all deploy targets. |
| **Other** | `APP_CONFIG`, experience, etc. | Unchanged. |

---

## 8. Other SEO-related

| File / Area | Purpose |
|-------------|--------|
| **scripts/validate-sitemap.js** | Validates sitemap structure and URL count; run after build. |
| **scripts/crawl-as-googlebot.js** | Crawls key URLs including llms.txt, robots.txt, sitemap.xml. |
| **scripts/audit-blog-seo-compliance.js** | Blog vs sitemap consistency. |
| **scripts/submit-bing-indexnow.js** | IndexNow submission; uses sitemap/base URL. |
| **scripts/generate-llms-blog-articles.js** | Injects blog blocks into `public/llms.txt`; uses a single build-time base URL; deploy rewrite fixes final URLs in dist. |
| **Firebase hosting rewrites** | `/assets/**` and `**` → index.html; static files served first. |
| **Vite base** | `base: '/'` for Firebase so asset paths are root-relative. |

---

## Deploy-time flow (per target)

For each deploy target (e.g. waqas, ragnorx):

1. **baseUrl** = `canonicalUrl || siteUrl` (no trailing slash).
2. **Sitemap**: Run `generate-sitemap.js` with `FIREBASE_SITE_URL=baseUrl`, `DEPLOY_SITEMAP_DIST_ONLY=1`.
3. **Robots**: Run `write-robots-firebase.js` with `FIREBASE_SITE_URL=baseUrl`.
4. **index.html**: In `dist/index.html`, replace all `https://waqasahmad-portfolio.web.app` with `baseUrl`.
5. **llms.txt**: In `dist/llms.txt`, replace all `https://waqasahmad-portfolio.web.app` with `baseUrl`.
6. Deploy `dist/` to that target.

Result: sitemap, robots, index (canonical, meta, JSON-LD), and llms.txt all use the correct domain for that deployment. Client-side canonicals and structured data use runtime origin via `constants.js` and `seo.js` / `structuredData.js`.
