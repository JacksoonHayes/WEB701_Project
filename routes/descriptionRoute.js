// userRoute.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { generateDescription } = require('../controllers/descriptionController');

// Listing description generation route with JWT authentication
router.post('/', passport.authenticate('jwt', { session: false }), generateDescription);

module.exports = router;
