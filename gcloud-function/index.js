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

// Whitelist of valid project/service pages with display names and title patterns
const VALID_PAGES = {
  // Projects - map both path and title patterns
  '/projects/heat-exchanger': { name: 'Heat Exchanger', titlePattern: /heat exchanger/i },
  '/projects/airasia-id90': { name: 'AirAsia ID90', titlePattern: /air asia.*id90|airasia.*id90/i },
  '/projects/bat-inhouse-app': { name: 'BAT Inhouse App', titlePattern: /bat inhouse/i },
  '/projects/pj-smart-city': { name: 'PJ Smart City', titlePattern: /pj smart city/i },
  '/projects/gamified-employee-management': { name: 'Gamified Employee Management', titlePattern: /gamified employee management/i },
  '/projects/valet-parking': { name: 'Valet Parking', titlePattern: /valet parking/i },
  '/projects/mobile-games': { name: 'Mobile Games', titlePattern: /mobile games/i },
  '/projects/uk-property-management': { name: 'UK Property Management', titlePattern: /u\.?k\.? property management/i },
  '/projects/g5-pos': { name: 'G5 POS', titlePattern: /g5 pos/i },
  '/projects/chubb-insurance-applications': { name: 'Chubb Insurance Applications', titlePattern: /chubb insurance/i },
  // Services - map both path and title patterns
  '/services/full-stack-development': { name: 'Full Stack Development', titlePattern: /full stack development/i },
  '/services/azure-cloud-architecture': { name: 'Azure Cloud Architecture', titlePattern: /azure cloud architecture/i },
  '/services/technical-leadership': { name: 'Technical Leadership', titlePattern: /technical leadership/i },
  '/services/microservices-architecture': { name: 'Microservices Architecture', titlePattern: /microservices architecture/i },
  '/services/agile-project-management': { name: 'Agile Project Management', titlePattern: /agile project management/i },
  '/services/database-design-optimization': { name: 'Database Design Optimization', titlePattern: /database design optimization/i },
  '/services/mobile-development': { name: 'Mobile Development', titlePattern: /mobile development/i }
};

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

  // Request 2: Get top pages - get ALL pages first, we'll filter in code
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
    // Remove dimension filter - get all pages and filter in code
    orderBys: [
      {
        metric: {
          metricName: 'screenPageViews',
        },
        desc: true,
      },
    ],
    limit: 20, // Get more items to have better chance of finding valid pages
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

      // Normalize path - remove trailing slashes and handle /portfolio/ prefix
      let normalizedPath = path.replace(/\/+$/, '');
      
      // Handle GitHub Pages base path - remove /portfolio if present
      if (normalizedPath.startsWith('/portfolio/')) {
        normalizedPath = normalizedPath.replace(/^\/portfolio/, '') || '/';
      }
      
      // Skip home page (exact matches or title contains "Waqas Ahmad" as main title)
      if (normalizedPath === '' || normalizedPath === '/' || normalizedPath === '/portfolio' ||
          (title && title.toLowerCase().includes('waqas ahmad') && !title.toLowerCase().includes('hire remote'))) {
        console.log(`❌ SKIPPED: Home page (path="${path}", normalized="${normalizedPath}", title="${title}")`);
        continue;
      }
      
      // Try to match by path first
      let pageInfo = VALID_PAGES[normalizedPath];
      let matchedPath = normalizedPath;
      
      // If path doesn't match, try to match by title pattern
      if (!pageInfo && title) {
        for (const [pagePath, info] of Object.entries(VALID_PAGES)) {
          if (info.titlePattern && info.titlePattern.test(title)) {
            pageInfo = info;
            matchedPath = pagePath;
            console.log(`✅ Matched by title pattern: "${title}" -> ${pagePath}`);
            break;
          }
        }
      }
      
      // If still not found, try path variations
      if (!pageInfo) {
        // Try with /portfolio prefix
        const withPortfolio = '/portfolio' + normalizedPath;
        pageInfo = VALID_PAGES[withPortfolio];
        if (pageInfo) matchedPath = withPortfolio;
      }
      
      if (!pageInfo) {
        console.log(`❌ SKIPPED: Not in whitelist (path="${path}", normalized="${normalizedPath}", title="${title}")`);
        continue;
      }
      
      // Stop after we have 3 valid items
      if (topItems.length >= 3) {
        console.log(`✅ Reached limit of 3 items, stopping`);
        break;
      }

      // Use normalized path without /portfolio for URL
      const urlPath = matchedPath.startsWith('/portfolio/') ? matchedPath.replace(/^\/portfolio/, '') : matchedPath;
      
      console.log(`✅ ADDING ITEM: name="${pageInfo.name}", path="${urlPath}", views=${views}`);
      topItems.push({
        name: pageInfo.name,
        views,
        url: urlPath,
        type: urlPath.startsWith('/projects/') ? 'project' : 'service',
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
