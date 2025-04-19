import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockItems } from '../../data/mockData';
import { Item } from '../../types';
import ItemCard from '../ItemSearch/ItemCard';

interface SimilarItemsProps {
  categoryId: string;
  currentItemId: string;
}

const SimilarItems = ({ categoryId, currentItemId }: SimilarItemsProps) => {
  const [items, setItems] = useState<Item[]>([]);
  
  useEffect(() => {
    // Filter similar items from the same category, excluding the current item
    const similarItems = mockItems
      .filter(item => item.category === categoryId && item.id !== currentItemId)
      .slice(0, 6);
    
    setItems(similarItems);
  }, [categoryId, currentItemId]);
  
  // Scroll functionality
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };
  
  if (items.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Similar Items</h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar"
      >
        {items.map(item => (
          <div key={item.id} className="flex-shrink-0 w-72">
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarItems;