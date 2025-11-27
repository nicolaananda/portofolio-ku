# Panduan Menambahkan Bot Absensi ke Portfolio

File JSON data portfolio sudah disiapkan di `bot-absensi-portfolio-data.json`.

## Cara 1: Via Admin Panel (Recommended)

1. Login ke admin panel: `/admin/login`
2. Navigate ke: `/admin/portfolio/create`
3. Isi form dengan data berikut:

### Data Portfolio

**Title:**
```
Bot Absensi & Invoice Generator
```

**Category:**
```
Web Development
```

**Client:**
```
Personal Project
```

**Completion Date:**
```
2025-01-15
```

**Technologies** (tambahkan satu per satu):
- Node.js
- Express.js
- MongoDB
- Baileys
- Jimp
- Cloudflare R2
- JavaScript
- Chart.js

**Description:**
```
Sistem otomatis berbasis WhatsApp yang dirancang untuk memudahkan pengelolaan absensi siswa dengan fitur pembuatan invoice otomatis. Menggabungkan teknologi WhatsApp Bot (Baileys), MongoDB untuk data persistence, dan Dashboard Web untuk monitoring dan analitik. Sistem ini memungkinkan lembaga pendidikan atau kursus untuk mencatat absensi siswa via WhatsApp dengan mudah, menghasilkan invoice otomatis setelah mencapai 4 absen, dan melacak semua data absensi dan invoice melalui dashboard web dengan statistik real-time.
```

**Challenge:**
```
Membangun sistem terintegrasi yang memungkinkan:
• Mencatat absensi siswa via WhatsApp dengan mudah dan cepat
• Menghasilkan invoice otomatis setelah mencapai 4 absen
• Melacak semua data absensi dan invoice melalui dashboard web
• Mengelola statistik dan laporan keuangan secara real-time
• Menangani upload dan storage foto absensi secara efisien
• Memastikan keamanan dan validasi data absensi
• Membuat invoice otomatis dengan layout profesional menggunakan Jimp
```

**Solution:**
```
Saya membangun sistem terintegrasi dengan 3 platform utama:

**1. WhatsApp Bot (Baileys)**
• Integrasi dengan WhatsApp Web API menggunakan Baileys
• Penerimaan pesan gambar dengan caption khusus
• Parsing dan validasi data absensi (nama, harga, tanggal, deskripsi)
• Download foto dari WhatsApp dengan retry mechanism
• Upload foto ke Cloudflare R2 untuk storage
• Auto-generate invoice setelah 4 absen tercapai
• Manual invoice generation via command

**2. Backend API (Express.js)**
• RESTful API untuk dashboard web
• Endpoints untuk statistik, charts, dan data export
• MongoDB untuk data persistence
• Query aggregation untuk analitik
• CORS proxy untuk akses R2 storage

**3. Dashboard Web**
• Real-time statistics dan analytics
• Revenue charts per bulan menggunakan Chart.js
• Top students ranking
• Filter & search capabilities
• Export data (JSON/CSV)
• Responsive design untuk mobile

**Teknologi Utama:**
• Baileys untuk WhatsApp integration
• Jimp untuk image processing dan invoice generation
• Cloudflare R2 untuk cloud storage
• MongoDB untuk NoSQL database
• Chart.js untuk data visualization
```

**Project Images:**
- Upload screenshot dashboard, invoice generator, atau screenshot sistem
- Minimum 1 gambar diperlukan
- Recommended: 3-5 gambar

**Live URL** (optional):
```
(Isi jika ada demo/deployment)
```

**GitHub URL** (optional):
```
(Isi jika ada repository GitHub)
```

## Cara 2: Via API (Curl)

Jika ingin langsung POST via API:

```bash
# Ganti YOUR_TOKEN dengan access token admin
# Ganti API_URL dengan URL backend Anda

curl -X POST http://localhost:5002/api/portfolio \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d @bot-absensi-portfolio-data.json
```

## Cara 3: Via Script Node.js

Buat file `scripts/add-bot-absensi-portfolio.js`:

```javascript
const fs = require('fs');
const path = require('path');

// Baca file JSON
const portfolioData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../bot-absensi-portfolio-data.json'), 'utf8')
);

// POST ke API
const API_URL = process.env.API_URL || 'http://localhost:5002/api/portfolio';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN; // Set di .env atau ganti langsung

if (!ACCESS_TOKEN) {
  console.error('❌ ACCESS_TOKEN tidak ditemukan!');
  console.log('Set ACCESS_TOKEN di environment variable atau edit script');
  process.exit(1);
}

fetch(`${API_URL}/portfolio`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`
  },
  body: JSON.stringify(portfolioData)
})
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('✅ Portfolio berhasil ditambahkan!');
      console.log('Slug:', data.data.slug || data.data._id);
    } else {
      console.error('❌ Error:', data.message);
    }
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
  });
```

Jalankan:
```bash
node scripts/add-bot-absensi-portfolio.js
```

## Catatan Penting

1. **Images**: Pastikan upload screenshot proyek melalui admin panel atau siapkan URL gambar valid
2. **Slug**: Setelah ditambahkan, portfolio akan otomatis memiliki slug seperti `bot-absensi-invoice-generator`
3. **Links**: Update `liveUrl` dan `githubUrl` jika tersedia
4. **Date**: Sesuaikan `completionDate` dengan tanggal real completion

## Data yang Tersedia

File `bot-absensi-portfolio-data.json` berisi:
- ✅ Title dan description lengkap
- ✅ Challenge dan solution detail
- ✅ Tech stack lengkap
- ⚠️ Image URLs (placeholder - perlu diupdate dengan URL real)
- ⚠️ Live URL dan GitHub URL (kosong - isi jika ada)

## Tips

1. Screenshot yang direkomendasikan:
   - Dashboard web interface
   - Contoh invoice yang di-generate
   - WhatsApp bot conversation
   - System architecture diagram

2. Setelah ditambahkan, portfolio akan muncul di:
   - `/portfolio` - list semua portfolio
   - `/portfolio/bot-absensi-invoice-generator` - detail page (setelah slug feature diimplement)

