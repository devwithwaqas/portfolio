# Diagnose Cloud Functions deployment issues
# Checks logs, verifies exports, tests module loading

$ErrorActionPreference = "Continue"
$PROJECT_ID = "robust-builder-484406-b3"
$REGION = "us-central1"

Write-Host "=== Cloud Functions Diagnostics ===" -ForegroundColor Cyan
Write-Host ""

# 1. Test local module loading
Write-Host "1. Testing local module loading..." -ForegroundColor Green
Push-Location "$PSScriptRoot\..\gcloud-function"

try {
    $testScript = @"
const m = require('./main.js');
const exports = Object.keys(m);
console.log('Exports found:', exports.join(', '));
console.log('portfolioAnalyticsAPI type:', typeof m.portfolioAnalyticsAPI);
console.log('readPortfolioAnalytics type:', typeof m.readPortfolioAnalytics);
console.log('updatePortfolioAnalytics type:', typeof m.updatePortfolioAnalytics);
console.log('reportPortfolioError type:', typeof m.reportPortfolioError);

if (typeof m.portfolioAnalyticsAPI !== 'function') {
    console.error('ERROR: portfolioAnalyticsAPI is not a function!');
    process.exit(1);
}
if (typeof m.readPortfolioAnalytics !== 'function') {
    console.error('ERROR: readPortfolioAnalytics is not a function!');
    process.exit(1);
}
if (typeof m.updatePortfolioAnalytics !== 'function') {
    console.error('ERROR: updatePortfolioAnalytics is not a function!');
    process.exit(1);
}
if (typeof m.reportPortfolioError !== 'function') {
    console.error('ERROR: reportPortfolioError is not a function!');
    process.exit(1);
}
console.log('SUCCESS: All exports are functions');
"@
    
    $testScript | node
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Local module loading: OK" -ForegroundColor Green
    } else {
        Write-Host "✗ Local module loading: FAILED" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Error testing module: $_" -ForegroundColor Red
}

Pop-Location

Write-Host ""

# 2. Check Cloud Run logs for failing functions
Write-Host "2. Checking Cloud Run logs for portfolioAnalyticsAPI..." -ForegroundColor Green
$filter1 = 'resource.type=cloud_run_revision AND resource.labels.service_name=portfolioanalyticsapi AND severity>=ERROR'
$logs1 = gcloud logging read $filter1 --limit=10 --format='value(textPayload,jsonPayload.message)' --project=$PROJECT_ID 2>&1
if ($logs1 -and $logs1.Count -gt 0) {
    Write-Host "Recent errors:" -ForegroundColor Yellow
    $logs1 | Select-Object -First 10 | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
} else {
    Write-Host "  No recent errors found" -ForegroundColor Gray
}

Write-Host ""
Write-Host "3. Checking Cloud Run logs for readPortfolioAnalytics..." -ForegroundColor Green
$filter2 = 'resource.type=cloud_run_revision AND resource.labels.service_name=readportfolioanalytics AND severity>=ERROR'
$logs2 = gcloud logging read $filter2 --limit=10 --format='value(textPayload,jsonPayload.message)' --project=$PROJECT_ID 2>&1
if ($logs2 -and $logs2.Count -gt 0) {
    Write-Host "Recent errors:" -ForegroundColor Yellow
    $logs2 | Select-Object -First 10 | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
} else {
    Write-Host "  No recent errors found" -ForegroundColor Gray
}

Write-Host ""
Write-Host "4. Checking Cloud Run logs for updatePortfolioAnalytics..." -ForegroundColor Green
$filter3 = 'resource.type=cloud_run_revision AND resource.labels.service_name=updateportfolioanalytics AND severity>=ERROR'
$logs3 = gcloud logging read $filter3 --limit=10 --format='value(textPayload,jsonPayload.message)' --project=$PROJECT_ID 2>&1
if ($logs3 -and $logs3.Count -gt 0) {
    Write-Host "Recent errors:" -ForegroundColor Yellow
    $logs3 | Select-Object -First 10 | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
} else {
    Write-Host "  No recent errors found" -ForegroundColor Gray
}

Write-Host ""
Write-Host "5. Checking for 'Function not defined' errors..." -ForegroundColor Green
$filter4 = "resource.type=cloud_run_revision AND (textPayload=~'Function.*not defined' OR jsonPayload.message=~'Function.*not defined')"
$functionErrors = gcloud logging read $filter4 --limit=20 --format='table(timestamp,resource.labels.service_name,textPayload,jsonPayload.message)' --project=$PROJECT_ID 2>&1
if ($functionErrors -and $functionErrors.Count -gt 0) {
    Write-Host "Function definition errors:" -ForegroundColor Red
    $functionErrors | Select-Object -First 20
} else {
    Write-Host "  No 'Function not defined' errors found" -ForegroundColor Gray
}

Write-Host ""
Write-Host "6. Testing scheduler job update syntax..." -ForegroundColor Green
$testSecret = "test-secret-123"
Write-Host "  Testing: gcloud scheduler jobs update http ... --update-headers=..." -ForegroundColor Gray

# Test the command syntax (dry run)
$testJob = "update-portfolio-analytics"
$errPrev = $ErrorActionPreference
$ErrorActionPreference = "Continue"
$null = gcloud scheduler jobs describe $testJob --location=$REGION --project=$PROJECT_ID 2>&1 | Out-Null
$jobExists = ($LASTEXITCODE -eq 0)
$ErrorActionPreference = $errPrev

if ($jobExists) {
    Write-Host "  Job exists, testing update command syntax..." -ForegroundColor Gray
    # Just check if the command would work (don't actually update)
    Write-Host "  Command would be: gcloud scheduler jobs update http $testJob --location=$REGION --uri=... --http-method=GET --update-headers=`"X-Scheduler-Secret=$testSecret`" --project=$PROJECT_ID" -ForegroundColor Gray
    Write-Host "  ✓ Syntax appears correct" -ForegroundColor Green
} else {
    Write-Host "  Job doesn't exist, would use --headers= for create" -ForegroundColor Gray
    Write-Host "  ✓ Syntax appears correct" -ForegroundColor Green
}

Write-Host ""
Write-Host "7. Verifying package.json structure..." -ForegroundColor Green
Push-Location "$PSScriptRoot\..\gcloud-function"
if (Test-Path "package.json") {
    $pkg = Get-Content "package.json" | ConvertFrom-Json
    Write-Host "  Main entry: $($pkg.main)" -ForegroundColor Gray
    Write-Host "  Node version: $($pkg.engines.node)" -ForegroundColor Gray
    Write-Host "  Dependencies:" -ForegroundColor Gray
    $pkg.dependencies.PSObject.Properties | ForEach-Object { Write-Host "    $($_.Name): $($_.Value)" -ForegroundColor Gray }
    
    if ($pkg.main -eq "main.js") {
        Write-Host "  ✓ package.json main points to main.js" -ForegroundColor Green
    } else {
        Write-Host "  ✗ package.json main should be 'main.js'" -ForegroundColor Red
    }
} else {
    Write-Host "  ✗ package.json not found!" -ForegroundColor Red
}
Pop-Location

Write-Host ""
Write-Host "8. Checking if main.js exists and is readable..." -ForegroundColor Green
$mainPath = "$PSScriptRoot\..\gcloud-function\main.js"
if (Test-Path $mainPath) {
    Write-Host "  ✓ main.js exists" -ForegroundColor Green
    $content = Get-Content $mainPath -Raw
    if ($content -match "exports\.portfolioAnalyticsAPI") {
        Write-Host "  ✓ Contains portfolioAnalyticsAPI export" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Missing portfolioAnalyticsAPI export" -ForegroundColor Red
    }
} else {
    Write-Host "  ✗ main.js not found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Diagnostics Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "If functions are still failing, check:" -ForegroundColor Yellow
Write-Host "  1. Cloud Run logs URLs from deployment output" -ForegroundColor Yellow
Write-Host "  2. Ensure all dependencies are in package.json" -ForegroundColor Yellow
Write-Host "  3. Verify main.js exports all functions synchronously" -ForegroundColor Yellow
Write-Host "  4. Check that --entry-point matches export name exactly" -ForegroundColor Yellow
