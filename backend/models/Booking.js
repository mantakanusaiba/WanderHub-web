const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hotel: { type: String, required: true },
  room: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);