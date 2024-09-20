const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const trendRoutes = require('./routes/trendRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); 
const holidayPackageRoutes = require('./routes/holidayPackage');
const tourRoutes = require('./routes/tourRoutes');
const tourBookingRoutes = require('./routes/tourBookingRoutes');
const TourBooking = require('./models/TourBooking'); 


const port = 5000;

dotenv.config();

console.log(`MONGO_URI: ${process.env.MONGO_URI}`); // Log MONGO_URI

connectDB();

app.use(cors(
    {
      origin:["https://wander-hub-web-front.vercel.app"],
      methods: ["POST","GET"],
      credentials: true
    }
));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send('Server is running');
});

app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/trends', trendRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/holiday-packages', holidayPackageRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/tourBook', tourBookingRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
