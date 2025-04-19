import { useState } from 'react';
import { mockRentals } from '../../data/mockData';
import { Rental } from '../../types';
import KanbanBoard from './KanbanBoard';

const MyRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>(mockRentals);

  const handleRentalUpdate = (rentalId: string, newStatus: 'active' | 'upcoming' | 'past') => {
    setRentals(rentals.map(rental => 
      rental.id === rentalId ? { ...rental, status: newStatus } : rental
    ));
  };

  return (
    <div className="max-w-7xl mx-auto animate-slide-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Rentals</h1>
        <p className="text-gray-600">Manage your rental items and bookings</p>
      </div>
      
      <KanbanBoard 
        rentals={rentals} 
        onRentalUpdate={handleRentalUpdate} 
      />
    </div>
  );
};

export default MyRentals;