const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    accountType: { type: String, enum: ['vendor', 'user'], required: true },
    categories: { type: [String] },
    image: { type: [String], validate: [arrayLimit, 'A user can upload a maximum of 3 images.'] }
});

function arrayLimit(val) {
    return val.length <= 3;
}

module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const { Schema } = mongoose;

// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     fullName: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     accountType: {
//         type: String,
//         enum: ['vendor', 'user', 'admin'], // Example account types
//         required: true
//     },
//     categories: {
//         type: [String]
//     },
//     image: {
//         type: [String],
//         validate: {
//             validator: function (v) {
//                 return v.length <= 3;
//             },
//             message: props => `A user can upload a maximum of 3 images.`
//         }
//     }
// });

// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         try {
//             this.password = await bcrypt.hash(this.password, 10);
//         } catch (err) {
//             return next(err);
//         }
//     }
//     next();
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;