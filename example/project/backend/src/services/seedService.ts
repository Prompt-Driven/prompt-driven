import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/database';
import { User, UserRole } from '../entities/User';

// Repository for User entity
const userRepository = AppDataSource.getRepository(User);

// Create admin user if not exists
export const createAdminUserIfNotExists = async (): Promise<void> => {
  try {
    // Check if admin user already exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const existingAdmin = await userRepository.findOne({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
      console.log('Creating default admin user...');
      
      // Create admin user
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      const adminUser = userRepository.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN
      });
      
      await userRepository.save(adminUser);
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}; 