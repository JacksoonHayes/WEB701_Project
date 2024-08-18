const express = require('express');
const router = express.Router();

// Get Home page content
router.get('/api/pages/home', (req, res) => {
    // Placeholder for Home page content
    res.status(200).json({ message: 'Fetching Home page content' });
});

// Get About Us page content
router.get('/api/pages/about', (req, res) => {
    // Placeholder for About Us page content
    res.status(200).json({ message: 'Fetching About Us page content' });
});

// Get Contact Us page content
router.get('/api/pages/contact', (req, res) => {
    // Placeholder for Contact Us page content
    res.status(200).json({ message: 'Fetching Contact Us page content' });
});

module.exports = router;