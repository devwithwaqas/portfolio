# Create Custom Search Engine via API
# SECURITY: Never hardcode API keys. Use env var only.
# We recommend SerpAPI for ranking tests: npm run test:google-serpapi

$apiKey = $env:GOOGLE_API_KEY
if ([string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host "[ERROR] GOOGLE_API_KEY not set. Do not paste keys into scripts." -ForegroundColor Red
    Write-Host "For ranking tests we use SerpAPI. Run: npm run setup:serpapi then npm run test:google-serpapi" -ForegroundColor Yellow
    exit 1
}

Write-Host "Attempting to create Custom Search Engine (using GOOGLE_API_KEY from env)..." -ForegroundColor Cyan

$body = @{
    name = "Portfolio Keyword Test"
    description = "Custom Search Engine for Portfolio Keyword Ranking Tests"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://www.googleapis.com/customsearch/v1/engine/create?key=$apiKey" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "CSE Created: $($response.id)" -ForegroundColor Green
    return $response.id
} catch {
    Write-Host "API creation not available. CSE must be created via web interface." -ForegroundColor Yellow
    Write-Host "Please visit: https://cse.google.com/cse/all" -ForegroundColor Yellow
    return $null
}
