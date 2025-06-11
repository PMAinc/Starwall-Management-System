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
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Aperçu de l'activité récente</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <div className="text-sm text-gray-500">Aujourd'hui</div>
                <div className="font-medium">3 nouvelles soumissions reçues</div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <div className="text-sm text-gray-500">Hier</div>
                <div className="font-medium">Installation pour Constructions Modernes terminée</div>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4 py-1">
                <div className="text-sm text-gray-500">27 avril</div>
                <div className="font-medium">Début de la production pour le projet Immobilier Québec</div>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <div className="text-sm text-gray-500">26 avril</div>
                <div className="font-medium">2 nouveaux clients ajoutés</div>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-1">
                <div className="text-sm text-gray-500">25 avril</div>
                <div className="font-medium">Commande C-2024-005 en attente de validation</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Projets à surveiller</h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">Immobilier Québec - P-2024-001</h3>
                    <div className="text-sm text-gray-500">Production: 60% complétée</div>
                  </div>
                  <div className="status-production">En fabrication</div>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">Édifices Corporatifs - P-2024-002</h3>
                    <div className="text-sm text-gray-500">Production: 0% complétée</div>
                  </div>
                  <div className="status-waiting">En attente</div>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">Constructions Modernes - I-2024-001</h3>
                    <div className="text-sm text-gray-500">Installation: 100% complétée</div>
                  </div>
                  <div className="status-completed">Complété</div>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <Calendar events={calendarEvents} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;