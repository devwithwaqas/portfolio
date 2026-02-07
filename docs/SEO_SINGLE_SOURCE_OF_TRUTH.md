# SEO — Single Source of Truth

**Purpose:** One reference for **all** SEO implementation on this portfolio: **keywords** (selection strategy + implementation), **structured data** (Person, WebSite, Organization, Service, Article, BlogPosting, Speakable, etc.), **llms.txt**, **meta** (title, description, canonical, OG, Twitter, keywords), **robots.txt**, **sitemap**, and **IndexNow**. Use this doc for current behaviour; other SEO docs are historical or checklist-only.

**Scope:** 81 indexable URLs (1 home, 7 services, 10 projects, 1 blog index, 56 blog articles, 1 privacy, 1 catch-all 404) + 404/fallback. **Canonical domain:** **waqas.ragnorx.com** (main site); **waqasahmad-portfolio.web.app** 301-redirects to it. Canonical base in code: from **SITE_URL** (runtime: `window.location.origin` for one-build multi-deploy; build/SSR: **VITE_FIREBASE_SITE_URL** or default `https://waqas.ragnorx.com`). **Ref:** **`docs/REDIRECT_AND_DOMAINS.md`**.

**Supersedes / removed:** The following docs were consolidated into this file and can be deleted: `SEO_REVAMP_CHANGELOG.md`, `SEO_MASTER_CHECKLIST_81_URLS.md`, `SEO_POST_IMPLEMENTATION_AUDIT.md`, `SEO_AUDIT.md`, `SEO_81_PAGES_FULL_PLAN.md`, `SEO_AI_81_PAGES_IMPLEMENTATION_PLAN.md`, `STRUCTURED_DATA_VALIDATION_GUIDE.md`, `SEO_GOOGLE_GUIDELINES_COMPLIANCE.md`, `AI_SEO_ENTITY_81_URLS_CHECKLIST.md`, `SEO_KEYWORDS_IMPLEMENTATION_PLAN.md`, `SEO_CODE_SPLITTING_SAFETY.md`, `FINAL_GO_CHECKLIST.md`. **Keyword data** remains in **`docs/SEO_KEYWORDS_UPGRADE.md`** (82 URL keyword tables/JSON blocks). **Keep:** `LLMS_TXT_GUIDE.md`, `BING_INDEXNOW_SETUP.md`, `TOPIC_CLUSTER_LINKING_IMPLEMENTATION_CHECKLIST.md`, `REDIRECT_AND_DOMAINS.md`, `GOOGLE_SEARCH_CONSOLE_SETUP.md`.

---

## Table of contents

| § | Topic |
|---|--------|
| **Strategies** | What we use site-wide (keywords, schema, llms, meta, content) |
| **1** | Person schema (current) |
| **2** | Structured data by page type |
| **3** | Speakable (AI/voice) |
| **4** | Keywords (selection strategy + implementation) |
| **5** | llms.txt |
| **6** | Meta (title, description, canonical, OG, Twitter, keywords) |
| **7** | robots.txt |
| **8** | Sitemap |
| **9** | IndexNow / Bing URL submission |
| **10** | Files reference |
| **11** | Authority / spam rules |
| **12** | Person schema — docs status |
| **13** | index.html static fallback & discovery |
| **14** | Internal linking (topic clusters & related content) |
| **15** | Other config & supporting scripts |
| **16** | Pre-launch / verification (quick checklist) |

---

## Strategies we use (applied site-wide)

- **Keywords:** Content-driven only. No fixed or generic lists. Each URL has **1 primary** (5–8 words), **6–8 secondary**, **6–8 semantic** from that page’s **actual content**. Source: **`docs/SEO_KEYWORDS_UPGRADE.md`** → **`src/config/seoKeywords.js`** via **getMetaKeywords(path)**. Meta gets up to 8 (primary first, then secondary + semantic). No “best/top/elite”, no geo/company stuffing, no generic filler.
- **Structured data (Option B):** Clean, Google-safe. **Person** (headline, description, jobTitle, hasOccupation, knowsAbout, specialty, worksFor, alumniOf); **WebSite**, **Organization**; **Service** (provider → Person, capability-only, no Offer); **Article** + **SoftwareApplication** on projects; **BlogPosting** (keywords from same config) + BreadcrumbList; **CollectionPage** + **ItemList** on blog index. **No** ProfessionalService with reviews, JobPosting, Offer, testimonials in schema.
- **Speakable:** Used on Home, Blog index, Blog article, Project, Service so AI/voice can read key sections (cssSelector arrays in schema).
- **llms.txt:** Single **static** hand-authored site summary (identity, expertise, flagship URLs, topic breadth). **No** per-article blocks. Build only **copies** `public/llms.txt` to dist; no script overwrites content.
- **Meta:** Title (55–60 chars, word boundary), description (140–160 chars, no stuffing), canonical (SITE_URL + path), OG/Twitter (title, description, image, url). Keywords from **getMetaKeywords(path)**. All set in **router** or **seo.js** (apply* / setPageSEO); no SEO-critical logic in lazy-loaded components only.
- **robots.txt:** Allow `/`; Disallow `/admin/`, `/api/`; single Sitemap line. No geo, no speculative AI directives.
- **Sitemap:** 81 URLs; order Home → core → Services → Projects → Blog; priorities and changefreq normalized; single sitemap.
- **IndexNow:** Submit same URL list to Bing/IndexNow after deploy; base URL from CLI or env; key file at site root proves ownership.
- **Content / markup:** Exactly **one H1** per page; no hidden/offscreen SEO (no `left:-9999px`, no noscript keyword dumps). Safe keyword rule: if it can be pointed to a section/CTA, it’s not spam.
- **Code-splitting:** **seo.js** and **structuredData.js** are **direct imports** in the router (not lazy-loaded), so meta and JSON-LD are set before first paint and visible to crawlers.

---

## 1. Person schema (current)

**Where:** `src/utils/structuredData.js` → **`generatePersonSchema()`**. Injected on **Home** via **`generateHomePageStructuredData()`**. Referenced by **WebSite** (publisher), **Organization** (founder), **Service** (provider), **BlogPosting** (author) via `@id` `${SITE_URL}#person`.

**What it contains (Option B, no spam):**

| Property | Source / value |
|----------|----------------|
| `@context` | `https://schema.org` |
| `@type` | `Person` |
| `@id` | `${SITE_URL}#person` |
| `name` | `APP_CONFIG.fullName` |
| `headline` | One-line specialization (enterprise .NET, microservices, distributed systems, full-stack cloud-native). |
| `description` | Full paragraph: architect/senior engineer expertise (enterprise apps, distributed systems, microservices, .NET, Azure, event-driven, full-stack, technical leadership, backend, API design, scalability, reliability, SQL optimization, remote teams). |
| `image` | `ImageObject` with `url`: `${SITE_URL}assets/img/waqas-profile-hoodie.jpg` |
| `url` | `APP_CONFIG.contactLinks.website \|\| SITE_URL` |
| `jobTitle` | `"Software Architect"` (single string) |
| `hasOccupation` | Array of 5 **Occupation** objects: Software Architect, Technical Lead, Senior Software Engineer, Full Stack .NET Developer, .NET Developer — each with `name`, `description`, `skills` array. |
| `sameAs` | `[APP_CONFIG.contactLinks.linkedin, APP_CONFIG.contactLinks.github, website].filter(Boolean)` |
| `knowsAbout` | 18 topics (e.g. Software Architecture, Microservices Architecture, Azure Cloud Architecture, Domain-driven Design, CQRS and Event Sourcing, SQL Server Optimization, Technical leadership for distributed teams). |
| `specialty` | 5 items: Cloud Systems, Enterprise Software, Distributed Systems, Full-stack Engineering, Technical Leadership. |
| `worksFor` | `Organization` with `name: "Freelance / Consulting"`, `url: website` |
| `alumniOf` | `EducationalOrganization`: University of Engineering and Technology, Lahore |

**Not in Person:** No testimonials, no JobPosting, no Offer, no “best/top/elite” language, no resume dump. Other schemas (WebSite, Organization, Service, Article, BlogPosting) link to Person via `@id` or `provider`/`author`/`publisher`.

---

## 2. Structured data by page type (Option B)

All JSON-LD is produced in **`src/utils/structuredData.js`** and injected in the **router** `beforeEach` or by **Home.vue** (home). No schema in lazy-loaded components only (crawler-safe).

| Page type | Schemas | Notes |
|-----------|---------|--------|
| **Home** | Person, Organization, WebSite, WebPage, Speakable | No ProfessionalService, JobPosting, reviews. Home.vue calls **generateHomePageStructuredData()** (optional argument, e.g. testimonials, is ignored). |
| **Services** | Service, BreadcrumbList, WebPage, (+ FAQPage if FAQs), (+ Speakable) | Service has provider → Person; no Offer. FAQ data: per-service page (e.g. faqItems in view) or shared; **generateFAQPageSchema(faqItems)** in structuredData.js. |
| **Projects** | Article, SoftwareApplication, BreadcrumbList, WebPage, Speakable | author → Person. |
| **Blog index** | CollectionPage, BreadcrumbList, ItemList, WebPage, Speakable | Articles as ItemList. |
| **Blog article** | BlogPosting, BreadcrumbList, WebPage, (+ Speakable), (+ FAQPage if article.faqs) | author/publisher → Person; **keywords** from **getMetaKeywords('/blog/' + slug)** (first 5) or options.keywords / article.topic. |
| **Privacy / 404 / fallback** | BreadcrumbList, WebPage | No primary entity schema. |

**Removed site-wide:** ProfessionalService with reviews, JobPosting, Offer, HowTo spam, testimonial/review markup.

**Validation:** Use [Google Rich Results Test](https://search.google.com/test/rich-results) (paste page URL or JSON-LD) to verify schemas.

---

## 3. Speakable (AI/voice)

**What:** Schema.org **SpeakableSpecification** with **cssSelector** array so assistants can read out specific parts of the page.

**Where:** `generateSpeakableSchema(selectors)` in `structuredData.js`. Used on Home, Blog index, Blog article, Project, Service.

| Page | Selectors |
|------|-----------|
| Home | `#hero`, `#about`, `.container` |
| Blog index | `.blog-intro`, `.container` |
| Blog article | `#article-hero`, `.article-lead`, `.article-body`, `.container` |
| Project | `#portfolio-details`, `.page-title` (+ container) |
| Service | `#service-hero`, `.service-lead` (+ container) |

Speakable is only added when the page type includes it; no Speakable on Privacy/404.

---

## 4. Keywords (content-driven, single source of truth)

**Strategy:** Content-driven only. No fixed or generic keyword sets. Each page has **1 primary** (long-tail 5–8 words), **6–8 secondary**, **6–8 semantic**, derived from that page’s **actual content** (not slug/title only). No stuffing, no “best/top/elite”, no company names unless on page, no geo.

**Source of truth (data):** **`docs/SEO_KEYWORDS_UPGRADE.md`** — strategy rules + **82 URL keyword sets** (Format B: primary, secondary[], semantic[]). Core (4), Services (7), Projects (10), Blog (56), 404/fallback.

**Implementation (code):**  
- **`src/config/seoKeywords.js`** — object **SEO_KEYWORDS** keyed by **path** (`/`, `/blog`, `/privacy`, `/404`, `/projects/...`, `/services/...`, `/blog/<slug>`). Generated from the doc by **`scripts/generate-seo-keywords-config.js`** (run after editing the doc).  
- **`getMetaKeywords(path)`** — returns `[primary, ...secondary, ...semantic].slice(0, 8)` for that path (max 8 for meta).  
- **Author name excluded:** **seo.js** removes **APP_CONFIG.fullName** from keyword arrays (**withoutAuthorName**) before setting meta keywords, so the author name is not used as a keyword phrase.  
- **Meta keywords:** Used in **`src/utils/seo.js`** (applyHomeSEO, applyBlogIndexSEO, applyBlogSEO, applyProjectSEO, applyServiceSEO) and **`src/router/index.js`** (Privacy, 404, fallback, article-not-found). Lookup by path; fallback to previous behaviour if path missing.  
- **BlogPosting.keywords:** **`structuredData.js`** uses **getMetaKeywords('/blog/' + article.slug)** (first 5) when generating blog article schema.

**Regenerating config after doc edits:**  
`node scripts/generate-seo-keywords-config.js` → overwrites **`src/config/seoKeywords.js`** with 82 path entries from all JSON blocks in **SEO_KEYWORDS_UPGRADE.md**.

---

## 5. llms.txt

**What:** Single **hand-authored site summary** for AI/crawlers. Not used for Google ranking. Not per-article blocks.

**Source:** **`public/llms.txt`** (source of truth).  
**Build:** **`scripts/copy-llms-txt.js`** copies to **`dist/llms.txt`**; no script modifies content.  
**Deploy:** Deploy script may rewrite URLs in **`dist/llms.txt`** and in **`dist/index.html`** (canonical, sitemap link, OG, static JSON-LD) to target base URL.

**Content sections:** Site & Author Identity, Core Areas of Expertise, Representative & Flagship Content (curated URLs), Enterprise Projects & Case Studies, Services & Professional Focus, Complete Blog Coverage (topic clusters), Discovery notes. No keyword stuffing; identity and breadth only.

**When to update:** When you add flagship URLs, change topic clusters, or add/remove projects or services. Do not reintroduce per-article blocks or build-time generation.  
**Ref:** **`docs/LLMS_TXT_GUIDE.md`**.

---

## 6. Meta (title, description, canonical, OG, Twitter, keywords)

**Where:** **`src/utils/seo.js`** — **setTitle**, **setDescription**, **setKeywords**, **setCanonical**, **setSocialMeta**, **setRobots**. Applied via **applySEO()** and **setPageSEO()**.

**Who calls:**  
- **Router** `beforeEach`: Home → applyHomeSEO; /blog → applyBlogIndexSEO; /blog/:slug → applyBlogSEO(article); /projects/* → applyProjectSEO(projectData); /services/* → applyServiceSEO(serviceData); Privacy, 404, fallback, article-not-found → setPageSEO({ title, description, keywords, url, noindex }).  
- **Keywords** for apply* and setPageSEO come from **getMetaKeywords(path)** (see §4); fallbacks kept for missing paths.

**Title:** **buildSEOTitle(titlePart, name)** — format `Title Part | Name`, **max 60 chars** at word boundary (Bing/Google). Used for blog, project, service pages. Home: `Name | Tagline` (from APP_CONFIG.titleTagline). Blog index: `Software Architecture & Engineering Blog | Name`.  
**Description:** Per-page; strip HTML; 140–160 chars target; no stuffing.  
**Canonical:** From **SITE_URL** + path (normalized, no trailing slash).  
**OG / Twitter:** title, description, image, url, type; **og:site_name** = `${APP_CONFIG.fullName} — Portfolio`. Default image from **getDefaultOgImage()** → `${SITE_URL}/assets/img/waqas-profile-hoodie.jpg`.  
**Robots:** index,follow unless **noindex: true** (404, article-not-found).  
**Favicon:** Root-level **favicon.ico** and PNGs (48×48, 32×32, 16×16) in **index.html** for SERP display; see **§13**.

---

## 7. robots.txt

**Build:** **`scripts/write-robots-firebase.js`** (Firebase build). Not read from `public/` for Firebase.  
**Content:** **Allow: /**; **Disallow: /admin/, /api/**; **Sitemap:** `{baseUrl}/sitemap.xml`. Single User-agent. Bingbot inherits default; no duplicate block.

---

## 8. Sitemap

**Build:** **`scripts/generate-sitemap.js`** (run during build). Reads routes + blog slugs; writes **`dist/sitemap.xml`** (and optionally `public/sitemap.xml`).  
**Deploy:** Deploy script may regenerate sitemap with target **FIREBASE_SITE_URL** so all `<loc>` use correct base.  
**Validation:** **`scripts/validate-sitemap.js`** after build.

**Order:** Homepage → core (/blog, /privacy) → Services (alphabetical) → Projects (alphabetical) → Blog posts (alphabetical by slug).  
**Priorities:** Home 1.0, Services 0.8, Blog index 0.8, Projects 0.7, Blog 0.6, Privacy 0.3.  
**Changefreq:** home/blog weekly; blog posts monthly; services/projects monthly; privacy yearly.  
**Scope:** 81 URLs; single sitemap; no image/video/hreflang.

**Build pipeline (SEO steps in order):** In **package.json** — **`build`**: copy-llms-txt → generate-sitemap → validate-sitemap; **`build:firebase`**: same plus **write-robots-firebase**. **IndexNow:** run **after deploy** (`npm run submit-bing`); key file must be live at site root.

---

## 9. IndexNow / Bing URL submission

**Script:** **`scripts/submit-bing-indexnow.js`**. Run **after deploy** so the key file is live at the site root.  
**npm:** **`npm run submit-bing`**.  
**Base URL:** Must match the **Bing Webmaster property** (the site you added by URL). **CLI arg** (e.g. `node scripts/submit-bing-indexnow.js https://waqas.ragnorx.com`) **or** **FIREBASE_SITE_URL** / **VITE_FIREBASE_SITE_URL** **or** default **https://waqas.ragnorx.com**.  
**Key:** **BING_INDEXNOW_KEY** env or default in script. Key file must be at **`https://<site>/<key>.txt`** (e.g. **`public/73e43e4aa58341fbb416f06913dcabda.txt`** deployed at root).  
**URL list:** Same as sitemap (router paths + blog slugs); built inside script.  
**Endpoint:** **https://api.indexnow.org/IndexNow** (Bing, Yandex, etc.).  
**Ref:** **`docs/BING_INDEXNOW_SETUP.md`**.

---

## 10. Files reference

| File / artifact | Role |
|-----------------|------|
| **`src/utils/structuredData.js`** | All JSON-LD: Person, WebSite, Organization, Service, Article, SoftwareApplication, BlogPosting, BreadcrumbList, WebPage, Speakable, FAQPage, CollectionPage, ItemList. **generatePersonSchema**, **generateHomePageStructuredData**, etc. Blog keywords from **getMetaKeywords('/blog/' + slug)**. |
| **`src/utils/seo.js`** | Meta: setTitle, setDescription, setKeywords, setCanonical, setSocialMeta, setRobots. applyHomeSEO, applyBlogIndexSEO, applyBlogSEO, applyProjectSEO, applyServiceSEO, setPageSEO. Uses **getMetaKeywords(path)** from seoKeywords.js. |
| **`src/config/seoKeywords.js`** | **SEO_KEYWORDS** (path → { primary, secondary, semantic }), **getMetaKeywords(path)**. Generated from **SEO_KEYWORDS_UPGRADE.md** by script. |
| **`src/config/constants.js`** | **APP_CONFIG** (fullName, titleTagline, contactLinks), **SITE_URL**. **SITE_URL**: in browser = `window.location.origin` (one build for CNAME/multi-deploy); at build/SSR = **VITE_FIREBASE_SITE_URL** or default `https://waqas.ragnorx.com`. |
| **`src/router/index.js`** | Calls apply* / setPageSEO and injectStructuredData per route; imports getMetaKeywords for Privacy, 404, fallback, article-not-found. |
| **`src/views/Home.vue`** | Calls **generateHomePageStructuredData()** (Person, Organization, WebSite, WebPage, Speakable). |
| **`public/llms.txt`** | Static site summary; copied to dist by **copy-llms-txt.js**. |
| **`public/<key>.txt`** | IndexNow key file; must be deployed at root. |
| **`docs/SEO_KEYWORDS_UPGRADE.md`** | **Keyword data** source of truth: strategy + 82 URL keyword sets (Format B). |
| **`scripts/generate-seo-keywords-config.js`** | Parses **SEO_KEYWORDS_UPGRADE.md** and writes **src/config/seoKeywords.js**. |
| **`scripts/generate-sitemap.js`** | Builds sitemap from routes + blog slugs. |
| **`scripts/submit-bing-indexnow.js`** | Submits URL list to IndexNow. |
| **`scripts/write-robots-firebase.js`** | Writes dist/robots.txt (Firebase build). |
| **`scripts/copy-llms-txt.js`** | Copies public/llms.txt to dist. |
| **`scripts/validate-sitemap.js`** | Validates dist/sitemap.xml (or public/) after build; checks URL count and structure. |
| **`index.html`** | Static fallback: default meta (title, description, keywords, robots, language), canonical, sitemap link, llms.txt alternate, Google site verification; static JSON-LD (see §13). Vue overwrites meta and schema on navigation. |
| **`src/config/semanticKeywords.js`** | Topic-level **SEMANTIC_KEYWORDS** (primary, semanticVariants, entities) for content strategy / topical authority. **Not** the source for Person knowsAbout (that is hardcoded in structuredData.js). |
| **`src/config/topicClusters.js`** | **CLUSTERS**, **SERVICE_CLUSTER_MAP**, **PROJECT_CLUSTER_MAP** for “Part of cluster” labels and internal linking. |
| **`src/config/topicClusterLinking.js`** | **CLUSTERS_8**, service/blog/project → blog slugs for topic-cluster internal linking. |
| **`src/config/relatedServices.js`** | **SERVICE_PATHS**, **getRelatedServices**, **getRelatedServicesForProject**; used by service/project/blog “Related services” links. |
| **`src/config/flagshipBlogArticles.js`** | **FLAGSHIP_BLOG_ARTICLES** — curated list aligned with llms.txt “Representative & Flagship Content”; used in Footer “Explore”. |
| **`src/data/faqData.js`** | **buildFaqItems()** — home page FAQ data used by HomeFAQ.vue. Service page FAQs are defined per view (e.g. DatabaseDesignOptimizationPage.vue faqItems); blog article FAQs in article config (`article.faqs`). All feed **generateFAQPageSchema()** for FAQPage schema. |

**Supporting / optional scripts (not required for core SEO):** `scripts/verify-urls-indexing.js`, `scripts/check-indexing-status.js`, `scripts/audit-blog-seo-compliance.js`, `scripts/analyze-seo.js` — used for verification or audits.

---

## 11. Authority / spam rules (quick reference)

- **Meta keywords:** Content-driven per URL (§4); max 5–8 phrases (primary first, then secondary + semantic); no best/top/elite; no geo/company/URL stuffing; no generic filler.  
- **llms.txt:** Identity + expertise + flagship URLs + breadth; no per-article keyword blocks; static file.  
- **Structured data:** Identity and capability only; no reviews/testimonials in schema; no Offer/JobPosting/ProfessionalService spam; Service = capability-only; Person = no resume dump, no marketing.  
- **Content:** Safe keyword = pointable to a section/CTA; spam risk = rank-only with no corresponding content.  
- **Titles:** One intent per page; 55–60 chars; brand last; no stuffing.  
- **Content / markup:** Exactly one H1 per page; no hidden or offscreen SEO (no `left:-9999px`, no noscript keyword dumps, no hidden divs for crawlers).  
- **Keywords (meta):** Author name (**APP_CONFIG.fullName**) is stripped from keyword arrays before setting meta keywords (§4).

---

## 12. Person schema — docs status

**This doc (§1):** Describes the **current** Person schema (headline, description, jobTitle string, hasOccupation, knowsAbout, specialty, worksFor, alumniOf).  
**Previous docs** that described Person (e.g. jobTitle as array) have been removed. For **current** Person “jobTitle (array)” and “jobTitle, knowsAbout, alumniOf” without headline/hasOccupation/worksFor; they are **out of date** for Person. For **current** Person and all SEO behaviour, use **this document** and **`src/utils/structuredData.js`** (generatePersonSchema).

---

## 13. index.html — static fallback & discovery

**Purpose:** Crawlers that don't execute JS (or before Vue mounts) see baseline meta and discovery links. Vue (seo.js, structuredData.js) overwrites meta and injects Option B schema on navigation.

**In index.html:**

| Item | Role |
|------|------|
| **`<html lang="en">`** | Language for accessibility and SEO. |
| **Default meta** | `title`, `description`, `keywords`, `robots` (index, follow), `language` (English). Replaced by Vue per route. |
| **Google Search Console** | `<meta name="google-site-verification" content="…">` — one tag for canonical property (e.g. waqas.ragnorx.com). |
| **Canonical** | `<link rel="canonical" href="…">` — default home; Vue updates per route. |
| **Sitemap discovery** | `<link rel="sitemap" type="application/xml" href="…/sitemap.xml">`. |
| **llms.txt discovery** | `<link rel="alternate" type="text/plain" href="/llms.txt" title="AI Search Engine Index">`. |
| **Static JSON-LD** | One `<script type="application/ld+json">` with `@graph`: Person, WebSite, ProfessionalService, BreadcrumbList. **Note:** This block is **legacy** — Person uses `jobTitle` as array and single `hasOccupation`; it includes **ProfessionalService** (areaServed, availableChannel). **Option B** (Vue) uses Person with `jobTitle` string, 5× hasOccupation, no ProfessionalService. On Home, **Vue replaces** this with `generateHomePageStructuredData()`. Consider aligning the static block with Option B or removing it to avoid conflicting signals. |
| **Noscript** | Minimal fallback for non-JS crawlers: one H1, short description, contact. Content is not keyword stuffing; it is a single concise summary. (Positioning is offscreen for visual users; crawlers that don't run JS may still index it.) |
| **Favicon** | **favicon.ico** and PNGs (48×48, 32×32, 16×16) at root; **apple-touch-icon**; **site.webmanifest**. Required for SERP icon display (Google). |

**Deploy-time:** Deploy script may rewrite **dist/index.html** (canonical, sitemap link, OG, static JSON-LD) to target base URL. **Google Search Console:** Verify property (meta tag in index.html), submit sitemap; see **`docs/GOOGLE_SEARCH_CONSOLE_SETUP.md`**.

---

## 14. Internal linking (topic clusters & related content)

**Strategy:** Service, project, and blog pages cross-link by topic clusters and "Related services" so crawlers and users discover related content. No link stuffing; every link is to a real page with relevant content.

**Config:**

- **`src/config/relatedServices.js`** — **SERVICE_PATHS**, **getRelatedServices(serviceKey)**, **getRelatedServicesForProject(projectKey)**. Used by service pages (RelatedServices.vue), project pages (related services block), and blog article template (article.relatedServices → service links).
- **`src/config/topicClusters.js`** — **CLUSTERS** (cloud, fullStack, leadership, mobile), **SERVICE_CLUSTER_MAP**, **PROJECT_CLUSTER_MAP**. Used for "Part of cluster" labels and **TopicClusterLinks.vue** (links to other services/projects in same cluster).
- **`src/config/topicClusterLinking.js`** — **CLUSTERS_8**, **getBlogSlugsForService**, **getBlogSlugsForProject**; maps services/projects to blog slugs for topic-cluster blog links.

**Components:** **TopicClusterLinks.vue** (cluster-based links), **RelatedServices.vue** (related service links). Blog articles declare **relatedServices** (service keys) in frontmatter; **ArticlePageTemplate.vue** and **BlogArticlePage.vue** render those links. Project pages pass **relatedServices** to the same pattern.

**Ref:** **`docs/TOPIC_CLUSTER_LINKING_IMPLEMENTATION_CHECKLIST.md`** for the full cluster plan.

---

## 15. Other config & supporting scripts

**Semantic keywords:** **`src/config/semanticKeywords.js`** exports **SEMANTIC_KEYWORDS** (topic key → primary, semanticVariants, entities). Used for content strategy and topical authority (e.g. internal tooling or future schema). **Person schema's knowsAbout** is **not** sourced from here; it is a fixed array in **`structuredData.js`** (generatePersonSchema).

**Flagship content:** **`src/config/flagshipBlogArticles.js`** — **FLAGSHIP_BLOG_ARTICLES** (slug + title). Kept in sync with the "Representative & Flagship Content" section in **`public/llms.txt`**. Used in **Footer.vue** "Explore" and other high-signal entry points.

**Supporting scripts (optional):**

- **`scripts/validate-sitemap.js`** — Run after build to validate sitemap structure and URL count.
- **`scripts/verify-urls-indexing.js`**, **`scripts/check-indexing-status.js`** — Check indexing status (e.g. Bing/Google).
- **`scripts/audit-blog-seo-compliance.js`**, **`scripts/analyze-seo.js`** — SEO audits and analysis; not required for core implementation.

---

## 16. Pre-launch / verification (quick checklist)

- **After build:** Run **`node scripts/validate-sitemap.js`** (or it runs in the build pipeline). Confirm **robots.txt** and **sitemap.xml** are present in dist and correct.
- **After deploy:** Run **`npm run submit-bing`** so IndexNow has the live key file. Optionally run **`node scripts/audit-blog-seo-compliance.js`** to verify article meta/schema.
- **Live check:** Open `https://<your-domain>/robots.txt`, `/sitemap.xml`, `/llms.txt` and confirm content and base URL. Validate a few URLs in [Google Rich Results Test](https://search.google.com/test/rich-results).

---

*Last consolidated: 2026-02. **Removed (content consolidated here):** SEO_REVAMP_CHANGELOG.md, SEO_MASTER_CHECKLIST_81_URLS.md, SEO_POST_IMPLEMENTATION_AUDIT.md, SEO_AUDIT.md, SEO_81_PAGES_FULL_PLAN.md, SEO_AI_81_PAGES_IMPLEMENTATION_PLAN.md, STRUCTURED_DATA_VALIDATION_GUIDE.md, SEO_GOOGLE_GUIDELINES_COMPLIANCE.md, AI_SEO_ENTITY_81_URLS_CHECKLIST.md, SEO_KEYWORDS_IMPLEMENTATION_PLAN.md, SEO_CODE_SPLITTING_SAFETY.md, FINAL_GO_CHECKLIST.md. For keyword tables and JSON blocks, see **SEO_KEYWORDS_UPGRADE.md**. For llms.txt rationale, see **LLMS_TXT_GUIDE.md**. For IndexNow setup, see **BING_INDEXNOW_SETUP.md**. For topic clusters, see **TOPIC_CLUSTER_LINKING_IMPLEMENTATION_CHECKLIST.md**. For canonical domain and redirects, see **REDIRECT_AND_DOMAINS.md**. For Search Console, see **GOOGLE_SEARCH_CONSOLE_SETUP.md**.*
