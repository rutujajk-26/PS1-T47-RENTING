import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Item } from '../../types';

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Link to={`/item/${item.id}`} className="card group">
      <div className="relative h-48">
        <img 
          src={item.images[0]} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
        {item.rating && (
          <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center">
            <Star size={14} className="text-yellow-500 mr-1" fill="#F59E0B" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-1 flex justify-between items-start">
          <h3 className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">{item.name}</h3>
          <span className="font-semibold text-purple-600">₹{item.price}<span className="text-xs text-gray-500">/day</span></span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin size={14} className="mr-1" />
          <span>{item.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="badge badge-neutral">{item.category}</span>
          <span className={`badge ${
            item.condition === 'Like New' ? 'badge-success' :
            item.condition === 'Good' ? 'badge-neutral' :
            'badge-warning'
          }`}>{item.condition}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
      </div>
    </Link>
  );
};

export default ItemCard;