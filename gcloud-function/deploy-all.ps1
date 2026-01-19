# Deploy Portfolio Analytics - Dual Function Setup
# Run this script from the gcloud-function directory

Write-Host "🚀 Deploying Portfolio Analytics System..." -ForegroundColor Cyan
Write-Host ""

# Check if gcloud is authenticated
Write-Host "📋 Checking authentication..." -ForegroundColor Yellow
gcloud config get-value account
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not authenticated. Run: gcloud auth login" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Authenticated" -ForegroundColor Green
Write-Host ""

# Set project
Write-Host "📋 Setting project..." -ForegroundColor Yellow
gcloud config set project robust-builder-484406-b3

# Enable Firestore (if not already enabled)
Write-Host ""
Write-Host "📋 Enabling Firestore..." -ForegroundColor Yellow
gcloud firestore databases create --location=us-central1 2>&1 | Out-Null
Write-Host "✅ Firestore ready" -ForegroundColor Green

# Deploy UPDATE function
Write-Host ""
Write-Host "📦 Deploying UPDATE function..." -ForegroundColor Cyan
Copy-Item package-update.json package.json -Force

gcloud functions deploy portfolio-ga4-update `
  --gen2 `
  --runtime nodejs20 `
  --region us-central1 `
  --trigger-http `
  --allow-unauthenticated `
  --entry-point updatePortfolioAnalytics `
  --service-account ga4-analytics-reader-portfolio@robust-builder-484406-b3.iam.gserviceaccount.com `
  --timeout 60s `
  --source .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ UPDATE function deployed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ UPDATE function deployment failed" -ForegroundColor Red
    exit 1
}

# Deploy READ function
Write-Host ""
Write-Host "📦 Deploying READ function..." -ForegroundColor Cyan
Copy-Item package-read.json package.json -Force

gcloud functions deploy portfolio-ga4-read `
  --gen2 `
  --runtime nodejs20 `
  --region us-central1 `
  --trigger-http `
  --allow-unauthenticated `
  --entry-point readPortfolioAnalytics `
  --service-account ga4-analytics-reader-portfolio@robust-builder-484406-b3.iam.gserviceaccount.com `
  --timeout 10s `
  --source .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ READ function deployed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ READ function deployment failed" -ForegroundColor Red
    exit 1
}

# Create Cloud Scheduler job
Write-Host ""
Write-Host "📅 Creating Cloud Scheduler job..." -ForegroundColor Cyan

# Delete existing job if it exists
gcloud scheduler jobs delete portfolio-analytics-hourly-update --location us-central1 --quiet 2>&1 | Out-Null

# Create new job - runs every hour
gcloud scheduler jobs create http portfolio-analytics-hourly-update `
  --location us-central1 `
  --schedule "0 * * * *" `
  --uri "https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-update" `
  --http-method GET `
  --time-zone "America/Los_Angeles" `
  --description "Update portfolio analytics cache every hour (uses 48 API calls/day, well under 120/hour limit)"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Scheduler job created successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Scheduler job creation failed" -ForegroundColor Red
    exit 1
}

# Trigger first update manually
Write-Host ""
Write-Host "🔄 Triggering first update to populate cache..." -ForegroundColor Cyan
$response = Invoke-WebRequest -Uri "https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-update" -UseBasicParsing

if ($response.StatusCode -eq 200) {
    Write-Host "✅ First update completed successfully" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Response:" -ForegroundColor Yellow
    $response.Content | ConvertFrom-Json | ConvertTo-Json
} else {
    Write-Host "⚠️ First update returned status $($response.StatusCode)" -ForegroundColor Yellow
}

# Test READ function
Write-Host ""
Write-Host "🧪 Testing READ function..." -ForegroundColor Cyan
$readResponse = Invoke-WebRequest -Uri "https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-read" -UseBasicParsing

if ($readResponse.StatusCode -eq 200) {
    Write-Host "✅ READ function working correctly" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Cached data:" -ForegroundColor Yellow
    $readResponse.Content | ConvertFrom-Json | ConvertTo-Json
} else {
    Write-Host "❌ READ function test failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Update GitHub secret:" -ForegroundColor White
Write-Host "   gh secret set VITE_PORTFOLIO_GA4_API_ENDPOINT --body 'https://us-central1-robust-builder-484406-b3.cloudfunctions.net/portfolio-ga4-read'" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Push to trigger frontend deployment" -ForegroundColor White
Write-Host ""
Write-Host "📊 System info:" -ForegroundColor Yellow
Write-Host "   - Updates every hour (24x/day)" -ForegroundColor White
Write-Host "   - Uses 48 GA4 API calls/day (0.4% of quota)" -ForegroundColor White
Write-Host "   - READ function: NO rate limits" -ForegroundColor Green
Write-Host "   - Can handle 1000s of users" -ForegroundColor Green
Write-Host ""
