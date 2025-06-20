# PREPARE BACKEND FOR HOSTINGER DEPLOYMENT
# Script to prepare actual Laravel backend for Hostinger

param(
    [switch]$UpdateOnly
)

Write-Host "🌐 PREPARING ACTUAL BACKEND FOR HOSTINGER" -ForegroundColor Green
Write-Host "Source: D:\laragon\www\LAMDAKU\lamdaku-cms-backend" -ForegroundColor Yellow
Write-Host "Target: Hostinger production (api.lamdaku.com)" -ForegroundColor Yellow

# Paths
$BackendSource = "D:\laragon\www\LAMDAKU\lamdaku-cms-backend"
$ProjectPath = Get-Location
$DeploymentFolder = Join-Path $ProjectPath "hostinger-deployment\public_html\api"

# Check if source backend exists
if (-not (Test-Path $BackendSource)) {
    Write-Host "❌ Backend source not found: $BackendSource" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Backend source found" -ForegroundColor Green

# Create deployment structure
if (-not $UpdateOnly) {
    Write-Host "📁 Creating deployment structure..." -ForegroundColor Yellow
    
    if (Test-Path $DeploymentFolder) {
        Remove-Item -Recurse -Force $DeploymentFolder
    }
    New-Item -ItemType Directory -Path $DeploymentFolder -Force | Out-Null
    
    # Copy entire Laravel backend except vendor, node_modules, and .env
    Write-Host "📋 Copying Laravel backend..." -ForegroundColor Yellow
    
    $ExcludeFolders = @('vendor', 'node_modules', '.git', 'storage\logs')
    $ExcludeFiles = @('.env', '.env.local', '*.log')
    
    # Copy all files except excluded ones
    Get-ChildItem -Path $BackendSource -Force | Where-Object {
        $_.Name -notin $ExcludeFolders -and
        $_.Name -notlike '*.log' -and
        $_.Name -ne '.env'
    } | Copy-Item -Destination $DeploymentFolder -Recurse -Force
    
    Write-Host "✅ Backend files copied" -ForegroundColor Green
}

# Create production .env for Hostinger
Write-Host "⚙️ Creating production .env..." -ForegroundColor Yellow

$ProductionEnv = @"
APP_NAME="LAMDAKU CMS"
APP_ENV=production
APP_KEY=base64:YPstFbfbp8JtksU1jrzdh69vVcW5nu16ERAd+OcVSbA=
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

# Mail Configuration (Update with Hostinger email)
MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=noreply@lamdaku.com
MAIL_PASSWORD=YOUR_EMAIL_PASSWORD
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@lamdaku.com
MAIL_FROM_NAME="LAMDAKU"

# CORS for frontend
FRONTEND_URL=https://lamdaku.com
SANCTUM_STATEFUL_DOMAINS=lamdaku.com
"@

$EnvPath = Join-Path $DeploymentFolder ".env"
$ProductionEnv | Out-File -FilePath $EnvPath -Encoding UTF8

Write-Host "✅ Production .env created" -ForegroundColor Green

# Update CORS for production
Write-Host "🔧 Updating CORS configuration..." -ForegroundColor Yellow

$CorsConfigPath = Join-Path $DeploymentFolder "config\cors.php"
if (Test-Path $CorsConfigPath) {
    $CorsContent = Get-Content $CorsConfigPath -Raw
    
    # Update allowed_origins for production
    $NewCorsConfig = $CorsContent -replace "(?s)'allowed_origins' => \[.*?\]", @"
'allowed_origins' => [
        'https://lamdaku.com',
        'https://www.lamdaku.com',
        'http://localhost:3000',  // Keep for development
        'http://127.0.0.1:3000',  // Keep for development
    ]
"@
    
    $NewCorsConfig | Out-File -FilePath $CorsConfigPath -Encoding UTF8
    Write-Host "✅ CORS configuration updated for production" -ForegroundColor Green
} else {
    Write-Host "⚠️ CORS config not found, skipping..." -ForegroundColor Yellow
}

# Create storage directories with proper structure
Write-Host "📁 Creating storage structure..." -ForegroundColor Yellow

$StoragePaths = @(
    'storage\app\public\logos',
    'storage\app\public\uploads',
    'storage\framework\cache\data',
    'storage\framework\sessions',
    'storage\framework\views',
    'storage\logs',
    'bootstrap\cache'
)

foreach ($path in $StoragePaths) {
    $fullPath = Join-Path $DeploymentFolder $path
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
    }
}

Write-Host "✅ Storage structure created" -ForegroundColor Green

# Create .htaccess for Laravel in public folder
Write-Host "🔧 Creating Laravel .htaccess..." -ForegroundColor Yellow

$LaravelHtaccess = @"
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Cache static assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</FilesMatch>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
"@

$PublicHtaccessPath = Join-Path $DeploymentFolder "public\.htaccess"
$LaravelHtaccess | Out-File -FilePath $PublicHtaccessPath -Encoding UTF8

Write-Host "✅ Laravel .htaccess created" -ForegroundColor Green

# Create deployment package
Write-Host "📦 Creating backend deployment package..." -ForegroundColor Yellow

$BackendZip = Join-Path $ProjectPath "lamdaku-backend-hostinger.zip"
if (Test-Path $BackendZip) {
    Remove-Item $BackendZip -Force
}

Compress-Archive -Path "$DeploymentFolder\*" -DestinationPath $BackendZip -Force

Write-Host "✅ Backend package created: lamdaku-backend-hostinger.zip" -ForegroundColor Green

# Update instructions
Write-Host "📝 Creating backend deployment instructions..." -ForegroundColor Yellow

$BackendInstructions = @"
🚀 LAMDAKU BACKEND DEPLOYMENT - HOSTINGER
Generated: $(Get-Date)

📦 PACKAGE: lamdaku-backend-hostinger.zip
🎯 TARGET: https://api.lamdaku.com

================================================================================
📋 DEPLOYMENT STEPS
================================================================================

1. 🌐 HOSTINGER SUBDOMAIN SETUP
   
   A. Create Subdomain:
      - Login to Hostinger Panel
      - Domains → Subdomains → Create New
      - Subdomain: api
      - Domain: lamdaku.com
      - Document Root: /public_html/api/public
   
   B. Upload Backend:
      - Upload lamdaku-backend-hostinger.zip to /public_html/
      - Extract ZIP to /public_html/api/
      - Ensure document root points to /public_html/api/public

2. 🗄️ DATABASE CONFIGURATION
   
   A. Create Database:
      - Hostinger Panel → Databases → MySQL
      - Create new database (format: u123456789_lamdaku)
      - Create user with full privileges
      - Note credentials!
   
   B. Update .env:
      - Edit /public_html/api/.env
      - Update DB_DATABASE, DB_USERNAME, DB_PASSWORD
      - Generate new APP_KEY

3. 🔧 LARAVEL SETUP COMMANDS
   
   Via Hostinger Terminal/SSH:
   
   ```bash
   cd /public_html/api
   
   # Generate application key
   php artisan key:generate
   
   # Run migrations
   php artisan migrate --force
   
   # Cache configuration
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   
   # Set permissions
   chmod -R 755 storage bootstrap/cache
   chmod -R 777 storage
   
   # Create storage link
   php artisan storage:link
   ```

4. 🧪 TEST API ENDPOINTS
   
   Test these URLs:
   ✅ https://api.lamdaku.com/api/v1/services
   ✅ https://api.lamdaku.com/api/v1/company-info
   ✅ https://api.lamdaku.com/api/v1/timeline
   ✅ https://api.lamdaku.com/api/v1/pages

5. 🔒 ENABLE SSL
   
   - Hostinger Panel → Security → SSL/TLS
   - Enable SSL for api.lamdaku.com
   - Force HTTPS redirect

================================================================================
✅ EXPECTED RESULT
================================================================================

🌐 Working API: https://api.lamdaku.com/api/v1
🔄 CORS enabled for: https://lamdaku.com
🔒 SSL certificate active
📊 Database connected
🚀 All endpoints functional

Ready for frontend integration! 🎉
"@

$BackendInstructionsPath = Join-Path $ProjectPath "BACKEND_HOSTINGER_DEPLOYMENT.txt"
$BackendInstructions | Out-File -FilePath $BackendInstructionsPath -Encoding UTF8

Write-Host "✅ Backend instructions created: BACKEND_HOSTINGER_DEPLOYMENT.txt" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "🎉 BACKEND READY FOR HOSTINGER!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Files Created:" -ForegroundColor Cyan
Write-Host "  ✅ lamdaku-backend-hostinger.zip (Backend package)" -ForegroundColor White
Write-Host "  ✅ BACKEND_HOSTINGER_DEPLOYMENT.txt (Instructions)" -ForegroundColor White
Write-Host "  ✅ hostinger-deployment/public_html/api/ (Extracted files)" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Target URL: https://api.lamdaku.com/api/v1" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Upload backend package to Hostinger" -ForegroundColor White
Write-Host "  2. Create subdomain: api.lamdaku.com" -ForegroundColor White
Write-Host "  3. Setup database and run migrations" -ForegroundColor White
Write-Host "  4. Test API endpoints" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Ready for deployment!" -ForegroundColor Green
