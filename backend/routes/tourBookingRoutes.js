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

module.exports = router;
