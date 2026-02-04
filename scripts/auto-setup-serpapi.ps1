# Auto Setup SerpAPI - Opens browser and guides through setup

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SerpAPI Auto Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Opening SerpAPI signup page..." -ForegroundColor Yellow
Start-Process "https://serpapi.com/users/sign_up"

Write-Host ""
Write-Host "Please complete signup and get your API key:" -ForegroundColor Cyan
Write-Host "  1. Sign up at the opened page" -ForegroundColor White
Write-Host "  2. Go to dashboard: https://serpapi.com/dashboard" -ForegroundColor White
Write-Host "  3. Copy your API key" -ForegroundColor White
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
    Write-Host "Both APIs are now configured:" -ForegroundColor Cyan
    Write-Host "  ✅ Google CSE API (with billing enabled)" -ForegroundColor Green
    Write-Host "  ✅ SerpAPI (handles CAPTCHA)" -ForegroundColor Green
    Write-Host ""
    Write-Host "To test:" -ForegroundColor Yellow
    Write-Host "  npm run test:rankings        (uses Google CSE)" -ForegroundColor White
    Write-Host "  npm run test:google-serpapi  (uses SerpAPI)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "   [WARN] Could not test connection: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "   But the key is saved. Try running: npm run test:google-serpapi" -ForegroundColor Yellow
}
