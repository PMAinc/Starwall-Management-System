import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { Client } from '../types';
import { clients } from '../data/mockData';
import { Download, User, X } from 'lucide-react';
import * as XLSX from 'xlsx';

const Clients: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientData, setClientData] = useState<Client[]>(clients);

  const columns = [
    { accessor: 'name', header: 'Nom' },
    { accessor: 'city', header: 'Ville' },
    { accessor: 'contactName', header: 'Nom du contact' },
    { accessor: 'phone', header: 'Téléphone' },
    { 
      accessor: 'status', 
      header: 'Statut',
      Cell: ({ value }: { value: string }) => (
        <span className={value === 'Actif' ? 'status-active' : 'status-inactive'}>
          {value}
        </span>
      )
    }
  ];

  const handleAddClient = () => {
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newClient: Client = {
      id: selectedClient?.id || `${Date.now()}`,
      name: formData.get('name') as string,
      city: formData.get('city') as string,
      contactName: formData.get('contactName') as string,
      phone: formData.get('phone') as string,
      status: formData.get('status') as 'Actif' | 'Non Actif',
    };
    
    if (selectedClient) {
      // Update existing client
      setClientData(clientData.map(client => 
        client.id === selectedClient.id ? newClient : client
      ));
    } else {
      // Add new client
      setClientData([...clientData, newClient]);
    }
    
    setIsModalOpen(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(clientData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    XLSX.writeFile(workbook, "clients.xlsx");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Clients</h1>
        <button 
          onClick={exportToExcel}
          className="btn btn-secondary flex items-center gap-2"
        >
          <Download size={18} />
          Exporter Excel
        </button>
      </div>
      
      <DataTable 
        data={clientData}
        columns={columns}
        title="Liste des clients"
        onAddNew={handleAddClient}
        addNewLabel="Nouveau Client"
        onRowClick={handleEditClient}
      />
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">
                {selectedClient ? 'Modifier le client' : 'Ajouter un client'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveClient} className="p-4 space-y-4">
              <div className="input-group">
                <label htmlFor="name" className="input-label">Nom</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  defaultValue={selectedClient?.name || ''}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="city" className="input-label">Ville</label>
                <input 
                  type="text" 
                  id="city"
                  name="city"
                  defaultValue={selectedClient?.city || ''}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="contactName" className="input-label">Nom du contact</label>
                <input 
                  type="text" 
                  id="contactName"
                  name="contactName"
                  defaultValue={selectedClient?.contactName || ''}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="phone" className="input-label">Téléphone</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  defaultValue={selectedClient?.phone || ''}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label className="input-label">Statut</label>
                <div className="flex gap-4 mt-1">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Actif"
                      defaultChecked={selectedClient?.status === 'Actif' || !selectedClient}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Actif</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Non Actif"
                      defaultChecked={selectedClient?.status === 'Non Actif'}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Non Actif</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-secondary"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                >
                  {selectedClient ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;