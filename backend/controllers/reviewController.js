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
