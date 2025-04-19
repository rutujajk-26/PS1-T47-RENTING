import { Link } from 'react-router-dom';
import { mockItems } from '../../data/mockData';
import { Eye } from 'lucide-react';

const RecentlyViewedItems = () => {
  // For demo purposes, take the first 3 items
  const recentlyViewed = mockItems.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recently Viewed</h2>
      </div>
      
      {recentlyViewed.length > 0 ? (
        <div className="space-y-4">
          {recentlyViewed.map(item => (
            <Link to={`/item/${item.id}`} key={item.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <img 
                src={item.images[0]} 
                alt={item.name} 
                className="w-12 h-12 object-cover rounded-md mr-3"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price}/day</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <Eye size={24} className="mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">No recently viewed items</p>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewedItems;