# Complete Automated Setup for Google Custom Search API
# SECURITY: Never hardcode API keys. We recommend SerpAPI: npm run setup:serpapi then npm run test:google-serpapi

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Complete Google CSE API Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: API Key from env or prompt (never stored in script)
$apiKey = $env:GOOGLE_API_KEY
if ([string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host "GOOGLE_API_KEY not set. Paste your key (only in this session; we will not save it in repo):" -ForegroundColor Yellow
    $apiKey = Read-Host "   API Key"
}
if ([string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host "[ERROR] API key required. Or use SerpAPI: npm run setup:serpapi" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] API Key: $($apiKey.Substring(0, [Math]::Min(10, $apiKey.Length)))..." -ForegroundColor Green

# Step 2: Open browser for CSE creation
Write-Host ""
Write-Host "Step 2: Creating Custom Search Engine..." -ForegroundColor Cyan
Write-Host "   Opening browser to CSE creation page..." -ForegroundColor Gray

Start-Process "https://programmablesearchengine.google.com/controlpanel/create"

Write-Host ""
Write-Host "   Please complete the form in the browser:" -ForegroundColor Yellow
Write-Host "   1. Name: Portfolio Keyword Test" -ForegroundColor White
Write-Host "   2. Sites to search: Leave EMPTY (searches entire web)" -ForegroundColor White
Write-Host "   3. Click 'Create' or 'Next'" -ForegroundColor White
Write-Host "   4. Copy the Search Engine ID (CSE ID)" -ForegroundColor White
Write-Host "      It looks like: 017576662512468239146:omuauf_lfve" -ForegroundColor Gray
Write-Host "      Or find it in: Control Panel > Your Search Engine > Setup > Search Engine ID" -ForegroundColor Gray
Write-Host ""

$cseId = Read-Host "   Paste your CSE ID here"

if ([string]::IsNullOrWhiteSpace($cseId)) {
    Write-Host ""
    Write-Host "[ERROR] CSE ID is required. Exiting." -ForegroundColor Red
    exit 1
}

# Step 3: Set environment variables
Write-Host ""
Write-Host "Step 3: Setting Environment Variables..." -ForegroundColor Cyan

$env:GOOGLE_CSE_ID = $cseId.Trim()
$env:GOOGLE_API_KEY = $apiKey

Write-Host "   [OK] Environment variables set for current session" -ForegroundColor Green
Write-Host "   GOOGLE_CSE_ID = $cseId" -ForegroundColor Gray
Write-Host "   GOOGLE_API_KEY = $($apiKey.Substring(0, [Math]::Min(10, $apiKey.Length)))..." -ForegroundColor Gray

# Step 4: Save to .env.local
Write-Host ""
Write-Host "Step 4: Saving to .env.local..." -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$envFile = Join-Path $scriptDir ".." ".env.local"

$envContent = @"
# Google Custom Search API (for keyword ranking tests)
GOOGLE_CSE_ID=$cseId
GOOGLE_API_KEY=$apiKey
"@

Add-Content -Path $envFile -Value $envContent -Force
Write-Host "   [OK] Saved to .env.local" -ForegroundColor Green

# Step 5: Run test
Write-Host ""
Write-Host "Step 5: Running Keyword Ranking Test..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

npm run test:rankings

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[OK] Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To run tests in future sessions:" -ForegroundColor Cyan
Write-Host "   `$env:GOOGLE_CSE_ID = '$cseId'" -ForegroundColor White
Write-Host "   `$env:GOOGLE_API_KEY = '(set in .env.local only; never commit)'" -ForegroundColor White
Write-Host "   npm run test:rankings" -ForegroundColor White
Write-Host ""
Write-Host "Or use SerpAPI (recommended): npm run setup:serpapi then npm run test:google-serpapi" -ForegroundColor Gray
