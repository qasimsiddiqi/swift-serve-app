const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/create', bookingController.createBooking);
router.get('/user/:userId', bookingController.getBookingsByUserId);

module.exports = router;
