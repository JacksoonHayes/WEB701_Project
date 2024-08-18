const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Import Routes
const userRoutes = require('./routes/userRoutes'); 
const donationRoutes = require('./routes/donationRoutes');
const pageRoutes = require('./routes/pageRoutes');

// Use Routes
app.use(userRoutes);
app.use(donationRoutes);
app.use(pageRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));