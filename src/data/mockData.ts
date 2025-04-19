import { Item, Rental } from '../types';

// Mock items data
export const mockItems: Item[] = [
  {
    id: 'item1',
    name: 'Bosch Power Drill Set',
    description: 'Professional-grade power drill set with multiple drill bits and accessories. Perfect for DIY projects and home renovations.',
    price: 250,
    value: 5000,
    category: 'Tools',
    condition: 'Like New',
    location: 'Koramangala, Bangalore',
    images: [
      'https://images.pexels.com/photos/957024/drill-milling-milling-machine-drilling-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: 'Vikram Mehta',
    rating: 4.8
  },
  {
    id: 'item2',
    name: 'Canon EOS DSLR Camera',
    description: 'Professional DSLR camera with 24MP sensor, great for photography enthusiasts. Includes standard lens and camera bag.',
    price: 500,
    value: 45000,
    category: 'Electronics',
    condition: 'Good',
    location: 'Indiranagar, Bangalore',
    images: [
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: 'Ananya Singh',
    rating: 4.9
  },
  {
    id: 'item3',
    name: '4-Person Camping Tent',
    description: 'Waterproof 4-person camping tent, easy to set up and pack away. Perfect for weekend getaways and adventures.',
    price: 300,
    value: 8000,
    category: 'Outdoor',
    condition: 'Good',
    location: 'Whitefield, Bangalore',
    images: [
      'https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6271625/pexels-photo-6271625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: 'Priya Patel',
    rating: 4.7
  },
  {
    id: 'item4',
    name: 'DJI Drone with 4K Camera',
    description: 'High-quality drone with 4K camera for aerial photography and videography. Includes controller and extra batteries.',
    price: 800,
    value: 80000,
    category: 'Electronics',
    condition: 'Like New',
    location: 'HSR Layout, Bangalore',
    images: [
      'https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1071188/pexels-photo-1071188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: 'Arjun Nair',
    rating: 4.9
  },
  {
    id: 'item5',
    name: 'Designer Party Dress',
    description: 'Elegant designer party dress, size M, worn only once. Perfect for weddings and formal events.',
    price: 400,
    value: 15000,
    category: 'Party',
    condition: 'Like New',
    location: 'Jayanagar, Bangalore',
    images: [
      'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: 'Neha Sharma',
    rating: 4.6
  },
  {
    id: 'item6',
    name: 'Mountain Bike - Trek',
    description: 'Trek mountain bike in excellent condition. Perfect for trail rides and adventures in the outdoors.',
    price: 350,
    value: 35000,
    category: 'Sports',
    condition: 'Good',
    location: 'Malleshwaram, Bangalore',
    images: [
      'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: 'Rohit Kumar',
    rating: 4.7
  },
  {
    id: 'item7',
    name: 'Professional Mixer Grinder',
    description: 'High-power mixer grinder for all your kitchen needs. Multiple attachments included.',
    price: 150,
    value: 5000,
    category: 'Kitchen',
    condition: 'Good',
    location: 'JP Nagar, Bangalore',
    images: [
      'https://images.pexels.com/photos/3746517/pexels-photo-3746517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4871113/pexels-photo-4871113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: 'Meera Iyer',
    rating: 4.5
  },
  {
    id: 'item8',
    name: 'PlayStation 5 Console',
    description: 'Latest PS5 console with two controllers and three games. Perfect for gaming weekends.',
    price: 600,
    value: 50000,
    category: 'Electronics',
    condition: 'Like New',
    location: 'Electronic City, Bangalore',
    images: [
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4219883/pexels-photo-4219883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    owner: 'Karan Malhotra',
    rating: 4.9
  }
];

// Mock rentals data
export const mockRentals: Rental[] = [
  {
    id: 'rental1',
    item: mockItems[1], // Canon Camera
    startDate: '15 Jun 2025',
    endDate: '18 Jun 2025',
    duration: 3,
    status: 'active',
    totalAmount: 1500,
    securityDeposit: 10000,
    bookingDate: '10 Jun 2025',
    owner: 'Ananya Singh',
    pickupLocation: 'Indiranagar, Bangalore',
    pickupInstructions: 'Call 30 minutes before pickup. Bring ID proof.'
  },
  {
    id: 'rental2',
    item: mockItems[7], // PlayStation 5
    startDate: '20 Jun 2025',
    endDate: '22 Jun 2025',
    duration: 2,
    status: 'upcoming',
    totalAmount: 1200,
    securityDeposit: 15000,
    bookingDate: '12 Jun 2025',
    owner: 'Karan Malhotra',
    pickupLocation: 'Electronic City, Bangalore',
    pickupInstructions: 'Building A, Apartment 304. Ring the doorbell.'
  },
  {
    id: 'rental3',
    item: mockItems[0], // Bosch Power Drill
    startDate: '1 Jun 2025',
    endDate: '3 Jun 2025',
    duration: 2,
    status: 'past',
    totalAmount: 500,
    securityDeposit: 2500,
    bookingDate: '28 May 2025',
    owner: 'Vikram Mehta',
    pickupLocation: 'Koramangala, Bangalore',
    pickupInstructions: 'Meet at Coffee Day next to the building.'
  },
  {
    id: 'rental4',
    item: mockItems[2], // Camping Tent
    startDate: '18 Jun 2025',
    endDate: '22 Jun 2025',
    duration: 4,
    status: 'upcoming',
    totalAmount: 1200,
    securityDeposit: 4000,
    bookingDate: '10 Jun 2025',
    owner: 'Priya Patel',
    pickupLocation: 'Whitefield, Bangalore',
    pickupInstructions: 'Available for pickup between 10 AM and 7 PM.'
  }
];