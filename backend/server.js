const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

// Your MongoDB connection string
const dbURI = process.env.MONGO_DB_URI;

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(cors())
// Cloud db setup
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((error) => console.error('Connection error', error));

// Local db setup
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
