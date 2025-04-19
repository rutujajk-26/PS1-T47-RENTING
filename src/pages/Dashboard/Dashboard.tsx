import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RentalCard from '../MyRentals/RentalCard';
import { Clock, Search, MapPin, Eye } from 'lucide-react';
import { mockRentals } from '../../data/mockData';
import { Rental } from '../../types';
import RecentlyViewedItems from './RecentlyViewedItems';
import SavedSearches from './SavedSearches';

const Dashboard = () => {
  const [activeRentals, setActiveRentals] = useState<Rental[]>([]);
  const [upcomingRentals, setUpcomingRentals] = useState<Rental[]>([]);

  useEffect(() => {
    // Filter active and upcoming rentals
    setActiveRentals(mockRentals.filter(rental => rental.status === 'active').slice(0, 2));
    setUpcomingRentals(mockRentals.filter(rental => rental.status === 'upcoming').slice(0, 2));
  }, []);

  return (
    <div className="max-w-7xl mx-auto animate-slide-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, Rahul!</h1>
        <p className="text-gray-600">Here's an overview of your rental activities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">Quick Search</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="What do you want to borrow?"
                    className="w-full p-3 pl-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <Search size={20} className="absolute left-3 top-3.5 text-gray-500" />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Location"
                    className="w-full p-3 pl-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <MapPin size={20} className="absolute left-3 top-3.5 text-gray-500" />
                </div>
              </div>
              <Link to="/search" className="btn-primary bg-white text-purple-600 hover:bg-gray-100 flex items-center justify-center sm:w-auto px-6">
                Search
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Trust Score</h2>
            <span className="text-purple-600 font-bold text-xl">8.5/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center text-sm">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
              <span>Profile verification complete</span>
            </li>
            <li className="flex items-center text-sm">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
              <span>10 successful rentals</span>
            </li>
            <li className="flex items-center text-sm">
              <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
              <span>Add payment method for +0.5 points</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Active Rentals</h2>
              <Link to="/rentals" className="text-purple-600 text-sm hover:underline">View all</Link>
            </div>
            {activeRentals.length > 0 ? (
              <div className="space-y-4">
                {activeRentals.map(rental => (
                  <RentalCard key={rental.id} rental={rental} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
                <Clock size={40} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">No active rentals</p>
                <Link to="/search" className="btn btn-primary mt-4 inline-block">
                  Find items to rent
                </Link>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upcoming Rentals</h2>
              <Link to="/rentals" className="text-purple-600 text-sm hover:underline">View all</Link>
            </div>
            {upcomingRentals.length > 0 ? (
              <div className="space-y-4">
                {upcomingRentals.map(rental => (
                  <RentalCard key={rental.id} rental={rental} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
                <Clock size={40} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">No upcoming rentals</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <RecentlyViewedItems />
          <SavedSearches />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;