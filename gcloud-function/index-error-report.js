/**
 * Portfolio Error Report Function
 * Receives client-side errors from Firebase-hosted app (handleError reportToBackend).
 * Logs to Cloud Logging: gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=portfolio-error-report" --limit=50 --format=json
 * Security: strict origin, rate limit (5/min per IP), message length cap.
 */

const {
  isAllowedOrigin,
  getCorsHeaders,
  createRateLimiter,
} = require('./security');

const limiter = createRateLimiter({ windowMs: 60_000, max: 5 });
const MAX_MESSAGE_LENGTH = 1000;
const MAX_CONTEXT_LENGTH = 64;
const MAX_URL_LENGTH = 2048;
const MAX_USER_AGENT_LENGTH = 500;

function corsJson(res, origin, status, body) {
  const h = getCorsHeaders(origin, undefined, {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.set(h);
  res.set('Content-Type', 'application/json');
  res.status(status).json(body);
}

exports.reportPortfolioError = async (req, res) => {
  const origin = req.headers.origin || '';
  const CORS = getCorsHeaders(origin, undefined, {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  if (req.method === 'OPTIONS') {
    res.set(CORS);
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    corsJson(res, origin, 405, { error: 'Method not allowed' });
    return;
  }

  if (!isAllowedOrigin(origin)) {
    corsJson(res, origin, 403, { error: 'Origin not allowed' });
    return;
  }

  const { allowed, retryAfter } = limiter.check(req);
  if (!allowed) {
    res.set(CORS);
    res.set('Content-Type', 'application/json');
    if (retryAfter != null) res.set('Retry-After', String(retryAfter));
    res.status(429).json({ error: 'Too many requests' });
    return;
  }

  try {
    const body = req.body || {};
    let message = (body.message && String(body.message)) || '(no message)';
    let context = (body.context && String(body.context)) || 'app';
    let url = (body.url && String(body.url)) || '';
    let userAgent = (body.userAgent && String(body.userAgent)) || '';

    if (message.length > MAX_MESSAGE_LENGTH) message = message.slice(0, MAX_MESSAGE_LENGTH) + '...';
    if (context.length > MAX_CONTEXT_LENGTH) context = context.slice(0, MAX_CONTEXT_LENGTH);
    if (url.length > MAX_URL_LENGTH) url = url.slice(0, MAX_URL_LENGTH);
    if (userAgent.length > MAX_USER_AGENT_LENGTH) userAgent = userAgent.slice(0, MAX_USER_AGENT_LENGTH);

    console.error(JSON.stringify({
      severity: 'ERROR',
      message: `[Portfolio Error] ${context}: ${message}`,
      context,
      url,
      userAgent,
      reportedAt: new Date().toISOString(),
    }));

    res.set(CORS);
    res.set('Content-Type', 'application/json');
    res.status(204).send('');
  } catch (e) {
    console.error('[portfolio-error-report] Handler error:', e);
    res.set(getCorsHeaders(req.headers.origin || '', undefined, {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }));
    res.status(500).json({ error: 'Internal server error' });
  }
};
