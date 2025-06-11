import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { Order, Client } from '../types';
import { orders, clients } from '../data/mockData';
import { ShoppingCart, X } from 'lucide-react';
import { format } from 'date-fns';

const Orders: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderData, setOrderData] = useState<Order[]>(orders);

  const columns = [
    { accessor: 'number', header: 'Numéro' },
    { accessor: 'clientName', header: 'Client' },
    { accessor: 'creationDate', header: 'Date de création' },
    { accessor: 'installationDate', header: "Date d'installation" },
    { 
      accessor: 'status', 
      header: 'Statut',
      Cell: ({ value }: { value: string }) => {
        let statusClass = '';
        switch (value) {
          case 'En attente':
            statusClass = 'status-waiting';
            break;
          case 'En production':
            statusClass = 'status-production';
            break;
          case 'Fini':
            statusClass = 'status-completed';
            break;
        }
        return <span className={statusClass}>{value}</span>;
      }
    },
    { accessor: 'company', header: 'Compagnie' },
    { accessor: 'representativeName', header: 'Représentant' }
  ];

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleSaveOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const clientId = formData.get('client') as string;
    const client = clients.find(c => c.id === clientId);
    
    const newOrder: Order = {
      id: selectedOrder?.id || `${Date.now()}`,
      number: formData.get('number') as string,
      clientId: clientId,
      clientName: client?.name || '',
      creationDate: formData.get('creationDate') as string,
      installationDate: formData.get('installationDate') as string,
      status: formData.get('status') as 'En attente' | 'En production' | 'Fini',
      company: formData.get('company') as string,
      representativeName: formData.get('representativeName') as string,
    };
    
    if (selectedOrder) {
      // Update existing order
      setOrderData(orderData.map(order => 
        order.id === selectedOrder.id ? newOrder : order
      ));
    } else {
      // Add new order
      setOrderData([...orderData, newOrder]);
    }
    
    setIsModalOpen(false);
  };

  const generateOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const latestNumber = orders.length > 0 
      ? parseInt(orders[orders.length - 1].number.split('-')[2]) + 1 
      : 1;
    return `C-${year}-${latestNumber.toString().padStart(3, '0')}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des Commandes</h1>
      
      <DataTable 
        data={orderData}
        columns={columns}
        title="Liste des commandes"
        onAddNew={handleAddOrder}
        addNewLabel="Nouvelle Commande"
        onRowClick={handleEditOrder}
      />
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">
                {selectedOrder ? 'Modifier la commande' : 'Ajouter une commande'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveOrder} className="p-4 space-y-4">
              <div className="input-group">
                <label htmlFor="number" className="input-label">Numéro de commande</label>
                <input 
                  type="text" 
                  id="number"
                  name="number"
                  defaultValue={selectedOrder?.number || generateOrderNumber()}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="client" className="input-label">Client</label>
                <select 
                  id="client"
                  name="client"
                  defaultValue={selectedOrder?.clientId || ''}
                  className="input-field"
                  required
                >
                  <option value="" disabled>Sélectionnez un client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="input-group">
                <label htmlFor="creationDate" className="input-label">Date de création</label>
                <input 
                  type="date" 
                  id="creationDate"
                  name="creationDate"
                  defaultValue={selectedOrder?.creationDate || format(new Date(), 'yyyy-MM-dd')}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="installationDate" className="input-label">Date d'installation</label>
                <input 
                  type="date" 
                  id="installationDate"
                  name="installationDate"
                  defaultValue={selectedOrder?.installationDate || ''}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label className="input-label">Statut</label>
                <div className="space-y-2 mt-1">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="En attente"
                      defaultChecked={selectedOrder?.status === 'En attente' || !selectedOrder}
                      className="form-radio h-4 w-4 text-red-600"
                    />
                    <span className="ml-2">En attente</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="En production"
                      defaultChecked={selectedOrder?.status === 'En production'}
                      className="form-radio h-4 w-4 text-yellow-600"
                    />
                    <span className="ml-2">En production</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Fini"
                      defaultChecked={selectedOrder?.status === 'Fini'}
                      className="form-radio h-4 w-4 text-green-600"
                    />
                    <span className="ml-2">Fini</span>
                  </label>
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="company" className="input-label">Compagnie</label>
                <input 
                  type="text" 
                  id="company"
                  name="company"
                  defaultValue={selectedOrder?.company || 'Starwall™'}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="representativeName" className="input-label">Nom du représentant</label>
                <input 
                  type="text" 
                  id="representativeName"
                  name="representativeName"
                  defaultValue={selectedOrder?.representativeName || ''}
                  className="input-field"
                  required
                />
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
                  {selectedOrder ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;