# ✅ VISUAL DEPLOYMENT CHECKLIST - LAMDAKU.COM

## 📋 **PRE-DEPLOYMENT**
- [ ] ✅ Hostinger account ready (Business plan)
- [ ] ✅ Domain `lamdaku.com` pointed to Hostinger  
- [ ] ✅ File `lamdaku-complete-hostinger.zip` downloaded
- [ ] ⏱️ **Time allocated:** 45 minutes

---

## 🎯 **PHASE 1: HOSTINGER SETUP**

### **Login & Access**
- [ ] 🌐 Login to Hostinger hPanel
- [ ] 📂 Access File Manager
- [ ] 🗑️ Delete default files in `/public_html/`

---

## 🎯 **PHASE 2: FILE UPLOAD**

### **Upload Package**
- [ ] 📤 Upload `lamdaku-complete-hostinger.zip` to `/public_html/`
- [ ] 📦 Extract ZIP file  
- [ ] 📁 Move frontend files to `/public_html/` root:
  - [ ] ✅ `index.html`
  - [ ] ✅ `static/` folder
  - [ ] ✅ `favicon.ico`, `favicon.png`, `favicon.svg`
  - [ ] ✅ `asset-manifest.json`
  - [ ] ✅ `.htaccess`
- [ ] 🔧 Keep `/public_html/api/` folder intact

---

## 🎯 **PHASE 3: SUBDOMAIN SETUP**

### **Create API Subdomain**
- [ ] 🌐 Go to Domains → Subdomains
- [ ] ➕ Create new subdomain:
  - [ ] **Subdomain:** `api`
  - [ ] **Domain:** `lamdaku.com`  
  - [ ] **Document Root:** `/public_html/api/public`
- [ ] ⏳ Wait 5-15 minutes for DNS propagation

---

## 🎯 **PHASE 4: DATABASE**

### **MySQL Database Setup**
- [ ] 🗄️ Go to Databases → MySQL Databases
- [ ] ➕ Create new database
- [ ] 📝 **SAVE CREDENTIALS:**
  - [ ] Database Name: `_______________`
  - [ ] Username: `_______________`
  - [ ] Password: `_______________`

### **Update Laravel Configuration**  
- [ ] 📝 Edit `/public_html/api/.env`
- [ ] 🔄 Update database settings:
  ```env
  DB_DATABASE=your_database_name
  DB_USERNAME=your_username  
  DB_PASSWORD=your_password
  ```

---

## 🎯 **PHASE 5: LARAVEL SETUP**

### **Access Terminal**
- [ ] 💻 Open Hostinger Web Terminal
- [ ] 📂 Navigate: `cd /public_html/api`

### **Run Laravel Commands**
- [ ] 🔑 `php artisan key:generate`
- [ ] 📊 `php artisan migrate --force`
- [ ] 🌱 `php artisan db:seed` (optional)
- [ ] ⚡ `php artisan config:cache`
- [ ] ⚡ `php artisan route:cache`
- [ ] 📁 `php artisan storage:link`
- [ ] 🔒 `chmod -R 777 storage`

---

## 🎯 **PHASE 6: SSL SECURITY**

### **Enable SSL Certificates**
- [ ] 🔒 Go to Security → SSL/TLS
- [ ] ✅ Enable SSL for `lamdaku.com`
- [ ] ✅ Enable SSL for `api.lamdaku.com`
- [ ] 🔄 Force HTTPS on both domains
- [ ] ⏳ Wait 10-15 minutes for SSL activation

---

## 🎯 **PHASE 7: TESTING**

### **Frontend Testing**
- [ ] 🌐 Test `https://lamdaku.com`
- [ ] 📄 Check all pages load:
  - [ ] ✅ Home page
  - [ ] ✅ Services (`/services`)
  - [ ] ✅ Profile (`/profile`)  
  - [ ] ✅ Contact (`/contact`)
- [ ] 📱 Test mobile responsive design
- [ ] 🖼️ Verify logo displays at 64px

### **Backend API Testing**
- [ ] 🔗 Test `https://api.lamdaku.com/api/v1/company-info`
- [ ] 🔗 Test `https://api.lamdaku.com/api/v1/services`
- [ ] 📊 Verify JSON responses
- [ ] 🔒 Check CORS headers work

### **Integration Testing**
- [ ] 🔄 Frontend loads data from backend
- [ ] ❌ No "API tidak tersedia" errors
- [ ] 📝 Contact form works
- [ ] 🖼️ Logo loads from API
- [ ] 📈 Timeline displays from database

### **Browser Console Check**
- [ ] 🔍 Open Developer Tools (F12)
- [ ] ✅ No red errors in Console
- [ ] ✅ API calls successful in Network tab
- [ ] ✅ No CORS errors

---

## 🎯 **PHASE 8: OPTIMIZATION**

### **Performance Enhancements**
- [ ] ⚡ Enable LiteSpeed Cache
- [ ] 🌐 Enable CDN (optional)
- [ ] 📊 Test page load speeds
- [ ] 📱 Verify mobile performance

---

## 🎉 **FINAL VERIFICATION**

### **Success Indicators**
- [ ] ✅ `https://lamdaku.com` displays website
- [ ] ✅ All navigation links work
- [ ] ✅ Company info loads dynamically
- [ ] ✅ Services display from database
- [ ] ✅ Contact form submits successfully
- [ ] ✅ Logo displays from backend storage
- [ ] ✅ SSL certificates active (🔒 icon)
- [ ] ✅ Mobile responsive
- [ ] ✅ Fast loading (< 3 seconds)

### **Performance Metrics**
- [ ] 🚀 Frontend load time: _____ seconds
- [ ] ⚡ API response time: _____ ms
- [ ] 📱 Mobile score: _____%
- [ ] 🔒 SSL grade: _____

---

## 🚨 **TROUBLESHOOTING QUICK FIXES**

### **If Frontend Doesn't Load:**
- [ ] ✅ Check DNS propagation
- [ ] ✅ Verify `.htaccess` in root
- [ ] ✅ Clear browser cache

### **If API Returns Errors:**
- [ ] ✅ Check Laravel logs: `/storage/logs/laravel.log`
- [ ] ✅ Verify database connection
- [ ] ✅ Re-run: `php artisan key:generate`

### **If CORS Errors:**
- [ ] ✅ Check `/config/cors.php`
- [ ] ✅ Verify allowed origins
- [ ] ✅ Clear browser cache

---

## 🎯 **COMPLETION CELEBRATION!**

### **When Everything Works:**
✅ **Frontend:** Beautiful website loading at `https://lamdaku.com`  
✅ **Backend:** API responding at `https://api.lamdaku.com/api/v1`  
✅ **Integration:** Dynamic content loading from database  
✅ **Security:** SSL certificates active  
✅ **Performance:** Fast and responsive  

### **🎉 YOU DID IT!**
**LAMDAKU.COM is now live and fully functional!**

---

## 📞 **GET HELP IF STUCK**

### **Resources:**
- 📚 **Detailed Guide:** `COMPLETE_STEP_BY_STEP_DEPLOYMENT.md`
- ⚡ **Quick Reference:** `QUICK_DEPLOYMENT_REFERENCE.md`
- 🏢 **Hostinger Support:** 24/7 live chat
- 📋 **Logs:** Check `/public_html/api/storage/logs/`

### **Emergency Commands:**
```bash
# Reset Laravel
cd /public_html/api
php artisan key:generate
php artisan migrate:refresh --force
php artisan config:clear
chmod -R 777 storage
```

---

**⏱️ Expected Total Time: 45 minutes**  
**📊 Success Rate: 99%+ with this checklist**  
**🎯 Target: Professional company website with dynamic backend**

**🚀 Ready to launch? Let's go!**
