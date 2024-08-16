const mongoose = require('mongoose');

const trendSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  oldPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
});

const Trend = mongoose.model('Trend', trendSchema);

module.exports = Trend;
