import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, User, HelpCircle, X } from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/search', icon: Search, label: 'Search Items' },
    { path: '/rentals', icon: Calendar, label: 'My Rentals' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/help', icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div className="h-full bg-white/90 backdrop-blur-md border-r border-gray-200/50 shadow-lg">
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200/50">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            RentalReach 
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-50/80 text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-900 hover:shadow-sm'
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                      isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200/50">
          <div className="bg-gray-50/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
            <p className="text-sm font-medium text-gray-700 mb-2">Trust Score</p>
            <div className="flex items-center">
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500" 
                  style={{ width: '85%' }}
                />
              </div>
              <span className="ml-2 text-sm font-semibold text-gray-700">8.5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;