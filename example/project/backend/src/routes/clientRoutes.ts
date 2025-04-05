import { Router } from 'express';
import { getAllClients, getClientById, createClient, updateClient, deleteClient } from '../controllers/clientController';
import { authenticateToken, checkRole } from '../middlewares/authMiddleware';
import { UserRole } from '../entities/User';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Routes for clients
router.get('/', getAllClients);
router.get('/:id', getClientById);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router; 