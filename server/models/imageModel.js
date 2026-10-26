/**
 * Image Model
 *
 * Mongoose schema definition for storing generated images and their metadata.
 *
 * Schema Fields:
 * - userId: Reference to the user who generated the image
 * - prompt: Text description used to generate the image
 * - style: Art style used for generation (default: "default")
 * - imageUrl: URL to the stored image
 *
 * Features:
 * - Automatic timestamps for creation/updates
 * - User association through references
 * - Style tracking for analytics
 * - URL storage for cloud-hosted images
 *
 * Used by:
 * - Image generation service
 * - Gallery features
 * - User history tracking
 */

import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      default: "default",
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("images", imageSchema);
