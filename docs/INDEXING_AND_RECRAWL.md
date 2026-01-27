# Indexing & Re-crawl Guide

**Quick reference for "Crawled - currently not indexed" and requesting indexing in Google Search Console.**

---

## What "Crawled - currently not indexed" means

- **Crawled**: Googlebot visited the URL and fetched the page.
- **Not indexed**: Google chose **not** to add it to the search index, so it won’t appear in Search results.

This can happen on SPAs, new/low-authority sites, or when Google decides the page doesn’t meet its indexing bar (e.g. thin or low perceived value). It’s **not** the same as "blocked" or "error."

---

## Do you need to request re-indexing after SEO changes?

- **No** – Our SEO changes (meta, keywords, schema, llms.txt) are **already on the page**. When Google recrawls, it will see them. There’s no separate "re-index step" for those to take effect.
- **Yes, it still helps** – Requesting indexing asks Google to **recrawl** the URL and **reconsider** adding it. That’s useful especially when the URL is "Crawled - currently not indexed."

So: **you don’t *have* to** request indexing just because we added keywords, but **you should** request it to encourage a recrawl and reconsideration, especially for the homepage.

---

## How to request indexing (Google Search Console)

1. Open [Google Search Console](https://search.google.com/search-console).
2. Select the **Firebase property** (e.g. `https://waqasahmad-portfolio.web.app`).
3. Use **URL Inspection** (search box at top): paste `https://waqasahmad-portfolio.web.app/`.
4. Click **Test live URL** (optional – checks current page).
5. Click **Request indexing**.

Google will queue the URL for recrawl. It may take days or longer. You can’t force immediate indexing; "Request indexing" only requests a recrawl.

---

## After submitting sitemap / requesting indexing

- **Sitemap**: Submit `https://waqasahmad-portfolio.web.app/sitemap.xml` in GSC (**Sitemaps**) if not already done. Helps discovery; doesn’t guarantee indexing.
- **Request indexing**: Use for key URLs (home, important project/service pages) after big updates or when they’re "Crawled - currently not indexed."
- **Validation**: If you ran "Validate fix" for an issue (e.g. Page indexing), Google will recrawl over time. "Request indexing" can complement that but doesn’t replace validation.

---

## Quick checklist (your site)

| Check | Status |
|-------|--------|
| `robots` meta | `index, follow` in `index.html` – OK |
| `noindex` | Not set on homepage – OK |
| Canonical | Points to `https://waqasahmad-portfolio.web.app/` – OK |
| `robots.txt` | Allows `/`, `llms.txt`; Sitemap listed – OK |
| Sitemap | `sitemap.xml` in `robots.txt` + HTML link – OK |

Nothing here is blocking indexing. "Crawled - currently not indexed" is a **quality/priority** decision by Google, not a config error.

---

## What can help over time

- **Request indexing** for the homepage and important URLs after SEO or content changes.
- **Keep submitting** the sitemap; ensure it’s linked in `robots.txt` and optionally in HTML.
- **Content & signals**: Strong meta, schema, unique content, and internal links support indexing. The SEO work we did (keywords, summaries, attribution, etc.) improves those signals.
- **Patience**: Recrawls and indexing can take days or weeks. Re-request indexing occasionally if the URL stays "Crawled - currently not indexed."

---

## Summary

- **Request indexing** for `https://waqasahmad-portfolio.web.app/` (and other key URLs) in GSC. Use **URL Inspection** → **Request indexing**.
- SEO changes are already live; requesting indexing asks Google to **recrawl and reconsider**, which is what you want when a page is "Crawled - currently not indexed."
