import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Item } from '../../types';
import ItemCard from './ItemCard';

interface MapViewProps {
  items: Item[];
}

const MapView = ({ items }: MapViewProps) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  
  // In a real implementation, we would use a proper map library
  // For this mockup, we'll create a simple representation
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px] relative">
      {/* This would be replaced by an actual map component */}
      <div className="h-full bg-gray-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 text-center px-4">
            A map would be displayed here with {items.length} item markers.<br />
            <span className="text-sm text-gray-400">Using Mapbox or Google Maps integration</span>
          </p>
        </div>
        
        {/* Simulated map pins */}
        {items.map((item, index) => (
          <div 
            key={item.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:z-10"
            style={{ 
              top: `${20 + (index * 5) % 80}%`, 
              left: `${15 + (index * 7) % 75}%`
            }}
            onClick={() => setSelectedItem(item)}
          >
            <div className={`flex flex-col items-center ${selectedItem?.id === item.id ? 'scale-110' : ''}`}>
              <div className={`
                h-8 w-8 rounded-full flex items-center justify-center shadow-md
                ${selectedItem?.id === item.id ? 'bg-purple-500 text-white' : 'bg-white text-purple-600'}
              `}>
                <MapPin size={18} />
              </div>
              <div className="mt-1 px-2 py-1 bg-white rounded shadow-md text-xs font-medium">
                ₹{item.price}/day
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Item preview */}
      {selectedItem && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <ItemCard item={selectedItem} />
        </div>
      )}
    </div>
  );
};

export default MapView;