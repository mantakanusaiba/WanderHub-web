import React, { useState } from 'react';

const BookingForm = ({ hotel, room }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [bookings, setBookings] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBooking = {
      hotel: hotel.name,
      room,
      name,
      age,
      phone,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/bookings', { // Updated the URL to include the correct port
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });
  
      if (response.ok) {
        const result = await response.text();
        console.log(result); // Booking saved successfully
        setBookings([...bookings, newBooking]);
        setName('');
        setAge('');
        setPhone('');
      } else {
        console.error('Error saving booking');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  

  return (
    <div className="booking-form">
      <h2>Booking Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="booking-table">
        <h3>Bookings</h3>
        {bookings.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Hotel Name</th>
                <th>Room Type</th>
                <th>Name</th>
                <th>Age</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.hotel}</td>
                  <td>{booking.room}</td>
                  <td>{booking.name}</td>
                  <td>{booking.age}</td>
                  <td>{booking.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookingForm;