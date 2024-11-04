// userRoute.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { generateRecipe } = require('../controllers/recipeController');

// Recipe generation route with JWT authentication
router.post('/', passport.authenticate('jwt', { session: false }), generateRecipe);

module.exports = router;
