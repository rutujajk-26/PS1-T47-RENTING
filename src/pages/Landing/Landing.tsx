import { Link } from 'react-router-dom';
import { Building2, UserCircle, Package } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800">
      <div className="w-full max-w-md p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Rental Reach
        </h1>
        <p className="text-lg text-purple-100 mb-12">
          Your peer-to-peer rental marketplace
        </p>
        
        <div className="space-y-4">
          <Link
            to="/admin"
            className="flex items-center justify-center w-full px-6 py-3 bg-white text-purple-700 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Building2 size={20} className="mr-2" />
            Admin Panel
          </Link>
          
          <Link
            to="/renter"
            className="flex items-center justify-center w-full px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <UserCircle size={20} className="mr-2" />
            Renter Dashboard
          </Link>
          
          <Link
            to="/dashboard"
            className="flex items-center justify-center w-full px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Package size={20} className="mr-2" />
            Borrower Dashboard
          </Link>
        </div>
        
        <p className="mt-12 text-sm text-purple-200">
          Connect, Share, and Earn with your community
        </p>
      </div>
    </div>
  );
};

export default Landing; 