/**
 * Image Generation Controllers
 *
 * This module handles all image-related operations including:
 * - AI Image generation using ClipDrop API
 * - User generation history
 * - Individual generation retrieval
 *
 * @module controllers/imageControllers
 * @requires axios
 * @requires models/userModel
 * @requires models/imageModel
 */

import axios from "axios";
import userModel from "../models/userModel.js";
import imageModel from "../models/imageModel.js";
import FormData from "form-data";
import mongoose from "mongoose";

/**
 * Generate AI Image
 *
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.prompt - Text prompt for image generation
 * @param {Object} req.user - Authenticated user object
 * @param {Object} res - Express response object
 * @returns {Object} Generated image data and updated credit balance
 */
export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    console.log(user);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing details" });
    }

    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({
        success: false,
        message: "No credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    let resultImage;

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);

      const { data } = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        formData,
        {
          headers: {
            "x-api-key": process.env.CLIPDROP_API,
            ...formData.getHeaders(),
          },
          responseType: "arraybuffer",
          timeout: 20000,
        }
      );

      const base64Image = Buffer.from(data, "binary").toString("base64");
      resultImage = `data:image/png;base64,${base64Image}`;
    } catch (clipDropError) {
      let clipDropMsg = "";
      if (clipDropError.response?.data) {
        try {
          const raw = Buffer.isBuffer(clipDropError.response.data)
            ? clipDropError.response.data.toString("utf-8")
            : clipDropError.response.data;
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          clipDropMsg = parsed?.error || parsed?.message || raw;
        } catch {
          clipDropMsg = clipDropError.response.data.toString();
        }
      }

      console.warn(
        "ClipDrop API returned error:",
        clipDropMsg || clipDropError.message
      );
      console.log("Generating image via fallback AI service...");

      try {
        const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
          prompt
        )}?width=512&height=512&nologo=true`;
        const { data: fallbackData } = await axios.get(fallbackUrl, {
          responseType: "arraybuffer",
          timeout: 25000,
        });

        const base64Fallback = Buffer.from(fallbackData, "binary").toString("base64");
        resultImage = `data:image/jpeg;base64,${base64Fallback}`;
      } catch (fallbackError) {
        console.error("Fallback image generation error:", fallbackError.message);
        const status = clipDropError.response?.status || 500;
        const msg =
          clipDropMsg ||
          (status === 402
            ? "ClipDrop account has 0 remaining credits."
            : status === 403 || status === 401
            ? "Invalid or revoked ClipDrop API key."
            : "Error generating image");
        return res.status(status).json({ success: false, message: msg });
      }
    }

    // Update user credits
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    // Save the generation to database
    const newGeneration = await imageModel.create({
      userId: user._id,
      prompt,
      imageUrl: resultImage,
    });

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
      generationId: newGeneration._id,
    });
  } catch (error) {
    console.error("Error in generateImage:", error.message || error);
    res.status(500).json({ success: false, message: error.message || "Error generating image" });
  }
};

export const getUserGenerations = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID from request:", userId);

    if (!userId) {
      console.error("No userId found in request");
      return res.json({ success: false, message: "User ID not found" });
    }

    console.log("Attempting to fetch all generations for userId:", userId);

    // Get all generations for this user
    const generations = await imageModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .select("prompt createdAt _id imageUrl");

    console.log("Number of generations found:", generations.length);
    console.log("First generation (if exists):", generations[0]);

    if (!generations || generations.length === 0) {
      console.log("No generations found for user:", userId);
      return res.json({
        success: true,
        message: "No images found",
        recentGenerations: [],
      });
    }

    res.json({
      success: true,
      totalGenerations: generations.length,
      recentGenerations: generations,
    });
  } catch (error) {
    console.error("Error in getUserGenerations:", error);
    return res.json({ success: false, message: error.message });
  }
};

export const getGeneration = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log("getGeneration called with:", { id, userId });

    if (!userId || !id) {
      console.error("Missing userId or id:", { userId, id });
      return res.json({
        success: false,
        message: "Missing required parameters",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid generation ID:", id);
      return res.json({ success: false, message: "Invalid generation ID" });
    }

    console.log("Looking for generation with:", { _id: id, userId });
    const generation = await imageModel.findOne({ _id: id, userId });
    console.log("Generation query result:", generation);

    if (!generation) {
      console.error("Generation not found for:", { id, userId });
      return res.json({ success: false, message: "Generation not found" });
    }

    const response = {
      success: true,
      generation: {
        _id: generation._id,
        prompt: generation.prompt,
        imageUrl: generation.imageUrl,
        createdAt: generation.createdAt,
      },
    };
    console.log("Sending response:", response);

    res.json(response);
  } catch (error) {
    console.error("Error in getGeneration:", error);
    console.error("Error stack:", error.stack);
    return res.json({ success: false, message: error.message });
  }
};

export default { generateImage, getUserGenerations, getGeneration };
