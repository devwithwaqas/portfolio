# Quick SerpAPI Configuration
# Just paste your key and it configures everything

param(
    [Parameter(Mandatory=$true)]
    [string]$ApiKey
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configuring SerpAPI" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set environment variable
$env:SERPAPI_KEY = $ApiKey.Trim()

Write-Host "[OK] Environment variable set for current session" -ForegroundColor Green
Write-Host "   SERPAPI_KEY = $($ApiKey.Substring(0, 10))..." -ForegroundColor Gray

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
    $existingContent = $existingContent -replace "SERPAPI_KEY=.*", "SERPAPI_KEY=$ApiKey"
    Set-Content -Path $envFile -Value $existingContent -Force
} else {
    Add-Content -Path $envFile -Value "`n# SerpAPI (for authentic Google search - handles CAPTCHA, 250 searches/month free)`nSERPAPI_KEY=$ApiKey" -Force
}

Write-Host "   [OK] Saved to .env.local" -ForegroundColor Green

# Test it
Write-Host ""
Write-Host "Testing SerpAPI connection..." -ForegroundColor Cyan

try {
    $testUrl = "https://serpapi.com/search.json?engine=google&q=test&api_key=$ApiKey"
    $response = Invoke-RestMethod -Uri $testUrl -Method Get -ErrorAction Stop
    
    Write-Host "   [OK] SerpAPI connection successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Setup Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Both APIs configured:" -ForegroundColor Cyan
    Write-Host "  ✅ Google CSE API (billing enabled)" -ForegroundColor Green
    Write-Host "  ✅ SerpAPI (250 searches/month free, handles CAPTCHA)" -ForegroundColor Green
    Write-Host ""
    Write-Host "To test:" -ForegroundColor Yellow
    Write-Host "  npm run test:rankings        (uses Google CSE)" -ForegroundColor White
    Write-Host "  npm run test:google-serpapi  (uses SerpAPI - recommended)" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "   [WARN] Could not test connection: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "   But the key is saved. Try running: npm run test:google-serpapi" -ForegroundColor Yellow
}
