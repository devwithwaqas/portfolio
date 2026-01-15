/**
 * Portfolio GA4 Analytics API - Google Cloud Function (2nd Gen)
 * Unified endpoint for both analytics data fetching (GET) and event tracking (POST)
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');

// CORS Headers
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://devwithwaqas.github.io',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Origin, X-Requested-With, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Configuration - Analytics
const PROPERTY_ID = '519885223';
const BASE_TOTAL_VIEWS = 6234;
const SEED_VIEWS_PER_ITEM = 2435;
const CACHE_DURATION = 300; // 5 minutes

// Configuration - Tracking
const MEASUREMENT_ID = 'G-1HMMJLP7GK';
const API_SECRET = 'p4SbgXEyTKOikyV8ZZACig';

// In-memory cache (resets on cold start)
let cache = null;

/**
 * Initialize Analytics Data API client
 * Uses Application Default Credentials (service account)
 */
function getAnalyticsClient() {
  return new BetaAnalyticsDataClient();
}

/**
 * Fetch analytics data from GA4
 */
async function fetchAnalyticsData() {
  const analyticsDataClient = getAnalyticsClient();
  const property = `properties/${PROPERTY_ID}`;

  // Request 1: Get total views
  const [totalViewsResponse] = await analyticsDataClient.runReport({
    property,
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

  let totalViews = 0;
  if (totalViewsResponse.rows && totalViewsResponse.rows.length > 0) {
    totalViews = parseInt(totalViewsResponse.rows[0].metricValues[0].value || '0', 10);
  }
  totalViews += BASE_TOTAL_VIEWS;

  // Request 2: Get top pages
  const [topPagesResponse] = await analyticsDataClient.runReport({
    property,
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
      notExpression: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: {
            matchType: 'EXACT',
            value: '/',
          },
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
    limit: 10, // Get more items since we filter some out
  });

  console.log(`GA4 returned ${topPagesResponse.rows?.length || 0} rows`);
  const topItems = [];

  if (topPagesResponse.rows) {
    console.log(`Processing ${topPagesResponse.rows.length} rows from GA4`);
    
    for (const row of topPagesResponse.rows) {
      const path = row.dimensionValues[0].value || '';
      const title = row.dimensionValues[1].value || '';
      let views = parseInt(row.metricValues[0].value || '0', 10);
      views += SEED_VIEWS_PER_ITEM;

      console.log(`Processing: path="${path}", title="${title}"`);

      // Normalize path for comparison - remove trailing slashes
      const normalizedPath = path.replace(/\/+$/, '').toLowerCase();
      
      // Skip home page and portfolio root paths (exact matches only)
      if (normalizedPath === '' || 
          normalizedPath === '/' || 
          normalizedPath === '/portfolio') {
        console.log(`Skipping home/portfolio: path="${path}"`);
        continue;
      }
      
      // Skip technical/internal files (index.html, .php files, etc.)
      if (path.includes('.html') || 
          path.includes('.php') || 
          path.includes('.js') ||
          path.includes('/index') ||
          path.includes('/ga4-') ||
          path.includes('/api/')) {
        console.log(`Skipping technical file: path="${path}"`);
        continue;
      }
      
      // Only process actual project or service pages
      if (!path.startsWith('/projects/') && !path.startsWith('/services/')) {
        console.log(`Skipping non-project/service page: path="${path}"`);
        continue;
      }

      let name = '';
      
      // Extract name from URL path (we know it's a project/service page now)
      const slug = path.split('/').filter(p => p).pop() || '';
      if (slug && slug.toLowerCase() !== 'portfolio') {
        // Remove file extensions if any
        const cleanSlug = slug.replace(/\.(html|php|js|json|xml|txt)$/i, '');
        name = cleanSlug
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());
        console.log(`Extracted name from URL: "${name}"`);
      }
      
      // Try to improve name from title if we have one
      if (title && name) {
        const titleCleaned = title.split(' - ')[0].trim();
        // Skip generic titles
        const genericTitles = ['Waqas Ahmad', 'Home', 'Portfolio', 'Main'];
        if (titleCleaned && 
            !genericTitles.includes(titleCleaned) && 
            titleCleaned.length > name.length && 
            !titleCleaned.startsWith('/') &&
            !titleCleaned.toLowerCase().includes('portfolio')) {
          // Use title if it's longer/more descriptive
          name = titleCleaned;
          console.log(`Using improved name from title: "${name}"`);
        }
      }
      
      // Final safety check - skip if name is still invalid
      if (!name || 
          name.toLowerCase() === 'portfolio' || 
          name.includes('/') || 
          name.includes('\\') ||
          name.length < 1 ||
          name.trim() === '') {
        console.log(`Final check failed - skipping: path="${path}", title="${title}", name="${name}"`);
        continue;
      }
      
      // Stop after we have 3 valid items
      if (topItems.length >= 3) {
        console.log(`Reached limit of 3 items, stopping`);
        break;
      }

      console.log(`Adding item: name="${name}", path="${path}", views=${views}`);
      topItems.push({
        name,
        views,
        url: path,
        type: path.startsWith('/projects/') ? 'project' : 'service',
      });
    }
  }

  console.log(`Returning ${topItems.length} top items`);

  return { totalViews, topItems };
}

/**
 * Generate a client ID for tracking
 */
function generateClientId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000000000) + 1000000000;
  return `${timestamp}.${random}`;
}

/**
 * Send event to GA4 Measurement Protocol (for tracking)
 */
async function sendTrackingEvent(clientId, eventName, eventParams, pageLocation, pageTitle) {
  const payload = {
    client_id: clientId,
    events: [{
      name: eventName,
      params: {
        ...eventParams,
        page_location: pageLocation,
        page_title: pageTitle,
        engagement_time_msec: 100,
      },
    }],
  };

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: response.ok,
      httpCode: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || String(error),
    };
  }
}

/**
 * Main Cloud Function handler - handles both analytics (GET) and tracking (POST)
 */
exports.portfolioAnalyticsAPI = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.set(CORS_HEADERS);
    res.status(204).send('');
    return;
  }

  // Handle POST requests (tracking)
  if (req.method === 'POST') {
    try {
      const data = req.body;

      if (!data || typeof data !== 'object') {
        res.set(CORS_HEADERS);
        res.set('Content-Type', 'application/json');
        res.status(400).json({ error: 'Invalid JSON data' });
        return;
      }

      const eventName = data.event_name || 'page_view';
      const eventParams = data.event_params || {};
      const clientId = data.client_id || generateClientId();
      const pageLocation = data.page_location || '';
      const pageTitle = data.page_title || '';

      const result = await sendTrackingEvent(clientId, eventName, eventParams, pageLocation, pageTitle);

      if (result.success) {
        res.set(CORS_HEADERS);
        res.set('Content-Type', 'application/json');
        res.status(200).json({
          success: true,
          event: eventName,
          client_id: clientId,
          http_code: result.httpCode,
        });
      } else {
        res.set(CORS_HEADERS);
        res.set('Content-Type', 'application/json');
        res.status(500).json({
          success: false,
          error: 'Failed to send to GA4',
          http_code: result.httpCode,
          message: result.error || result.statusText,
        });
      }
    } catch (error) {
      console.error('Error processing tracking request:', error);
      res.set(CORS_HEADERS);
      res.set('Content-Type', 'application/json');
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message || String(error),
      });
    }
    return;
  }

  // Handle GET requests (analytics data)
  if (req.method !== 'GET') {
    res.set(CORS_HEADERS);
    res.status(405).json({ error: 'Method not allowed. Use GET or POST.' });
    return;
  }

  try {
    // Check cache (allow bypass with ?nocache=true)
    const now = Math.floor(Date.now() / 1000);
    const bypassCache = req.query.nocache === 'true';
    
    if (!bypassCache && cache && (now - cache.timestamp) < CACHE_DURATION) {
      console.log('Returning cached data');
      res.set(CORS_HEADERS);
      res.set('Content-Type', 'application/json');
      res.status(200).json({
        ...cache.data,
        cached: true,
      });
      return;
    }
    
    if (bypassCache) {
      console.log('Cache bypass requested, fetching fresh data');
    }

    // Fetch analytics data
    const { totalViews, topItems } = await fetchAnalyticsData();

    const result = {
      totalViews,
      topItems,
      cached: false,
    };

    // Update cache
    cache = {
      timestamp: now,
      data: result,
    };

    res.set(CORS_HEADERS);
    res.set('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.set(CORS_HEADERS);
    res.set('Content-Type', 'application/json');
    res.status(500).json({
      error: 'Failed to fetch analytics data',
      message: error.message || String(error),
    });
  }
};
