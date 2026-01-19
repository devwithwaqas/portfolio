/**
 * Portfolio GA4 Analytics READ Function
 * ONLY reads from Firestore cache, NEVER calls GA4 API
 * No rate limits - can handle unlimited requests
 */

const { Firestore } = require('@google-cloud/firestore');

// CORS Headers
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://devwithwaqas.github.io',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Origin, X-Requested-With',
  'Access-Control-Max-Age': '86400',
};

// Initialize Firestore
const firestore = new Firestore();
const COLLECTION_NAME = 'analytics_cache';
const DOCUMENT_ID = 'portfolio_stats';

/**
 * Cloud Function entry point - reads cached analytics data
 */
exports.readPortfolioAnalytics = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.set(CORS_HEADERS);
    res.status(204).send('');
    return;
  }

  if (req.method !== 'GET') {
    res.set(CORS_HEADERS);
    res.status(405).json({ error: 'Method not allowed. Use GET.' });
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
