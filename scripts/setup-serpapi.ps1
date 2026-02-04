# SerpAPI Setup Script
# Guides user through getting SerpAPI key and setting it up

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SerpAPI Setup - Authentic Google Search API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "SerpAPI is an authentic Google search API service that:" -ForegroundColor Yellow
Write-Host "  ✅ Handles CAPTCHA automatically" -ForegroundColor Green
Write-Host "  ✅ Provides real Google search results" -ForegroundColor Green
Write-Host "  ✅ Free tier: 100 searches/month" -ForegroundColor Green
Write-Host "  ✅ No billing required for free tier" -ForegroundColor Green
Write-Host ""

Write-Host "Setup Steps:" -ForegroundColor Cyan
Write-Host "  1. Go to: https://serpapi.com/users/sign_up" -ForegroundColor White
Write-Host "  2. Sign up for free account" -ForegroundColor White
Write-Host "  3. Copy your API key from dashboard" -ForegroundColor White
Write-Host ""

$apiKey = Read-Host "Paste your SerpAPI key here"

if ([string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host ""
    Write-Host "[ERROR] API key is required. Exiting." -ForegroundColor Red
    exit 1
}

# Set environment variable
$env:SERPAPI_KEY = $apiKey.Trim()

Write-Host ""
Write-Host "[OK] Environment variable set for current session" -ForegroundColor Green
Write-Host "   SERPAPI_KEY = $($apiKey.Substring(0, 10))..." -ForegroundColor Gray

# Save to .env.local
Write-Host ""
Write-Host "Saving to .env.local..." -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$envFile = Join-Path $projectRoot ".env.local"

# Read existing content if file exists
$existingContent = ""
if (Test-Path $envFile) {
    $existingContent = Get-Content $envFile -Raw
}

# Add or update SerpAPI key
if ($existingContent -match "SERPAPI_KEY") {
    $existingContent = $existingContent -replace "SERPAPI_KEY=.*", "SERPAPI_KEY=$apiKey"
    Set-Content -Path $envFile -Value $existingContent -Force
} else {
    Add-Content -Path $envFile -Value "`n# SerpAPI (for authentic Google search - handles CAPTCHA)`nSERPAPI_KEY=$apiKey" -Force
}

Write-Host "   [OK] Saved to .env.local" -ForegroundColor Green

# Test it
Write-Host ""
Write-Host "Testing SerpAPI connection..." -ForegroundColor Cyan

try {
    $testUrl = "https://serpapi.com/search.json?engine=google&q=test&api_key=$apiKey"
    $response = Invoke-RestMethod -Uri $testUrl -Method Get -ErrorAction Stop
    
    Write-Host "   [OK] SerpAPI connection successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Setup Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "To run Google ranking tests:" -ForegroundColor Cyan
    Write-Host "   npm run test:google-serpapi" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "   [WARN] Could not test connection: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "   But the key is saved. Try running the test script." -ForegroundColor Yellow
}
