import React, { useState } from 'react';
import axios from 'axios';
import './HotelPage.css';

const HotelPage = ({ navigateTo }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('https://wander-hub-webback.vercel.app/api/hotels/hotels', {
        params: {
          search: searchInput,
          page: 1,
          limit: 10,
        },
      });
      setFilteredHotels(response.data.hotels);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error fetching hotels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hotel-page">
      <header>
        {/* Add your header content here */}
      </header>
      <main>
        <section className="welcome-section">
          <h2>Search hotels.</h2>
          <p>Explore luxurious hotels and accommodations.</p>
        </section>
        <section className="search-section">
          <form id="searchForm" onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="to">Hotel Name</label>
              <input
                type="text"
                id="to"
                placeholder="Hotel Name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit">Search</button>
            </div>
          </form>
          <div id="searchResults" className="search-results">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : filteredHotels.length > 0 ? (
              filteredHotels.map((hotel, index) => (
                <div key={index} className="hotel-container">
                  <div className="hotel-image">
                    <img src={hotel.image} alt={hotel.name} />
                  </div>
                  <div className="hotel-details">
                    <h3>{hotel.name}</h3>
                    <div className="stars" dangerouslySetInnerHTML={{ __html: `&#9733;`.repeat(hotel.stars) }} />
                    <p className="location">{hotel.location}</p>
                    <div className="price-info">
                      <p className="discount-price">
                        BDT {hotel.discountPrice}/Night <span className="discount">{hotel.discount}% OFF</span>
                      </p>
                      <p className="price-includes">*Price includes VAT & Tax</p>
                    </div>
                    <button className="book-now" onClick={() => navigateTo('details', hotel)}>BOOK NOW</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hotels found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HotelPage;
