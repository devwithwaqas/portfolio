# Quick HX-Inline Cleanup Tool
param(
    [string]$FilePath = "public/assets/js/hx-inline.js"
)

Write-Host "🧹 Quick HX-Inline Analysis" -ForegroundColor Cyan
Write-Host "===========================" -ForegroundColor Cyan

$content = Get-Content $FilePath -Raw
$lines = Get-Content $FilePath
$totalLines = $lines.Count

Write-Host "📊 Current State:" -ForegroundColor Yellow
Write-Host "   Total lines: $totalLines" -ForegroundColor White
Write-Host "   File size: $([math]::Round($content.Length / 1KB, 2)) KB" -ForegroundColor White

# Find all IIFE blocks (function() { ... })()
$iifeBlocks = @()
$currentBlock = $null
$braceCount = 0

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    $lineNumber = $i + 1
    
    # Start of IIFE
    if ($line -match "\(function \(\) \{" -and $currentBlock -eq $null) {
        $currentBlock = @{
            StartLine = $lineNumber
            EndLine = $null
            Content = @($line)
            Description = "IIFE Block"
        }
        $braceCount = 1
    }
    elseif ($currentBlock -ne $null) {
        $currentBlock.Content += $line
        
        # Count braces
        $openBraces = ($line.ToCharArray() | Where-Object { $_ -eq '{' }).Count
        $closeBraces = ($line.ToCharArray() | Where-Object { $_ -eq '}' }).Count
        $braceCount += $openBraces - $closeBraces
        
        # Block complete
        if ($braceCount -eq 0) {
            $currentBlock.EndLine = $lineNumber
            $iifeBlocks += $currentBlock
            $currentBlock = $null
        }
    }
}

Write-Host "`n🔍 Found $($iifeBlocks.Count) IIFE blocks:" -ForegroundColor Yellow

$totalUnusedLines = 0
$unusedBlocks = @()

foreach ($block in $iifeBlocks) {
    $blockContent = $block.Content -join "`n"
    $blockLines = $block.EndLine - $block.StartLine + 1
    
    # Check if block is used (has active functionality)
    $isUsed = $false
    
    # Look for active patterns
    if ($blockContent -match "window\.hxNarratorPro" -or
        $blockContent -match "console\.log.*Legacy.*disabled" -or
        $blockContent -match "return.*Exit early" -or
        $blockContent -match "TemplateLoader" -or
        $blockContent -match "Icon Engine" -or
        $blockContent -match "Diagram Narrator Pro") {
        $isUsed = $true
    }
    
    $status = if ($isUsed) { "✅ USED" } else { "❌ UNUSED" }
    $color = if ($isUsed) { "Green" } else { "Red" }
    
    Write-Host "   Lines $($block.StartLine)-$($block.EndLine): $status ($blockLines lines)" -ForegroundColor $color
    
    if (-not $isUsed) {
        $unusedBlocks += $block
        $totalUnusedLines += $blockLines
    }
}

Write-Host "`n📈 Cleanup Potential:" -ForegroundColor Yellow
Write-Host "   Unused blocks: $($unusedBlocks.Count)" -ForegroundColor White
Write-Host "   Lines to remove: $totalUnusedLines" -ForegroundColor White
Write-Host "   Remaining lines: $($totalLines - $totalUnusedLines)" -ForegroundColor White
Write-Host "   Size reduction: $([math]::Round(($totalUnusedLines / $totalLines) * 100, 1))%" -ForegroundColor White

# Show what would be removed
if ($unusedBlocks.Count -gt 0) {
    Write-Host "`n🗑️ Blocks to remove:" -ForegroundColor Red
    foreach ($block in $unusedBlocks) {
        $blockLines = $block.EndLine - $block.StartLine + 1
        Write-Host "   Lines $($block.StartLine)-$($block.EndLine): $blockLines lines" -ForegroundColor Red
    }
}

Write-Host "`n💡 Recommendation:" -ForegroundColor Cyan
if ($totalUnusedLines -gt 1000) {
    Write-Host "   🚨 MAJOR CLEANUP NEEDED - Remove $totalUnusedLines lines of unused code!" -ForegroundColor Red
} elseif ($totalUnusedLines -gt 500) {
    Write-Host "   ⚠️  Significant cleanup possible - Remove $totalUnusedLines lines" -ForegroundColor Yellow
} else {
    Write-Host "   ✅ File is relatively clean" -ForegroundColor Green
}

Write-Host "`n✅ Analysis complete!" -ForegroundColor Green
