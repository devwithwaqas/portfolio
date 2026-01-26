/**
 * Portfolio GA4 Analytics READ Function
 * ONLY reads from Firestore cache, NEVER calls GA4 API
 * Returns analytics for GitHub or Firebase based on request origin.
 * POST (tracking) sends to correct GA4 property (Measurement ID + API Secret) by origin.
 */

const { Firestore } = require('@google-cloud/firestore');

const ALLOWED_ORIGINS = [
  'https://waqasahmad-portfolio.web.app',
  'https://waqasahmad-portfolio.firebaseapp.com',
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

// GA4 tracking config by origin (Measurement ID + API Secret)
const TRACKING_CONFIG = {
  firebase: {
    measurementId: 'G-02TG7S6Z2V',
    apiSecret: 'CI49dz3qSHylJ1pHmOzLOg',
  },
  github: {
    measurementId: 'G-1HMMJLP7GK',
    apiSecret: 'p4SbgXEyTKOikyV8ZZACig',
  },
};

const FIREBASE_ORIGINS = [
  'https://waqasahmad-portfolio.web.app',
  'https://waqasahmad-portfolio.firebaseapp.com',
];

function isFirebaseOrigin(origin) {
  return FIREBASE_ORIGINS.includes(origin);
}

function getTrackingConfig(origin) {
  return isFirebaseOrigin(origin) ? TRACKING_CONFIG.firebase : TRACKING_CONFIG.github;
}

const firestore = new Firestore();
const COLLECTION_NAME = 'analytics_cache';
const DOCUMENT_ID = 'portfolio_stats';

function generateClientId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000000000) + 1000000000;
  return `${timestamp}.${random}`;
}

async function sendTrackingEvent(clientId, eventName, eventParams, pageLocation, pageTitle, config) {
  const { measurementId, apiSecret } = config;
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

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

exports.readPortfolioAnalytics = async (req, res) => {
  const origin = req.headers.origin || '';
  const CORS_HEADERS = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    res.set(CORS_HEADERS);
    res.status(204).send('');
    return;
  }

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
      const config = getTrackingConfig(origin);

      const result = await sendTrackingEvent(clientId, eventName, eventParams, pageLocation, pageTitle, config);

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

  if (req.method !== 'GET') {
    res.set(CORS_HEADERS);
    res.status(405).json({ error: 'Method not allowed. Use GET or POST.' });
    return;
  }

  try {
    const doc = await firestore.collection(COLLECTION_NAME).doc(DOCUMENT_ID).get();

    if (!doc.exists) {
      res.set(CORS_HEADERS);
      res.set('Content-Type', 'application/json');
      res.status(200).json({
        totalViews: 0,
        topItems: [],
        cached: true,
        lastUpdated: null,
        message: 'Waiting for first update from scheduler',
      });
      return;
    }

    const raw = doc.data();
    const key = isFirebaseOrigin(origin) ? 'firebase' : 'github';

    // New format: { github: {...}, firebase: {...} }
    const block = raw[key];
    if (block) {
      let totalViews = block.totalViews || 0;
      let topItems = block.topItems || [];

      // Firebase: combined total = Firebase + GitHub; use Firebase's own topItems (with seed applied in UPDATE).
      if (isFirebaseOrigin(origin)) {
        if (raw.github && raw.github.totalViews != null) {
          const ghTotal = raw.github.totalViews;
          const fbTotal = block.totalViews || 0;
          totalViews = fbTotal + ghTotal;
          // Use Firebase's own topItems (they already have seedViewsPerItem applied in UPDATE)
          // If Firebase has no items yet, fallback to GitHub's
          if (topItems.length === 0 && raw.github.topItems?.length > 0) {
            topItems = raw.github.topItems;
          }
        }
      }

      // Dedupe by url so same page never appears twice (e.g. /projects/X vs /portfolio/projects/X).
      const seen = new Set();
      topItems = topItems.filter((item) => {
        const u = (item && item.url) || '';
        if (seen.has(u)) return false;
        seen.add(u);
        return true;
      });

      res.set(CORS_HEADERS);
      res.set('Content-Type', 'application/json');
      res.status(200).json({
        totalViews,
        topItems,
        cached: true,
        lastUpdated: block.lastUpdated || null,
      });
      return;
    }

    // Legacy flat format (single property)
    if (raw.totalViews !== undefined && raw.topItems) {
      res.set(CORS_HEADERS);
      res.set('Content-Type', 'application/json');
      res.status(200).json({
        totalViews: raw.totalViews,
        topItems: raw.topItems,
        cached: true,
        lastUpdated: raw.lastUpdated || null,
      });
      return;
    }

    res.set(CORS_HEADERS);
    res.set('Content-Type', 'application/json');
    res.status(200).json({
      totalViews: 0,
      topItems: [],
      cached: true,
      lastUpdated: null,
      message: 'No data for this property yet',
    });
  } catch (error) {
    console.error('[READ] Error reading from Firestore:', error);
    res.set(CORS_HEADERS);
    res.set('Content-Type', 'application/json');
    res.status(500).json({
      error: 'Failed to read analytics cache',
      message: error.message || String(error),
    });
  }
};
