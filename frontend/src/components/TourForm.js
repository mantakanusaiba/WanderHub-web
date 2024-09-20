import React, { useState, useEffect, useCallback } from 'react';
import './HolidayPage.css';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

const TourForm = ({ packageId, onBookingComplete, navigateTo }) => {
  const [numTravelers, setNumTravelers] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customPackageName, setCustomPackageName] = useState('');
  const [travelerName, setTravelerName] = useState('');
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const fetchBookings = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tourBook', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setBookings(data.data);
      generateCharts(data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    const bookingData = {
      numTravelers,
      phoneNumber,
      customPackageName,
      travelerName,
    };

    const url = editingBookingId
      ? `http://localhost:5000/api/tourBook/${editingBookingId}`
      : `http://localhost:5000/api/tourBook/${packageId}`;

    const method = editingBookingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to process booking');
      }

      alert(editingBookingId ? 'Booking updated successfully' : 'Booking is successful!');
      fetchBookings();
      resetForm();
    } catch (error) {
      console.error('Error processing booking:', error);
      alert('Failed to process booking. Please try again later.');
    }
  };

  const handleEdit = (booking) => {
    setEditingBookingId(booking._id);
    setCustomPackageName(booking.packageName);
    setNumTravelers(booking.numTravelers);
    setPhoneNumber(booking.phoneNumber);
    setTravelerName(booking.travelerName);
  };

  const handleDelete = async (bookingId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/tourBook/${bookingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      alert('Booking deleted successfully!');
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking. Please try again later.');
    }
  };

  const resetForm = () => {
    setEditingBookingId(null);
    setCustomPackageName('');
    setNumTravelers(1);
    setPhoneNumber('');
    setTravelerName('');
  };

  const generateCharts = (bookingsData) => {
    const packageCounts = bookingsData.reduce((acc, booking) => {
      acc[booking.packageName] = (acc[booking.packageName] || 0) + 1;
      return acc;
    }, {});

    const packageTravelerCounts = bookingsData.reduce((acc, booking) => {
      acc[booking.packageName] = (acc[booking.packageName] || 0) + booking.numTravelers;
      return acc;
    }, {});

    const packageNames = Object.keys(packageCounts);
    const bookingCounts = Object.values(packageCounts);
    const travelerCounts = Object.values(packageTravelerCounts);

    setShowChart(true);

    const barCtx = document.getElementById('bookingsBarChart').getContext('2d');
    if (window.myBarChart) {
      window.myBarChart.destroy();
    }

    window.myBarChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: packageNames,
        datasets: [
          {
            label: 'Number of Bookings',
            data: bookingCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const pieCtx = document.getElementById('bookingsPieChart').getContext('2d');
    if (window.myPieChart) {
      window.myPieChart.destroy();
    }

    window.myPieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: packageNames,
        datasets: [
          {
            label: 'Number of Travelers',
            data: travelerCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          datalabels: {
            color: '#fff',
            display: true,
            formatter: (value, context) => {
              const total = context.chart._metasets[0].total;
              const percentage = ((value / total) * 100).toFixed(2);
              return `${percentage}%`;
            },
          },
        },
      },
    });
  };

  const goBack = () => {
    navigateTo('holiday');
  };

  return (
    <div className="tour-form-container">
      <div className="tour-form">
        <h2>{editingBookingId ? 'Edit Booking' : 'Book a Tour'}</h2>
        <form onSubmit={handleSaveEdit}>
          <label htmlFor="customPackageName">Package Name:</label>
          <input
            type="text"
            id="customPackageName"
            name="customPackageName"
            value={customPackageName}
            onChange={(e) => setCustomPackageName(e.target.value)}
          /><br /><br />

          <label htmlFor="travelerName">Traveler Name:</label>
          <input
            type="text"
            id="travelerName"
            name="travelerName"
            value={travelerName}
            onChange={(e) => setTravelerName(e.target.value)}
          /><br /><br />

          <label htmlFor="numTravelers">Number of Travelers:</label>
          <input
            type="number"
            id="numTravelers"
            name="numTravelers"
            value={numTravelers}
            min="1"
            onChange={(e) => setNumTravelers(parseInt(e.target.value))}
          /><br /><br />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          /><br /><br />

          <button type="submit">{editingBookingId ? 'Save Changes' : 'Checkout'}</button>
        </form>

        <button onClick={fetchBookings}>Display All Bookings</button>
        <button onClick={goBack}>Back</button>
      </div>

      <div className="bookings-and-chart">
        {bookings.length > 0 && (
          <div className="bookings-list">
            <h3>All Bookings</h3>
            <ul>
              {bookings.map((booking) => (
                <li key={booking._id}>
                <div className="booking-details">
                  {booking.packageName} - {booking.numTravelers} - {booking.phoneNumber} - {booking.travelerName}
                </div>
                <div className="button-container">
                  <button onClick={() => handleEdit(booking)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(booking._id)} className="delete-button">Delete</button>
                </div>
              </li>
              
              ))}
            </ul>
          </div>
        )}

        {showChart && (
          <div className="chart-container">
            <h3>Booking Charts</h3>
            <canvas id="bookingsBarChart" width="400" height="200"></canvas>
            <canvas id="bookingsPieChart" width="400" height="200"></canvas>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourForm;
