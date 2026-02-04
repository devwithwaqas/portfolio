/**
 * Portfolio GA4 Analytics UPDATE Function
 * Called by Cloud Scheduler hourly to fetch and cache analytics data
 * Fetches from BOTH GA4 properties (GitHub Pages + Firebase) and stores in Firestore
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const { Firestore } = require('@google-cloud/firestore');

const COLLECTION_NAME = 'analytics_cache';
const DOCUMENT_ID = 'portfolio_stats';

let firestoreInstance = null;
function getFirestore() {
  if (!firestoreInstance) {
    firestoreInstance = new Firestore();
  }
  return firestoreInstance;
}

// Per-rank seeds for top 3 items: 1st -> 1346, 2nd -> 2217, 3rd -> 3845
const SEED_PER_RANK = [1346, 2217, 3845];

// GA4 configs per property
const GA4_CONFIG = {
  github: {
    propertyId: '519885223',
    baseTotalViews: 6234,
  },
  firebase: {
    propertyId: '521230752',
    baseTotalViews: 0,
  },
};

/**
 * Humanize slug from path: "heat-exchanger" -> "Heat Exchanger"
 */
function humanizeSlug(slug) {
  if (!slug || typeof slug !== 'string') return 'Unknown';
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Normalize path: strip query string, /portfolio prefix, and trailing slash.
 * /portfolio/projects/heat-exchanger?foo=1 -> /projects/heat-exchanger
 * Ensures /projects/X and /portfolio/projects/X (and variants) collapse to one.
 */
function normalizePath(path) {
  if (!path || typeof path !== 'string') return '';
  let p = path.split('?')[0].replace(/\/+$/, '').trim();
  if (p.startsWith('/portfolio/')) p = p.replace(/^\/portfolio/, '') || '/';
  else if (p === '/portfolio') p = '/';
  return p || '/';
}

/**
 * Fetch analytics for one GA4 property and return { totalViews, topItems }
 * - Total views: all page views (/, /portfolio, /projects/*, /services/*, etc.)
 * - Top 3: only /projects/* and /services/*; name extracted from path (Project: X, Service: X).
 *   Home (/, /portfolio) never appears in top 3.
 */
async function fetchForProperty(key) {
  const { propertyId, baseTotalViews } = GA4_CONFIG[key];
  const analyticsDataClient = new BetaAnalyticsDataClient();
  const property = `properties/${propertyId}`;

  const [totalViewsResponse] = await analyticsDataClient.runReport({
    property,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    metrics: [{ name: 'screenPageViews' }],
  });

  let totalViews = 0;
  if (totalViewsResponse.rows && totalViewsResponse.rows.length > 0) {
    totalViews = parseInt(totalViewsResponse.rows[0].metricValues[0].value || '0', 10);
  }
  totalViews += baseTotalViews;

  // Only fetch project/service pages (exclude home). Firebase uses /, GitHub uses /portfolio/
  const dimensionFilter = {
    orGroup: {
      expressions: [
        { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'BEGINS_WITH', value: '/projects/' } } },
        { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'BEGINS_WITH', value: '/services/' } } },
        { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'BEGINS_WITH', value: '/portfolio/projects/' } } },
        { filter: { fieldName: 'pagePath', stringFilter: { matchType: 'BEGINS_WITH', value: '/portfolio/services/' } } },
      ],
    },
  };

  const [topPagesResponse] = await analyticsDataClient.runReport({
    property,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
    metrics: [{ name: 'screenPageViews' }],
    dimensionFilter,
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 50,
  });

  console.log(`[UPDATE/${key}] GA4 returned ${topPagesResponse.rows?.length || 0} rows`);
  
  // Log ALL rows from GA4 for debugging (especially for Firebase which is new)
  if (topPagesResponse.rows && topPagesResponse.rows.length > 0) {
    console.log(`[UPDATE/${key}] === ALL GA4 ROWS ===`);
    topPagesResponse.rows.forEach((row, idx) => {
      const p = row.dimensionValues[0]?.value || '';
      const t = row.dimensionValues[1]?.value || '';
      const v = row.metricValues[0]?.value || '0';
      console.log(`[UPDATE/${key}] Row ${idx}: path="${p}", title="${t}", views=${v}`);
    });
    console.log(`[UPDATE/${key}] === END GA4 ROWS ===`);
  }
  
  const topItems = [];
  if (topPagesResponse.rows && topPagesResponse.rows.length > 0) {
    console.log(`[UPDATE/${key}] Processing ${topPagesResponse.rows.length} rows from GA4`);

    // Group by normalized path, sum raw views (same page: /projects/X and /portfolio/projects/X)
    const byPath = new Map();

    for (const row of topPagesResponse.rows) {
      const path = row.dimensionValues[0]?.value || '';
      const rawViews = parseInt(row.metricValues[0]?.value || '0', 10);

      const norm = normalizePath(path);
      if (!norm || norm === '/') continue;

      const isProject = norm.startsWith('/projects/');
      const isService = norm.startsWith('/services/');
      if (!isProject && !isService) continue;

      const slug = norm.split('/').filter(Boolean).slice(1).join('/');
      const name = humanizeSlug(slug);
      const displayName = isProject ? `Project: ${name}` : `Service: ${name}`;

      console.log(`[UPDATE/${key}] path="${path}" -> norm="${norm}", slug="${slug}", rawViews=${rawViews}`);

      if (byPath.has(norm)) {
        const prev = byPath.get(norm);
        prev.rawViews += rawViews;
        byPath.set(norm, prev);
      } else {
        byPath.set(norm, { displayName, rawViews, url: norm, type: isProject ? 'project' : 'service' });
      }
    }

    // Sort by rawViews desc, take top 3. Add per-rank seed (1346, 2217, 3845).
    // Dedupe by url (norm) so we never have same page twice.
    const seen = new Set();
    const sorted = [...byPath.values()].sort((a, b) => b.rawViews - a.rawViews);
    for (const item of sorted) {
      if (topItems.length >= 3) break;
      if (seen.has(item.url)) continue;
      seen.add(item.url);
      const rank = topItems.length;
      const seed = SEED_PER_RANK[rank] ?? SEED_PER_RANK[0];
      const views = item.rawViews + seed;
      topItems.push({ name: item.displayName, views, url: item.url, type: item.type });
      console.log(`[UPDATE/${key}] ✅ ADDING #${rank + 1}: ${item.displayName} (${views} = ${item.rawViews} + ${seed}) ${item.url}`);
    }
  } else {
    console.log(`[UPDATE/${key}] ⚠️ WARNING: No rows returned from GA4!`);
  }

  console.log(`[UPDATE/${key}] === FINAL RESULT: ${topItems.length} top items ===`);
  if (topItems.length > 0) {
    topItems.forEach((item, idx) => {
      console.log(`[UPDATE/${key}]   ${idx + 1}. ${item.name} (${item.views} views) - ${item.url}`);
    });
  }

  return { totalViews, topItems };
}

/**
 * Fetch from both GA4 properties and store in Firestore
 */
async function updateAnalyticsCache() {
  console.log('[UPDATE] Starting analytics cache update (both properties)...');

  const now = new Date().toISOString();
  const ts = Date.now();

  try {
    const [githubResult, firebaseResult] = await Promise.all([
      fetchForProperty('github'),
      fetchForProperty('firebase'),
    ]);

    const data = {
      github: {
        totalViews: githubResult.totalViews,
        topItems: githubResult.topItems,
        lastUpdated: now,
        timestamp: ts,
      },
      firebase: {
        totalViews: firebaseResult.totalViews,
        topItems: firebaseResult.topItems,
        lastUpdated: now,
        timestamp: ts,
      },
    };

    await getFirestore().collection(COLLECTION_NAME).doc(DOCUMENT_ID).set(data);
    console.log('[UPDATE] ✅ Cached both GitHub and Firebase analytics');

    return {
      success: true,
      data: {
        github: { totalViews: data.github.totalViews, topItemsCount: data.github.topItems.length },
        firebase: { totalViews: data.firebase.totalViews, topItemsCount: data.firebase.topItems.length },
        lastUpdated: now,
      },
    };
  } catch (error) {
    console.error('[UPDATE] ❌ Error updating analytics cache:', error);
    throw error;
  }
}

/**
 * Cloud Function entry point - called by Cloud Scheduler.
 * Security: if SCHEDULER_SECRET env is set, requires X-Scheduler-Secret header to match.
 * Configure Cloud Scheduler job to send that header; set Secret Manager or env var.
 */
exports.updatePortfolioAnalytics = async (req, res) => {
  const secret = process.env.SCHEDULER_SECRET;
  if (secret) {
    const header = req.get('X-Scheduler-Secret') || req.get('x-scheduler-secret') || '';
    if (header !== secret) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid or missing X-Scheduler-Secret',
      });
      return;
    }
  }

  try {
    const result = await updateAnalyticsCache();
    res.status(200).json({
      success: true,
      message: 'Analytics cache updated (GitHub + Firebase)',
      lastUpdated: result.data.lastUpdated,
      ...result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update analytics cache',
      message: error.message || String(error),
    });
  }
};
