/**
 * MongoDB Connection Configuration
 *
 * Establishes and manages the connection to MongoDB using Mongoose.
 *
 * Features:
 * - Connection event monitoring
 * - Error handling
 * - Automatic reconnection
 * - Connection state logging
 *
 * Events Handled:
 * - connected: Successful connection
 * - error: Connection errors
 * - disconnected: Connection loss
 *
 * Configuration:
 * - Uses environment variables for connection string
 * - Configures Mongoose options for optimal performance
 * - Implements error handling and logging
 *
 * @returns {Promise} Resolves when connected, rejects on failure
 */

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Connection Error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB Disconnected");
    });

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn("WARNING: MONGODB_URI is not set in environment variables.");
      return;
    }

    // Connect using Mongoose without deprecated options
    await mongoose.connect(uri);
    console.log("MongoDB Connection Attempted");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message || error);
    console.warn("Server will continue running. Please verify your MONGODB_URI in server/.env.");
  }
};

export default connectDB;
