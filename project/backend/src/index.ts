import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import clientRoutes from './routes/clientRoutes';
import { createAdminUserIfNotExists } from './services/seedService';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS headers
app.use((req, res, next) => {
  // Instead of specific origin, allow all origins for development
  res.header('Access-Control-Allow-Origin', '*');
  
  // Allow all methods
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS');
  
  // Allow all headers the client might send
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token'
  );
  
  // Allow cookies and credentials
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Tell browsers to expose these headers to the frontend JavaScript
  res.header('Access-Control-Expose-Headers', 'Content-Length, X-Access-Token');
  
  // Cache preflight requests for 24 hours
  res.header('Access-Control-Max-Age', '86400');
  
  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    // Respond with 204 No Content
    res.status(204).end();
    return;
  }
  
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Start the server
const startServer = async () => {
  try {
    // Initialize database connection
    await initializeDatabase();
    
    // Create admin user if not exists
    await createAdminUserIfNotExists();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer(); 