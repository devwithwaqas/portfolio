# Portfolio GA4 Analytics API - Google Cloud Function

Unified endpoint for both analytics data fetching and event tracking.

## Prerequisites

- Google Cloud Project: `robust-builder-484406-b3`
- Service Account: `ga4-analytics-reader-portfolio@robust-builder-484406-b3.iam.gserviceaccount.com`
- Analytics Data API: Already enabled
- GA4 Property ID: `519885223`
- GA4 Measurement ID: `G-1HMMJLP7GK`
- GA4 API Secret: `p4SbgXEyTKOikyV8ZZACig`

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
- CORS enabled for:
  - `https://devwithwaqas.github.io` (GitHub Pages)
  - `https://waqasahmad-portfolio.web.app` (Firebase Hosting)
- Automatic scaling
- 5-minute caching for analytics data to reduce API calls
- Unified endpoint - one URL for both analytics and tracking
