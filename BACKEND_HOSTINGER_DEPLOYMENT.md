# 🔧 BACKEND LARAVEL - HOSTINGER DEPLOYMENT GUIDE

## 📋 **BACKEND STATUS & REQUIREMENTS**

### **✅ Yang Sudah Disiapkan:**
- Backend Laravel lengkap sudah ada di `hostinger-deployment/public_html/api/`
- Konfigurasi production `.env` sudah disesuaikan
- CORS setup untuk domain `lamdaku.com`
- Database migration files ready
- API endpoints sudah berfungsi

### **📂 Backend Files Location:**
```
hostinger-deployment/public_html/api/
├── app/                    # Laravel application logic
├── config/                 # Configuration files
├── database/               # Migrations & seeders
├── public/                 # Web server document root
├── routes/                 # API routes
├── storage/                # File storage & logs
├── .env                    # Production environment config
├── composer.json           # PHP dependencies
└── artisan                 # Laravel command-line tool
```

## 🗄️ **DATABASE SETUP REQUIREMENTS**

### **1. Create MySQL Database di Hostinger**

```sql
-- Database akan auto-generated dengan format:
Database Name: u123456789_lamdaku
Username: u123456789_user
Password: [strong_password_generated]
Host: localhost
Port: 3306
```

### **2. Update Backend .env File**

File: `/public_html/api/.env`

```env
# Application Settings
APP_NAME="LAMDAKU CMS"
APP_ENV=production
APP_KEY=base64:[GENERATE_NEW_KEY]
APP_DEBUG=false
APP_URL=https://api.lamdaku.com

# Database Configuration (UPDATE THESE!)
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_lamdaku    # ← Update with your DB name
DB_USERNAME=u123456789_user       # ← Update with your username
DB_PASSWORD=YOUR_DB_PASSWORD      # ← Update with your password

# CORS & Frontend
FRONTEND_URL=https://lamdaku.com
SANCTUM_STATEFUL_DOMAINS=lamdaku.com

# Session
SESSION_DOMAIN=.lamdaku.com
```

## 🚀 **BACKEND DEPLOYMENT STEPS**

### **Step 1: Upload Backend Files**

```
1. Backend sudah included dalam lamdaku-frontend-hostinger.zip
2. Setelah extract, pastikan struktur seperti ini:

/public_html/
├── index.html              # React frontend
├── static/                 # React assets
├── .htaccess              # React Router rules
└── api/                   # Laravel backend
    ├── app/
    ├── config/
    ├── public/            # ← Document root untuk api.lamdaku.com
    ├── .env
    └── ...
```

### **Step 2: Configure Subdomain**

Di Hostinger Panel:
```
Domains → Subdomains → Create New:
- Subdomain: api
- Domain: lamdaku.com
- Document Root: /public_html/api/public  ← PENTING!
```

### **Step 3: Database Setup**

Di Hostinger Panel:
```
Databases → MySQL Databases → Create:
- Database Name: [auto-generated] u123456789_lamdaku
- Username: [auto-generated] u123456789_user  
- Password: [generate strong password]
- Assign user to database: Full privileges
```

### **Step 4: Update .env dengan Database Credentials**

Edit file `/public_html/api/.env`:
```env
DB_DATABASE=u123456789_lamdaku     # ← Copy from Hostinger panel
DB_USERNAME=u123456789_user        # ← Copy from Hostinger panel
DB_PASSWORD=your_strong_password   # ← Copy from Hostinger panel
```

### **Step 5: Run Laravel Commands**

Via Hostinger Terminal/SSH:

```bash
# Navigate to Laravel directory
cd /public_html/api

# Generate application key (WAJIB!)
php artisan key:generate

# Run database migrations
php artisan migrate --force

# Cache configuration for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set file permissions
chmod -R 755 storage bootstrap/cache
chmod -R 777 storage

# Create storage symbolic link (for logo uploads)
php artisan storage:link

# Verify installation
php artisan --version
```

## 🔧 **HOSTINGER-SPECIFIC CONFIGURATIONS**

### **1. PHP Version Check**

Pastikan Hostinger menggunakan PHP 8.1+:
```
Hostinger Panel → Advanced → PHP Configuration
- Select PHP 8.1 or 8.2
- Enable required extensions: mysqli, pdo_mysql, gd, fileinfo
```

### **2. Composer Dependencies**

Jika perlu install dependencies:
```bash
cd /public_html/api
composer install --optimize-autoloader --no-dev
```

### **3. File Permissions (Critical!)**

```bash
# Laravel requires specific permissions
find /public_html/api -type f -exec chmod 644 {} \;
find /public_html/api -type d -exec chmod 755 {} \;
chmod -R 777 /public_html/api/storage
chmod -R 777 /public_html/api/bootstrap/cache
```

## 🧪 **BACKEND TESTING**

### **1. API Endpoint Tests**

Test via browser atau curl:

```bash
# Company Info API
https://api.lamdaku.com/api/v1/company-info

# Services API  
https://api.lamdaku.com/api/v1/services

# Timeline API
https://api.lamdaku.com/api/v1/timelines

# Health Check
https://api.lamdaku.com/api/v1/health
```

### **2. Expected Response Format**

```json
{
    "success": true,
    "data": {
        "company_name": "LAMDAKU",
        "logo": "1749712652_LOGO_LAMDAKU.png",
        "description": "...",
        "phone": "+62 21 1234 5678",
        "email": "info@lamdaku.co.id"
    }
}
```

### **3. CORS Verification**

Check response headers include:
```
Access-Control-Allow-Origin: https://lamdaku.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization
```

## 🚨 **COMMON BACKEND ISSUES & SOLUTIONS**

### **❌ Laravel 500 Error**

**Diagnosis:**
```bash
# Check Laravel logs
tail -f /public_html/api/storage/logs/laravel.log

# Check web server error log
tail -f /public_html/logs/error_log
```

**Common Causes:**
```
1. Missing APP_KEY → Run: php artisan key:generate
2. Wrong file permissions → Fix storage permissions
3. Database connection error → Check .env credentials
4. Missing PHP extensions → Enable in Hostinger panel
```

### **❌ Database Connection Failed**

```bash
# Test database connection
cd /public_html/api
php artisan tinker
>>> DB::connection()->getPdo();
```

**Solutions:**
- Verify database credentials in .env
- Check database exists in Hostinger panel
- Ensure user has full privileges

### **❌ CORS Errors**

Check `/public_html/api/config/cors.php`:
```php
'allowed_origins' => [
    'https://lamdaku.com',        # ← Must include your domain
    'https://www.lamdaku.com',
],
```

### **❌ Storage/Logo Issues**

```bash
# Recreate storage link
cd /public_html/api
php artisan storage:link

# Check storage permissions
ls -la storage/app/public/logos/
```

## 📊 **BACKEND API ENDPOINTS**

### **Available APIs:**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/company-info` | GET | Company information & logo |
| `/api/v1/services` | GET | List of services |
| `/api/v1/services/{id}` | GET | Single service detail |
| `/api/v1/timelines` | GET | Company timeline |
| `/api/v1/contacts` | POST | Submit contact form |
| `/api/v1/pages` | GET | CMS pages |

### **Authentication (If Needed):**

```php
# For admin endpoints (if implemented)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
});
```

## 🔄 **BACKEND DATA SEEDING**

### **Default Data Setup:**

```bash
cd /public_html/api

# Run seeders to populate initial data
php artisan db:seed

# Or specific seeders
php artisan db:seed --class=CompanyInfoSeeder
php artisan db:seed --class=ServicesSeeder
php artisan db:seed --class=TimelineSeeder
```

### **Sample Data Structure:**

```sql
-- Company Info
INSERT INTO company_info (company_name, logo, description, phone, email, address) 
VALUES ('LAMDAKU', '1749712652_LOGO_LAMDAKU.png', '...', '+62 21 1234 5678', 'info@lamdaku.co.id', 'Jakarta');

-- Services
INSERT INTO services (title, description, icon, features) 
VALUES ('Akreditasi Klinik', 'Layanan akreditasi...', 'hospital', '["Feature 1", "Feature 2"]');
```

## 📈 **PERFORMANCE OPTIMIZATION**

### **1. Enable OPCache (Hostinger)**

```ini
; php.ini settings (Hostinger usually enables by default)
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=4000
```

### **2. Laravel Optimizations**

```bash
cd /public_html/api

# Cache everything for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Optimize autoloader
composer dump-autoload --optimize
```

### **3. Database Optimization**

```sql
-- Add indexes for frequently queried columns
ALTER TABLE services ADD INDEX idx_status (status);
ALTER TABLE company_info ADD INDEX idx_active (active);
```

## 🎯 **BACKEND DEPLOYMENT CHECKLIST**

### **✅ Pre-Deployment:**
- [ ] Backend files uploaded to `/public_html/api/`
- [ ] Subdomain `api.lamdaku.com` created
- [ ] Document root set to `/public_html/api/public`
- [ ] MySQL database created
- [ ] PHP version set to 8.1+

### **✅ Configuration:**
- [ ] `.env` file updated with database credentials
- [ ] `APP_KEY` generated
- [ ] CORS configured for `lamdaku.com`
- [ ] File permissions set correctly

### **✅ Laravel Setup:**
- [ ] `php artisan migrate --force` executed
- [ ] `php artisan config:cache` executed
- [ ] `php artisan storage:link` executed
- [ ] Composer dependencies installed

### **✅ Testing:**
- [ ] API endpoints respond correctly
- [ ] CORS headers present
- [ ] Database connection working
- [ ] Logo storage accessible
- [ ] SSL certificate active

## 🎉 **BACKEND READY!**

Setelah mengikuti semua langkah ini, backend Laravel akan:

- ✅ **Accessible** via `https://api.lamdaku.com`
- ✅ **Connected** to MySQL database
- ✅ **Serving** JSON APIs for frontend
- ✅ **Handling** CORS properly
- ✅ **Storing** files (logos) correctly
- ✅ **Optimized** for production performance

**Backend akan fully functional dan siap melayani frontend React di `https://lamdaku.com`!** 🚀
