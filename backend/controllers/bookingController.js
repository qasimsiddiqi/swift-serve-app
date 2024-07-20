const Booking = require('../models/booking');
const mongoose = require('mongoose');

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

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'fullName email').populate('adsPost', 'serviceName');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from request parameters

        // Validate that userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Fetch bookings for the specific user
        const bookings = await Booking.find({ user: userId })
            .populate('adsPost', 'serviceName') // Optionally populate adsPost details
            .exec();

        if (!bookings.length) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
