const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register a new user
exports.addUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, msg: 'Email is already registered' });
        }

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Determine initial voucher count based on role
        const vouchers = role === 'beneficiary' ? 10 : 0;

        // Create and save the new user
        const newUser = new User({ name, email, password: hash, role, vouchers });
        await newUser.save();

        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

// Authenticate user by email and password
exports.getUserByEmail = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, msg: 'Incorrect password' });
        }

        // Generate JWT token with role
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: 21600 }
        );

        return res.json({
            success: true,
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

// Get user by ID (used in profile and token redemption routes)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }
        return res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

// Update user password
exports.updatePassword = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.newPassword, salt);

        await User.findByIdAndUpdate(req.user.id, { password: hash });
        return res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

// Redeem a token (used in token redemption route)
exports.redeemToken = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        // Check if the user has tokens to redeem
        if (user.vouchers > 0) {
            user.vouchers -= 1;
            await user.save();
            return res.status(200).json({ success: true, vouchers: user.vouchers, message: 'Token redeemed successfully!' });
        } else {
            return res.status(400).json({ success: false, message: 'No tokens available to redeem!' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
