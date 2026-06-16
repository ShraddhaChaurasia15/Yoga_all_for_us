const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend-backend communication

// Database Connection
const connectDB = require('./db');
connectDB();

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Server Listener
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
