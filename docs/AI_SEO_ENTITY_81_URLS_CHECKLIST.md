# AI-SEO & Entity: Checklist for All 81 URLs

**Source:** Entity-based understanding, structured data as identity (not ranking), schema cleanup, content structure. No official “AI-SEO rules” exist; this doc turns the guidance into concrete tasks for every URL.

**Base URL:** `https://waqasahmad-portfolio.web.app`

---

# Part 1 – The Guidance (Summary)

## 1.1 Big truth

- There are **no** official AI-SEO rules: no “AI ranking factors,” “LLM schema standards,” or “special AI keywords.”
- What exists: **entity-based understanding**. Search and AI systems converge on **who you are** and **what you do**.
- **Structured data** is used for **disambiguation and identity**, not for ranking. It does **not** boost rankings directly, replace content, backlinks, or clicks.

## 1.2 What structured data answers (for machines)

- Who are you?
- What do you do?
- Are you the same person across the web?
- What is your expertise domain?
- Can you be trusted as an authority?

## 1.3 Verdict on your setup

- **structuredData.js:** Good enough; above average; **slightly over-verbose**; **mixes facts with marketing**.
- **Correct schema types:** Person, ProfessionalService, WebSite, ProfilePage — keep them; do not add new types.
- **Strong entity consistency:** Same name, role, experience, location, LinkedIn/GitHub across schema and content — **keep this**.

## 1.4 What to improve (clean-up, not “add more”)

| Issue | What to do |
|-------|------------|
| **knowsAbout overloaded** | Only **concrete, verifiable knowledge areas**. **15–25 items max.** Remove: buzzwords, marketing phrases, vague/repetitive concepts. Remove from schema: “Enterprise-grade solutions,” “Robust systems,” “Huge projects,” “High performance systems,” “Best practices.” |
| **Marketing language in schema** | No “Best,” “Elite,” “Premier,” “Top expert” inside structured data. They are ignored; they dilute clarity. |
| **Too much resume in schema** | Schema should **point**, not duplicate. You already have full resume, project pages, rich content. Do not put every achievement, employer, award, metric into schema. |

## 1.5 What AI systems actually use

- **Visible page text**, clear headings, opinionated statements, internal links.
- **Schema** mainly for **identity confirmation** (“who is speaking”). Authority comes from **depth**, **experience narration**, **tradeoffs**, **first-person reasoning** — which your site already has.

## 1.6 Content structure AI responds to (important pages)

For home, services, key projects, content should include:

- What you do  
- Who you work with  
- How you approach problems  
- What you are good at  
- What you avoid / don’t recommend  

**Structure that works (H2 pattern):**

- How I Approach [Topic]
- Design Tradeoffs I Consider
- When I Recommend This Approach
- When I Don’t
- Common Questions Clients Ask  

**AI loves this pattern.**

## 1.7 llms.txt and robots.txt

- **llms.txt:** Optional; fine to keep; helpful for AI summaries; not a ranking signal.
- **robots.txt:** Must allow Googlebot and reputable AI bots; block nothing critical. No urgent changes needed.

## 1.8 What to do next (overall)

- Clean schema (reduce noise).  
- Keep publishing opinionated content.  
- Let time + clicks stabilize rankings.

---

# Part 2 – Schema Cleanup (One Place, Affects Multiple URLs)

All 81 URLs that receive **Person**, **WebSite**, **Service**, **Organization**, or **BlogPosting** schema get it from `src/utils/structuredData.js`. Clean-up there applies site-wide.

| Task | Where | Action |
|------|--------|--------|
| **knowsAbout** | `structuredData.js` – `generatePersonSchema()` / Person `knowsAbout` array | Trim to **15–25** items. Keep only **concrete knowledge areas** (e.g. .NET Core, ASP.NET, C#, Azure Cloud Architecture, Microservices, Distributed Systems, RESTful API Design, CI/CD, SQL Server, Technical Leadership, Enterprise Software Architecture). **Remove:** “Reliable Systems,” “Enterprise-Grade Solutions,” “Mission-Critical Applications,” “Zero-Downtime Systems,” “High-Performance Systems,” “Production-Ready Solutions,” “Robust Architecture,” “Resilient Systems,” “Large-Scale Projects,” “Huge Projects,” long industry keyword lists that duplicate content, marketing phrases. |
| **Marketing in schema** | Same file – Person `jobTitle` / `alternateName`; any `description` | Remove “Top Software Engineering Consultant,” “Best Software Engineering Expert” from jobTitle/alternateName. Remove “Premier” from education/organization descriptions (e.g. “Premier engineering institution”). |
| **Resume overflow** | Person schema: `award`, `hasCredential`, `worksFor`, `knowsAbout` | Keep identity and core credentials; do not duplicate full resume. Schema should **point** to resume and project pages, not repeat everything. |

**Example of correct knowsAbout (15–25 items):**

- .NET Core, ASP.NET, C#, Azure Cloud Architecture, Microservices Architecture, Distributed Systems, RESTful API Design, CI/CD Pipelines, SQL Server, Technical Leadership, Enterprise Software Architecture, Vue.js, Angular, Entity Framework, Docker, Kubernetes, Event-Driven Architecture, Domain-Driven Design, API Design, Database Design

**Not in knowsAbout:** Enterprise-grade solutions, Robust systems, Huge projects, High performance systems, Best practices.

---

# Part 3 – All 81 URLs: What to Do Per URL

Each URL gets: **(1) Schema** (if applicable), **(2) Content / structure**, **(3) Meta / links** (already in SEO plan). This section focuses on **entity/schema** and **content structure** from the guidance.

---

## Page 1 – Homepage

| Field | Value |
|-------|--------|
| **URL** | `/` |
| **Type** | Home |
| **Schema** | Person, WebSite, BreadcrumbList, Organization. **Action:** Same as Part 2 (knowsAbout trim, no marketing in schema). Homepage injects Person schema — cleanup in `structuredData.js` covers this. |
| **Content** | What you do, who you work with, how you approach problems, what you’re good at. **Optional:** Add H2s in this pattern where relevant: “How I Approach…”, “When I Recommend…”, “When I Don’t,” “Common Questions.” |
| **Already done** | Meta 5–8 keywords; entity + summary. |

---

## Pages 2–11 – Projects (10)

| # | URL | Schema | Content |
|---|-----|--------|---------|
| 2 | `/projects/heat-exchanger` | CreativeWork/SoftwareApplication, author→Person. **Action:** No marketing in project schema; schema points to project, doesn’t duplicate full resume. | Context→contribution→impact→tech. **Optional:** “Design tradeoffs,” “When I recommend this,” “When I don’t.” |
| 3 | `/projects/airasia-id90` | Same | Same |
| 4 | `/projects/bat-inhouse-app` | Same | Same |
| 5 | `/projects/pj-smart-city` | Same | Same |
| 6 | `/projects/gamified-employee-management` | Same | Same |
| 7 | `/projects/valet-parking` | Same | Same |
| 8 | `/projects/mobile-games` | Same | Same |
| 9 | `/projects/uk-property-management` | Same | Same |
| 10 | `/projects/g5-pos` | Same | Same |
| 11 | `/projects/chubb-insurance-applications` | Same | Same |

**Schema source:** `structuredData.js` – `generateProjectPageStructuredData()`. Ensure no “best/elite/premier” in project `name`/`description`; keep factual.

---

## Pages 12–18 – Services (7)

| # | URL | Schema | Content |
|---|-----|--------|---------|
| 12 | `/services/full-stack-development` | Service, provider→Person. **Action:** Same Part 2; no marketing in service schema. | Problem→solution→proof→CTA. **Ideal:** H2s like “How I Approach [Service],” “Tradeoffs I Consider,” “When I Recommend / When I Don’t,” “Common Questions.” |
| 13 | `/services/azure-cloud-architecture` | Same | Same |
| 14 | `/services/technical-leadership` | Same | Same |
| 15 | `/services/microservices-architecture` | Same | Same |
| 16 | `/services/agile-project-management` | Same | Same |
| 17 | `/services/database-design-optimization` | Same | Same |
| 18 | `/services/mobile-development` | Same | Same |

**Schema source:** `structuredData.js` – `generateServicePageStructuredData()`. Descriptions should be factual, not “best/elite/premier.”

---

## Page 19 – Privacy

| Field | Value |
|-------|--------|
| **URL** | `/privacy` |
| **Type** | Other |
| **Schema** | None required. |
| **Content** | N/A for entity/structure. Meta minimal (already in SEO plan). |

---

## Page 20 – Blog index

| Field | Value |
|-------|--------|
| **URL** | `/blog` |
| **Type** | Blog index |
| **Schema** | Optional CollectionPage/ItemList. **Action:** No marketing language if present. |
| **Content** | One H1; clear intent. Optional: short “what this blog covers” (what you do, topics, who it’s for). |

---

## Pages 21–81 – Blog articles (61)

| # | Slug (URL = /blog/{slug}) | Schema | Content |
|---|----------------------------|--------|---------|
| 21–81 | (all 61 slugs – see list below) | BlogPosting, author, publisher. **Action:** Identity only; no marketing in schema. Authority from **content**: depth, opinion, tradeoffs, first-person reasoning. | **Already strong:** Opinionated, experience-based. **Ideal pattern where relevant:** H2s like “How I Approach…,” “Tradeoffs I Consider,” “When I Recommend / When I Don’t,” “Common Questions.” |

**Schema source:** `structuredData.js` – `generateBlogArticleStructuredData()`. Keep author/publisher/date; avoid “best/elite” in any schema field.

**Full list of blog slugs (21–81):**

| 21 | agile-delivery-enterprise-constraints | 52 | feature-flags-toggles-dotnet | 73 | structural-design-patterns-dotnet |
| 22 | ai-changing-code-review-testing | 53 | full-stack-net-angular-enterprise | 74 | technical-leadership-remote-teams |
| 23 | ai-ides-what-they-get-right-wrong | 54 | gamification-enterprise-apps | 75 | testing-strategies-unit-integration-e2e |
| 24 | ai-models-claude-gemini-gpt-deepseek-comparison | 55 | grpc-vs-rest-dotnet-apis | 76 | trade-offs-ai-code-generation |
| 25 | api-gateway-vs-bff | 56 | impact-ai-tools-code-quality-maintainability | 77 | vue-enterprise-scale |
| 26 | azure-bicep-iac-basics | 57 | kubernetes-basics-dotnet-developers | 78 | vue-vs-angular-vs-react-full-comparison |
| 27 | azure-cloud-architecture-patterns | 58 | microservices-resilience-circuit-breaker-retry | 79 | what-developers-want-from-ai-assistants |
| 28 | azure-devops-vs-github-actions | 59 | mobile-app-architecture-vue-capacitor | 80 | where-ai-fails-real-world-software-development |
| 29 | azure-microservices-best-practices | 60 | monorepo-vs-polyrepo | 81 | why-ai-productivity-gains-plateau |
| 30 | azure-serverless-functions-logic-apps | 61 | oauth2-openid-connect-dotnet | | |
| 31 | behavioral-design-patterns-dotnet | 62 | observability-dotnet-azure | | |
| 32 | caching-strategies-redis-dotnet | 63 | open-telemetry-distributed-tracing-dotnet | | |
| 33 | case-study-airasia-id90 | 64 | owasp-api-security-top-10 | | |
| 34 | case-study-bat-inhouse-app | 65 | property-management-systems-uk | | |
| 35 | ci-cd-azure-devops | 66 | repository-pattern-unit-of-work-dotnet | | |
| 36 | clean-architecture-dotnet | 67 | rest-api-versioning-idempotency | | |
| 37 | creational-design-patterns-dotnet | 68 | rest-vs-graphql-apis | | |
| 38 | current-state-ai-coding-tools-2026 | 69 | saga-pattern-orchestrator-vs-choreography | | |
| 39 | cursor-vs-claude-code-vs-copilot-ai-ide | 70 | securing-apis-dotnet | | |
| 40 | data-engineering-azure-pipelines-lakehouse | 71 | solid-principles-in-practice | | |
| 41 | data-engineering-batch-vs-streaming | 72 | sql-server-performance-tuning | | |
| 42 | database-indexing-strategies | | | | |
| 43 | database-optimization-entity-framework | | | | |
| 44 | database-transactions-isolation-levels | | | | |
| 45 | dependency-injection-dotnet-core | | | | |
| 46 | design-patterns-overview-creational-structural-behavioral | | | | |
| 47 | developers-integrating-ai-daily-workflows | | | | |
| 48 | domain-driven-design-basics | | | | |
| 49 | dotnet-core-middleware-pipeline | | | | |
| 50 | event-driven-architecture-azure | | | | |
| 51 | event-sourcing-and-cqrs | | | | |

---

# Part 4 – One-Page Summary: What to Do for All 81 URLs

| Page type | Count | Schema | Content |
|-----------|-------|--------|---------|
| **Home** | 1 | knowsAbout 15–25; no “Best/Top/Elite/Premier” in Person. | What you do, who you work with, how you approach; optional H2 pattern. |
| **Projects** | 10 | No marketing in CreativeWork/SoftwareApplication; schema points, doesn’t duplicate resume. | Context→contribution→impact→tech; optional tradeoffs / when I recommend / when I don’t. |
| **Services** | 7 | No marketing in Service schema. | Problem→solution→proof→CTA; ideal: H2 pattern (how I approach, tradeoffs, when I recommend/don’t, common questions). |
| **Privacy** | 1 | None. | — |
| **Blog index** | 1 | Optional; no marketing. | One H1; optional “what this blog covers.” |
| **Blog articles** | 61 | BlogPosting identity only; no marketing. | Keep opinionated/depth; where relevant add H2 pattern (how I approach, tradeoffs, when I recommend/don’t, common questions). |

**Single code change that affects many URLs:** Clean `src/utils/structuredData.js`: trim **knowsAbout** to 15–25 concrete items, remove marketing from **jobTitle/alternateName** and any **description** (e.g. “Best,” “Premier”), and avoid resume overflow in Person schema.

---

# Part 5 – Quick Reference: File and Section

| What | File | Section / identifier |
|------|------|----------------------|
| Person knowsAbout | `src/utils/structuredData.js` | `generatePersonSchema()` → `knowsAbout: [...]` (approx. lines 190–400+) |
| Person jobTitle / alternateName (marketing) | Same | `jobTitle: [...]`, `alternateName` (e.g. “Top Software Engineering Consultant,” “Best Software Engineering Expert”) |
| Education “Premier” | Same | `alumniOf` → `description: '...Premier...'` |
| Person about/description | Same | `description`, `about` — keep factual; remove marketing phrasing |
| Service schema | Same | `generateServicePageStructuredData()`, Service/Offer descriptions |
| Project schema | Same | `generateProjectPageStructuredData()` — project name/description |
| BlogPosting | Same | `generateBlogArticleStructuredData()` |

---

# Part 6 – Final Checklist (Per Guidance)

- [ ] **Schema:** knowsAbout reduced to 15–25 concrete knowledge areas; no “Enterprise-grade solutions,” “Robust systems,” “Huge projects,” “High performance systems,” “Best practices” in knowsAbout.
- [ ] **Schema:** No “Best,” “Elite,” “Premier,” “Top expert” in any structured data (Person jobTitle/alternateName, descriptions).
- [ ] **Schema:** Person schema points to resume/projects; no full resume dump in schema.
- [ ] **Content (home, services, key projects):** Includes what you do, who you work with, how you approach, what you’re good at, what you avoid; optional H2 pattern (How I Approach, Tradeoffs, When I Recommend, When I Don’t, Common Questions).
- [ ] **Content (blog):** Keep opinionated, experience-based; add H2 pattern where it fits.
- [ ] **llms.txt / robots.txt:** No urgent changes; keep as is.
- [ ] **Overall:** Clean schema (reduce noise); keep publishing opinionated content; let time + clicks stabilize.

---

# Part 7 – Full 81-URL Tick List (Entity + Schema + Content)

Use this to tick off each URL. **S** = schema cleanup applies (from Part 2 / structuredData.js). **C** = content structure check (entity, H2 pattern where relevant).

| P# | URL | Type | S | C | Notes |
|----|-----|------|---|---|-------|
| 1 | `/` | Home | ☐ | ☐ | knowsAbout trim, no marketing; what you do / how you approach |
| 2 | `/projects/heat-exchanger` | Pj | ☐ | ☐ | Schema factual; context→impact→tech; optional tradeoffs H2s |
| 3 | `/projects/airasia-id90` | Pj | ☐ | ☐ | Same |
| 4 | `/projects/bat-inhouse-app` | Pj | ☐ | ☐ | Same |
| 5 | `/projects/pj-smart-city` | Pj | ☐ | ☐ | Same |
| 6 | `/projects/gamified-employee-management` | Pj | ☐ | ☐ | Same |
| 7 | `/projects/valet-parking` | Pj | ☐ | ☐ | Same |
| 8 | `/projects/mobile-games` | Pj | ☐ | ☐ | Same |
| 9 | `/projects/uk-property-management` | Pj | ☐ | ☐ | Same |
| 10 | `/projects/g5-pos` | Pj | ☐ | ☐ | Same |
| 11 | `/projects/chubb-insurance-applications` | Pj | ☐ | ☐ | Same |
| 12 | `/services/full-stack-development` | Sv | ☐ | ☐ | No marketing in Service; H2 pattern ideal |
| 13 | `/services/azure-cloud-architecture` | Sv | ☐ | ☐ | Same |
| 14 | `/services/technical-leadership` | Sv | ☐ | ☐ | Same |
| 15 | `/services/microservices-architecture` | Sv | ☐ | ☐ | Same |
| 16 | `/services/agile-project-management` | Sv | ☐ | ☐ | Same |
| 17 | `/services/database-design-optimization` | Sv | ☐ | ☐ | Same |
| 18 | `/services/mobile-development` | Sv | ☐ | ☐ | Same |
| 19 | `/privacy` | O | — | — | No schema/content action |
| 20 | `/blog` | Bl | ☐ | ☐ | Optional schema; one H1, clear intent |
| 21–81 | `/blog/{slug}` (61 articles) | Ba | ☐ | ☐ | BlogPosting identity only; opinionated content; H2 pattern where relevant |

**Note:** Schema (S) for 1, 2–11, 12–18, 20, 21–81 is driven by **one place**: `structuredData.js`. Complete Part 2 and the “Schema Cleanup” table once; then tick S for each URL as “verified” after deployment. Content (C) can be checked per URL.

This document covers all 81 URLs and ties every point from the guidance to concrete tasks and files.
