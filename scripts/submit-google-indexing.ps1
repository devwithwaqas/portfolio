# Submit to Google Search Console and Request Indexing

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Google Indexing Submission Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Google Search Console" -ForegroundColor Cyan
Write-Host "  1. Go to: https://search.google.com/search-console" -ForegroundColor White
Write-Host "  2. Add property: waqasahmad-portfolio.web.app" -ForegroundColor White
Write-Host "  3. Verify ownership (HTML tag or DNS)" -ForegroundColor White
Write-Host ""

Write-Host "Step 2: Submit Sitemap" -ForegroundColor Cyan
Write-Host "  1. In Search Console, go to 'Sitemaps'" -ForegroundColor White
Write-Host "  2. Enter: sitemap.xml" -ForegroundColor White
Write-Host "  3. Click 'Submit'" -ForegroundColor White
Write-Host ""

Write-Host "Step 3: Request Indexing" -ForegroundColor Cyan
Write-Host "  1. Use 'URL Inspection' tool" -ForegroundColor White
Write-Host "  2. Enter: https://waqasahmad-portfolio.web.app/" -ForegroundColor White
Write-Host "  3. Click 'Request Indexing'" -ForegroundColor White
Write-Host ""

$open = Read-Host "Open Search Console in browser? (y/n)"
if ($open -eq "y" -or $open -eq "Y") {
    Start-Process "https://search.google.com/search-console"
}

Write-Host ""
Write-Host "Re-test in 3-7 days: npm run test:google-serpapi" -ForegroundColor Yellow
Write-Host "Check indexing: npm run check:indexing" -ForegroundColor Yellow
Write-Host ""
