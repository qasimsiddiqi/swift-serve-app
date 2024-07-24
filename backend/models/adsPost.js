const mongoose = require('mongoose');
const { Schema } = mongoose;

const adsPostSchema = new Schema({
  serviceName: { type: String, required: true },
  serviceDetails: { type: String, required: true },
  price: { type: Number },
  serviceType: { type: String, required: true },
  images: { type: [String], validate: [arrayLimit, 'An ad can have a maximum of 3 images.'] },
  location: { type: Object, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

function arrayLimit(val) {
  return val.length <= 3;
}

// Middleware to check if the user is a vendor before saving an ad post
adsPostSchema.pre('save', async function (next) {
  try {
    const user = await mongoose.model('User').findById(this.user);
    if (user.accountType !== 'vendor') {
      throw new Error('Only users with account type "vendor" can post ads.');
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('AdsPost', adsPostSchema);
