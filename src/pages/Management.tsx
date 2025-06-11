import React, { useState } from 'react';
import { Settings, Users, Database, CreditCard, Mail, Shield } from 'lucide-react';

const Management: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', label: 'Général', icon: <Settings size={18} /> },
    { id: 'users', label: 'Utilisateurs', icon: <Users size={18} /> },
    { id: 'data', label: 'Base de données', icon: <Database size={18} /> },
    { id: 'billing', label: 'Facturation', icon: <CreditCard size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Mail size={18} /> },
    { id: 'security', label: 'Sécurité', icon: <Shield size={18} /> },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Paramètres du système</h1>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex overflow-x-auto p-4 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium">Paramètres généraux</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="input-label">Nom de l'entreprise</label>
                    <input type="text" className="input-field" defaultValue="Starwall™" />
                  </div>
                  
                  <div>
                    <label className="input-label">Adresse courriel</label>
                    <input type="email" className="input-field" defaultValue="contact@starwall.com" />
                  </div>
                </div>
                
                <div>
                  <label className="input-label">Adresse</label>
                  <input type="text" className="input-field" defaultValue="123 Rue Principale" />
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label className="input-label">Ville</label>
                    <input type="text" className="input-field" defaultValue="Montréal" />
                  </div>
                  
                  <div>
                    <label className="input-label">Province</label>
                    <input type="text" className="input-field" defaultValue="Québec" />
                  </div>
                  
                  <div>
                    <label className="input-label">Code Postal</label>
                    <input type="text" className="input-field" defaultValue="H1A 1A1" />
                  </div>
                </div>
                
                <div>
                  <label className="input-label">Fuseau horaire</label>
                  <select className="input-field">
                    <option>(GMT-05:00) Eastern Time</option>
                    <option>(GMT-06:00) Central Time</option>
                    <option>(GMT-07:00) Mountain Time</option>
                    <option>(GMT-08:00) Pacific Time</option>
                  </select>
                </div>
                
                <div>
                  <label className="input-label">Logo de l'entreprise</label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <button type="button" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Changer
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end">
                  <button type="button" className="btn btn-secondary mr-3">
                    Annuler
                  </button>
                  <button type="button" className="btn btn-primary">
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium">Gestion des utilisateurs</h2>
              <p>Configuration des utilisateurs et des rôles.</p>
              
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">MA</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Marc Archambault</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        marc@starwall.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Administrateur
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="status-active">Actif</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">Modifier</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">SL</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Sophie Létourneau</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        sophie@starwall.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Gestionnaire
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="status-active">Actif</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">Modifier</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">PT</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Pierre Tremblay</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        pierre@starwall.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Technicien
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="status-inactive">Inactif</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">Modifier</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end">
                <button className="btn btn-primary">
                  Ajouter un utilisateur
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'data' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium">Configuration de la base de données</h2>
              <p>Gérer les sauvegardes et la maintenance de la base de données.</p>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="text-md font-medium mb-2">Sauvegardes automatiques</h3>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="auto-backup"
                      defaultChecked={true}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="auto-backup" className="ml-2 block text-sm text-gray-700">
                      Activer les sauvegardes quotidiennes
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Heure de sauvegarde</label>
                    <select className="mt-1 input-field">
                      <option>00:00</option>
                      <option>01:00</option>
                      <option selected>02:00</option>
                      <option>03:00</option>
                    </select>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="text-md font-medium mb-2">Maintenance</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Dernière sauvegarde</label>
                      <div className="mt-1 text-sm text-gray-500">28 avril 2024, 02:00</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Taille de la base de données</label>
                      <div className="mt-1 text-sm text-gray-500">1.2 GB</div>
                    </div>
                    <button className="btn btn-secondary text-sm">
                      Lancer une sauvegarde manuelle
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end">
                  <button type="button" className="btn btn-primary">
                    Sauvegarder les paramètres
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== 'general' && activeTab !== 'users' && activeTab !== 'data' && (
            <div className="py-8 text-center">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Section en développement
              </h2>
              <p className="text-gray-500">
                Cette section sera disponible dans une prochaine mise à jour.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Management;