# Portfolio Analytics - Dual Function Setup
## Strategy: Scheduled Updates + Rate-Limit-Free Reads

### Architecture

```
┌──────────────────────────────────────────────────────┐
│ Cloud Scheduler (every hour)                         │
│ → Triggers UPDATE function                           │
│ → Fetches from GA4 API (2 requests)                 │
│ → Stores in Firestore                               │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│ Firestore Collection: analytics_cache                │
│ Document: portfolio_stats                            │
│ { totalViews, topItems, lastUpdated, timestamp }    │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│ READ Function (frontend calls this)                  │
│ → ONLY reads from Firestore                         │
│ → NEVER calls GA4 API                               │
│ → NO rate limits!                                   │
└──────────────────────────────────────────────────────┘
```

---

## Rate Limit Optimization

**Google Analytics Data API limits:**
- 120 requests/hour max
- Our function uses 2 requests per update

**Schedule: Every 1 hour (optimal)**
- 24 updates/day × 2 requests = **48 API calls/day**
- Uses only 0.4% of hourly quota per update
- Safe buffer for manual testing/debugging

---

## Deployment Steps

### 1. Enable Firestore

```bash
gcloud firestore databases create --location=us-central1
```

### 2. Deploy UPDATE Function

```bash
cd gcloud-function

# Copy update package.json
cp package-update.json package.json

# Deploy
gcloud functions deploy portfolio-ga4-update \
  --gen2 \
  --runtime nodejs20 \
  --region us-central1 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point updatePortfolioAnalytics \
  --service-account ga4-analytics-reader-portfolio@robust-builder-484406-b3.iam.gserviceaccount.com \
  --timeout 60s
```

### 3. Deploy READ Function  

```bash
# Copy read package.json
cp package-read.json package.json

# Deploy
gcloud functions deploy portfolio-ga4-read \
  --gen2 \
  --runtime nodejs20 \
  --region us-central1 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point readPortfolioAnalytics \
  --service-account ga4-analytics-reader-portfolio@robust-builder-484406-b3.iam.gserviceaccount.com \
  --timeout 10s
```

### 4. Create Cloud Scheduler Job

```bash
# Create scheduler job to call UPDATE function every hour
gcloud scheduler jobs create http portfolio-analytics-hourly-update \
  --location us-central1 \
  --schedule "0 * * * *" \
  --uri "https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-update" \
  --http-method GET \
  --time-zone "America/Los_Angeles" \
  --description "Update portfolio analytics cache hourly"
```

### 5. Trigger First Update Manually

```bash
# Trigger update function once to populate initial cache
curl https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-update
```

### 6. Update Frontend Environment Variable

```bash
# Update GitHub secret to use READ function URL
gh secret set VITE_PORTFOLIO_GA4_API_ENDPOINT \
  --body "https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-read"
```

---

## Verification

1. **Check Firestore:**
```bash
gcloud firestore collections list
gcloud firestore documents list analytics_cache
```

2. **Check Scheduler:**
```bash
gcloud scheduler jobs list --location us-central1
```

3. **Test READ function:**
```bash
curl https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-read
```

---

## Benefits

✅ **No rate limits** - Read function only queries Firestore (50K free reads/day)
✅ **Always fresh** - Updates every hour automatically
✅ **Scalable** - Can handle millions of users
✅ **Cost-effective** - All within free tier:
   - Firestore: 50K reads/day free (plenty)
   - Functions: 2M invocations/month free
   - Scheduler: 3 jobs free
✅ **Reliable** - Persistent cache survives cold starts

---

## Free Tier Limits

- **Cloud Functions:** 2M invocations/month
- **Firestore:** 50K document reads/day
- **Cloud Scheduler:** 3 jobs free

**Your usage:**
- UPDATE function: 24 calls/day (~720/month) ✅
- READ function: Unlimited users (within 50K reads/day) ✅
- Scheduler: 1 job ✅

**Can handle 1000s of daily users within free tier!**
