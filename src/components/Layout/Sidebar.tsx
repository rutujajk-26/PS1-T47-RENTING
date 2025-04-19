import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Search, Package, History, UserCircle, HelpCircle, X, MessageSquare
} from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';

const Sidebar = () => {
  const location = useLocation();
  const { isOpen, toggleSidebar } = useSidebar();

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/search', icon: <Search size={20} />, label: 'Find Items' },
    { path: '/rentals', icon: <Package size={20} />, label: 'My Rentals' },
    { path: '/chat', icon: <MessageSquare size={20} />, label: 'Messages' },
    { path: '/profile', icon: <UserCircle size={20} />, label: 'Profile' },
    { path: '/help', icon: <HelpCircle size={20} />, label: 'Help & Support' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 z-30 pt-16 md:pt-16 md:sticky ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-4 h-16 md:hidden">
            <span className="text-teal-600 font-bold text-xl">Paisa hi Paisa</span>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Trust Score</p>
              <div className="flex items-center">
                <div className="relative w-full h-2 bg-gray-200 rounded">
                  <div className="absolute top-0 left-0 h-2 bg-teal-500 rounded" style={{ width: '85%' }}></div>
                </div>
                <span className="ml-2 text-sm font-semibold text-gray-700">8.5</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;