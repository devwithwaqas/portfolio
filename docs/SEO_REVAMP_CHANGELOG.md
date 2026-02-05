# SEO & authority revamp – changes implemented

**Purpose:** Single reference for all authority-focused, anti-spam, and cleanup changes made during the Feb 2026 revamp. Use this to align audits, checklists, and future edits.

**Base URL:** `https://waqasahmad-portfolio.web.app`

---

## 1. Structured data (Option B – clean, Google-safe)

| What | Before / risk | After |
|------|----------------|--------|
| **Engine** | Verbose or mixed schemas; testimonials/reviews in schema | **Option B:** `src/utils/structuredData.js` – clean, architect-level identity only |
| **Person** | — | Single Person schema with `@id`, name, description, image, sameAs, **jobTitle** (array), **knowsAbout** (bounded core skills), alumniOf; no resume dump |
| **WebSite** | — | WebSite with publisher → Person, SearchAction; no speculative markup |
| **Organization** | — | Organization with founder → Person, sameAs, logo; individual consultant identity |
| **BreadcrumbList** | — | Shared helper; items have name + item (URL) |
| **Speakable** | — | WebPage + SpeakableSpecification (cssSelector) where applicable; AI/voice-friendly |
| **Article** | — | Project pages: headline, description, image, dates, author, publisher, mainEntityOfPage |
| **SoftwareApplication** | — | Project pages: name, description, creator, screenshot, softwareVersion |
| **FAQPage** | — | Question/Answer with author on answer; used only where FAQs exist |
| **Service** | Offer / ProfessionalService / reviews | **Service only** – name, description, provider → Person; capability-only, zero sales/offers |
| **BlogPosting** | — | Blog articles: headline, description, image, author, dates, keywords (from options/topic), mainEntityOfPage; + BreadcrumbList + optional Speakable + optional FAQPage |
| **Blog index** | — | CollectionPage + BreadcrumbList + ItemList (articles) + optional Speakable |
| **Home** | ProfessionalService, JobPosting, reviews | **Person + Organization + WebSite + Speakable** only; no testimonials in schema, no JobPosting, no Offer |
| **Removed** | ProfessionalService with reviews, JobPosting, Offer, HowTo, image-object spam | Not used in Option B |

**Compatibility:** `generateHomePageStructuredData(testimonials)` still accepts an argument (ignored); `generateProjectPageStructuredData(data, options)` ignores options.testimonials/metrics; all other call sites unchanged.

---

## 2. llms.txt – static site summary (no keyword spam)

| What | Before / risk | After |
|------|----------------|--------|
| **Format** | Per-article blocks (Topics/Use cases/Audience) injected at build; long keyword-style lists | **Single hand-authored site summary** in `public/llms.txt` |
| **Content** | 61+ repetitive blocks; duplicated sitemap/page data | **Site & Author Identity**, **Core Areas of Expertise**, **Representative & Flagship Content** (curated URLs), **Enterprise Projects & Case Studies**, **Services & Professional Focus**, **Complete Blog Coverage** (topic clusters) |
| **Build** | `generate-llms-blog-articles.js` ran at build, could overwrite file | Build runs **only** `copy-llms-txt.js`; `public/llms.txt` is source of truth, never overwritten |
| **Spam** | Keyword-style repetition; “best/top” risk | No keywords for ranking; identity and breadth only. **Ref:** `docs/LLMS_TXT_GUIDE.md` |

---

## 3. Meta keywords – 5–8 topic clusters site-wide

| What | Before / risk | After |
|------|----------------|--------|
| **Policy** | Long lists; blog articles could push 200–1200 terms; repetition | **5–8 topic-cluster phrases max** for the whole site |
| **Implementation** | Various getters with large keyword arrays | `src/utils/seo.js`: **applyHomeSEO**, **applyBlogIndexSEO**, **applyBlogSEO**, **applyProjectSEO**, **applyServiceSEO**; **setPageSEO** for Privacy, 404, blog-not-found, default |
| **Rules** | — | No long-tail variants, no “best/top/elite”, no company names, no URLs, no geo stuffing. Safe keyword rule: pointable to feature/section = OK; rank-only = spam risk |

---

## 4. robots.txt – simplified

| What | Before / risk | After |
|------|----------------|--------|
| **Allow** | Redundant `Allow: /projects/`, `/services/`, `/assets/`, favicon, sitemap, llms | **Allow: /** only (covers all) |
| **Bingbot** | Duplicate `User-agent: Bingbot` block | Removed; Bingbot inherits `*` |
| **Disallow** | — | `/admin/`, `/api/` only |
| **Sitemap** | — | Single `Sitemap:` at bottom |
| **Comments** | AI/metadata speculation | Simplified; no speculative AI directives |

---

## 5. Sitemap – strict order and hygiene

| What | Before / risk | After |
|------|----------------|--------|
| **URL order** | — | **Homepage → core (/blog, /privacy) → Services (alphabetical) → Projects (alphabetical) → Blog posts (alphabetical by slug)** |
| **Priorities** | Inconsistent | **Normalized:** Home 1.0, Services 0.8, Blog index 0.8, Projects 0.7, Blog posts 0.6, Privacy 0.3 |
| **Changefreq** | — | Home/blog weekly; blog posts monthly; services/projects monthly; privacy yearly |
| **lastmod** | — | **Preserved** from existing sitemap for existing URLs; fallback for new; **no** auto-update of dates |
| **Hygiene** | — | No trailing slash inconsistency (home has one), no uppercase, no query/fragment; canonical production URLs only |
| **Scope** | — | Single sitemap, 81 URLs; no sitemap index; no image/video/hreflang |

---

## 6. seo.js – clean engine

| What | Before / risk | After |
|------|----------------|--------|
| **Helpers** | Mixed or verbose | **ensureMeta**, **setTitle**, **setDescription**, **setKeywords**, **setCanonical**, **setSocialMeta**, **setRobots** |
| **Logic** | Multiple getters with large keyword arrays | **applySEO** for common flow; **applyHomeSEO**, **applyBlogIndexSEO**, **applyBlogSEO**, **applyProjectSEO**, **applyServiceSEO**; **setPageSEO** for edge routes (Privacy, 404, blog-not-found, default) with **noindex** where appropriate |
| **Router** | Old getters (getHomePageSEO, getProjectPageSEO, etc.) | Router uses **apply*** and **setPageSEO** only; unused imports removed |
| **Keywords** | Long arrays | Capped 5–8 topic phrases; no stuffing |

---

## 7. Service pages – no extra complexity

| What | Before / risk | After |
|------|----------------|--------|
| **Full Stack page** | ServicePageTopics (“In this page”), FullStackInPracticeSection (code samples) | **Removed;** Full Stack matches other service pages (Hero, Overview, Capabilities, Process, Technologies, Case Studies, FAQ, Related Projects, RelatedServices, TopicClusterLinks, CTA) |
| **Sticky CTA bar** | “Get in touch” fixed bar at bottom (below footer) | **Removed** from `ServicePageTemplate`; no scroll listener, no extra button |
| **Components** | ServicePageTopics.vue, FullStackInPracticeSection.vue | **Deleted**; not used anywhere |

---

## 8. Error tracker (dev only)

| What | Before / risk | After |
|------|----------------|--------|
| **Stale errors** | localStorage kept old errors; “Recent Errors Detected” showed fixed issues | In DEV, errors older than 2 minutes are **auto-cleared** on load so console doesn’t show stale “topicIndexItems” etc. |

---

## 9. Files touched (summary)

| Area | File(s) |
|------|--------|
| Structured data | `src/utils/structuredData.js` |
| SEO meta | `src/utils/seo.js` |
| Router | `src/router/index.js` |
| Home | `src/views/Home.vue` (applyHomeSEO) |
| llms.txt | `public/llms.txt` (static); build: `scripts/copy-llms-txt.js` only |
| robots.txt | `scripts/write-robots-firebase.js`, `public/robots.txt` |
| Sitemap | `scripts/generate-sitemap.js`, `public/sitemap.xml` |
| Service template | `src/components/common/ServicePageTemplate.vue` (sticky CTA removed) |
| Full Stack page | `src/views/services/FullStackDevelopmentPage.vue` (simplified to match other services) |
| Error tracker | `src/main.js` (auto-clear old errors in DEV) |
| Removed | `src/components/services/ServicePageTopics.vue`, `src/components/services/FullStackInPracticeSection.vue` |

---

## 10. Authority / spam rules (quick reference)

- **Meta keywords:** 5–8 topic phrases only; no best/top/elite; no geo/company/URL stuffing.
- **llms.txt:** Identity + expertise + flagship URLs + breadth; no per-article keyword blocks; static file.
- **Structured data:** Identity and eligibility only; no reviews/testimonials in schema; no Offer/JobPosting/ProfessionalService spam; Service = capability-only.
- **Content:** Safe keyword = pointable to a section/CTA; spam risk = rank-only with no corresponding content.
- **Service pages:** Same template as others; no code samples or “In this page” only on one page; no floating CTA bar.

For full guidance and per-URL checks, see **`SEO_81_PAGES_FULL_PLAN.md`**, **`SEO_MASTER_CHECKLIST_81_URLS.md`**, and **`LLMS_TXT_GUIDE.md`**.
