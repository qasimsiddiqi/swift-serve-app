const AdsPost = require('../models/adsPost');

exports.createAdsPost = async (req, res) => {
    try {
        const { serviceName, serviceDetail, serviceType, images, location, user } = req.body;
        const adsPost = new AdsPost({ serviceName, serviceDetail, serviceType, images, location, user });
        await adsPost.save();
        res.status(201).json({ message: 'Ads post created successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
