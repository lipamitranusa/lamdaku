# 🔧 LARAVEL SSH TROUBLESHOOTING GUIDE
## Mengatasi Masalah "php artisan" di Hostinger

**📅 Date:** June 13, 2025  
**🎯 Issue:** Command `php artisan generate` tidak berfungsi

---

## ❌ **MASALAH YANG UMUM TERJADI**

### **1. Command Salah:**
```bash
# ❌ SALAH - Command ini tidak ada
php artisan generate

# ✅ BENAR - Command yang tepat
php artisan key:generate
```

### **2. Directory Salah:**
```bash
# ✅ Pastikan Anda di directory yang benar
pwd
# Output harus: /public_html/api atau /home/username/public_html/api
```

### **3. File .env Tidak Ada:**
```bash
# ✅ Check apakah file .env ada
ls -la .env
# Harus ada file .env
```

---

## 🔍 **LANGKAH DEBUGGING**

### **STEP 1: Verifikasi Lokasi**
```bash
# Check directory saat ini
pwd

# Navigate ke directory Laravel yang benar
cd /public_html/api
# atau
cd ~/public_html/api
```

### **STEP 2: Verifikasi File Laravel**
```bash
# Check apakah ini directory Laravel
ls -la

# Harus ada file-file ini:
# - artisan
# - composer.json
# - .env
# - app/
# - config/
# - vendor/ (jika Composer sudah dijalankan)
```

### **STEP 3: Check File Artisan**
```bash
# Pastikan file artisan ada dan executable
ls -la artisan

# Output harus seperti:
# -rwxr-xr-x 1 user user 1234 date artisan
```

### **STEP 4: Test PHP**
```bash
# Test apakah PHP berfungsi
php --version

# Test basic artisan
php artisan --version
```

---

## 🚀 **SOLUSI LANGKAH-DEMI-LANGKAH**

### **STEP 1: Pastikan Directory Benar**
```bash
# Navigate ke directory Laravel
cd /public_html/api

# Atau jika path berbeda:
cd ~/public_html/api
```

### **STEP 2: Verifikasi Environment**
```bash
# Check file .env ada
cat .env | head -5

# Jika tidak ada, copy dari .env.example
cp .env.example .env
```

### **STEP 3: Install Dependencies (PENTING!)**
```bash
# Install Composer dependencies terlebih dahulu
composer install --optimize-autoloader --no-dev

# Output yang diharapkan:
# Loading composer repositories with package information
# Installing dependencies from lock file
# ...
# Generating optimized autoload files
```

### **STEP 4: Generate Application Key**
```bash
# Sekarang generate key
php artisan key:generate

# Output yang diharapkan:
# Application key set successfully.
```

### **STEP 5: Test Laravel Berfungsi**
```bash
# Test artisan commands lainnya
php artisan --version
php artisan list
```

---

## 🚨 **TROUBLESHOOTING ERRORS**

### **Error: "Could not open input file: artisan"**
```bash
# Solusi: Anda tidak di directory Laravel
pwd
cd /public_html/api
ls -la artisan
```

### **Error: "php: command not found"**
```bash
# Solusi: PHP tidak tersedia
which php
# Atau coba path lengkap:
/usr/bin/php artisan key:generate
```

### **Error: "Class 'Illuminate\Foundation\Application' not found"**
```bash
# Solusi: Dependencies belum ter-install
composer install --optimize-autoloader --no-dev
```

### **Error: "No application encryption key has been specified"**
```bash
# Solusi: .env file tidak ada atau kosong
cp .env.example .env
php artisan key:generate
```

---

## 📋 **COMPLETE COMMAND SEQUENCE**

### **✅ Urutan Command yang Benar:**
```bash
# 1. Navigate ke directory Laravel
cd /public_html/api

# 2. Verify location
pwd
ls -la

# 3. Install dependencies (WAJIB!)
composer install --optimize-autoloader --no-dev

# 4. Generate application key
php artisan key:generate

# 5. Configure database (update .env first)
php artisan migrate --force

# 6. Create storage link
php artisan storage:link

# 7. Cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 8. Set permissions
chmod -R 755 storage/ bootstrap/cache/ public/
```

---

## 🔍 **QUICK DIAGNOSTIC**

### **Jalankan Commands Ini untuk Diagnosis:**
```bash
# Check 1: Location
echo "Current directory: $(pwd)"

# Check 2: Laravel files
echo "Artisan file exists: $([ -f artisan ] && echo 'YES' || echo 'NO')"

# Check 3: Composer
echo "Composer available: $(composer --version 2>/dev/null && echo 'YES' || echo 'NO')"

# Check 4: Vendor folder
echo "Vendor folder exists: $([ -d vendor ] && echo 'YES' || echo 'NO')"

# Check 5: .env file
echo ".env file exists: $([ -f .env ] && echo 'YES' || echo 'NO')"
```

---

## 🎯 **KEMUNGKINAN PENYEBAB UTAMA**

### **1. Dependencies Belum Ter-Install (90% Kasus)**
```bash
# Folder vendor/ tidak ada karena belum jalankan:
composer install --optimize-autoloader --no-dev
```

### **2. Directory Salah (5% Kasus)**
```bash
# Tidak berada di /public_html/api/
cd /public_html/api
```

### **3. File .env Tidak Ada (3% Kasus)**
```bash
# File .env hilang atau tidak ada
cp .env.example .env
```

### **4. Permissions Issue (2% Kasus)**
```bash
# File artisan tidak executable
chmod +x artisan
```

---

## 📞 **LANGKAH SELANJUTNYA**

### **Jika Masih Error:**
1. **Screenshot error message** yang muncul
2. **Copy-paste output** dari command yang gagal
3. **Verifikasi** dengan diagnostic commands di atas
4. **Check** file log di `/storage/logs/laravel.log`

### **Untuk Melanjutkan Deployment:**
Setelah `composer install` dan `php artisan key:generate` berhasil, lanjutkan ke:
- Database migration
- Storage link
- Cache optimization
- Permissions setting

---

**🎯 SOLUSI TERCEPAT: Jalankan `composer install` terlebih dahulu, baru `php artisan key:generate`**
