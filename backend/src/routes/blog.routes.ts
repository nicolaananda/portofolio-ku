import { Router } from 'express';
import {
    getAllBlogs,
    getAllBlogsAdmin,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
} from '../controllers/blog.controller';
import { authMiddleware, adminOnly } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/:slug', getBlog);

// Admin routes
router.get('/admin/all', authMiddleware, adminOnly, getAllBlogsAdmin);
router.post('/', authMiddleware, adminOnly, createBlog);
router.put('/:id', authMiddleware, adminOnly, updateBlog);
router.delete('/:id', authMiddleware, adminOnly, deleteBlog);

export default router;
