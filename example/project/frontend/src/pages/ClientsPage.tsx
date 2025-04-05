import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ClientList from '../components/clients/ClientList';
import AddClientButton from '../components/clients/AddClientButton';
import { clientService } from '../services/api';
import { Client } from '../types';

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const data = await clientService.getAll();
      setClients(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load clients');
      console.error('Error fetching clients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleClientAdded = () => {
    fetchClients();
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your client information and contacts.
            </p>
          </div>
          <AddClientButton onClientAdded={handleClientAdded} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : (
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              {clients.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No clients found. Add your first client by clicking the "Add Client" button.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <ClientList clients={clients} onClientDeleted={fetchClients} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ClientsPage; 