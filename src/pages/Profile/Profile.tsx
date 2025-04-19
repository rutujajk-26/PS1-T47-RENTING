import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Edit2, Check, CreditCard, Shield, Star, Settings, History, LogOut } from 'lucide-react';
import ReviewsSection from './ReviewsSection';
import PaymentMethods from './PaymentMethods';
import TrustScoreDetails from './TrustScoreDetails';

const ProfileTabs = {
  OVERVIEW: 'overview',
  REVIEWS: 'reviews',
  PAYMENT: 'payment',
  TRUST_SCORE: 'trustScore',
  SETTINGS: 'settings'
} as const;

type ProfileTab = typeof ProfileTabs[keyof typeof ProfileTabs];

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTabs.OVERVIEW);
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const user = {
    name: 'Rahul Mehta',
    email: 'rahul.mehta@gmail.com',
    phone: '+91 98765 43210',
    address: 'Koramangala, Bangalore',
    joinedDate: 'March 2023',
    verified: true,
    trustScore: 8.5,
    rentals: 12,
    avatar: 'https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=500',
    bio: 'Software engineer and photography enthusiast. Love to borrow camera gear for weekend shoots.'
  };
  
  return (
    <div className="max-w-7xl mx-auto animate-slide-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account information and settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-24 relative">
              <div className="absolute -bottom-12 left-6">
                {user.avatar ? (
                  <div className="relative">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-white"
                    />
                    {user.verified && (
                      <div className="absolute bottom-0 right-0 bg-purple-500 text-white rounded-full p-1">
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center">
                    <User size={40} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-14 px-6 pb-4">
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500 text-sm">Member since {user.joinedDate}</p>
              
              <div className="mt-4 flex items-center">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${user.trustScore * 10}%` }}></div>
                    </div>
                    <span className="ml-2 font-medium text-gray-700">{user.trustScore}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Trust Score</p>
                </div>
                <div className="border-l border-gray-200 pl-4 ml-4">
                  <p className="font-medium text-gray-800">{user.rentals}</p>
                  <p className="text-sm text-gray-500">Rentals</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200">
              <nav className="flex flex-col">
                <button
                  className={`flex items-center px-6 py-3 text-sm text-left ${
                    activeTab === ProfileTabs.OVERVIEW 
                      ? 'bg-purple-50 text-purple-600 font-medium border-l-4 border-purple-500' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(ProfileTabs.OVERVIEW)}
                >
                  <User size={18} className="mr-3" />
                  Overview
                </button>
                <button
                  className={`flex items-center px-6 py-3 text-sm text-left ${
                    activeTab === ProfileTabs.REVIEWS 
                      ? 'bg-purple-50 text-purple-600 font-medium border-l-4 border-purple-500' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(ProfileTabs.REVIEWS)}
                >
                  <Star size={18} className="mr-3" />
                  Reviews
                </button>
                <button
                  className={`flex items-center px-6 py-3 text-sm text-left ${
                    activeTab === ProfileTabs.PAYMENT 
                      ? 'bg-purple-50 text-purple-600 font-medium border-l-4 border-purple-500' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(ProfileTabs.PAYMENT)}
                >
                  <CreditCard size={18} className="mr-3" />
                  Payment Methods
                </button>
                <button
                  className={`flex items-center px-6 py-3 text-sm text-left ${
                    activeTab === ProfileTabs.TRUST_SCORE 
                      ? 'bg-purple-50 text-purple-600 font-medium border-l-4 border-purple-500' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(ProfileTabs.TRUST_SCORE)}
                >
                  <Shield size={18} className="mr-3" />
                  Trust Score
                </button>
                <button
                  className={`flex items-center px-6 py-3 text-sm text-left ${
                    activeTab === ProfileTabs.SETTINGS 
                      ? 'bg-purple-50 text-purple-600 font-medium border-l-4 border-purple-500' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(ProfileTabs.SETTINGS)}
                >
                  <Settings size={18} className="mr-3" />
                  Settings
                </button>
                <Link to="/logout" className="flex items-center px-6 py-3 text-sm text-left text-gray-600 hover:bg-gray-50">
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </Link>
              </nav>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {activeTab === ProfileTabs.OVERVIEW && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                <button 
                  className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <Check size={18} className="mr-1" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit2 size={18} className="mr-1" />
                      Edit
                    </>
                  )}
                </button>
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input"
                      defaultValue={user.name}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input"
                      defaultValue={user.email}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="input"
                      defaultValue={user.phone}
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows={3}
                      className="input"
                      defaultValue={user.address}
                    />
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      className="input"
                      defaultValue={user.bio}
                      placeholder="Tell other users about yourself..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                    <p className="text-gray-800">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
                    <p className="text-gray-800">{user.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                    <p className="text-gray-800">{user.address}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
                    <p className="text-gray-800">{user.bio}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === ProfileTabs.REVIEWS && (
            <ReviewsSection />
          )}
          
          {activeTab === ProfileTabs.PAYMENT && (
            <PaymentMethods />
          )}
          
          {activeTab === ProfileTabs.TRUST_SCORE && (
            <TrustScoreDetails score={user.trustScore} />
          )}
          
          {activeTab === ProfileTabs.SETTINGS && (
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Account Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <button className="btn btn-outline">Update Password</button>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Notification Preferences</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2" defaultChecked />
                        <span>Email notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2" defaultChecked />
                        <span>SMS notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 mr-2" defaultChecked />
                        <span>Push notifications</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;