import React from 'react';
import { Users, FileText, Calendar as CalendarIcon, ShoppingCart } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import Calendar from '../components/Calendar';
import { calendarEvents, dashboardStats } from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Clients actifs" 
          value={dashboardStats.activeClients.value}
          icon={<Users size={24} />}
          change={{ 
            value: dashboardStats.activeClients.change, 
            positive: true 
          }}
        />
        
        <MetricCard 
          title="Soumissions en production" 
          value={dashboardStats.submissions.value}
          icon={<FileText size={24} />}
          change={{ 
            value: dashboardStats.submissions.change, 
            positive: true 
          }}
        />
        
        <MetricCard 
          title="Installations prévues" 
          value={dashboardStats.upcomingInstallations.value}
          icon={<CalendarIcon size={24} />}
          change={{ 
            value: dashboardStats.upcomingInstallations.change, 
            positive: false 
          }}
        />
        
        <MetricCard 
          title="Commandes du mois" 
          value={dashboardStats.monthlyOrders.value}
          icon={<ShoppingCart size={24} />}
          change={{ 
            value: dashboardStats.monthlyOrders.change, 
            positive: true 
          }}
        />
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-100">Aperçu de l'activité récente</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-700 rounded-r-lg">
                <div className="text-sm text-gray-400">Aujourd'hui</div>
                <div className="font-medium text-gray-200">3 nouvelles soumissions reçues</div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-gray-700 rounded-r-lg">
                <div className="text-sm text-gray-400">Hier</div>
                <div className="font-medium text-gray-200">Installation pour Constructions Modernes terminée</div>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-gray-700 rounded-r-lg">
                <div className="text-sm text-gray-400">27 avril</div>
                <div className="font-medium text-gray-200">Début de la production pour le projet Immobilier Québec</div>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-gray-700 rounded-r-lg">
                <div className="text-sm text-gray-400">26 avril</div>
                <div className="font-medium text-gray-200">2 nouveaux clients ajoutés</div>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-gray-700 rounded-r-lg">
                <div className="text-sm text-gray-400">25 avril</div>
                <div className="font-medium text-gray-200">Commande C-2024-005 en attente de validation</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-100">Projets à surveiller</h2>
            
            <div className="space-y-4">
              <div className="border border-gray-600 rounded-lg p-4 hover:bg-gray-700 transition-colors bg-gray-750">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg text-gray-200">Immobilier Québec - P-2024-001</h3>
                    <div className="text-sm text-gray-400">Production: 60% complétée</div>
                  </div>
                  <div className="status-production">En fabrication</div>
                </div>
                <div className="mt-3 h-2 bg-gray-600 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full transition-all duration-300" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div className="border border-gray-600 rounded-lg p-4 hover:bg-gray-700 transition-colors bg-gray-750">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg text-gray-200">Édifices Corporatifs - P-2024-002</h3>
                    <div className="text-sm text-gray-400">Production: 0% complétée</div>
                  </div>
                  <div className="status-waiting">En attente</div>
                </div>
                <div className="mt-3 h-2 bg-gray-600 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              <div className="border border-gray-600 rounded-lg p-4 hover:bg-gray-700 transition-colors bg-gray-750">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg text-gray-200">Constructions Modernes - I-2024-001</h3>
                    <div className="text-sm text-gray-400">Installation: 100% complétée</div>
                  </div>
                  <div className="status-completed">Complété</div>
                </div>
                <div className="mt-3 h-2 bg-gray-600 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="xl:col-span-1">
          <Calendar events={calendarEvents} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;