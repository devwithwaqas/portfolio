# Finalize Setup - Save credentials and test

$cseId = "142cf7cf7eb2f44ef"
$apiKey = "AIzaSyAmIX_YGbwJGtvazRucyq1ZDrnbvAWlTPQ"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Finalizing Google CSE API Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set environment variables
$env:GOOGLE_CSE_ID = $cseId
$env:GOOGLE_API_KEY = $apiKey

Write-Host "[OK] Environment variables set for current session" -ForegroundColor Green
Write-Host "   CSE ID: $cseId" -ForegroundColor Gray
Write-Host "   API Key: $($apiKey.Substring(0, 10))..." -ForegroundColor Gray

# Save to .env.local
Write-Host ""
Write-Host "Saving to .env.local..." -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$envFile = Join-Path $projectRoot ".env.local"

$envContent = @"
# Google Custom Search API (for keyword ranking tests)
GOOGLE_CSE_ID=$cseId
GOOGLE_API_KEY=$apiKey
"@

Set-Content -Path $envFile -Value $envContent -Force
Write-Host "   [OK] Saved to .env.local" -ForegroundColor Green

# Run test
Write-Host ""
Write-Host "Running Keyword Ranking Test..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

npm run test:rankings

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[OK] Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To run tests in future sessions:" -ForegroundColor Cyan
Write-Host "   `$env:GOOGLE_CSE_ID = '$cseId'" -ForegroundColor White
Write-Host "   `$env:GOOGLE_API_KEY = '$apiKey'" -ForegroundColor White
Write-Host "   npm run test:rankings" -ForegroundColor White
Write-Host ""
Write-Host "Or run: npm run setup:cse-finalize" -ForegroundColor Gray
