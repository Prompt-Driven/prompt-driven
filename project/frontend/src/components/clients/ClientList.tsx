import React from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { clientService } from '../../services/api';

interface ClientListProps {
  clients: Client[];
  onClientDeleted: () => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onClientDeleted }) => {
  const { user } = useAuth();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await clientService.delete(id);
        onClientDeleted();
      } catch (err: any) {
        console.error('Error deleting client:', err);
        alert(err.response?.data?.message || 'Failed to delete client');
      }
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Phone
          </th>
          {user?.role === UserRole.ADMIN && (
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created By
            </th>
          )}
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created At
          </th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {clients.map((client) => (
          <tr key={client.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{client.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{client.email || '-'}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{client.phone || '-'}</div>
            </td>
            {user?.role === UserRole.ADMIN && (
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{client.creator.name}</div>
              </td>
            )}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">
                {new Date(client.createdAt).toLocaleDateString()}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex justify-end space-x-2">
                <Link
                  to={`/clients/${client.id}`}
                  className="text-blue-600 hover:text-blue-900"
                >
                  View
                </Link>
                <Link
                  to={`/clients/${client.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientList; 