import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Star, Clock, Shield, Calendar, MessageSquare, Heart, Share2 } from 'lucide-react';
import { mockItems } from '../../data/mockData';
import { Item } from '../../types';
import ImageGallery from './ImageGallery';
import AvailabilityCalendar from './AvailabilityCalendar';
import SimilarItems from './SimilarItems';
import OwnerProfile from './OwnerProfile';
import ReviewsSection from './ReviewsSection';

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  
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
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto animate-fade-in flex items-center justify-center h-64">
        <div className="animate-pulse space-y-8 w-full max-w-3xl">
          <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!item) {
    return (
      <div className="max-w-7xl mx-auto animate-fade-in py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Item Not Found</h2>
        <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
        <Link to="/search" className="btn btn-primary">
          Browse Items
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto animate-slide-in">
      <Link to="/search" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ChevronLeft size={20} className="mr-1" />
        Back to search results
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ImageGallery images={item.images} />
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">{item.name}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-x-4 gap-y-2">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {item.location}
              </div>
              {item.rating && (
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-500 mr-1" fill="#F59E0B" />
                  <span>{item.rating} rating</span>
                </div>
              )}
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>Listed 2 weeks ago</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="badge badge-neutral">{item.category}</span>
              <span className={`badge ${
                item.condition === 'Like New' ? 'badge-success' :
                item.condition === 'Good' ? 'badge-neutral' :
                'badge-warning'
              }`}>{item.condition}</span>
              <span className="badge bg-purple-100 text-purple-800">
                <Shield size={12} className="mr-1" /> Verified
              </span>
            </div>
            
            <h2 className="text-lg font-medium mb-3">About this item</h2>
            <p className="text-gray-600 mb-6">{item.description}</p>
            
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-lg font-medium mb-3">Item details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Brand</p>
                  <p className="font-medium">Samsung</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Model</p>
                  <p className="font-medium">Galaxy S21</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Age</p>
                  <p className="font-medium">1 year</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Rental includes</p>
                  <p className="font-medium">Charger, Case</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-6 mt-6">
              <h2 className="text-lg font-medium mb-3">Rental policy</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Clock size={18} className="text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Minimum rental period</p>
                    <p className="text-sm text-gray-600">2 days</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield size={18} className="text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Security deposit</p>
                    <p className="text-sm text-gray-600">₹2000 (refundable)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Pickup and return</p>
                    <p className="text-sm text-gray-600">In person at owner's location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <ReviewsSection itemId={item.id} />
          
          <SimilarItems categoryId={item.category} currentItemId={item.id} />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-purple-500">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">₹{item.price}<span className="text-sm font-normal text-gray-500">/day</span></h2>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500" aria-label="Add to favorites">
                  <Heart size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500" aria-label="Share">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-2">Select rental dates</h3>
              <AvailabilityCalendar />
            </div>
            
            <button className="btn btn-primary w-full mb-4">
              Book Now
            </button>
            
            <button className="btn btn-outline w-full flex items-center justify-center">
              <MessageSquare size={18} className="mr-2" />
              Contact Owner
            </button>
          </div>
          
          <OwnerProfile />
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center text-gray-700 mb-3">
              <Shield size={20} className="text-purple-600 mr-2" />
              <h3 className="font-medium">Safe & Secure Rentals</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2"></span>
                Verified users and items
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2"></span>
                Secure payment system
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2"></span>
                100% refundable security deposits
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;