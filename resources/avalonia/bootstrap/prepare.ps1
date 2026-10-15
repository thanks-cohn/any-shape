$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")
$root = (Get-Location).Path
$cache = if ($env:AVALONIA_CACHE_DIR) { $env:AVALONIA_CACHE_DIR } else { Join-Path $root ".cache/avalonia" }
New-Item -ItemType Directory -Force -Path (Join-Path $cache "nuget"),(Join-Path $cache "logs") | Out-Null
$env:NUGET_PACKAGES = Join-Path $cache "nuget"
if (-not (Get-Command dotnet -ErrorAction SilentlyContinue)) { throw "Install a compatible .NET SDK first" }
dotnet --info | Set-Content (Join-Path $cache "logs/dotnet-info.txt")
$installed = (dotnet new list avalonia.xplat | Out-String)
if ($installed -notmatch "avalonia.xplat") { dotnet new install Avalonia.Templates::12.1.4 --nuget-source https://api.nuget.org/v3/index.json }
dotnet new list avalonia.xplat | Set-Content (Join-Path $cache "logs/templates.txt")
if ($LASTEXITCODE -ne 0) { throw "Could not check Avalonia template" }
if ($args -contains "--with-android") { dotnet workload install android; if ($LASTEXITCODE -ne 0) { throw "Android workload install failed" } }
Write-Host "Prepared reusable NuGet cache at $env:NUGET_PACKAGES. This is not proof of a working app."
