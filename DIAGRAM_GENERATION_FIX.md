# Diagram Generation Fix - Updated Method

## Issue Encountered
When generating PlantUML diagrams to SVG using Kroki.io API, the JSON POST method was failing with 400 Bad Request errors.

## Solution Found
Use the same method that successfully generated the BAT diagram - **POST with text/plain content type** instead of JSON.

## Working PowerShell Script Template

```powershell
# PowerShell script to generate SVG from PlantUML file
$pumlFile = "YourProject_C4_Diagram.puml"
$svgFile = "YourProject_C4_Diagram.svg"
$outputPath = "public/assets/diagrams/$svgFile"

# Read the PlantUML content
Write-Host "Reading PlantUML file: $pumlFile" -ForegroundColor Cyan
$pumlContent = Get-Content -Path $pumlFile -Raw -Encoding UTF8

# Make the API request with text/plain (NOT JSON!)
Write-Host "Generating SVG from PlantUML using Kroki.io..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "https://kroki.io/plantuml/svg" -Method POST -Body $pumlContent -ContentType "text/plain" -UseBasicParsing -TimeoutSec 120
    
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
```

## Key Differences

### ❌ Method that FAILED (JSON POST):
```powershell
$body = @{
    diagram_source = $encodedContent  # Base64 encoded
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri $apiUrl -Method Post -Body $body -ContentType "application/json"
```

### ✅ Method that WORKS (Text/Plain POST):
```powershell
$pumlContent = Get-Content -Path $pumlFile -Raw -Encoding UTF8

$response = Invoke-WebRequest -Uri "https://kroki.io/plantuml/svg" -Method POST -Body $pumlContent -ContentType "text/plain"
```

## Steps to Generate Diagram

1. **Create PlantUML file** (`YourProject_C4_Diagram.puml`)
   - Use exact same styling as G5_POS_C4_Diagram.puml
   - Include all color overrides BEFORE !include
   - Use packages for grouping containers
   - Use `-->` syntax with `note on link` for relationships

2. **Generate SVG** using the working script above

3. **Extract dimensions** from generated SVG:
   ```powershell
   $svg = Get-Content "public/assets/diagrams/YourProject_C4_Diagram.svg" -Raw
   if ($svg -match 'viewBox="0 0 (\d+) (\d+)"') {
       $width = $matches[1]
       $height = $matches[2]
       Write-Host "Dimensions: $width x $height"
   }
   ```

4. **Update Vue page** with correct dimensions:
   ```vue
   <DiagramViewer 
     diagram-src="/assets/diagrams/YourProject_C4_Diagram.svg"
     :svg-width="12143"
     :svg-height="7346"
   />
   ```

## Important Notes

- **Content-Type**: Must be `text/plain`, NOT `application/json`
- **Body**: Send raw PlantUML content directly, NOT base64 encoded JSON
- **Timeout**: Use `-TimeoutSec 120` for large diagrams
- **Encoding**: Always use UTF8 encoding

## Verification Checklist

- [ ] PlantUML file created with correct styling
- [ ] SVG file generated and saved to `public/assets/diagrams/`
- [ ] SVG dimensions extracted from viewBox
- [ ] Vue page updated with correct `:svg-width` and `:svg-height`
- [ ] Diagram displays correctly on page
