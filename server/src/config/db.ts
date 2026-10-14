import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zanjan_green_portal';

export async function connectDB(): Promise<void> {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[DB] Connected successfully to MongoDB: ${MONGODB_URI}`);
  } catch (error) {
    console.error('[DB] MongoDB Connection Error:', error);
    // Don't crash process, allows server to respond with informative status
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('[DB] MongoDB disconnected.');
});

mongoose.connection.on('error', (err) => {
  console.error('[DB] MongoDB runtime error:', err);
});
