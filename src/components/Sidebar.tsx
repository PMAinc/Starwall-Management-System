import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Settings, Users, FileText, ShoppingCart, Factory, PenToolIcon as ToolIcon, BarChart2, Lightbulb, X } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { path: '/', name: 'Tableau de bord', icon: <Home size={20} /> },
    { path: '/gestion', name: 'Gestion', icon: <Settings size={20} /> },
    { path: '/clients', name: 'Clients', icon: <Users size={20} /> },
    { path: '/soumissions', name: 'Soumissions', icon: <FileText size={20} /> },
    { path: '/commandes', name: 'Commandes', icon: <ShoppingCart size={20} /> },
    { path: '/production', name: 'Production', icon: <Factory size={20} /> },
    { path: '/installation', name: 'Installation', icon: <ToolIcon size={20} /> },
    { path: '/statistiques', name: 'Statistiques', icon: <BarChart2 size={20} /> },
    { path: '/perspectives', name: 'Perspectives', icon: <Lightbulb size={20} /> }
  ];

  return (
    <>
      <div 
        className={clsx(
          "fixed inset-0 bg-gray-900 bg-opacity-75 z-20 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      />
      <aside 
        className={clsx(
          "fixed top-0 left-0 z-30 w-64 h-screen transition-transform transform bg-gray-800 border-r border-gray-700 md:translate-x-0 md:static md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-blue-400">Starwall™</h1>
          <button 
            className="p-1 rounded-md md:hidden hover:bg-gray-700 text-gray-300" 
            onClick={toggleSidebar}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                clsx("sidebar-link", isActive && "active")
              }
              end={item.path === '/'}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;