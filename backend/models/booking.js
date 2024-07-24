const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    adsPost: { type: mongoose.Schema.Types.ObjectId, ref: 'AdsPost', required: true },
    serviceName: { type: String, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
