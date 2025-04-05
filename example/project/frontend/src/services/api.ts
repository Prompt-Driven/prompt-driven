import axios from 'axios';
import { LoginCredentials, User, Client } from '../types';

// Create an axios instance with improved configuration
const api = axios.create({
  baseURL: '/api', // Using relative path with proxy in package.json
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Add a request interceptor to include the access token in all requests
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication Services
export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      // Save tokens to localStorage
      if (response.data.accessToken) {
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      // Clear tokens from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return response.data;
    } catch (error) {
      // Clear tokens even if the API call fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      console.error('Logout error:', error);
      throw error;
    }
  },
  refresh: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await api.post('/auth/refresh', { refreshToken });
      
      // Save new tokens to localStorage
      if (response.data.accessToken) {
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
      
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }
};

// User Services
export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data as User[];
  },
  getById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data as User;
  },
  create: async (user: Partial<User>) => {
    const response = await api.post('/users', user);
    return response.data as User;
  },
  update: async (id: string, user: Partial<User>) => {
    const response = await api.put(`/users/${id}`, user);
    return response.data as User;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};

// Client Services
export const clientService = {
  getAll: async () => {
    const response = await api.get('/clients');
    return response.data as Client[];
  },
  getById: async (id: string) => {
    const response = await api.get(`/clients/${id}`);
    return response.data as Client;
  },
  create: async (client: Partial<Client>) => {
    const response = await api.post('/clients', client);
    return response.data as Client;
  },
  update: async (id: string, client: Partial<Client>) => {
    const response = await api.put(`/clients/${id}`, client);
    return response.data as Client;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  }
};

// Add an interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        await authService.refresh();
        
        // Update the Authorization header with the new access token
        const newAccessToken = localStorage.getItem('access_token');
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api; 