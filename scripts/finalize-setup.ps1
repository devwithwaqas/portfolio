# Finalize Setup - Save credentials and test
# SECURITY: Do not hardcode API keys. We use SerpAPI for ranking tests (recommended).
# If you still use Google CSE, set GOOGLE_API_KEY and GOOGLE_CSE_ID in .env.local only (never commit).

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ranking test setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "We use SerpAPI for Google ranking tests (no Google API key in repo)." -ForegroundColor Green
Write-Host ""
Write-Host "To run ranking tests:" -ForegroundColor Cyan
Write-Host "  1. Get a key: https://serpapi.com/manage-api-key" -ForegroundColor White
Write-Host "  2. Run: npm run setup:serpapi" -ForegroundColor White
Write-Host "  3. Run: npm run test:google-serpapi" -ForegroundColor White
Write-Host ""
Write-Host "Or with env: `$env:SERPAPI_KEY='your-key'; npm run test:google-serpapi" -ForegroundColor Gray
Write-Host ""

npm run test:google-serpapi 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "SerpAPI key not set. Run: npm run setup:serpapi" -ForegroundColor Yellow
    exit 1
}
