import { Router } from 'express';
import { login, logout, refresh } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.post('/login', login);
router.post('/refresh', refresh);

// Protected routes
router.post('/logout', authenticateToken, logout);

export default router; 