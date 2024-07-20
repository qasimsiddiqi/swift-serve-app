const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

// Import routes
const userRoutes = require('./routes/userRoutes');
const adsPostRoutes = require('./routes/adsPostRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/ads', adsPostRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// const express = require('express');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/auth');
// const app = express();
// const cors = require('cors')
// const port = process.env.PORT || 5000;

// // Your MongoDB connection string
// const dbURI = process.env.MONGO_DB_URI;

// // Middleware
// app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use(cors())
// // Cloud db setup
// // mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
// //     .then(() => console.log('Connected to MongoDB'))
// //     .catch((error) => console.error('Connection error', error));

// // Local db setup
// mongoose.connect('mongodb://localhost:27017/myapp', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
