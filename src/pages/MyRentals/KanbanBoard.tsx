import { useState } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Rental } from '../../types';
import RentalCard from './RentalCard';
import { Search, Plus } from 'lucide-react';
import { createPortal } from 'react-dom';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  rentals: Rental[];
  onRentalUpdate: (rentalId: string, newStatus: 'active' | 'upcoming' | 'past') => void;
}

const KanbanBoard = ({ rentals, onRentalUpdate }: KanbanBoardProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const columns = {
    active: {
      id: 'active',
      title: 'Active Rentals',
      color: 'bg-green-50 text-green-700',
      rentals: rentals.filter(r => r.status === 'active' && 
        r.item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    },
    upcoming: {
      id: 'upcoming',
      title: 'Upcoming Rentals',
      color: 'bg-blue-50 text-blue-700',
      rentals: rentals.filter(r => r.status === 'upcoming' && 
        r.item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    },
    past: {
      id: 'past',
      title: 'Past Rentals',
      color: 'bg-gray-50 text-gray-700',
      rentals: rentals.filter(r => r.status === 'past' && 
        r.item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
  };

  const handleDragStart = (event: any) => {
    setIsDragging(true);
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!over) {
      setIsDragging(false);
      setActiveId(null);
      return;
    }

    const activeColumn = Object.entries(columns).find(([_, column]) => 
      column.rentals.some(rental => rental.id === active.id)
    )?.[0];

    const overColumn = over.id;

    if (activeColumn && overColumn && activeColumn !== overColumn) {
      onRentalUpdate(active.id, overColumn as 'active' | 'upcoming' | 'past');
    }

    setIsDragging(false);
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setIsDragging(false);
    setActiveId(null);
  };

  const activeRental = activeId 
    ? rentals.find(rental => rental.id === activeId)
    : null;

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search rentals..."
          className="input pl-10 py-1.5 text-sm w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, column]) => (
            <KanbanColumn
              key={columnId}
              id={columnId}
              title={column.title}
              color={column.color}
              rentals={column.rentals}
              isDragging={isDragging}
            />
          ))}
        </div>

        {createPortal(
          <DragOverlay>
            {activeRental ? (
              <div className="transform scale-105 shadow-lg rotate-1">
                <RentalCard rental={activeRental} />
              </div>
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard; 