import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    visitHistory: [{ timestamp: Number }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Optional: Link to the user who created it (if authenticated)
    },
  },
  { timestamps: true }
);

const urlModel = mongoose.model("url", urlSchema);

export default urlModel;
