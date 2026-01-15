<?php
/**
 * GA4 Analytics Data Fetcher
 * Fetches analytics stats (total views, top pages) from Google Analytics Data API
 * 
 * This file should be uploaded to your ProFreeHost server alongside ga4-track.php
 * 
 * SETUP REQUIRED:
 * 1. Get GA4 Property ID from Google Analytics
 * 2. Create Service Account in Google Cloud Console
 * 3. Download JSON key file and upload to your server (or store credentials in environment)
 * 4. Grant service account email access to GA4 property
 */

// Start output buffering to ensure headers are sent first
ob_start();

// Suppress errors for production
error_reporting(0);
ini_set('display_errors', 0);

// ============================================
// CORS Headers - Use specific domain (wildcard didn't work)
// ============================================
// Use specific domain instead of * (wildcard didn't work with your hosting)
// Set headers with explicit values
header('Access-Control-Allow-Origin: https://devwithwaqas.github.io', true);
header('Access-Control-Allow-Methods: GET, OPTIONS, POST', true);
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin, X-Requested-With, Authorization', true);
header('Access-Control-Allow-Credentials: false', true);
header('Access-Control-Max-Age: 86400', true);
header('Content-Type: application/json; charset=utf-8', true);

// Handle OPTIONS preflight request FIRST
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    header('Content-Length: 0', true);
    ob_end_flush();
    exit;
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use GET.']);
    exit;
}

// ============================================
// CONFIGURATION
// ============================================
// Your GA4 Property ID (numeric, e.g., '123456789')
// NOTE: This is DIFFERENT from Measurement ID (G-1HMMJLP7GK)
// Find it in: GA4 > Admin > Property Settings > Property ID (numeric)
$PROPERTY_ID = '519885223'; // Property ID for "Waqas Ahmad Portfolio"

// Path to service account JSON key file
// Option 1: Upload JSON file to server and set path (recommended for security)
$SERVICE_ACCOUNT_KEY_PATH = __DIR__ . '/ga4-service-account-key.json';

// Option 2: Store credentials as environment variable (if your host supports it)
// $SERVICE_ACCOUNT_CREDENTIALS = getenv('GA4_SERVICE_ACCOUNT_JSON');

// Cache duration (seconds) - Reduce API calls
$CACHE_DURATION = 300; // 5 minutes

// ============================================
// VALIDATION
// ============================================
if ($PROPERTY_ID === 'YOUR_PROPERTY_ID_HERE' || empty($PROPERTY_ID)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'GA4 Property ID not configured',
        'message' => 'Please set $PROPERTY_ID in ga4-analytics.php'
    ]);
    exit;
}

// Check if service account key file exists
if (!file_exists($SERVICE_ACCOUNT_KEY_PATH)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Service account key file not found',
        'message' => 'Please upload ga4-service-account-key.json to your server',
        'path_checked' => $SERVICE_ACCOUNT_KEY_PATH
    ]);
    exit;
}

// ============================================
// CACHING - Reduce API calls
// ============================================
$cacheFile = __DIR__ . '/ga4-analytics-cache.json';
$cacheExists = file_exists($cacheFile);
$cacheValid = false;

if ($cacheExists) {
    $cacheData = json_decode(file_get_contents($cacheFile), true);
    $cacheTime = $cacheData['timestamp'] ?? 0;
    $cacheValid = (time() - $cacheTime) < $CACHE_DURATION;
    
    if ($cacheValid) {
        // Return cached data
        echo json_encode([
            'totalViews' => $cacheData['totalViews'] ?? 0,
            'topItems' => $cacheData['topItems'] ?? [],
            'cached' => true
        ]);
        exit;
    }
}

// ============================================
// GET ACCESS TOKEN (OAuth 2.0)
// ============================================
function getAccessToken($serviceAccountKeyPath) {
    $keyData = json_decode(file_get_contents($serviceAccountKeyPath), true);
    
    if (!$keyData) {
        throw new Exception('Failed to parse service account key file');
    }
    
    $clientEmail = $keyData['client_email'] ?? '';
    $privateKey = $keyData['private_key'] ?? '';
    
    if (empty($clientEmail) || empty($privateKey)) {
        throw new Exception('Service account key missing client_email or private_key');
    }
    
    // Create JWT for OAuth 2.0
    $now = time();
    $jwtHeader = base64_encode(json_encode([
        'alg' => 'RS256',
        'typ' => 'JWT'
    ]));
    
    $jwtClaim = base64_encode(json_encode([
        'iss' => $clientEmail,
        'scope' => 'https://www.googleapis.com/auth/analytics.readonly',
        'aud' => 'https://oauth2.googleapis.com/token',
        'exp' => $now + 3600,
        'iat' => $now
    ]));
    
    // Sign JWT
    $signature = '';
    openssl_sign(
        $jwtHeader . '.' . $jwtClaim,
        $signature,
        $privateKey,
        OPENSSL_ALGO_SHA256
    );
    
    $jwtSignature = base64_encode($signature);
    $jwt = $jwtHeader . '.' . $jwtClaim . '.' . $jwtSignature;
    
    // Exchange JWT for access token
    $tokenUrl = 'https://oauth2.googleapis.com/token';
    $tokenData = [
        'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion' => $jwt
    ];
    
    $ch = curl_init($tokenUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($tokenData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Failed to get access token: HTTP $httpCode - $curlError - Response: $response");
    }
    
    $tokenData = json_decode($response, true);
    return $tokenData['access_token'] ?? '';
}

// ============================================
// FETCH ANALYTICS DATA FROM GA4
// ============================================
try {
    // Get access token
    $accessToken = getAccessToken($SERVICE_ACCOUNT_KEY_PATH);
    
    if (empty($accessToken)) {
        throw new Exception('Failed to obtain access token');
    }
    
    $apiUrl = "https://analyticsdata.googleapis.com/v1beta/properties/{$PROPERTY_ID}:runReport";
    
    // Request 1: Get total views (last 30 days)
    $totalViewsPayload = [
        'dateRanges' => [
            ['startDate' => '30daysAgo', 'endDate' => 'today']
        ],
        'metrics' => [
            ['name' => 'screenPageViews']
        ]
    ];
    
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($totalViewsPayload));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Failed to fetch total views: HTTP $httpCode - $response");
    }
    
    $totalViewsData = json_decode($response, true);
    $totalViews = (int)($totalViewsData['rows'][0]['metricValues'][0]['value'] ?? 0);
    
    // Add base value to total views
    $BASE_TOTAL_VIEWS = 6234;
    $totalViews = $totalViews + $BASE_TOTAL_VIEWS;
    
    // Request 2: Get top pages (all pages, last 30 days)
    // Filter out root path and common paths, prioritize projects/services but include all
    $topPagesPayload = [
        'dateRanges' => [
            ['startDate' => '30daysAgo', 'endDate' => 'today']
        ],
        'dimensions' => [
            ['name' => 'pagePath'],
            ['name' => 'pageTitle']
        ],
        'metrics' => [
            ['name' => 'screenPageViews']
        ],
        'dimensionFilter' => [
            'notExpression' => [
                'filter' => [
                    'fieldName' => 'pagePath',
                    'stringFilter' => [
                        'matchType' => 'EXACT',
                        'value' => '/'
                    ]
                ]
            ]
        ],
        'orderBys' => [
            [
                'metric' => [
                    'metricName' => 'screenPageViews'
                ],
                'desc' => true
            ]
        ],
        'limit' => 3
    ];
    
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($topPagesPayload));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Failed to fetch top pages: HTTP $httpCode - $response");
    }
    
    $topPagesData = json_decode($response, true);
    $topItems = [];
    
    if (isset($topPagesData['rows']) && is_array($topPagesData['rows'])) {
        // Seed value to add to each item's views
        $SEED_VIEWS_PER_ITEM = 2435;
        
        foreach ($topPagesData['rows'] as $row) {
            $path = $row['dimensionValues'][0]['value'] ?? '';
            $title = $row['dimensionValues'][1]['value'] ?? '';
            $views = (int)($row['metricValues'][0]['value'] ?? 0);
            
            // Add seed value to each item's views
            $views = $views + $SEED_VIEWS_PER_ITEM;
            
            // Extract name from title or path
            $name = $title;
            if (strpos($title, ' - ') !== false) {
                $name = explode(' - ', $title)[0];
            } elseif (empty($title)) {
                $name = basename($path);
                $name = str_replace('-', ' ', $name);
                $name = ucwords($name);
            }
            
            $topItems[] = [
                'name' => $name,
                'views' => $views,
                'url' => $path,
                'type' => strpos($path, '/projects/') === 0 ? 'project' : 'service'
            ];
        }
    }
    
    // Prepare response
    $result = [
        'totalViews' => $totalViews,
        'topItems' => $topItems,
        'cached' => false
    ];
    
    // Save to cache
    $cacheData = [
        'timestamp' => time(),
        'totalViews' => $totalViews,
        'topItems' => $topItems
    ];
    file_put_contents($cacheFile, json_encode($cacheData));
    
    // Return response
    echo json_encode($result);
    
} catch (Exception $e) {
    // Ensure CORS headers are sent even on error
    header('Access-Control-Allow-Origin: https://devwithwaqas.github.io', true);
    header('Access-Control-Allow-Methods: GET, OPTIONS, POST', true);
    header('Access-Control-Allow-Headers: Content-Type, Accept, Origin, X-Requested-With, Authorization', true);
    header('Content-Type: application/json; charset=utf-8', true);
    
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to fetch analytics data',
        'message' => $e->getMessage()
    ]);
}

// Flush output buffer
ob_end_flush();
?>