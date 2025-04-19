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
  isDragging: boolean;
}

const KanbanColumn = ({ id, title, color, rentals, isDragging }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="space-y-4">
      <div className={`flex items-center justify-between px-4 py-2 rounded-lg ${color}`}>
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm bg-white/20 px-2 py-0.5 rounded">
          {rentals.length}
        </span>
      </div>
      
      <div
        ref={setNodeRef}
        className={`space-y-4 min-h-[200px] p-4 rounded-lg border-2 border-dashed ${
          isDragging ? 'border-gray-300' : 'border-transparent'
        }`}
      >
        <SortableContext
          items={rentals.map(rental => rental.id)}
          strategy={verticalListSortingStrategy}
        >
          {rentals.map((rental, index) => (
            <RentalCard
              key={rental.id}
              rental={rental}
              index={index}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn; 