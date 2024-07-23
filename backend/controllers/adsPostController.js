const AdsPost = require('../models/adsPost');
const reviews = require('../models/reviews');

exports.createAdsPost = async (req, res) => {
    try {
        // console.log("Backend ads function called", req.body);
        const { serviceName, serviceDetails, serviceType, images, location, user } = req.body;
        const adsPost = new AdsPost({ serviceName, serviceDetails, serviceType, images, location, user });
        // console.log("Ads res backend", adsPost);
        await adsPost.save();
        res.status(201).json({ message: 'Ads post created successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllAdsPosts = async (req, res) => {
    try {
        const adsPosts = await AdsPost.find().populate('user', 'fullName email'); // Optionally populate user details
        res.json(adsPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAdsPostById = async (req, res) => {
    try {
        const adsPost = await AdsPost.findById(req.params.id)
            .populate('user', 'fullName email')
            .exec();

        if (!adsPost) {
            return res.status(404).json({ error: 'AdsPost not found' });
        }

        // Fetch reviews for this AdsPost
        const reviewsRes = await reviews.find({ adsPost: req.params.id })
            .populate('user', 'fullName email')
            .exec();

        res.json({
            adsPost,
            reviewsRes
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};