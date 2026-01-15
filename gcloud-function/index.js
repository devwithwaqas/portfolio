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
  
  // Log ALL rows from GA4 for debugging
  if (topPagesResponse.rows && topPagesResponse.rows.length > 0) {
    console.log('=== ALL GA4 ROWS ===');
    topPagesResponse.rows.forEach((row, idx) => {
      const p = row.dimensionValues[0]?.value || '';
      const t = row.dimensionValues[1]?.value || '';
      const v = row.metricValues[0]?.value || '0';
      console.log(`Row ${idx}: path="${p}", title="${t}", views=${v}`);
    });
    console.log('=== END GA4 ROWS ===');
  }
  
  const topItems = [];

  if (topPagesResponse.rows && topPagesResponse.rows.length > 0) {
    console.log(`Processing ${topPagesResponse.rows.length} rows from GA4`);
    
    for (const row of topPagesResponse.rows) {
      const path = row.dimensionValues[0]?.value || '';
      const title = row.dimensionValues[1]?.value || '';
      let views = parseInt(row.metricValues[0]?.value || '0', 10);
      views += SEED_VIEWS_PER_ITEM;

      console.log(`\n--- Processing row: path="${path}", title="${title}", views=${views} ---`);

      // Normalize path for comparison - remove trailing slashes
      const normalizedPath = path.replace(/\/+$/, '').toLowerCase();
      
      // Skip ONLY exact home page matches
      if (normalizedPath === '' || normalizedPath === '/' || normalizedPath === '/portfolio') {
        console.log(`❌ SKIPPED: Home page (exact match)`);
        continue;
      }
      
      // Skip technical files - but be more specific
      const isTechnicalFile = 
        path.toLowerCase().endsWith('.html') ||
        path.toLowerCase().endsWith('.php') ||
        path.toLowerCase().endsWith('.js') ||
        path.toLowerCase().endsWith('.json') ||
        path.toLowerCase().includes('/index.html') ||
        path.toLowerCase().includes('/ga4-') ||
        path.toLowerCase().includes('/api/');
        
      if (isTechnicalFile) {
        console.log(`❌ SKIPPED: Technical file`);
        continue;
      }

      // Extract name - be VERY permissive
      let name = '';
      
      // Method 1: Get last path segment
      const allParts = path.split('/').filter(p => p && p.trim() !== '');
      if (allParts.length > 0) {
        let lastPart = allParts[allParts.length - 1];
        // Remove file extensions
        lastPart = lastPart.replace(/\.(html|php|js|json|xml|txt|css|md)$/i, '');
        if (lastPart && lastPart.toLowerCase() !== 'portfolio' && lastPart.length > 0) {
          name = lastPart
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());
          console.log(`✅ Name from path segment: "${name}"`);
        }
      }
      
      // Method 2: Try title if path name is short or missing
      if ((!name || name.length < 3) && title) {
        const titleCleaned = title.split(' - ')[0].split(' | ')[0].trim();
        const genericTitles = ['Waqas Ahmad', 'Home', 'Portfolio', 'Main'];
        if (titleCleaned && 
            !genericTitles.includes(titleCleaned) && 
            titleCleaned.length > 2 && 
            !titleCleaned.startsWith('/') &&
            !titleCleaned.toLowerCase().includes('portfolio')) {
          name = titleCleaned;
          console.log(`✅ Name from title: "${name}"`);
        }
      }
      
      // Method 3: Use ANY non-empty path segment as fallback
      if (!name || name.trim() === '') {
        for (let i = allParts.length - 1; i >= 0; i--) {
          const part = allParts[i].replace(/\.(html|php|js|json|xml|txt|css|md)$/i, '');
          if (part && part.toLowerCase() !== 'portfolio' && part.length > 0) {
            name = part.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
            console.log(`✅ Name from fallback segment: "${name}"`);
            break;
          }
        }
      }
      
      // Final validation - be VERY lenient
      if (!name || name.trim() === '' || name.toLowerCase() === 'portfolio') {
        console.log(`❌ SKIPPED: No valid name extracted (name="${name}")`);
        continue;
      }
      
      // Stop after we have 3 valid items
      if (topItems.length >= 3) {
        console.log(`✅ Reached limit of 3 items, stopping`);
        break;
      }

      console.log(`✅ ADDING ITEM: name="${name}", path="${path}", views=${views}`);
      topItems.push({
        name,
        views,
        url: path,
        type: path.startsWith('/projects/') ? 'project' : 'service',
      });
    }
  } else {
    console.log('⚠️ WARNING: No rows returned from GA4!');
  }

  console.log(`\n=== FINAL RESULT: Returning ${topItems.length} top items ===`);
  if (topItems.length > 0) {
    topItems.forEach((item, idx) => {
      console.log(`  ${idx + 1}. ${item.name} (${item.views} views) - ${item.url}`);
    });
  }

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
