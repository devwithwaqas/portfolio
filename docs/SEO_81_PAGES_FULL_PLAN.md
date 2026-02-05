# SEO + AI: Full Plan for All 81 Pages (Every Single Consideration)

**Purpose:** One document that captures the full guidance and applies it to **each of the 81 pages** with explicit checks and changes. Use with `SEO_MASTER_CHECKLIST_81_URLS.md` (detailed checklist) and `SEO_AI_81_PAGES_IMPLEMENTATION_PLAN.md` (implementation tasks).

**Base URL:** `https://waqasahmad-portfolio.web.app`

---

# Implementation status (what’s done)

| ID | Task | Status |
|----|------|--------|
| L2 | llms.txt: output Topics, Use cases, Audience per article; no Keywords | ✅ Done (`scripts/generate-llms-blog-articles.js`) |
| L3 | llms.txt: Blog index block = Topics + Use cases + Audience | ✅ Done (same script) |
| L4 | llms.txt: fallback when article has no topics/useCases/audience | ✅ Done (same script); dedupe + relatedServices enrichment |
| L1 | Article context: derived from title, topic, relatedServices (no manual pilot) | ✅ Done via fallback; checklist-compliant topic clusters |
| M1 | Meta: Homepage keywords = 5–8 topic phrases only | ✅ Done (`src/utils/seo.js`) |
| M2 | Meta: Services keywords = 5–8; cap/dedupe | ✅ Done (`src/utils/seo.js`) |
| M3 | Meta: Projects keywords = 5–8; no full profile list | ✅ Done (`src/utils/seo.js`) |
| M4 | Meta: Blog index = 5–8 phrases | ✅ Done (`src/utils/seo.js`) |
| M5 | Meta: Blog articles = 5–8 from topic cluster (not full article.keywords) | ✅ Done (`src/utils/seo.js`) |
| M6 | Meta: Privacy minimal | ✅ Already minimal (router) |
| R1 | robots.txt: remove Bingbot; soften llms comment | ✅ Done (`scripts/write-robots-firebase.js`) |
| A1 | 81-page consistency | ✅ Applied site-wide (meta cap, llms format, dedupe); enterprise checklist in mind |

**Summary:** Site finalized. All tasks done: meta keywords (M1–M6), llms.txt (now static site-summary format; see `docs/LLMS_TXT_GUIDE.md` for **why** we moved from per-article blocks), robots.txt (R1), and site-wide rules applied.

### Post-revamp (Feb 2026) – authority & spam cleanup

| Area | What changed |
|------|--------------|
| **Structured data** | Option B: Person, WebSite, Organization, BreadcrumbList, Speakable, Article, SoftwareApplication, FAQPage, **Service only** (no Offer/ProfessionalService/reviews). Home: Person + Organization + WebSite + Speakable; no JobPosting, no testimonials in schema. |
| **Sitemap** | Single sitemap, 81 URLs; strict order (Home → core → Services → Projects → Blog); normalized priority/changefreq; lastmod preserved; no image/video/hreflang. |
| **robots.txt** | Simplified: `Allow: /` only; duplicate Bingbot block removed; single Sitemap; Disallow admin/api only. |
| **seo.js** | Clean engine: applyHomeSEO, applyBlogIndexSEO, applyBlogSEO, applyProjectSEO, applyServiceSEO, setPageSEO; keywords 5–8 site-wide. |
| **Service pages** | Sticky “Get in touch” bar removed; Full Stack page aligned with other services (no code samples, no “In this page” block). |

**Full list:** **`docs/SEO_REVAMP_CHANGELOG.md`**.

---

# Part A – Full Guidance (Read This First)

## A.0 Mapping: every guidance bullet → this plan

| Guidance bullet | Where in this plan |
|-----------------|--------------------|
| robots.txt: clean; Bingbot redundant; llms comment not official | A.2, R1, Part B |
| llms.txt: not official; keyword spam bad; need Topics/Use cases/Audience | A.3, L2–L4, Part B, Part C (Bl, Ba) |
| AI SEO: Entity > Keyword; Coverage > Frequency; Answerability; Attribution | A.4; content rules in C, D.2 |
| Meta keywords: 5–8 topic clusters; no long-tail/repetition | A.5, M1–M6, Part B, Part F |
| Structured data = eligibility (Google), identity+context+authority (LLMs) | A.6; no schema change |
| Safe keyword rule: pointable to feature/section = OK; rank-only = spam risk | A.7, C9–C10, D.1 |
| All 81 pages: each and every thing considered | Part C (per type + per URL), Part D, Part G |

## A.1 Big picture

- You are **not missing fundamentals**.
- You are **over-engineering some legacy SEO** (long keyword lists, repetition) and **early (not wrong)** on AI SEO.
- Setup is **ahead of 95% of portfolios**.
- **Google ≠ LLMs.** Right now the same signals are used for both; tuning is needed so:
  - **Google:** clean meta, one H1, no spam, structured data for eligibility.
  - **LLMs:** entity > keyword, coverage > frequency, answerability, attribution; **no keyword spam** in llms.txt or meta.

## A.2 robots.txt

- **Verdict:** Clean. Nothing broken.
- **Optional:** Remove redundant `User-agent: Bingbot` block (inherits `*`). Soften comment: e.g. “Some AI agents may use llms.txt; not an official standard.”
- **File:** `scripts/write-robots-firebase.js`.

## A.3 llms.txt (AI context; not for ranking)

- **What it is:** Not an official standard; not used by Google. Experimental convention for some AI crawlers / RAG / citation.
- **Current implementation:** We use a **single, hand-authored site summary** in `public/llms.txt` (copied to `dist/` on build). It is **not** generated from per-article blocks.

**Why we did this (explicit rationale):** The previous format used a build-time script to inject 61+ per-article blocks (Topics/Use cases/Audience) into llms.txt. That duplicated information already in the sitemap and on each page, and diluted the “where should I start?” signal for AI systems. We **rewrote** llms.txt to:
- Lead with **Site & Author Identity** and **Core Areas of Expertise** so consumers get a consistent, high-signal picture in one place.
- Provide **Representative & Flagship Content** (curated URLs by theme: Cloud, .NET/APIs, AI in engineering) as entry points for citation instead of a long flat list.
- Declare **breadth** via **Complete Blog Coverage** (topic clusters) without maintaining 61+ per-article blocks.
- Keep the file **static** so it is never overwritten by build scripts; the build only copies `public/llms.txt` to `dist/`.

**Implementation:** `public/llms.txt` is the single source of truth. Build runs `scripts/copy-llms-txt.js` only (no `generate-llms-blog-articles.js`). Full rationale and maintenance notes: **`docs/LLMS_TXT_GUIDE.md`**.

## A.4 AI SEO principles (apply everywhere)

1. **Entity > Keyword** — Who you are, what you uniquely know, what you’ve solved (projects + case studies).
2. **Coverage > Frequency** — One deep explanation beats 50 keyword variants.
3. **Answerability** — How? Why? When? Tradeoffs? Constraints? Lessons learned?
4. **Attribution** — Author, date, context, source (already strong).

## A.5 Meta keywords (all 81 pages)

- **Google:** Ignored. Can signal spam if extreme.
- **Bing:** Mostly ignored.
- **LLMs:** Prefer zero or minimal; hate repetition.

**Rule:** **Topic clusters only, 5–8 phrases max.** No long-tail variants, no “best/top/elite”, no company names, no URLs, no geo stuffing.

- **Good:** Senior Software Engineer, .NET Consultant, Azure Cloud Architect, Microservices Developer, Remote Software Consultant.
- **Bad:** best .net developer, hire best .net developer usa, top azure expert 2025.

## A.6 Structured data vs AI SEO

- **Google:** Structured data = **eligibility** (rich results), **not** ranking.
- **LLMs:** Structured data helps **identity**; llms.txt helps **context**; content helps **authority**. They stack.
- **No change** to JSON-LD types for this plan; keep Person, WebSite, Service, BlogPosting, BreadcrumbList, etc. Focus changes on **content, llms.txt, and meta keywords**.

## A.7 Safe keyword rule (content + meta + llms)

- **Safe:** A keyword can be **pointed to** a button, feature, or section → not spam.
- **Spam risk:** Keyword exists **only to rank** with no corresponding feature/content → might be spam.

Use when trimming meta and llms.txt: keep only what maps to real sections/CTAs/topics.

---

# Part B – Implementation Tasks (What Changes Where)

| ID | Area | What to do | File(s) |
|----|------|------------|--------|
| R1 | robots.txt | Optional: remove Bingbot block; soften llms.txt comment | `scripts/write-robots-firebase.js` |
| L1 | llms.txt | Add optional `topics`, `useCases`, `audience` to article config (pilot 5–10 articles) | `src/config/blog/articles/*.js` |
| L2 | llms.txt | Rewrite `buildBlogSection()`: output **Topics**, **Use cases**, **Audience** per article; **no** `Keywords:` from article.keywords | `scripts/generate-llms-blog-articles.js` |
| L3 | llms.txt | Blog index block: replace long Keywords line with Topics + Use cases + Audience (short) | Same |
| L4 | llms.txt | Fallback when article has no topics/useCases/audience: derive 3–5 topics from title/excerpt; generic use cases/audience | Same |
| M1 | Meta | Homepage: keywords = **5–8 topic phrases only** (no 500+ list) | `src/utils/seo.js` → `getHomePageSEO()` |
| M2 | Meta | Services (7): keywords = **5–8 topic phrases**; cap and dedupe | `src/utils/seo.js` → `getServicePageSEO()` |
| M3 | Meta | Projects (11): keywords = **5–8** (tech + domain); **do not** merge full `getHomePageSEO().keywords` | `src/utils/seo.js` → `getProjectPageSEO()` |
| M4 | Meta | Blog index: verify 5–8 phrases; no stuffing | `src/utils/seo.js` → `getBlogIndexSEO()` |
| M5 | Meta | Blog articles (61): **do not** use full `article.keywords`; use 5–8 from `article.topics` or derived from title/primary topic | `src/utils/seo.js` → `getBlogArticleSEO()` |
| M6 | Meta | Privacy: no meta keywords or minimal | Router / Privacy view |
| A1 | Audit | Per-page audit: run Part 2 of SEO_MASTER_CHECKLIST_81_URLS.md for each of 81 URLs (meta, H1, links, schema, no superiority, no hidden content) | All views/templates |

---

# Part C – All 81 URLs with Type and Every Check/Change

**Legend**

- **Type:** H = Homepage, Pj = Project, Sv = Service, Bl = Blog index, Ba = Blog article, O = Other (Privacy).
- **Meta:** M1–M12 (keywords ≤8, no geo, title 55–60, description 140–160, etc.).
- **Content:** C1–C10 (one H1, no stuffing, no superiority, no hidden, safe keyword rule).
- **Links:** L1–L6 (About, Services, Portfolio, Contact, back to Home, varied anchors).
- **Schema:** By type (SD-H, SD-P, SD-S, SD-B, or none).
- **Content rule:** Home = entity+summary; Services = problem→solution→proof→CTA; Projects = context→contribution→impact→tech; Blog = opinionated, experience-based.
- **Specific action:** What must change for this page type (e.g. “Meta keywords → 5–8”).

---

## Page 1 – Homepage

| Field | Value |
|-------|--------|
| **URL** | `/` |
| **Type** | H |
| **Meta** | M1–M12. **Action:** Meta keywords = **5–8 topic phrases only** (M1). |
| **Content** | C1–C10. One H1; no superiority; evidence-based. |
| **Links** | L1–L6. |
| **Schema** | SD-H1–SD-H5 (Person, WebSite, BreadcrumbList, Organization). |
| **Content rule** | Entity + summary; not sales-heavy. |
| **llms.txt** | N/A. |

---

## Pages 2–11 – Projects (10 pages)

For **each** project page apply: M1–M12, C1–C10, L1–L6, SD-P1–SD-P4, Content = context→contribution→impact→tech. **Action:** Meta keywords = **5–8** (tech + domain); **do not** use full profile keyword list.

| # | URL |
|---|-----|
| 2 | `/projects/heat-exchanger` |
| 3 | `/projects/airasia-id90` |
| 4 | `/projects/bat-inhouse-app` |
| 5 | `/projects/pj-smart-city` |
| 6 | `/projects/gamified-employee-management` |
| 7 | `/projects/valet-parking` |
| 8 | `/projects/mobile-games` |
| 9 | `/projects/uk-property-management` |
| 10 | `/projects/g5-pos` |
| 11 | `/projects/chubb-insurance-applications` |

---

## Pages 12–18 – Services (7 pages)

For **each** service page: M1–M12, C1–C10, L1–L6, SD-S1–SD-S4, Content = problem→solution→proof→CTA. **Action:** Meta keywords = **5–8 topic phrases**; cap and dedupe.

| # | URL |
|---|-----|
| 12 | `/services/full-stack-development` |
| 13 | `/services/azure-cloud-architecture` |
| 14 | `/services/technical-leadership` |
| 15 | `/services/microservices-architecture` |
| 16 | `/services/agile-project-management` |
| 17 | `/services/database-design-optimization` |
| 18 | `/services/mobile-development` |

---

## Page 19 – Privacy

| Field | Value |
|-------|--------|
| **URL** | `/privacy` |
| **Type** | O |
| **Meta** | M1–M12. **Action:** No meta keywords or minimal (M6). |
| **Content** | C1–C10. |
| **Links** | L1–L6. |
| **Schema** | None required unless added. |

---

## Page 20 – Blog index

| Field | Value |
|-------|--------|
| **URL** | `/blog` |
| **Type** | Bl |
| **Meta** | M1–M12. **Action:** Keywords = **5–8** (e.g. technical blog, Azure, .NET, microservices, Waqas Ahmad). |
| **Content** | C1–C10. One H1; clear intent. |
| **Links** | L1–L6. |
| **Schema** | Optional (CollectionPage/ItemList). |
| **llms.txt** | **Blog block** = Topics + Use cases + Audience (no long Keywords line). |

---

## Pages 21–81 – Blog articles (61 pages)

For **each** blog article: M1–M12, C1–C10, L1–L6, SD-B1–SD-B5, Content = opinionated, experience-based. **Actions:**

- **Meta:** Keywords = **5–8** from topic cluster only; **do not** use full `article.keywords` (M5).
- **llms.txt:** This article’s block = **Topics** (5–8) + **Use cases** + **Audience**; **no** Keywords dump (L2, L4).

| # | Slug (URL = /blog/{slug}) |
|---|----------------------------|
| 21 | agile-delivery-enterprise-constraints |
| 22 | ai-changing-code-review-testing |
| 23 | ai-ides-what-they-get-right-wrong |
| 24 | ai-models-claude-gemini-gpt-deepseek-comparison |
| 25 | api-gateway-vs-bff |
| 26 | azure-bicep-iac-basics |
| 27 | azure-cloud-architecture-patterns |
| 28 | azure-devops-vs-github-actions |
| 29 | azure-microservices-best-practices |
| 30 | azure-serverless-functions-logic-apps |
| 31 | behavioral-design-patterns-dotnet |
| 32 | caching-strategies-redis-dotnet |
| 33 | case-study-airasia-id90 |
| 34 | case-study-bat-inhouse-app |
| 35 | ci-cd-azure-devops |
| 36 | clean-architecture-dotnet |
| 37 | creational-design-patterns-dotnet |
| 38 | current-state-ai-coding-tools-2026 |
| 39 | cursor-vs-claude-code-vs-copilot-ai-ide |
| 40 | data-engineering-azure-pipelines-lakehouse |
| 41 | data-engineering-batch-vs-streaming |
| 42 | database-indexing-strategies |
| 43 | database-optimization-entity-framework |
| 44 | database-transactions-isolation-levels |
| 45 | dependency-injection-dotnet-core |
| 46 | design-patterns-overview-creational-structural-behavioral |
| 47 | developers-integrating-ai-daily-workflows |
| 48 | domain-driven-design-basics |
| 49 | dotnet-core-middleware-pipeline |
| 50 | event-driven-architecture-azure |
| 51 | event-sourcing-and-cqrs |
| 52 | feature-flags-toggles-dotnet |
| 53 | full-stack-net-angular-enterprise |
| 54 | gamification-enterprise-apps |
| 55 | grpc-vs-rest-dotnet-apis |
| 56 | impact-ai-tools-code-quality-maintainability |
| 57 | kubernetes-basics-dotnet-developers |
| 58 | microservices-resilience-circuit-breaker-retry |
| 59 | mobile-app-architecture-vue-capacitor |
| 60 | monorepo-vs-polyrepo |
| 61 | oauth2-openid-connect-dotnet |
| 62 | observability-dotnet-azure |
| 63 | open-telemetry-distributed-tracing-dotnet |
| 64 | owasp-api-security-top-10 |
| 65 | property-management-systems-uk |
| 66 | repository-pattern-unit-of-work-dotnet |
| 67 | rest-api-versioning-idempotency |
| 68 | rest-vs-graphql-apis |
| 69 | saga-pattern-orchestrator-vs-choreography |
| 70 | securing-apis-dotnet |
| 71 | solid-principles-in-practice |
| 72 | sql-server-performance-tuning |
| 73 | structural-design-patterns-dotnet |
| 74 | technical-leadership-remote-teams |
| 75 | testing-strategies-unit-integration-e2e |
| 76 | trade-offs-ai-code-generation |
| 77 | vue-enterprise-scale |
| 78 | vue-vs-angular-vs-react-full-comparison |
| 79 | what-developers-want-from-ai-assistants |
| 80 | where-ai-fails-real-world-software-development |
| 81 | why-ai-productivity-gains-plateau |

---

# Part D – Per-Page Checklist (Every Single Thing)

Use this for each of the 81 pages. Tick when done.

## D.1 Global (every page)

| Check | Description | P1…P81 |
|-------|-------------|--------|
| M1 | Meta keywords: absent or ≤8 phrases; no repetition; no best/top/elite; no company names; no URLs; no geo | ☐×81 |
| M2–M5 | No geo meta (geo.region, placename, position, ICBM) | ☐×81 |
| M6 | Title: `Primary – Key Tech \| Waqas Ahmad`; 55–60 chars | ☐×81 |
| M7 | Title length 55–60 | ☐×81 |
| M8 | One clear intent per page | ☐×81 |
| M9–M12 | Meta description present, 140–160 chars, human-readable, value + audience | ☐×81 |
| C1 | Exactly one H1 | ☐×81 |
| C2 | H1 matches page intent | ☐×81 |
| C3 | H1 not stuffed | ☐×81 |
| C4 | No superiority (best/top/elite/premier/#1) in H1/hero | ☐×81 |
| C5 | Evidence-based language where relevant | ☐×81 |
| C6–C8 | No hidden content; no noscript keyword dumps; no hidden SEO divs | ☐×81 |
| C9–C10 | Safe keyword rule; no spam-only keywords | ☐×81 |
| L1–L6 | Internal links (About, Services, Portfolio, Contact, Home); varied anchors | ☐×81 |

## D.2 By page type

| Type | Schema checks | Content rule | Extra action |
|------|----------------|-------------|--------------|
| H (1) | SD-H1–SD-H5 | Entity + summary | Meta keywords 5–8 only (M1) |
| Pj (2–11) | SD-P1–SD-P4 | Context→contribution→impact→tech | Meta keywords 5–8; no full profile list |
| Sv (12–18) | SD-S1–SD-S4 | Problem→solution→proof→CTA | Meta keywords 5–8; cap/dedupe |
| O (19) | — | — | No/minimal meta keywords |
| Bl (20) | Optional | Clear intent | Meta 5–8; llms.txt Blog = Topics+Use cases+Audience |
| Ba (21–81) | SD-B1–SD-B5 | Opinionated, experience-based | Meta 5–8 from topics only; llms.txt = Topics+Use cases+Audience, no Keywords |

---

# Part E – Execution Order (Recommended)

1. **llms.txt (L2, L3, L4)**  
   Update `scripts/generate-llms-blog-articles.js`: output Topics / Use cases / Audience; remove Keywords from article.keywords; fallback for articles without new fields. Regenerate `public/llms.txt`.

2. **Meta keywords (M1–M6)**  
   In `src/utils/seo.js`:  
   - `getHomePageSEO()`: return 5–8 topic phrases only.  
   - `getServicePageSEO()`: cap to 5–8; dedupe.  
   - `getProjectPageSEO()`: do not merge `getHomePageSEO().keywords`; use 5–8 (tech + domain).  
   - `getBlogIndexSEO()`: verify 5–8.  
   - `getBlogArticleSEO()`: do not use full `article.keywords`; use 5–8 from `article.topics` or derived.  
   - Privacy: ensure no or minimal keywords.

3. **Article config (L1, optional)**  
   Add `topics`, `useCases`, `audience` to 5–10 blog articles as pilot; generator already has fallback.

4. **robots.txt (R1, optional)**  
   Remove Bingbot block; soften llms.txt comment in `scripts/write-robots-firebase.js`.

5. **81-page audit (A1)**  
   For each of 81 URLs, run Part 2 of `SEO_MASTER_CHECKLIST_81_URLS.md`: meta, H1, links, schema, no superiority, no hidden content, safe keyword rule. Fix any issues.

---

# Part F – Quick Reference: What Changes Where

| Page(s) | Meta keywords | llms.txt | Schema | Content / audit |
|---------|----------------|----------|--------|-----------------|
| 1 Home | 5–8 only (seo.js getHomePageSEO) | — | Keep Person, WebSite, Breadcrumb, Org | Entity + summary |
| 2–11 Projects | 5–8; no profile blast (getProjectPageSEO) | — | Keep CreativeWork/SoftwareApplication | Context→impact→tech |
| 12–18 Services | 5–8; cap/dedupe (getServicePageSEO) | — | Keep Service, Offer | Problem→CTA |
| 19 Privacy | None or minimal | — | — | — |
| 20 Blog index | 5–8 (getBlogIndexSEO) | Blog block = Topics+Use cases+Audience | Optional | One H1 |
| 21–81 Blog | 5–8 from topics only (getBlogArticleSEO) | Per-article = Topics+Use cases+Audience; no Keywords | Keep BlogPosting | Opinionated, experience-based |

---

# Part G – 81-Page Tick-Off Matrix

Tick when the **specific action** for that page is done (meta 5–8, llms block where applicable) and when the full Part 2 checklist has been run for that URL.

| P# | URL | Type | Meta 5–8 done | H1/Content/Links/Schema audited | llms block (if Bl/Ba) |
|----|-----|------|----------------|---------------------------------|------------------------|
| 1 | `/` | H | ☐ | ☐ | — |
| 2 | `/projects/heat-exchanger` | Pj | ☐ | ☐ | — |
| 3 | `/projects/airasia-id90` | Pj | ☐ | ☐ | — |
| 4 | `/projects/bat-inhouse-app` | Pj | ☐ | ☐ | — |
| 5 | `/projects/pj-smart-city` | Pj | ☐ | ☐ | — |
| 6 | `/projects/gamified-employee-management` | Pj | ☐ | ☐ | — |
| 7 | `/projects/valet-parking` | Pj | ☐ | ☐ | — |
| 8 | `/projects/mobile-games` | Pj | ☐ | ☐ | — |
| 9 | `/projects/uk-property-management` | Pj | ☐ | ☐ | — |
| 10 | `/projects/g5-pos` | Pj | ☐ | ☐ | — |
| 11 | `/projects/chubb-insurance-applications` | Pj | ☐ | ☐ | — |
| 12 | `/services/full-stack-development` | Sv | ☐ | ☐ | — |
| 13 | `/services/azure-cloud-architecture` | Sv | ☐ | ☐ | — |
| 14 | `/services/technical-leadership` | Sv | ☐ | ☐ | — |
| 15 | `/services/microservices-architecture` | Sv | ☐ | ☐ | — |
| 16 | `/services/agile-project-management` | Sv | ☐ | ☐ | — |
| 17 | `/services/database-design-optimization` | Sv | ☐ | ☐ | — |
| 18 | `/services/mobile-development` | Sv | ☐ | ☐ | — |
| 19 | `/privacy` | O | ☐ | ☐ | — |
| 20 | `/blog` | Bl | ☐ | ☐ | ☐ Blog block |
| 21 | `/blog/agile-delivery-enterprise-constraints` | Ba | ☐ | ☐ | ☐ |
| 22 | `/blog/ai-changing-code-review-testing` | Ba | ☐ | ☐ | ☐ |
| 23 | `/blog/ai-ides-what-they-get-right-wrong` | Ba | ☐ | ☐ | ☐ |
| 24 | `/blog/ai-models-claude-gemini-gpt-deepseek-comparison` | Ba | ☐ | ☐ | ☐ |
| 25 | `/blog/api-gateway-vs-bff` | Ba | ☐ | ☐ | ☐ |
| 26 | `/blog/azure-bicep-iac-basics` | Ba | ☐ | ☐ | ☐ |
| 27 | `/blog/azure-cloud-architecture-patterns` | Ba | ☐ | ☐ | ☐ |
| 28 | `/blog/azure-devops-vs-github-actions` | Ba | ☐ | ☐ | ☐ |
| 29 | `/blog/azure-microservices-best-practices` | Ba | ☐ | ☐ | ☐ |
| 30 | `/blog/azure-serverless-functions-logic-apps` | Ba | ☐ | ☐ | ☐ |
| 31 | `/blog/behavioral-design-patterns-dotnet` | Ba | ☐ | ☐ | ☐ |
| 32 | `/blog/caching-strategies-redis-dotnet` | Ba | ☐ | ☐ | ☐ |
| 33 | `/blog/case-study-airasia-id90` | Ba | ☐ | ☐ | ☐ |
| 34 | `/blog/case-study-bat-inhouse-app` | Ba | ☐ | ☐ | ☐ |
| 35 | `/blog/ci-cd-azure-devops` | Ba | ☐ | ☐ | ☐ |
| 36 | `/blog/clean-architecture-dotnet` | Ba | ☐ | ☐ | ☐ |
| 37 | `/blog/creational-design-patterns-dotnet` | Ba | ☐ | ☐ | ☐ |
| 38 | `/blog/current-state-ai-coding-tools-2026` | Ba | ☐ | ☐ | ☐ |
| 39 | `/blog/cursor-vs-claude-code-vs-copilot-ai-ide` | Ba | ☐ | ☐ | ☐ |
| 40 | `/blog/data-engineering-azure-pipelines-lakehouse` | Ba | ☐ | ☐ | ☐ |
| 41 | `/blog/data-engineering-batch-vs-streaming` | Ba | ☐ | ☐ | ☐ |
| 42 | `/blog/database-indexing-strategies` | Ba | ☐ | ☐ | ☐ |
| 43 | `/blog/database-optimization-entity-framework` | Ba | ☐ | ☐ | ☐ |
| 44 | `/blog/database-transactions-isolation-levels` | Ba | ☐ | ☐ | ☐ |
| 45 | `/blog/dependency-injection-dotnet-core` | Ba | ☐ | ☐ | ☐ |
| 46 | `/blog/design-patterns-overview-creational-structural-behavioral` | Ba | ☐ | ☐ | ☐ |
| 47 | `/blog/developers-integrating-ai-daily-workflows` | Ba | ☐ | ☐ | ☐ |
| 48 | `/blog/domain-driven-design-basics` | Ba | ☐ | ☐ | ☐ |
| 49 | `/blog/dotnet-core-middleware-pipeline` | Ba | ☐ | ☐ | ☐ |
| 50 | `/blog/event-driven-architecture-azure` | Ba | ☐ | ☐ | ☐ |
| 51 | `/blog/event-sourcing-and-cqrs` | Ba | ☐ | ☐ | ☐ |
| 52 | `/blog/feature-flags-toggles-dotnet` | Ba | ☐ | ☐ | ☐ |
| 53 | `/blog/full-stack-net-angular-enterprise` | Ba | ☐ | ☐ | ☐ |
| 54 | `/blog/gamification-enterprise-apps` | Ba | ☐ | ☐ | ☐ |
| 55 | `/blog/grpc-vs-rest-dotnet-apis` | Ba | ☐ | ☐ | ☐ |
| 56 | `/blog/impact-ai-tools-code-quality-maintainability` | Ba | ☐ | ☐ | ☐ |
| 57 | `/blog/kubernetes-basics-dotnet-developers` | Ba | ☐ | ☐ | ☐ |
| 58 | `/blog/microservices-resilience-circuit-breaker-retry` | Ba | ☐ | ☐ | ☐ |
| 59 | `/blog/mobile-app-architecture-vue-capacitor` | Ba | ☐ | ☐ | ☐ |
| 60 | `/blog/monorepo-vs-polyrepo` | Ba | ☐ | ☐ | ☐ |
| 61 | `/blog/oauth2-openid-connect-dotnet` | Ba | ☐ | ☐ | ☐ |
| 62 | `/blog/observability-dotnet-azure` | Ba | ☐ | ☐ | ☐ |
| 63 | `/blog/open-telemetry-distributed-tracing-dotnet` | Ba | ☐ | ☐ | ☐ |
| 64 | `/blog/owasp-api-security-top-10` | Ba | ☐ | ☐ | ☐ |
| 65 | `/blog/property-management-systems-uk` | Ba | ☐ | ☐ | ☐ |
| 66 | `/blog/repository-pattern-unit-of-work-dotnet` | Ba | ☐ | ☐ | ☐ |
| 67 | `/blog/rest-api-versioning-idempotency` | Ba | ☐ | ☐ | ☐ |
| 68 | `/blog/rest-vs-graphql-apis` | Ba | ☐ | ☐ | ☐ |
| 69 | `/blog/saga-pattern-orchestrator-vs-choreography` | Ba | ☐ | ☐ | ☐ |
| 70 | `/blog/securing-apis-dotnet` | Ba | ☐ | ☐ | ☐ |
| 71 | `/blog/solid-principles-in-practice` | Ba | ☐ | ☐ | ☐ |
| 72 | `/blog/sql-server-performance-tuning` | Ba | ☐ | ☐ | ☐ |
| 73 | `/blog/structural-design-patterns-dotnet` | Ba | ☐ | ☐ | ☐ |
| 74 | `/blog/technical-leadership-remote-teams` | Ba | ☐ | ☐ | ☐ |
| 75 | `/blog/testing-strategies-unit-integration-e2e` | Ba | ☐ | ☐ | ☐ |
| 76 | `/blog/trade-offs-ai-code-generation` | Ba | ☐ | ☐ | ☐ |
| 77 | `/blog/vue-enterprise-scale` | Ba | ☐ | ☐ | ☐ |
| 78 | `/blog/vue-vs-angular-vs-react-full-comparison` | Ba | ☐ | ☐ | ☐ |
| 79 | `/blog/what-developers-want-from-ai-assistants` | Ba | ☐ | ☐ | ☐ |
| 80 | `/blog/where-ai-fails-real-world-software-development` | Ba | ☐ | ☐ | ☐ |
| 81 | `/blog/why-ai-productivity-gains-plateau` | Ba | ☐ | ☐ | ☐ |

**Note:** “Meta 5–8 done” is satisfied for all 81 pages once M1–M6 are implemented in `seo.js` and (for blog) the generator no longer dumps long keywords. “llms block” for Ba is satisfied when `generate-llms-blog-articles.js` outputs Topics+Use cases+Audience for every article.

---

This plan considers: **robots.txt**, **llms.txt** (structure, generator, optional article fields), **meta keywords** for all 81 URLs, **structured data** (no structural change), **AI SEO principles** (entity, coverage, answerability, attribution), **safe keyword rule**, and **every page** with explicit checks and actions. Use with the Master Checklist for per-URL tick-off.
