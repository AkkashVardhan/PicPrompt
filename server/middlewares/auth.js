/**
 * Authentication Middleware
 *
 * This middleware validates JWT tokens and authenticates users for protected routes.
 *
 * Features:
 * - JWT token validation
 * - User authentication
 * - Error handling with detailed messages
 * - Environment-aware logging
 * - Security-focused error responses
 *
 * Error Handling:
 * - Missing token
 * - Invalid token format
 * - Expired token
 * - Server errors
 *
 * Security Features:
 * - Production/development logging control
 * - Sanitized error messages
 * - Proper HTTP status codes
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Only log in non-production environments
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "Auth middleware: Authorization header received:",
        !!authHeader
      );
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Auth middleware: No token or invalid format");
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    const token = authHeader.split(" ")[1]; // Get the token part after 'Bearer '
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    // Only log in non-production environments
    if (process.env.NODE_ENV !== "production") {
      console.log("Auth middleware: Token verified:", !!tokenDecode);
    }

    if (!tokenDecode || !tokenDecode.id) {
      console.error("Auth middleware: Invalid token payload");
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token. Please login again.",
      });
    }

    req.user = { id: tokenDecode.id };

    // Only log in non-production environments
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "Auth middleware: User authenticated with ID:",
        tokenDecode.id
      );
    }

    next();
  } catch (error) {
    // Error logging is still important in production, but we'll sanitize the output
    console.error("Auth middleware error:", error.name);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format. Please login again.",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Authentication error. Please try again.",
    });
  }
};

export default userAuth;
