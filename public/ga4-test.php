<?php
/**
 * Simple test file to verify PHP is working and CORS headers are being sent
 * Upload this to your server and test in Postman
 */

// Start output buffering
ob_start();

// Set CORS headers
header('Access-Control-Allow-Origin: https://devwithwaqas.github.io');
header('Access-Control-Allow-Methods: GET, OPTIONS, POST');
header('Access-Control-Allow-Headers: Content-Type, Accept, Origin, X-Requested-With, Authorization');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

// Handle OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    header('Content-Length: 0');
    ob_end_clean();
    exit;
}

// Return simple JSON response
$response = [
    'status' => 'success',
    'message' => 'PHP is working!',
    'method' => $_SERVER['REQUEST_METHOD'],
    'timestamp' => date('Y-m-d H:i:s'),
    'server_info' => [
        'php_version' => PHP_VERSION,
        'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
    ],
    'headers_sent' => headers_sent(),
    'cors_headers' => [
        'Access-Control-Allow-Origin' => 'https://devwithwaqas.github.io',
        'Access-Control-Allow-Methods' => 'GET, OPTIONS, POST'
    ]
];

echo json_encode($response, JSON_PRETTY_PRINT);
ob_end_flush();
?>
