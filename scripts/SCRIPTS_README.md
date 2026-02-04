# Scripts folder — quick reference

**Full explanation:** See **docs/SCRIPTS_VS_ARTICLES_EXPLAINED.md** for what’s duplication vs tooling and which scripts are current vs legacy.

## Where blog content lives (source of truth)

- **`src/config/blog/articles/*.js`** — 61 files. **Only** place the app reads article content. No duplication.

## Current scripts (use `blog/articles/` or build/deploy)

- **generate-sitemap.js**, **generate-llms-blog-articles.js** — build
- **audit-blog-authority-sections.js**, **audit-blog-seo-compliance.js** — audits
- **update-blog-keywords-to-plan.js**, **add-blog-article-keywords.js**, **add-authority-sections-to-articles.js**, **add-authority-ai-articles.js** — update article files
- **submit-bing-indexnow.js**, **prerender-routes.js**, **check-pages-load.js** — use article slugs
- **split-blog-articles.js**, **count-*-words.js**, **wordcount-blog-articles.js**, **list-authority-remaining.js** — utilities

## Legacy scripts (removed)

Legacy **update-&lt;article&gt;.js** and **&lt;article&gt;-content.js** that targeted the old single `blogArticles.js` file have been removed. The only article updater kept is **update-blog-keywords-to-plan.js** (works with `blog/articles/*.js`).
