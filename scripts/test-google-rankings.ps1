# Google Rankings Test - PowerShell Wrapper
# Runs the Node.js crawling script and handles errors

$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Google Rankings Test - Web Crawling" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get test count from argument or use default
$testCount = if ($args[0]) { $args[0] } else { "10" }

Write-Host "Running Google rankings test for $testCount keywords..." -ForegroundColor Yellow
Write-Host ""

try {
    # Run the Node.js script
    node scripts/test-google-rankings-crawl.js $testCount
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "Test completed successfully!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Report saved to: scripts\.cache\google-rankings-crawl-report.json" -ForegroundColor Gray
    } else {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Yellow
        Write-Host "Test completed with warnings/errors" -ForegroundColor Yellow
        Write-Host "Check the output above for details" -ForegroundColor Yellow
        Write-Host "========================================" -ForegroundColor Yellow
    }
} catch {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Error running test:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    exit 1
}
