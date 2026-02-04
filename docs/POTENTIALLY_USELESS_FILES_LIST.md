# Potentially useless files — list (removed)

**Purpose:** Listed scripts/files that were redundant or one-off. The files in the "Potentially useless" section below have been **removed**. Cloud-function PS1s, npm-run PS1s, and build/dev helpers were kept.

---

## ✅ Do NOT remove (in use)

### Cloud functions (PS1)
- `scripts/deploy-cloud-functions.ps1`
- `scripts/deploy-cloud-functions-secrets.ps1`
- `scripts/deploy-all-functions.ps1`
- `scripts/update-sendemail-env.ps1`
- `scripts/diagnose-functions.ps1`
- `scripts/check-functions-simple.ps1`
- `scripts/get-secrets-for-local.ps1`
- `scripts/set-api-key-secret.ps1` (sets api-key in Google Cloud Secret Manager for sendEmail)

### Npm helpers (PS1 — referenced in package.json)
- `scripts/test-google-rankings.ps1` — `npm run test:google-rankings`
- `scripts/setup-serpapi.ps1` — `npm run setup:serpapi`
- `scripts/auto-setup-serpapi.ps1` — `npm run auto-setup:serpapi`
- `scripts/submit-google-indexing.ps1` — `npm run submit:indexing`
- `scripts/setup-google-cse-api.ps1` — `npm run setup:google-cse`
- `scripts/complete-setup.ps1` — `npm run setup:cse-complete`
- `scripts/finalize-setup.ps1` — `npm run setup:cse-finalize`
- `scripts/setup-bing-api.ps1` — `npm run setup:bing-api`
- `scripts/run-checks.ps1` — `npm run run-checks`

### Other helpers (keep)
- `scripts/run-with-output.ps1` — runs a command and logs to script-output/ (npm helper style)
- `scripts/split-css-plugin.js` — used by **vite.config.js**
- `scripts/vite-dev-error-logger.js` — used by **vite.config.js**
- `scripts/keyword-scorer.js` — used by test-keyword-rankings.js, test-google-rankings-serpapi.js, save-tracking-keywords.js
- `scripts/test-google-rankings-crawl.js` — called by test-google-rankings.ps1
- `setup.bat` — project setup (npm install)

---

## 📋 Removed (were potentially useless / one-off)

### PowerShell — removed
- `scripts/validate-blog-syntax.ps1`
- `scripts/create-cse.ps1`
- `scripts/configure-serpapi.ps1`
- `downloads/convert-all-6-resumes.ps1`

### JavaScript — removed
- `scripts/copy-sitemap.js`
- `scripts/add-faqs-arch.js`, `add-faqs-patterns.js`, `add-faqs-transactions.js`, `add-faqs-versioning.js`
- `scripts/audit-blog-articles.js`
- `scripts/check-template-balance.js`
- `scripts/create-cse-automated.js`, `scripts/auto-create-cse.js`
- `scripts/expand-case-studies.js`, `scripts/expand-database-indexing.js`
- `scripts/find-unescaped-backticks.js`
- `scripts/fix-blog-corruption.js`
- `scripts/normalize-article-dates.js`
- `scripts/optimize-blog-articles.js`
- `scripts/save-tracking-keywords.js`
- `scripts/setup-font-awesome.js`

---

## Summary

- **Kept:** 9 npm PS1s, 8 cloud-function/secret PS1s, run-with-output.ps1, split-css-plugin.js, vite-dev-error-logger.js, keyword-scorer.js, test-google-rankings-crawl.js, setup.bat.
- **Removed:** 4 PS1s, 17 JS scripts (listed above).
