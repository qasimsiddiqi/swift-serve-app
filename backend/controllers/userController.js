const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.register = async (req, res) => {
    console.log("Inside register------------>", req.body);
    try {
        const { email, fullName, password, accountType, categories, image } = req.body;
        
        if (!email || !fullName || !password || !accountType || !categories || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, fullName, password: hashedPassword, accountType, categories, image });
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error("Error registering user:", error); // Log the error
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }
        const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
