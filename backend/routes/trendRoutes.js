const express = require('express');
const router = express.Router();
const Trend = require('../models/trendModel');

// @desc    Add new trend
// @route   POST /api/trends/add
// @access  Public
router.post('/add', async (req, res) => {
  const { name, image, location, oldPrice, discountPrice, discount } = req.body;

  const trend = new Trend({
    name,
    image,
    location,
    oldPrice,
    discountPrice,
    discount,
  });

  try {
    const createdTrend = await trend.save();
    res.status(201).json(createdTrend);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get all trends
// @route   GET /api/trends
// @access  Public
router.get('/', async (req, res) => {
  try {
    const trends = await Trend.find({});
    res.json(trends);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
