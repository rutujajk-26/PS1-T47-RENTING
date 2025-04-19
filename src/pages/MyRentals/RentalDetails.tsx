import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, MessageSquare, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { Rental } from '../../types';
import toast from 'react-hot-toast';

// Mock data - Replace with actual API call
const mockRental: Rental = {
  id: '1',
  item: {
    id: '1',
    name: 'Canon EOS R5',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32'],
    location: 'Mumbai, Maharashtra',
    price: 1500,
    rating: 4.8,
    reviews: 24,
  },
  startDate: '2024-03-15',
  endDate: '2024-03-20',
  duration: 5,
  totalAmount: 7500,
  securityDeposit: 5000,
  status: 'active',
  bookingDate: '2024-03-10',
  owner: 'John Doe',
  pickupLocation: '123 Main St, Mumbai',
  pickupInstructions: 'Please bring your ID proof and security deposit in cash.',
};

const RentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  // In a real app, fetch rental details using the id
  const rental = mockRental;
  
  const handleExtendRequest = () => {
    toast.success("Extension request sent to the owner.");
  };
  
  const handleReportIssue = () => {
    toast.success("Issue reported successfully. Our team will contact you soon.");
  };
  
  const handleCancelBooking = () => {
    toast.success("Booking cancelled successfully.");
    navigate('/rentals');
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/rentals')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Rentals
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <img
              src={rental.item.images[0]}
              alt={rental.item.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{rental.item.name}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={16} className="mr-1" />
              <span>{rental.item.location}</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>Rental Period</span>
                </div>
                <span className="font-medium">{rental.startDate} — {rental.endDate}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span>Duration</span>
                </div>
                <span className="font-medium">{rental.duration} days</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-medium">₹{rental.totalAmount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Security Deposit</span>
                <span className="font-medium">₹{rental.securityDeposit}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className="badge badge-success">Active</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              {rental.status === 'active' && (
                <>
                  <button
                    className="w-full bg-purple-50 hover:bg-purple-100 text-purple-600 px-4 py-2 rounded-lg transition-colors"
                    onClick={handleExtendRequest}
                  >
                    Request Extension
                  </button>
                  <button
                    className="w-full bg-yellow-50 hover:bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg transition-colors"
                    onClick={handleReportIssue}
                  >
                    Report Issue
                  </button>
                </>
              )}
              {rental.status === 'upcoming' && (
                <button
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-colors"
                  onClick={handleCancelBooking}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-6">
          <button
            className="flex items-center justify-between w-full text-left"
            onClick={() => setExpanded(!expanded)}
          >
            <h2 className="text-lg font-medium text-gray-900">Additional Details</h2>
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expanded && (
            <div className="mt-4 space-y-4 animate-fade-in">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Pickup Information</h3>
                <p className="text-gray-600">{rental.pickupLocation}</p>
                <p className="text-gray-600 mt-1">{rental.pickupInstructions}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Owner Information</h3>
                <p className="text-gray-600">Name: {rental.owner}</p>
                <p className="text-gray-600">Contact: +91 98765 43210</p>
              </div>
              
              <div className="flex gap-3">
                <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <MessageSquare size={16} className="mr-2" />
                  Contact Owner
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <AlertTriangle size={16} className="mr-2" />
                  Support
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalDetails; 