/**
 * Portfolio GA4 Analytics UPDATE Function
 * Called by Cloud Scheduler hourly to fetch and cache analytics data
 * Fetches from BOTH GA4 properties (GitHub Pages + Firebase) and stores in Firestore
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore
const firestore = new Firestore();
const COLLECTION_NAME = 'analytics_cache';
const DOCUMENT_ID = 'portfolio_stats';

// GA4 configs per property
const GA4_CONFIG = {
  github: {
    propertyId: '519885223',
    baseTotalViews: 6234,
    seedViewsPerItem: 2435,
  },
  firebase: {
    propertyId: '521230752',
    baseTotalViews: 0,
    seedViewsPerItem: 0,
  },
};

// Whitelist of valid pages
const VALID_PAGES = {
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
  '/services/full-stack-development': { name: 'Full Stack Development', titlePattern: /full stack development/i },
  '/services/azure-cloud-architecture': { name: 'Azure Cloud Architecture', titlePattern: /azure cloud architecture/i },
  '/services/technical-leadership': { name: 'Technical Leadership', titlePattern: /technical leadership/i },
  '/services/microservices-architecture': { name: 'Microservices Architecture', titlePattern: /microservices architecture/i },
  '/services/agile-project-management': { name: 'Agile Project Management', titlePattern: /agile project management/i },
  '/services/database-design-optimization': { name: 'Database Design Optimization', titlePattern: /database design optimization/i },
  '/services/mobile-development': { name: 'Mobile Development', titlePattern: /mobile development/i }
};

/**
 * Fetch analytics for one GA4 property and return { totalViews, topItems }
 */
async function fetchForProperty(key) {
  const { propertyId, baseTotalViews, seedViewsPerItem } = GA4_CONFIG[key];
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

  const [topPagesResponse] = await analyticsDataClient.runReport({
    property,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
    metrics: [{ name: 'screenPageViews' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 20,
  });

  const topItems = [];
  if (topPagesResponse.rows && topPagesResponse.rows.length > 0) {
    for (const row of topPagesResponse.rows) {
      if (topItems.length >= 3) break;

      const path = row.dimensionValues[0]?.value || '';
      const title = row.dimensionValues[1]?.value || '';
      let views = parseInt(row.metricValues[0]?.value || '0', 10) + seedViewsPerItem;

      if (title && title.toLowerCase().includes('waqas ahmad - remote senior software engineer') &&
          !title.toLowerCase().includes('hire remote')) {
        continue;
      }

      let pageInfo = null;
      let matchedPath = null;
      for (const [pagePath, info] of Object.entries(VALID_PAGES)) {
        if (info.titlePattern && info.titlePattern.test(title)) {
          pageInfo = info;
          matchedPath = pagePath;
          break;
        }
      }

      if (pageInfo) {
        const urlPath = matchedPath.startsWith('/portfolio/') ? matchedPath.replace(/^\/portfolio/, '') : matchedPath;
        const isProject = urlPath.startsWith('/projects/');
        const displayName = isProject ? `Project: ${pageInfo.name}` : `Service: ${pageInfo.name}`;
        topItems.push({
          name: displayName,
          views,
          url: urlPath,
          type: isProject ? 'project' : 'service',
        });
      }
    }
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

    await firestore.collection(COLLECTION_NAME).doc(DOCUMENT_ID).set(data);
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
 * Cloud Function entry point - called by Cloud Scheduler
 */
exports.updatePortfolioAnalytics = async (req, res) => {
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
