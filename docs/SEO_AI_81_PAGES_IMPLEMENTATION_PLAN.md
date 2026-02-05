# SEO + AI: 81-Page Implementation Plan (Detail)

**Big picture:** You are not missing fundamentals. You are over-engineering some legacy SEO (keyword lists, repetition) and early (not wrong) on AI SEO. The fix: **stop mixing legacy SEO habits into AI SEO** — tune in days, not months.

**Three things already done well:** (1) Authority by depth, (2) Real experience signals, (3) Early AI-aware structuring.  
**One issue:** Legacy keyword patterns in llms.txt and meta that hurt AI authority and add no Google benefit.

---

# Implementation status

| Area | Status |
|------|--------|
| **llms.txt** | ✅ Replaced with **static site-summary format** — see **`docs/LLMS_TXT_GUIDE.md`** for why we moved from per-article blocks to identity + flagship URLs + breadth declaration |
| **Meta keywords** (M1–M6) | ✅ Done — 5–8 topic phrases site-wide in `seo.js` |
| **robots.txt** (R1) | ✅ Done — Bingbot block removed; llms comment softened |
| **81-page consistency** (A1) | ✅ Applied site-wide |

See `docs/SEO_81_PAGES_FULL_PLAN.md` for the full task table.

**Post-revamp (Feb 2026):** Structured data (Option B, no schema spam), sitemap refactor, robots.txt simplified, seo.js clean engine, service template (no sticky CTA; Full Stack page simplified). **Full list:** `docs/SEO_REVAMP_CHANGELOG.md`.

---

# 1. robots.txt — Verdict & plan

## What’s right
- `User-agent: *` `Allow: /` — correct
- Sitemap declared — correct
- Assets allowed — good for rendering
- `/llms.txt` allowed + comment — good
- No accidental blocking — keep

## Optional changes (low priority)
| Task | Action | File |
|------|--------|------|
| 1.1 | Remove redundant `User-agent: Bingbot` block (Bingbot inherits `*`) | `scripts/write-robots-firebase.js` |
| 1.2 | Soften llms.txt comment: e.g. “Some AI agents may use llms.txt; not an official standard.” | Same |

**Verdict:** Keep as is; optional cleanup only. No ranking or AI penalty.

---

# 2. llms.txt — Current format (static site summary)

## What llms.txt is
- **Not** an official standard; **not** used by Google Search.
- **Experimental** convention for some AI crawlers, RAG pipelines, citation engines.

## Why we use the current format (explicit rationale)

We **replaced** the previous machine-generated, per-article block format with a **single, hand-authored site summary** in `public/llms.txt` for the following reasons:

1. **Identity and authority first** — AI systems benefit from a clear statement of who the author is, what the site is for, and which domains the site is authoritative on, in one place (Site & Author Identity, Core Areas of Expertise), rather than 61+ repetitive blocks.
2. **High-signal entry points** — The new format provides **Representative & Flagship Content** (curated URLs by theme: Cloud, .NET/APIs, AI in engineering) so citation and discovery start from the strongest pages instead of a long flat list.
3. **Breadth without noise** — **Complete Blog Coverage** declares topic clusters (e.g. Architecture & Design Patterns, Security & Reliability) without maintaining per-article blocks or keyword-style repetition.
4. **Single source of truth** — The file is **static**; the build only **copies** it to `dist/`. We **removed** `generate-llms-blog-articles.js` from the build so this summary is never overwritten by a script.

Full rationale, structure, and when to update: **`docs/LLMS_TXT_GUIDE.md`**.

## Implementation (current)

| What | Where |
|------|--------|
| Content | `public/llms.txt` — hand-maintained |
| Build | `scripts/copy-llms-txt.js` copies `public/llms.txt` to `dist/llms.txt` |
| Legacy script (not in build) | `scripts/generate-llms-blog-articles.js` — kept for reference only |

---

# 3. Meta keywords — Site-wide policy

## Facts
- **Google:** Ignored. No benefit. Can signal spam if extreme.
- **Bing:** Mostly ignored.
- **LLMs:** Prefer zero or minimal; hate repetition.

## Rule
Use **topic clusters** (5–8 phrases), not long keyword lists.

**Good:** Image background removal, AI photo enhancement, portrait retouching, object removal, batch processing.  
**Bad:** background remove, remove background, background removal tool, ai background removal free online hd fast best.

## Implementation tasks for meta keywords

| ID | Task | File(s) | Notes |
|----|------|--------|--------|
| M1 | **Homepage:** Ensure meta keywords are 5–8 topic-cluster phrases only; no repetition, no “best/top/elite,” no company names, no URLs | `src/utils/seo.js` (getHomePageSEO), or where home meta is set | Align with “acceptable” example in SEO_MASTER_CHECKLIST. |
| M2 | **Services (7):** Same; ensure service meta keywords are topic-cluster only (e.g. from SERVICE_DATA_MAP or a short list), deduped, max ~8 | `src/utils/seo.js` (getServicePageSEO) | Already has dedupe; cap and trim. |
| M3 | **Projects (11):** Same; technology + role topics only, no long tail variants | `src/utils/seo.js` (getProjectPageSEO) | Cap project keywords; avoid merging full profile keyword blast. |
| M4 | **Blog (61):** Stop passing full `article.keywords` (100+ items) to meta. Use 5–8 **topic** phrases per article (from new `topics` field or derived from title/primary topic) | `src/utils/seo.js` (getBlogArticleSEO) | Critical: remove or replace articleKeywords with topic cluster only. |
| M5 | **Blog index:** Already short list; verify 5–8 phrases, no stuffing | `src/utils/seo.js` | |
| M6 | **Privacy:** No meta keywords or minimal | Check Privacy view / router | |

---

# 4. Structured data vs AI SEO (clarification)

- **Google:** Structured data = **eligibility** for rich results, **not** ranking.
- **LLMs:** Structured data helps **identity**; llms.txt helps **context**; content helps **authority**. They stack.
- **No change** required to JSON-LD for this plan; keep Person, WebSite, Service, BlogPosting, BreadcrumbList, etc. as is. Focus on content and llms/meta.

---

# 5. Plan for all 81 pages (by page type)

Apply the same principles to every page; below is the **checklist per type** and then the **ordered list of 81 URLs** with type and focus.

## 5.1 Page-type checklist (apply to each page)

### Homepage (1 page)
- [ ] Meta: title 55–60 chars, formula `Primary Role – Key Tech | Waqas Ahmad`; description 140–160 chars; **keywords 5–8 topic phrases only** (or none).
- [ ] One H1; no superiority language; evidence-based.
- [ ] Structured data: Person + WebSite + BreadcrumbList (+ Organization).
- [ ] Internal links: About, Services, Portfolio, Contact; varied anchors.
- [ ] llms.txt: N/A (home is not in blog section).
- [ ] Entity + summary; not sales-heavy.

### Projects (11 pages)
- [ ] Meta: title/description per project; **keywords 5–8** (tech + domain), no long tail.
- [ ] One H1; no stuffing; context → contribution → impact → tech stack.
- [ ] Structured data: SoftwareApplication/CreativeWork, author → Person.
- [ ] Internal links back to Home, Services, Portfolio, Contact; varied anchors.
- [ ] llms.txt: N/A.

### Services (7 pages)
- [ ] Meta: title/description per service; **keywords 5–8** topic cluster.
- [ ] One H1; problem → solution → proof → CTA.
- [ ] Structured data: Service, provider → Person.
- [ ] Internal links; varied anchors.
- [ ] llms.txt: N/A.

### Blog index (1 page)
- [ ] Meta: **keywords 5–8** (e.g. technical blog, Azure, .NET, microservices, Waqas Ahmad).
- [ ] One H1; clear intent.
- [ ] llms.txt: **Blog block** uses Topics + Use cases + Audience (no long Keywords line).

### Blog articles (61 pages)
- [ ] Meta: **keywords 5–8** from topic cluster only (not full article.keywords array).
- [ ] One H1; opinionated, experience-based.
- [ ] **llms.txt:** Each article block = **Topics** (5–8) + **Use cases** + **Audience** (no Keywords dump).
- [ ] Content: answerability (how/why/when/tradeoffs); attribution (author, date).
- [ ] Structured data: BlogPosting (unchanged).

### Privacy (1 page)
- [ ] Meta: minimal or no keywords.
- [ ] One H1; internal links as needed.

---

# 6. Ordered list: all 81 URLs with type and focus

| # | Type | URL | Focus |
|---|------|-----|--------|
| 1 | Home | `/` | Meta keywords 5–8; H1; schema; internal links |
| 2–11 | Project | `/projects/heat-exchanger` … `/projects/chubb-insurance-applications` | Meta 5–8; H1; schema; links |
| 12–18 | Service | `/services/full-stack-development` … `/services/mobile-development` | Meta 5–8; H1; schema; links |
| 19 | Other | `/privacy` | Minimal meta; H1; links |
| 20 | Blog index | `/blog` | Meta 5–8; llms.txt Blog block = Topics + Use cases + Audience |
| 21–81 | Blog | `/blog/agile-delivery-enterprise-constraints` … `/blog/why-ai-productivity-gains-plateau` | Meta 5–8 (topic cluster); llms.txt per-article = Topics + Use cases + Audience; no Keywords dump |

---

# 7. Implementation order (recommended)

1. **llms.txt generator (scripts)**  
   - Change `generate-llms-blog-articles.js`: output Topics / Use cases / Audience; stop outputting Keywords from article.keywords; fallback when topics/useCases/audience missing.  
   - Regenerate `public/llms.txt` (and dist on build).

2. **Meta keywords (site-wide)**  
   - In `seo.js`: cap and trim homepage, service, project, blog-index keywords to 5–8 topic phrases.  
   - **Blog articles:** In `getBlogArticleSEO()`, stop using full `article.keywords`; use either new `article.topics` (5–8) or derive from title/primary topic.

3. **Article config (optional, over time)**  
   - Add `topics`, `useCases`, `audience` to blog article .js files (start with 5–10 articles); generator already supports fallback.

4. **robots.txt (optional)**  
   - Remove Bingbot block; soften llms.txt comment.

5. **Per-page audit (81 URLs)**  
   - Use `docs/SEO_MASTER_CHECKLIST_81_URLS.md`: run Part 2 checks (meta, H1, links, schema) for each URL; fix any remaining superiority language, hidden content, or keyword stuffing.

---

# 8. Summary table: what changes where

| Area | What changes | Files |
|------|----------------|--------|
| robots.txt | Optional: remove Bingbot; soften llms comment | `scripts/write-robots-firebase.js` |
| llms.txt content | Keywords → Topics + Use cases + Audience | `scripts/generate-llms-blog-articles.js` |
| llms.txt source (optional) | Add topics, useCases, audience per article | `src/config/blog/articles/*.js` |
| Meta keywords (home) | 5–8 topic phrases only | `src/utils/seo.js` |
| Meta keywords (services) | 5–8 topic phrases; cap/dedupe | `src/utils/seo.js` |
| Meta keywords (projects) | 5–8 topic phrases; no full profile blast | `src/utils/seo.js` |
| Meta keywords (blog index) | 5–8 topic phrases | `src/utils/seo.js` |
| Meta keywords (blog articles) | 5–8 from topic cluster; **do not** use full article.keywords | `src/utils/seo.js` |
| 81-page audit | H1, meta, links, schema, no spam | All views/templates; use checklist |

---

# 9. Safe keyword rule (reminder)

- **Safe:** Keyword can be pointed to a button, feature, or section → not spam.
- **Spam risk:** Keyword exists only to rank, no corresponding feature/content → might be spam.

Apply this when trimming meta and llms.txt: keep only what maps to real sections/CTAs/topics.

---

This plan considers: robots.txt, llms.txt (structure + generator + optional article fields), meta keywords site-wide and for all 81 URLs, structured data vs AI, and a clear implementation order.

**Companion docs:**
- **`docs/SEO_81_PAGES_FULL_PLAN.md`** — Full guidance (Part A), every consideration mapped to all 81 pages (Part C), per-page checklist (Part D, G), and execution order (Part E). Use for “each and every single thing” across all pages.
- **`docs/SEO_MASTER_CHECKLIST_81_URLS.md`** — Detailed checklist (M1–M12, C1–C10, L1–L6, schema by type) and Cursor prompt for applying fixes.
