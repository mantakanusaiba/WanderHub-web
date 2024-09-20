const express = require("express");
const router = express.Router();
const Tour = require("../models/tour");

// Get all tours
router.get("/get-all-tours", async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: tours,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add a new tour
router.post("/add-tour", async (req, res) => {
  try {
    const { imageUrl, title, description, link } = req.body;
    const tour = new Tour({
      imageUrl,
      title,
      description,
      link,
    });
    await tour.save();
    // Retrieve all tours after adding the new tour
    const tours = await Tour.find().sort({ createdAt: -1 });
    return res.status(201).json({
      message: "Tour added successfully",
      data: tours,
    });
  } catch (error) {
    console.error("Error adding tour:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
