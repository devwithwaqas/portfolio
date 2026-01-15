# 📊 Simplified Analytics Stats Setup - Using Cloud Functions

## Quick Solution: Use Google Cloud Functions (Free Tier Available)

Instead of setting up a full backend, you can use **Google Cloud Functions** (free tier: 2 million invocations/month) which integrates seamlessly with GA4.

---

## Option 1: Google Cloud Functions (Recommended - Easiest)

### Step 1: Create Google Cloud Function

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Enable Cloud Functions API** (if not already enabled)
3. **Create a new function:**
   - Function name: `portfolio-analytics`
   - Region: Choose closest to you (e.g., `us-central1`)
   - Trigger: HTTP
   - Authentication: Allow unauthenticated invocations
   - Runtime: Node.js 18 or Python 3

### Step 2: Function Code (Node.js)

```javascript
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

exports.getAnalytics = async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const analyticsDataClient = new BetaAnalyticsDataClient();
    const propertyId = 'YOUR_GA4_PROPERTY_ID'; // e.g., '123456789'

    // Get total views (last 30 days)
    const [totalViewsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [{ name: 'screenPageViews' }],
    });

    const totalViews = parseInt(totalViewsResponse.rows[0]?.metricValues[0]?.value || 0);

    // Get top pages (projects/services)
    const [topPagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [
        { name: 'pagePath' },
        { name: 'pageTitle' },
      ],
      metrics: [{ name: 'screenPageViews' }],
      dimensionFilter: {
        orGroup: {
          expressions: [
            {
              filter: {
                fieldName: 'pagePath',
                stringFilter: { matchType: 'BEGINS_WITH', value: '/projects/' },
              },
            },
            {
              filter: {
                fieldName: 'pagePath',
                stringFilter: { matchType: 'BEGINS_WITH', value: '/services/' },
              },
            },
          ],
        },
      },
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 3,
    });

    const topItems = (topPagesResponse.rows || []).map((row) => {
      const path = row.dimensionValues[0].value;
      const title = row.dimensionValues[1].value;
      const views = parseInt(row.metricValues[0].value);

      // Extract name from title or path
      const name = title.split(' - ')[0] || path.split('/').pop().replace(/-/g, ' ');

      return {
        name: name,
        views: views,
        url: path,
        type: path.startsWith('/projects/') ? 'project' : 'service',
      };
    });

    res.json({
      totalViews: totalViews,
      topItems: topItems,
    });
  } catch (error) {
    console.error('Analytics API Error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
};
```

### Step 3: Deploy Function

```bash
# Install dependencies
npm install @google-analytics/data

# Deploy (replace with your function name)
gcloud functions deploy portfolio-analytics \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --region us-central1
```

### Step 4: Get Function URL

After deployment, you'll get a URL like:
```
https://us-central1-YOUR-PROJECT.cloudfunctions.net/portfolio-analytics
```

### Step 5: Configure Environment Variable

Add to `.env` or GitHub Secrets:
```
VITE_ANALYTICS_API_ENDPOINT=https://us-central1-YOUR-PROJECT.cloudfunctions.net/portfolio-analytics
```

---

## Option 2: Vercel Serverless Function (Alternative)

If you prefer Vercel:

### Create `api/analytics.js`:

```javascript
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const client = new BetaAnalyticsDataClient();
    const propertyId = process.env.GA4_PROPERTY_ID;

    // ... same logic as Cloud Functions ...

    res.json({ totalViews, topItems });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
}
```

---

## Option 3: Netlify Functions (Alternative)

Create `netlify/functions/analytics.js`:

```javascript
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // ... same analytics logic ...
    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalViews, topItems }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch analytics' }),
    };
  }
};
```

---

## Why This Approach?

✅ **No Full Backend Required** - Serverless functions are lightweight  
✅ **Free Tier Available** - Google Cloud Functions: 2M invocations/month free  
✅ **Secure** - Credentials stay on server, not exposed to frontend  
✅ **Easy to Deploy** - One command deployment  
✅ **Scalable** - Automatically scales with traffic  

---

## Setup Service Account (Required for All Options)

1. **Google Cloud Console** > IAM & Admin > Service Accounts
2. **Create Service Account**:
   - Name: `analytics-function`
   - Role: `Viewer` (read-only access)
3. **Create Key**: Download JSON key file
4. **Grant GA4 Access**:
   - Go to Google Analytics > Admin > Property Access Management
   - Add service account email
   - Grant `Viewer` permissions
5. **Set Environment Variable**:
   - For Cloud Functions: Set `GOOGLE_APPLICATION_CREDENTIALS` or use default service account
   - For Vercel/Netlify: Upload JSON key as secret or use environment variable

---

## Quick Test

Once deployed, test your endpoint:

```bash
curl https://YOUR-FUNCTION-URL
```

Should return:
```json
{
  "totalViews": 15234,
  "topItems": [...]
}
```

Then add the URL to your environment variables and the component will automatically start displaying data!