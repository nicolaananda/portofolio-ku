# Backend Upload Endpoint Implementation

## Required Backend Endpoint: `/api/upload`

### Request Format:
```
POST /api/upload
Content-Type: multipart/form-data
Authorization: Bearer <access_token>

FormData:
- image: File (required)
```

### Response Format:
```json
{
  "success": true,
  "url": "/uploads/portfolio/2024/01/15/unique-filename.jpg",
  "message": "Image uploaded successfully"
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Example Backend Implementation (Node.js/Express):

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'public/uploads/portfolio';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload endpoint
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // Return the URL path
    const imageUrl = `/uploads/portfolio/${req.file.filename}`;
    
    res.json({
      success: true,
      url: imageUrl,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image'
    });
  }
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  // Verify JWT token here
  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) return res.status(403).json({ success: false, message: 'Invalid token' });
  //   req.user = user;
  //   next();
  // });
  
  // For now, just pass through
  next();
}

// Serve uploaded files
app.use('/uploads', express.static('public/uploads'));

module.exports = app;
```

## Required Dependencies:
```json
{
  "multer": "^1.4.5-lts.1",
  "express": "^4.18.2"
}
```

## File Structure:
```
backend/
├── public/
│   └── uploads/
│       └── portfolio/
│           ├── image-1234567890-123456789.jpg
│           └── image-1234567891-123456789.png
├── routes/
│   └── upload.js
└── app.js
```

## Security Considerations:
1. **File Type Validation**: Only allow image files
2. **File Size Limits**: 5MB maximum
3. **Authentication**: Require valid JWT token
4. **Unique Filenames**: Prevent filename conflicts
5. **Directory Traversal Protection**: Validate file paths
6. **Rate Limiting**: Prevent abuse

## Frontend Integration:
The ImageUpload component will automatically:
- Send files to `/api/upload` endpoint
- Include Authorization header with JWT token
- Handle success/error responses
- Update image URLs in the form
