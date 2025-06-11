import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { Installation as InstallationType, Client, Production } from '../types';
import { installations, clients, productions } from '../data/mockData';
import { PenToolIcon as ToolIcon, X, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import MetricCard from '../components/MetricCard';

const Installation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstallation, setSelectedInstallation] = useState<InstallationType | null>(null);
  const [installationData, setInstallationData] = useState<InstallationType[]>(installations);
  
  // Calculate counts
  const waitingCount = installationData.filter(i => i.status === 'En attente').length;
  const inProgressCount = installationData.filter(i => i.status === 'En cours').length;
  const completedCount = installationData.filter(i => i.status === 'Complete').length;

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
          case 'En cours':
            statusClass = 'status-production';
            break;
          case 'Complete':
            statusClass = 'status-completed';
            break;
        }
        return <span className={statusClass}>{value}</span>;
      }
    },
    { accessor: 'deliveryDate', header: 'Date de livraison' },
    { accessor: 'installationDate', header: "Date d'installation" },
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

  const handleAddInstallation = () => {
    setSelectedInstallation(null);
    setIsModalOpen(true);
  };

  const handleEditInstallation = (installation: InstallationType) => {
    setSelectedInstallation(installation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInstallation(null);
  };

  const handleSaveInstallation = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const clientId = formData.get('client') as string;
    const client = clients.find(c => c.id === clientId);
    
    const newInstallation: InstallationType = {
      id: selectedInstallation?.id || `${Date.now()}`,
      number: formData.get('number') as string,
      clientId: clientId,
      clientName: client?.name || '',
      projectNumber: formData.get('projectNumber') as string,
      status: formData.get('status') as 'En attente' | 'En cours' | 'Complete',
      deliveryDate: formData.get('deliveryDate') as string,
      installationDate: formData.get('installationDate') as string,
      progress: parseInt(formData.get('progress') as string),
    };
    
    if (selectedInstallation) {
      // Update existing installation
      setInstallationData(installationData.map(installation => 
        installation.id === selectedInstallation.id ? newInstallation : installation
      ));
    } else {
      // Add new installation
      setInstallationData([...installationData, newInstallation]);
    }
    
    setIsModalOpen(false);
  };

  const generateInstallationNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const latestNumber = installations.length > 0 
      ? parseInt(installations[installations.length - 1].number.split('-')[2]) + 1 
      : 1;
    return `I-${year}-${latestNumber.toString().padStart(3, '0')}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Suivi des Installations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="En attente" 
          value={waitingCount}
          icon={<AlertCircle size={24} />}
          className="border-l-4 border-red-500"
        />
        
        <MetricCard 
          title="En cours" 
          value={inProgressCount}
          icon={<Clock size={24} />}
          className="border-l-4 border-yellow-500"
        />
        
        <MetricCard 
          title="Complétées" 
          value={completedCount}
          icon={<CheckCircle2 size={24} />}
          className="border-l-4 border-green-500"
        />
      </div>
      
      <DataTable 
        data={installationData}
        columns={columns}
        title="Projets en installation"
        onAddNew={handleAddInstallation}
        addNewLabel="Nouvelle Installation"
        onRowClick={handleEditInstallation}
      />
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">
                {selectedInstallation ? "Modifier l'installation" : 'Ajouter une installation'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveInstallation} className="p-4 space-y-4">
              <div className="input-group">
                <label htmlFor="number" className="input-label">Numéro d'installation</label>
                <input 
                  type="text" 
                  id="number"
                  name="number"
                  defaultValue={selectedInstallation?.number || generateInstallationNumber()}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="client" className="input-label">Client</label>
                <select 
                  id="client"
                  name="client"
                  defaultValue={selectedInstallation?.clientId || ''}
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
                  defaultValue={selectedInstallation?.projectNumber || ''}
                  className="input-field"
                  required
                >
                  <option value="" disabled>Sélectionnez un projet</option>
                  {productions.filter(p => p.status === 'Pret').map(production => (
                    <option key={production.number} value={production.projectNumber}>
                      {production.projectNumber} - {production.clientName}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="input-group">
                <label htmlFor="deliveryDate" className="input-label">Date de livraison</label>
                <input 
                  type="date" 
                  id="deliveryDate"
                  name="deliveryDate"
                  defaultValue={selectedInstallation?.deliveryDate || format(new Date(), 'yyyy-MM-dd')}
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
                  defaultValue={selectedInstallation?.installationDate || ''}
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
                      defaultChecked={selectedInstallation?.status === 'En attente' || !selectedInstallation}
                      className="form-radio h-4 w-4 text-red-600"
                    />
                    <span className="ml-2">En attente</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="En cours"
                      defaultChecked={selectedInstallation?.status === 'En cours'}
                      className="form-radio h-4 w-4 text-yellow-600"
                    />
                    <span className="ml-2">En cours</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Complete"
                      defaultChecked={selectedInstallation?.status === 'Complete'}
                      className="form-radio h-4 w-4 text-green-600"
                    />
                    <span className="ml-2">Complété</span>
                  </label>
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="progress" className="input-label">
                  Progression: <span id="progressValueInstall">{selectedInstallation?.progress || 0}%</span>
                </label>
                <input 
                  type="range" 
                  id="progress"
                  name="progress"
                  min="0"
                  max="100"
                  step="5"
                  defaultValue={selectedInstallation?.progress || 0}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  onChange={(e) => {
                    const val = e.target.value;
                    const display = document.getElementById('progressValueInstall');
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
                  {selectedInstallation ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Installation;