import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken"; // For authentication (optional)
import shortid from "shortid";
import urlModel from "../model/url.model.js";

dotenv.config();

const router = express.Router();

// Middleware to verify JWT (optional, if you want authenticated users only)
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};

// Shorten URL
router.post("/shorten", verifyToken, async (req, res) => {
  try {
    const { originalUrl, expiresInDays = 7 } = req.body; // Default expiry: 7 days

    // Validate URL
    if (!originalUrl || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(originalUrl)) {
      return res.status(400).json({ success: false, message: "Invalid URL" });
    }

    // Generate short ID
    const shortId = shortid.generate();

    // Calculate expiry date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    // Create URL document
    const urlDoc = await urlModel.create({
      originalUrl,
      shortId,
      expiresAt,
      userId: req.userId, // Optional: Associate with user
    });

    // Construct short URL
    const shortUrl = `${process.env.BASE_URL}/${shortId}`; // e.g., http://localhost:3000/abcd123

    res.status(200).json({
      success: true,
      message: "URL shortened successfully",
      shortUrl,
      expiresAt: urlDoc.expiresAt,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate shortId (rare with shortid)
      return res
        .status(400)
        .json({ success: false, message: "Try again, short ID collision" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// Redirect short URL to original URL
router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    // Find URL document
    const urlDoc = await urlModel.findOne({ shortId });
    if (!urlDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Short URL not found" });
    }

    // Check if expired
    if (new Date() > urlDoc.expiresAt) {
      return res
        .status(410)
        .json({ success: false, message: "Short URL has expired" });
    }

    // Update visit history
    urlDoc.visitHistory.push({ timestamp: Date.now() });
    await urlDoc.save();

    // Redirect to original URL
    res.redirect(urlDoc.originalUrl);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
