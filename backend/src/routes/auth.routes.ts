import { Router } from 'express';
import { login, logout, me, refreshToken } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.get('/me', authMiddleware, me);

export default router;
