# Project & Service Pages — Loading Analysis

**Date:** 2026-02-03  
**Purpose:** Check whether refactors removed lazy loading and why project/service pages can feel like "all load in one go."

---

## Summary

- **Route-level lazy loading is still in place.** Each project and service page is loaded via dynamic `import()` (code-split). Nothing was removed there.
- **Image-level lazy loading is still in place.** Project and service components use `LazyImage`, `loading="lazy"`, and `:lazy="true"` where appropriate.
- **Section-level lazy loading was never used on project/service pages.** The entire page content mounts and renders in one go when you navigate, which is why it can feel like "all the load goes to the page in one go."
- **Heavy shared chunks** (e.g. `data-config` with blogArticles) load with the first project page visit and can add to the "one big load" feeling.

---

## 1. Route-level (code splitting) — ✅ Intact

**Location:** `src/router/index.js`

- Every project and service route uses:
  ```js
  component: () => loadComponent(() => import('../views/projects/...'))
  component: () => loadComponent(() => import('../views/services/...'))
  ```
- So each page is a **separate JS chunk** loaded on demand when you navigate. This was not removed.

**Why it can still feel heavy:**

- The **route chunk** for a single project page includes that page’s entire component tree (e.g. `HeatExchangerPage` → `ProjectPageTemplate`, `ProjectHeroCard`, `ProjectGallery`, `DiagramViewer`, `ArchitectureOverview`, `EngineeringChallenges`, `MetricsFramework`, etc.).
- Vite does split out some heavy pieces into `manualChunks` (e.g. `DiagramViewer` → `components-diagrams`, `ProjectGallery` → `components-gallery`, `PerformanceMetricsSection` → `components-charts`), but the main page chunk still pulls in many components.
- So the **first** time you open a project/service page, the browser fetches that route’s chunk(s) and then renders the whole page in one pass.

---

## 2. Image lazy loading — ✅ Intact

**Project pages:** Use `LazyImage` in:

- `ProjectHeroCard`, `ProjectGallery`, `TechnologyStack`, `ArchitectureOverview`, `EngineeringChallenges`, `MetricsFramework`, `DiagramViewer`, `ProjectInfo`, etc.

**Service pages:** Use:

- `LazyImage` and/or `loading="lazy"` in `ServiceHeroSection`, `ServiceOverview`, `ServiceProcess`, `ServiceCaseStudies`, `ServiceCTA`, `RelatedProjects`, etc.

So images are still lazy-loaded; they are not the cause of "everything loads at once" from a **network** perspective. The "one go" feeling is from **JS + initial render**, not from all images loading upfront.

---

## 3. Section-level lazy loading — ❌ Not used on project/service pages

**Home:** Comment in `Home.vue` says section components load immediately (no lazy) to avoid scroll/anchor issues. So Home also renders sections in one go by design.

**Blog index:** Uses `LazyWrapper` for cards with `index >= 6`, so below-the-fold cards are deferred.

**Project and service pages:** Do **not** use `LazyRender` or `LazyWrapper` for any sections. So:

- When the route chunk loads, the full component tree mounts.
- The entire DOM for that page is built in one pass.
- There is no “progressive” reveal (e.g. hero first, then rest when in view).

That’s why it feels like “all the load goes to the page in one go”: the **entire page** is rendered at once after the chunk(s) load.

---

## 4. Shared chunks (data-config)

**Vite config** (`vite.config.js`):

```js
if (id.includes('src/data/') || id.includes('src/config/')) {
  return 'data-config'
}
```

So all of `src/config/` (including `blogArticles.js`, `topicClusterLinking.js`, `relatedServices.js`) goes into a single **data-config** chunk.

**ProjectPageTemplate** imports:

- `getArticleBySlug` from `blogArticles.js`
- `getBlogSlugsForProject` from `topicClusterLinking.js`
- `getRelatedServicesForProject` from `relatedServices.js`

So when you open **any project page**, the route chunk depends on **data-config**, which includes the full blog articles list. The first time you hit a project page (or any page that pulls in config), the browser will load that **data-config** chunk as well. That can make the first project-page load feel heavier.

Service pages don’t use `ProjectPageTemplate`; they use `ServicePageTemplate` and their own components, but some of those may still pull in config (e.g. `TopicClusterLinks`, `ServiceRelatedReading`). So service pages can also pull in shared config chunks.

---

## 5. Conclusion

| Layer              | Status | Notes |
|--------------------|--------|--------|
| Route code-split   | ✅     | Each project/service page is a dynamic import; not removed. |
| Image lazy loading | ✅     | LazyImage / `loading="lazy"` used in project & service components. |
| Section lazy load | ❌     | No LazyRender/LazyWrapper on project or service pages; full page renders at once. |
| data-config chunk | Shared | First project (or config-using) visit loads blogArticles + other config. |

So **nothing that was there was removed.** The “all at once” feeling comes from:

1. **No section-level deferral** — the whole page mounts and paints in one go.
2. **Route chunk size** — one chunk per page that includes most of that page’s component tree.
3. **data-config** loading with the first visit to a page that needs config (e.g. project pages).

---

## 6. Section lazy loading: scroll behavior (Angular-style) and SEO

### Why scroll issues happen with “on scroll” lazy loading

In Angular you had placeholders that reserved **full width and height** for each lazy block. So when content loaded in, the layout didn’t grow or shift — scroll position and `href="#section"` anchors stayed correct.

Our `LazyWrapper` uses a **small default placeholder** (`min-height: 200px`). When the real section is much taller (e.g. 800px), the page “grows” as sections load:

- Document height changes → scroll position and hash targets shift.
- Clicking a link to `#section-id` can land in the wrong place because the target section isn’t rendered yet, or the layout jumps when it appears.

So the difference isn’t Vue vs Angular per se; it’s **whether the placeholder reserves the same space as the final content**.

### Can it work the same way as Angular? Yes.

To get Angular-style behavior:

1. **Reserve the right height** — Use `LazyWrapper` with a `minHeight` (or `placeholderStyle`) that matches the **approximate height** of the section (e.g. `minHeight="800px"` for a long block). Then the placeholder takes the same vertical space the content will; when the slot renders, there’s no layout shift and scroll / hash links stay correct.
2. **Full width** — Already there: `.lazy-wrapper` and `.lazy-placeholder` are `width: 100%`.

So: **yes, it can work the same way** if we give each lazy section a placeholder that’s full width and has a height close to the real section (per-section `minHeight` or a shared “large” value for unknown heights). The tradeoff: we either set heights per section (more accurate, no jump) or use one large minHeight (simpler, may leave a bit of empty space).

### SEO: does lazy-rendering internal components cause issues?

**Yes, it can**, depending on *when* content is rendered:

- **Scroll-triggered (IntersectionObserver)**  
  Content is only added to the DOM when it enters the viewport. Googlebot runs JS and often scrolls, but it doesn’t guarantee full-page scroll. So **below-the-fold lazy-rendered sections may never be seen** by the crawler and might not get indexed. For project and service pages (SEO-critical), that’s a real risk.

- **Time-based / delayed render (e.g. after mount)**  
  Content is rendered after a short delay (e.g. `requestIdleCallback` or `setTimeout` after mount), **without** requiring the user to scroll. Then it’s in the DOM soon after load, and crawlers that wait for network idle will typically see it. So we get some deferred work (lighter first paint) without relying on scroll — **better for SEO** than pure scroll-triggered lazy loading.

**Recommendation for project and service pages:**

- **Avoid scroll-only section lazy loading** for main, indexable content. If we use IntersectionObserver to render sections only when in view, we risk Google not scrolling enough and missing content.
- **If we want section-level deferral and good SEO:** use “delayed render” (e.g. render below-the-fold sections after a short delay or on `requestIdleCallback`) so content appears in the DOM without requiring scroll. Crawlers then see it; we still spread out initial work.
- **If we use Angular-style placeholders** (reserved height) with scroll-triggered load, scroll and anchors can behave correctly for users, but the **SEO risk remains** for any content that only renders when scrolled into view.

So: section-level lazy loading *can* work like Angular (full-width, reserved-height placeholders → no scroll issues), but for Google we should either **not** rely on scroll-to-reveal for important content, or use delayed render instead of (or in addition to) scroll-based loading.

---

## 7. Optional improvements (if you want progressive loading)

- **Angular-style placeholders** — Use `LazyWrapper` with section-specific `minHeight` (or a conservative large value) so placeholders reserve full width and height; scroll and `#anchor` links won’t jump when content loads.
- **SEO-safe deferral** — For project/service pages, prefer **delayed render** (content in DOM after a short delay) over **scroll-triggered** render so crawlers don’t miss below-the-fold content.
- **Lazy-load blogArticles for project “Related reading”** — e.g. dynamic `import('../../config/blogArticles.js')` when that block is needed, so the full blog list isn’t in the critical path of every project page.

These are optional; the current setup (no section lazy loading on project/service pages) avoids both scroll issues and SEO risk.
