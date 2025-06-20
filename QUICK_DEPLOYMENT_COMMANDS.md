# ⚡ QUICK DEPLOYMENT COMMANDS - HOSTINGER LARAVEL

## 🚀 **IMMEDIATE ACTION NEEDED**

### **1. Database Setup (5 minutes)**
```bash
# In Hostinger Panel:
# 1. Go to Databases → MySQL Databases
# 2. Create database: u123456789_lamdaku  
# 3. Create user: u123456789_user
# 4. Generate strong password and SAVE IT!
```

### **2. Update .env File (3 minutes)**
```bash
# On server, edit /public_html/api/.env
# Update these 3 critical lines:
DB_DATABASE=u123456789_lamdaku
DB_USERNAME=u123456789_user  
DB_PASSWORD=YOUR_ACTUAL_PASSWORD_HERE
```

### **3. Laravel Setup Commands (10 minutes)**
```bash
# SSH to Hostinger server:
cd /public_html/api

# Install dependencies (if vendor/ folder missing):
curl -sS https://getcomposer.org/installer | php
php composer.phar install --optimize-autoloader --no-dev

# Laravel setup:
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan storage:link

# Set permissions:
chmod -R 777 storage
```

### **4. Test Everything (5 minutes)**
```bash
# Test Laravel:
php artisan --version

# Test database:
php artisan tinker
>>> DB::connection()->getPdo();
>>> exit

# Test API:
curl https://api.lamdaku.com/api/v1/company-info
```

---

## 🔧 **TROUBLESHOOTING COMMANDS**

### **If "APP_KEY" Error:**
```bash
php artisan key:generate
```

### **If Database Error:**
```bash
php artisan tinker
>>> DB::connection()->getPdo();
```

### **If 500 Error:**
```bash
tail -f storage/logs/laravel.log
chmod -R 777 storage
php artisan cache:clear
```

### **If CORS Error:**
```bash
# Check config/cors.php includes:
# 'allowed_origins' => ['https://lamdaku.com']
```

---

## ✅ **SUCCESS INDICATORS**

- ✅ `php artisan --version` shows Laravel version
- ✅ `php artisan migrate --force` creates database tables
- ✅ `curl https://api.lamdaku.com/api/v1/company-info` returns JSON
- ✅ Frontend https://lamdaku.com loads without CORS errors
- ✅ Contact form submits successfully

---

## 📞 **NEXT STEPS AFTER SUCCESS**

1. **Enable SSL:** Hostinger Panel → SSL → Enable for both domains
2. **Test Integration:** Verify frontend ↔ backend communication  
3. **Performance:** Monitor API response times
4. **Security:** Verify HTTPS enforcement
5. **Monitoring:** Check Laravel logs regularly

**TOTAL TIME:** ~25 minutes for complete deployment
