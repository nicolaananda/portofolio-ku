const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: 'error', message: 'No file uploaded' });
        }

        // req.file.location is available when using multer-s3
        // But for R2 with custom endpoint, we might need to construct the URL manually if location isn't perfect
        // However, usually req.file.location works if the endpoint is public.
        // Given R2_PUBLIC_URL in .env, let's use that.

        const fileUrl = `${process.env.R2_PUBLIC_URL}/${req.file.key}`;

        res.json({
            success: true,
            url: fileUrl,
            message: 'Image uploaded successfully'
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
