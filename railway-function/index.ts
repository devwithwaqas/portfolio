/**
 * GA4 Analytics Data Fetcher - Railway Function
 * TypeScript version for Railway Functions (Bun runtime)
 * 
 * This function fetches analytics stats (total views, top pages) from Google Analytics Data API
 */

// CORS Headers
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://devwithwaqas.github.io',
  'Access-Control-Allow-Methods': 'GET, OPTIONS, POST',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Origin, X-Requested-With, Authorization',
  'Access-Control-Allow-Credentials': 'false',
  'Access-Control-Max-Age': '86400',
  'Content-Type': 'application/json; charset=utf-8',
}

// Configuration from environment variables
const PROPERTY_ID = process.env.GA4_PROPERTY_ID || '519885223'
const SERVICE_ACCOUNT_JSON = process.env.GA4_SERVICE_ACCOUNT_JSON || ''
const BASE_TOTAL_VIEWS = 6234
const SEED_VIEWS_PER_ITEM = 2435
const CACHE_DURATION = 300 // 5 minutes

// In-memory cache (for Railway Functions, this resets on cold start)
let cache: { timestamp: number; data: any } | null = null

/**
 * Get OAuth 2.0 access token using service account JWT
 */
async function getAccessToken(serviceAccountJson: string): Promise<string> {
  const { SignJWT, importPKCS8 } = await import('jose')
  const keyData = JSON.parse(serviceAccountJson)
  const clientEmail = keyData.client_email
  const privateKey = keyData.private_key

  if (!clientEmail || !privateKey) {
    throw new Error('Service account key missing client_email or private_key')
  }

  // Import private key for jose library
  const { importPKCS8 } = await import('jose')
  const key = await importPKCS8(privateKey, 'RS256')

  // Create and sign JWT
  const jwt = await new SignJWT({
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
  })
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt()
    .setIssuer(clientEmail)
    .setAudience('https://oauth2.googleapis.com/token')
    .setExpirationTime('1h')
    .sign(key)

  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text()
    throw new Error(`Failed to get access token: HTTP ${tokenResponse.status} - ${errorText}`)
  }

  const tokenData = await tokenResponse.json()
  return tokenData.access_token
}

/**
 * Fetch analytics data from GA4
 */
async function fetchAnalyticsData(accessToken: string) {
  const apiUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`

  // Request 1: Get total views
  const totalViewsResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [{ name: 'screenPageViews' }],
    }),
  })

  if (!totalViewsResponse.ok) {
    const errorText = await totalViewsResponse.text()
    throw new Error(`Failed to fetch total views: HTTP ${totalViewsResponse.status} - ${errorText}`)
  }

  const totalViewsData = await totalViewsResponse.json()
  let totalViews = parseInt(totalViewsData.rows?.[0]?.metricValues?.[0]?.value || '0', 10)
  totalViews += BASE_TOTAL_VIEWS

  // Request 2: Get top pages
  const topPagesResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [{ name: 'screenPageViews' }],
      dimensionFilter: {
        notExpression: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: {
              matchType: 'EXACT',
              value: '/',
            },
          },
        },
      },
      orderBys: [
        {
          metric: { metricName: 'screenPageViews' },
          desc: true,
        },
      ],
      limit: 3,
    }),
  })

  if (!topPagesResponse.ok) {
    const errorText = await topPagesResponse.text()
    throw new Error(`Failed to fetch top pages: HTTP ${topPagesResponse.status} - ${errorText}`)
  }

  const topPagesData = await topPagesResponse.json()
  const topItems: any[] = []

  if (topPagesData.rows) {
    for (const row of topPagesData.rows) {
      const path = row.dimensionValues?.[0]?.value || ''
      const title = row.dimensionValues?.[1]?.value || ''
      let views = parseInt(row.metricValues?.[0]?.value || '0', 10)
      views += SEED_VIEWS_PER_ITEM

      let name = title
      if (title.includes(' - ')) {
        name = title.split(' - ')[0]
      } else if (!title) {
        name = path.split('/').pop() || path
        name = name.replace(/-/g, ' ')
        name = name.replace(/\b\w/g, (l: string) => l.toUpperCase())
      }

      topItems.push({
        name,
        views,
        url: path,
        type: path.startsWith('/projects/') ? 'project' : 'service',
      })
    }
  }

  return { totalViews, topItems }
}

/**
 * Main handler for Railway Function
 */
export default async function handler(req: Request): Promise<Response> {
  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Length': '0',
      },
    })
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed. Use GET.' }),
      {
        status: 405,
        headers: CORS_HEADERS,
      }
    )
  }

  try {
    // Validate configuration
    if (!PROPERTY_ID || PROPERTY_ID === 'YOUR_PROPERTY_ID_HERE') {
      throw new Error('GA4 Property ID not configured. Set GA4_PROPERTY_ID environment variable.')
    }

    if (!SERVICE_ACCOUNT_JSON) {
      throw new Error('Service account JSON not configured. Set GA4_SERVICE_ACCOUNT_JSON environment variable.')
    }

    // Check cache
    const now = Math.floor(Date.now() / 1000)
    if (cache && (now - cache.timestamp) < CACHE_DURATION) {
      return new Response(
        JSON.stringify({
          ...cache.data,
          cached: true,
        }),
        {
          status: 200,
          headers: CORS_HEADERS,
        }
      )
    }

    // Get access token
    const accessToken = await getAccessToken(SERVICE_ACCOUNT_JSON)
    if (!accessToken) {
      throw new Error('Failed to obtain access token')
    }

    // Fetch analytics data
    const { totalViews, topItems } = await fetchAnalyticsData(accessToken)

    const result = {
      totalViews,
      topItems,
      cached: false,
    }

    // Update cache
    cache = {
      timestamp: now,
      data: result,
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: CORS_HEADERS,
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch analytics data',
        message: error.message || String(error),
      }),
      {
        status: 500,
        headers: CORS_HEADERS,
      }
    )
  }
}
