import { Router } from 'express';
import { uploadImage, uploadImages } from '../controllers/upload.controller';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Admin only routes
router.post('/image', authMiddleware, adminOnly, upload.single('image'), uploadImage);
router.post('/images', authMiddleware, adminOnly, upload.array('images', 10), uploadImages);

export default router;
