# SEO Master Checklist – 81 URLs (2025+ Stability)

**Context:** Personal portfolio for a globally available Senior Software Engineer & Technical Lead (18+ years). Entity + commercial + authority intent. Apply checks **page by page**, starting at Page 1.

**Base URL:** `https://waqasahmad-portfolio.web.app`

---

# Part 1 – Master Checklist (summary)

Use this as the high-level pass before diving into each URL.

## 1.1 Hard rules (NEVER – non-negotiable)

| # | Rule | Status |
|---|------|--------|
| H1 | Meta keywords: remove entirely, or if kept: max 5–8 phrases, no repetition, no adjectives (best/top/elite), no company names, no URLs, no geo stuffing | ☐ |
| H2 | Geo meta tags removed: `geo.region`, `geo.placename`, `geo.position`, `ICBM` (global remote, not local SEO) | ☐ |
| H3 | No self-proclaimed superiority: avoid *best*, *top*, *elite*, *premier*, *#1*; use proof-based language | ☐ |
| H4 | No hidden/offscreen SEO: no `left:-9999px`, no noscript keyword dumps, no hidden divs for crawlers | ☐ |

### 1.1.1 Spam vs acceptable keywords (practical rule)

Use this to decide if a keyword is acceptable or spam — **apart from** the meta keywords limits above.

| Rule | Definition | Use when |
|------|------------|---------|
| **Safe keyword rule** | If a keyword can be **pointed to** a button, feature, or section on the page, it’s **NOT** spam. | Auditing content, headings, links, CTAs. |
| **Spam rule** | If a keyword exists **only to rank** and not to serve a feature or real content, it **might be** spam. | Deciding whether to remove or rework a phrase. |

- **Acceptable:** “Azure Cloud Architecture” as the label for a section or service card that links to that service.
- **Spam risk:** The same phrase repeated in a hidden block or in a long tail only for search, with no corresponding UI or content.

### 1.1.2 llms.txt – Current format (static site summary) ✅

**Rule:** `public/llms.txt` is a **single, hand-authored site summary** (not per-article blocks). It provides Site & Author Identity, Core Areas of Expertise, Representative & Flagship Content (curated URLs by theme), Enterprise Projects, Services, Complete Blog Coverage (topic clusters), and Discovery notes.

**Why we did this:** We moved from a build-time script that injected 61+ per-article blocks (Topics/Use cases/Audience) into llms.txt because: (1) that duplicated sitemap/page data and diluted “where to start” for AI systems; (2) identity and flagship entry points give a clearer, higher-signal picture; (3) the file is now static and never overwritten by build. **Full rationale:** `docs/LLMS_TXT_GUIDE.md`.

| # | Check | Status |
|---|-------|--------|
| H5 | llms.txt: Static site summary with identity, expertise, flagship URLs, breadth declaration; no per-article blocks in build | ✅ |

## 1.2 Site-wide consistency (ALL pages)

| # | Rule | Status |
|---|------|--------|
| S1 | Page title: formula `Primary Role/Service – Key Tech \| Waqas Ahmad`; 55–60 chars; brand last; one intent per page | ☐ |
| S2 | Meta description: 140–160 chars; human-readable; no stuffing; clear value + audience | ☐ |
| S3 | Exactly ONE H1 per page; matches page intent; not stuffed | ☐ |
| S4 | Internal links: every page links to About, Services, Portfolio, Contact where relevant | ☐ |
| S5 | Services/Projects/Blog link back to homepage with **varied anchors** (not your name every time) | ☐ |

## 1.3 Structured data (by page type) – Option B (no spam)

| Page type | Primary schema | Linked via @id | Status |
|-----------|----------------|----------------|--------|
| Homepage | Person + WebSite + Organization + Speakable (no ProfessionalService, JobPosting, reviews) | sameAs Person | ☐ |
| Services | Service + BreadcrumbList (+ FAQPage if FAQs; + Speakable) | provider → Person; **no** Offer/ProfessionalService | ☐ |
| Projects | Article + SoftwareApplication + BreadcrumbList (+ Speakable) | author → Person | ☐ |
| Blog index | CollectionPage + BreadcrumbList + ItemList + Speakable | — | ☐ |
| Blog article | BlogPosting + BreadcrumbList (+ Speakable; + FAQPage if FAQs) | author, publisher | ☐ |
| Rule | ONE primary schema per page; no duplicate/conflicting; no reviews/testimonials/Offer/JobPosting in schema | — | ☐ |

**Ref:** `docs/SEO_REVAMP_CHANGELOG.md` (§1).

## 1.4 Strategic intent (already correct – verify only)

| Intent | Covered by | Status |
|--------|------------|--------|
| Entity (Who is Waqas Ahmad) | Homepage, About | ☐ |
| Commercial | Services | ☐ |
| Authority | Projects + Blog | ☐ |

---

# Part 2 – Detailed Checklist (every single check)

Apply this list to **each** of the 81 URLs. Tick when done for that page.

## 2.1 Meta & tags (per page)

| ID | Check | Pass |
|----|-------|------|
| M1 | No `<meta name="keywords">` present, OR if present: ≤8 phrases, no repetition, no *best/top/elite*, no company names, no URLs, no geo | ☐ |
| M2 | No `geo.region` meta | ☐ |
| M3 | No `geo.placename` meta | ☐ |
| M4 | No `geo.position` meta | ☐ |
| M5 | No `ICBM` meta | ☐ |
| M6 | `<title>` follows: `Primary Topic/Service – Key Tech \| Waqas Ahmad` | ☐ |
| M7 | Title length 55–60 characters | ☐ |
| M8 | One clear intent per page (no multiple topics in title) | ☐ |
| M9 | Meta description present | ☐ |
| M10 | Meta description 140–160 characters | ☐ |
| M11 | Meta description human-readable, no keyword stuffing | ☐ |
| M12 | Meta description states value + audience | ☐ |

## 2.2 Content & headings (per page)

| ID | Check | Pass |
|----|-------|------|
| C1 | Exactly ONE `<h1>` on the page | ☐ |
| C2 | H1 matches page intent | ☐ |
| C3 | H1 not stuffed (no long keyword chains) | ☐ |
| C4 | No self-proclaimed terms: *best*, *top*, *elite*, *premier*, *#1* in H1/hero | ☐ |
| C5 | Evidence-based language preferred (years, projects, metrics, clients) | ☐ |
| C6 | No hidden content: no `left:-9999px` / offscreen text | ☐ |
| C7 | No noscript keyword dumps for crawlers | ☐ |
| C8 | No hidden divs for SEO only | ☐ |

### 2.2.1 Spam check (keywords)

| ID | Check | Pass |
|----|-------|------|
| C9 | **Safe keyword rule:** Every important keyword can be pointed to a button, feature, or section (not just for ranking). | ☐ |
| C10 | **Spam rule:** No keywords that exist only to rank with no corresponding feature or content. | ☐ |

## 2.3 Internal linking (per page)

| ID | Check | Pass |
|----|-------|------|
| L1 | Page links to About (or is About) | ☐ |
| L2 | Page links to Services (or is a service) | ☐ |
| L3 | Page links to Portfolio (or is a project) | ☐ |
| L4 | Page links to Contact | ☐ |
| L5 | If Services/Projects/Blog: links back to Homepage | ☐ |
| L6 | Anchors are varied (not "Waqas Ahmad" on every link) | ☐ |

## 2.4 Structured data (per page, by type)

**Homepage only**

| ID | Check | Pass |
|----|-------|------|
| SD-H1 | Person schema present | ☐ |
| SD-H2 | WebSite schema present | ☐ |
| SD-H3 | BreadcrumbList present | ☐ |
| SD-H4 | Organization (consulting brand) sameAs Person | ☐ |
| SD-H5 | One primary schema; others linked via @id | ☐ |

**Services only**

| ID | Check | Pass |
|----|-------|------|
| SD-S1 | Service schema present | ☐ |
| SD-S2 | Offer where appropriate | ☐ |
| SD-S3 | provider → Person | ☐ |
| SD-S4 | No duplicate or conflicting schema | ☐ |

**Projects only**

| ID | Check | Pass |
|----|-------|------|
| SD-P1 | CreativeWork or SoftwareApplication present | ☐ |
| SD-P2 | author → Person | ☐ |
| SD-P3 | about → Service where relevant | ☐ |
| SD-P4 | No duplicate or conflicting schema | ☐ |

**Blog only**

| ID | Check | Pass |
|----|-------|------|
| SD-B1 | BlogPosting schema present | ☐ |
| SD-B2 | author set | ☐ |
| SD-B3 | publisher set | ☐ |
| SD-B4 | datePublished set | ☐ |
| SD-B5 | No duplicate or conflicting schema | ☐ |

## 2.5 Content rules by page type

| Type | Rule | Pass |
|------|------|------|
| Homepage | Entity + summary; not sales-heavy | ☐ |
| Services | Problem → solution → proof → CTA | ☐ |
| Projects | Context → contribution → impact → tech stack | ☐ |
| Blog | Opinionated, experience-based; not generic | ☐ |

---

# Part 3 – Per-URL audit (all 81 URLs)

Work through **Page 1** to **Page 81** in order. For each URL, run through **Part 2** checks that apply to that page type.

**Legend**

- **Type:** H = Homepage, Sv = Service, Pj = Project, Bl = Blog, O = Other (e.g. Privacy)
- **Checks:** Use section **2.1** (all), **2.2** (all), **2.3** (all), **2.4** (by type), **2.5** (by type).

---

## Page 1

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/ |
| **Type** | H (Homepage) |
| **Checks** | 2.1 M1–M12, 2.2 C1–C8, 2.3 L1–L6, 2.4 SD-H1–SD-H5, 2.5 Homepage |
| **M1** ☐ **M2** ☐ **M3** ☐ **M4** ☐ **M5** ☐ **M6** ☐ **M7** ☐ **M8** ☐ **M9** ☐ **M10** ☐ **M11** ☐ **M12** ☐ | |
| **C1** ☐ **C2** ☐ **C3** ☐ **C4** ☐ **C5** ☐ **C6** ☐ **C7** ☐ **C8** ☐ | |
| **L1** ☐ **L2** ☐ **L3** ☐ **L4** ☐ **L5** ☐ **L6** ☐ | |
| **SD-H1** ☐ **SD-H2** ☐ **SD-H3** ☐ **SD-H4** ☐ **SD-H5** ☐ | |
| **Content** ☐ | |
| **Notes** | |

---

## Page 2

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/projects/heat-exchanger |
| **Type** | Pj (Project) |
| **Checks** | 2.1, 2.2, 2.3, 2.4 SD-P1–SD-P4, 2.5 Projects |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-P1–P4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 3

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/projects/airasia-id90 |
| **Type** | Pj |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Pj, 2.5 Projects |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-P1–P4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 4

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/projects/bat-inhouse-app |
| **Type** | Pj |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Pj, 2.5 Projects |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-P1–P4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 5

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/projects/pj-smart-city |
| **Type** | Pj |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Pj, 2.5 Projects |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-P1–P4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 6

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/projects/gamified-employee-management |
| **Type** | Pj |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Pj, 2.5 Projects |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-P1–P4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 7

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/projects/valet-parking |
| **Type** | Pj |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Pj, 2.5 Projects |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-P1–P4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 8

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/projects/mobile-games |
| **Type** | Pj |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Pj, 2.5 Projects |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-P1–P4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 9

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/projects/uk-property-management |
| **Type** | Pj |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Pj, 2.5 Projects |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-P1–P4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 10

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/projects/g5-pos |
| **Type** | Pj |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Pj, 2.5 Projects |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-P1–P4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 11

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/projects/chubb-insurance-applications |
| **Type** | Pj |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Pj, 2.5 Projects |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-P1–P4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 12

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/services/full-stack-development |
| **Type** | Sv |
| **Checks** | 2.1, 2.2, 2.3, 2.4 SD-S1–S4, 2.5 Services |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-S1–S4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 13

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/services/azure-cloud-architecture |
| **Type** | Sv |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Sv, 2.5 Services |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-S1–S4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 14

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/services/technical-leadership |
| **Type** | Sv |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Sv, 2.5 Services |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-S1–S4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 15

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/services/microservices-architecture |
| **Type** | Sv |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Sv, 2.5 Services |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-S1–S4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 16

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/services/agile-project-management |
| **Type** | Sv |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Sv, 2.5 Services |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-S1–S4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 17

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/services/database-design-optimization |
| **Type** | Sv |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Sv, 2.5 Services |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-S1–S4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 18

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/services/mobile-development |
| **Type** | Sv |
| **Checks** | 2.1, 2.2, 2.3, 2.4 Sv, 2.5 Services |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ **SD-S1–S4** ☐ **Content** ☐ |
| **Notes** | |

---

## Page 19

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/privacy |
| **Type** | O (Other) |
| **Checks** | 2.1, 2.2, 2.3 (no schema required for Privacy unless you add it) |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ |
| **Notes** | |

---

## Page 20

| Field | Value |
|-------|--------|
| **URL** | https://waqasahmad-portfolio.web.app/blog |
| **Type** | Bl (Blog index) |
| **Checks** | 2.1, 2.2, 2.3; schema optional for index |
| **M1–M12** ☐ | **C1–C8** ☐ **L1–L6** ☐ |
| **Notes** | |

---

## Pages 21–81 (Blog articles) – use same checks per page

For **each** blog URL below: **Type = Bl**. Apply **Part 2** in full: **2.1** M1–M12, **2.2** C1–C8, **2.3** L1–L6, **2.4** SD-B1–SD-B5, **2.5** Blog.

**Template for each blog page (copy for Page 21 → 81):**

| Check set | Pass |
|-----------|------|
| M1–M12 (meta, title, description) | ☐ |
| C1–C8 (one H1, no stuffing, no hidden) | ☐ |
| L1–L6 (internal links, varied anchors) | ☐ |
| SD-B1–B5 (BlogPosting, author, publisher, date) | ☐ |
| Content: opinionated, experience-based | ☐ |

---

| Page | URL |
|------|-----|
| 21 | https://waqasahmad-portfolio.web.app/blog/agile-delivery-enterprise-constraints |
| 22 | https://waqasahmad-portfolio.web.app/blog/ai-changing-code-review-testing |
| 23 | https://waqasahmad-portfolio.web.app/blog/ai-ides-what-they-get-right-wrong |
| 24 | https://waqasahmad-portfolio.web.app/blog/ai-models-claude-gemini-gpt-deepseek-comparison |
| 25 | https://waqasahmad-portfolio.web.app/blog/api-gateway-vs-bff |
| 26 | https://waqasahmad-portfolio.web.app/blog/azure-bicep-iac-basics |
| 27 | https://waqasahmad-portfolio.web.app/blog/azure-cloud-architecture-patterns |
| 28 | https://waqasahmad-portfolio.web.app/blog/azure-devops-vs-github-actions |
| 29 | https://waqasahmad-portfolio.web.app/blog/azure-microservices-best-practices |
| 30 | https://waqasahmad-portfolio.web.app/blog/azure-serverless-functions-logic-apps |
| 31 | https://waqasahmad-portfolio.web.app/blog/behavioral-design-patterns-dotnet |
| 32 | https://waqasahmad-portfolio.web.app/blog/caching-strategies-redis-dotnet |
| 33 | https://waqasahmad-portfolio.web.app/blog/case-study-airasia-id90 |
| 34 | https://waqasahmad-portfolio.web.app/blog/case-study-bat-inhouse-app |
| 35 | https://waqasahmad-portfolio.web.app/blog/ci-cd-azure-devops |
| 36 | https://waqasahmad-portfolio.web.app/blog/clean-architecture-dotnet |
| 37 | https://waqasahmad-portfolio.web.app/blog/creational-design-patterns-dotnet |
| 38 | https://waqasahmad-portfolio.web.app/blog/current-state-ai-coding-tools-2026 |
| 39 | https://waqasahmad-portfolio.web.app/blog/cursor-vs-claude-code-vs-copilot-ai-ide |
| 40 | https://waqasahmad-portfolio.web.app/blog/data-engineering-azure-pipelines-lakehouse |
| 41 | https://waqasahmad-portfolio.web.app/blog/data-engineering-batch-vs-streaming |
| 42 | https://waqasahmad-portfolio.web.app/blog/database-indexing-strategies |
| 43 | https://waqasahmad-portfolio.web.app/blog/database-optimization-entity-framework |
| 44 | https://waqasahmad-portfolio.web.app/blog/database-transactions-isolation-levels |
| 45 | https://waqasahmad-portfolio.web.app/blog/dependency-injection-dotnet-core |
| 46 | https://waqasahmad-portfolio.web.app/blog/design-patterns-overview-creational-structural-behavioral |
| 47 | https://waqasahmad-portfolio.web.app/blog/developers-integrating-ai-daily-workflows |
| 48 | https://waqasahmad-portfolio.web.app/blog/domain-driven-design-basics |
| 49 | https://waqasahmad-portfolio.web.app/blog/dotnet-core-middleware-pipeline |
| 50 | https://waqasahmad-portfolio.web.app/blog/event-driven-architecture-azure |
| 51 | https://waqasahmad-portfolio.web.app/blog/event-sourcing-and-cqrs |
| 52 | https://waqasahmad-portfolio.web.app/blog/feature-flags-toggles-dotnet |
| 53 | https://waqasahmad-portfolio.web.app/blog/full-stack-net-angular-enterprise |
| 54 | https://waqasahmad-portfolio.web.app/blog/gamification-enterprise-apps |
| 55 | https://waqasahmad-portfolio.web.app/blog/grpc-vs-rest-dotnet-apis |
| 56 | https://waqasahmad-portfolio.web.app/blog/impact-ai-tools-code-quality-maintainability |
| 57 | https://waqasahmad-portfolio.web.app/blog/kubernetes-basics-dotnet-developers |
| 58 | https://waqasahmad-portfolio.web.app/blog/microservices-resilience-circuit-breaker-retry |
| 59 | https://waqasahmad-portfolio.web.app/blog/mobile-app-architecture-vue-capacitor |
| 60 | https://waqasahmad-portfolio.web.app/blog/monorepo-vs-polyrepo |
| 61 | https://waqasahmad-portfolio.web.app/blog/oauth2-openid-connect-dotnet |
| 62 | https://waqasahmad-portfolio.web.app/blog/observability-dotnet-azure |
| 63 | https://waqasahmad-portfolio.web.app/blog/open-telemetry-distributed-tracing-dotnet |
| 64 | https://waqasahmad-portfolio.web.app/blog/owasp-api-security-top-10 |
| 65 | https://waqasahmad-portfolio.web.app/blog/property-management-systems-uk |
| 66 | https://waqasahmad-portfolio.web.app/blog/repository-pattern-unit-of-work-dotnet |
| 67 | https://waqasahmad-portfolio.web.app/blog/rest-api-versioning-idempotency |
| 68 | https://waqasahmad-portfolio.web.app/blog/rest-vs-graphql-apis |
| 69 | https://waqasahmad-portfolio.web.app/blog/saga-pattern-orchestrator-vs-choreography |
| 70 | https://waqasahmad-portfolio.web.app/blog/securing-apis-dotnet |
| 71 | https://waqasahmad-portfolio.web.app/blog/solid-principles-in-practice |
| 72 | https://waqasahmad-portfolio.web.app/blog/sql-server-performance-tuning |
| 73 | https://waqasahmad-portfolio.web.app/blog/structural-design-patterns-dotnet |
| 74 | https://waqasahmad-portfolio.web.app/blog/technical-leadership-remote-teams |
| 75 | https://waqasahmad-portfolio.web.app/blog/testing-strategies-unit-integration-e2e |
| 76 | https://waqasahmad-portfolio.web.app/blog/trade-offs-ai-code-generation |
| 77 | https://waqasahmad-portfolio.web.app/blog/vue-enterprise-scale |
| 78 | https://waqasahmad-portfolio.web.app/blog/vue-vs-angular-vs-react-full-comparison |
| 79 | https://waqasahmad-portfolio.web.app/blog/what-developers-want-from-ai-assistants |
| 80 | https://waqasahmad-portfolio.web.app/blog/where-ai-fails-real-world-software-development |
| 81 | https://waqasahmad-portfolio.web.app/blog/why-ai-productivity-gains-plateau |

---

# Part 4 – Cursor prompt (apply across all pages)

Use once in Cursor, then apply fixes page by page (Page 1 → 81).

```
You are an SEO-focused senior web architect.

Context:
This is a personal portfolio website for a globally available Senior Software Engineer & Technical Lead with 18+ years of experience. The site includes:
- Homepage (entity & authority)
- About page
- Services pages (commercial intent)
- Project/Portfolio pages (proof & credibility)
- Blog pages (expertise & thought leadership)
- Resume section

Goals:
- Long-term Google stability (2025+)
- Global remote positioning (USA, Europe, worldwide)
- Clean E-E-A-T signals
- No spam or over-optimization

Global rules (apply to ALL pages):
1. Remove meta keywords entirely (do not add them).
2. Remove all geo meta tags (geo.region, placename, ICBM, etc).
3. Use ONE clear page intent per page.
4. Ensure exactly ONE H1 per page.
5. Titles must follow:
   "Primary Topic / Service – Key Tech | Waqas Ahmad"
   (55–60 chars max)
6. Meta descriptions must be human-readable, 140–160 chars, no stuffing.
7. Avoid self-proclaimed terms like "best", "top", "elite", "premier".
8. Prefer evidence-based language (years, projects, metrics, clients).
9. Ensure clean internal linking:
   - Pages must link back to Homepage, Services, Portfolio, Contact.
10. Do not add hidden content, noscript SEO blocks, or offscreen text.

Structured Data Rules:
- Homepage: Person + WebSite + BreadcrumbList
- Services: Service schema linked to Person as provider
- Projects: SoftwareApplication or CreativeWork with author Person
- Blog: BlogPosting with author & publisher
- Use ONE primary schema per page
- Reuse @id references consistently across the site
- No duplicate or conflicting schema

Content Rules:
- Homepage = entity + summary, not sales-heavy
- Services = problem → solution → proof → CTA
- Projects = context → contribution → impact → tech stack
- Blog = opinionated, experience-based, not generic

Final Objective:
Refactor and normalize all pages so the site functions as a trusted personal authority hub, not a keyword-stuffed portfolio.
```

---

# Part 5 – Schema (JSON-LD): this project + reference links

## LD schema files in this project

All JSON-LD for the site is generated in one place and injected per route.

| File | Purpose |
|------|---------|
| **`src/utils/structuredData.js`** | Single source: all schema generators and `injectStructuredData()`. |

### Schema type → function → where used

| Schema type | Function in `structuredData.js` | Used on / by |
|-------------|----------------------------------|--------------|
| **Person** | `generatePersonSchema()` | Homepage (via `generateHomePageStructuredData`) |
| **WebSite** | `generateWebSiteSchema()` | Homepage (same) |
| **Organization** | `generateOrganizationSchema()` | Homepage (same) |
| **BreadcrumbList** | `generateBreadcrumbSchema(items)` | Router (all routes), `Breadcrumbs.vue`, project/service/blog pages |
| **Service** | `generateServiceSchema()` / `generateServicePageStructuredData()` | All 7 service pages + router |
| **Offer** | Inside Service / `generateOfferSchema()` | Service pages, project pages |
| **SoftwareApplication** / **CreativeWork** | `generateProjectPageStructuredData()` | All 11 project pages (via router) |
| **BlogPosting** | `generateBlogArticleStructuredData(article)` | All 61 blog article pages (via router) |
| **CollectionPage** + **ItemList** | `generateBlogIndexStructuredData()` | Blog index (`/blog`) |
| **FAQPage** | `generateFAQPageSchema()` | Home FAQ, Service FAQs, blog articles with `article.faqs` |
| **SpeakableSpecification** | `generateSpeakableSchema()` | Blog articles, blog index |

### Where injection is triggered

| File | What runs |
|------|-----------|
| **`src/router/index.js`** | Calls the right generator in `beforeEach`: homepage (Home.vue does it), project pages, service pages, blog index, blog article, privacy, 404. |
| **`src/views/Home.vue`** | Loads `structuredData.js` and runs homepage schema (Person + WebSite + Organization + FAQ + etc.). |
| **`src/views/services/*.vue`** | Each service page calls `generateServicePageStructuredData(serviceData, faqItems)`. |
| **`src/components/projects/Breadcrumbs.vue`** | Calls `generateBreadcrumbSchema()` for breadcrumb JSON-LD when used. |
| **`src/components/home/HomeFAQ.vue`** | Injects FAQ schema for homepage. |
| **`src/components/services/ServiceFAQ.vue`** | Injects FAQ schema for service pages. |

### Microdata (HTML attributes) – not JSON-LD

These components use `itemscope` / `itemtype` / `itemprop` instead of a separate script:

| File | Schema type |
|------|-------------|
| **`src/components/projects/Breadcrumbs.vue`** | `BreadcrumbList` (ol) |
| **`src/components/home/LatestFromBlog.vue`** | `CollectionPage` (section#blog) |
| **`src/components/home/Services.vue`** | `ItemList` (section#services) |
| **`src/components/home/Portfolio.vue`** | `ItemList` (section#portfolio) |
| **`src/components/common/ProjectPageTemplate.vue`** | `Article` (article) |
| **`src/components/common/ArticlePageTemplate.vue`** | `BlogPosting` (article) |

To audit or change LD schema for your site, start with **`src/utils/structuredData.js`** and the router.

---

## schema.org (canonical definitions)

| Type | URL |
|------|-----|
| **Person** | https://schema.org/Person |
| **WebSite** | https://schema.org/WebSite |
| **Organization** | https://schema.org/Organization |
| **BreadcrumbList** | https://schema.org/BreadcrumbList |
| **Service** | https://schema.org/Service |
| **Offer** | https://schema.org/Offer |
| **CreativeWork** | https://schema.org/CreativeWork |
| **SoftwareApplication** | https://schema.org/SoftwareApplication |
| **BlogPosting** | https://schema.org/BlogPosting |
| **Article** | https://schema.org/Article |

## Google Search (guidance & testing)

| Resource | URL |
|----------|-----|
| **Structured data general** | https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data |
| **Structured data guidelines** | https://developers.google.com/search/docs/appearance/structured-data/structured-data-guidelines |
| **Rich results test** | https://search.google.com/test/rich-results |
| **Person (knowledge panel)** | https://developers.google.com/search/docs/appearance/structured-data/profile-page |
| **Article / BlogPosting** | https://developers.google.com/search/docs/appearance/structured-data/article |
| **Breadcrumbs** | https://developers.google.com/search/docs/appearance/structured-data/breadcrumb |
| **WebSite (Sitelinks search)** | https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox |
| **Organization** | https://schema.org/Organization (use with sameAs for Person) |

## JSON-LD format

- **W3C JSON-LD 1.1:** https://www.w3.org/TR/json-ld11/
- **Google: Add structured data:** https://developers.google.com/search/docs/appearance/structured-data/add-structured-data

---

# Quick reference – Meta keywords (if kept)

**Allowed example (max 5–8 phrases):**

```
Senior Software Engineer,
.NET Consultant,
Azure Cloud Architect,
Microservices Developer,
Remote Software Consultant
```

**Never:** name repeated, "Hire / Find / Best", Fortune 500 names, social links, URLs, geo stuffing.
