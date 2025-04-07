// routes/url.routes.js
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import shortid from "shortid";
import urlModel from "../model/url.model.js";

dotenv.config();

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
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
    const { originalUrl, expiresAt, country, browser, device } = req.body; // Frontend se expiresAt aa raha hai
    // Validate URL
    if (!originalUrl || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(originalUrl)) {
      return res.status(400).json({ success: false, message: "Invalid URL" });
    }

    // Generate short ID
    const shortId = shortid.generate();
    // Construct short URL with backend base URL
    const shortUrl = `https://url-shortner-2-jwar.onrender.com/${shortId}`; // e.g., http://localhost:8900/2CFcwZPaX
    const urlDoc = await urlModel.create({
      originalUrl,
      shortId,
      expiresAt: new Date(expiresAt), // Frontend se aaya hua expiresAt
      newUrl: shortUrl,
      userId: req.userId,
      country,
      browser,
      device,
    });
    res.status(200).json({
      success: true,
      message: "URL shortened successfully",
      shortId,
      newUrl: shortUrl, // Backend ka URL return karo
      expiresAt: urlDoc.expiresAt,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Try again, short ID collision" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});
router.get("/counter", async (req, res) => {
  const { token } = req.query;
  console.log(token, "token-counter token valahai ye");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const url = await urlModel.find({ userId: id });
    res.status(200).json({ success: true, count: url.length, urls: url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// Redirect short URL to original URL
router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const urlDoc = await urlModel.findOne({ shortId });
    console.log("Found URL Doc:", urlDoc);

    if (!urlDoc) {
      console.log("Short URL not found in DB");
      return res
        .status(404)
        .json({ success: false, message: "Short URL not found" });
    }

    if (new Date() > urlDoc.expiresAt) {
      console.log("Short URL expired");
      return res
        .status(410)
        .json({ success: false, message: "Short URL has expired" });
    }

    urlDoc.visitHistory.push({ timestamp: Date.now() });
    await urlDoc.save();
    // 🔥 Redirect to original URL
    res.redirect(urlDoc.originalUrl);
    res.status(200).json({
      success: true,
      originalUrl: urlDoc.originalUrl,
    });
  } catch (error) {
    console.error("Error in GET /:shortId:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Yeh route abhi incomplete hai, isko baad mein fix karenge agar zarurat padi

export default router;
