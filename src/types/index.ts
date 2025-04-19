export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: 'Like New' | 'Good' | 'Fair';
  location: string;
  images: string[];
  owner: string;
  rating?: number;
  value: number;
}

export interface Rental {
  id: string;
  item: Item;
  startDate: string;
  endDate: string;
  duration: number;
  status: 'active' | 'upcoming' | 'past';
  totalAmount: number;
  securityDeposit: number;
  bookingDate: string;
  owner: string;
  pickupLocation: string;
  pickupInstructions: string;
}