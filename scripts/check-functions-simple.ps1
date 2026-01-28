# Simple function diagnostics - check exports and logs

$PROJECT_ID = "robust-builder-484406-b3"
$REGION = "us-central1"

Write-Host "=== Quick Function Check ===" -ForegroundColor Cyan
Write-Host ""

# Test local exports
Write-Host "1. Testing main.js exports..." -ForegroundColor Green
Push-Location "$PSScriptRoot\..\gcloud-function"
node -e "const m=require('./main.js'); const keys=Object.keys(m); console.log('OK'); keys.forEach(k => { if(typeof m[k] !== 'function') { console.error('FAIL:', k); process.exit(1); } });"
if ($LASTEXITCODE -eq 0) {
    Write-Host "  OK: All exports are functions" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Export check failed" -ForegroundColor Red
}
Pop-Location

Write-Host ""
Write-Host "2. Checking recent Function not defined errors..." -ForegroundColor Green
$filter = 'resource.type=cloud_run_revision AND textPayload=~"Function.*not defined"'
$errors = gcloud logging read $filter --limit=5 --format='value(textPayload)' --project=$PROJECT_ID 2>&1
if ($errors -and $errors -notmatch "Listed 0 items") {
    Write-Host "  Recent errors found:" -ForegroundColor Yellow
    $errors | Select-Object -First 5 | ForEach-Object { Write-Host "    $_" -ForegroundColor Yellow }
} else {
    Write-Host "  No recent Function not defined errors" -ForegroundColor Gray
}

Write-Host ""
Write-Host "3. Checking package.json..." -ForegroundColor Green
$pkgPath = "$PSScriptRoot\..\gcloud-function\package.json"
if (Test-Path $pkgPath) {
    $pkg = Get-Content $pkgPath | ConvertFrom-Json
    Write-Host "  Main: $($pkg.main)" -ForegroundColor Gray
    Write-Host "  Node: $($pkg.engines.node)" -ForegroundColor Gray
    if ($pkg.main -eq "main.js") {
        Write-Host "  OK: package.json configured correctly" -ForegroundColor Green
    }
}
if (-not (Test-Path $pkgPath)) {
    Write-Host "  FAIL: package.json not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Cyan
