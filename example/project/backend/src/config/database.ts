import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Client } from '../entities/Client';
import * as path from 'path';

// Create a new data source for SQLite
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.resolve(__dirname, '../../database.sqlite'),
  entities: [User, Client],
  synchronize: true, // Set to false in production
  logging: false
});

// Function to initialize the database connection
export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}; 