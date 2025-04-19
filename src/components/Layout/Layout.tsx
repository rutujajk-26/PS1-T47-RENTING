import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, User, HelpCircle, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-600 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-200"
              >
                <span className="sr-only">Open sidebar</span>
                {isSidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800 bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
                {location.pathname === '/' && 'Dashboard'}
                {location.pathname === '/search' && 'Search Items'}
                {location.pathname === '/rentals' && 'My Rentals'}
                {location.pathname === '/profile' && 'Profile'}
                {location.pathname === '/help' && 'Help'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/help"
                className="p-2 rounded-lg text-gray-500 hover:text-gray-600 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-200"
              >
                <HelpCircle className="h-5 w-5" />
              </Link>
              <Link
                to="/profile"
                className="p-2 rounded-lg text-gray-500 hover:text-gray-600 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-200"
              >
                <User className="h-5 w-5" />
              </Link>
              <button
                className="p-2 rounded-lg text-gray-500 hover:text-gray-600 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-all duration-300 ease-in-out`}
      >
        <Sidebar onClose={toggleSidebar} />
      </div>

      {/* Main Content */}
      <main 
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <Footer />
    </div>
  );
};

export default Layout;