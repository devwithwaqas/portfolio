# Topic cluster & internal linking — full implementation checklist

**Purpose:** Implement the 8-step topic cluster and internal linking plan across all pages. Every link maps into the 8 major clusters; service, project, and blog pages cross-link for SEO and AI-overview optimization.

**Base URL:** `https://waqasahmad-portfolio.web.app`

---

## STEP 1 — Define 8 major topic clusters

Every link maps into these clusters.

| # | Cluster | Topics / articles (slugs) | Config / status |
|---|---------|---------------------------|-----------------|
| A | **Azure & Cloud Architecture** | Azure patterns, Microservices, Event-driven, Serverless, DevOps vs GitHub Actions, Observability, OpenTelemetry, Bicep IaC, Data Engineering (batch/streaming) | ✅ `topicClusterLinking.js` CLUSTERS_8 |
| B | **.NET Backend & APIs** | Clean Architecture, SOLID, REST vs GraphQL, API gateway vs BFF, gRPC vs REST, API security (OWASP), EF optimization, Transaction isolation, Middleware pipeline | ✅ |
| C | **System Architecture / Distributed Systems** | Saga/CQRS, Event sourcing, Resilience patterns, Microservices best practices, Feature flags, Monorepo vs Polyrepo | ✅ |
| D | **AI in Engineering** | AI coding tools 2026, Where AI fails, AI productivity plateau, AI tools impact on code quality, What devs want from AI, Cursor vs Copilot vs Claude IDEs | ✅ |
| E | **Leadership & Delivery** | Agile delivery constraints, Remote leadership, Dev workflows with AI, Testing strategies | ✅ |
| F | **Architecture Patterns (Creational, Structural, Behavioral)** | Design patterns overview, Creational, Structural, Behavioral | ✅ |
| G | **Frontend / Mobile** | Vue enterprise scale, Vue vs React vs Angular, Mobile app architecture (Vue + Capacitor) | ✅ |
| H | **Case Studies** | AirAsia ID90, BAT In-House App, Chubb Insurance, Smart City, Heat Exchanger, UK Property Mgmt (project pages + case study articles) | ✅ |

**Done:** `src/config/topicClusterLinking.js` defines CLUSTERS_8, SERVICE_TO_BLOG_SLUGS, PROJECT_TO_BLOG_SLUGS, getBlogSlugsForService, getBlogSlugsForProject.

---

## STEP 2 — Service → blog links

Every service page should link to the listed blog articles (same styling as existing internal links).

| Service page | Blog slugs to link | Status |
|--------------|--------------------|--------|
| **Azure Cloud Architecture** | azure-cloud-architecture-patterns, … data-engineering-* | ✅ |
| **Microservices Architecture** | microservices-resilience…, api-gateway-vs-bff, … creational/structural/behavioral | ✅ |
| **Full-Stack Development** | vue-enterprise-scale, vue-vs-angular-vs-react, full-stack-net-angular-enterprise | ✅ |
| **Database Design & Optimization** | database-indexing-strategies, … caching-strategies-redis-dotnet | ✅ |
| **Mobile Development** | mobile-app-architecture-vue-capacitor, … | ✅ |
| **Technical Leadership** | technical-leadership-remote-teams, … testing-strategies-unit-integration-e2e | ✅ |
| **Agile Project Management** | agile-delivery-enterprise-constraints, testing-strategies-unit-integration-e2e | ✅ |

**Done:** All 7 service pages use ServiceRelatedReading with current-path; blog slugs from topicClusterLinking.js SERVICE_TO_BLOG_SLUGS.

---

## STEP 3 — Service → project links

Each service page should link to the listed projects (via RelatedProjects).

| Service | Projects to link | Status |
|---------|-----------------|--------|
| **Azure Cloud Architecture** | AirAsia ID90, Heat Exchanger, Chubb Insurance Apps, PJ Smart City | ✅ |
| **Microservices Architecture** | AirAsia ID90, Chubb Insurance, G5 POS, Smart City, UK Property Mgmt | ✅ |
| **Full-Stack Development** | G5 POS, UK Property Mgmt, BAT in-house app, Gamified employee management | ✅ |
| **Database Optimization** | Heat Exchanger, G5 POS, UK Property Mgmt, Chubb Insurance | ✅ |
| **Mobile Development** | Mobile Games, Gamified employee mgmt, Valet Parking | ✅ |
| **Technical Leadership / Agile** | All enterprise-level projects | ✅ |

**Done:** relatedProjects on each service page updated to match STEP 3 spec.

---

## STEP 4 — Project → blog links

Projects link to deep technical content (how they were built).

| Project | Blog slugs to link | Status |
|--------|--------------------|--------|
| **AirAsia ID90** | microservices-resilience…, event-driven…, api-gateway-vs-bff, clean-architecture-dotnet, observability…, ci-cd-azure-devops | ✅ |
| **BAT In-House App** | clean-architecture-dotnet, solid-principles…, domain-driven-design-basics, caching-strategies…, azure-devops-vs-github-actions | ✅ |
| **Chubb Insurance** | owasp-api-security…, securing-apis-dotnet, oauth2…, database-transactions…, resilience patterns | ✅ |
| **Heat Exchanger** | data-engineering-batch-vs-streaming, … open-telemetry…, microservices-resilience… | ✅ |
| **Smart City** | event-driven-architecture-azure, microservices-resilience…, azure-serverless… | ✅ |
| **UK Property Mgmt** | clean-architecture-dotnet, sql-server-performance-tuning, caching-strategies…, rest-vs-graphql-apis | ✅ |
| **G5 POS** | domain-driven-design-basics, event-sourcing-and-cqrs, repository-pattern…, microservices-resilience… | ✅ |
| **Mobile Games / Gamified Employee** | mobile-app-architecture-vue-capacitor, design-patterns-overview… | ✅ |

**Done:** ProjectPageTemplate has "Related reading" using getBlogSlugsForProject; PROJECT_TO_BLOG_SLUGS in topicClusterLinking.js.

---

## STEP 5 — Blog → service links

Use 1–2 links per blog article with natural anchor text to relevant services.

| Example anchor | Link to service(s) |
|----------------|--------------------|
| "Azure microservices best practices" | Azure Cloud Architecture, Microservices Architecture |
| "Clean Architecture in .NET" | Full-Stack Development, Microservices Architecture, Technical Leadership |
| "OWASP API Security Top 10" | Azure Cloud Architecture, Technical Leadership |

**Already done:** ArticlePageTemplate has TopicClusterLinks (blog → services by topic). BLOG_TOPIC_TO_CLUSTER maps topic → cluster → services. **To do:** Ensure every article has a topic that maps to the right cluster; optionally add `relatedServiceSlugs` per article for 1–2 explicit links.

---

## STEP 6 — Blog → blog links (topic clusters)

Every article in a cluster should link to 2–3 others in the same cluster.

| Cluster | Action |
|---------|--------|
| **Azure** | Interlink: azure-cloud-architecture-patterns, azure-microservices-best-practices, azure-serverless-functions-logic-apps, azure-devops-vs-github-actions, event-driven-architecture-azure, azure-bicep-iac-basics, observability-dotnet-azure, open-telemetry-distributed-tracing-dotnet, data-engineering-* | ☐ |
| **.NET Backend** | Interlink: clean architecture, solid, dependency injection, middleware, repository, caching, EF optimization, SQL tuning, API design, gRPC vs REST | ☐ |
| **Architecture & Patterns** | Interlink: CQRS, event sourcing, saga, feature flags, creational/structural/behavioral, monorepo vs polyrepo | ☐ |
| **AI** | Interlink all 8 AI articles | ☐ |
| **Leadership** | Interlink all 4 leadership articles | ☐ |
| **Frontend** | Interlink Vue / React / Angular / mobile articles | ☐ |

**Already done:** BlogArticlePage passes `relatedArticlesList`; getRelatedArticlesBySlugs / getArticlesInSameTopic exist. **To do:** Add BLOG_CLUSTER_MAP (slug → cluster) and ensure related articles are 2–3 from same cluster (via config or getRelatedArticlesByCluster).

---

## STEP 7 — Footer links

Include these in the footer (existing styling):

| Link label | Target | Status |
|------------|--------|--------|
| Azure Cloud Architecture | /services/azure-cloud-architecture | ✅ |
| .NET Backend & APIs | /services/full-stack-development | ✅ |
| Software Architecture | /services/microservices-architecture | ✅ |
| Microservices | /services/microservices-architecture | ✅ |
| DevOps / CI-CD | /services/azure-cloud-architecture | ✅ |
| AI in Engineering | /blog | ✅ |
| Full-Stack Development | /services/full-stack-development | ✅ |
| Mobile Development | /services/mobile-development | ✅ |
| Technical Leadership | /services/technical-leadership | ✅ |
| Case Studies | /#portfolio | ✅ |
| Blog | /blog | ✅ |

**Done:** Footer has "Explore" column with all STEP 7 links (footer-service-link styling).

---

## STEP 8 — Homepage links

Homepage should link to:

| Block | Links | Status |
|-------|-------|--------|
| **Top 5 Services** | Azure Cloud Architecture, Microservices, Full-Stack Development, Database Optimization, Technical Leadership | ✅ First 5 in Services.vue |
| **Top 5 Projects** | AirAsia ID90, BAT In-House App, Chubb Insurance, G5 POS, Smart City | ✅ First 5 in portfolioProjects.js |
| **Top 5 Blog clusters** | Azure, .NET, AI, Architecture Patterns, Leadership | ✅ "Explore by topic" in LatestFromBlog.vue |

**Done:** Homepage shows top 5 services first, top 5 projects first, and 5 blog cluster links in Latest from blog.

---

## Implementation order

1. **Config** — Add `src/config/topicClusterLinking.js` with SERVICE_TO_BLOG_SLUGS, PROJECT_TO_BLOG_SLUGS, 8 clusters (A–H), and optional SERVICE_TO_PROJECTS.
2. **Service → blog** — New component `ServiceRelatedReading.vue` (or extend TopicClusterLinks); use config; add to all 7 service pages.
3. **Service → project** — Verify relatedProjects on each service page against STEP 3 table; fix if needed.
4. **Project → blog** — Add "Related reading" to ProjectPageTemplate (or per project); use PROJECT_TO_BLOG_SLUGS.
5. **Footer** — Add "Topics" / "Explore" column with STEP 7 links.
6. **Homepage** — Reorder services/projects; add blog cluster links in LatestFromBlog.
7. **Blog → blog** — Add cluster-based related articles (config or getRelatedArticlesByCluster).
8. **Blog → service** — Confirm TopicClusterLinks + BLOG_TOPIC_TO_CLUSTER; add per-article relatedServiceSlugs if needed.

---

## Files to create or touch

| File | Action |
|------|--------|
| `docs/TOPIC_CLUSTER_LINKING_IMPLEMENTATION_CHECKLIST.md` | ✅ Created (this file) |
| `src/config/topicClusterLinking.js` | ✅ Created |
| `src/components/services/ServiceRelatedReading.vue` | ✅ Created |
| `src/views/services/*.vue` (7) | ✅ ServiceRelatedReading + relatedProjects per spec |
| `src/components/common/ProjectPageTemplate.vue` | ✅ "Related reading" (project → blog) |
| `src/config/relatedServices.js` or service data | Optional: SERVICE_TO_PROJECTS for STEP 3 |
| `src/components/layout/Footer.vue` | ✅ Explore column added |
| `src/components/home/Services.vue` | ✅ Top 5 services first |
| `src/data/portfolioProjects.js` | ✅ Top 5 projects first |
| `src/components/home/LatestFromBlog.vue` | ✅ "Explore by topic" (5 cluster links) |
| `src/config/blog/index.js` or articles | Optional: BLOG_CLUSTER_MAP, getRelatedArticlesByCluster |

---

## Final result (from spec)

- ✔ Google-safe  
- ✔ AI-overviews optimized  
- ✔ Human-readable  
- ✔ Enterprise-level  
- ✔ No spam  
- ✔ No over-optimization  
- ✔ Best possible structure for a technical portfolio  
