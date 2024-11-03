const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');

// Register route
router.post('/register', userController.addUser);

// Authenticate route
router.post('/authenticate', userController.getUserByEmail);

// Profile route with JWT authentication middleware
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ user: req.user });
});

// Update route with JWT authentication middleware to update user password
router.put('/update', passport.authenticate('jwt', { session: false }), userController.updatePassword);

// Redeem token route with JWT authentication middleware to redeem a token
router.post('/redeem-token', passport.authenticate('jwt', { session: false }), userController.getUserById);

module.exports = router;
