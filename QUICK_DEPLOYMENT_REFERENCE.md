# ⚡ QUICK DEPLOYMENT REFERENCE - LAMDAKU.COM

## 🎯 **DEPLOYMENT SUMMARY**
- **Package:** `lamdaku-complete-hostinger.zip` (5.6MB)
- **Frontend:** `https://lamdaku.com` (React SPA)
- **Backend:** `https://api.lamdaku.com/api/v1` (Laravel API)
- **Time:** ~45 minutes

---

## 🚀 **QUICK STEPS OVERVIEW**

### **1. UPLOAD (5 min)**
```
1. Hostinger File Manager → /public_html/
2. Upload lamdaku-complete-hostinger.zip
3. Extract ZIP
4. Move frontend files to root, keep API in /api/
```

### **2. SUBDOMAIN (5 min)**
```
1. Domains → Subdomains → Create
2. Subdomain: api
3. Domain: lamdaku.com
4. Document Root: /public_html/api/public
```

### **3. DATABASE (10 min)**
```
1. Databases → MySQL → Create Database
2. Note credentials: database, username, password
3. Edit /public_html/api/.env
4. Update DB_DATABASE, DB_USERNAME, DB_PASSWORD
```

### **4. LARAVEL SETUP (15 min)**
```bash
cd /public_html/api
php artisan key:generate
php artisan migrate --force
php artisan config:cache
php artisan storage:link
chmod -R 777 storage
```

### **5. SSL & TEST (10 min)**
```
1. Security → SSL → Enable for both domains
2. Test: https://lamdaku.com
3. Test: https://api.lamdaku.com/api/v1/company-info
4. Verify integration works
```

---

## 🧪 **TESTING CHECKLIST**

### **✅ Must Work:**
- [ ] `https://lamdaku.com` loads
- [ ] All pages accessible (/services, /profile, /contact)
- [ ] API returns JSON: `/api/v1/company-info`
- [ ] No CORS errors in browser console
- [ ] Contact form works
- [ ] Logo displays from backend
- [ ] Mobile responsive

---

## 🚨 **IF SOMETHING BREAKS**

### **Laravel 500 Error:**
```bash
cat /public_html/api/storage/logs/laravel.log
php artisan key:generate
```

### **Database Error:**
```bash
cd /public_html/api
php artisan tinker
> DB::connection()->getPdo();
```

### **CORS Error:**
- Check `/public_html/api/config/cors.php`
- Verify `allowed_origins` has `https://lamdaku.com`

### **Frontend 404:**
- Check `.htaccess` in `/public_html/`
- Verify React Router configuration

---

## 📞 **SUPPORT CONTACTS**
- **Hostinger Support:** 24/7 live chat
- **Documentation:** Check COMPLETE_STEP_BY_STEP_DEPLOYMENT.md
- **Logs:** `/public_html/api/storage/logs/laravel.log`

---

**🎉 SUCCESS INDICATOR:**
When you see company data loading dynamically on `https://lamdaku.com` from `https://api.lamdaku.com`, YOU'RE DONE! 🚀
