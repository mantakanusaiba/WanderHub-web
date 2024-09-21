import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Explore.css';

const Explore = ({ navigateTo }) => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('https://wander-hub-webback.vercel.app/api/tours/get-all-tours');
        setTours(response.data.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setError('Error fetching tours. Please try again later.');
      }
    };

    fetchTours();
  }, []);

  if (error) {
    return <div>Error fetching tours: {error}</div>;
  }

  return (
    <section id="explore">
      <div id="explore-heading">
        <h2>Explore Bangladesh</h2>
        <p>Plan your next adventure to stunning destinations.</p>
      </div>
      <div className="row">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="pic-container"
            style={{ backgroundImage: `url(${tour.imageUrl})` }}
          >
            <h3>&nbsp;{tour.title}</h3>
            <button className="book-now-btn" onClick={() => navigateTo('tourForm', null, '', tour)}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Explore;
