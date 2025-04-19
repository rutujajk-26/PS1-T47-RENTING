import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Rental } from '../../types';
import RentalCard from './RentalCard';

interface SortableRentalCardProps {
  rental: Rental;
}

const SortableRentalCard = ({ rental }: SortableRentalCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rental.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`transform transition-all duration-200 ${
        isDragging ? 'scale-105 shadow-lg rotate-1' : 'hover:scale-[1.02]'
      }`}
      {...attributes}
      {...listeners}
    >
      <RentalCard rental={rental} />
    </div>
  );
};

export default SortableRentalCard; 