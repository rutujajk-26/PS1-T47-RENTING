import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Rental } from '../../types';
import RentalCard from './RentalCard';
import { Plus } from 'lucide-react';
import SortableRentalCard from './SortableRentalCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  rentals: Rental[];
}

const KanbanColumn = ({ id, title, color, rentals }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color.split(' ')[0]}`} />
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
          <span className="text-sm text-gray-500">({rentals.length})</span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Plus size={16} className="text-gray-500" />
        </button>
      </div>
      
      <div
        ref={setNodeRef}
        className={`flex-1 p-4 rounded-lg transition-colors duration-200 ${color.split(' ')[0]}`}
      >
        <SortableContext
          items={rentals.map(rental => rental.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4 min-h-[200px]">
            {rentals.map((rental) => (
              <SortableRentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn; 