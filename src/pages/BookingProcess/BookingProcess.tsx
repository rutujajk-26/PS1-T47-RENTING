import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { mockItems } from '../../data/mockData';
import { Item } from '../../types';
import BookingCalendar from './BookingCalendar';
import DeliveryOptions from './DeliveryOptions';
import PaymentSummary from './PaymentSummary';

// Steps in the booking process
type BookingStep = 'dates' | 'delivery' | 'payment' | 'confirmation';

const BookingProcess = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<BookingStep>('dates');
  
  // Booking details
  const [bookingDates, setBookingDates] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null
  });
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | null>(null);
  
  useEffect(() => {
    // Simulate API fetch
    const fetchItem = async () => {
      setLoading(true);
      try {
        // Find the item in our mock data
        setTimeout(() => {
          const foundItem = mockItems.find(item => item.id === id);
          setItem(foundItem || null);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching item:', error);
        setLoading(false);
      }
    };
    
    fetchItem();
  }, [id]);
  
  const goToNextStep = () => {
    switch (currentStep) {
      case 'dates':
        if (bookingDates.startDate && bookingDates.endDate) {
          setCurrentStep('delivery');
        }
        break;
      case 'delivery':
        setCurrentStep('payment');
        break;
      case 'payment':
        setCurrentStep('confirmation');
        break;
      case 'confirmation':
        // Navigate to my rentals after successful booking
        navigate('/rentals');
        break;
    }
  };
  
  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'delivery':
        setCurrentStep('dates');
        break;
      case 'payment':
        setCurrentStep('delivery');
        break;
      case 'confirmation':
        // Can't go back from confirmation
        break;
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!item) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Item Not Found</h2>
        <p className="text-gray-600 mb-6">The item you're trying to book doesn't exist or has been removed.</p>
        <Link to="/search" className="btn btn-primary">
          Browse Items
        </Link>
      </div>
    );
  }
  
  const stepIcon = {
    dates: <Calendar size={24} className="text-white" />,
    delivery: <MapPin size={24} className="text-white" />,
    payment: <CreditCard size={24} className="text-white" />,
    confirmation: <CheckCircle size={24} className="text-white" />
  };
  
  const stepTitle = {
    dates: 'Select Dates',
    delivery: 'Delivery Options',
    payment: 'Payment Details',
    confirmation: 'Confirmation'
  };
  
  return (
    <div className="max-w-3xl mx-auto animate-slide-in py-6">
      <Link to={`/item/${id}`} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ChevronLeft size={20} className="mr-1" />
        Back to item details
      </Link>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="bg-gray-50 border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Book "{item.name}"</h1>
          <p className="text-gray-600">Complete the following steps to book this item</p>
        </div>
        
        {/* Progress steps */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            {(['dates', 'delivery', 'payment', 'confirmation'] as BookingStep[]).map((step, index, array) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep === step 
                      ? 'bg-purple-500' 
                      : array.indexOf(currentStep) > index 
                        ? 'bg-purple-500' 
                        : 'bg-gray-200'
                  }`}>
                    {stepIcon[step]}
                  </div>
                  <span className={`text-xs mt-2 ${currentStep === step ? 'font-medium' : 'text-gray-500'}`}>
                    {stepTitle[step]}
                  </span>
                </div>
                
                {index < array.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    array.indexOf(currentStep) > index ? 'bg-purple-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Step content */}
        <div className="p-6">
          {currentStep === 'dates' && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-medium mb-4">Select Rental Dates</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <BookingCalendar 
                    onSelectDates={(startDate, endDate) => 
                      setBookingDates({ startDate, endDate })
                    }
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-start mb-4">
                      <Clock size={20} className="text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-800">Rental Duration</h3>
                        {bookingDates.startDate && bookingDates.endDate ? (
                          <p className="text-gray-600 mt-1">
                            {bookingDates.startDate.toLocaleDateString()} - {bookingDates.endDate.toLocaleDateString()}
                            <br />
                            <span className="text-sm">
                              ({Math.ceil((bookingDates.endDate.getTime() - bookingDates.startDate.getTime()) / (1000 * 60 * 60 * 24))} days)
                            </span>
                          </p>
                        ) : (
                          <p className="text-gray-500 text-sm mt-1">Please select start and end dates</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin size={20} className="text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-gray-800">Item Location</h3>
                        <p className="text-gray-600 mt-1">{item.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    <p className="mb-2">
                      <span className="font-medium text-gray-700">Minimum rental period:</span> 2 days
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Note:</span> Pickup and 
                      return times are between 10:00 AM and 6:00 PM unless otherwise 
                      arranged with the owner.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'delivery' && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-medium mb-4">Choose Delivery Option</h2>
              <DeliveryOptions
                selectedOption={deliveryOption} 
                onSelectOption={setDeliveryOption}
                item={item}
              />
            </div>
          )}
          
          {currentStep === 'payment' && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-medium mb-4">Payment Details</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium">Payment Method</h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="mr-3 h-4 w-4 text-purple-600"
                          />
                          <div>
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-sm text-gray-500">Pay securely with your card</p>
                          </div>
                        </label>
                        
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={paymentMethod === 'upi'}
                            onChange={() => setPaymentMethod('upi')}
                            className="mr-3 h-4 w-4 text-purple-600"
                          />
                          <div>
                            <p className="font-medium">UPI Payment</p>
                            <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm, etc.</p>
                          </div>
                        </label>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
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
                            <div className="flex gap-4">
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Expiry Date
                                </label>
                                <input
                                  type="text"
                                  className="input"
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  CVV
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
                                placeholder="John Doe"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === 'upi' && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              UPI ID
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder="yourname@upi"
                            />
                            <p className="mt-2 text-sm text-gray-500">
                              Enter your UPI ID (e.g., yourname@okicici, yourname@upi)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <PaymentSummary 
                    item={item}
                    startDate={bookingDates.startDate}
                    endDate={bookingDates.endDate}
                    deliveryOption={deliveryOption}
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'confirmation' && (
            <div className="animate-fade-in text-center py-6">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your booking for "{item.name}" has been successfully confirmed.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
                <h3 className="font-medium text-lg mb-3">Booking Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">BK{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rental Period:</span>
                    <span className="font-medium">
                      {bookingDates.startDate?.toLocaleDateString()} - {bookingDates.endDate?.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-purple-600">Confirmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">
                      ₹{item.price * 
                        (bookingDates.startDate && bookingDates.endDate 
                          ? Math.ceil((bookingDates.endDate.getTime() - bookingDates.startDate.getTime()) / (1000 * 60 * 60 * 24)) 
                          : 0
                        )}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                A confirmation email has been sent to your registered email address.
                <br />
                You can also view this booking in your "My Rentals" section.
              </p>
            </div>
          )}
        </div>
        
        {/* Step navigation */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-between">
          {currentStep !== 'dates' && currentStep !== 'confirmation' ? (
            <button 
              className="btn btn-outline"
              onClick={goToPreviousStep}
            >
              <ChevronLeft size={18} className="mr-1" />
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          <button 
            className="btn btn-primary flex items-center"
            onClick={goToNextStep}
            disabled={
              (currentStep === 'dates' && (!bookingDates.startDate || !bookingDates.endDate)) ||
              (currentStep === 'payment' && !paymentMethod)
            }
          >
            {currentStep === 'confirmation' ? 'View My Rentals' : 'Continue'}
            {currentStep !== 'confirmation' && <ChevronRight size={18} className="ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingProcess;