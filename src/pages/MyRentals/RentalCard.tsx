import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Calendar, Clock, MapPin, MessageSquare, AlertTriangle, GripVertical } from 'lucide-react';
import { Rental } from '../../types';
import toast from 'react-hot-toast';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface RentalCardProps {
  rental: Rental;
  index: number;
}

const RentalCard = ({ rental, index }: RentalCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: rental.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0
  };
  
  const getStatusBadge = () => {
    switch (rental.status) {
      case 'active':
        return <span className="badge badge-success">Active</span>;
      case 'upcoming':
        return <span className="badge badge-neutral">Upcoming</span>;
      case 'past':
        return <span className="badge badge-neutral">Completed</span>;
      default:
        return null;
    }
  };
  
  const handleExtendRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Extension request sent to the owner.");
  };
  
  const handleReportIssue = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Issue reported successfully. Our team will contact you soon.");
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Check if the click was on a button, link, or the drag handle
    const target = e.target as HTMLElement;
    const isInteractiveElement = 
      target.closest('button') || 
      target.closest('a') || 
      target.closest('[data-drag-handle]');
    
    if (!isInteractiveElement && !isDragging) {
      navigate(`/rentals/${rental.id}`);
    }
  };

  const handleShowDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  
  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded-lg overflow-hidden bg-white transition-all duration-200 hover:shadow-md cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-32 h-32 sm:h-auto flex-shrink-0 relative group">
          <div 
            className="absolute top-2 left-2 p-1.5 rounded bg-white/90 backdrop-blur-sm cursor-grab active:cursor-grabbing shadow-sm hover:shadow transition-all duration-200 opacity-0 group-hover:opacity-100"
            {...attributes}
            {...listeners}
            data-drag-handle
          >
            <GripVertical size={16} className="text-gray-500" />
          </div>
          <img
            src={rental.item.images[0]} 
            alt={rental.item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              {/* <Link 
                to={`/item/${rental.item.id}`} 
                className="font-medium text-gray-800 hover:text-teal-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
              </Link> */}
              <p className="font-medium text-gray-800 hover:text-teal-600 transition-colors"
              >

                {rental.item.name}
              </p>
              <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1 gap-x-3 gap-y-1">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{rental.startDate} — {rental.endDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{rental.duration} days</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  <span>{rental.item.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              {getStatusBadge()}
              <p className="font-medium text-gray-700 mt-1">₹{rental.totalAmount}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <Link 
              to={`/item/${rental.item.id}`} 
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View Item
            </Link>
            {rental.status === 'active' && (
              <>
                <button 
                  className="text-sm bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded text-teal-600 transition-colors" 
                  onClick={handleExtendRequest}
                >
                  Request Extension
                </button>
                <button 
                  className="text-sm bg-yellow-50 hover:bg-yellow-100 px-3 py-1 rounded text-yellow-600 transition-colors" 
                  onClick={handleReportIssue}
                >
                  Report Issue
                </button>
              </>
            )}
            {rental.status === 'upcoming' && (
              <button 
                className="text-sm bg-red-50 hover:bg-red-100 px-3 py-1 rounded text-red-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Cancel Booking
              </button>
            )}
            <button
              className="text-sm text-gray-500 hover:text-gray-700 ml-auto flex items-center"
              onClick={handleShowDetails}
            >
              {expanded ? (
                <>
                  <span>Hide details</span>
                  <ChevronUp size={16} className="ml-1" />
                </>
              ) : (
                <>
                  <span>Show details</span>
                  <ChevronDown size={16} className="ml-1" />
                </>
              )}
            </button>
          </div>
          
          {expanded && (
            <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Booking Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-500">Booking ID:</span> {rental.id}</p>
                    <p><span className="text-gray-500">Booked on:</span> {rental.bookingDate}</p>
                    <p>
                      <span className="text-gray-500">Owner:</span>{' '}
                      <Link 
                        to="/profile" 
                        className="text-teal-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {rental.owner}
                      </Link>
                    </p>
                    <p><span className="text-gray-500">Security deposit:</span> ₹{rental.securityDeposit}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Pickup/Return Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-500">Location:</span> {rental.pickupLocation}</p>
                    <p><span className="text-gray-500">Instructions:</span> {rental.pickupInstructions}</p>
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <button 
                      className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-700 transition-colors flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageSquare size={14} className="mr-1" />
                      Contact Owner
                    </button>
                    <button 
                      className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-700 transition-colors flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AlertTriangle size={14} className="mr-1" />
                      Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalCard;