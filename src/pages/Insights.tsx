import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Lightbulb, TrendingUp, Filter, Clock, Calendar } from 'lucide-react';

// Mock data for forecast
const forecastData = [
  { month: 'Mai', prévu: 6, réel: 0 },
  { month: 'Juin', prévu: 8, réel: 0 },
  { month: 'Juillet', prévu: 10, réel: 0 },
  { month: 'Août', prévu: 9, réel: 0 },
  { month: 'Septembre', prévu: 11, réel: 0 },
  { month: 'Octobre', prévu: 7, réel: 0 },
];

// Mock data for client category distribution
const clientCategoryData = [
  { category: 'Résidentiel', count: 35 },
  { category: 'Commercial', count: 40 },
  { category: 'Industriel', count: 25 },
];

// Mock insights list
const insightsList = [
  {
    id: 1,
    title: "Augmentation des projets commerciaux",
    description: "Les projets commerciaux ont augmenté de 15% au premier trimestre par rapport à l'année dernière.",
    impact: "élevé",
    date: "2024-04-15"
  },
  {
    id: 2,
    title: "Délais de production réduits",
    description: "Le temps moyen de production a été réduit de 3 jours grâce aux améliorations de processus.",
    impact: "moyen",
    date: "2024-04-10"
  },
  {
    id: 3,
    title: "Opportunité de marché identifiée",
    description: "Le secteur résidentiel de luxe montre une forte croissance potentielle dans la région de Québec.",
    impact: "élevé",
    date: "2024-04-05"
  },
  {
    id: 4,
    title: "Clients récurrents en hausse",
    description: "Le taux de clients récurrents a augmenté de 8% ce trimestre.",
    impact: "moyen",
    date: "2024-03-28"
  },
  {
    id: 5,
    title: "Optimisation des coûts possible",
    description: "Analyse des fournisseurs montre un potentiel d'économie de 5% sur les matériaux.",
    impact: "faible",
    date: "2024-03-20"
  }
];

const Insights: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredInsights = activeFilter === 'all' 
    ? insightsList 
    : insightsList.filter(insight => insight.impact === activeFilter);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Perspectives</h1>
        
        <div className="flex bg-white rounded-md shadow-sm">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-sm font-medium ${
              activeFilter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            } rounded-l-md`}
          >
            Tous
          </button>
          <button
            onClick={() => setActiveFilter('élevé')}
            className={`px-3 py-1.5 text-sm font-medium ${
              activeFilter === 'élevé' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Impact élevé
          </button>
          <button
            onClick={() => setActiveFilter('moyen')}
            className={`px-3 py-1.5 text-sm font-medium ${
              activeFilter === 'moyen' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Impact moyen
          </button>
          <button
            onClick={() => setActiveFilter('faible')}
            className={`px-3 py-1.5 text-sm font-medium ${
              activeFilter === 'faible' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            } rounded-r-md`}
          >
            Impact faible
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-blue-600" />
            Prévisions de commandes
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={forecastData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="prévu" name="Commandes prévues" fill="#3B82F6" />
                <Bar dataKey="réel" name="Commandes réelles" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Filter size={20} className="mr-2 text-blue-600" />
            Distribution des clients par catégorie
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={clientCategoryData}
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Nombre de clients" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center">
            <Lightbulb size={20} className="mr-2 text-yellow-500" />
            Insights d'affaires
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredInsights.map((insight) => (
            <div key={insight.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className={`h-6 w-1 rounded-full mr-4 ${
                  insight.impact === 'élevé' 
                    ? 'bg-red-500' 
                    : insight.impact === 'moyen' 
                      ? 'bg-yellow-500' 
                      : 'bg-blue-500'
                }`} />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{insight.title}</h3>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {new Date(insight.date).toLocaleDateString('fr-CA')}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-gray-600">{insight.description}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      insight.impact === 'élevé' 
                        ? 'bg-red-100 text-red-800' 
                        : insight.impact === 'moyen' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      Impact {insight.impact}
                    </span>
                    
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredInsights.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Aucun insight avec ce filtre
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;