import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { authConfig } from '../config/auth';
import { Secret, SignOptions } from 'jsonwebtoken';

// Repository for User entity
const userRepository = AppDataSource.getRepository(User);

// Generate JWT tokens
const generateTokens = (user: User) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    authConfig.jwt.accessSecret as Secret,
    { expiresIn: authConfig.jwt.accessExpiresIn } as SignOptions
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    authConfig.jwt.refreshSecret as Secret,
    { expiresIn: authConfig.jwt.refreshExpiresIn } as SignOptions
  );

  return { accessToken, refreshToken };
};

// Login controller
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Login attempt:', { body: req.body });
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log('Missing credentials:', { email: !!email, password: !!password });
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Find user by email
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      console.log('User not found:', { email });
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    console.log('User found:', { userId: user.id, email: user.email });

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password validation:', { isValid: isPasswordValid });
    
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);
    console.log('Tokens generated successfully');

    // Return user data (excluding password) and tokens
    const { password: _, ...userData } = user;
    res.status(200).json({ 
      user: userData,
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout controller
export const logout = (req: Request, res: Response): void => {
  // No cookie to clear when using localStorage
  res.status(200).json({ message: 'Logged out successfully' });
};

// Refresh token controller
export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get refresh token from request body
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401).json({ message: 'Refresh token required' });
      return;
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, authConfig.jwt.refreshSecret as Secret) as { id: string };
    
    // Find user
    const user = await userRepository.findOne({ where: { id: decoded.id } });
    if (!user) {
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }

    // Generate new tokens
    const tokens = generateTokens(user);
    
    // Return user data and new tokens
    const { password: _, ...userData } = user;
    res.status(200).json({ 
      user: userData,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
}; 