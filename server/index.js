const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products'); // Import product routes
const authRoutes = require('./routes/auth'); //Import auth routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register auth routes
app.use('/auth', authRoutes)

// Register product routes
app.use('/products', productRoutes);

// Home route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
