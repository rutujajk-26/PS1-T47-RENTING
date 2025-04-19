import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface ReviewsSectionProps {
  itemId: string;
}

const ReviewsSection = ({ itemId }: ReviewsSectionProps) => {
  // In a real app, these would be fetched from an API
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'review1',
      userId: 'user1',
      userName: 'Vikram Mehta',
      userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Excellent condition, worked perfectly for my weekend project. The owner was very helpful and provided clear instructions on how to use it.',
      date: '2 weeks ago',
      helpful: 3
    },
    {
      id: 'review2',
      userId: 'user2',
      userName: 'Priya Patel',
      userAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4,
      comment: 'Good quality item, pretty much as described. Pickup and return was smooth. Would rent again if needed.',
      date: '1 month ago',
      helpful: 1
    }
  ]);
  
  const [expandedReviews, setExpandedReviews] = useState<{ [key: string]: boolean }>({});
  
  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };
  
  const markHelpful = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 } 
        : review
    ));
  };
  
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Reviews</h2>
        
        <div className="flex items-center">
          <div className="flex mr-2">
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star}
                size={18} 
                className={star <= Math.round(averageRating) ? 'text-yellow-500' : 'text-gray-200'}
                fill={star <= Math.round(averageRating) ? '#F59E0B' : 'none'}
              />
            ))}
          </div>
          <span className="font-medium">{averageRating.toFixed(1)}</span>
          <span className="mx-1 text-gray-500">•</span>
          <span className="text-gray-600">{reviews.length} reviews</span>
        </div>
      </div>
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start">
                {review.userAvatar ? (
                  <img 
                    src={review.userAvatar} 
                    alt={review.userName} 
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-500 font-medium">{review.userName.charAt(0)}</span>
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center mb-1">
                    <h3 className="font-medium mr-2">{review.userName}</h3>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star}
                        size={16} 
                        className={star <= review.rating ? 'text-yellow-500' : 'text-gray-200'}
                        fill={star <= review.rating ? '#F59E0B' : 'none'}
                      />
                    ))}
                  </div>
                  
                  <p className={`text-gray-600 mb-3 ${
                    review.comment.length > 150 && !expandedReviews[review.id] 
                      ? 'line-clamp-3' 
                      : ''
                  }`}>
                    {review.comment}
                  </p>
                  
                  {review.comment.length > 150 && (
                    <button 
                      className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-3"
                      onClick={() => toggleReviewExpansion(review.id)}
                    >
                      {expandedReviews[review.id] ? 'Show less' : 'Read more'}
                    </button>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <button 
                      className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => markHelpful(review.id)}
                    >
                      <ThumbsUp size={14} className="mr-1" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageSquare size={36} className="mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500 mb-2">No reviews yet</p>
          <p className="text-sm text-gray-400">Be the first to review this item</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;