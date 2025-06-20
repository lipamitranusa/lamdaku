# HOSTINGER DEPLOYMENT SCRIPT - LAMDAKU.COM
# PowerShell script untuk deployment ke Hostinger

param(
    [switch]$BuildOnly,
    [switch]$ZipOnly
)

Write-Host "🌐 HOSTINGER DEPLOYMENT - LAMDAKU.COM" -ForegroundColor Green
Write-Host "Domain: lamdaku.com" -ForegroundColor Yellow
Write-Host "API: api.lamdaku.com" -ForegroundColor Yellow

# Configuration
$ProjectPath = Get-Location
$BuildPath = Join-Path $ProjectPath "build"
$BackendPath = "d:\laragon\www\LAMDAKU\lamdaku-cms-backend"
$DeploymentFolder = Join-Path $ProjectPath "hostinger-deployment"

# Create deployment folder
if (Test-Path $DeploymentFolder) {
    Remove-Item -Recurse -Force $DeploymentFolder
}
New-Item -ItemType Directory -Path $DeploymentFolder | Out-Null

Write-Host "📋 Hostinger Configuration:" -ForegroundColor Cyan
Write-Host "  Frontend: https://lamdaku.com" -ForegroundColor White
Write-Host "  Backend API: https://api.lamdaku.com/api/v1" -ForegroundColor White
Write-Host "  Deployment Folder: $DeploymentFolder" -ForegroundColor White

# Step 1: Clean previous build
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path $BuildPath) {
    Remove-Item -Recurse -Force $BuildPath
    Write-Host "✅ Previous build cleaned" -ForegroundColor Green
}

# Step 2: Set production environment for Hostinger
Write-Host "⚙️ Setting Hostinger production environment..." -ForegroundColor Yellow
$env:NODE_ENV = "production"
$env:REACT_APP_ENV = "production"
$env:REACT_APP_API_URL = "https://api.lamdaku.com/api/v1"

Write-Host "✅ Environment variables set for Hostinger" -ForegroundColor Green

# Step 3: Install dependencies and build
if (-not $ZipOnly) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed" -ForegroundColor Green

    # Step 4: Build for production
    Write-Host "🔨 Building React application for Hostinger..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ React build completed" -ForegroundColor Green

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
}

if ($BuildOnly) {
    Write-Host "🎉 Build completed! Check the 'build' folder." -ForegroundColor Green
    exit 0
}

# Step 6: Prepare Frontend for Hostinger
Write-Host "📁 Preparing frontend files for Hostinger..." -ForegroundColor Yellow
$FrontendDeployPath = Join-Path $DeploymentFolder "public_html"
New-Item -ItemType Directory -Path $FrontendDeployPath | Out-Null

# Copy build files to deployment folder
Copy-Item -Path "$BuildPath\*" -Destination $FrontendDeployPath -Recurse -Force

# Create .htaccess for React Router
$HtaccessContent = @"
RewriteEngine On

# Handle React Router (SPA)
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api
RewriteRule . /index.html [L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"
Header always set X-Content-Type-Options "nosniff"

# Cache static assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public"
</FilesMatch>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css
    AddOutputFilterByType DEFLATE application/xml application/xhtml+xml application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript application/x-javascript
</IfModule>
"@

$HtaccessPath = Join-Path $FrontendDeployPath ".htaccess"
$HtaccessContent | Out-File -FilePath $HtaccessPath -Encoding UTF8
Write-Host "✅ Frontend files prepared with .htaccess" -ForegroundColor Green

# Step 7: Prepare Backend for Hostinger
Write-Host "📁 Preparing backend files for Hostinger..." -ForegroundColor Yellow
$BackendDeployPath = Join-Path $FrontendDeployPath "api"
New-Item -ItemType Directory -Path $BackendDeployPath | Out-Null

# Copy Laravel files (exclude node_modules, vendor, storage/logs)
$ExcludeItems = @("node_modules", "vendor", ".git", "storage\logs", "storage\framework\cache", "storage\framework\sessions", "storage\framework\views")

Get-ChildItem -Path $BackendPath | Where-Object { 
    $_.Name -notin $ExcludeItems 
} | Copy-Item -Destination $BackendDeployPath -Recurse -Force

# Create production .env for Hostinger
$ProductionEnv = @"
APP_NAME="LAMDAKU CMS"
APP_ENV=production
APP_KEY=base64:GENERATE_NEW_KEY_ON_SERVER
APP_DEBUG=false
APP_URL=https://api.lamdaku.com

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
PHP_CLI_SERVER_WORKERS=4
BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

# Database (Update with Hostinger credentials)
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_lamdaku
DB_USERNAME=u123456789_user
DB_PASSWORD=YOUR_DATABASE_PASSWORD_HERE

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=.lamdaku.com

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync

CACHE_STORE=file
CACHE_PREFIX=lamdaku

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Mail (Update with your email settings)
MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=noreply@lamdaku.com
MAIL_PASSWORD=YOUR_EMAIL_PASSWORD
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@lamdaku.com
MAIL_FROM_NAME="LAMDAKU"

# CORS untuk frontend
FRONTEND_URL=https://lamdaku.com
SANCTUM_STATEFUL_DOMAINS=lamdaku.com
"@

$EnvPath = Join-Path $BackendDeployPath ".env"
$ProductionEnv | Out-File -FilePath $EnvPath -Encoding UTF8

Write-Host "✅ Backend files prepared with production .env" -ForegroundColor Green

# Step 8: Create deployment instructions
Write-Host "📝 Creating deployment instructions..." -ForegroundColor Yellow
$InstructionsContent = @"
🌐 HOSTINGER DEPLOYMENT INSTRUCTIONS - LAMDAKU.COM
Generated: $(Get-Date)

📋 UPLOAD INSTRUCTIONS:

1. 📁 FRONTEND UPLOAD (Main Domain: lamdaku.com)
   Source: hostinger-deployment/public_html/* (except api folder)
   Target: /public_html/ (Hostinger File Manager)
   
   Files to upload:
   - index.html
   - static/ folder
   - favicon.ico
   - asset-manifest.json
   - .htaccess

2. 📁 BACKEND UPLOAD (Subdomain: api.lamdaku.com)
   Source: hostinger-deployment/public_html/api/*
   Target: /public_html/api/
   
   🚨 IMPORTANT: Set api.lamdaku.com document root to /public_html/api/public

3. 🗄️ DATABASE SETUP:
   - Create MySQL database in Hostinger panel
   - Note: Database name, username, password
   - Update .env file with credentials

4. ⚙️ HOSTINGER PANEL CONFIGURATION:
   
   A. Create Subdomain:
      - Subdomain: api
      - Domain: lamdaku.com  
      - Document Root: /public_html/api/public
   
   B. Enable SSL:
      - Main domain: lamdaku.com
      - Subdomain: api.lamdaku.com
   
   C. Database Setup:
      - Create database (name format: u123456789_lamdaku)
      - Create user with full privileges
      - Update .env with credentials

5. 🔧 SERVER COMMANDS (via Hostinger Terminal/SSH):
   
   cd /public_html/api
   
   # Generate Laravel key
   php artisan key:generate
   
   # Run migrations
   php artisan migrate --force
   
   # Cache configuration
   php artisan config:cache
   php artisan route:cache
   
   # Set permissions
   chmod -R 755 storage bootstrap/cache
   chmod -R 777 storage
   
   # Create storage link
   php artisan storage:link

6. 🧪 TESTING:
   
   ✅ Frontend: https://lamdaku.com
   ✅ Backend API: https://api.lamdaku.com/api/v1/services
   ✅ SSL Check: Both domains should have valid SSL
   ✅ All pages load correctly
   ✅ No CORS errors in browser console

7. 🔍 TROUBLESHOOTING:
   
   - Laravel 500 Error: Check /public_html/api/storage/logs/laravel.log
   - Database Connection: Verify .env credentials
   - CORS Issues: Check config/cors.php allowed_origins
   - Subdomain Issues: Verify document root points to /public_html/api/public

📊 EXPECTED RESULTS:
- Main Site: https://lamdaku.com (React frontend)
- API Endpoint: https://api.lamdaku.com/api/v1 (Laravel backend)
- Full SSL encryption
- Dynamic data loading from backend
- Mobile responsive design

🎉 Ready for Hostinger deployment!
"@

$InstructionsPath = Join-Path $ProjectPath "HOSTINGER_UPLOAD_INSTRUCTIONS.txt"
$InstructionsContent | Out-File -FilePath $InstructionsPath -Encoding UTF8

Write-Host "✅ Instructions created: HOSTINGER_UPLOAD_INSTRUCTIONS.txt" -ForegroundColor Green

# Step 9: Create ZIP packages for easy upload
Write-Host "📦 Creating ZIP packages for upload..." -ForegroundColor Yellow

# Frontend ZIP
$FrontendZip = Join-Path $ProjectPath "lamdaku-frontend-hostinger.zip"
Compress-Archive -Path "$FrontendDeployPath\*" -DestinationPath $FrontendZip -Force -Update

# Backend ZIP  
$BackendZip = Join-Path $ProjectPath "lamdaku-backend-hostinger.zip"
Compress-Archive -Path "$BackendDeployPath\*" -DestinationPath $BackendZip -Force

Write-Host "✅ ZIP packages created:" -ForegroundColor Green
Write-Host "  - Frontend: lamdaku-frontend-hostinger.zip" -ForegroundColor White
Write-Host "  - Backend: lamdaku-backend-hostinger.zip" -ForegroundColor White

# Step 10: Summary
Write-Host ""
Write-Host "🎉 HOSTINGER DEPLOYMENT READY!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Files Created:" -ForegroundColor Cyan
Write-Host "  ✅ hostinger-deployment/ folder with organized files" -ForegroundColor White
Write-Host "  ✅ lamdaku-frontend-hostinger.zip (upload to /public_html/)" -ForegroundColor White  
Write-Host "  ✅ lamdaku-backend-hostinger.zip (upload to /public_html/api/)" -ForegroundColor White
Write-Host "  ✅ HOSTINGER_UPLOAD_INSTRUCTIONS.txt" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Target URLs:" -ForegroundColor Yellow
Write-Host "  Frontend: https://lamdaku.com" -ForegroundColor White
Write-Host "  Backend API: https://api.lamdaku.com/api/v1" -ForegroundColor White
Write-Host ""
Write-Host "📤 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Login to Hostinger panel" -ForegroundColor White
Write-Host "  2. Create subdomain: api.lamdaku.com" -ForegroundColor White
Write-Host "  3. Upload and extract ZIP files" -ForegroundColor White
Write-Host "  4. Setup database and update .env" -ForegroundColor White
Write-Host "  5. Run Laravel commands via terminal" -ForegroundColor White
Write-Host "  6. Test deployment" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Ready to upload to Hostinger!" -ForegroundColor Green
