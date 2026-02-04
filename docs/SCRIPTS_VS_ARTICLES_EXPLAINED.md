# Scripts vs blog/articles — what’s what (no duplication)

## Short answer

- **The site uses only:** `src/config/blog/articles/*.js` (61 files). That’s the **only** source of truth for blog content.
- **Scripts in `scripts/`** are **build/tooling** (sitemap, llms.txt, audits, keyword updates, etc.). Legacy updaters that targeted the old single `blogArticles.js` file have been **removed**.

There is **no duplication** of live article data. The “extra” JS files in `scripts/` are not copies of the articles; they’re either tools or leftover one-off updaters.

---

## 1. Where the blog content actually lives (source of truth)

| Location | Role |
|----------|------|
| **`src/config/blog/articles/*.js`** | **61 files, one per article.** Each exports one object: `slug`, `title`, `excerpt`, `date`, `topic`, `keywords`, `content`, `faqs`, etc. The app loads these via `blog/index.js` (e.g. `getArticleBySlug`, `BLOG_ARTICLES`). **This is the only place the site reads article content.** |
| **`src/config/blogArticles.js`** | Thin re-export only: `export { BLOG_ARTICLES, getArticleBySlug, ... } from './blog/index.js'`. It does **not** hold article bodies. Kept so existing imports still work. |

So: **one place** for article data = **no duplication** of content.

---

## 2. What the scripts in `scripts/` are

### 2.1 Scripts that are **current** (use `blog/articles/` and are useful)

These read or write **`src/config/blog/articles/`** (the 61 files). They are part of the current workflow:

- **generate-sitemap.js** — builds sitemap from router + `blog/articles/*.js` slugs  
- **generate-llms-blog-articles.js** — builds llms.txt from the 61 articles  
- **audit-blog-authority-sections.js** — checks WMGM / Trade-Offs in article files  
- **audit-blog-seo-compliance.js** — checks slug, title, excerpt, topic, keywords for SEO  
- **update-blog-keywords-to-plan.js** — updates `keywords` in the per-article files  
- **add-blog-article-keywords.js** — adds keywords to article files  
- **add-authority-sections-to-articles.js** — adds authority sections to article files  
- **add-authority-ai-articles.js** — adds authority to selected AI articles  
- **submit-bing-indexnow.js** — gets slugs from `blog/articles/` for IndexNow  
- **split-blog-articles.js** — (one-off) split a single file into the 61 per-article files  
- **count-article-words.js**, **count-blog-words.js**, **wordcount-blog-articles.js** — word counts from article files  
- **check-pages-load.js**, **prerender-routes.js** — use `blog/articles/` for routes/slugs  
- **list-authority-remaining.js** — lists articles missing authority from article files  

These do **not** duplicate articles; they operate on the same 61 files the app uses.

### 2.2 Legacy scripts (removed)

Scripts that targeted the **old single file** (`blogArticles.js` containing all articles) have been **removed** to avoid redundancy. The only article updater kept is **update-blog-keywords-to-plan.js** (updates `blog/articles/*.js`).

| Type | What they do | Why they’re obsolete |
|------|----------------|-----------------------|
| **update-&lt;article&gt;.js** (e.g. `update-behavioral.js`, `update-solid-principles.js`) | Read a `*-content.js` file and **write into `blogArticles.js`** (find/replace one article in that single file). | `blogArticles.js` no longer contains article content. Running them would either fail (content not there) or overwrite the re-export and break the app. The real content is already in `blog/articles/<slug>.js`. |
| **&lt;article&gt;-content.js** (e.g. `behavioral-content.js`, `solid-principles-content.js`) | Export a function that returns the raw markdown/content for one article. Used **only** by the corresponding `update-&lt;article&gt;.js`. | The content they hold was used to populate the old single file. That content now lives in the 61 article files. So these are **redundant** as source of truth; they’re just leftover input for scripts that no longer match the current architecture. |

So:

- **Not duplication:** The app does **not** read from `*-content.js` or from any “second copy” of articles. It only reads from `blog/articles/*.js`.
- **Redundancy:** The **legacy** `update-*.js` and `*-content.js` are redundant with the **current** workflow: the authoritative content is in `blog/articles/*.js`; those scripts are old tooling for a deprecated single-file setup.

---

## 3. Project-related scripts

There are no “project content” files in `src/config/` in the same way as blog articles. Project data lives in the **router** (e.g. `PROJECT_DATA_MAP`) and in **project page components**. Scripts like **expand-case-studies.js**, **expand-database-indexing.js** likely update content that ends up in the app (e.g. in views or config). They’re **one-off or occasional tools**, not a second copy of the live project data. So again: **different purpose**, not duplication of what the site serves.

---

## 4. Summary

| Question | Answer |
|----------|--------|
| Are `scripts/*.js` and `blog/articles/*.js` duplicating the same content? | **No.** The site uses only `blog/articles/*.js`. Scripts either use those same files (current) or targeted the old single file (legacy). |
| Why so many files in `scripts/`? | Mix of **current** build/audit/update scripts (sitemap, llms.txt, SEO/authority audits, keyword updates) and **legacy** `update-*.js` / `*-content.js` from the previous one-file-per-blog setup. |
| Were the legacy ones removed? | Yes. **Legacy** `update-&lt;article&gt;.js` and `*-content.js` have been deleted. No content the app uses was removed; only obsolete tooling. |

**Bottom line:** One source of truth for blog articles = **`src/config/blog/articles/*.js`** (61 files). Redundant legacy scripts have been removed.
