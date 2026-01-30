# AI Search Engine Optimization – Audit & Plan

This document maps your portfolio against each AI engine’s requirements and lists **only** gaps or optional improvements. Everything else is already in place.

---

## 1. What’s already correct (no action)

### Universal checklist
| Item | Status |
|------|--------|
| **Sitemap.xml** | ✅ In place, all project/service/privacy URLs, linked in `index.html` and `robots.txt` |
| **Robots.txt** | ✅ Clean: Allow `/`, `/projects/`, `/services/`, `/assets/`, favicons, `llms.txt`, sitemap, IndexNow key file |
| **HTTPS** | ✅ Firebase hosting |
| **Mobile-friendly** | ✅ Responsive Vue app |
| **llms.txt** | ✅ In `public/`, copied to dist, linked in `index.html` with `rel="alternate" type="text/plain" title="AI Search Engine Index"` |

### Google AI (Search, AI Overviews, Gemini)
| Item | Status |
|------|--------|
| Indexing / Search Console | ✅ Canonical, meta robots, sitemap |
| Structured data (static in `index.html`) | ✅ Person, WebSite, ProfessionalService, BreadcrumbList |
| Structured data (client-side) | ✅ Home: Person, ProfessionalService, **Organization**, JobPosting, WebSite. Projects: **Article**, SoftwareApplication, BreadcrumbList. Services: **Service**, **FAQPage**, **HowTo**, ImageObject, Offer, BreadcrumbList |
| E-E-A-T signals | ✅ Person (alumniOf, hasCredential, award, worksFor), clear authorship |
| File types | ✅ HTML, JSON-LD, images with alt (no PDF needed for portfolio) |

### Bing AI / Copilot
| Item | Status |
|------|--------|
| IndexNow | ✅ Script `scripts/submit-bing-indexnow.js`, key file `public/cbe5cb9f88984691af7d581e94e409f6.txt`, key URL in `robots.txt` Allow |
| Sitemap | ✅ Submitted via robots + Search Console / Webmaster Tools |
| Metadata / structure | ✅ Same as Google |

### ChatGPT / Claude / Perplexity
| Item | Status |
|------|--------|
| Discovered via Bing/Google | ✅ Same technical setup feeds them |
| Entity signals | ✅ Person schema, same name/role in meta and llms.txt |
| llms.txt | ✅ Attribution, Summary, Description, Keywords per section |

### Meta AI
| Item | Status |
|------|--------|
| Open Graph | ✅ og:type, og:url, og:title, og:description, og:image, og:site_name, profile fields |

### Apple Intelligence / Siri
| Item | Status |
|------|--------|
| Bing + schema | ✅ Covered by Bing SEO and existing structured data |

### File types
- **HTML** ✅ Main content.
- **JSON-LD** ✅ Person, WebSite, ProfessionalService, Service, Article, FAQPage, HowTo, BreadcrumbList, etc.
- **Plain text** ✅ `llms.txt` for AI agents.
- **Images** ✅ With alt/caption in schema where used.
- **PDF/DOCX/PPTX** – Not required for a portfolio; skip unless you add downloadable assets.

---

## 2. Gaps and optional improvements

### 2.1 Optional: Organization in static HTML

- **Checklist:** “Structured data: Person, **Organization**, WebSite, BreadcrumbList…”
- **Current:** Organization is generated only in JS (`generateHomePageStructuredData`). Static `index.html` has Person, WebSite, ProfessionalService, BreadcrumbList but **no** Organization.
- **Impact:** Low. Google runs JS and will see Organization. Some crawlers or AI pipelines that don’t run JS might not.
- **Action (optional):** Add a small JSON-LD block for `Organization` in `index.html` (e.g. “Waqas Ahmad – Portfolio” or “Independent Consultant”) and link it from Person/WebSite via `@id`. Only if you want maximum coverage for non-JS crawlers.

### 2.2 Optional: Dedicated /about page

- **Guideline:** “About page that screams real human, real work.”
- **Current:** About/Resume content lives on the homepage (e.g. `#about`). No separate `/about` route.
- **Impact:** Low. Homepage already has strong E-E-A-T and Person schema.
- **Action (optional):** Add a route like `/about` with a clear “About Waqas Ahmad” page (bio, experience, location) and same Person/Organization signals. Helps AI engines that look for an explicit “about” URL.

### 2.3 Nothing wrong with current file types

- You are using **HTML**, **JSON-LD**, and **plain text** (`llms.txt`) as recommended. No incorrect or missing file types for AI search.

### 2.4 IndexNow key file

- **Current:** `public/cbe5cb9f88984691af7d581e94e409f6.txt` exists with correct content; Vite copies `public/` to `dist/`; `robots.txt` allows it.
- **Action:** None. Ensure after deploy the URL `https://waqasahmad-portfolio.web.app/cbe5cb9f88984691af7d581e94e409f6.txt` returns 200 and the key string. Then run `npm run submit-bing` after deployments if you want to ping IndexNow.

---

## 3. Summary: what to do next

| Priority | Item | Action |
|----------|------|--------|
| **Done** | Technical base | No change: sitemap, robots, llms.txt, static + dynamic schema, IndexNow, OG |
| **Optional** | Organization in static HTML | Add one JSON-LD `Organization` block in `index.html` and reference it from Person/WebSite |
| **Optional** | Dedicated /about | Add `/about` route and page with strong E-E-A-T and same entity (Person) |
| **Ongoing** | IndexNow | After each deploy, run `npm run submit-bing` if you want faster Bing/Copilot pickup |

You can proceed as-is; the optional items are incremental improvements, not fixes for something wrong.

---

## 4. References (from your notes)

- Google Search Central: https://developers.google.com/search  
- AI Overviews: https://developers.google.com/search/docs/appearance/ai-overviews  
- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a  
- IndexNow: https://www.indexnow.org/  
- llms.txt: https://llmstxt.org/ (your `llms.txt` format and link are correct)
