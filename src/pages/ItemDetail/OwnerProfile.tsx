import { UserCircle, MessageSquare, Star } from 'lucide-react';

const OwnerProfile = () => {
  // This would typically come from the item data or a separate API call
  const owner = {
    id: 'owner123',
    name: 'Ananya Singh',
    joinedDate: 'March 2022',
    responseRate: '95%',
    responseTime: 'within 2 hours',
    rating: 4.8,
    reviews: 24,
    verified: true,
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150'
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Item Owner</h2>
      
      <div className="flex items-center mb-4">
        {owner.avatar ? (
          <img 
            src={owner.avatar} 
            alt={owner.name} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        ) : (
          <UserCircle size={48} className="text-gray-300 mr-4" />
        )}
        
        <div>
          <h3 className="font-medium">{owner.name}</h3>
          <p className="text-sm text-gray-600">Member since {owner.joinedDate}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm">
          <Star size={16} className="text-yellow-500 mr-2" fill="#F59E0B" />
          <span className="font-medium">{owner.rating}</span>
          <span className="mx-1 text-gray-500">•</span>
          <span className="text-gray-600">{owner.reviews} reviews</span>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Responds {owner.responseRate} of the time</p>
          <p>Typical response time: {owner.responseTime}</p>
        </div>
      </div>
      
      <button className="btn btn-outline w-full flex items-center justify-center">
        <MessageSquare size={18} className="mr-2" />
        Contact {owner.name}
      </button>
    </div>
  );
};

export default OwnerProfile;