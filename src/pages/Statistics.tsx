import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { monthlyData, statistics, revenueData } from '../data/mockData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Statistics: React.FC = () => {
  const [dateRange, setDateRange] = useState('year');
  
  // Calculate totals
  const totalSubmissions = monthlyData.reduce((sum, item) => sum + item.soumissions, 0);
  const totalOrders = monthlyData.reduce((sum, item) => sum + item.commandes, 0);
  const totalInstallations = monthlyData.reduce((sum, item) => sum + item.installations, 0);
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.montant, 0);
  
  // Conversion data
  const conversionData = [
    { name: 'Soumissions', value: totalSubmissions },
    { name: 'Commandes', value: totalOrders }
  ];
  
  // Status data for installations and production
  const statusData = [
    { name: 'En attente', value: 3 },
    { name: 'En cours', value: 2 },
    { name: 'Terminé', value: 1 }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Statistiques</h1>
        
        <div className="flex bg-white rounded-md shadow-sm">
          <button
            onClick={() => setDateRange('month')}
            className={`px-4 py-2 text-sm font-medium ${
              dateRange === 'month' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            } rounded-l-md`}
          >
            Mois
          </button>
          <button
            onClick={() => setDateRange('quarter')}
            className={`px-4 py-2 text-sm font-medium ${
              dateRange === 'quarter' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Trimestre
          </button>
          <button
            onClick={() => setDateRange('year')}
            className={`px-4 py-2 text-sm font-medium ${
              dateRange === 'year' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            } rounded-r-md`}
          >
            Année
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Soumissions, Commandes et Installations</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData.slice(0, 4)} // Only showing the first 4 months for demo
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="soumissions" name="Soumissions" fill="#3B82F6" />
                <Bar dataKey="commandes" name="Commandes" fill="#10B981" />
                <Bar dataKey="installations" name="Installations" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Revenus Mensuels</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData.slice(0, 4)} // Only showing the first 4 months for demo
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Montant']} />
                <Legend />
                <Line type="monotone" dataKey="montant" name="Revenu" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Taux de conversion</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Quantité']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-600">
              Taux de conversion: <span className="font-medium text-gray-900">{((totalOrders / totalSubmissions) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Statuts des projets</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#EF4444' : index === 1 ? '#F59E0B' : '#10B981'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Projets']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Résumé financier</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Revenu total</div>
            <div className="text-2xl font-bold mt-1">{new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(totalRevenue)}</div>
            <div className="mt-2 text-xs text-green-600">+20.4% vs période précédente</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Valeur moyenne par commande</div>
            <div className="text-2xl font-bold mt-1">{new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(totalRevenue / totalOrders)}</div>
            <div className="mt-2 text-xs text-green-600">+5.2% vs période précédente</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Projets en cours</div>
            <div className="text-2xl font-bold mt-1">7</div>
            <div className="mt-2 text-xs text-red-600">-12.5% vs période précédente</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Projets terminés</div>
            <div className="text-2xl font-bold mt-1">14</div>
            <div className="mt-2 text-xs text-green-600">+27.3% vs période précédente</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;