const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    stars: { type: Number, required: true },
    discount: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    rooms: { type: [String], required: true },
    amenities: { type: [String], required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);
