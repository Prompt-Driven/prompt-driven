import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/database';
import { User, UserRole } from '../entities/User';

// Repository for User entity
const userRepository = AppDataSource.getRepository(User);

// Get all users (admin only)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userRepository.find({
      select: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'] // Exclude password
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Check if current user has permission to view this user
    // Only admins can view other users, regular users can only view themselves
    if (req.user?.role !== UserRole.ADMIN && req.user?.id !== id) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }
    
    const user = await userRepository.findOne({ 
      where: { id },
      select: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'] // Exclude password
    });
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new user (admin only)
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Name, email and password are required' });
      return;
    }
    
    // Check if email already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role as UserRole || UserRole.USER
    });
    
    await userRepository.save(newUser);
    
    // Return user without password
    const { password: _, ...userData } = newUser;
    res.status(201).json(userData);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    
    // Check if current user has permission to update this user
    // Only admins can update other users, regular users can only update themselves
    if (req.user?.role !== UserRole.ADMIN && req.user?.id !== id) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }
    
    // Regular users cannot change their own role
    if (req.user?.role !== UserRole.ADMIN && role) {
      res.status(403).json({ message: 'Cannot change role' });
      return;
    }
    
    // Get existing user
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (role && req.user?.role === UserRole.ADMIN) user.role = role as UserRole;
    
    await userRepository.save(user);
    
    // Return updated user without password
    const { password: _, ...userData } = user;
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a user (admin only)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Find user
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Delete user
    await userRepository.remove(user);
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 