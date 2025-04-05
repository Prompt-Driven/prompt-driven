import React from 'react';
import Layout from '../components/layout/Layout';

const UsersPage: React.FC = () => {
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your system users and permissions.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
          {/* User management interface will be added here */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md p-6">
            <p>User management functionality is coming soon.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UsersPage; 