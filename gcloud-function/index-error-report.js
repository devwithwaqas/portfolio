/**
 * Portfolio Error Report Function
 * Receives client-side errors from Firebase-hosted app (handleError reportToBackend).
 * Logs to Cloud Logging so you can run: gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=portfolio-error-report" --limit=50 --format=json
 */

const ALLOWED_ORIGINS = [
  'https://waqasahmad-portfolio.web.app',
  'https://waqasahmad-portfolio.firebaseapp.com',
];

function getCorsHeaders(origin) {
  const o = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

exports.reportPortfolioError = async (req, res) => {
  const origin = req.headers.origin || '';
  const CORS = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    res.set(CORS);
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.set(CORS);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body || {};
    const message = body.message || '(no message)';
    const context = body.context || 'app';
    const url = body.url || '';
    const userAgent = body.userAgent || '';

    // Log to Cloud Logging (shows in gcloud logging read)
    console.error(JSON.stringify({
      severity: 'ERROR',
      message: `[Portfolio Error] ${context}: ${message}`,
      context,
      url,
      userAgent: userAgent.slice(0, 200),
      reportedAt: new Date().toISOString(),
    }));

    res.set(CORS);
    res.set('Content-Type', 'application/json');
    res.status(204).send('');
  } catch (e) {
    console.error('[portfolio-error-report] Handler error:', e);
    res.set(getCorsHeaders(req.headers.origin || ''));
    res.status(500).json({ error: 'Internal server error' });
  }
};
