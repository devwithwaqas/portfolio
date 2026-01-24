# Portfolio GA4 Analytics API - Google Cloud Function

Unified endpoint for both analytics data fetching and event tracking.

## Prerequisites

- Google Cloud Project: `robust-builder-484406-b3`
- Service Account: `ga4-analytics-reader-portfolio@robust-builder-484406-b3.iam.gserviceaccount.com`
- Analytics Data API: Already enabled
- **GitHub Pages GA4**: Property `519885223`, Measurement `G-1HMMJLP7GK`, API Secret (in code)
- **Firebase GA4**: Property `521230752`, Measurement `G-02TG7S6Z2V`, API Secret `waqasahmad-portfolio-secret` (in code)
- Origin-based: requests from Firebase Hosting use Firebase property; GitHub Pages use GitHub property.

## Deployment Steps

### 1. Authenticate & Set Project

```bash
gcloud auth login
gcloud config set project robust-builder-484406-b3
```

### 2. Grant Service Account Permission (if not done)

```cmd
gcloud iam service-accounts add-iam-policy-binding ga4-analytics-reader-portfolio@robust-builder-484406-b3.iam.gserviceaccount.com --member="serviceAccount:804068697608-compute@developer.gserviceaccount.com" --role="roles/iam.serviceAccountUser"
```

### 3. Deploy Function

From the `gcloud-function` directory:

**For Windows CMD (single line):**
```cmd
gcloud functions deploy portfolio-ga4-api --gen2 --runtime nodejs20 --region us-central1 --trigger-http --allow-unauthenticated --entry-point portfolioAnalyticsAPI --service-account ga4-analytics-reader-portfolio@robust-builder-484406-b3.iam.gserviceaccount.com
```

### 4. Get Function URL

After deployment, you'll get a URL like:
```
https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-api
```

### 5. Update GitHub Secret

```cmd
gh secret set VITE_PORTFOLIO_GA4_API_ENDPOINT --body "https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-api"
```

## Free Tier

- **2 million invocations/month** free
- **400,000 GB-seconds compute time** free
- **200,000 GHz-seconds compute time** free
- Perfect for analytics endpoint (low traffic)

## API Endpoints

### GET `/portfolio-ga4-api`
Fetches analytics data:
- Total page views
- Top 3 most viewed items

### POST `/portfolio-ga4-api`
Sends tracking events to GA4:
- Accepts: `{ event_name, event_params, client_id, page_location, page_title }`
- Returns: `{ success: boolean, event: string, client_id: string }`

## Notes

- Uses Application Default Credentials (your service account)
- No need to upload JSON key file
- CORS enabled for GitHub Pages and Firebase Hosting (see `ALLOWED_ORIGINS` in code).
- Automatic scaling.
- Caching for analytics (1h in-memory for unified API; Firestore for read function).
- **Dual GA4**: Analytics and tracking use the correct property (GitHub vs Firebase) based on request `Origin`.
