# Create Custom Search Engine via API
# Note: This may not work as CSE creation typically requires web interface

$apiKey = "AIzaSyAmIX_YGbwJGtvazRucyq1ZDrnbvAWlTPQ"

Write-Host "Attempting to create Custom Search Engine..." -ForegroundColor Cyan

# Try to create CSE via REST API (if available)
# Note: Google Custom Search Engine creation is typically done via web interface
# But we can try to use the Custom Search API

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
