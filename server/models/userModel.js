/**
 * User Model
 *
 * Mongoose schema definition for user data in MongoDB.
 *
 * Schema Fields:
 * - name: User's full name (required)
 * - email: Unique email address (required)
 * - password: Hashed password (required)
 * - creditBalance: Number of credits available (default: 5)
 *
 * Features:
 * - Automatic timestamps (createdAt, updatedAt)
 * - Email uniqueness validation
 * - Credit system integration
 *
 * Used by:
 * - Authentication system
 * - Credit management
 * - User profile management
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creditBalance: { type: Number, default: 5 },
  },
  {
    timestamps: true, // Add timestamps for better tracking
  }
);

// Fix the model registration
const userModel = mongoose.model("user", userSchema);

export default userModel;
