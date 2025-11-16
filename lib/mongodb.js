import mongoose from "mongoose";

// Load the MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// If no URI is provided, stop the app immediately
if (!MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// Use a global variable to store the connection across hot reloads
// This prevents creating new connections on every API request
let cached = global.mongoose;

// If no cached object exists yet, create one
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // If we already have a live connection, return it
  if (cached.conn) return cached.conn;

  // If no connection promise exists, create one
  // Using a promise prevents duplicate connections during rapid requests
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  // Wait for the connection to finish, then store it
  cached.conn = await cached.promise;

  // Return the active connection for use in API routes or server components
  return cached.conn;
}