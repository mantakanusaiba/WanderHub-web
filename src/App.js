import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import VideoBackground from './components/VideoBackground';
import Explore from './components/Explore';
import TrendingHotels from './components/TrendingHotels';
import Modal from './components/Modal';
import './styles.css';

const App = () => {
  return (
    <div>
      <Header />
      <VideoBackground />
      <Explore />
      <TrendingHotels />
      <Modal />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
