# 批量替换HTML文件中的busuanzi脚本引用
$workspaceDir = "c:\Users\shann\Desktop\linphone-young.github.io"
$files = Get-ChildItem -Path $workspaceDir -Recurse -Filter "*.html"

$oldPattern = 'src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"'
$newPattern = 'src="/js/busuanzi.pure.mini.js"'

$replacedCount = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    if ($content -match [regex]::Escape($oldPattern)) {
        $newContent = $content -replace [regex]::Escape($oldPattern), $newPattern
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "已替换文件: $($file.FullName)"
        $replacedCount++
    }
}

Write-Host "共替换了 $replacedCount 个文件"
