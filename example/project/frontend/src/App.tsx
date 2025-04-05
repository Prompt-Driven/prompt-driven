import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import UsersPage from './pages/UsersPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import { UserRole } from './types';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <ClientsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/users"
            element={
              <PrivateRoute requiredRole={UserRole.ADMIN}>
                <UsersPage />
              </PrivateRoute>
            }
          />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
