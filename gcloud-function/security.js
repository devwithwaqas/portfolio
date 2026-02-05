/**
 * Shared security helpers for portfolio Cloud Functions.
 * - Rate limiting (in-memory per instance)
 * - Strict origin validation (reject disallowed origins)
 */

const ALLOWED_ORIGINS = [
  'https://waqasahmad-portfolio.web.app',
  'https://waqasahmad-portfolio.firebaseapp.com',
  'https://ragnorx-waqas.web.app',
  'https://ragnorx-waqas.firebaseapp.com',
  'https://waqas.ragnorx.com',
];

/**
 * Get client IP from request (Cloud Run / GCF use X-Forwarded-For).
 * @param {object} req
 * @returns {string}
 */
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }
  return req.connection?.remoteAddress || req.socket?.remoteAddress || 'unknown';
}

/**
 * Create a rate limiter. In-memory per instance; resets on cold start.
 * @param {{ windowMs: number, max: number }} opts - windowMs: window length, max: max requests per window per IP
 * @returns {{ check: (req) => { allowed: boolean, retryAfter?: number } }}
 */
function createRateLimiter(opts) {
  const { windowMs = 60_000, max = 60 } = opts;
  const store = new Map(); // ip -> { count, resetAt }

  function prune() {
    const now = Date.now();
    for (const [ip, v] of store.entries()) {
      if (v.resetAt <= now) store.delete(ip);
    }
  }

  return {
    check(req) {
      prune();
      const ip = getClientIp(req);
      const now = Date.now();
      let entry = store.get(ip);
      if (!entry) {
        entry = { count: 0, resetAt: now + windowMs };
        store.set(ip, entry);
      }
      if (now >= entry.resetAt) {
        entry.count = 0;
        entry.resetAt = now + windowMs;
      }
      entry.count += 1;
      const allowed = entry.count <= max;
      const retryAfter = allowed ? undefined : Math.ceil((entry.resetAt - now) / 1000);
      return { allowed, retryAfter };
    },
  };
}

/**
 * Check if origin is allowed.
 * @param {string} origin
 * @param {string[]} [allowed]
 * @returns {boolean}
 */
function isAllowedOrigin(origin, allowed = ALLOWED_ORIGINS) {
  return typeof origin === 'string' && allowed.includes(origin);
}

/**
 * Get CORS headers for an allowed origin. Use first allowed if origin not passed.
 * @param {string} [origin]
 * @param {string[]} [allowed]
 * @param {object} [extras]
 * @returns {object}
 */
function getCorsHeaders(origin, allowed = ALLOWED_ORIGINS, extras = {}) {
  const o = isAllowedOrigin(origin, allowed) ? origin : allowed[0];
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Origin, X-Requested-With, Authorization, X-API-Key',
    'Access-Control-Max-Age': '86400',
    ...extras,
  };
}

module.exports = {
  ALLOWED_ORIGINS,
  getClientIp,
  createRateLimiter,
  isAllowedOrigin,
  getCorsHeaders,
};
