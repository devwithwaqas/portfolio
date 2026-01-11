# PowerShell script to generate BAT diagram SVG using Kroki.io
$pumlContent = Get-Content "BAT_InhouseApp_C4_Diagram.puml" -Raw
$response = Invoke-WebRequest -Uri "https://kroki.io/plantuml/svg" -Method POST -Body $pumlContent -ContentType "text/plain"
$response.Content | Out-File "BAT_InhouseApp_C4_Diagram.svg" -Encoding UTF8
Write-Host "SVG generated successfully: BAT_InhouseApp_C4_Diagram.svg"
