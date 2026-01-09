import { Router } from 'express';
import {
    submitContact,
    getAllMessages,
    markAsRead,
    deleteMessage,
} from '../controllers/contact.controller';
import { authMiddleware, adminOnly } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/', submitContact);

// Admin routes
router.get('/', authMiddleware, adminOnly, getAllMessages);
router.get('/admin/all', authMiddleware, adminOnly, getAllMessages);
router.put('/:id/read', authMiddleware, adminOnly, markAsRead);
router.delete('/:id', authMiddleware, adminOnly, deleteMessage);

export default router;
