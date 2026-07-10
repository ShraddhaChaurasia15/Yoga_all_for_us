const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Set a timeout of 5 seconds to prevent server hangs during connection failure
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log('MongoDB connected');
    global.dbType = 'mongo';
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.warn('⚠️ WARNING: Cloud MongoDB connection failed. Falling back to local file-based database (db_fallback.json).');
    global.dbType = 'json';
  }
};

module.exports = connectDB;