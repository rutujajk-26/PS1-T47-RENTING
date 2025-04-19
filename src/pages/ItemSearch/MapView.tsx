import { useState, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Item } from '../../types';
import ItemCard from './ItemCard';

interface MapViewProps {
  items: Item[];
  locationQuery?: string;
}

const MapView = ({ items, locationQuery }: MapViewProps) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to India center
  
  // Mock geocoding function - Replace with actual API call
  const getCoordinates = (location: string) => {
    const mockCoordinates: Record<string, { lat: number; lng: number }> = {
      'Mumbai, Maharashtra': { lat: 19.0760, lng: 72.8777 },
      'Delhi, India': { lat: 28.7041, lng: 77.1025 },
      'Bangalore, Karnataka': { lat: 12.9716, lng: 77.5946 },
      'Hyderabad, Telangana': { lat: 17.3850, lng: 78.4867 },
      'Chennai, Tamil Nadu': { lat: 13.0827, lng: 80.2707 },
      'Kolkata, West Bengal': { lat: 22.5726, lng: 88.3639 },
      'Pune, Maharashtra': { lat: 18.5204, lng: 73.8567 },
      'Ahmedabad, Gujarat': { lat: 23.0225, lng: 72.5714 },
      'Jaipur, Rajasthan': { lat: 26.9124, lng: 75.7873 },
      'Lucknow, Uttar Pradesh': { lat: 26.8467, lng: 80.9462 }
    };
    return mockCoordinates[location] || { lat: 20.5937, lng: 78.9629 };
  };

  useEffect(() => {
    if (locationQuery) {
      const coordinates = getCoordinates(locationQuery);
      setMapCenter(coordinates);
      
      // Filter items based on location
      const filtered = items.filter(item => 
        item.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [items, locationQuery]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px] relative">
      {/* This would be replaced by an actual map component */}
      <div className="h-full bg-gray-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 text-center px-4">
            {locationQuery ? (
              <>
                Showing items in <span className="font-medium">{locationQuery}</span>
                <br />
                <span className="text-sm text-gray-400">
                  {filteredItems.length} items found
                </span>
              </>
            ) : (
              <>
                A map would be displayed here with {items.length} item markers.<br />
                <span className="text-sm text-gray-400">Using Mapbox or Google Maps integration</span>
              </>
            )}
          </p>
        </div>
        
        {/* Simulated map pins */}
        {filteredItems.map((item, index) => (
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