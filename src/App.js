import React, { useState } from 'react';
import Header from './components/Header';
import VideoBackground from './components/VideoBackground';
import Explore from './components/Explore';
import TrendingHotels from './components/TrendingHotels';
import Modal from './components/Modal';
import HolidayPage from './components/HolidayPage';
import HotelPage from './components/HotelPage';
import './styles.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <VideoBackground />
            <Explore />
            <TrendingHotels />
            <Modal />
          </>
        );
      case 'holiday':
        return <HolidayPage />;
      case 'hotel':
        return <HotelPage />;
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
      <Header onNavClick={handleNavClick} />
      {renderContent()}
    </div>
  );
};

export default App;
