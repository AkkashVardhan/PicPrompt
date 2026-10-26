/**
 * Express Server Entry Point
 *
 * Main server configuration and startup for the PicPrompt backend.
 *
 * Features:
 * - Express server setup
 * - CORS configuration
 * - Environment variables
 * - MongoDB connection
 * - Route registration
 * - Error handling
 *
 * Routes:
 * - /api/user: User authentication and management
 * - /api/image: Image generation and retrieval
 * - /: Health check endpoint
 *
 * Configuration:
 * - Uses process.env.PORT or defaults to 4000
 * - Enables CORS for all origins
 * - Parses JSON request bodies
 * - Connects to MongoDB via mongoose
 */

import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

// Allow CORS from any origin
app.use(cors({ origin: "*" }));

await connectDB();

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.get("/", (req, res) => res.send("API Working fine"));

app.listen(PORT, () => console.log("Server running on port " + PORT));
