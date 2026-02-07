# llms.txt: Purpose, Format, and Why We Use This Version

> **Single source of truth:** See **docs/SEO_SINGLE_SOURCE_OF_TRUTH.md** for current implementation (llms.txt build, content rules, and all other SEO: keywords, structured data, meta, sitemap, IndexNow).

**Site:** https://waqasahmad-portfolio.web.app  
**File:** `public/llms.txt` (copied to `dist/llms.txt` on build)

---

## What is llms.txt?

llms.txt is an **experimental convention** (not an official standard) for providing a machine-readable summary of a site to AI systems and crawlers that may use it for context, citation, or summarization. It is **not** used by Google for ranking. It is **not** a replacement for sitemap.xml or robots.txt.

---

## Why We Use This Exact Format (Explicit Rationale)

We **rewrote** llms.txt from a **machine-generated, per-URL block format** to a **single, hand-authored site summary** for the following reasons:

1. **Identity and authority first**  
   AI systems benefit more from a clear statement of *who* the author is, *what* the site is for, and *which domains* the site is authoritative on, than from dozens of repetitive per-article blocks. The new format leads with **Site & Author Identity** and **Core Areas of Expertise**, so any consumer gets a consistent, high-signal picture of the site in one place.

2. **High-signal entry points, not exhaustive dumps**  
   The previous format listed every blog article with Topics/Use cases/Audience. That duplicated information already in the sitemap and on each page, and diluted the “where should I start?” signal. The new format provides **Representative & Flagship Content**—curated URLs by theme (Cloud, .NET/APIs, AI in engineering)—so citation and discovery start from the strongest, most representative pages instead of a long flat list.

3. **Breadth without noise**  
   We still communicate full blog coverage via **Complete Blog Coverage (Breadth Declaration)**: topic clusters (e.g. Architecture & Design Patterns, Cloud/DevOps, Security & Reliability) with short bullet lists. This declares breadth and topic areas without maintaining 61+ per-article blocks or keyword-style repetition.

4. **Single source of truth, no build-time overwrite**  
   The previous setup used `scripts/generate-llms-blog-articles.js` to inject a large blog section into llms.txt at build time, which made the file hard to hand-edit and easy to overwrite. The new llms.txt is **static** in `public/llms.txt`. The build only **copies** it to `dist/` (`copy-llms-txt.js`). We **removed** `generate-llms-blog-articles.js` from the build chain so that this authoritative summary is never overwritten by an automated script.

5. **Standards-compliant, no speculative directives**  
   The file contains no crawl instructions, no keywords for ranking, and no experimental AI directives. It is a **content summary** (identity, expertise, representative URLs, projects, services, topic breadth, discovery notes). Crawling is controlled by robots.txt and sitemap.xml only.

6. **Attribution and intent**  
   The new format states **Primary Intent** and **Audience** explicitly and ends with **Attribution** and **Discovery & Crawling Notes**, so both humans and systems understand how to use and cite the site.

---

## What Changed in the Build

- **Before:** Build ran `generate-llms-blog-articles.js` (which modified `public/llms.txt` by injecting/replacing a blog section) then `copy-llms-txt.js`.
- **After:** Build runs only `copy-llms-txt.js`, which copies `public/llms.txt` to `dist/llms.txt`. The content of `public/llms.txt` is the **single source of truth** and is maintained by hand when you add new flagship URLs or topic clusters.

The script `scripts/generate-llms-blog-articles.js` remains in the repo for reference but is **no longer invoked** by any build script.

---

## When to Update llms.txt

- Add or change **Representative & Flagship Content** when you publish new high-signal articles that should be entry points for citation.
- Extend **Complete Blog Coverage** topic clusters when you add new thematic areas.
- Update **Enterprise Projects & Case Studies** or **Services & Professional Focus** when you add/remove project or service pages.
- Optionally refresh **Summary** or **Core Areas of Expertise** if your positioning changes.

Do **not** reintroduce per-article blocks or build-time generation unless you explicitly decide to revert to that model and document why.

---

## References

- **File:** `public/llms.txt`
- **Copy script:** `scripts/copy-llms-txt.js`
- **Legacy generator (not in build):** `scripts/generate-llms-blog-articles.js`
- **SEO context:** See **`docs/SEO_SINGLE_SOURCE_OF_TRUTH.md`** §5 (llms.txt) for build, content, and when to update.
