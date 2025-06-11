import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { Submission, Client } from '../types';
import { submissions, clients } from '../data/mockData';
import { FileText, X } from 'lucide-react';
import { format } from 'date-fns';

const Submissions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [submissionData, setSubmissionData] = useState<Submission[]>(submissions);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(amount);
  };

  const columns = [
    { accessor: 'number', header: 'Numéro' },
    { accessor: 'clientName', header: 'Client' },
    { accessor: 'date', header: 'Date' },
    { 
      accessor: 'amount', 
      header: 'Montant',
      Cell: ({ value }: { value: number }) => formatCurrency(value)
    },
    { 
      accessor: 'status', 
      header: 'Statut',
      Cell: ({ value }: { value: string }) => {
        let statusClass = '';
        switch (value) {
          case 'En attente':
            statusClass = 'status-pending';
            break;
          case 'Accepte':
            statusClass = 'status-active';
            break;
          case 'En revision':
            statusClass = 'status-revision';
            break;
        }
        return <span className={statusClass}>{value}</span>;
      }
    }
  ];

  const handleAddSubmission = () => {
    setSelectedSubmission(null);
    setIsModalOpen(true);
  };

  const handleEditSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const handleSaveSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const clientId = formData.get('client') as string;
    const client = clients.find(c => c.id === clientId);
    
    const newSubmission: Submission = {
      id: selectedSubmission?.id || `${Date.now()}`,
      number: formData.get('number') as string,
      clientId: clientId,
      clientName: client?.name || '',
      date: formData.get('date') as string,
      amount: parseFloat(formData.get('amount') as string),
      status: formData.get('status') as 'En attente' | 'Accepte' | 'En revision',
    };
    
    if (selectedSubmission) {
      // Update existing submission
      setSubmissionData(submissionData.map(submission => 
        submission.id === selectedSubmission.id ? newSubmission : submission
      ));
    } else {
      // Add new submission
      setSubmissionData([...submissionData, newSubmission]);
    }
    
    setIsModalOpen(false);
  };

  const generateSubmissionNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const latestNumber = submissions.length > 0 
      ? parseInt(submissions[submissions.length - 1].number.split('-')[2]) + 1 
      : 1;
    return `S-${year}-${latestNumber.toString().padStart(3, '0')}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion des Soumissions</h1>
      
      <DataTable 
        data={submissionData}
        columns={columns}
        title="Liste des soumissions"
        onAddNew={handleAddSubmission}
        addNewLabel="Nouvelle Soumission"
        onRowClick={handleEditSubmission}
      />
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">
                {selectedSubmission ? 'Modifier la soumission' : 'Ajouter une soumission'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveSubmission} className="p-4 space-y-4">
              <div className="input-group">
                <label htmlFor="number" className="input-label">Numéro de soumission</label>
                <input 
                  type="text" 
                  id="number"
                  name="number"
                  defaultValue={selectedSubmission?.number || generateSubmissionNumber()}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="client" className="input-label">Client</label>
                <select 
                  id="client"
                  name="client"
                  defaultValue={selectedSubmission?.clientId || ''}
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
                <label htmlFor="date" className="input-label">Date</label>
                <input 
                  type="date" 
                  id="date"
                  name="date"
                  defaultValue={selectedSubmission?.date || format(new Date(), 'yyyy-MM-dd')}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="amount" className="input-label">Montant</label>
                <input 
                  type="number" 
                  id="amount"
                  name="amount"
                  step="0.01"
                  min="0"
                  defaultValue={selectedSubmission?.amount || ''}
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
                      defaultChecked={selectedSubmission?.status === 'En attente' || !selectedSubmission}
                      className="form-radio h-4 w-4 text-yellow-600"
                    />
                    <span className="ml-2">En attente</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="Accepte"
                      defaultChecked={selectedSubmission?.status === 'Accepte'}
                      className="form-radio h-4 w-4 text-green-600"
                    />
                    <span className="ml-2">Accepté</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="En revision"
                      defaultChecked={selectedSubmission?.status === 'En revision'}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">En révision</span>
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
                  {selectedSubmission ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submissions;