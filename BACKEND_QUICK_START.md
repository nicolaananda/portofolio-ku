# 🚀 Quick Start - Backend Image Upload dengan Multer + Cloudflare R2

## 📦 Step 1: Install Dependencies

```bash
npm install multer @aws-sdk/client-s3 uuid
npm install --save-dev @types/multer
```

---

## 🔑 Step 2: Setup Cloudflare R2

### A. Create R2 Bucket
1. Login ke Cloudflare Dashboard
2. Go to **R2** > **Create bucket**
3. Name: `portfolio-images` (atau sesuai kebutuhan)
4. **Make it Public** atau configure custom domain

### B. Generate API Credentials
1. Go to **Manage R2 API Tokens**
2. Click **Create API Token**
3. Permissions: **Admin** atau **Object Read & Write**
4. Save credentials:
   - Account ID
   - Access Key ID
   - Secret Access Key

### C. Get Public URL
- Option 1: R2 Bucket URL: `https://pub-[account-id].r2.dev`
- Option 2: Custom Domain (Recommended)

---

## ⚙️ Step 3: Environment Variables

Tambahkan ke `.env`:

```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your-account-id-from-cloudflare
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key-here
R2_BUCKET_NAME=portfolio-images
R2_PUBLIC_URL=https://your-bucket.r2.dev
```

---

## 💻 Step 4: Create Upload Route

Create file: `routes/upload.routes.js`

```javascript
const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// S3 Client Configuration for Cloudflare R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// Multer Configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, GIF, and WebP images are allowed'));
    }
  },
});

// Upload to R2
async function uploadToR2(file) {
  const ext = path.extname(file.originalname);
  const filename = `${uuidv4()}${ext}`;
  const key = `portfolio/${filename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

// POST /api/upload
router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    const url = await uploadToR2(req.file);
    
    res.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload image'
    });
  }
});

module.exports = router;
```

---

## 🔌 Step 5: Connect Route to App

Add to `app.js` or `server.js`:

```javascript
const uploadRoutes = require('./routes/upload.routes');

// Other routes...
app.use('/api/upload', uploadRoutes);
```

---

## ✅ Step 6: Test Upload

### Using cURL:
```bash
curl -X POST http://localhost:5002/api/upload \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "image=@/path/to/your/image.jpg"
```

### Expected Response:
```json
{
  "url": "https://your-bucket.r2.dev/portfolio/abc123-def456-789.jpg"
}
```

---

## 🛠️ Troubleshooting

### Error: "Missing credentials"
- Check `.env` file has all R2 credentials
- Restart server after adding env vars

### Error: "Bucket not found"
- Verify bucket name in `.env` matches Cloudflare
- Check bucket exists in R2 dashboard

### Images not accessible
- Go to R2 dashboard > Bucket Settings > Public Access
- Enable "Public Access"
- Or configure custom domain

### CORS error
- Add CORS policy in R2 bucket settings
- See full CORS config in `BACKEND_UPLOAD_REQUIREMENTS.md`

---

## 📚 More Info

Lihat `BACKEND_UPLOAD_REQUIREMENTS.md` untuk:
- Detailed implementation
- Error handling
- Image optimization
- Rate limiting
- File cleanup

---

## 🎯 Done!

Backend siap untuk handle image uploads! 🚀

