import { Router } from 'express';
import {
    getAllPortfolios,
    getAllPortfoliosAdmin,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
} from '../controllers/portfolio.controller';
import { authMiddleware, adminOnly } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllPortfolios);
router.get('/:slug', getPortfolio);

// Admin routes
router.get('/admin/all', authMiddleware, adminOnly, getAllPortfoliosAdmin);
router.post('/', authMiddleware, adminOnly, createPortfolio);
router.patch('/:id', authMiddleware, adminOnly, updatePortfolio);
router.put('/:id', authMiddleware, adminOnly, updatePortfolio);
router.delete('/:id', authMiddleware, adminOnly, deletePortfolio);

export default router;
