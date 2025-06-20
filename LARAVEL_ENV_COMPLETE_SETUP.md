# 🔧 LARAVEL .ENV SETUP GUIDE - HOSTINGER DEPLOYMENT

## 🎯 **PROBLEM SOLVED: Laravel APP_KEY Issue**

You're getting the "php artisan key:generate" error because Laravel needs a complete `.env` file first. Here's the complete solution:

---

## 📝 **STEP 1: CREATE COMPLETE .ENV FILE**

### **A. Copy the Production .env Template**

On your Hostinger server, create `/public_html/api/.env` with this complete configuration:

```env
# Laravel Application Configuration for Hostinger Production
# Make sure to update database credentials and other environment-specific values

# ==============================================================================
# APPLICATION SETTINGS
# ==============================================================================
APP_NAME="LAMDAKU API"
APP_ENV=production
APP_KEY=base64:YPstFbfbp8JtksU1jrzdh69vVcW5nu16ERAd+OcVSbA=
APP_DEBUG=false
APP_TIMEZONE=Asia/Jakarta
APP_URL=https://api.lamdaku.com

# Laravel Framework Settings
APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US
APP_MAINTENANCE_DRIVER=file
PHP_CLI_SERVER_WORKERS=4
BCRYPT_ROUNDS=12

# ==============================================================================
# FRONTEND URL CONFIGURATION
# ==============================================================================
FRONTEND_URL=https://lamdaku.com

# ==============================================================================
# DATABASE CONFIGURATION
# ==============================================================================
# ⚠️  IMPORTANT: Update these with your actual Hostinger database credentials
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_lamdaku
DB_USERNAME=u123456789_user
DB_PASSWORD=YOUR_HOSTINGER_DB_PASSWORD_HERE

# ==============================================================================
# LOGGING CONFIGURATION
# ==============================================================================
LOG_CHANNEL=single
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=warning

# ==============================================================================
# SESSION & SECURITY CONFIGURATION
# ==============================================================================
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=.lamdaku.com

# Laravel Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=lamdaku.com,www.lamdaku.com

# ==============================================================================
# CACHE & PERFORMANCE CONFIGURATION
# ==============================================================================
CACHE_STORE=file
CACHE_PREFIX=lamdaku
BROADCAST_CONNECTION=log
FILESYSTEM_DISK=public
QUEUE_CONNECTION=sync

# Redis Configuration (if available on Hostinger)
REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# ==============================================================================
# MAIL CONFIGURATION
# ==============================================================================
# ⚠️  IMPORTANT: Update email credentials for contact forms
MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=587
MAIL_USERNAME=noreply@lamdaku.com
MAIL_PASSWORD=YOUR_EMAIL_PASSWORD_HERE
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@lamdaku.com
MAIL_FROM_NAME="LAMDAKU.COM"

# ==============================================================================
# CORS CONFIGURATION
# ==============================================================================
CORS_ALLOWED_ORIGINS=https://lamdaku.com,https://www.lamdaku.com
CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization,X-Requested-With,Accept,Origin

# ==============================================================================
# SECURITY SETTINGS
# ==============================================================================
FORCE_HTTPS=true
HTTPS_ONLY=true
SECURITY_HEADERS_ENABLED=true
CONTENT_SECURITY_POLICY_ENABLED=false

# ==============================================================================
# FILE UPLOAD CONFIGURATION
# ==============================================================================
UPLOAD_MAX_FILESIZE=10M
POST_MAX_SIZE=10M

# ==============================================================================
# API CONFIGURATION
# ==============================================================================
API_VERSION=v1
API_PREFIX=api/v1
API_RATE_LIMIT=60

# ==============================================================================
# COMPANY INFORMATION
# ==============================================================================
COMPANY_NAME="LAMDAKU"
COMPANY_TAGLINE="Professional Accreditation Company"
CONTACT_EMAIL=info@lamdaku.com
CONTACT_PHONE="+62-xxx-xxxx-xxxx"

# ==============================================================================
# TIMEZONE SETTINGS
# ==============================================================================
DEFAULT_TIMEZONE=Asia/Jakarta
DATABASE_TIMEZONE=+07:00

# ==============================================================================
# PERFORMANCE OPTIMIZATION
# ==============================================================================
OPCACHE_ENABLE=true
RESPONSE_CACHE_TTL=3600

# ==============================================================================
# APPLICATION FEATURES
# ==============================================================================
ENABLE_REGISTRATION=false
ENABLE_PASSWORD_RESET=true
ENABLE_EMAIL_VERIFICATION=false
MAINTENANCE_MODE=false

# ==============================================================================
# DEVELOPMENT/DEBUG SETTINGS (Keep false in production)
# ==============================================================================
DEBUGBAR_ENABLED=false
TELESCOPE_ENABLED=false
```

---

## 🗄️ **STEP 2: CREATE HOSTINGER DATABASE**

### **A. Create MySQL Database in Hostinger Panel**

1. **Login to Hostinger hPanel**
2. **Go to Databases → MySQL Databases**
3. **Click "Create Database"**
4. **Database Settings:**
   ```
   Database Name: u123456789_lamdaku
   Username: u123456789_user
   Password: [Generate strong password - SAVE THIS!]
   Host: localhost
   Port: 3306
   ```

### **B. Note Your Database Credentials**
```bash
# Save these credentials - you'll need them!
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_lamdaku
DB_USERNAME=u123456789_user
DB_PASSWORD=[your_actual_password]
```

---

## ✏️ **STEP 3: UPDATE .ENV WITH DATABASE CREDENTIALS**

### **A. Edit .env File on Server**

1. **Navigate to `/public_html/api/.env`**
2. **Update these lines with your actual database credentials:**

```env
# Replace these placeholder values with your actual Hostinger database credentials
DB_DATABASE=u123456789_lamdaku          # ← Your actual database name
DB_USERNAME=u123456789_user             # ← Your actual database username  
DB_PASSWORD=YOUR_ACTUAL_PASSWORD_HERE   # ← Your actual database password
```

### **B. Update Email Configuration (Optional but Recommended)**

```env
# Update with your actual Hostinger email account
MAIL_USERNAME=noreply@lamdaku.com       # ← Your actual email
MAIL_PASSWORD=YOUR_EMAIL_PASSWORD       # ← Your actual email password
```

---

## ⚙️ **STEP 4: LARAVEL SETUP COMMANDS**

### **A. Access Hostinger Terminal/SSH**

**Option 1: Hostinger Web Terminal**
1. In hPanel, go to **"Advanced" → "Web Terminal"**
2. Click **"Open Terminal"**

**Option 2: SSH (if available)**
```bash
ssh username@your-server-ip -p port
```

### **B. Navigate to Laravel Directory**
```bash
cd /public_html/api
```

### **C. Install Composer Dependencies (if needed)**
```bash
# Download Composer 2.x locally
curl -sS https://getcomposer.org/installer | php

# Install dependencies
php composer.phar install --optimize-autoloader --no-dev

# Or if global composer 2.x is available:
composer install --optimize-autoloader --no-dev
```

### **D. Generate New Application Key (Optional - you already have one)**
```bash
# This will generate a new APP_KEY (optional since you already have one)
php artisan key:generate
```

**Expected Output:**
```
Application key set successfully.
```

### **E. Run Database Migrations**
```bash
php artisan migrate --force
```

**Expected Output:**
```
Migrating: 2014_10_12_000000_create_users_table
Migrated:  2014_10_12_000000_create_users_table (32.15ms)
...
```

### **F. Cache Configuration for Production**
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### **G. Set File Permissions**
```bash
chmod -R 755 storage bootstrap/cache
chmod -R 777 storage
```

### **H. Create Storage Symbolic Link**
```bash
php artisan storage:link
```

---

## 🧪 **STEP 5: TEST LARAVEL APPLICATION**

### **A. Test Basic Laravel Functionality**
```bash
# Test if Laravel is working
php artisan --version

# Test database connection
php artisan tinker
>>> DB::connection()->getPdo();
>>> exit
```

### **B. Test API Endpoints**

**Test Company Info API:**
```bash
curl -X GET https://api.lamdaku.com/api/v1/company-info
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "company_name": "LAMDAKU",
    "description": "Professional Accreditation Company",
    ...
  }
}
```

---

## 🚨 **TROUBLESHOOTING COMMON ISSUES**

### **❌ "No application encryption key has been specified"**
**Solution:**
1. Ensure `.env` file exists in `/public_html/api/`
2. Verify `APP_KEY` line is present and not empty
3. Run `php artisan key:generate` if needed

### **❌ "Database connection failed"**
**Solution:**
1. Verify database credentials in `.env`
2. Test connection: `php artisan tinker` → `DB::connection()->getPdo();`
3. Check database exists in Hostinger panel

### **❌ "CORS error in browser"**
**Solution:**
1. Verify `FRONTEND_URL=https://lamdaku.com` in `.env`
2. Check `/public_html/api/config/cors.php` includes your domain
3. Clear browser cache

### **❌ "Laravel 500 error"**
**Solution:**
1. Check logs: `tail -f /public_html/api/storage/logs/laravel.log`
2. Verify file permissions: `chmod -R 777 storage`
3. Clear cache: `php artisan cache:clear`

---

## ✅ **SUCCESS CHECKLIST**

### **✅ Environment Configuration:**
- [ ] `.env` file created with complete configuration
- [ ] Database credentials updated
- [ ] APP_KEY is set (not empty)
- [ ] Production URLs configured correctly

### **✅ Database Setup:**
- [ ] MySQL database created in Hostinger panel
- [ ] Database credentials saved securely
- [ ] Laravel can connect to database
- [ ] Migrations run successfully

### **✅ Laravel Setup:**
- [ ] Dependencies installed (`composer install`)
- [ ] Configuration cached (`php artisan config:cache`)
- [ ] Storage permissions set (`chmod -R 777 storage`)
- [ ] Storage link created (`php artisan storage:link`)

### **✅ Testing:**
- [ ] Laravel version command works (`php artisan --version`)
- [ ] API endpoints respond correctly
- [ ] Frontend can communicate with backend
- [ ] No CORS errors in browser console

---

## 🎉 **YOU'RE READY TO GO!**

With the complete `.env` file and proper database setup, your Laravel backend should now be fully functional on Hostinger. The application key issue is resolved and all configurations are production-ready.

**Next Steps:**
1. Test all API endpoints
2. Verify frontend-backend integration
3. Enable SSL certificates
4. Monitor application logs

**URLs to Test:**
- **Frontend:** https://lamdaku.com
- **API Base:** https://api.lamdaku.com/api/v1
- **Company Info:** https://api.lamdaku.com/api/v1/company-info
- **Services:** https://api.lamdaku.com/api/v1/services
