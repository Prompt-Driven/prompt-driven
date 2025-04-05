import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="text-xl text-gray-700">
          You don't have permission to access this page.
        </p>
        <div className="space-x-4">
          <Link
            to="/dashboard"
            className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-block px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 