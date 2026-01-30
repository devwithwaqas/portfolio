# Setup Bing Web Search API (Alternative to Google CSE)
# Bing doesn't require "Search entire web" option and works immediately

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Bing Web Search API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Bing Web Search API Setup:" -ForegroundColor Yellow
Write-Host "1. Go to: https://www.microsoft.com/en-us/bing/apis/bing-web-search-api" -ForegroundColor White
Write-Host "2. Click 'Try now' or 'Get started'" -ForegroundColor White
Write-Host "3. Sign in with Microsoft account" -ForegroundColor White
Write-Host "4. Create a resource (choose 'Free' tier - 1,000 queries/month)" -ForegroundColor White
Write-Host "5. Copy the Subscription Key (API Key)" -ForegroundColor White
Write-Host ""

$bingKey = Read-Host "Paste your Bing API Key here"

if ([string]::IsNullOrWhiteSpace($bingKey)) {
    Write-Host ""
    Write-Host "[ERROR] Bing API key is required. Exiting." -ForegroundColor Red
    exit 1
}

# Set environment variable
$env:BING_API_KEY = $bingKey.Trim()

Write-Host ""
Write-Host "[OK] Environment variable set for current session" -ForegroundColor Green
Write-Host "   BING_API_KEY = $($bingKey.Substring(0, 10))..." -ForegroundColor Gray

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

# Add or update Bing API key
if ($existingContent -match "BING_API_KEY") {
    $existingContent = $existingContent -replace "BING_API_KEY=.*", "BING_API_KEY=$bingKey"
    Set-Content -Path $envFile -Value $existingContent -Force
} else {
    Add-Content -Path $envFile -Value "`n# Bing Web Search API (for keyword ranking tests)`nBING_API_KEY=$bingKey" -Force
}

Write-Host "   [OK] Saved to .env.local" -ForegroundColor Green

# Run test
Write-Host ""
Write-Host "Running Keyword Ranking Test with Bing API..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

npm run test:rankings

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[OK] Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To run tests in future sessions:" -ForegroundColor Cyan
Write-Host "   `$env:BING_API_KEY = '$bingKey'" -ForegroundColor White
Write-Host "   npm run test:rankings" -ForegroundColor White
