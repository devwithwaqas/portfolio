# SEO Post-Implementation Audit

**Document purpose:** Full record of SEO implementation status **after** the blog and sitewide SEO upgrade. Every indexable URL and every SEO element is accounted for.

**Scope:** 81 URLs in sitemap (indexable) + 1 catch-all 404 = 82 page types. Firebase canonical base: `https://waqasahmad-portfolio.web.app`.

**References:** `docs/SEO_BLOG_AND_SITEWIDE_PLAN.md`, `docs/SEO_UPGRADE_IMPLEMENTATION_PLAN.md`, `docs/SEO_REVAMP_CHANGELOG.md`, `src/utils/seo.js`, `src/utils/structuredData.js`, `src/config/semanticKeywords.js`, `src/config/topicClusters.js`, `public/llms.txt`, `public/robots.txt`, `scripts/generate-sitemap.js`, `scripts/copy-llms-txt.js`, `scripts/write-robots-firebase.js`.

**Audit date:** 2026-02-03. **Revamp (Feb 2026):** Authority and spam cleanup applied; see **§ Revamp (Feb 2026)** and **`docs/SEO_REVAMP_CHANGELOG.md`** for the full list.

---

## Opening (Authority setup)

This audit and the implementation it describes address a specific problem: a content-rich portfolio site (82 URLs, 61 long-form articles) needs to be reliably interpretable by search engines and AI systems without relying on guesswork or one-size-fits-all advice. The approach is relevant when you have a fixed set of indexable URLs, server-rendered or client-rendered meta/schema, and a build pipeline you control. It breaks down when URLs are dynamic or user-generated at scale, when you don’t own the build (e.g. pure CMS with no custom output), or when the goal is quick hacks rather than a consistent, auditable layer. I’ve applied this in contexts where a single technical owner or a small team maintains the site and can run scripts at build time; the same pattern would need adaptation for large, multi-tenant or multi-region setups.

This document is for engineers or technical leads who need a complete, implementer-level record of what is in place and why—and for anyone evaluating whether this stack is appropriate to reuse or extend. It is not for beginners looking for “what is meta description” or for teams that need a vendor-style pitch; the tables and file references are the product.

---

## Decision Context

- **System scale:** 81 indexable URLs in sitemap (1 home, 7 services, 10 projects, 1 blog index, 61 articles, 1 privacy, plus 1 catch-all 404). Single canonical origin (Firebase). No multi-locale or A/B URL sets.
- **Team size:** Implemented and maintained by one technical owner; build and deploy are scripted. No content teams editing meta in a UI; article metadata lives in config files and is updated via scripts.
- **Time / budget pressure:** SEO had to coexist with existing Vue SPA, router, and lazy-loaded routes. Meta and structured data were kept in the critical path (router `beforeEnter`), not in lazy chunks, to avoid crawler gaps. No separate “SEO server” or edge layer.
- **Technical constraints:** Client-side meta and JSON-LD (except Home, which has static fallback). Crawlers that execute JS see the same data; Home has noscript and static JSON-LD for worst case. llms.txt and sitemap are build-time generated and copied to output.
- **Non-goals:** We did not optimize for social virality, paid discovery, or third-party syndication. We did not add per-URL meta for infinite or user-generated URLs. Uniqueness audit of every title/description (Phase 8) and schema copy audit (Phase 9) were left as optional, manual follow-ups.

---

## Position & Rationale

I treat meta, schema, and llms.txt as one coherent “SEO surface”: same canonical URL, same intent, consistent titles and descriptions. Splitting “SEO for Google” from “SEO for AI” leads to drift and duplicate work; one source of truth per URL, then multiple outputs (meta tags, JSON-LD, llms blocks), is what we did.

I avoid putting SEO-critical logic (setPageSEO, injectStructuredData) in lazy-loaded route components. It only works if the code that sets title, description, and schema runs before first paint and for every route—so it lives in router `beforeEnter` and stays in the main bundle. I also avoid capping blog keyword lists at an arbitrary low number “for readability”; crawlers don’t render the page, and we dedupe strictly. The 200–1200 terms per article are there for coverage and entity clarity, not for humans to read.

Rich snippets (Speakable, ItemList, FAQPage, BlogPosting.keywords) are implemented where the content exists. I didn’t add schema for content we don’t have (e.g. fake FAQs). Over-claiming in schema is a trust and policy risk; the bar is “accurate and derivable from existing copy or config.”

---

## Trade-Offs & Failure Modes

- **What this approach sacrifices:** No server-side or edge-level meta/schema. Everything except Home’s static block is client-set. If a crawler doesn’t run JS or times out before router runs, it may see incomplete or default meta. We accepted that in exchange for a single codebase and no separate SSR pipeline.
- **Scale:** The keyword script and llms script run at build time over 61 articles. If the article set grew to thousands, file-based config and single-pass scripts would need to be replaced with a proper data pipeline or CMS-driven generation.
- **Misapplication:** Using the same “max keywords per article” logic on a thin, templated site would be noise. The 200–1200 range is tied to real word count and topic; copying the number without the content depth would not help and could look like stuffing.
- **Early warning signs:** Duplicate meta titles or descriptions across URLs; BlogPosting or Service schema with generic, copy-pasted text; llms.txt out of sync with live articles (e.g. new posts not in llms.txt because the build script wasn’t run). Those are the first things to check if rankings or AI citations drift.

---

## What Most Guides Miss

Most SEO guides focus on “add a meta description” and “add JSON-LD” in isolation. They rarely tie three things together: (1) where the data lives (config vs. CMS vs. code), (2) when it’s emitted (build time vs. request time vs. client hydration), and (3) who consumes it (Googlebot, Bing, AI crawlers, social scrapers). Here, meta and schema are derived from the same config and set in the same place (router); llms.txt is generated from the same article config at build. That way, when you change an excerpt or title, one script run updates meta, schema, and llms blocks without hand-editing three outputs.

Another gap: many posts say “use schema” but don’t specify where in the app lifecycle it’s injected. In a SPA, if schema is injected inside a lazy-loaded component, crawlers that don’t wait for that chunk may never see it. We inject in the router beforeEnter so it’s on the critical path; that’s a deliberate constraint, not an accident.

---

## Decision Framework

- **If the page is Home** → Static meta + JSON-LD in HTML, plus noscript fallback; client can still overwrite. Ensures something sensible is visible even without JS.
- **If the page is a known route (service, project, blog index, article, privacy, 404)** → setPageSEO and injectStructuredData in router beforeEnter; no lazy chunk. Data comes from central config (services, projects, blogArticles).
- **If the page is a blog article** → Keywords = dedupe(article.keywords + semantic terms for topic). No cap. Same array → meta, BlogPosting.keywords, and llms block. Keyword count scaled by article word count (200 for &lt;2k words; up to 1200 for long pieces).
- **If you add a new blog article** → Add config file; run keyword script to refresh keywords array; run build (which runs llms script and sitemap). No manual llms.txt editing.
- **If you need a new URL type** → Add route, add SEO getter (e.g. getXPageSEO), add schema generator if needed, add to sitemap and (if relevant) llms.txt generator. Keep meta/schema in router beforeEnter.
- **If crawler behavior is unclear** → Prefer one canonical origin, one set of meta/schema per URL, and build-time artifacts (sitemap, llms.txt) so there’s no request-time variance.

---

## Key Takeaways

- Meta, canonical, OG, Twitter, and JSON-LD are set per URL from a single source (config + router); no duplicate definitions.
- SEO-critical code lives in the critical path (router beforeEnter), not in lazy-loaded components, so crawlers that run JS see it consistently.
- **Meta keywords:** Site-wide cap of **5–8 topic-cluster phrases**; blog articles use 5–8 from topic cluster (not large arrays). See `docs/SEO_REVAMP_CHANGELOG.md`.
- **llms.txt:** **Static site summary** in `public/llms.txt`; build runs `copy-llms-txt.js` only (no per-article blocks). See `docs/LLMS_TXT_GUIDE.md`.
- **Structured data (Option B):** Person, WebSite, Organization, Service only (no Offer/ProfessionalService/JobPosting/reviews in schema). See `docs/SEO_REVAMP_CHANGELOG.md` §1.
- Speakable, ItemList (blog index), and FAQPage are used only where the underlying content exists; we don’t invent schema for missing content.
- Optional Phase 8 (uniqueness audit) and Phase 9 (schema copy audit) remain for manual follow-up; the implementation is complete without them.

---

## Revamp (Feb 2026) – authority & anti-spam

| Area | Current state (post-revamp) |
|------|-----------------------------|
| **Structured data** | Option B: Person/WebSite/Organization, Service (no Offer/ProfessionalService), Article+SoftwareApplication on projects, BlogPosting+BreadcrumbList+optional FAQ/Speakable on blog; Home: no testimonials/reviews/JobPosting. **Ref:** `docs/SEO_REVAMP_CHANGELOG.md` §1. |
| **Meta keywords** | 5–8 topic phrases site-wide; `seo.js` apply* + setPageSEO. |
| **llms.txt** | Static `public/llms.txt`; build: `copy-llms-txt.js` only. |
| **robots.txt** | `Allow: /`; no duplicate Bingbot; Disallow /admin/, /api/. |
| **Sitemap** | 81 URLs; strict order; normalized priority/changefreq; lastmod preserved. |
| **Service pages** | No sticky CTA bar; Full Stack = same structure as other services. |

**Full list:** **`docs/SEO_REVAMP_CHANGELOG.md`**.

---

## When I Would Use This Again — and When I Wouldn’t

I would use this again for: a fixed or slowly growing set of indexable URLs, a Vue (or similar) SPA with a single build, and a need for both traditional search and AI/llm discoverability. Same pattern fits consultant/portfolio sites, documentation sites, or small product marketing sites where one team owns content and build.

I wouldn’t use it as-is for: large-scale or multi-tenant sites, fully CMS-driven sites with no build-time control, or when meta/schema must vary by region or experiment without code deploys. In those cases you’d want server or edge rendering of meta/schema and a pipeline that generates sitemap and llms.txt from a database or API, not from static config files. I also wouldn’t copy the large keyword lists to a site with thin or templated content; the density is justified only when the page body is substantive and the terms are genuinely derived from it.

---

## 1. Executive Summary

### 1.1 What is done

| Area | Status | Details |
|------|--------|---------|
| **Meta (title, description, keywords, canonical, robots)** | ✅ All 82 URLs | Set via `setPageSEO` in router `beforeEnter` (Home also has static fallback in index.html). |
| **Open Graph & Twitter Card** | ✅ All 82 URLs | Full OG + Twitter set per page; blog articles use `og:type` article. |
| **Structured data (JSON-LD)** | ✅ All 82 URLs | Home: static + client; Services/Projects/Blog: client in router; Privacy/404: BreadcrumbList only. |
| **BreadcrumbList** | ✅ All 82 URLs | Home (static), Services, Projects, Blog index, Blog articles, Privacy, 404. |
| **Speakable schema** | ✅ Where applicable | Home, 7 Services, 10 Projects, Blog index, 61 Blog articles. Privacy/404: N/A. |
| **Semantic keywords** | ✅ Sitewide | Home (Person/skills); Services (topic-based); Blog articles (topic + per-article 200–1200 terms). |
| **Blog article keywords** | ✅ 61 articles | Per-article `keywords` array (200–1200 terms, scaled by word count); strict dedupe; used in meta, BlogPosting.keywords, llms.txt. |
| **TopicClusterLinks on blog** | ✅ | ArticlePageTemplate shows cluster links when `articleTopic` provided; `getClusterForBlog(topic)` in topicClusters.js. |
| **Blog index schema** | ✅ | CollectionPage, BreadcrumbList, **ItemList** (all articles), **Speakable** (`.blog-intro`, `.article-lead`). |
| **llms.txt** | ✅ All URLs covered | Global + Home + Services (7) + Projects (10) + Blog section + **61 per-article blocks** (Title, URL, Summary, Keywords, Attribution). |
| **robots.txt** | ✅ | Allow /, /projects/, /services/, assets, sitemap, llms.txt; comment for /blog; Sitemap URL. |
| **Sitemap & IndexNow** | ✅ | 81 URLs in sitemap; IndexNow script submits same list. |
| **Crawler/JS strategy** | ✅ | SEO (meta + schema) in critical path (router beforeEnter); no lazy chunk for SEO. |

### 1.2 Optional items not yet done (no code change required)

| Item | Plan reference | Description |
|------|----------------|-------------|
| **Phase 8: Uniqueness audit** | Part 5.5 | Audit meta titles and meta/schema descriptions sitewide; fix any duplicates. Manual/semi-automated. |
| **Phase 9: Schema audit** | Part 5.5 | Review Person, Service, Article, WebSite for generic/duplicate descriptions; align with content strategy. |

---

## 2. URL inventory (81 indexable + 404)

| Category | Count | Paths |
|----------|-------|--------|
| **Home** | 1 | `/` |
| **Projects** | 10 | `/projects/heat-exchanger`, `/projects/airasia-id90`, `/projects/bat-inhouse-app`, `/projects/pj-smart-city`, `/projects/gamified-employee-management`, `/projects/valet-parking`, `/projects/mobile-games`, `/projects/uk-property-management`, `/projects/g5-pos`, `/projects/chubb-insurance-applications` |
| **Services** | 7 | `/services/full-stack-development`, `/services/azure-cloud-architecture`, `/services/technical-leadership`, `/services/microservices-architecture`, `/services/agile-project-management`, `/services/database-design-optimization`, `/services/mobile-development` |
| **Blog index** | 1 | `/blog` |
| **Blog articles** | 61 | `/blog/<slug>` — see Section 5 for full slug list. |
| **Privacy** | 1 | `/privacy` |
| **404** | 1 | `/:pathMatch(.*)*` (any non-matched path) |
| **Total** | **82** | 81 in sitemap; 404 not in sitemap. |

---

## 3. SEO elements by URL type (summary)

| # | Check | Home | Services (7) | Projects (10) | Blog index | Blog articles (61) | Privacy | 404 |
|---|--------|------|--------------|---------------|------------|---------------------|---------|-----|
| 1 | Meta: title, description, keywords | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2 | Canonical (Firebase URL) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 3 | Meta robots (index, follow, max-*) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 4 | Open Graph (full set) | ✅ | ✅ | ✅ | ✅ | ✅ (article) | ✅ | ✅ |
| 5 | Twitter Card (summary_large_image) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 6 | BreadcrumbList schema | ✅ static | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 7 | Primary entity schema | Person, WebSite, etc. | Service | Article, SoftwareApplication | CollectionPage | BlogPosting | — | — |
| 8 | Speakable schema | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | N/A |
| 9 | Semantic keywords (meta + schema) | ✅ | ✅ | Via copy | Generic | ✅ (200–1200/article) | N/A | N/A |
| 10 | Topic cluster links (UI) | N/A | ✅ | ✅ | N/A | ✅ | N/A | N/A |
| 11 | BlogPosting.keywords (rich) | N/A | N/A | N/A | N/A | ✅ | N/A | N/A |
| 12 | Per-article keywords in config | N/A | N/A | N/A | N/A | ✅ 61 | N/A | N/A |
| 13 | llms.txt per-URL block | ✅ | ✅ | ✅ | ✅ Blog | ✅ 61 blocks | N/A | N/A |
| 14 | SEO in critical path (router) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 4. Detail by URL type

### 4.1 Home (`/`)

| Element | Implementation |
|---------|----------------|
| **Meta** | Static in index.html; app overwrites via getHomePageSEO (title, description, keywords, canonical, robots). |
| **OG / Twitter** | setOpenGraph, setTwitterCard in router; fullTitle, description, image (waqas-profile-hoodie.jpg), url, type website, site_name, locale. |
| **Structured data** | Static in index.html: Person, ProfessionalService (or WithReviews), Organization, JobPosting, WebSite, BreadcrumbList. Client adds more if needed. Speakable: #hero, #hero h1, #hero .lead, #about, #about .summary, .key-benefits. |
| **Semantic keywords** | Person schema skills; meta keywords from getSkillExpertDeveloperKeywords + semantic variants. |
| **llms.txt** | Section: Home Page - Professional Profile (Title, URL, Summary, Description, Attribution, Also known as, Keywords). |
| **LCP / Noscript** | Hero image preload (route-based); noscript block with H1, H2, services, skills, availability, contact. |

### 4.2 Services (7 URLs)

| Element | Implementation |
|---------|----------------|
| **Meta** | getServicePageSEO(service): title = service.title + " \| Waqas Ahmad", description from service, keywords = base + getSemanticVariantsForTopic(SERVICE_TO_TOPIC[slug]). Canonical, robots. |
| **OG / Twitter** | fullTitle, description, image (service hero or default), url, type website, site_name, locale. |
| **Structured data** | generateServicePageStructuredData: Service, BreadcrumbList (Home → Services → title), ImageObject (hero, process, CTA, banners), HowTo (process steps), FAQPage (if faqItems), Offer, Speakable (#service-hero, #service-hero h1, .service-lead, .key-benefits, .cta-section). |
| **Topic clusters** | TopicClusterLinks on ServicePageTemplate; cluster from topicClusters.js. |
| **llms.txt** | One block per service: Title, URL, Summary, Description, Attribution, Engagement, Client types, Outcomes, Tech. |

**Service paths:** full-stack-development, azure-cloud-architecture, technical-leadership, microservices-architecture, agile-project-management, database-design-optimization, mobile-development.

### 4.3 Projects (10 URLs)

| Element | Implementation |
|---------|----------------|
| **Meta** | getProjectPageSEO(project): title, description, keywords (skill + project terms). Canonical, robots. |
| **OG / Twitter** | fullTitle, description, image (project or default), url, type website. |
| **Structured data** | generateProjectPageStructuredData: Article, SoftwareApplication, BreadcrumbList (Home → Portfolio → title), Review + AggregateRating when PROJECT_TESTIMONIALS_MAP or PROJECT_METRICS_MAP, Speakable (#portfolio-details, #portfolio-details h1, .portfolio-details .section-title, .page-title .current). |
| **Topic clusters** | TopicClusterLinks on ProjectPageTemplate. |
| **llms.txt** | One block per project: Title, URL, Summary, Description, Attribution. |

**Project paths:** heat-exchanger, airasia-id90, bat-inhouse-app, pj-smart-city, gamified-employee-management, valet-parking, mobile-games, uk-property-management, g5-pos, chubb-insurance-applications.

### 4.4 Blog index (`/blog`)

| Element | Implementation |
|---------|----------------|
| **Meta** | getBlogIndexSEO(): title "Blog \| Waqas Ahmad", description (technical blog, Azure, .NET, articles), keywords (blog, Azure, .NET, etc.). Canonical, robots. |
| **OG / Twitter** | fullTitle, description, image default, url, type website. |
| **Structured data** | generateBlogIndexStructuredData: CollectionPage (name, description, url, author, breadcrumb), BreadcrumbList (Home → Blog), **ItemList** (all 61 articles: position, url, title, sorted by date), **Speakable** (.blog-intro, .article-lead). |
| **llms.txt** | Section "Blog" (Title, URL, Summary, Description, Attribution, Keywords); then 61 separate article blocks below. |

### 4.5 Blog articles (61 URLs)

| Element | Implementation |
|---------|----------------|
| **Meta** | getBlogArticleSEO(article): title = article.title + " \| Waqas Ahmad", description = article.excerpt, keywords = dedupe(title, topic, relatedServices, getSemanticTermsForBlogTopic(article.topic), article.keywords). No cap; full array. Canonical, robots. |
| **OG / Twitter** | fullTitle, description, image (article or default), url, **og:type article**, site_name, locale. |
| **Structured data** | generateBlogArticleStructuredData(article, { keywords }): BlogPosting (headline, description=excerpt, author @id #person, datePublished, dateModified, mainEntityOfPage, image, **keywords** = options.keywords joined comma), BreadcrumbList (Home → Blog → title), Speakable (#article-hero, #article-hero h1, .article-lead, .article-body), FAQPage (if article.faqs). |
| **Keywords source** | article.keywords (200–1200 terms per article from scripts/update-blog-keywords-to-plan.js: primary, long-tail, slug subphrases, title subphrases, topic terms, shared terms; strict dedupe). Router passes seo.keywords to generateBlogArticleStructuredData. |
| **Topic clusters** | ArticlePageTemplate receives articleTopic; TopicClusterLinks with pageType="blog" and topic; getClusterForBlog(article.topic) in topicClusters.js. |
| **llms.txt** | 61 blocks generated by scripts/generate-llms-blog-articles.js: Title, URL, Summary (excerpt), Keywords (from article.keywords), Attribution. Script runs in npm run build; output in public/llms.txt then copied to dist. |

### 4.6 Privacy (`/privacy`)

| Element | Implementation |
|---------|----------------|
| **Meta** | title, description (privacy/analytics), keywords. Canonical, robots. |
| **OG / Twitter** | fullTitle, description, url, type website. |
| **Structured data** | BreadcrumbList (Home → Privacy) only. |
| **llms.txt** | No dedicated block (policy page). |

### 4.7 404 (catch-all)

| Element | Implementation |
|---------|----------------|
| **Meta** | title "Page Not Found", description (page not found, return home). Canonical to current path, robots. |
| **OG / Twitter** | fullTitle, description, url. |
| **Structured data** | BreadcrumbList (Home → Page Not Found). |
| **Sitemap** | 404 URL is not included in sitemap (81 URLs only). |

---

## 5. Full list of blog article URLs (61)

Each has: meta (title, description, keywords 200–1200), canonical, robots, OG (type article), Twitter, BlogPosting (with rich keywords), BreadcrumbList, Speakable, FAQPage (if faqs), TopicClusterLinks (when topic mapped), llms.txt block.

| # | Slug | Topic (example) | Keyword count range |
|---|------|-----------------|----------------------|
| 1 | agile-delivery-enterprise-constraints | Leadership | 200–600 |
| 2 | ai-changing-code-review-testing | Architecture | 600–1200 |
| 3 | ai-ides-what-they-get-right-wrong | Architecture | 200–600 |
| 4 | ai-models-claude-gemini-gpt-deepseek-comparison | Architecture | 200–600 |
| 5 | api-gateway-vs-bff | Architecture | 200–600 |
| 6 | azure-bicep-iac-basics | Cloud | 200 |
| 7 | azure-cloud-architecture-patterns | Cloud | 600–1200 |
| 8 | azure-devops-vs-github-actions | Cloud | 200–600 |
| 9 | azure-microservices-best-practices | Cloud | 200–600 |
| 10 | azure-serverless-functions-logic-apps | Cloud | 200 |
| 11 | behavioral-design-patterns-dotnet | Architecture | 600–1200 |
| 12 | caching-strategies-redis-dotnet | Data | 200 |
| 13 | case-study-airasia-id90 | Full-Stack / Cloud | 200–600 |
| 14 | case-study-bat-inhouse-app | Full-Stack / Data | 200–600 |
| 15 | ci-cd-azure-devops | Cloud | 200–600 |
| 16 | clean-architecture-dotnet | Architecture | 600–1200 |
| 17 | creational-design-patterns-dotnet | Architecture | 200–600 |
| 18 | current-state-ai-coding-tools-2026 | Architecture | 600–1200 |
| 19 | cursor-vs-claude-code-vs-copilot-ai-ide | Architecture | 600–1200 |
| 20 | data-engineering-azure-pipelines-lakehouse | Data / Cloud | 200–600 |
| 21 | data-engineering-batch-vs-streaming | Data | 200 |
| 22 | database-indexing-strategies | Data | 200–600 |
| 23 | database-optimization-entity-framework | Data | 200–600 |
| 24 | database-transactions-isolation-levels | Data | 600–1200 |
| 25 | dependency-injection-dotnet-core | Architecture | 200–600 |
| 26 | design-patterns-overview-creational-structural-behavioral | Architecture | 200–600 |
| 27 | developers-integrating-ai-daily-workflows | Architecture | 600–1200 |
| 28 | domain-driven-design-basics | Architecture | 200 |
| 29 | dotnet-core-middleware-pipeline | Full-Stack | 200–600 |
| 30 | event-driven-architecture-azure | Cloud | 200–600 |
| 31 | event-sourcing-and-cqrs | Architecture | 200–600 |
| 32 | feature-flags-toggles-dotnet | Architecture | 200–600 |
| 33 | full-stack-net-angular-enterprise | Full-Stack | 200–600 |
| 34 | gamification-enterprise-apps | Architecture | 200–600 |
| 35 | grpc-vs-rest-dotnet-apis | Full-Stack | 200 |
| 36 | impact-ai-tools-code-quality-maintainability | Architecture | 600–1200 |
| 37 | kubernetes-basics-dotnet-developers | Cloud | 200 |
| 38 | microservices-resilience-circuit-breaker-retry | Architecture | 200–600 |
| 39 | mobile-app-architecture-vue-capacitor | Mobile | 200–600 |
| 40 | monorepo-vs-polyrepo | Architecture | 200–600 |
| 41 | oauth2-openid-connect-dotnet | Full-Stack | 200 |
| 42 | observability-dotnet-azure | Cloud | 200–600 |
| 43 | open-telemetry-distributed-tracing-dotnet | Architecture | 200–600 |
| 44 | owasp-api-security-top-10 | Full-Stack | 200–600 |
| 45 | property-management-systems-uk | Data / Full-Stack | 200–600 |
| 46 | repository-pattern-unit-of-work-dotnet | Architecture | 200 |
| 47 | rest-api-versioning-idempotency | Full-Stack | 200–600 |
| 48 | rest-vs-graphql-apis | Full-Stack | 200 |
| 49 | saga-pattern-orchestrator-vs-choreography | Architecture | 200–600 |
| 50 | securing-apis-dotnet | Full-Stack | 200–600 |
| 51 | solid-principles-in-practice | Architecture | 200–600 |
| 52 | sql-server-performance-tuning | Data | 200–600 |
| 53 | structural-design-patterns-dotnet | Architecture | 200–600 |
| 54 | technical-leadership-remote-teams | Leadership | 600–1200 |
| 55 | testing-strategies-unit-integration-e2e | Full-Stack | 200 |
| 56 | trade-offs-ai-code-generation | Architecture | 200–600 |
| 57 | vue-enterprise-scale | Full-Stack | 200–600 |
| 58 | vue-vs-angular-vs-react-full-comparison | Full-Stack | 200–600 |
| 59 | what-developers-want-from-ai-assistants | Architecture | 200–600 |
| 60 | where-ai-fails-real-world-software-development | Architecture | 200–600 |
| 61 | why-ai-productivity-gains-plateau | Architecture | 200–600 |

*Keyword count per article: min 200, max 1001 (scaled by content word count: &lt;2k → 200; 2k–5k → 200–600; 5k+ → 600–1200).*

---

## 6. Implementation phases completed

| Phase | Task | Status |
|-------|------|--------|
| 1 | Topic → semantic key mapping (BLOG_TOPIC_TO_KEY); extend semanticKeywords.js (e.g. architecture) | ✅ |
| 2 | getBlogArticleSEO: semantic terms by topic + article.keywords, dedupe, no cap | ✅ |
| 3 | generateBlogArticleStructuredData: keywords from options.keywords (meta set) | ✅ |
| 4 | Add/update `keywords` array to all 61 blog articles (200–1200 terms, scaled, dedupe) | ✅ |
| 5 | TopicClusterLinks on article pages + getClusterForBlog(topic) | ✅ |
| 6 | robots.txt: comment for /blog | ✅ |
| 7a | llms.txt: 61 per-article blocks (generate-llms-blog-articles.js, run in build) | ✅ |
| 7b | Blog index: ItemList + Speakable in generateBlogIndexStructuredData | ✅ |
| 8 | Uniqueness audit (meta/schema descriptions sitewide) | ⏸ Optional |
| 9 | Schema audit (Person, Service, Article, WebSite descriptions) | ⏸ Optional |

---

## 7. Files and scripts reference

| File / script | Role |
|---------------|------|
| `src/utils/seo.js` | setPageSEO, setTitle, setDescription, setKeywords, setOpenGraph, setTwitterCard, setCanonical, setRobots; getHomePageSEO, getServicePageSEO, getProjectPageSEO, getBlogIndexSEO, getBlogArticleSEO (uses getSemanticTermsForBlogTopic, article.keywords). |
| `src/utils/structuredData.js` | injectStructuredData; generatePersonSchema, generateHomePageStructuredData, generateServicePageStructuredData, generateProjectPageStructuredData, generateBlogIndexStructuredData (CollectionPage, ItemList, Speakable), generateBlogArticleStructuredData (BlogPosting with options.keywords, BreadcrumbList, Speakable, FAQPage); generateSpeakableSchema. |
| `src/config/semanticKeywords.js` | SEMANTIC_KEYWORDS, BLOG_TOPIC_TO_KEY, getSemanticVariantsForTopic, getSemanticTermsForBlogTopic. |
| `src/config/topicClusters.js` | BLOG_TOPIC_TO_CLUSTER, getClusterForBlog, cluster definitions. |
| `src/config/blog/articles/*.js` | 61 articles: slug, title, excerpt, date, topic, **keywords** (array 200–1200), relatedServices, relatedArticleSlugs, faqs, content. |
| `src/config/blogArticles.js` | BLOG_ARTICLES array (from articles/*.js). |
| `src/router/index.js` | beforeEnter: setPageSEO, injectStructuredData; passes seo.keywords for blog article structured data. |
| `src/components/common/ArticlePageTemplate.vue` | articleTopic prop; TopicClusterLinks when articleTopic present. |
| `src/components/services/TopicClusterLinks.vue` | pageType="blog", topic → getClusterForBlog. |
| `public/llms.txt` | Global, Home, Services (7), Projects (10), Blog, 61 article blocks. |
| `public/robots.txt` | Allow /, /projects/, /services/, assets, sitemap, llms.txt; comment /blog; Sitemap URL. |
| `scripts/generate-sitemap.js` | Builds sitemap from router + blog slugs; 81 URLs. |
| `scripts/generate-llms-blog-articles.js` | Reads 61 article configs; writes 61 blocks into public/llms.txt (Title, URL, Summary, Keywords, Attribution). Run in build. |
| `scripts/update-blog-keywords-to-plan.js` | Updates keywords array in each of 61 article .js files: targetKeywordCount(wordCount), buildKeywords(title, slug, topic, contentWordCount) from primary, longTail, slugSubphrases, titleSubphrases, TOPIC_TERMS, SHARED_TERMS; strict dedupe. |
| `scripts/submit-bing-indexnow.js` | Submits URL list to IndexNow. |

---

## 8. Optional next steps

- **Phase 8:** Run a uniqueness audit: export meta title and meta description for all 82 URLs; flag duplicates; adjust copy so each URL has a unique, intent-matched title and description.
- **Phase 9:** Review Person, Service, Article, WebSite schema descriptions for generic or duplicate text; align with SEO_UPGRADE_IMPLEMENTATION_PLAN.md description strategy (unique, intent-matched, length-appropriate).

---

## 9. Advanced SEO – Audit by Core Pillars

This section audits the site against the **Advanced SEO – Precise Core Pillars** (authority, intent, entity, crawl, negation, information gain, internal authority, behavioral, technical trust). For each pillar we record **what is done** and **what is left** (gaps and recommendations). CLS is out of scope per project decision.

---

### 9.1 Authority (Trust Signals)

| Sub-pillar | Done (in depth) | Left / recommendations |
|------------|------------------|-------------------------|
| **Aged domain (time + consistency)** | Not controllable in code. Site has a single canonical origin (Firebase), consistent branding, and stable URL structure; no churn in route or slug design. | Out of scope: domain age and history are external. Keep URL and branding stable; avoid renaming services/projects or changing blog slugs without redirects. |
| **High-quality backlinks (relevant > high DR)** | Not controllable in code. Content is link-worthy: 61 long-form articles with authority sections, case studies, and technical depth. llms.txt and clear attribution support citation. | Out of scope: backlink acquisition is off-site. Optional: document target link types (e.g. dev blogs, conference slides, GitHub READMEs) and track in a simple log; no code change. |
| **Brand mentions (even unlinked)** | Person/Organization schema and consistent naming (Waqas Ahmad, same job titles, sameAs LinkedIn/Github/website) help engines associate mentions with the entity. llms.txt “Attribution” and “Also known as” reinforce brand. | Optional: periodically search “Waqas Ahmad” + “software” / “Azure” etc. to find unlinked mentions; no code change. |
| **Real social presence (X, Reddit, GitHub, LinkedIn)** | Person and Organization schema include `sameAs` for LinkedIn, GitHub, website. Contact links in APP_CONFIG and footer. No fake or placeholder social links. | Ensure profile URLs in .env match live profiles. Optional: add X/Twitter to sameAs and config if you use it; add schema for ProfilePage if you want richer entity links. |

**Summary:** Authority implementation is strong on-site (entity schema, consistency, llms.txt). Backlinks and off-site presence are not code-driven; keep config and profiles up to date.

---

### 9.2 Intent Matching (Search Satisfaction)

| Sub-pillar | Done (in depth) | Left / recommendations |
|------------|------------------|-------------------------|
| **Page solves the exact user intent** | Every indexable URL has a defined purpose: Home (consultant profile), Services (7 service intents), Projects (10 case studies), Blog (61 article intents). Meta title and description are set per URL from config and reflect intent. | Phase 8 (uniqueness audit): check that no two URLs share the same meta title or description; fix any that do so each page answers a distinct intent. |
| **No thin or generic content** | Blog articles are long-form (200–1200+ keywords scaled by word count); each has excerpt, FAQs where present, and eight authority sections. Services and projects have substantive copy and schema (HowTo, FAQ, etc.). | Optional: run a word-count and “generic phrase” check on the shortest articles; consider expanding or merging only if analytics show high bounce or low engagement. |
| **Clear answer above the fold** | Home: hero + lead; Services: hero + lead; Blog articles: hero with H1 + excerpt + date. Article content is in ReusableCard “Read the article” with body visible without heavy interaction. | Ensure hero/excerpt is not truncated by CSS on small viewports; already responsive. |
| **Content depth > competitors** | 61 articles with authority blocks (Decision Context, Trade-Offs, What Most Guides Miss, etc.), semantic keywords, and topic clusters. Depth is structural and substantive. | Optional: compare word count and section count vs. top SERP competitors for 3–5 priority articles; add subsections or examples where you are thinner. |

**Summary:** Intent matching is in good shape: unique meta per URL, no thin pages in structure, clear above-the-fold answer. Phase 8 (uniqueness audit) is the main actionable follow-up.

---

### 9.3 Entity Recognition (Critical, Often Missed)

| Sub-pillar | Done (in depth) | Left / recommendations |
|------------|------------------|-------------------------|
| **Clear topical identity (who you are, what you cover)** | Person schema with skills, job titles, description; WebSite schema; ProfessionalService/Organization. Home static JSON-LD and client schema align. Blog and services consistently attribute to same person and org. | Already clear. Optional: add a short “About this site” or “Topics we cover” in llms.txt global block if you want even more explicit topical identity for AI. |
| **Consistent naming across site & web** | Single canonical name (Waqas Ahmad), same job titles in schema and copy, same SITE_URL (Firebase) everywhere. Person `@id` `${SITE_URL}#person` used in BlogPosting author and home. | Keep APP_CONFIG.fullName and any public-facing names in sync; avoid nicknames or alternate spellings in schema. |
| **About / Author / Organization schema** | Person (`#person`), Organization (`#organization`), WebSite (`#website`), ProfessionalService (`#service`). BlogPosting author references `@id` `${SITE_URL}#person`. Service/Article/FAQ author or provider use same Person. sameAs (LinkedIn, GitHub, website) in Person and Organization. | Done. Optional Phase 9: review schema descriptions for generic or duplicate wording; align with positioning (e.g. “Software Engineering Consultant” vs “Technical Lead”) so entity is consistent. |
| **Internal links reinforce same entities** | TopicClusterLinks and RelatedArticles link to services and articles by title (intent-reflecting anchor text). BreadcrumbList on every page reinforces hierarchy (Home → Blog → Article, etc.). | Anchor text is article/service title, not keyword-stuffed—good for intent. Optional: ensure key pillar pages (e.g. Technical Leadership, Azure) receive more internal links from blog if you want to strengthen entity-topic association. |

**Summary:** Entity recognition is strong: consistent naming, Person/Org/WebSite schema, author @id reuse, sameAs. Optional: Phase 9 schema copy audit; consider reinforcing internal links to pillar pages.

---

### 9.4 Crawl & Index Efficiency

| Sub-pillar | Done (in depth) | Left / recommendations |
|------------|------------------|-------------------------|
| **Clean sitemap (only index-worthy URLs)** | `scripts/generate-sitemap.js` builds sitemap from router + blog slugs. 81 URLs only: home, 7 services, 10 projects, blog index, 61 articles, privacy. 404 and redirects excluded. No query params or filters. | Done. When adding new routes, ensure they are added to sitemap (router + blog slug list); script is the single source of truth. |
| **No crawl waste (filters, params, duplicates)** | No `?sort=`, `?page=`, or session params in routes. Single canonical base (Firebase); `setCanonical` in seo.js forces Firebase URL and strips dev/github.io. robots.txt allows /, /projects/, /services/, assets, sitemap, llms.txt; Disallow only /admin/, /api/. | Confirm no production URLs use query params for content variants; if you ever add pagination or filters, use noindex or canonical to avoid duplicate indexing. |
| **Fast TTFB (<300ms ideal)** | Not directly auditable in repo. Firebase Hosting serves static assets; SPA is static HTML + JS. No server-side rendering; first byte is from CDN. | Measure in production (e.g. Search Console, PageSpeed, or RUM). If TTFB is high, consider edge caching or preloading critical route payloads; otherwise no code change. |
| **Correct canonical usage** | Every page gets canonical via `setCanonical` in router flow. FIREBASE_CANONICAL_URL used; any URL containing `devwithwaqas.github.io` is rewritten to Firebase. `link[rel="canonical"]` created/updated per route. | Done. Keep FIREBASE_CANONICAL_URL in sync with actual production domain. |

**Summary:** Crawl and index efficiency are in good shape: clean sitemap, no duplicate or param URLs in scope, canonical enforced. TTFB is a hosting/metrics check.

---

### 9.5 Negation / De-Optimization (Very Important)

| Sub-pillar | Done (in depth) | Left / recommendations |
|------------|------------------|-------------------------|
| **Remove or noindex weak pages** | No weak or “coming soon” indexable pages. 404 is not in sitemap. All 81 sitemap URLs have full content and meta. `setRobots` is used (noindex only when explicitly requested, e.g. future use). | None. If you ever add “placeholder” or “draft” routes, set noindex until they are ready. |
| **Kill duplicate intent pages** | One URL per intent: one home, one per service, one per project, one blog index, one per article, one privacy. No alternate language or region URLs. No duplicate slugs. | Optional: Phase 8 uniqueness audit will catch any accidental duplicate meta (same title/description on two URLs), which can imply duplicate intent to engines. |
| **Prune low-CTR content** | No programmatic pruning in code. Content is curated (61 articles, 10 projects, 7 services). | Use Search Console (or analytics) to find URLs with very low impressions/CTR over 6–12 months; consider noindex, consolidation, or rewrite. Manual process; no code change required for current set. |

**Summary:** Negation is in good shape: no weak or duplicate indexable pages in the current design. Low-CTR pruning is a data-driven, manual follow-up.

---

### 9.6 Information Gain (Google-Specific Edge)

| Sub-pillar | Done (in depth) | Left / recommendations |
|------------|------------------|-------------------------|
| **Add something competitors don’t** | Authority sections (Decision Context, Position & Rationale, Trade-Offs, What Most Guides Miss, Decision Framework, Key Takeaways, When I Would Use This Again—and When I Wouldn’t) on all 61 articles provide first-hand, experience-based perspective. Case studies (e.g. AirAsia ID90, BAT) and real-world constraints are differentiators. | Optional: for priority articles, compare SERP snippets; add one concrete example, table, or “what most guides miss” callout that is clearly unique. |
| **Original examples, data, insights** | Articles use code snippets, tables, and scenario-based advice. Authority blocks are written in first person and reference constraints (team size, legacy vs greenfield). | Keep adding real numbers or scenarios when you update articles (e.g. “in a 5-person team we…”). No structural change needed. |
| **Unique angle, not rewritten SERP clones** | Article content and excerpts are written for this site; keyword arrays are derived from content and topic, not copied from SERPs. Authority voice is consistent and constraint-based. | When drafting new articles, continue to lead with your angle and constraints; use keywords to cover intent, not to mirror competitor phrasing. |

**Summary:** Information gain is addressed through authority sections and original framing. Optional: periodic SERP comparison for top articles to reinforce uniqueness.

---

### 9.7 Internal Authority Flow

| Sub-pillar | Done (in depth) | Left / recommendations |
|------------|------------------|-------------------------|
| **Strong pages link to weaker ones** | Home links to services and projects; blog index links to all 61 articles (ItemList schema + UI). TopicClusterLinks and RelatedArticles link from articles to other articles and to services. Pillar pages (services) get links from blog via relatedServices and topic clusters. | Optional: audit inlink count per URL (e.g. how many blog articles link to each service). If a service or key article has very few inlinks, add it to relatedArticleSlugs or relatedServices for a few more articles. |
| **Logical content silos** | topicClusters.js maps topics to clusters (e.g. Cloud, Architecture, Data, Full-Stack, Leadership, Mobile). TopicClusterLinks on blog and service pages surface “Part of cluster” with same-topic links. relatedArticleSlugs and relatedServices are per-article and create thematic groups. | Done. When adding articles, set topic and relatedArticleSlugs/relatedServices so silos stay coherent. |
| **Minimal orphan pages** | Blog index and ItemList link to every article. Home links to services and projects. Each article has RelatedArticles and/or TopicClusterLinks and related services. 404 is the only “terminal” page and is not in sitemap. | Optional: script to count inlinks per URL (from sitemap + router + blog config); flag any URL with 0 inlinks from other indexable pages. Likely none currently. |
| **Anchor text reflects intent (not keywords)** | RelatedArticles and TopicClusterLinks use article title or service title as link text (`item.title`, `item.title`). No keyword-stuffed anchors. | Good. Keep using natural, title-based anchor text. |

**Summary:** Internal authority flow is solid: silos, related links, and title-based anchors. Optional: inlink audit to ensure no critical page is under-linked.

---

### 9.8 Behavioral Signals (Indirect but Real)

| Sub-pillar | Done (in depth) | Left / recommendations |
|------------|------------------|-------------------------|
| **High dwell time** | Long-form content and clear structure (TOC, sections, FAQs) support reading. No auto-redirect or aggressive interstitials. | Not code-controllable. Optional: improve readability (short paragraphs, subheadings) where analytics show quick exits. |
| **Low pogo-sticking** | Clear titles and descriptions reduce misleading clicks. Above-the-fold answer (hero + excerpt) matches article body. Related articles and topic clusters offer next steps. | Keep meta description aligned with first paragraph and key takeaway. |
| **Fast interaction (no layout shifts)** | Not measured in this audit (CLS out of scope). Layout is component-based and stable; images use dimensions where applicable. | If you later care about LCP/INP, add dimensions to hero images and preload critical assets; no CLS work required per decision. |
| **Readability + scannability** | Article body in ReusableCard with padding; markdown renders headings, lists, code blocks. ContentTable (TOC) on articles aids scanning. Short paragraphs and authority sections with clear headings. | Optional: run readability score on a sample of articles; consider slightly shorter sentences or more subheadings where score is low. |

**Summary:** Behavioral signals are supported by content structure and meta accuracy. Dwell time and pogo-sticking are influenced by content and UX; readability can be tuned with minor copy edits.

---

### 9.9 Technical Trust (CLS Excluded)

| Sub-pillar | Done (in depth) | Left / recommendations |
|------------|------------------|-------------------------|
| **HTTPS, no mixed content** | Canonical and all links use `https://waqasahmad-portfolio.web.app`. SITE_URL and FIREBASE_CANONICAL_URL are HTTPS. Assets are relative or same-origin; no hardcoded http:// in production config. | Ensure Firebase Hosting enforces HTTPS (default). If you embed third-party scripts or iframes, use HTTPS only. |
| **Mobile-first perfection** | viewport meta in index.html: `width=device-width, initial-scale=1.0`. Responsive layout and Bootstrap-based grid. Touch targets and readable font sizes via CSS. | Test critical flows on real devices; fix any overflow or tap-target issues if found. |
| **No JS-blocked content** | Critical content (H1, lead, main body) is in the initial Vue app and rendered client-side. SEO meta and JSON-LD are set in router beforeEnter (critical path, not lazy). Home has static meta + JSON-LD in index.html and noscript fallback for key content. | Crawlers that run JS see full meta and schema. For crawlers that don’t, Home is covered; other pages depend on JS. Acceptable per current decision; if you need guaranteed non-JS coverage for all pages, consider prerender or SSR. |
| **Stable rendering (CLS < 0.1)** | **Out of scope** per project decision. Layout is structured; no obvious reserve space missing for above-the-fold images. | No action; CLS not in scope. |

**Summary:** Technical trust is in place for HTTPS, mobile viewport, and critical-path SEO. JS-blocked content is accepted trade-off except for Home. CLS excluded.

---

### 9.10 Pillar Summary Table

| Pillar | Status | Main follow-ups |
|--------|--------|------------------|
| 1. Authority | ✅ On-site strong | Keep profiles and sameAs updated; backlinks off-site |
| 2. Intent matching | ✅ Good | Phase 8: uniqueness audit (meta title/description) |
| 3. Entity recognition | ✅ Strong | Phase 9: schema copy audit (optional) |
| 4. Crawl & index | ✅ Good | Measure TTFB in production |
| 5. Negation | ✅ Good | Optional: low-CTR prune via Search Console |
| 6. Information gain | ✅ Good | Optional: SERP comparison for priority articles |
| 7. Internal authority | ✅ Good | Optional: inlink count audit; add links to weak pillars |
| 8. Behavioral | ✅ Supported | Optional: readability pass |
| 9. Technical trust | ✅ Good (CLS out) | HTTPS/mobile/JS as-is; CLS not in scope |

---

*This audit reflects the state of the codebase and configuration as of the audit date (2026-02-03). After any future SEO or content changes, re-run the keyword script or llms script if needed and update this document. The framing and decision rules above align with the same authority voice and constraint-first approach used in the blog and service pages on this site.*
