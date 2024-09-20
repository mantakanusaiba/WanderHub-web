const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourBookingSchema = new Schema({
  packageId: { type: Schema.Types.ObjectId, required: true },
  packageName: { type: String, required: true },
  numTravelers: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  travelerName: { type: String, required: true },
}, { timestamps: true });

const TourBooking = mongoose.model('TourBooking', tourBookingSchema);

module.exports = TourBooking;
