import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export const port = process.env.PORT || 5555;

export const connectdb = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
  }
};
