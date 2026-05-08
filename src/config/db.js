const mongoose = require('mongoose');

const DEFAULT_MONGO_URI = 'mongodb://127.0.0.1:27017/fitness-challenge-tracker';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || DEFAULT_MONGO_URI;

  if (!process.env.MONGODB_URI) {
    console.warn(`MONGODB_URI is not set. Using ${DEFAULT_MONGO_URI}`);
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};

module.exports = connectDB;
