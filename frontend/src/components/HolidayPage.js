import React, { useState, useEffect } from 'react';
import './HolidayPage.css';

const HolidayPage = ({ navigateTo }) => {
  const initialFilters = {
    range: 20000,
    duration: 0,
    packageName: '',
    destination: '',
  };

  const [filters, setFilters] = useState(initialFilters);
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/holiday-packages/get-all-holiday-packages', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPackages(data.data);
        setFilteredPackages(data.data);
      } catch (error) {
        console.error('Error fetching holiday packages:', error);
      }
    };

    fetchPackages();
  }, []);

  const resetFilters = () => {
    setFilters(initialFilters);
    setFilteredPackages(packages);
  };

  const updateFilters = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
  };

  const applyFilters = async () => {
    try {
      const queryParams = new URLSearchParams({
        range: filters.range,
        duration: filters.duration,
        packageName: filters.packageName,
        destination: filters.destination,
      });

      const response = await fetch(`http://localhost:5000/api/holiday-packages/get-holiday-packages?${queryParams.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFilteredPackages(data.data);
    } catch (error) {
      console.error('Error fetching filtered holiday packages:', error);
    }
  };

  const bookNow = (pkg) => {
    navigateTo('tourForm', null, '', pkg);
  };

  return (
    <div className="holiday-page">
      <div className="sidebar">
        <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
        <h3>Filter</h3><br />
        <label htmlFor="range">Price Range: <span id="priceValue">{filters.range}</span></label><br />
        <input
          type="range"
          id="range"
          name="range"
          min="5000"
          max="20000"
          value={filters.range}
          onChange={(e) => updateFilters('range', parseInt(e.target.value))}
        /><br /><br />

        <label htmlFor="duration">Duration:</label>
        <select
          id="duration"
          name="duration"
          value={filters.duration}
          onChange={(e) => updateFilters('duration', parseInt(e.target.value))}
        >
          <option value="0">Any</option>
          <option value="3">3 days</option>
          <option value="5">5 days</option>
          <option value="7">7 days</option>
        </select><br /><br />

        <label htmlFor="packageName">Package Name:</label>
        <input
          type="text"
          id="packageName"
          name="packageName"
          value={filters.packageName}
          onChange={(e) => updateFilters('packageName', e.target.value)}
        /><br /><br />

        <label htmlFor="destination">Destination:</label>
        <select
          id="destination"
          name="destination"
          value={filters.destination}
          onChange={(e) => updateFilters('destination', e.target.value)}
        >
          <option value="">Any</option>
          <option value="Cox's Bazar">Cox's Bazar</option>
          <option value="Sajek">Sajek</option>
          <option value="Tanguar Haor">Tanguar Haor</option>
          <option value="Bandarban">Bandarban</option>
        </select><br /><br />

        <button className="apply-button" onClick={applyFilters}>Apply Filters</button>
      </div>

      <div>
        <h1>Exciting Holiday Packages</h1>
        <p>Discover the best travel deals and explore stunning destinations.</p>
        <div className="tour-packages">
          {filteredPackages.length > 0 ? (
            filteredPackages.map(pkg => (
              <div
                key={pkg._id}
                className="tour-package"
                style={{ backgroundImage: `url(images/${pkg.image})` }}
              >
                <h3>{pkg.name}</h3>
                <p>{pkg.description}</p>
                <p>Price: Tk{pkg.price}</p>
                <button onClick={() => bookNow(pkg)}>Book Now</button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>Sorry, no tour packages match your criteria.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HolidayPage;
