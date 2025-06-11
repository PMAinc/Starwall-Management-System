import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

function getPageTitle(pathname: string): string {
  const path = pathname === '/' ? '/' : `/${pathname.split('/')[1]}`;
  
  const titles: Record<string, string> = {
    '/': 'Tableau de bord',
    '/gestion': 'Gestion',
    '/clients': 'Clients',
    '/soumissions': 'Soumissions',
    '/commandes': 'Commandes',
    '/production': 'Production',
    '/installation': 'Installation',
    '/statistiques': 'Statistiques',
    '/perspectives': 'Perspectives',
  };
  
  return titles[path] || 'Starwall™';
}

export default Header;