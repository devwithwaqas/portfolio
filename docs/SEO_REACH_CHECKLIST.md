# SEO reach checklist — portfolio (and what to do on the company site next)

This is **only** about **reach through SEO**: getting found in search (Google, Bing, AI) so more people land on the site. Not about conversion or contact flow.

---

## 1. What’s done on this portfolio (SEO reach)

| Area | Done |
|------|------|
| **Question-based SEO** | Keywords and FAQs target “best provider”, “how to choose”, “who provides”, skill+service, local. Long-tail, low competition. |
| **Structured data** | Person, Organization, Service, FAQPage, HowTo, Breadcrumb, JobPosting, WebSite. Per-page where relevant. |
| **FAQs** | Accordion FAQs on home + every service page; client-style Q&A; FAQPage schema; “Show more” where many. No hidden content. |
| **Internal linking** | **Home → services:** Services section links to each service page with descriptive anchor text (e.g. “Full Stack Development”). **Service → service:** “Related services” on each service page (2–3 links). **Project → service:** “Related services” on each project page (2–3 links to relevant services). Single config: `src/config/relatedServices.js`. |
| **Canonical & URLs** | Canonical = Firebase URL. Clean URLs: `/services/full-stack-development`, `/projects/heat-exchanger`. |
| **Sitemap** | Generated from router; includes `/`, all `/services/*`, all `/projects/*`. Sitemap URL in robots.txt. |
| **robots.txt** | Allow `/`, `/projects/`, `/services/`, `/assets/`, sitemap, llms.txt. Disallow /admin/, /api/. |
| **llms.txt** | For AI crawlers; descriptions and keywords. |
| **IndexNow** | For Bing (and others); faster discovery of new/changed URLs. |
| **Meta per page** | Unique title, description, keywords per route (home, each service, each project, 404, privacy). |
| **Core Web Vitals / LCP** | Addressed so pages load and rank well. |

---

## 2. What you should do (owner actions) for reach

- **Google Search Console** — Add property for the live URL. Submit sitemap. Check “URL inspection” for home + a few service/project pages. Fix any indexing errors.
- **Bing Webmaster** — Add site, submit sitemap. Optional but quick.
- **Backlinks** — LinkedIn profile, GitHub bio, any guest post or talk: link to this portfolio. Even a few quality links help.
- **After deploy** — Confirm sitemap is reachable at `https://waqasahmad-portfolio.web.app/sitemap.xml` and that key pages are indexed (GSC “URL inspection”).

---

## 3. When you move to the company website — SEO reach

Do the same **concepts** there, scaled for a company:

| Concept | Portfolio (done) | Company site (do next) |
|--------|-------------------|-------------------------|
| Question-based keywords | Best provider, how to choose, who provides, skill+service, local. | Same idea: “best [industry] company in [region]”, “how to choose [service]”, “who provides [X]”. |
| FAQs | Per service page; accordion; FAQPage schema. | Per service/product page; same. Consider “People also ask” style questions. |
| Internal linking | Home → services, service → service, project → service. | Home → services/products, service → service, case study → service, blog → service. |
| Structured data | Person, Service, FAQPage, HowTo, Breadcrumb, WebSite, JobPosting. | Organization, Service, FAQPage, HowTo, Breadcrumb, WebSite; LocalBusiness if you have a location. |
| Sitemap + robots.txt | One sitemap from routes; robots allows key paths. | Same; include all important sections (services, case studies, blog if you add one). |
| Canonical | One canonical domain. | One canonical domain (no duplicate www vs non-www). |
| Content depth | Service pages + FAQs + project pages. | Service pages + FAQs + case studies; consider a **blog** for long-tail and freshness. |
| Local SEO | Malaysia + “best in [region]” in keywords/schema. | If company has a location: LocalBusiness schema, NAP consistency, local keywords. |

**Company site extras for reach:**

- **Blog or “Insights”** — More indexable URLs and long-tail queries (“how to…”, “why…”). Link each post to relevant service pages.
- **More pages** — Each service/product, each case study, each location (if multi-location) = more entry points.
- **Local pages** — If you target multiple regions, one page per region (e.g. “.NET development in UK”) with unique content, not just city names.

---

## 4. No duplication

- Service ↔ service links: one config (`RELATED_MAP`).
- Project → service links: one config (`PROJECT_TO_SERVICES`).
- Keywords: one place (`seo.js`), deduplicated.
- Sitemap: generated from router; single source.

Use the same idea on the company site: one config per link type, one sitemap, one canonical domain.
