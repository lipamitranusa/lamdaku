# 🎯 QUICK DEPLOYMENT CHECKLIST

## 📋 **PRE-DEPLOYMENT CHECKLIST**

### **✅ Frontend (React)**
- [ ] Environment configuration created (`src/config/environment.js`)
- [ ] API URLs configured for production
- [ ] Build scripts added to `package.json`
- [ ] Static assets optimized
- [ ] Deployment script prepared (`deploy.ps1`)

### **✅ Backend (Laravel)**
- [ ] Production `.env` file configured
- [ ] CORS settings updated for production domain
- [ ] Database credentials secured
- [ ] SSL certificate ready
- [ ] Cache optimization enabled

### **✅ Server Requirements**
- [ ] PHP 8.1+ installed
- [ ] Node.js 14+ (for build process)
- [ ] MySQL/PostgreSQL database
- [ ] Web server (Apache/Nginx)
- [ ] SSL certificate
- [ ] Domain/subdomain configured

## 🚀 **DEPLOYMENT COMMANDS**

### **1. Frontend Deployment**
```powershell
# Development build
npm run build

# Staging build
npm run build:staging

# Production build  
npm run build:production

# Automated deployment
.\deploy.ps1 -Environment production
```

### **2. Backend Deployment**
```bash
# On server
composer install --optimize-autoloader --no-dev
php artisan key:generate
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 🌐 **EXPECTED URLS**

### **Production**
- **Frontend**: `https://company.lamdaku.com`
- **Backend API**: `https://api.lamdaku.com/api/v1`

### **Staging**
- **Frontend**: `https://staging.lamdaku.com`
- **Backend API**: `https://staging-api.lamdaku.com/api/v1`

## 🔧 **CONFIGURATION FILES**

### **Frontend Environment** (`src/config/environment.js`)
```javascript
production: {
  API_BASE_URL: 'https://api.lamdaku.com/api/v1',
  APP_URL: 'https://company.lamdaku.com'
}
```

### **Backend CORS** (`config/cors.php`)
```php
'allowed_origins' => [
  'https://company.lamdaku.com',
],
```

### **Backend Environment** (`.env`)
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.lamdaku.com
FRONTEND_URL=https://company.lamdaku.com
```

## 📤 **DEPLOYMENT PROCESS**

### **Step 1: Prepare Build**
1. Run deployment script: `.\deploy.ps1 -Environment production`
2. Upload generated ZIP file to server
3. Extract to web root directory

### **Step 2: Configure Server**
1. Point domain to server IP
2. Configure web server (Apache/Nginx)
3. Install SSL certificate
4. Set proper file permissions

### **Step 3: Test Deployment**
1. Access frontend URL
2. Test API endpoints
3. Verify all pages load
4. Check mobile responsiveness

## 🔍 **TESTING URLS**

```
Frontend: https://company.lamdaku.com
API Test: https://api.lamdaku.com/api/v1/services
Health Check: https://api.lamdaku.com/api/v1/health
```

## 🚨 **TROUBLESHOOTING**

### **Common Issues**
- **CORS errors**: Check `allowed_origins` in Laravel
- **API not found**: Verify backend server is running
- **SSL errors**: Ensure certificates are properly installed
- **Routes not working**: Configure web server for SPA

### **Debug Commands**
```bash
# Check Laravel logs
tail -f storage/logs/laravel.log

# Test API endpoint
curl https://api.lamdaku.com/api/v1/services

# Check SSL certificate
openssl s_client -connect api.lamdaku.com:443
```

---

## 🎉 **DEPLOYMENT READY!**

Dengan konfigurasi ini, aplikasi LAMDAKU siap untuk:
- ✅ **Production deployment**
- ✅ **SSL-secured connections**
- ✅ **Cross-origin API calls**
- ✅ **Optimized performance**
- ✅ **Scalable architecture**

**Ready to go live! 🚀**
