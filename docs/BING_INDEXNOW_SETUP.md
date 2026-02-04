# Bing / IndexNow URL Submission

## 1. Generate API Key

Use the [Bing IndexNow key generator](https://www.bing.com/indexnow) to create an API key. The key is used to prove you own the domain when submitting URLs.

**Current key:** `cbe5cb9f88984691af7d581e94e409f6` (stored in `public/cbe5cb9f88984691af7d581e94e409f6.txt`).

## 2. Host Your API Key

The key file **must** be served at the root of your site:

- **URL:** `https://waqasahmad-portfolio.web.app/cbe5cb9f88984691af7d581e94e409f6.txt`
- **Content:** The API key only (UTF-8), no extra text.

The file lives in `public/` and is copied to `dist/` during `npm run build:firebase`, so it is deployed with Firebase Hosting.

## 3. Submit URLs

After the site (and key file) is live:

```bash
npm run submit-bing
```

This script:

1. Checks that the key file is reachable at the URL above.
2. Collects URLs from your router (same set as the sitemap).
3. POSTs them to `https://www.bing.com/indexnow` with `key`, `keyLocation`, and `urlList`.

To use a different key (e.g. from env):

```bash
BING_INDEXNOW_KEY=your-key node scripts/submit-bing-indexnow.js
```

## 4. Where to check submitted URLs (not “Get started”)

**Important:** [bing.com/indexnow](https://www.bing.com/indexnow) is the **IndexNow marketing / “Get started” page**. It always shows onboarding. **You do not check submissions there.**

**Use Bing Webmaster Tools instead:**

1. Go to **[Bing Webmaster Tools](https://www.bing.com/webmasters)** and sign in with your Microsoft account.
2. **Add your site** (if needed):
   - Click **Add a site**.
   - Enter `https://waqasahmad-portfolio.web.app` and add it.
3. **Verify ownership** when Bing asks:
   - **Option A – HTML meta tag:** Bing gives you a `<meta>` tag. Add it to your site’s `<head>` (e.g. in `index.html`), deploy, then click **Verify** in Bing.
   - **Option B – HTML file:** Bing gives you a file (e.g. `BingSiteAuth.xml`). Put it in your site root, deploy, then click **Verify**.
   - **Option C – DNS:** Add the CNAME record Bing shows to your domain’s DNS, then click **Verify**.
4. **Open your site** in the dashboard (click `waqasahmad-portfolio.web.app` in the site list).
5. In the **left menu** for that site, open **IndexNow** (not "URL Submission").
6. There you’ll see **IndexNow** submissions, **history**, and **status**. **URL Submission** shows 0 for API-only use; check **IndexNow**. Allow some time after `npm run submit-bing` for data to appear.

**Direct link (after sign-in):** [Bing Webmaster Tools → Dashboard](https://www.bing.com/webmasters). Then select your site → **IndexNow** in the left sidebar.

---

## Where you take over (step 4)

1. **[Bing Webmaster Tools](https://www.bing.com/webmasters)** → sign in.
2. **Add** `https://waqasahmad-portfolio.web.app` if it’s not there.
3. **Verify** ownership (meta tag, HTML file, or DNS).
4. Click your **site** in the dashboard → left menu → **IndexNow** to see submitted URLs (not "URL Submission").
5. Re-run `npm run submit-bing` after deploys when you add or change important URLs.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| **“Get started” every time on IndexNow** | You’re on [bing.com/indexnow](https://www.bing.com/indexnow). Use [Bing Webmaster Tools](https://www.bing.com/webmasters) instead → your site → **IndexNow** in the left menu. |
| `Key file not reachable` | Deploy the site first (`npm run deploy:firebase`), then run `npm run submit-bing`. |
| `IndexNow POST failed` | Confirm the key file URL returns 200 and that the key matches the file content. |
| **URL Submission shows 0** | **URL Submission** = manual form only. Check **IndexNow** (left menu) for API submissions. |
| **IndexNow report empty** | Run `npm run submit-bing`, then wait 24–48 h. Ensure site verified and key file live. |

---

## “Discovered but not crawled” / “URL cannot appear on Bing”

If **URL Inspection** shows this, Bing knows the URL but hasn’t indexed it yet. [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmasters-guidelines-30fba23a) recommend:

1. **Request indexing** — In URL Inspection, click **Request indexing** for important URLs (home, main services). Uses your quota but prioritizes crawl.
2. **Don’t block Bing** — We use `User-agent: *` and `User-agent: Bingbot` with explicit `Allow` for `/`, `/projects/`, `/services/`, `/assets/`, sitemap, llms.txt, IndexNow key. No blocks.
3. **No Google changes** — Canonical, meta, structured data, noscript, sitemap, etc. stay as-is. Bing-only tweaks (e.g. `Bingbot` in robots) are additive.

---

## Pre-deploy check for all 18 URLs

Before deploying, run:

```bash
npm run build:firebase
npm run verify-urls
```

This checks for **all 18** IndexNow/sitemap URLs:

- **Sitemap:** Each URL is listed in `dist/sitemap.xml`.
- **Robots:** Each path is under `/`, `/projects/`, or `/services/` (all allowed; nothing under `/admin/` or `/api/`).
- **Fetch:** Each URL returns **200** on the live site.

If `verify-urls` passes, all 18 are ready for indexing. Then deploy, run `npm run submit-bing`, and use **Request indexing** in Bing URL Inspection for important URLs.
