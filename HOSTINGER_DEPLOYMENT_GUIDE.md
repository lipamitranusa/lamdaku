# 🌐 HOSTINGER DEPLOYMENT GUIDE - LAMDAKU.COM

## 🎯 **OVERVIEW**

Panduan lengkap untuk deploy aplikasi LAMDAKU ke Hostinger dengan domain `lamdaku.com` menggunakan struktur:
- **Frontend (React)**: `lamdaku.com` (main domain)
- **Backend (Laravel API)**: `api.lamdaku.com` (subdomain)

## 📋 **HOSTINGER SETUP REQUIREMENTS**

### **✅ Hosting Plan Requirements**
- **Business Plan** atau **Cloud Hosting** (untuk PHP 8.1+ dan subdomain)
- **PHP 8.1+** support
- **MySQL Database** 
- **SSL Certificate** (gratis dari Hostinger)
- **Subdomain** creation capability

### **✅ Domain Configuration**
- **Main Domain**: `lamdaku.com` → Frontend (React)
- **Subdomain**: `api.lamdaku.com` → Backend (Laravel)

## ⚙️ **STEP 1: PREPARE BUILD FILES**

### **A. Frontend Build Configuration**

Mari update environment untuk production:

```javascript
// src/config/environment.js - Update untuk Hostinger
const config = {
  development: {
    API_BASE_URL: 'http://127.0.0.1:8000/api/v1',
    APP_URL: 'http://localhost:3000',
    ENVIRONMENT: 'development'
  },
  production: {
    API_BASE_URL: 'https://api.lamdaku.com/api/v1',
    APP_URL: 'https://lamdaku.com',
    ENVIRONMENT: 'production'
  }
};
```

### **B. Build Production Frontend**

Jalankan commands ini untuk build:

```powershell
# Set production environment
$env:NODE_ENV="production"
$env:REACT_APP_ENV="production"
$env:REACT_APP_API_URL="https://api.lamdaku.com/api/v1"

# Build untuk production
npm run build
```

## 🗂️ **STEP 2: HOSTINGER PANEL CONFIGURATION**

### **A. Create Subdomain for API**

1. **Login ke Hostinger Panel**
2. **Navigate to**: Domains → Manage → Subdomains  
3. **Create Subdomain**:
   - Subdomain: `api`
   - Domain: `lamdaku.com`
   - Document Root: `/public_html/api`

### **B. Database Setup**

1. **Navigate to**: Databases → MySQL Databases
2. **Create Database**:
   - Database Name: `u123456789_lamdaku` (Hostinger format)
   - Username: `u123456789_user`
   - Password: [Generate Strong Password]
3. **Note down credentials** untuk .env file

### **C. SSL Certificate Setup**

1. **Navigate to**: Security → SSL/TLS
2. **Enable SSL** untuk:
   - `lamdaku.com`
   - `api.lamdaku.com`
3. **Force HTTPS Redirect**: Enable

## 📁 **STEP 3: FILE UPLOAD STRUCTURE**

### **Directory Structure di Hostinger**

```
/public_html/
├── index.html              # Frontend React (build files)
├── static/                 # React static assets
├── favicon.ico
├── asset-manifest.json
└── api/                    # Backend Laravel
    ├── public/             # Laravel public (Document Root untuk api.lamdaku.com)
    │   ├── index.php
    │   └── .htaccess
    ├── app/
    ├── config/
    ├── database/
    ├── routes/
    ├── storage/
    ├── vendor/
    ├── .env
    └── composer.json
```

## 🚀 **STEP 4: UPLOAD FILES**

### **A. Upload Frontend (React Build)**

1. **Source**: `build/` folder dari local
2. **Target**: `/public_html/` (root domain)
3. **Files to upload**:
   ```
   build/index.html → public_html/index.html
   build/static/ → public_html/static/
   build/favicon.ico → public_html/favicon.ico
   build/asset-manifest.json → public_html/asset-manifest.json
   ```

### **B. Upload Backend (Laravel)**

1. **Source**: Entire Laravel project
2. **Target**: `/public_html/api/`
3. **Important**: Laravel `public/` folder → `/public_html/api/public/`

## ⚙️ **STEP 5: BACKEND CONFIGURATION**

### **A. Create Production .env**

Create `/public_html/api/.env`:

```env
APP_NAME="LAMDAKU CMS"
APP_ENV=production
APP_KEY=base64:YOUR_GENERATED_KEY_HERE
APP_DEBUG=false
APP_URL=https://api.lamdaku.com

# Database (use Hostinger credentials)
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_lamdaku
DB_USERNAME=u123456789_user
DB_PASSWORD=your_database_password

# Session & Cache
SESSION_DRIVER=file
SESSION_LIFETIME=120
CACHE_DRIVER=file
QUEUE_CONNECTION=sync

# Mail (optional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=noreply@lamdaku.com
MAIL_PASSWORD=your_email_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@lamdaku.com

# CORS untuk frontend
FRONTEND_URL=https://lamdaku.com
SANCTUM_STATEFUL_DOMAINS=lamdaku.com
```

### **B. Update CORS Configuration**

Update `/public_html/api/config/cors.php`:

```php
'allowed_origins' => [
    'https://lamdaku.com',
    'https://www.lamdaku.com',
],

'allowed_origins_patterns' => [],
```

### **C. Hostinger Terminal Commands**

Via Hostinger File Manager terminal:

```bash
# Navigate to Laravel directory
cd /public_html/api

# Install dependencies (if composer available)
composer install --optimize-autoloader --no-dev

# Generate application key
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
```

## 🔧 **STEP 6: HOSTINGER-SPECIFIC CONFIGURATIONS**

### **A. Main Domain .htaccess**

Create `/public_html/.htaccess` for React Router:

```apache
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
```

### **B. API Subdomain .htaccess**

Laravel's default `/public_html/api/public/.htaccess` should work, but ensure:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
    
    # Redirect Trailing Slashes
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]
    
    # Send Requests To Front Controller
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>

# CORS Headers
Header add Access-Control-Allow-Origin "https://lamdaku.com"
Header add Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
Header add Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
```

## 🗄️ **STEP 7: DATABASE SETUP**

### **A. Run Migrations via Hostinger Terminal**

```bash
cd /public_html/api
php artisan migrate --force
```

### **B. Seed Sample Data (Optional)**

```bash
php artisan db:seed
```

### **C. Verify Database Connection**

Test via terminal:
```bash
php artisan tinker
>>> DB::connection()->getPdo();
```

## 🧪 **STEP 8: TESTING DEPLOYMENT**

### **A. Test URLs**

1. **Frontend**: `https://lamdaku.com`
   - Should load React application
   - Check all routes work
   - Verify responsive design

2. **Backend API**: `https://api.lamdaku.com/api/v1/services`
   - Should return JSON response
   - Check CORS headers
   - Verify SSL certificate

### **B. Debug Common Issues**

**Laravel Not Loading:**
```bash
# Check Laravel logs
tail -f /public_html/api/storage/logs/laravel.log

# Check permissions
ls -la /public_html/api/storage
```

**React Not Loading:**
- Verify `.htaccess` rules
- Check file upload completeness
- Test static asset loading

## 📊 **STEP 9: PERFORMANCE OPTIMIZATION**

### **A. Enable Hostinger Caching**

1. Navigate to: **Advanced → Cache Manager**
2. Enable **LiteSpeed Cache**
3. Configure cache rules

### **B. CDN Setup (Optional)**

1. Navigate to: **Advanced → CDN**
2. Enable Hostinger CDN
3. Configure for static assets

## 🎉 **FINAL VERIFICATION CHECKLIST**

### **✅ Frontend Checks**
- [ ] `https://lamdaku.com` loads correctly
- [ ] All pages accessible (/, /services, /profile, /contact)
- [ ] Logo displays at 64px
- [ ] Mobile responsive
- [ ] No console errors

### **✅ Backend Checks**
- [ ] `https://api.lamdaku.com/api/v1/services` returns data
- [ ] CORS working from frontend
- [ ] Database connection established
- [ ] SSL certificate valid
- [ ] No 500 errors

### **✅ Integration Checks**
- [ ] API calls work from frontend
- [ ] No "API tidak tersedia" warnings
- [ ] Dynamic data loading
- [ ] Contact form submissions
- [ ] Timeline data from backend

## 🚨 **TROUBLESHOOTING GUIDE**

### **Common Hostinger Issues**

**1. Subdomain Not Working:**
- Check DNS propagation (24-48 hours)
- Verify subdomain document root
- Ensure SSL enabled for subdomain

**2. Laravel 500 Error:**
```bash
# Check Laravel logs
cat /public_html/api/storage/logs/laravel.log

# Verify .env file
cat /public_html/api/.env

# Check permissions
chmod -R 777 /public_html/api/storage
```

**3. CORS Issues:**
- Verify allowed origins in `cors.php`
- Check .htaccess headers
- Test with browser dev tools

**4. Database Connection:**
- Verify database credentials
- Check Hostinger database panel
- Test connection via Laravel tinker

---

## 🎯 **READY FOR HOSTINGER!**

Dengan panduan ini, aplikasi LAMDAKU akan berhasil di-deploy ke Hostinger dengan:

- ✅ **Frontend**: `https://lamdaku.com`
- ✅ **Backend API**: `https://api.lamdaku.com/api/v1`
- ✅ **SSL Secured**
- ✅ **Production Optimized**
- ✅ **Hostinger-Specific Configuration**

**Let's deploy to Hostinger! 🚀**
