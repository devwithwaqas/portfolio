# SEO: Hidden Content Policy

**Strictly for SEO / future reference. Do not delete this section.**

---

## Policy: No Hidden or Invisible SEO-Only Content

We **do not** use hidden or invisible divs, Vue components, or any DOM elements that contain **text purely for SEO** (e.g. keyword stuffing) and are not visible to users.

### Rationale

- **Google**: Hiding text (e.g. `display:none`, `visibility:hidden`, white-on-white, `font-size:0`) to manipulate rankings is against [Google’s spam policies](https://developers.google.com/search/docs/essentials/spam-policies). It can be treated as cloaking or deceptive behavior and may lead to manual actions or algorithmic demotion.
- **Best practice**: Rely on **visible content**, **meta tags** (title, description), **structured data** (JSON-LD), and **llms.txt** for AI. No hidden SEO-only blocks.

### What We Use Instead

| Mechanism | Purpose |
|-----------|---------|
| **Meta tags** | `title`, `description`, `keywords` (per page via `setPageSEO`). Help Google snippets and relevance. |
| **Structured data** | Person, Organization, ProfessionalService, Article, etc. in `structuredData.js`. Help rich results and entity understanding. |
| **llms.txt** | Titles, descriptions, summaries, attribution, keywords for AI engines (SGE, Perplexity, etc.). |
| **Visible page content** | Hero, about, resume, project/service copy. Primary signal for both users and crawlers. |

### If You Consider Adding a “Hidden SEO” Component

- **Do not add** a Vue component or div that is hidden (e.g. `sr-only`, `aria-hidden`, `display:none`) and used **only** for SEO/keyword text.
- If requirements change, **re-check Google’s current guidance** on hidden content and cloaking before introducing any such pattern.
- This policy exists so that future changes do not inadvertently add risky SEO-only hidden content. **Keep this document and do not remove it** when cleaning up other docs.

---

## Summary

No hidden SEO-only text. Use meta, schema, llms.txt, and visible content only.
