# Cloud Functions Security

Security measures implemented across the four portfolio Cloud Functions. All are **free** (no extra GCP cost).

## Summary

| Function | Measures |
|----------|----------|
| **portfolioAnalyticsAPI** (index.js) | Strict origin, rate limit (GET 10/min, POST 20/min per IP), GA4 secrets via env |
| **readPortfolioAnalytics** (index-read.js) | Strict origin, rate limit (GET 10/min, POST 20/min per IP), GA4 secrets via env |
| **updatePortfolioAnalytics** (index-update.js) | Scheduler secret (`X-Scheduler-Secret` header) when `SCHEDULER_SECRET` env is set |
| **reportPortfolioError** (index-error-report.js) | Strict origin, rate limit (5/min per IP), message/context/url/userAgent length caps |
| **sendEmail** (serverless/sendEmail) | Strict origin, rate limit (5/min per IP), field limits, HTML escaping, optional API key |

## Allowed origins

Browser requests must come from:

- `https://waqasahmad-portfolio.web.app`
- `https://waqasahmad-portfolio.firebaseapp.com`

**sendEmail** also allows localhost (5173, 4173, 3001, 127.0.0.1) for development.  
Requests from other origins receive **403 Origin not allowed**. Postman/curl without `Origin` may be rejected where origin is enforced.

## Rate limiting

- In-memory per instance; resets on cold start.
- **429 Too Many Requests** when over limit; `Retry-After` header set.
- Analytics GET: 60 req/min per IP (page loads, navigation).
- Analytics POST (tracking): 100 req/min per IP (multiple events per page).
- Error report: 5 req/min per IP.
- sendEmail: 10 req/min per IP (form submissions, testing).

## Environment variables

### Analytics (index.js, index-read.js)

Optional; fallback to existing hardcoded values if unset.

- `GA4_MEASUREMENT_ID_FIREBASE` – GA4 Measurement ID (Firebase property)
- `GA4_API_SECRET_FIREBASE` – GA4 API Secret (Firebase)
- `GA4_MEASUREMENT_ID_GITHUB` – GA4 Measurement ID (GitHub property)
- `GA4_API_SECRET_GITHUB` – GA4 API Secret (GitHub)

Set these in the Cloud Function configuration (e.g. Secret Manager or env vars) to avoid keeping secrets in code.

### Update / Scheduler (index-update.js)

- `SCHEDULER_SECRET` – If set, the function **requires** the `X-Scheduler-Secret` header to match.  
  Configure your Cloud Scheduler HTTP job to send this header (e.g. via "Additional headers" or similar).  
  If unset, no secret check is performed (backward compatible).

### sendEmail (serverless/sendEmail)

- `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `TO_EMAIL` – Required (existing).
- `API_KEY` – Optional. If set, requests must send `X-API-Key` with the same value.

## sendEmail validation

- **Length limits:** name 100, subject 200, message 5000, timezone 64, language 32.
- **HTML escaping:** User-supplied fields (name, email, subject, message, etc.) are escaped when used in the HTML email body.
- **Strict origin:** No `*` fallback; only allowed origins above.

## Deployment

### Automated (Recommended)

Run the deployment script:

```powershell
.\scripts\deploy-all-functions.ps1
```

This script:
- Generates `SCHEDULER_SECRET` if not set
- Deploys all 5 functions with env vars
- Updates/creates Cloud Scheduler job with secret header
- Uses existing env vars or fallback values

**Required env vars** (set before running):
- `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `TO_EMAIL` (for sendEmail)
- Optional: `API_KEY`, `SCHEDULER_SECRET`, `GA4_*` secrets

### Manual

1. Deploy each function: `gcloud functions deploy ...`
2. Set env vars in Cloud Console or via `--set-env-vars`
3. For **updatePortfolioAnalytics**, configure Cloud Scheduler with `X-Scheduler-Secret` header.

## Shared code

- **gcloud-function/security.js**: `getCorsHeaders`, `isAllowedOrigin`, `createRateLimiter`, `getClientIp`.  
  Used by index.js, index-read.js, index-error-report.js. Keep `security.js` in the same directory when deploying those functions.
