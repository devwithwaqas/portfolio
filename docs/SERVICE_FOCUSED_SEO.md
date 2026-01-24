# Service-Focused SEO – Detailed, Deduplicated

## Overview

Service pages now use a **detailed, service-focused SEO** model with many keyword categories and **strict deduplication** via a shared `dedupeKeywords` helper. All service keywords are merged, trimmed, and deduplicated (case-insensitive) before use.

---

## 1. `dedupeKeywords` Helper

**Location:** `src/utils/seo.js`

- **Input:** One or more arrays of keyword strings (e.g. `dedupeKeywords(arr1, arr2, arr3)`).
- **Behaviour:**
  - Flattens all arrays.
  - Drops `null`, `undefined`, and empty/whitespace-only strings.
  - Trims each keyword.
  - Deduplicates **case-insensitively** (first occurrence wins, its casing kept).
- **Output:** Single deduplicated array of strings.

All service keyword arrays are combined and passed through `dedupeKeywords` before being used in meta tags or elsewhere.

---

## 2. Service-Focused Keyword Categories

Each service page builds keywords from these **deduplicated** categories:

### Base & Identity
- **baseKeywords:** Service title, “Services”, hire/looking for/consultant/expert/specialist, freelance/contract, name, role.
- **nameBasedKeywords:** Full name + service, “Waqas” + service, “Waqas UET” / “Waqas IT” + service.
- **itServicesKeywords:** IT services, IT consulting, IT consultant, IT services + service name, etc.

### Technical & Quality
- **technicalKeywords:** Reliable, enterprise-grade, mission-critical, zero-downtime, high-availability, fault tolerance, scalable, SSL/TLS, secure, real-time, high-performance, distributed systems, production-ready, robust, resilient, cloud-native, containerized, etc.
- **qualityKeywords:** Reliable developer/consultant, proven track record, vetted, qualified, Fortune 500 / enterprise / production experience, references, portfolio, case studies.

### Engagement Types
- **engagementKeywords:** Freelance, contract, consulting, project-based, retainer, hourly, fixed-price, staff augmentation, dedicated developer/team, part-time, full-time, remote contractor/freelancer/consultant, outsource, offshore, nearshore, extended team, flexible/short-term/long-term contract, ongoing support, sprint-based, agile engagement.

### Client Types
- **clientTypeKeywords:** Startup, SMB, mid-market, enterprise, Fortune 500, government, public sector, nonprofit, agency, product company, SaaS, B2B, B2C, internal tools, customer-facing applications.

### Outcomes & Deliverables
- **outcomeKeywords:** Custom software/web/mobile/API, bespoke development, system/API integration, cloud/application migration, legacy modernization, performance/database optimization, architecture design/implementation, technical assessment/audit, code/security audit, architecture review, due diligence, proof of concept, MVP, feature development, maintenance and support.

### Use Cases & Intent
- **useCaseKeywords:** Build from scratch, greenfield/brownfield, modernize legacy, replace legacy, migrate to cloud, scale system, add features, extend application, integrate systems, automate, improve performance/costs, reduce technical debt, accelerate delivery, improve reliability/security, compliance, digital transformation.
- **intentKeywords:** Hire/looking for/need/find developer/consultant/expert/specialist/architect, experienced/senior/lead/principal/expert/vetted/qualified/reliable/trusted/proven/top-rated/recommended.

### Geography & Timeline
- **geoKeywords:** USA/UK/Europe/Germany/Netherlands/Canada/Australia developer/consultant/services, US-based, remote USA/UK/Europe/global, timezone overlap, EST/PST/GMT/CET, flexible timezone.
- **timelineKeywords:** Quick turnaround, fast delivery, agile/sprint-based/iterative delivery, fixed timeline/scope, flexible scope, phased delivery, milestone-based, continuous delivery, ongoing engagement, immediate availability, start immediately.

### Methodology & Delivery
- **serviceMethodologyKeywords:** Agile, Scrum, DevOps, CI/CD, TDD, code/technical/architecture/performance review, security/code/technical audit.
- **serviceDeliveryKeywords:** Consulting, development, implementation, integration, migration, modernization, optimization, refactoring, maintenance, support, training, mentoring, coaching, advisory, strategic/technical/architecture/solution consulting.

### Service Aspects
- **serviceAspectKeywords:** End-to-end, full-cycle, turnkey, white-label, custom/tailored/scalable/secure/compliant solutions, documented, tested, maintainable, extensible, best practices, industry standards, clean code, code quality, performance, reliability, availability, monitoring, observability, documentation, knowledge transfer, handover.

### Service-Specific Aspects (by service type)
- **serviceSpecificAspectKeywords:** Built from service name:
  - **Full Stack:** Frontend/backend/full stack development, SPA, PWA, Vue/Angular/React, .NET Core backend, EF, API design, REST/GraphQL, real-time, auth, CI/CD, deployment.
  - **Azure / Cloud:** Cloud architecture/migration, Azure migration, IaC, ARM/Terraform, Azure DevOps/Pipelines, App Service, Functions, Service Fabric, SQL, Cosmos DB, Key Vault, AD, Monitor, API Management, DR, HA, cost optimization, security.
  - **Microservices:** Design, decomposition, DDD, API gateway, service mesh, event-driven, queues, distributed tracing, circuit breaker, Docker, Kubernetes, Service Fabric, resilience, fault tolerance, independent deployment.
  - **Technical Leadership:** Team/tech lead, engineering manager, sprint planning, retros, standups, code reviews, architecture decisions, tech selection, mentoring, coaching, process improvement, stakeholder communication, strategy, roadmap.
  - **Agile / Project Management:** Scrum, Kanban, backlog grooming, retros, ceremonies, velocity, story points, user stories, acceptance criteria, standups, stakeholder/risk/timeline management, QA.
  - **Database / Optimization:** Schema design, normalization, indexing, query optimization, execution plans, stored procedures, EF optimization, N+1, connection pooling, migration, archiving, partitioning, tuning, bottleneck analysis.
  - **Mobile:** iOS/Android, React Native, Flutter, Xamarin, Swift, Kotlin, mobile API, push, offline, app store, play store, cross-platform, native performance.

### Long-Tail & Industry
- **serviceLongTailKeywords:** `[service] freelance/contract`, `freelance/contract [service]`, `[service] consultant/expert/specialist`, `expert [service]`, `[service] services USA/UK/Europe`, `[service] remote`, `remote [service] USA/Europe`, `hire [service] expert/consultant`, `looking for [service] expert`.
- **serviceIndustryKeywords:** Petroleum, oil & gas, healthcare, medical, fintech, banking, financial services, aviation, aerospace, e-commerce, retail, manufacturing, industrial (each with .NET Core, Angular, Azure, full stack, microservices, systems, software, enterprise, and domain-specific variants).

### Remote & Platform
- **platformKeywords**, **remoteKeywords**, **usaKeywords**, **europeKeywords**, **globalKeywords:** Remote/freelance/contract/consulting/project + service, USA/UK/Europe/global, hire remote, etc.

### Extra
- **extraKeywords:** From `serviceData.keywords` (e.g. router/SERVICE_DATA_MAP).
- **location:** Single location string, when provided.

All of the above are passed into `dedupeKeywords(...)` together, so the final list is **fully deduplicated** across categories.

---

## 3. Structured Data (Service Schema)

**Location:** `src/utils/structuredData.js` → `generateServiceSchema`

- **serviceType:** Array of: service title, IT Services, Software Engineering Services, Enterprise Solutions, Remote Consulting, Freelance Development, Contract Development, Technical Consulting, Architecture Consulting.
- **category:** Comma-separated list of: IT Services, Software Engineering Services, Enterprise Solutions, Custom Software Development, Cloud Architecture, Full Stack Development, Microservices Architecture, Technical Leadership, Agile Project Management, Database Design & Optimization, Mobile Development.
- **keywords:** Comma-separated string including: reliable, enterprise-grade, mission-critical, zero-downtime, high-availability, scalable, SSL/TLS, real-time, high-performance, distributed systems, production-ready, robust, resilient, large-scale, freelance, contract, remote, USA/UK/Europe/global, Angular .NET Core, Azure, microservices, full stack, custom solutions, legacy modernization, cloud migration, Fortune 500 experience.
- **areaServed:** USA, UK, Germany, Netherlands, Switzerland, Global.
- **availableChannel:** Remote, English.

---

## 4. `llms.txt` (AI / LLM Indexing)

**Location:** `public/llms.txt`

### Global service-focused intro
- High-level summary of all services: engagement types (freelance, contract, consulting, etc.), geography (USA, UK, Europe, global), client types (startup → Fortune 500), outcomes (custom software, web/mobile, API, integration, migration, modernization, optimization), use cases (build from scratch, legacy modernization, cloud migration, scale), and tech (Angular, .NET Core, Azure, Vue, React, petroleum, healthcare, fintech, aviation, e-commerce, manufacturing).

### Per-service blocks
For each service (Full Stack, Azure Cloud, Technical Leadership, Microservices, Agile Project Management, Database Design & Optimization, Mobile Development):

- **URL** and **Description**
- **Engagement:** Freelance, contract, consulting, project-based, retainer, staff augmentation, etc.
- **Client types:** Startup, SMB, mid-market, enterprise, Fortune 500, etc.
- **Outcomes:** What clients get (custom app, migration, optimization, etc.)
- **Use cases:** Why they search (build from scratch, modernize, scale, etc.)
- **Tech:** Relevant technologies

### Service-focused SEO block
- **Engagement:** Full list of engagement types.
- **Client types:** Full list of client segments.
- **Outcomes:** Full list of deliverables.
- **Use cases:** Full list of use cases.
- **Geography:** USA, UK, Europe, etc., plus remote and timezone.
- **Quality:** Reliable, proven, vetted, Fortune 500 experience, references, portfolio, case studies.

---

## 5. Files Touched

| File | Changes |
|------|---------|
| `src/utils/seo.js` | Added `dedupeKeywords`; new service keyword categories; `getServicePageSEO` refactored to combine all arrays and dedupe once. |
| `src/utils/structuredData.js` | `generateServiceSchema` updated with service-focused `serviceType`, `category`, `keywords`; duplicate `serviceType` removed. |
| `public/llms.txt` | New global service intro; per-service blocks (engagement, client types, outcomes, use cases, tech); new “Service-Focused SEO” section. |

---

## 6. Deduplication Guarantee

- Every keyword used for service pages flows through `dedupeKeywords`.
- No other code path adds raw keywords to the final list; `serviceData.keywords` is merged into the same dedupe step.
- Empty, null, and duplicate (case-insensitive) keywords are removed; first occurrence’s casing is kept.

---

## 7. Coverage Summary

- **Engagement:** Freelance, contract, consulting, project-based, retainer, staff aug, dedicated team, etc.
- **Client types:** Startup → Fortune 500, government, nonprofit, agency, SaaS, B2B/B2C.
- **Outcomes:** Custom software, web/mobile/API, integration, migration, modernization, optimization, audits, MVP, maintenance.
- **Use cases:** Greenfield, brownfield, legacy modernization, cloud migration, scale, add features, integrate, automate, digital transformation.
- **Geography:** USA, UK, Europe, Germany, Netherlands, Canada, Australia, global, remote, timezone.
- **Quality:** Reliable, proven, vetted, qualified, enterprise/Fortune 500 experience, references, portfolio, case studies.
- **Service-specific:** Full Stack, Azure, Microservices, Technical Leadership, Agile, Database, Mobile with their own aspect keywords.
- **Industry:** Petroleum, healthcare, fintech, aviation, e-commerce, manufacturing (and related tech combinations).

All of this is **detailed, service-focused, and deduplicated** across `seo.js`, structured data, and `llms.txt`.
