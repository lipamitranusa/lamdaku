# LAMDAKU Deployment Script
# PowerShell script untuk deployment otomatis

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("staging", "production")]
    [string]$Environment
)

Write-Host "🚀 LAMDAKU Deployment Script" -ForegroundColor Green
Write-Host "Environment: $Environment" -ForegroundColor Yellow

# Configuration
$ProjectPath = Get-Location
$BuildPath = Join-Path $ProjectPath "build"
$BackendPath = "d:\laragon\www\LAMDAKU\lamdaku-cms-backend"

# Environment-specific configuration
$Config = @{
    staging = @{
        FrontendUrl = "https://staging.lamdaku.com"
        ApiUrl = "https://staging-api.lamdaku.com/api/v1"
        DeployPath = "/var/www/staging.lamdaku.com"
        ServerHost = "staging-server.lamdaku.com"
    }
    production = @{
        FrontendUrl = "https://company.lamdaku.com"
        ApiUrl = "https://api.lamdaku.com/api/v1"
        DeployPath = "/var/www/company.lamdaku.com"
        ServerHost = "production-server.lamdaku.com"
    }
}

$EnvConfig = $Config[$Environment]

Write-Host "📋 Configuration:" -ForegroundColor Cyan
Write-Host "  Frontend URL: $($EnvConfig.FrontendUrl)" -ForegroundColor White
Write-Host "  API URL: $($EnvConfig.ApiUrl)" -ForegroundColor White
Write-Host "  Deploy Path: $($EnvConfig.DeployPath)" -ForegroundColor White

# Step 1: Clean previous build
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path $BuildPath) {
    Remove-Item -Recurse -Force $BuildPath
    Write-Host "✅ Previous build cleaned" -ForegroundColor Green
}

# Step 2: Set environment variables
Write-Host "⚙️ Setting environment variables..." -ForegroundColor Yellow
$env:NODE_ENV = $Environment
$env:REACT_APP_ENV = $Environment
$env:REACT_APP_API_URL = $EnvConfig.ApiUrl

Write-Host "✅ Environment variables set" -ForegroundColor Green

# Step 3: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green

# Step 4: Build application
Write-Host "🔨 Building application for $Environment..." -ForegroundColor Yellow
npm run "build:$Environment"
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build completed" -ForegroundColor Green

# Step 5: Validate build
Write-Host "🔍 Validating build..." -ForegroundColor Yellow
if (-not (Test-Path $BuildPath)) {
    Write-Host "❌ Build folder not found" -ForegroundColor Red
    exit 1
}

$IndexFile = Join-Path $BuildPath "index.html"
if (-not (Test-Path $IndexFile)) {
    Write-Host "❌ index.html not found in build" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build validation passed" -ForegroundColor Green

# Step 6: Create deployment package
Write-Host "📦 Creating deployment package..." -ForegroundColor Yellow
$DeploymentPackage = "lamdaku-frontend-$Environment-$(Get-Date -Format 'yyyyMMdd-HHmmss').zip"
$DeploymentPath = Join-Path $ProjectPath $DeploymentPackage

# Compress build folder
Compress-Archive -Path "$BuildPath\*" -DestinationPath $DeploymentPath -Force
Write-Host "✅ Deployment package created: $DeploymentPackage" -ForegroundColor Green

# Step 7: Generate deployment instructions
Write-Host "📝 Generating deployment instructions..." -ForegroundColor Yellow
$InstructionsFile = "deployment-instructions-$Environment.txt"
$Instructions = @"
LAMDAKU Deployment Instructions - $Environment
Generated: $(Get-Date)

1. Upload Files:
   - Upload and extract: $DeploymentPackage
   - Target location: $($EnvConfig.DeployPath)

2. Server Configuration:
   - Ensure web server points to: $($EnvConfig.DeployPath)
   - SSL certificate configured for: $($EnvConfig.FrontendUrl)

3. DNS Configuration:
   - Point domain to server IP
   - Verify: $($EnvConfig.FrontendUrl)

4. Backend API:
   - Ensure API is running at: $($EnvConfig.ApiUrl)
   - CORS configured for: $($EnvConfig.FrontendUrl)

5. Testing:
   - Test frontend: $($EnvConfig.FrontendUrl)
   - Test API: $($EnvConfig.ApiUrl)/services
   - Verify all pages load correctly

6. Post-deployment:
   - Clear browser cache
   - Test from different devices
   - Monitor error logs

Files included in package:
$(Get-ChildItem $BuildPath -Recurse | Select-Object -ExpandProperty Name | ForEach-Object { "  - $_" } | Out-String)

Environment Variables Used:
  NODE_ENV: $Environment
  REACT_APP_ENV: $Environment
  REACT_APP_API_URL: $($EnvConfig.ApiUrl)
"@

$Instructions | Out-File -FilePath $InstructionsFile -Encoding UTF8
Write-Host "✅ Instructions saved: $InstructionsFile" -ForegroundColor Green

# Step 8: Summary
Write-Host "🎉 Deployment preparation completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "  ✅ Build completed for $Environment" -ForegroundColor White
Write-Host "  ✅ Package created: $DeploymentPackage" -ForegroundColor White
Write-Host "  ✅ Instructions generated: $InstructionsFile" -ForegroundColor White
Write-Host ""
Write-Host "📤 Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Upload $DeploymentPackage to your server" -ForegroundColor White
Write-Host "  2. Extract to $($EnvConfig.DeployPath)" -ForegroundColor White
Write-Host "  3. Configure web server" -ForegroundColor White
Write-Host "  4. Test deployment" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Expected URLs:" -ForegroundColor Cyan
Write-Host "  Frontend: $($EnvConfig.FrontendUrl)" -ForegroundColor White
Write-Host "  API: $($EnvConfig.ApiUrl)" -ForegroundColor White
Write-Host ""
Write-Host "✨ Ready for deployment!" -ForegroundColor Green
