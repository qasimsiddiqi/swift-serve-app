const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    adsPost: { type: mongoose.Schema.Types.ObjectId, ref: 'AdsPost', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comments: { type: String },
    image: { type: String }
});

module.exports = mongoose.model('Review', reviewSchema);
