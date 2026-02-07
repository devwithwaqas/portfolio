# Bing / IndexNow URL Submission

> **Single source of truth:** See **docs/SEO_SINGLE_SOURCE_OF_TRUTH.md** for current implementation (IndexNow script, base URL, key file, and all other SEO: keywords, structured data, meta, sitemap, llms.txt).

The **canonical site** for this project is **https://waqas.ragnorx.com**. Bing/IndexNow must use this domain (where the key file is hosted and the sitemap lives).

---

## What was changed (Bing-related, no keys touched)

So the project points at the **ragnorx** site instead of the old .web.app URL, these were updated:

| File | What was replaced |
|------|-------------------|
| **scripts/submit-bing-indexnow.js** | Default `BASE_URL`: `https://waqasahmad-portfolio.web.app` → `https://waqas.ragnorx.com`. So `npm run submit-bing` now submits URLs for waqas.ragnorx.com and checks the key at `https://waqas.ragnorx.com/<key>.txt`. Also: 202 Accepted is now treated as success. |
| **scripts/generate-sitemap.js** | Fallback `BASE_URL`: `waqasahmad-portfolio.web.app` → `waqas.ragnorx.com`. |
| **scripts/write-robots-firebase.js** | Fallback `baseUrl`: same change. |
| **scripts/validate-sitemap.js** | Default `FIREBASE_URL`: same change. |
| **scripts/verify-urls-indexing.js** | No longer uses a hardcoded base; it reads the URL list from `dist/sitemap.xml` (so it matches sitemap and submit-bing). |
| **docs/BING_INDEXNOW_SETUP.md** | All instructions and examples now use **waqas.ragnorx.com** (key file URL, add site, verify, etc.). |

**Key updated:** The default IndexNow key is now the ragnorx key `73e43e4aa58341fbb416f06913dcabda` (file `public/73e43e4aa58341fbb416f06913dcabda.txt`). Override with `BING_INDEXNOW_KEY` env if needed.

---

## What we need from you (ragnorx property already in Bing)

Because Bing works per **property** (site) and you said the **ragnorx** property is already set up:

1. **Same key or new key?**
   - The ragnorx key is now the default. Ensure the key file is live at `https://waqas.ragnorx.com/73e43e4aa58341fbb416f06913dcabda.txt` (it is after you deploy the main site). Then run `npm run submit-bing` after deploy.
   - If you created a **new** IndexNow key when you added the ragnorx property in Bing, we need:
     - The **new key value** (e.g. from [Bing IndexNow](https://www.bing.com/indexnow)).
     - Then we will: add `public/<newkey>.txt` with that key as content, and use `BING_INDEXNOW_KEY=<newkey>` when running the script (or in `.env`).

2. **Confirm in Bing Webmaster**
   - Open [Bing Webmaster Tools](https://www.bing.com/webmasters) → select the **waqas.ragnorx.com** (ragnorx) property.
   - Under **IndexNow** in the left menu, you should see submissions after running `npm run submit-bing`. If you use a different key for this property, say so and we’ll switch the script to that key.

3. **Optional override (no code change)**
   - To submit with a different base URL or key without changing code:  
     `FIREBASE_SITE_URL=https://waqas.ragnorx.com BING_INDEXNOW_KEY=your-key node scripts/submit-bing-indexnow.js`

---

## 1. Generate API Key

Use the [Bing IndexNow key generator](https://www.bing.com/indexnow) to create an API key. The key is used to prove you own the domain when submitting URLs.

**Current key:** `73e43e4aa58341fbb416f06913dcabda` (stored in `public/73e43e4aa58341fbb416f06913dcabda.txt`).

## 2. Host Your API Key

The key file **must** be served at the root of your **canonical** site:

- **URL:** `https://waqas.ragnorx.com/73e43e4aa58341fbb416f06913dcabda.txt`
- **Content:** The API key only (UTF-8), no extra text.

The file lives in `public/` and is copied to `dist/` during `npm run build:firebase`, so it is deployed with the main site (waqas.ragnorx.com).

## 3. Submit URLs

After the site (and key file) is live at **waqas.ragnorx.com**:

```bash
npm run submit-bing
```

This script:

1. Uses base URL **https://waqas.ragnorx.com** (override with `FIREBASE_SITE_URL` or `VITE_FIREBASE_SITE_URL` if needed).
2. Checks that the key file is reachable at `https://waqas.ragnorx.com/<key>.txt`.
3. Collects URLs from the router and blog articles (same set as the sitemap).
4. POSTs them to the IndexNow API with `key`, `keyLocation`, and `urlList`.

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
   - Enter `https://waqas.ragnorx.com` and add it.
3. **Verify ownership** when Bing asks:
   - **Option A – HTML meta tag:** Bing gives you a `<meta>` tag. Add it to your site’s `<head>` (e.g. in `index.html`), deploy, then click **Verify** in Bing.
   - **Option B – HTML file:** Bing gives you a file (e.g. `BingSiteAuth.xml`). Put it in your site root, deploy, then click **Verify**.
   - **Option C – DNS:** Add the CNAME record Bing shows to your domain’s DNS, then click **Verify**.
4. **Open your site** in the dashboard (click **waqas.ragnorx.com** in the site list).
5. In the **left menu** for that site, open **IndexNow** (not "URL Submission").
6. There you’ll see **IndexNow** submissions, **history**, and **status**. **URL Submission** shows 0 for API-only use; check **IndexNow**. Allow some time after `npm run submit-bing` for data to appear.

**Direct link (after sign-in):** [Bing Webmaster Tools → Dashboard](https://www.bing.com/webmasters). Then select your site → **IndexNow** in the left sidebar.

---

## Where you take over (step 4)

1. **[Bing Webmaster Tools](https://www.bing.com/webmasters)** → sign in.
2. **Add** `https://waqas.ragnorx.com` if it’s not there.
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

## Pre-deploy check (all sitemap URLs)

Before deploying, run:

```bash
npm run build:firebase
npm run verify-urls
```

This checks **all** IndexNow/sitemap URLs (router routes + blog articles):

- **Sitemap:** Each URL is listed in `dist/sitemap.xml`.
- **Robots:** Paths under `/`, `/blog/`, `/projects/`, `/services/`, etc. are allowed.
- **Fetch:** Each URL returns **200** on the live site (waqas.ragnorx.com).

If `verify-urls` passes, deploy, run `npm run submit-bing`, and use **Request indexing** in Bing URL Inspection for important URLs.
