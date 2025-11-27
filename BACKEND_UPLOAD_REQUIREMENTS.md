# Backend Image Upload Requirements

## Overview

Frontend memerlukan endpoint untuk upload gambar portfolio menggunakan **Multer** dan menyimpan file ke **Cloudflare R2**.

---

## Endpoint Specification

### POST /api/upload

**Description:** Upload image file untuk portfolio (disimpan di Cloudflare R2)

**Authentication:** Required (Bearer Token)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data dengan field `image` yang berisi file gambar

**Example Request (Frontend):**
```javascript
const formData = new FormData();
formData.append('image', file);

const response = await fetch(`${VITE_API_URL}/upload`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  body: formData,
});
```

**Response (Success - 200 OK):**
```json
{
  "success": true,
  "url": "https://cdn.nicola.id/550e8400-e29b-41d4-a716-446655440000.jpg",
  "message": "Image uploaded successfully"
}
```

**Response (Error - 400 Bad Request):**
```json
{
  "success": false,
  "message": "Only image files are allowed"
}
```

**Response (Error - 401 Unauthorized):**
```json
{
  "status": "fail",
  "message": "You are not logged in! Please log in to get access."
}
```

**Response (Error - 413 Payload Too Large):**
```json
{
  "message": "File too large"
}
```

---

## Requirements

### 1. File Validation
- **File Type:** Only accept image files
  - Allowed MIME types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg+xml`
  - Reject non-image files
- **File Size:** Maximum 5MB per file
  - Validate file size before processing
  - Return error if file exceeds limit

### 2. Security
- **Authentication:** Require valid JWT token
- **Authorization:** Only authenticated users can upload
- **File Validation:** Check file signature (magic numbers), not just extension
- **Sanitization:** Rename files to prevent malicious filenames
- **Storage:** Store files outside web root or use secure serving

### 3. File Storage (Cloudflare R2)
- **Storage:** Cloudflare R2 (S3-compatible object storage)
- **Naming:** Use unique filenames (UUID or timestamp-based)
  - Example: `abc123-def456-789.jpg`
- **Path:** Store in `/portfolio/` folder
  - Example: `portfolio/abc123.jpg`
- **Public URL:** Use R2 public URL atau custom domain
  - Example: `https://[your-r2-domain]/portfolio/abc123.jpg`
- **CORS:** Enable CORS untuk domain frontend

### 4. Response Format
The backend can return the URL in one of these formats (frontend handles all):

**Option 1:**
```json
{
  "url": "https://api.inyx.site/uploads/portfolio/abc123.jpg"
}
```

**Option 2:**
```json
{
  "imageUrl": "https://api.inyx.site/uploads/portfolio/abc123.jpg"
}
```

**Option 3:**
```json
{
  "data": {
    "url": "https://api.inyx.site/uploads/portfolio/abc123.jpg"
  }
}
```

### 5. Error Handling
Handle these error cases:
- Missing or invalid token (401)
- No file uploaded (400)
- Invalid file type (400)
- File too large (413)
- Server error during upload (500)

---

## Example Express.js Implementation

### Using Multer + Cloudflare R2 (RECOMMENDED)

#### 1. Install Required Packages

```bash
npm install multer @aws-sdk/client-s3
```

#### 2. Environment Variables (.env)

```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-bucket.r2.cloudflarestorage.com
# OR use custom domain:
# R2_PUBLIC_URL=https://your-custom-domain.com
```

#### 3. Setup Multer Memory Storage

```javascript
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Configure S3 Client for Cloudflare R2
const s3Client = new S3Client({
  region: 'auto', // R2 uses 'auto' as region
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// Configure Multer memory storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  // Check file extension
  const allowedExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
  const isValidExtension = allowedExtensions.test(file.originalname);
  
  // Check MIME type
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  const isValidMimeType = allowedMimeTypes.includes(file.mimetype);

  if (isValidExtension && isValidMimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, jpeg, png, gif, webp, svg)'));
  }
};

// Configure upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});

// Upload to R2
async function uploadToR2(file, folder = 'portfolio') {
  const fileExtension = path.extname(file.originalname);
  const uniqueFilename = `${uuidv4()}${fileExtension}`;
  const key = `${folder}/${uniqueFilename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);

  // Return public URL
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

// Route
router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    // Upload to R2
    const fileUrl = await uploadToR2(req.file, 'portfolio');

    res.json({
      success: true,
      url: fileUrl,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    if (error.message === 'Only image files are allowed...') {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to upload image to cloud storage'
    });
  }
});
```

#### 4. Complete Implementation with Error Handling

```javascript
// upload.routes.js
const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// S3 Client Configuration
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// Multer Configuration
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];

  if (allowedExtensions.test(file.originalname) && allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, GIF, and WebP images are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});

// Helper function to upload to R2
async function uploadToR2(file, folder = 'portfolio') {
  try {
    const fileExtension = path.extname(file.originalname);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const key = `${folder}/${uniqueFilename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      CacheControl: 'public, max-age=31536000', // Cache for 1 year
    });

    await s3Client.send(command);

    return `${process.env.R2_PUBLIC_URL}/${key}`;
  } catch (error) {
    console.error('R2 Upload Error:', error);
    throw new Error('Failed to upload file to cloud storage');
  }
}

// Route handler
router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // Upload to R2
    const fileUrl = await uploadToR2(req.file, 'portfolio');

    res.status(200).json({
      success: true,
      url: fileUrl,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);

    // Handle different error types
    if (error.message === 'Invalid file type...') {
      return res.status(400).json({
        success: false,
        message: error.message || 'Only image files are allowed'
      });
    }

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        message: 'File too large'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to upload image'
    });
  }
});

module.exports = router;
```

#### 5. Add to main server file

```javascript
// app.js or server.js
const uploadRoutes = require('./routes/upload.routes');

app.use('/api/upload', uploadRoutes);
```

---

## Testing

### Using cURL

```bash
# Test upload
curl -X POST http://localhost:5002/api/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg"

# Expected response
{
  "url": "http://localhost:5002/uploads/portfolio/abc123.jpg"
}
```

### Using Postman
1. Create new request: `POST http://localhost:5002/api/upload`
2. Add header: `Authorization: Bearer YOUR_TOKEN`
3. Go to Body > form-data
4. Add key: `image` (change type to File)
5. Select image file
6. Send request

---

## Additional Recommendations

### 1. Cloudflare R2 CORS Configuration
Enable CORS di Cloudflare R2 untuk allow domain frontend:

1. Go to Cloudflare R2 Dashboard
2. Select your bucket
3. Go to Settings > CORS
4. Add CORS policy:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:5173",
      "https://yourdomain.com"
    ],
    "AllowedMethods": [
      "GET",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

### 2. Environment Variables
Tambahkan ke `.env`:

```env
# Cloudflare R2
R2_ACCOUNT_ID=your-account-id-here
R2_ACCESS_KEY_ID=your-access-key-id-here
R2_SECRET_ACCESS_KEY=your-secret-access-key-here
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-public-url.com
```

### 3. Image Optimization (Optional)
Consider using `sharp` untuk optimize images:

```bash
npm install sharp
```

```javascript
const sharp = require('sharp');

async function optimizeImage(buffer, mimetype) {
  if (mimetype === 'image/webp' || mimetype === 'image/svg+xml') {
    return buffer; // Already optimized
  }

  const optimized = await sharp(buffer)
    .resize(1920, 1080, { 
      fit: 'inside',
      withoutEnlargement: true 
    })
    .webp({ quality: 80 })
    .toBuffer();

  return {
    buffer: optimized,
    mimetype: 'image/webp',
    extension: '.webp'
  };
}

// In route handler
const optimized = await optimizeImage(req.file.buffer, req.file.mimetype);
```

### 4. Rate Limiting
Implement rate limiting untuk upload endpoint:

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 uploads per 15 minutes
  message: 'Too many uploads, please try again later'
});

router.post('/upload', authenticateToken, uploadLimiter, upload.single('image'), ...);
```

### 5. File Cleanup
Implement cleanup untuk delete orphaned files:

```javascript
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');

async function deleteFromR2(key) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    });
    await s3Client.send(command);
  } catch (error) {
    console.error('Delete error:', error);
  }
}
```

---

## Summary

**Required:** Implement `POST /api/upload` endpoint
- Accept multipart/form-data with image file
- Return URL of uploaded image
- Validate file type (images only)
- Validate file size (max 5MB)
- Require authentication

**Optional but Recommended:**
- Image optimization/compression
- Multiple image sizes
- Cloud storage integration
- Rate limiting
- File cleanup automation

---

## Contact
For questions about implementation, contact the backend development team.

