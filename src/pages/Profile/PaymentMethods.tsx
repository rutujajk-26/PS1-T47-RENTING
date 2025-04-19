import { useState } from 'react';
import { Plus, CreditCard, Smartphone, Check, X } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi';
  name: string;
  details: string;
  isDefault: boolean;
}

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'pm1',
      type: 'card',
      name: 'HDFC Credit Card',
      details: '•••• •••• •••• 4242',
      isDefault: true
    },
    {
      id: 'pm2',
      type: 'upi',
      name: 'UPI ID',
      details: 'rahul.mehta@oksbi',
      isDefault: false
    }
  ]);
  
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [newMethodType, setNewMethodType] = useState<'card' | 'upi'>('card');
  
  const setDefaultMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };
  
  const removeMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Payment Methods</h2>
        <p className="text-gray-600">Manage your payment methods for rental transactions</p>
      </div>
      
      <div className="p-6">
        {paymentMethods.length > 0 ? (
          <div className="space-y-4">
            {paymentMethods.map(method => (
              <div 
                key={method.id} 
                className={`border rounded-lg p-4 ${method.isDefault ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      method.isDefault ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {method.type === 'card' ? (
                        <CreditCard size={20} />
                      ) : (
                        <Smartphone size={20} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.details}</p>
                      {method.isDefault && (
                        <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          <Check size={12} className="mr-1" />
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {!method.isDefault && (
                      <button 
                        className="text-sm text-gray-600 hover:text-gray-900"
                        onClick={() => setDefaultMethod(method.id)}
                      >
                        Set as default
                      </button>
                    )}
                    <button 
                      className="text-sm text-red-600 hover:text-red-700"
                      onClick={() => removeMethod(method.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <CreditCard size={40} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No payment methods</h3>
            <p className="text-gray-500 mb-4">
              Add a payment method to quickly complete rental transactions.
            </p>
          </div>
        )}
        
        {!showAddMethod ? (
          <button 
            className="mt-6 flex items-center text-purple-600 font-medium hover:text-purple-700"
            onClick={() => setShowAddMethod(true)}
          >
            <Plus size={20} className="mr-1" />
            Add Payment Method
          </button>
        ) : (
          <div className="mt-6 border border-gray-200 rounded-lg p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">Add New Payment Method</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddMethod(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`px-4 py-2 border-b-2 text-sm font-medium ${
                  newMethodType === 'card' 
                    ? 'border-purple-500 text-purple-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setNewMethodType('card')}
              >
                Credit/Debit Card
              </button>
              <button
                className={`px-4 py-2 border-b-2 text-sm font-medium ${
                  newMethodType === 'upi' 
                    ? 'border-purple-500 text-purple-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setNewMethodType('upi')}
              >
                UPI
              </button>
            </div>
            
            {newMethodType === 'card' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV/CVC
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Name as it appears on your card"
                  />
                </div>
                <div className="flex items-center mt-2">
                  <input
                    id="default-card"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                  />
                  <label htmlFor="default-card" className="text-sm text-gray-600">
                    Set as default payment method
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="yourname@upi"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter your UPI ID (e.g., name@oksbi, name@okicici)
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    id="default-upi"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2"
                  />
                  <label htmlFor="default-upi" className="text-sm text-gray-600">
                    Set as default payment method
                  </label>
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <button className="btn btn-primary">
                Save Payment Method
              </button>
              <button 
                className="ml-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowAddMethod(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;