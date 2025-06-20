# 🚀 BACKEND HOSTINGER DEPLOYMENT - LAMDAKU.COM
## COMPLETE GUIDE WITH ACTUAL LARAVEL BACKEND

**Generated:** June 13, 2025  
**Source Backend:** `D:\laragon\www\LAMDAKU\lamdaku-cms-backend`  
**Target:** `https://api.lamdaku.com/api/v1`

---

## 🎯 **DEPLOYMENT OVERVIEW**

### **✅ BACKEND SUDAH SIAP DEPLOY:**
- **Source:** Laravel backend dari `D:\laragon\www\LAMDAKU\lamdaku-cms-backend`
- **Package:** `lamdaku-complete-hostinger.zip` (5.6MB)
- **Configuration:** Production-ready dengan CORS dan security headers
- **API Endpoints:** Fully functional dengan database migrations

### **🌐 PRODUCTION ARCHITECTURE:**
```
Internet → https://api.lamdaku.com → Hostinger Server
                    ↓
            /public_html/api/public/ (Laravel Document Root)
                    ↓
            Laravel Application (/public_html/api/)
                    ↓
            MySQL Database (Hostinger)
```

---

## 📦 **WHAT'S INCLUDED IN BACKEND PACKAGE**

### **✅ Laravel Application Structure:**
```
/public_html/api/
├── .env (Production configuration)
├── app/ (Controllers, Models, Middleware)
├── config/ (Updated CORS & database settings)
├── database/ (Migrations & seeders)
├── public/ (Document root with .htaccess)
├── routes/ (API routes)
├── storage/ (Logs, cache, uploads)
├── resources/ (Views, assets)
└── vendor/ (Excluded - will run composer install)
```

### **✅ API Controllers Ready:**
- **CompanyInfoController** - Company data & logo management
- **ServiceController** - Services data
- **ContactController** - Contact form handling
- **TimelineController** - Company timeline/history
- **PageController** - Page content management

### **✅ Production Configuration Applied:**
- **Environment:** `APP_ENV=production`
- **Debug:** `APP_DEBUG=false`
- **URL:** `APP_URL=https://api.lamdaku.com`
- **CORS:** Configured for `https://lamdaku.com`
- **Security Headers:** Added to .htaccess
- **Database:** Ready for Hostinger MySQL

---

## 🚀 **STEP-BY-STEP DEPLOYMENT**

### **STEP 1: Upload Backend ke Hostinger**

#### **A. Hostinger File Manager Upload:**
1. Login ke **Hostinger Panel**
2. Go to **File Manager**
3. Navigate to `/public_html/`
4. Upload `lamdaku-complete-hostinger.zip`
5. **Extract** ZIP file
6. **Move API folder** structure:
   ```
   Extract: /public_html/api/ (Keep entire Laravel app here)
   ```

### **STEP 2: Create Subdomain untuk API**

#### **A. Subdomain Configuration:**
1. **Hostinger Panel** → **Domains** → **Subdomains**
2. **Create New Subdomain:**
   - **Subdomain:** `api`
   - **Domain:** `lamdaku.com`
   - **Document Root:** `/public_html/api/public`
3. **Wait for DNS propagation** (5-15 minutes)

### **STEP 3: Database Setup**

#### **A. Create MySQL Database:**
1. **Hostinger Panel** → **Databases** → **MySQL Databases**
2. **Create Database:**
   - Database Name: `u123456789_lamdaku` (auto-generated)
   - Username: `u123456789_user` (auto-generated)  
   - Password: `[GENERATE STRONG PASSWORD]`
3. **Save credentials** - you'll need them!

#### **B. Update .env File:**
1. Navigate to `/public_html/api/.env`
2. **Update database credentials:**
   ```env
   DB_DATABASE=u123456789_lamdaku
   DB_USERNAME=u123456789_user
   DB_PASSWORD=[YOUR_STRONG_PASSWORD]
   ```

### **STEP 4: Laravel Setup Commands**

#### **A. Via Hostinger Terminal/SSH:**
```bash
cd /public_html/api

# Generate Laravel application key
php artisan key:generate

# Run database migrations
php artisan migrate --force

# Seed initial data (optional)
php artisan db:seed

# Cache configuration for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
chmod -R 755 storage bootstrap/cache
chmod -R 777 storage

# Create storage symbolic link
php artisan storage:link
```

#### **B. If No SSH Access:**
1. Use **Hostinger Web Terminal**
2. Or set permissions via **File Manager:**
   - `storage/` → `777` permissions
   - `bootstrap/cache/` → `755` permissions

### **STEP 5: SSL Certificate Setup**

#### **A. Enable SSL:**
1. **Hostinger Panel** → **Security** → **SSL/TLS**
2. **Enable SSL for:**
   - ✅ `lamdaku.com`
   - ✅ `api.lamdaku.com`
3. **Force HTTPS Redirect:** Enable

---

## 🧪 **TESTING BACKEND DEPLOYMENT**

### **✅ API Endpoint Tests:**

#### **A. Test Basic API Availability:**
```bash
curl https://api.lamdaku.com/api/v1/services
```
**Expected:** JSON array of services

#### **B. Test Company Info API:**
```bash
curl https://api.lamdaku.com/api/v1/company-info
```
**Expected:** JSON object with company information

#### **C. Test CORS Headers:**
```bash
curl -H "Origin: https://lamdaku.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://api.lamdaku.com/api/v1/services
```
**Expected:** CORS headers present

### **✅ Browser Testing:**
1. Open browser developer tools
2. Visit `https://lamdaku.com`
3. Check Network tab for API calls
4. Verify no CORS errors
5. Confirm data loads from backend

---

## 🔧 **PRODUCTION FEATURES CONFIGURED**

### **✅ Security:**
- **HTTPS Enforced** - SSL certificate required
- **Security Headers** - XSS protection, frame options, etc.
- **CORS Configured** - Only allows lamdaku.com domain
- **Debug Disabled** - No error details exposed

### **✅ Performance:**
- **Gzip Compression** - Faster response times
- **Static Asset Caching** - 1 year cache headers
- **Configuration Cached** - Laravel config optimized
- **Route Cached** - Faster route resolution

### **✅ API Endpoints Ready:**
```
GET  /api/v1/company-info    - Company information & logo
GET  /api/v1/services        - Services list
GET  /api/v1/timeline        - Company timeline/history
GET  /api/v1/pages           - Page content
POST /api/v1/contact         - Contact form submission
```

---

## 🚨 **TROUBLESHOOTING GUIDE**

### **❌ Common Issues & Solutions:**

#### **1. Laravel 500 Error:**
```bash
# Check error logs
cat /public_html/api/storage/logs/laravel.log

# Verify APP_KEY is set
cd /public_html/api
php artisan key:generate

# Check .env file permissions
chmod 644 .env
```

#### **2. Database Connection Error:**
```bash
# Test database connection
cd /public_html/api
php artisan tinker
> DB::connection()->getPdo();
```
**Fix:** Verify database credentials in `.env`

#### **3. CORS Error in Browser:**
- Check `/public_html/api/config/cors.php`
- Verify `allowed_origins` includes `https://lamdaku.com`
- Clear browser cache

#### **4. API Routes Not Working:**
- Verify subdomain document root: `/public_html/api/public`
- Check `.htaccess` file exists in `/public_html/api/public/`
- Ensure `mod_rewrite` is enabled

#### **5. Storage/Upload Issues:**
```bash
# Fix storage permissions
cd /public_html/api
chmod -R 777 storage
php artisan storage:link
```

#### **6. Composer Dependencies Missing:**
```bash
# Install production dependencies
cd /public_html/api
composer install --optimize-autoloader --no-dev
```

---

## 📊 **EXPECTED FINAL RESULT**

### **✅ Working URLs:**
- **API Base:** `https://api.lamdaku.com/api/v1`
- **Company Info:** `https://api.lamdaku.com/api/v1/company-info`
- **Services:** `https://api.lamdaku.com/api/v1/services`
- **Timeline:** `https://api.lamdaku.com/api/v1/timeline`

### **✅ Frontend Integration:**
- **Main Site:** `https://lamdaku.com` loads data from API
- **No CORS Errors** in browser console
- **Dynamic Content** displays correctly
- **Contact Form** submits to backend
- **Logo** loads from backend storage

### **✅ Performance Metrics:**
- **Response Time:** < 500ms for API calls
- **SSL Grade:** A+ rating
- **Uptime:** 99.9% (Hostinger guarantee)
- **Database:** Optimized queries with caching

---

## 🎉 **DEPLOYMENT SUCCESS CHECKLIST**

### **✅ Before Going Live:**
- [ ] Subdomain `api.lamdaku.com` resolves correctly
- [ ] SSL certificate installed and active
- [ ] Database created and connected
- [ ] Laravel migrations ran successfully
- [ ] API endpoints return valid JSON
- [ ] CORS headers allow frontend access
- [ ] Error logs are clean
- [ ] Storage permissions are correct
- [ ] Configuration is cached

### **✅ Post-Deployment:**
- [ ] Frontend loads data from backend
- [ ] Contact form submissions work
- [ ] Logo displays from API
- [ ] All pages function correctly
- [ ] Mobile responsive design works
- [ ] Browser console shows no errors

---

## 🎯 **READY FOR PRODUCTION!**

**Backend Laravel sudah 100% siap untuk deployment ke Hostinger dengan:**

- ✅ **Complete Laravel Application** from actual development backend
- ✅ **Production Configuration** optimized for Hostinger
- ✅ **Security Headers** and HTTPS enforcement
- ✅ **CORS Configuration** for frontend integration
- ✅ **Database Migrations** ready to run
- ✅ **API Endpoints** tested and functional
- ✅ **Error Handling** and logging configured
- ✅ **Performance Optimization** with caching

**Total Package Size:** 5.6MB (optimized for fast upload)  
**Deployment Time:** ~45 minutes (including DNS propagation)  
**Expected Uptime:** 99.9% (Hostinger Business hosting)

---

**🚀 READY TO DEPLOY TO HOSTINGER!**

Upload `lamdaku-complete-hostinger.zip` dan ikuti panduan step-by-step di atas untuk deployment backend yang sukses.
