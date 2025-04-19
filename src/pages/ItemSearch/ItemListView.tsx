import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar } from 'lucide-react';
import { Item } from '../../types';

interface ItemListViewProps {
  item: Item;
}

const ItemListView = ({ item }: ItemListViewProps) => {
  return (
    <Link to={`/item/${item.id}`} className="block bg-white rounded-lg shadow-sm overflow-hidden group">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          <img
            src={item.images[0]} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4 flex-1">
          <div className="mb-1 flex justify-between items-start">
            <h3 className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">{item.name}</h3>
            <span className="font-semibold text-purple-600">₹{item.price}<span className="text-xs text-gray-500">/day</span></span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin size={14} className="mr-1" />
            <span>{item.location}</span>
            {item.rating && (
              <>
                <span className="mx-2">•</span>
                <Star size={14} className="text-yellow-500 mr-1" fill="#F59E0B" />
                <span>{item.rating}</span>
              </>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="badge badge-neutral">{item.category}</span>
            <span className={`badge ${
              item.condition === 'Like New' ? 'badge-success' :
              item.condition === 'Good' ? 'badge-neutral' :
              'badge-warning'
            }`}>{item.condition}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={14} className="mr-1" />
            <span>Available Now</span>
            <span className="ml-auto text-purple-600 font-medium group-hover:underline">View Details</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemListView;