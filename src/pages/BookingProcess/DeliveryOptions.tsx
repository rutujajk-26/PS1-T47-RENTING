import { MapPin, Truck } from 'lucide-react';
import { Item } from '../../types';

interface DeliveryOptionsProps {
  selectedOption: 'pickup' | 'delivery';
  onSelectOption: (option: 'pickup' | 'delivery') => void;
  item: Item;
}

const DeliveryOptions = ({ selectedOption, onSelectOption, item }: DeliveryOptionsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          className={`
            border rounded-lg p-4 cursor-pointer transition-all
            ${selectedOption === 'pickup' 
              ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
          onClick={() => onSelectOption('pickup')}
        >
          <div className="flex items-start">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center mr-3
              ${selectedOption === 'pickup' ? 'bg-purple-500' : 'bg-gray-100'}
            `}>
              <MapPin size={20} className={selectedOption === 'pickup' ? 'text-white' : 'text-gray-500'} />
            </div>
            <div>
              <h3 className="font-medium mb-1">Self Pickup</h3>
              <p className="text-sm text-gray-600 mb-2">
                Pick up and return the item yourself at the owner's location.
              </p>
              <p className="text-sm font-medium">
                Address: {item.location}
              </p>
            </div>
          </div>
        </div>
        
        <div 
          className={`
            border rounded-lg p-4 cursor-pointer transition-all
            ${selectedOption === 'delivery' 
              ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200' 
              : 'border-gray-200 hover:border-gray-300'
            }
          `}
          onClick={() => onSelectOption('delivery')}
        >
          <div className="flex items-start">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center mr-3
              ${selectedOption === 'delivery' ? 'bg-purple-500' : 'bg-gray-100'}
            `}>
              <Truck size={20} className={selectedOption === 'delivery' ? 'text-white' : 'text-gray-500'} />
            </div>
            <div>
              <h3 className="font-medium mb-1">Delivery</h3>
              <p className="text-sm text-gray-600 mb-2">
                The owner will deliver and pick up the item from your location.
              </p>
              <p className="text-sm font-medium">
                Additional cost: ₹100
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {selectedOption === 'pickup' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-3">Pickup Instructions</h3>
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium">Pickup/Return hours:</span> 10:00 AM - 6:00 PM daily
            </p>
            <p>
              <span className="font-medium">Contact person:</span> Ananya Singh
            </p>
            <p>
              <span className="font-medium">What to bring:</span> Your ID proof and a copy of the booking confirmation
            </p>
            <p>
              <span className="font-medium">Note:</span> Please contact the owner 30 minutes before arrival
            </p>
          </div>
        </div>
      )}
      
      {selectedOption === 'delivery' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-3">Delivery Address</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address
              </label>
              <textarea className="input" rows={3} placeholder="Enter your complete address"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input type="text" className="input" placeholder="City" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code
                </label>
                <input type="text" className="input" placeholder="PIN Code" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Instructions (Optional)
              </label>
              <textarea className="input" rows={2} placeholder="Any special instructions for delivery"></textarea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryOptions;