# Fix 404 Error untuk SPA Routing di LiteSpeed

## Masalah
Saat mengakses langsung atau reload halaman di route seperti `/about` atau `/admin`, server mengembalikan error 404.

## Penyebab
Aplikasi React menggunakan client-side routing (BrowserRouter). Ketika user mengakses route langsung atau reload, server mencoba mencari file fisik di path tersebut yang tidak ada.

## Solusi

### 1. Pastikan File `.htaccess` Ter-upload
File `.htaccess` sudah ada di folder `dist/` dan harus ikut ter-upload ke server. Pastikan file ini ada di root directory website Anda di server LiteSpeed.

### 2. Aktifkan `.htaccess` di LiteSpeed WebAdmin

LiteSpeed perlu dikonfigurasi untuk membaca file `.htaccess`:

1. Login ke **LiteSpeed WebAdmin Console**
2. Buka **Virtual Hosts** → Pilih virtual host Anda
3. Cari bagian **Script Handler** atau **Apache Settings**
4. Pastikan **"Enable .htaccess"** atau **"Allow Override"** diaktifkan
5. Pastikan **mod_rewrite** aktif

### 3. Alternatif: Konfigurasi Langsung di LiteSpeed

Jika `.htaccess` tidak bekerja, Anda bisa menambahkan konfigurasi langsung di Virtual Host:

1. Buka **Virtual Hosts** → Pilih virtual host Anda
2. Buka tab **Rewrite** atau **Apache Settings**
3. Tambahkan rule berikut:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/index\.html$
RewriteCond %{REQUEST_URI} !\.[^/]*$
RewriteRule ^.*$ /index.html [L]
```

### 4. Verifikasi

Setelah konfigurasi:

1. Pastikan file `.htaccess` ada di root directory website
2. Restart LiteSpeed web server
3. Test dengan mengakses langsung:
   - `https://nicola.id/about`
   - `https://nicola.id/admin`
4. Test dengan reload halaman di route tersebut

### 5. Troubleshooting

Jika masih error 404:

1. **Cek error log LiteSpeed**: `/usr/local/lsws/logs/error.log`
2. **Pastikan mod_rewrite aktif**: 
   ```bash
   /usr/local/lsws/bin/lshttpd -M | grep rewrite
   ```
3. **Cek permission file `.htaccess`**: Harus readable oleh web server
4. **Test dengan curl**:
   ```bash
   curl -I https://nicola.id/about
   ```

## Catatan Penting

- File `.htaccess` harus ada di root directory website (bukan di subfolder)
- Setelah upload, pastikan rebuild aplikasi agar file `.htaccess` dari `public/` ter-copy ke `dist/`
- Jika menggunakan build process, pastikan file `.htaccess` ikut ter-copy saat build



