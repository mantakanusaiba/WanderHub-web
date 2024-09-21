const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Route to create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booking saved successfully', booking });
  } catch (err) {
    res.status(400).json({ message: 'Error saving booking', error: err.message });
  }
});

// Route to get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Route to update a booking
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (err) {
    res.status(400).json({ message: 'Error updating booking', error: err.message });
  }
});

// Route to delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting booking', error: err.message });
  }
});

module.exports = router;