const express = require('express');
const router = express.Router();
const TourBooking = require("../models/TourBooking");

router.post('/:packageId', async (req, res) => {
  const { packageId } = req.params;
  const { numTravelers, phoneNumber, customPackageName, travelerName } = req.body;

  try {
    const packageName = customPackageName;

    const newBooking = new TourBooking({
      packageId,
      packageName,
      numTravelers,
      phoneNumber,
      travelerName
    });

    await newBooking.save();
    res.status(201).json({ success: true, message: 'Booking created successfully', data: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await TourBooking.find();
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT route to update an existing booking
router.put('/:bookingId', async (req, res) => {
  const { bookingId } = req.params;
  const { numTravelers, phoneNumber, customPackageName, travelerName } = req.body;

  try {
    const updatedBooking = await TourBooking.findByIdAndUpdate(
      bookingId,
      {
        packageName: customPackageName, // Update the package name
        numTravelers,
        phoneNumber,
        travelerName,
      },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, message: 'Booking updated successfully', data: updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE route to remove a booking
router.delete('/:bookingId', async (req, res) => {
  const { bookingId } = req.params;

  try {
    const deletedBooking = await TourBooking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, message: 'Booking deleted successfully', data: deletedBooking });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});



module.exports = router;
