import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrendingHotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trends');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <section id="trend">
      <div id="trend_heading">
        <h2>Trending Hotels</h2>
        <p>Luxurious or budget-friendly hotels, villas, or resorts.</p>
      </div>

      {hotels.map((hotel) => (
        <div key={hotel._id} className="hotel-container">
          <div className="hotel-image">
            <img src={hotel.image} alt={hotel.name} />
          </div>
          <div className="hotel-details">
            <h3>{hotel.name}</h3>
            <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p className="location">{hotel.location}</p>
            <div className="price-info">
              <p>Starts from <span className="old-price">BDT {hotel.oldPrice}</span>/Night</p>
              <p className="discount-price">BDT {hotel.discountPrice}/Night <span className="discount">{hotel.discount}% OFF</span></p>
              <p className="price-includes">*Price includes VAT & Tax</p>
            </div>
            <button className="book-now" data-hotel={hotel.name}>BOOK NOW</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TrendingHotels;
