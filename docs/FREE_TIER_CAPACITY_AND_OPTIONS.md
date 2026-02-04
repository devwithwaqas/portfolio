# Free-tier capacity and options ($0 budget)

Summary of what you’re using, free limits, and how to avoid rate limiting on Firebase + Google Cloud (no billing).

---

## Current setup

| Component | What it does | Where |
|-----------|--------------|--------|
| **Firebase Hosting** | Serves the built SPA (`dist`) | `firebase.json` → `dist` |
| **Cloud Functions** (5) | Analytics read/update, error report, sendEmail | `gcloud-function/`, `serverless/sendEmail/` |
| **Deploy** | Hosting: `npm run deploy:firebase` (or `:dev`) | `scripts/deploy-firebase.js` |
| **Functions** | `.\scripts\deploy-all-functions.ps1` | GCP us-central1, project `robust-builder-484406-b3` |

Firebase project: **waqasahmad-portfolio** (Spark / free plan).

---

## Free-tier limits (stay within these to avoid cost)

### Firebase Hosting (Spark)

| Quota | Limit | Notes |
|-------|--------|------|
| **Storage** | 10 GB | Your `dist` + assets. Plenty for a portfolio. |
| **Data transfer** | **10 GB / month** | Total bytes served. Main limit to watch. |

- Over 10 GB/month → need Blaze (billing). For a typical portfolio, 10 GB/month is enough unless you get very high traffic or very heavy assets.
- **Tip:** You’re already caching JS/CSS/images long-term (`max-age=31536000` in `firebase.json`). Keep that; it reduces repeat traffic.

### Google Cloud Functions (free tier)

| Quota | Limit (approx.) | Notes |
|-------|-------------------|------|
| **Invocations** | **2 million / month** | Shared across all 5 functions. |
| **Compute** | 400,000 GB‑seconds, 200,000 CPU‑seconds | Usually not the bottleneck. |
| **Outbound egress** | 5 GB / month | Data sent from functions (e.g. to GA4, SMTP). |

- Your **in-function** rate limits (e.g. 60 GET/min, 100 POST/min per IP in `gcloud-function/`) are to protect the APIs, not the same as GCP’s 2M/month. You’re well within free tier unless you get huge traffic.
- **Tip:** Keep per-IP limits as they are; they help avoid abuse and stay under 2M invocations.

---

## Avoiding rate limiting (especially for diagrams)

### Diagrams today

- **Mermaid** runs in the **browser** (no Kroki, no extra server). No diagram-related rate limits and no extra cost.
- **Kroki (PlantUML)** would call `https://kroki.io`; that service can rate-limit and was returning 400 for our PlantUML, so we use Mermaid for the behavioral article.

### Best option on $0: keep Mermaid, no Kroki

- No extra hosting, no diagram API limits.
- Styling is tuned in `MermaidBlock.vue` (padding, font, overflow, classDef colors).
- Stays within Firebase 10 GB/month + Cloud Functions 2M/month.

### If you later want “no external diagram service”

1. **Pre-render diagrams at build time** (recommended)
   - In the build (e.g. `npm run build`), run a script that:
     - Finds Mermaid (or PlantUML) sources in the article content,
     - Renders them to SVG (e.g. Mermaid CLI, or a small Node script),
     - Writes SVGs to `public/` or inlines them in the article.
   - Deployed site then serves **static SVGs**. No runtime diagram calls, no rate limits, no extra cost. Fits Firebase free tier.

2. **Cloud Function that renders Mermaid → SVG**
   - One function: POST body = Mermaid source, response = SVG.
   - Uses your **2M invocations/month** (e.g. 5 diagrams × 200 page views = 1,000 invocations). Still within free tier for moderate traffic.
   - No Kroki dependency; you’d add something like `mermaid` in Node in that function.

3. **Cloud Run + Kroki (only if you really want PlantUML)**
   - Run Kroki in a container on **Cloud Run**. Free tier: ~2M requests/month.
   - Cons: Image is large (Java, etc.), cold starts, more setup. Only worth it if you must have PlantUML and are okay maintaining a container.

---

## What else you can do on $0

- **Firebase Hosting:** Keep using it for the SPA; you’re within 10 GB/month for normal traffic.
- **Cloud Functions:** Keep all 5; 2M invocations/month is enough for analytics, email, and error reporting. Your per-IP limits are good for safety.
- **Diagrams:** Use **Mermaid only** (current approach) to avoid any diagram service rate limits. Optionally add **build-time pre-rendering** later if you want static SVGs and zero runtime diagram cost.
- **Cloud Run:** Free tier exists; use it only if you add a service (e.g. Kroki) that truly needs a container. Not required for the current stack.

---

## Quick reference

| Goal | Recommendation |
|------|----------------|
| Stay $0 | Firebase Hosting + Cloud Functions only; keep within 10 GB transfer and 2M invocations. |
| No diagram rate limits | Use Mermaid in the browser (current). No Kroki. |
| Nicer diagrams, still $0 | Improve Mermaid styling (done in `MermaidBlock.vue`). Optional: pre-render Mermaid to SVG at build time. |
| PlantUML without kroki.io | Pre-render PlantUML at build (e.g. local PlantUML or a script), or run Kroki on Cloud Run (more work). |

---

## Where things live

- **Hosting config:** `firebase.json`
- **Function code:** `gcloud-function/*.js`, `serverless/sendEmail/`
- **Security / rate limits:** `docs/CLOUD_FUNCTIONS_SECURITY.md`
- **Deploy commands:** `DEPLOYMENT_COMMANDS.md`
- **Diagram styling:** `src/components/blog/MermaidBlock.vue`
- **Kroki/PlantUML notes:** `docs/KROKI_DIAGRAMS.md`
