const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
    try {
        const { user, adsPost, serviceName, date, time } = req.body;
        const booking = new Booking({ user, adsPost, serviceName, date, time });
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
