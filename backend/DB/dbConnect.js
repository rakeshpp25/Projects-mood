import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const mongoURL = process.env.MONGODB_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit process if unable to connect
  }
};
