import { useState } from 'react';
import { Star, User, Search } from 'lucide-react';

interface Review {
  id: string;
  from: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  itemName: string;
}

const ReviewsSection = () => {
  const [reviews] = useState<Review[]>([
    {
      id: 'rev1',
      from: 'Ananya Singh',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Rahul was a great borrower. He took excellent care of my camera and returned it on time. Would definitely lend to him again!',
      date: '2 weeks ago',
      itemName: 'Canon EOS DSLR Camera'
    },
    {
      id: 'rev2',
      from: 'Vikram Mehta',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4,
      comment: 'Good communication and punctual with pickup and return. Took care of my drill set.',
      date: '1 month ago',
      itemName: 'Bosch Power Drill Set'
    },
    {
      id: 'rev3',
      from: 'Priya Patel',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Perfect borrower! Rahul was very respectful with my tent and camping gear. Returned everything clean and in perfect condition.',
      date: '2 months ago',
      itemName: '4-Person Camping Tent'
    }
  ]);
  
  const averageRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Reviews</h2>
            <p className="text-gray-600">See what others have to say about you</p>
          </div>
          
          <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
            <div className="flex mr-3">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star}
                  size={18} 
                  className={star <= Math.round(averageRating) ? 'text-yellow-500' : 'text-gray-200'}
                  fill={star <= Math.round(averageRating) ? '#F59E0B' : 'none'}
                />
              ))}
            </div>
            <div>
              <p className="font-medium text-gray-800">{averageRating.toFixed(1)}</p>
              <p className="text-xs text-gray-500">{reviews.length} reviews</p>
            </div>
          </div>
        </div>
      </div>
      
      {reviews.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {reviews.map(review => (
            <div key={review.id} className="p-6">
              <div className="flex">
                {review.avatar ? (
                  <img 
                    src={review.avatar} 
                    alt={review.from} 
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <User size={20} className="text-gray-500" />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center mb-1">
                    <h3 className="font-medium mr-2">{review.from}</h3>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  
                  <div className="flex items-center mb-1">
                    <p className="text-sm text-gray-600 mr-2">
                      For <span className="font-medium">{review.itemName}</span>
                    </p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star}
                          size={16} 
                          className={star <= review.rating ? 'text-yellow-500' : 'text-gray-200'}
                          fill={star <= review.rating ? '#F59E0B' : 'none'}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search size={40} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No reviews yet</h3>
          <p className="text-gray-500">
            Complete more rentals to receive reviews from item owners.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;