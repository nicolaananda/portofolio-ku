# Quick Fix 404 Error di LiteSpeed

## Langkah Cepat

### 1. Rebuild & Upload
```bash
npm run build
# Upload semua file dari dist/ ke server, PASTIKAN .htaccess ikut ter-upload
```

### 2. Aktifkan .htaccess di LiteSpeed WebAdmin

**PENTING:** Ini yang paling sering jadi masalah!

1. Login ke **LiteSpeed WebAdmin** (biasanya `https://server-ip:7080`)
2. Klik **Virtual Hosts** → Pilih **nicola.id**
3. Cari tab **"Script Handler"** atau **"Apache Settings"**
4. Set **"Enable .htaccess"** atau **"Allow Override"** ke **"Yes"**
5. Klik **Save** → **Graceful Restart**

### 3. Verifikasi di Server

SSH ke server dan cek:

```bash
# Pastikan file .htaccess ada
ls -la /var/www/nicola.id/html/.htaccess

# Jika tidak ada, copy manual:
sudo cp /path/to/dist/.htaccess /var/www/nicola.id/html/.htaccess
sudo chmod 644 /var/www/nicola.id/html/.htaccess
```

### 4. Test

Buka browser:
- `https://nicola.id/about` → Harus muncul halaman, bukan 404
- Refresh halaman → Harus tetap bekerja

## Jika Masih 404

**Kemungkinan besar:** LiteSpeed tidak membaca `.htaccess`

**Solusi:** Konfigurasi langsung di Virtual Host (tanpa .htaccess):

1. Di LiteSpeed WebAdmin → Virtual Host → nicola.id
2. Tab **"Rewrite"** atau **"Apache Settings"**
3. Tambahkan:
   ```
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_FILENAME} !-l
   RewriteRule . /index.html [L]
   ```
4. Save → Restart

## Checklist Cepat

- [ ] File `.htaccess` ada di `dist/`
- [ ] File `.htaccess` ter-upload ke server
- [ ] **"Enable .htaccess" AKTIF di LiteSpeed** ← PENTING!
- [ ] LiteSpeed sudah di-restart
- [ ] Test `/about` → harus 200 OK


