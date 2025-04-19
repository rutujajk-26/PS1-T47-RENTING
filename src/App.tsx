import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import ItemSearch from './pages/ItemSearch/ItemSearch';
import ItemDetail from './pages/ItemDetail/ItemDetail';
import BookingProcess from './pages/BookingProcess/BookingProcess';
import MyRentals from './pages/MyRentals/MyRentals';
import Profile from './pages/Profile/Profile';
import Help from './pages/Help/Help';
import RentalDetails from './pages/MyRentals/RentalDetails';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="search" element={<ItemSearch />} />
          <Route path="item/:id" element={<ItemDetail />} />
          <Route path="booking/:id" element={<BookingProcess />} />
          <Route path="rentals" element={<MyRentals />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
          <Route path="rentals/:id" element={<RentalDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;