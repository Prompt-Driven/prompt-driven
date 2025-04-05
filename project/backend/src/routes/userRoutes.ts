import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';
import { authenticateToken, checkRole } from '../middlewares/authMiddleware';
import { UserRole } from '../entities/User';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Admin only routes
router.get('/', checkRole([UserRole.ADMIN]), getAllUsers);
router.post('/', checkRole([UserRole.ADMIN]), createUser);
router.delete('/:id', checkRole([UserRole.ADMIN]), deleteUser);

// Routes for both admin and regular users
// Regular users can only get/update their own profiles
router.get('/:id', getUserById);
router.put('/:id', updateUser);

export default router; 