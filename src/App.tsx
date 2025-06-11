import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Management from './pages/Management';
import Clients from './pages/Clients';
import Submissions from './pages/Submissions';
import Orders from './pages/Orders';
import Production from './pages/Production';
import Installation from './pages/Installation';
import Statistics from './pages/Statistics';
import Insights from './pages/Insights';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="gestion" element={<Management />} />
        <Route path="clients" element={<Clients />} />
        <Route path="soumissions" element={<Submissions />} />
        <Route path="commandes" element={<Orders />} />
        <Route path="production" element={<Production />} />
        <Route path="installation" element={<Installation />} />
        <Route path="statistiques" element={<Statistics />} />
        <Route path="perspectives" element={<Insights />} />
      </Route>
    </Routes>
  );
}

export default App;