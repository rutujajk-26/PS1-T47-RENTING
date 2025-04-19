import { Item } from '../../types';

interface PaymentSummaryProps {
  item: Item;
  startDate: Date | null;
  endDate: Date | null;
  deliveryOption: 'pickup' | 'delivery';
}

const PaymentSummary = ({ item, startDate, endDate, deliveryOption }: PaymentSummaryProps) => {
  // Calculate rental duration in days
  const rentalDays = startDate && endDate 
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  
  // Calculate rental cost
  const rentalCost = item.price * rentalDays;
  
  // Delivery fee
  const deliveryFee = deliveryOption === 'delivery' ? 100 : 0;
  
  // Service fee (5% of rental cost)
  const serviceFee = Math.round(rentalCost * 0.05);
  
  // Security deposit (fixed at 50% of item value or minimum ₹500)
  const securityDeposit = Math.max(500, item.value * 0.5);
  
  // Total payment (rental + delivery + service fee)
  const totalPayment = rentalCost + deliveryFee + serviceFee;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium">Payment Summary</h3>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">₹{item.price} × {rentalDays} days</p>
            </div>
            <p className="font-medium">₹{rentalCost}</p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Delivery Fee</p>
              <p className="text-sm text-gray-500">
                {deliveryOption === 'pickup' ? 'Self pickup/return' : 'Delivery to your address'}
              </p>
            </div>
            <p className="font-medium">
              {deliveryOption === 'pickup' ? 'Free' : `₹${deliveryFee}`}
            </p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Service Fee</p>
              <p className="text-sm text-gray-500">Platform service charge</p>
            </div>
            <p className="font-medium">₹{serviceFee}</p>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between font-medium">
              <p>Total Payment</p>
              <p>₹{totalPayment}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between font-medium">
              <p>Security Deposit <span className="text-sm font-normal text-gray-500">(refundable)</span></p>
              <p>₹{securityDeposit}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              The security deposit will be refunded when you return the item in its original condition.
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <p className="mb-1">By proceeding with the payment, you agree to our Terms of Service and Rental Policy.</p>
          <p>The security deposit is fully refundable and will be returned within 24-48 hours after the item is returned in its original condition.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;