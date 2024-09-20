const express = require('express');
const router = express.Router();
const HolidayPackage = require('../models/holidayPackage');

// Add a holiday package
router.post('/add-holiday-package', async (req, res) => {
  try {
    const { image, name, description, price, duration, destination } = req.body;

    const holidayPackage = new HolidayPackage({ image, name, description, price, duration, destination });
    await holidayPackage.save();

    res.status(200).json({ message: 'Holiday package added successfully' });
  } catch (error) {
    console.error('Error adding holiday package:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all holiday packages
router.get('/get-all-holiday-packages', async (req, res) => {
  try {
    const holidayPackages = await HolidayPackage.find().sort({ createdAt: -1 });
    res.status(200).json({ status: 'Success', data: holidayPackages });
  } catch (error) {
    console.error('Error fetching holiday packages:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get holiday packages with filters
router.get('/get-holiday-packages', async (req, res) => {
  try {
    const { range = 20000, duration = 0, packageName = '', destination = '' } = req.query;

    const query = {
      price: { $lte: parseInt(range) }, 
      ...(parseInt(duration) !== 0 && { duration: parseInt(duration) }), 
      ...(packageName && { name: { $regex: packageName, $options: 'i' } }),
      ...(destination && { destination: { $regex: destination, $options: 'i' } }),
    };

    const holidayPackages = await HolidayPackage.find(query);
    res.status(200).json({ status: 'Success', data: holidayPackages });
  } catch (error) {
    console.error('Error fetching holiday packages:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get holiday packages by price range only
router.get('/get-holiday-packages-by-price', async (req, res) => {
  try {
    const { range = 20000, duration, packageName, destination } = req.query;

    const query = { price: { $lte: parseInt(range) } }; 

    if (duration) {
      query.duration = parseInt(duration);
    }

    if (packageName) {
      query.name = { $regex: packageName, $options: 'i' };
    }

    if (destination) {
      query.destination = { $regex: destination, $options: 'i' };
    }

    const holidayPackages = await HolidayPackage.find(query);
    res.status(200).json({ status: 'Success', data: holidayPackages });
  } catch (error) {
    console.error('Error fetching holiday packages by price:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;
