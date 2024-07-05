import React, { useState } from 'react';
import Header from './components/Header';
import VideoBackground from './components/VideoBackground';
import Explore from './components/Explore';
import TrendingHotels from './components/TrendingHotels';
import Modal from './components/Modal';
import HolidayPage from './components/HolidayPage';
import HotelPage from './components/HotelPage';
import HotelDetails from './components/HotelDetails';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const navigateTo = (page, hotel = null, room = '') => {
    setSelectedHotel(hotel);
    setSelectedRoom(room);
    setCurrentPage(page);
  };

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleRegister = (user) => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return isRegistering ? (
        <Register onRegister={handleRegister} setIsRegistering={setIsRegistering} />
      ) : (
        <Login onLogin={handleLogin} setIsRegistering={setIsRegistering} />
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <VideoBackground />
            <Explore />
            <TrendingHotels navigateTo={navigateTo} />
            <Modal />
          </>
        );
      case 'holiday':
        return <HolidayPage />;
      case 'hotel':
        return <HotelPage navigateTo={navigateTo} />;
      case 'details':
        return selectedHotel && (
          <HotelDetails
            hotel={selectedHotel}
            navigateTo={navigateTo}
            setSelectedRoom={setSelectedRoom}
          />
        );
      case 'booking':
        return selectedHotel && selectedRoom && (
          <BookingForm hotel={selectedHotel} room={selectedRoom} />
        );
      case 'why':
        return <div>Why WanderHub?</div>;
      case 'faq':
        return <div>FAQ</div>;
      case 'about':
        return <div>About</div>;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div>
      {isAuthenticated && <Header onNavClick={navigateTo} />}
      {renderContent()}
    </div>
  );
};

export default App;
