# Fix 404 Error di LiteSpeed - Panduan Lengkap

## Masalah
Saat mengakses langsung atau refresh halaman seperti `/about` atau `/admin`, muncul error 404.

## Penyebab
LiteSpeed tidak membaca file `.htaccess` atau mod_rewrite tidak aktif.

## Solusi Step-by-Step

### Solusi 1: Pastikan `.htaccess` Ter-upload

1. **Rebuild aplikasi:**
   ```bash
   npm run build
   ```

2. **Pastikan file `.htaccess` ada di folder `dist/`:**
   ```bash
   ls -la dist/.htaccess
   ```

3. **Upload file `.htaccess` ke server:**
   - Pastikan file `.htaccess` ikut ter-upload ke root directory website
   - Lokasi: `/var/www/nicola.id/html/.htaccess` (atau sesuai konfigurasi Anda)

### Solusi 2: Aktifkan `.htaccess` di LiteSpeed WebAdmin

1. **Login ke LiteSpeed WebAdmin:**
   - Biasanya: `https://server-ip:7080` atau `https://server-ip:8443`

2. **Buka Virtual Host:**
   - Klik **Virtual Hosts** → Pilih virtual host Anda (nicola.id)

3. **Aktifkan `.htaccess`:**
   - Buka tab **Script Handler** atau **Apache Settings**
   - Cari opsi **"Enable .htaccess"** atau **"Allow Override"**
   - Set ke **"Yes"** atau **"All"**
   - Pastikan **mod_rewrite** aktif

4. **Restart LiteSpeed:**
   - Klik **Actions** → **Graceful Restart**

### Solusi 3: Konfigurasi Langsung di Virtual Host (Jika `.htaccess` Tidak Bekerja)

Jika `.htaccess` tidak bekerja, tambahkan konfigurasi langsung di Virtual Host:

1. **Buka Virtual Host di LiteSpeed WebAdmin**

2. **Buka tab "Rewrite" atau "Apache Settings"**

3. **Tambahkan rewrite rules:**
   ```
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_FILENAME} !-l
   RewriteRule . /index.html [L]
   ```

4. **Save dan Restart**

### Solusi 4: Verifikasi File `.htaccess` di Server

SSH ke server dan cek:

```bash
# Cek apakah file .htaccess ada
ls -la /var/www/nicola.id/html/.htaccess

# Cek isi file
cat /var/www/nicola.id/html/.htaccess

# Cek permission (harus readable)
chmod 644 /var/www/nicola.id/html/.htaccess
```

### Solusi 5: Test dengan cURL

Test dari server:

```bash
# Test apakah rewrite bekerja
curl -I https://nicola.id/about

# Seharusnya return 200, bukan 404
```

### Solusi 6: Cek Error Log

Jika masih error, cek log:

```bash
# LiteSpeed error log
tail -f /usr/local/lsws/logs/error.log

# Atau virtual host error log
tail -f /usr/local/lsws/logs/nicola.id_error.log
```

## Troubleshooting

### Masalah: File `.htaccess` tidak ter-copy saat deploy

**Solusi:** Update script deploy untuk memastikan file hidden ter-copy:

```bash
# Di deploy.sh, pastikan menggunakan:
sudo cp -a dist/.htaccess /var/www/nicola.id/html/.htaccess
```

### Masalah: LiteSpeed tidak membaca `.htaccess`

**Solusi:** 
1. Pastikan "Enable .htaccess" aktif di Virtual Host
2. Atau gunakan Solusi 3 (konfigurasi langsung di Virtual Host)

### Masalah: Masih 404 setelah semua konfigurasi

**Solusi:**
1. Cek apakah mod_rewrite aktif: `/usr/local/lsws/bin/lshttpd -M | grep rewrite`
2. Cek error log untuk detail error
3. Pastikan file `index.html` ada di root directory
4. Test dengan akses langsung ke `index.html`: `https://nicola.id/index.html`

## File `.htaccess` yang Benar

File `.htaccess` di `dist/` harus berisi:

```apache
# Enable Rewrite Engine for SPA Routing
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Don't rewrite if the request is for index.html
    RewriteRule ^index\.html$ - [L]
    
    # Don't rewrite if the request is for an existing file
    RewriteCond %{REQUEST_FILENAME} !-f
    # Don't rewrite if the request is for an existing directory
    RewriteCond %{REQUEST_FILENAME} !-d
    # Don't rewrite if the request is for a symbolic link
    RewriteCond %{REQUEST_FILENAME} !-l
    
    # Rewrite everything else to index.html
    RewriteRule . /index.html [L]
</IfModule>
```

## Checklist

- [ ] File `.htaccess` ada di folder `dist/`
- [ ] File `.htaccess` ter-upload ke server
- [ ] "Enable .htaccess" aktif di LiteSpeed Virtual Host
- [ ] mod_rewrite aktif
- [ ] LiteSpeed sudah di-restart
- [ ] Test akses langsung ke `/about` → harus 200, bukan 404
- [ ] Test reload di `/about` → harus tetap bekerja


