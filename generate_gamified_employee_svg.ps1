# PowerShell script to generate SVG from PlantUML file for Gamified Employee Management C4 Diagram
# Uses Kroki.io API to convert PlantUML to SVG

$pumlFile = "GamifiedEmployeeManagement_C4_Diagram.puml"
$svgFile = "GamifiedEmployeeManagement_C4_Diagram.svg"
$outputPath = "public/assets/diagrams/$svgFile"

# Read the PlantUML content
Write-Host "Reading PlantUML file: $pumlFile" -ForegroundColor Cyan
$pumlContent = Get-Content -Path $pumlFile -Raw -Encoding UTF8

# Encode to base64
$bytes = [System.Text.Encoding]::UTF8.GetBytes($pumlContent)
$encodedContent = [Convert]::ToBase64String($bytes)

# Prepare the API request
$apiUrl = "https://kroki.io/plantuml/svg"
$body = @{
    diagram_source = $encodedContent
} | ConvertTo-Json

# Make the API request
Write-Host "Generating SVG from PlantUML using Kroki.io..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri $apiUrl -Method Post -Body $body -ContentType "application/json" -UseBasicParsing
    
    if ($response.StatusCode -eq 200) {
        # Create output directory if it doesn't exist
        $outputDir = Split-Path -Path $outputPath -Parent
        if (-not (Test-Path $outputDir)) {
            New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
            Write-Host "Created directory: $outputDir" -ForegroundColor Green
        }
        
        # Save the SVG
        $response.Content | Out-File -FilePath $outputPath -Encoding UTF8 -NoNewline
        Write-Host "SVG generated successfully!" -ForegroundColor Green
        Write-Host "Output file: $outputPath" -ForegroundColor Green
        
        # Get file size
        $fileInfo = Get-Item $outputPath
        Write-Host "File size: $([math]::Round($fileInfo.Length / 1KB, 2)) KB" -ForegroundColor Yellow
    } else {
        Write-Host "Error: API returned status code $($response.StatusCode)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Error generating SVG: $_" -ForegroundColor Red
    Write-Host "Error details: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "`nDiagram generation complete!" -ForegroundColor Green
