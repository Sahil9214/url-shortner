import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js"; // Import Cloudinary config
import passport from "../config/passport.js";
import upload from "../config/upload.js"; // Import Multer config
import authModel from "../model/auth.model.js";

dotenv.config();

const router = express.Router();

// Signup route (manual with image upload)
router.post("/signup", upload.single("profileImage"), async (req, res) => {
  try {
    const { name, email, password, verifyPassword } = req.body;

    // Check for required fields
    if (!name || !email || !password || !verifyPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }
    if (password !== verifyPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    // Handle image upload to Cloudinary
    let profileImageUrl = "";
    if (!req.file) {
      profileImageUrl =
        "https://res.cloudinary.com/dfudqqpnr/image/upload/v1717616400/profile_images/default_profile_image_zqzq8y.png";
    } else {
      const result = await cloudinary.uploader
        .upload_stream(
          { folder: "profile_images", public_id: `${email}_profile` }, // Unique public_id
          (error, result) => {
            if (error) throw error;
            return result;
          }
        )
        .end(req.file.buffer); // Upload from memory buffer
      profileImageUrl = result.secure_url; // Get the secure URL
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verifyHashPassword = await bcrypt.hash(verifyPassword, 10);
    const user = await authModel.create({
      name,
      email,
      password: hashPassword,
      verifyPassword: verifyHashPassword,
      profileImage: profileImageUrl || "", // Save Cloudinary URL or empty string
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login route (unchanged)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }
    const user = await authModel.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({
        success: false,
        message: "User not found or invalid login method",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Google OAuth routes (with Cloudinary for profile image)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

export default router;
