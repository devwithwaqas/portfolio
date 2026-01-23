$endpoint = "https://us-central1-robust-builder-484406-b3.cloudfunctions.net/sendEmail"
$testPayload = @{
    name = "Test User"
    email = "test@example.com"
    subject = "Test from PowerShell"
    message = "Test message"
    timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    timezone = "Asia/Kuala_Lumpur"
    userAgent = "PowerShell"
    language = "en-US"
} | ConvertTo-Json
Write-Host "Testing OPTIONS..." -ForegroundColor Cyan
try { $opt = Invoke-WebRequest -Uri $endpoint -Method OPTIONS -ErrorAction SilentlyContinue; Write-Host "OPTIONS Status: $($opt.StatusCode)" -ForegroundColor Green; $opt.Headers | Where-Object { $_.Key -match "Access-Control" } | ForEach-Object { Write-Host "  $($_.Key) = $($_.Value)" -ForegroundColor Yellow } } catch { Write-Host "OPTIONS failed: $($_.Exception.Message)" -ForegroundColor Red }
Write-Host "`nTesting POST..." -ForegroundColor Cyan
try { $post = Invoke-WebRequest -Uri $endpoint -Method POST -Headers @{"Content-Type"="application/json"} -Body $testPayload; Write-Host "POST Status: $($post.StatusCode)" -ForegroundColor Green; Write-Host "Response: $($post.Content)" -ForegroundColor White } catch { Write-Host "POST failed: $($_.Exception.Message)" -ForegroundColor Red; if ($_.Exception.Response) { Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Yellow } }