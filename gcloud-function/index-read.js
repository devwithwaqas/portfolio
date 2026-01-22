/**
 * Portfolio GA4 Analytics READ Function
 * ONLY reads from Firestore cache, NEVER calls GA4 API
 * No rate limits - can handle unlimited requests
 */

const { Firestore } = require('@google-cloud/firestore');

// CORS Headers - Allow both GitHub Pages and Firebase Hosting
const ALLOWED_ORIGINS = [
  'https://devwithwaqas.github.io',
  'https://portfolio-staging-test.web.app',
  'https://portfolio-staging-test.firebaseapp.com',
  'https://portfolio-test-4108729.web.app',
  'https://portfolio-test-4108729.firebaseapp.com'
];

function getCorsHeaders(origin) {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Origin, X-Requested-With',
    'Access-Control-Max-Age': '86400',
  };
}

// Configuration - Tracking
const MEASUREMENT_ID = 'G-1HMMJLP7GK';
const API_SECRET = 'p4SbgXEyTKOikyV8ZZACig';

// Initialize Firestore
const firestore = new Firestore();
const COLLECTION_NAME = 'analytics_cache';
const DOCUMENT_ID = 'portfolio_stats';

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
 * Cloud Function entry point - reads cached analytics data (GET) or handles tracking (POST)
 */
exports.readPortfolioAnalytics = async (req, res) => {
  const origin = req.headers.origin || '';
  const CORS_HEADERS = getCorsHeaders(origin);
  
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
      console.error('[READ] Error processing tracking request:', error);
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
    // Read from Firestore
    const doc = await firestore.collection(COLLECTION_NAME).doc(DOCUMENT_ID).get();
    
    if (!doc.exists) {
      // No cached data yet - return default
      console.log('[READ] No cached data found, returning defaults');
      res.set(CORS_HEADERS);
      res.set('Content-Type', 'application/json');
      res.status(200).json({
        totalViews: 0,
        topItems: [],
        cached: true,
        lastUpdated: null,
        message: 'Waiting for first update from scheduler'
      });
      return;
    }

    const data = doc.data();
    console.log(`[READ] Returning cached data (age: ${Math.round((Date.now() - data.timestamp) / 1000 / 60)} minutes)`);
    
    res.set(CORS_HEADERS);
    res.set('Content-Type', 'application/json');
    res.status(200).json({
      totalViews: data.totalViews || 0,
      topItems: data.topItems || [],
      cached: true,
      lastUpdated: data.lastUpdated
    });
  } catch (error) {
    console.error('[READ] Error reading from Firestore:', error);
    res.set(CORS_HEADERS);
    res.set('Content-Type', 'application/json');
    res.status(500).json({
      error: 'Failed to read analytics cache',
      message: error.message || String(error)
    });
  }
};
