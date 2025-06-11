import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { Production as ProductionType, Client, Order } from '../types';
import { productions, clients, orders } from '../data/mockData';
import { Factory, X, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import MetricCard from '../components/MetricCard';

const Production: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState<ProductionType | null>(null);
  const [productionData, setProductionData] = useState<ProductionType[]>(productions);
  
  // Calculate counts
  const waitingCount = productionData.filter(p => p.status === 'En attente').length;
  const inProgressCount = productionData.filter(p => p.status === 'En fabrication').length;
  const readyCount = productionData.filter(p => p.status === 'Pret').length;

  const columns = [
    { accessor: 'number', header: 'Numéro' },
    { accessor: 'clientName', header: 'Client' },
    { accessor: 'projectNumber', header: 'Numéro de projet' },
    { 
      accessor: 'status', 
      header: 'Statut',
      Cell: ({ value }: { value: string }) => {
        let statusClass = '';
        switch (value) {
          case 'En attente':
            statusClass = 'status-waiting';
            break;
          case 'En fabrication':
            statusClass = 'status-production';
            break;
          case 'Pret':
            statusClass = 'status-completed';
            break;
        }
        return <span className={statusClass}>{value}</span>;
      }
    },
    { accessor: 'startDate', header: 'Date de début' },
    { accessor: 'endDate', header: 'Date de fin' },
    { 
      accessor: 'progress', 
      header: 'Progression',
      Cell: ({ value }: { value: number }) => (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${value}%` }}
          ></div>
        </div>
      )
    }
  ];

  const handleAddProduction = () => {
    setSelectedProduction(null);
    setIsModalOpen(true);
  };

  const handleEditProduction = (production: ProductionType) => {
    setSelectedProduction(production);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduction(null);
  };

  const handleSaveProduction = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const clientId = formData.get('client') as string;
    const client = clients.find(c => c.id === clientId);
    
    const newProduction: ProductionType = {
      id: selectedProduction?.id || `${Date.now()}`,
      number: formData.get('number') as string,
      clientId: clientId,
      clientName: client?.name || '',
      projectNumber: formData.get('projectNumber') as string,
      status: formData.get('status') as 'En attente' | 'En fabrication' | 'Pret',
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      progress: parseInt(formData.get('progress') as string),
    };
    
    if (selectedProduction) {
      // Update existing production
      setProductionData(productionData.map(production => 
        production.id === selectedProduction.id ? newProduction : production
      ));
    } else {
      // Add new production
      setProductionData([...productionData, newProduction]);
    }
    
    setIsModalOpen(false);
  };

  const generateProductionNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const latestNumber = productions.length > 0 
      ? parseInt(productions[productions.length - 1].number.split('-')[2]) + 1 
      : 1;
    return `P-${year}-${latestNumber.toString().padStart(3, '0')}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Suivi de Production</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="En attente" 
          value={waitingCount}
          icon={<AlertCircle size={24} />}
          className="border-l-4 border-red-500"
        />
        
        <MetricCard 
          title="En fabrication" 
          value={inProgressCount}
          icon={<Factory size={24} />}
          className="border-l-4 border-yellow-500"
        />
        
        <MetricCard 
          title="Prêt" 
          value={readyCount}
          icon={<CheckCircle size={24} />}
          className="border-l-4 border-green-500"
        />
      </div>
      
      <DataTable 
        data={productionData}
        columns={columns}
        title="Projets en fabrication"
        onAddNew={handleAddProduction}
        addNewLabel="Nouveau Projet"
        onRowClick={handleEditProduction}
      />
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">
                {selectedProduction ? 'Modifier le projet' : 'Ajouter un projet'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveProduction} className="p-4 space-y-4">
              <div className="input-group">
                <label htmlFor="number" className="input-label">Numéro de fabrication</label>
                <input 
                  type="text" 
                  id="number"
                  name="number"
                  defaultValue={selectedProduction?.number || generateProductionNumber()}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="client" className="input-label">Client</label>
                <select 
                  id="client"
                  name="client"
                  defaultValue={selectedProduction?.clientId || ''}
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
                <label htmlFor="projectNumber" className="input-label">Numéro de projet</label>
                <select 
                  id="projectNumber"
                  name="projectNumber"
                  defaultValue={selectedProduction?.projectNumber || ''}
                  className="input-field"
                  required
                >
                  <option value="" disabled>Sélectionnez un numéro de commande</option>
                  {orders.map(order => (
                    <option key={order.number} value={order.number}>
                      {order.number} - {order.clientName}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="input-group">
                <label htmlFor="startDate" className="input-label">Date de début</label>
                <input 
                  type="date" 
                  id="startDate"
                  name="startDate"
                  defaultValue={selectedProduction?.startDate || format(new Date(), 'yyyy-MM-dd')}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="endDate" className="input-label">Date de fin</label>
                <input 
                  type="date" 
                  id="endDate"
                  name="endDate"
                  defaultValue={selectedProduction?.endDate || ''}
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
                      defaultChecked={selectedProduction?.status === 'En attente' || !selectedProduction}
                      className="form-radio h-4 w-4 text-red-600"
                    />
                    <span className="ml-2">En attente</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="En fabrication"
                      defaultChecked={selectedProduction?.status === 'En fabrication'}
                      className="form-radio h-4 w-4 text-yellow-600"
                    />
                    <span className="ml-2">En fabrication</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Pret"
                      defaultChecked={selectedProduction?.status === 'Pret'}
                      className="form-radio h-4 w-4 text-green-600"
                    />
                    <span className="ml-2">Prêt</span>
                  </label>
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="progress" className="input-label">
                  Progression: <span id="progressValue">{selectedProduction?.progress || 0}%</span>
                </label>
                <input 
                  type="range" 
                  id="progress"
                  name="progress"
                  min="0"
                  max="100"
                  step="5"
                  defaultValue={selectedProduction?.progress || 0}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  onChange={(e) => {
                    const val = e.target.value;
                    const display = document.getElementById('progressValue');
                    if (display) display.textContent = `${val}%`;
                  }}
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
                  {selectedProduction ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Production;