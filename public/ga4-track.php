<?php
/**
 * GA4 Server-Side Tracking Proxy
 * Bypasses ad blockers by sending data from your server
 * 
 * Setup Instructions:
 * 1. Upload this file to your PHP host (000webhost, InfinityFree, etc.)
 * 2. Get GA4 API Secret from GA4 Admin > Data Streams > Measurement Protocol API secrets
 * 3. Replace YOUR_API_SECRET_HERE below with your actual API secret
 * 4. Update VITE_GA4_PHP_ENDPOINT in GitHub Secrets with your PHP host URL
 * 
 * Usage: Your JavaScript will POST to this file with event data
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
$MEASUREMENT_ID = 'G-1HMMJLP7GK';
$API_SECRET = 'p4SbgXEyTKOikyV8ZZACig'; // ✅ API Secret configured

// ============================================
// VALIDATION
// ============================================
if ($API_SECRET === 'YOUR_API_SECRET_HERE') {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'API Secret not configured. Please update $API_SECRET in ga4-track.php'
    ]);
    exit;
}

// ============================================
// GET REQUEST DATA
// ============================================
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// ============================================
// EXTRACT EVENT DATA
// ============================================
$eventName = $data['event_name'] ?? 'page_view';
$eventParams = $data['event_params'] ?? [];
$clientId = $data['client_id'] ?? generateClientId();
$pageLocation = $data['page_location'] ?? '';
$pageTitle = $data['page_title'] ?? '';

// ============================================
// PREPARE GA4 MEASUREMENT PROTOCOL PAYLOAD
// ============================================
$payload = [
    'client_id' => $clientId,
    'events' => [[
        'name' => $eventName,
        'params' => array_merge($eventParams, [
            'page_location' => $pageLocation,
            'page_title' => $pageTitle,
            'engagement_time_msec' => 100
        ])
    ]]
];

// ============================================
// SEND TO GA4 MEASUREMENT PROTOCOL
// ============================================
$url = "https://www.google-analytics.com/mp/collect?measurement_id={$MEASUREMENT_ID}&api_secret={$API_SECRET}";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 5); // 5 second timeout

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// ============================================
// RETURN RESPONSE
// ============================================
if ($httpCode === 200 || $httpCode === 204) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'event' => $eventName,
        'client_id' => $clientId,
        'http_code' => $httpCode
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to send to GA4',
        'http_code' => $httpCode,
        'curl_error' => $curlError ?: null
    ]);
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function generateClientId() {
    // Generate a client ID (persistent identifier)
    // Format: timestamp.randomstring (e.g., 1705234567.abc123def456)
    return time() . '.' . mt_rand(1000000000, 9999999999);
}
?>
