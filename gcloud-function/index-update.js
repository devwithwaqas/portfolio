/**
 * Portfolio GA4 Analytics UPDATE Function
 * Called by Cloud Scheduler hourly to fetch and cache analytics data
 * Stores results in Firestore for the read function to consume
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore
const firestore = new Firestore();
const COLLECTION_NAME = 'analytics_cache';
const DOCUMENT_ID = 'portfolio_stats';

// Configuration
const PROPERTY_ID = '519885223';
const BASE_TOTAL_VIEWS = 6234;
const SEED_VIEWS_PER_ITEM = 2435;

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
 * Fetch analytics data from GA4 and store in Firestore
 */
async function updateAnalyticsCache() {
  console.log('[UPDATE] Starting analytics cache update...');
  
  const analyticsDataClient = new BetaAnalyticsDataClient();
  const property = `properties/${PROPERTY_ID}`;

  try {
    // Request 1: Get total views
    console.log('[UPDATE] Fetching total views from GA4...');
    const [totalViewsResponse] = await analyticsDataClient.runReport({
      property,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [{ name: 'screenPageViews' }],
    });

    let totalViews = 0;
    if (totalViewsResponse.rows && totalViewsResponse.rows.length > 0) {
      totalViews = parseInt(totalViewsResponse.rows[0].metricValues[0].value || '0', 10);
    }
    totalViews += BASE_TOTAL_VIEWS;
    console.log(`[UPDATE] Total views: ${totalViews}`);

    // Request 2: Get top pages
    console.log('[UPDATE] Fetching top pages from GA4...');
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
        let views = parseInt(row.metricValues[0]?.value || '0', 10) + SEED_VIEWS_PER_ITEM;

        // Skip home page
        if (title && title.toLowerCase().includes('waqas ahmad - remote senior software engineer') && 
            !title.toLowerCase().includes('hire remote')) {
          continue;
        }

        // Match by title pattern
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

    console.log(`[UPDATE] Processed ${topItems.length} top items`);

    // Store in Firestore
    const data = {
      totalViews,
      topItems,
      lastUpdated: new Date().toISOString(),
      timestamp: Date.now()
    };

    await firestore.collection(COLLECTION_NAME).doc(DOCUMENT_ID).set(data);
    console.log('[UPDATE] ✅ Analytics data cached in Firestore successfully');

    return { success: true, data };
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
      message: 'Analytics cache updated successfully',
      lastUpdated: result.data.lastUpdated,
      totalViews: result.data.totalViews,
      topItemsCount: result.data.topItems.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update analytics cache',
      message: error.message || String(error)
    });
  }
};
