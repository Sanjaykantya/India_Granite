$marbleDir = "d:\My Projects\IndiaGranite\client\public\assets\New Granite photos\Premium Marble"
$graniteDir = "d:\My Projects\IndiaGranite\client\public\assets\New Granite photos\Granite"
$destDir = "d:\My Projects\IndiaGranite\client\public\assets"

# Copy Premium Marble photos
$files = Get-ChildItem $marbleDir -File | Sort-Object Name
$i = 1
foreach ($f in $files) {
    $ext = $f.Extension
    $dest = Join-Path $destDir "marble-$i$ext"
    Copy-Item $f.FullName -Destination $dest
    Write-Host "Copied marble: marble-$i$ext"
    $i++
}

# Copy Granite photos
$files2 = Get-ChildItem $graniteDir -File | Sort-Object Name
$j = 1
foreach ($f in $files2) {
    $ext = $f.Extension
    $dest = Join-Path $destDir "new-granite-$j$ext"
    Copy-Item $f.FullName -Destination $dest
    Write-Host "Copied granite: new-granite-$j$ext"
    $j++
}

Write-Host "Done! Copied $($i-1) marble photos and $($j-1) granite photos."
