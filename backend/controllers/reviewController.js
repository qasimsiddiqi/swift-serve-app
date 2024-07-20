const mongoose = require('mongoose');
const Review = require('../models/reviews');

exports.createReview = async (req, res) => {
    try {
        const { user, adsPost, rating, comments, image } = req.body;
        const review = new Review({ user, adsPost, rating, comments, image });
        await review.save();
        res.status(201).json({ message: 'Review created successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('user', 'fullName email').populate('adsPost', 'serviceName');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReviewsByAdsPostId = async (req, res) => {
    try {
        const { adsPostId } = req.params; // Extract adsPostId from request parameters

        // Validate that adsPostId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(adsPostId)) {
            return res.status(400).json({ error: 'Invalid adsPost ID' });
        }

        // Fetch reviews for the specific ads post
        const reviews = await Review.find({ adsPost: adsPostId })
            .populate('user', 'fullName email') // Optionally populate user details
            .exec();

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this ads post' });
        }

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};