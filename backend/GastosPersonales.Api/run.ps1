#Requires -Version 5.1
$ErrorActionPreference = "Stop"

$ApiDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ApiDir

if (-not (Test-Path "appsettings.Development.json")) {
    Write-Host "Copia appsettings.Development.json.example y configura tu SQL Server:" -ForegroundColor Yellow
    Write-Host "  copy appsettings.Development.json.example appsettings.Development.json"
    exit 1
}

Write-Host "Iniciando API (SQL Server debe estar en este mismo PC)..." -ForegroundColor Green
dotnet run @args
