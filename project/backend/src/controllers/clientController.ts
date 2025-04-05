import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Client } from '../entities/Client';
import { User, UserRole } from '../entities/User';

// Repository for Client entity
const clientRepository = AppDataSource.getRepository(Client);
const userRepository = AppDataSource.getRepository(User);

// Get all clients
export const getAllClients = async (req: Request, res: Response): Promise<void> => {
  try {
    // For admin users, fetch all clients
    // For regular users, fetch only their own clients
    const query = req.user?.role === UserRole.ADMIN 
      ? clientRepository.createQueryBuilder('client')
      : clientRepository.createQueryBuilder('client')
          .where('client.creator = :userId', { userId: req.user?.id });
      
    // Add joins and selects
    const clients = await query
      .leftJoinAndSelect('client.creator', 'creator')
      .select([
        'client.id',
        'client.name',
        'client.email',
        'client.phone',
        'client.notes',
        'client.createdAt',
        'client.updatedAt',
        'creator.id',
        'creator.name',
      ])
      .getMany();
      
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get client by ID
export const getClientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const client = await clientRepository.findOne({
      where: { id },
      relations: ['creator'],
      select: {
        creator: {
          id: true,
          name: true
        }
      }
    });
    
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    // Check if user has permission to view this client
    if (req.user?.role !== UserRole.ADMIN && client.creator.id !== req.user?.id) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }
    
    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new client
export const createClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, notes } = req.body;
    
    // Validate input
    if (!name) {
      res.status(400).json({ message: 'Client name is required' });
      return;
    }
    
    // Get current user as creator
    const creator = await userRepository.findOne({ where: { id: req.user?.id } });
    if (!creator) {
      res.status(404).json({ message: 'Creator user not found' });
      return;
    }
    
    // Create new client
    const newClient = clientRepository.create({
      name,
      email,
      phone,
      notes,
      creator
    });
    
    await clientRepository.save(newClient);
    
    // Return client with creator info
    res.status(201).json({
      ...newClient,
      creator: {
        id: creator.id,
        name: creator.name
      }
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a client
export const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, phone, notes } = req.body;
    
    // Find client
    const client = await clientRepository.findOne({
      where: { id },
      relations: ['creator']
    });
    
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    // Check if user has permission to update this client
    if (req.user?.role !== UserRole.ADMIN && client.creator.id !== req.user?.id) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }
    
    // Update fields
    if (name) client.name = name;
    if (email !== undefined) client.email = email;
    if (phone !== undefined) client.phone = phone;
    if (notes !== undefined) client.notes = notes;
    
    await clientRepository.save(client);
    
    res.status(200).json(client);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a client
export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Find client
    const client = await clientRepository.findOne({
      where: { id },
      relations: ['creator']
    });
    
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    // Check permissions - only admin or creator can delete
    if (req.user?.role !== UserRole.ADMIN && client.creator.id !== req.user?.id) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }
    
    // Delete client
    await clientRepository.remove(client);
    
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 