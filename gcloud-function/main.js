/**
 * Unified entry for GCF 2nd gen. Re-exports all handlers so --entry-point works.
 * Framework loads this via package.json "main", then invokes the requested entry.
 * 
 * IMPORTANT: All exports must be set synchronously during module load.
 * The Functions Framework checks for exports immediately after requiring this module.
 */

// Load all modules synchronously - if any fail, the function won't be available
// but the container will still start (the export will be undefined, causing a clear error)
exports.portfolioAnalyticsAPI = require('./index.js').portfolioAnalyticsAPI;
exports.readPortfolioAnalytics = require('./index-read.js').readPortfolioAnalytics;
exports.updatePortfolioAnalytics = require('./index-update.js').updatePortfolioAnalytics;
exports.reportPortfolioError = require('./index-error-report.js').reportPortfolioError;
