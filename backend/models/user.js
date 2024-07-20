const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    accountType: { type: String, enum: ['vendor', 'Customer'], required: true },
    categories: { type: [String] },
    image: { type: [String], validate: [arrayLimit, 'A user can upload a maximum of 3 images.'] }
});

function arrayLimit(val) {
    return val.length <= 3;
}

module.exports = mongoose.model('User', userSchema);