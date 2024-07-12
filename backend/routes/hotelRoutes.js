const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel');

// Get hotels with pagination, search, sorting, and filtering
router.get('/hotels', async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    let sort = req.query.sort || 'name';
    let roomType = req.query.roomType || 'All';
    let amenitiesFilter = req.query.amenities ? req.query.amenities.split(',') : [];

    const roomTypeOptions = ['Single', 'Double', 'Suite', 'Family', 'Executive'];
    const amenitiesOptions = ['Free WiFi', 'Swimming Pool', 'Gym', 'Spa', 'Free Breakfast', 'Guided Tours', 'Fishing', 'Lake View', 'Boat Rides', 'Hiking', 'Mountain View', 'BBQ Facilities', 'Trekking'];

    roomType === 'All' ? (roomType = [...roomTypeOptions]) : (roomType = req.query.roomType.split(','));

    let sortBy = {};
    if (sort.includes(',')) {
      const sortArray = sort.split(',');
      sortBy[sortArray[0]] = sortArray[1] === 'desc' ? -1 : 1;
    } else {
      sortBy[sort] = 1;
    }

    const filterQuery = {
      name: { $regex: search, $options: 'i' },
      rooms: { $in: roomType },
      ...(amenitiesFilter.length && { amenities: { $all: amenitiesFilter } })
    };

    const hotels = await Hotel.find(filterQuery)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Hotel.countDocuments(filterQuery);

    res.status(200).json({
      error: false,
      total,
      page: page + 1,
      limit,
      roomTypeOptions,
      amenitiesOptions,
      hotels
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});


// Add a new hotel
router.post('/add-hotel', async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json({ message: 'Hotel added successfully', hotel });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update an existing hotel
router.put('/update-hotel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Hotel updated successfully', updatedHotel });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a hotel
router.delete('/delete-hotel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
