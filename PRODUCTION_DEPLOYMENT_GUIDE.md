# 🚀 PRODUCTION DEPLOYMENT GUIDE

## 🎯 **OVERVIEW**

Panduan lengkap untuk deploy aplikasi LAMDAKU ke hosting production dengan konfigurasi yang tepat.

## 📋 **HOSTING REQUIREMENTS**

### **Frontend (React)**
- **Node.js**: v14+ atau static file hosting
- **Web Server**: Apache/Nginx
- **SSL Certificate**: Recommended
- **Domain**: Example: `company.lamdaku.com`

### **Backend (Laravel)**
- **PHP**: v8.1+
- **MySQL**: v5.7+ atau v8.0+
- **Composer**: Latest version
- **Web Server**: Apache/Nginx dengan PHP-FPM
- **SSL Certificate**: Required untuk API
- **Subdomain**: Example: `api.lamdaku.com`

## ⚙️ **CONFIGURATION CHANGES NEEDED**

### **1. Frontend Environment Configuration**

#### **A. Create Environment Files**
```javascript
// filepath: src/config/environment.js

const config = {
  development: {
    API_BASE_URL: 'http://127.0.0.1:8000/api/v1',
    APP_URL: 'http://localhost:3000'
  },
  production: {
    API_BASE_URL: 'https://api.lamdaku.com/api/v1',
    APP_URL: 'https://company.lamdaku.com'
  }
};

const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return config[env];
};

export default getConfig();
```

#### **B. Update API Service**
```javascript
// filepath: src/services/api.js

import config from '../config/environment';

// Production-ready API URL configuration
const getApiBaseUrl = () => {
  // Production environment
  if (process.env.NODE_ENV === 'production') {
    return config.API_BASE_URL;
  }
  
  // Development - dynamic detection
  const currentHost = window.location.hostname;
  
  if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
    return `http://${currentHost}:8000/api/v1`;
  }
  
  return 'http://127.0.0.1:8000/api/v1';
};

const API_BASE_URL = getApiBaseUrl();
```

#### **C. Build Configuration**
```json
// filepath: package.json

{
  "scripts": {
    "build:prod": "REACT_APP_ENV=production npm run build",
    "build:staging": "REACT_APP_ENV=staging npm run build"
  },
  "homepage": "https://company.lamdaku.com"
}
```

### **2. Backend Laravel Configuration**

#### **A. Production .env File**
```env
# filepath: .env (Production)

APP_NAME="LAMDAKU CMS"
APP_ENV=production
APP_KEY=base64:GENERATE_NEW_KEY_HERE
APP_DEBUG=false
APP_URL=https://api.lamdaku.com

# Database (Production)
DB_CONNECTION=mysql
DB_HOST=your-database-host
DB_PORT=3306
DB_DATABASE=lamdaku_production
DB_USERNAME=lamdaku_user
DB_PASSWORD=secure_password_here

# CORS Configuration
FRONTEND_URL=https://company.lamdaku.com
SANCTUM_STATEFUL_DOMAINS=company.lamdaku.com

# Cache & Sessions
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=your-email@lamdaku.com
MAIL_PASSWORD=your-email-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@lamdaku.com
MAIL_FROM_NAME="LAMDAKU"
```

#### **B. CORS Production Configuration**
```php
// filepath: config/cors.php

<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        env('FRONTEND_URL', 'https://company.lamdaku.com'),
    ],
    'allowed_origins_patterns' => [
        // Add patterns if needed for multiple environments
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

#### **C. Database Configuration**
```php
// filepath: config/database.php

'mysql' => [
    'driver' => 'mysql',
    'url' => env('DATABASE_URL'),
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '3306'),
    'database' => env('DB_DATABASE', 'forge'),
    'username' => env('DB_USERNAME', 'forge'),
    'password' => env('DB_PASSWORD', ''),
    'unix_socket' => env('DB_SOCKET', ''),
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
    'prefix_indexes' => true,
    'strict' => true,
    'engine' => null,
    'options' => extension_loaded('pdo_mysql') ? array_filter([
        PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
    ]) : [],
],
```

## 🌐 **WEB SERVER CONFIGURATION**

### **1. Nginx Configuration**

#### **A. Frontend (React)**
```nginx
# /etc/nginx/sites-available/company.lamdaku.com

server {
    listen 80;
    listen [::]:80;
    server_name company.lamdaku.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name company.lamdaku.com;

    root /var/www/company.lamdaku.com/build;
    index index.html;

    # SSL Configuration
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/private.key;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # React Router handling
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static assets caching
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

#### **B. Backend API (Laravel)**
```nginx
# /etc/nginx/sites-available/api.lamdaku.com

server {
    listen 80;
    listen [::]:80;
    server_name api.lamdaku.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.lamdaku.com;

    root /var/www/api.lamdaku.com/public;
    index index.php;

    # SSL Configuration
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/private.key;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Laravel configuration
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Deny access to sensitive files
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### **2. Apache Configuration (.htaccess)**

#### **A. Frontend (React)**
```apache
# filepath: public/.htaccess

RewriteEngine On

# Handle React Router
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

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
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

#### **B. Backend API (Laravel)**
```apache
# filepath: public/.htaccess (Laravel default with CORS)

<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>

# CORS Headers
Header add Access-Control-Allow-Origin "https://company.lamdaku.com"
Header add Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
Header add Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
```

## 📦 **DEPLOYMENT STEPS**

### **1. Prepare Build Files**

#### **Frontend Build**
```powershell
# Local machine
cd "d:\laragon\www\LAMDAKU\accreditation-company-profile"

# Set production environment
$env:NODE_ENV="production"
$env:REACT_APP_API_URL="https://api.lamdaku.com/api/v1"

# Build for production
npm run build

# Upload 'build' folder to hosting
# Target: /var/www/company.lamdaku.com/
```

#### **Backend Deployment**
```bash
# On hosting server
cd /var/www/api.lamdaku.com

# Clone repository
git clone https://github.com/your-repo/lamdaku-cms-backend .

# Install dependencies
composer install --optimize-autoloader --no-dev

# Set permissions
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Environment setup
cp .env.example .env
# Edit .env with production values

# Generate key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create symbolic link for storage
php artisan storage:link
```

### **2. Database Setup**
```sql
-- Create production database
CREATE DATABASE lamdaku_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'lamdaku_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON lamdaku_production.* TO 'lamdaku_user'@'localhost';
FLUSH PRIVILEGES;
```

### **3. SSL Certificate Setup**
```bash
# Using Let's Encrypt (Certbot)
sudo apt install certbot python3-certbot-nginx

# Generate certificates
sudo certbot --nginx -d company.lamdaku.com
sudo certbot --nginx -d api.lamdaku.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔧 **ENVIRONMENT-SPECIFIC CONFIGS**

### **1. Staging Environment**
```javascript
// src/config/environment.js
staging: {
  API_BASE_URL: 'https://staging-api.lamdaku.com/api/v1',
  APP_URL: 'https://staging.lamdaku.com'
}
```

### **2. Multiple Domain Support**
```php
// config/cors.php
'allowed_origins' => [
    'https://company.lamdaku.com',
    'https://staging.lamdaku.com',
    'https://demo.lamdaku.com',
],
```

## 📊 **PRODUCTION CHECKLIST**

### **✅ Security**
- [ ] SSL certificates installed
- [ ] APP_DEBUG=false
- [ ] Strong APP_KEY generated
- [ ] Database credentials secured
- [ ] CORS properly configured
- [ ] Security headers added

### **✅ Performance**
- [ ] Laravel caches enabled
- [ ] Static file compression (Gzip)
- [ ] CDN for assets (optional)
- [ ] Database optimization
- [ ] Redis for caching/sessions

### **✅ Monitoring**
- [ ] Error logging configured
- [ ] Backup strategy in place
- [ ] Uptime monitoring
- [ ] Performance monitoring

### **✅ DNS Configuration**
- [ ] A records: company.lamdaku.com → Server IP
- [ ] A records: api.lamdaku.com → Server IP
- [ ] CNAME: www.company.lamdaku.com → company.lamdaku.com

## 🚨 **IMPORTANT NOTES**

### **1. Security Considerations**
- Never commit `.env` files to version control
- Use strong, unique passwords
- Regularly update dependencies
- Monitor for security vulnerabilities

### **2. Performance Optimization**
- Enable OPcache for PHP
- Use Redis for sessions and cache
- Optimize database queries
- Implement proper caching strategies

### **3. Backup Strategy**
- Daily database backups
- Weekly full server backups
- Store backups off-site
- Test restore procedures

---

## 🎉 **DEPLOYMENT SUCCESS!**

Dengan mengikuti panduan ini, aplikasi LAMDAKU akan berjalan dengan optimal di production hosting dengan:

- ✅ **Secure HTTPS connections**
- ✅ **Proper CORS configuration** 
- ✅ **Optimized performance**
- ✅ **Production-ready caching**
- ✅ **Scalable architecture**

**Ready for production deployment! 🚀**
