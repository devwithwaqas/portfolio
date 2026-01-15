# 📊 Analytics Stats Component Setup Guide

## Overview

The Analytics Stats component displays real-time Google Analytics data in the Hero section:
- **Total Views**: Total page views across the entire portfolio
- **Top 3 Most Viewed Items**: Most viewed projects and services

The component is already integrated into the Hero section and will automatically display once the backend API endpoint is configured.

---

## 🎨 Component Features

- **Beautiful Design**: Matches the existing hero section styling with purple gradient themes
- **Responsive**: Works seamlessly on all device sizes using existing responsive patterns
- **Real-time Updates**: Automatically refreshes every 5 minutes
- **Fallback Behavior**: Shows nothing if no data is available (graceful degradation)

---

## 🔧 Setup Instructions

### Step 1: Create Backend API Endpoint

You need to create a backend endpoint that queries Google Analytics Data API (GA4) and returns:
- Total page views
- Top 3 most viewed pages (projects/services)

**Required Response Format:**
```json
{
  "totalViews": 15234,
  "topItems": [
    {
      "name": "BAT Inhouse App",
      "views": 1245,
      "url": "/projects/bat-inhouse-app",
      "type": "project"
    },
    {
      "name": "Full Stack Development",
      "views": 892,
      "url": "/services/full-stack-development",
      "type": "service"
    },
    {
      "name": "Heat Exchanger",
      "views": 756,
      "url": "/projects/heat-exchanger",
      "type": "project"
    }
  ]
}
```

### Step 2: Backend Implementation Options

#### Option A: Node.js/Express Example

```javascript
// Example endpoint using Google Analytics Data API
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: 'path/to/service-account-key.json',
});

async function getAnalyticsStats(req, res) {
  try {
    const propertyId = 'YOUR_GA4_PROPERTY_ID';
    
    // Get total views (last 30 days)
    const [totalViewsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
      ],
    });
    
    const totalViews = totalViewsResponse.rows[0]?.metricValues[0]?.value || 0;
    
    // Get top pages (projects/services)
    const [topPagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
        {
          name: 'pageTitle',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'BEGINS_WITH',
            value: '/projects/',
          },
        },
      },
      orderBys: [
        {
          metric: {
            metricName: 'screenPageViews',
          },
          desc: true,
        },
      ],
      limit: 10,
    });
    
    // Process and format top items
    const topItems = topPagesResponse.rows?.slice(0, 3).map((row, index) => {
      const path = row.dimensionValues[0].value;
      const title = row.dimensionValues[1].value;
      const views = parseInt(row.metricValues[0].value);
      
      // Extract project/service name from path
      const slug = path.split('/').pop();
      const name = title.split(' - ')[0] || slug.replace(/-/g, ' ');
      
      return {
        name: name,
        views: views,
        url: path,
        type: path.startsWith('/projects/') ? 'project' : 'service'
      };
    }) || [];
    
    res.json({
      totalViews: parseInt(totalViews),
      topItems: topItems
    });
  } catch (error) {
    console.error('Analytics API Error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
}

// Express route
app.get('/api/analytics', getAnalyticsStats);
```

#### Option B: PHP Example

```php
<?php
// analytics-api.php
require_once __DIR__ . '/vendor/autoload.php';

use Google\Analytics\Data\V1beta\BetaAnalyticsDataClient;
use Google\Analytics\Data\V1beta\DateRange;
use Google\Analytics\Data\V1beta\Dimension;
use Google\Analytics\Data\V1beta\Metric;
use Google\Analytics\Data\V1beta\RunReportRequest;

header('Content-Type: application/json');

$propertyId = 'YOUR_GA4_PROPERTY_ID';
$credentialsPath = __DIR__ . '/service-account-key.json';

try {
    $client = new BetaAnalyticsDataClient([
        'credentials' => $credentialsPath,
    ]);
    
    // Get total views
    $totalViewsRequest = (new RunReportRequest())
        ->setProperty('properties/' . $propertyId)
        ->setDateRanges([
            (new DateRange())
                ->setStartDate('30daysAgo')
                ->setEndDate('today')
        ])
        ->setMetrics([
            (new Metric())->setName('screenPageViews')
        ]);
    
    $totalViewsResponse = $client->runReport($totalViewsRequest);
    $totalViews = (int)($totalViewsResponse->getRows()[0]->getMetricValues()[0]->getValue() ?? 0);
    
    // Get top pages
    $topPagesRequest = (new RunReportRequest())
        ->setProperty('properties/' . $propertyId)
        ->setDateRanges([
            (new DateRange())
                ->setStartDate('30daysAgo')
                ->setEndDate('today')
        ])
        ->setDimensions([
            (new Dimension())->setName('pagePath'),
            (new Dimension())->setName('pageTitle')
        ])
        ->setMetrics([
            (new Metric())->setName('screenPageViews')
        ])
        ->setOrderBys([
            (new RunReportRequest\OrderBy())
                ->setMetric((new RunReportRequest\OrderBy\MetricOrderBy())
                    ->setMetricName('screenPageViews')
                )
                ->setDesc(true)
        ])
        ->setLimit(10);
    
    $topPagesResponse = $client->runReport($topPagesRequest);
    
    $topItems = [];
    foreach (array_slice($topPagesResponse->getRows(), 0, 3) as $row) {
        $dimensions = $row->getDimensionValues();
        $path = $dimensions[0]->getValue();
        $title = $dimensions[1]->getValue();
        $views = (int)$row->getMetricValues()[0]->getValue();
        
        $slug = basename($path);
        $name = explode(' - ', $title)[0] ?: str_replace('-', ' ', $slug);
        
        $topItems[] = [
            'name' => $name,
            'views' => $views,
            'url' => $path,
            'type' => strpos($path, '/projects/') === 0 ? 'project' : 'service'
        ];
    }
    
    echo json_encode([
        'totalViews' => $totalViews,
        'topItems' => $topItems
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch analytics data']);
}
?>
```

### Step 3: Get Google Analytics Service Account

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create/Select Project**: Create a new project or select existing
3. **Enable Analytics Data API**: 
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Analytics Data API"
   - Click "Enable"
4. **Create Service Account**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in details and create
   - Click on the service account > "Keys" tab
   - Click "Add Key" > "Create new key" > JSON
   - Download the JSON key file
5. **Grant Access to GA4 Property**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Click "Admin" (gear icon)
   - Select your property
   - Under "Property Access Management", add the service account email
   - Grant "Viewer" permissions

### Step 4: Configure Environment Variable

Add the API endpoint URL to your environment variables:

```bash
# .env
VITE_ANALYTICS_API_ENDPOINT=https://your-backend-domain.com/api/analytics
```

Or add to GitHub Secrets:
- **Name**: `VITE_ANALYTICS_API_ENDPOINT`
- **Value**: `https://your-backend-domain.com/api/analytics`

---

## 📝 Component Files

### Files Created:
- `src/components/home/AnalyticsStats.vue` - The analytics stats component
- `src/utils/analyticsData.js` - Service for fetching analytics data
- `docs/ANALYTICS_STATS_SETUP.md` - This documentation

### Files Modified:
- `src/components/home/Hero.vue` - Added AnalyticsStats component

---

## 🎯 Current Behavior

**Before Backend Setup:**
- Component renders but displays no data (graceful degradation)
- Console shows warning: `[Analytics] No API endpoint configured. Using mock data.`

**After Backend Setup:**
- Component automatically fetches and displays real analytics data
- Updates every 5 minutes
- Shows total views and top 3 most viewed items

---

## 🔍 Testing

1. **Local Testing**:
   - Start your development server: `npm run dev`
   - Open browser console
   - Navigate to home page
   - Check for analytics data loading messages

2. **Verify Backend**:
   - Test your API endpoint directly: `curl https://your-backend-domain.com/api/analytics`
   - Verify JSON response format matches required structure

3. **Check Component**:
   - Analytics stats should appear in hero section
   - Total views should display formatted number (e.g., "15.2K")
   - Top 3 items should be clickable and link to respective pages

---

## 🎨 Customization

The component styling can be customized in `src/components/home/AnalyticsStats.vue`:
- Colors: Adjust gradient colors in `.analytics-stats-container`
- Layout: Modify flex/grid properties
- Responsive breakpoints: Adjust `@media` queries

---

## ❓ Troubleshooting

**Component not showing:**
- Check browser console for errors
- Verify `VITE_ANALYTICS_API_ENDPOINT` is set correctly
- Ensure backend endpoint is accessible (no CORS issues)

**No data displayed:**
- Verify backend endpoint returns correct JSON format
- Check backend logs for API errors
- Ensure service account has proper GA4 permissions

**CORS Errors:**
- Add CORS headers to your backend endpoint:
  ```javascript
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  ```

---

## 📚 Additional Resources

- [Google Analytics Data API Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [GA4 Reporting API Quickstart](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries)
- [Service Account Setup Guide](https://cloud.google.com/iam/docs/service-accounts)