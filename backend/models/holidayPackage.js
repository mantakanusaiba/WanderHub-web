const mongoose = require('mongoose');

const holidayPackageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  destination: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('HolidayPackage', holidayPackageSchema);
