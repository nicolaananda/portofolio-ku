# Docker Deployment Guide

## 🐳 Menjalankan Aplikasi dengan Docker Compose

Aplikasi ini dapat di-deploy menggunakan Docker Compose dengan nginx sebagai web server.

### Prerequisites

- Docker dan Docker Compose terinstall di sistem Anda
- Hasil build aplikasi sudah tersedia di folder `dist/`

### Cara Menjalankan

#### 1. Build dan Jalankan (Otomatis)
```bash
npm run docker:build-serve
```
Script ini akan:
- Menjalankan `npm run build` untuk generate folder dist
- Menjalankan Docker Compose di background

#### 2. Jalankan Manual (Jika sudah ada build)
```bash
# Pastikan sudah ada folder dist
npm run build

# Jalankan docker compose
npm run docker:up
```

#### 3. Menggunakan Docker Compose langsung
```bash
# Jalankan container
docker-compose up -d

# Lihat logs
docker-compose logs -f

# Stop container
docker-compose down
```

### NPM Scripts untuk Docker

- `npm run docker:up` - Menjalankan container di background
- `npm run docker:down` - Menghentikan container
- `npm run docker:logs` - Melihat logs container
- `npm run docker:build-serve` - Build aplikasi dan jalankan container

### Akses Aplikasi

Setelah container berjalan, aplikasi dapat diakses di:
**http://localhost:9999**

### Fitur Nginx Configuration

✅ **SPA Support** - React Router akan bekerja dengan benar  
✅ **Gzip Compression** - Assets akan di-compress otomatis  
✅ **Caching** - Static assets di-cache untuk performa optimal  
✅ **Security Headers** - Header keamanan sudah dikonfigurasi  
✅ **Service Worker Support** - PWA features akan bekerja  

### Troubleshooting

#### Port sudah digunakan
```bash
# Cek proses yang menggunakan port 9999
netstat -an | findstr :9999

# Atau gunakan port lain dengan mengedit docker-compose.yml
# Ubah "9999:80" menjadi "8080:80" untuk menggunakan port 8080
```

#### Container tidak bisa start
```bash
# Lihat logs untuk debugging
npm run docker:logs

# Atau
docker-compose logs nginx
```

#### Folder dist kosong
```bash
# Build ulang aplikasi
npm run build

# Pastikan folder dist berisi file
ls dist/
```

### File Configuration

- `docker-compose.yml` - Konfigurasi Docker Compose
- `nginx.conf` - Konfigurasi Nginx server
- `.dockerignore` - File yang dikecualikan dari Docker context 