import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import urlRoutes from "./routes/url.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/url", urlRoutes);
app.listen(process.env.PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${process.env.PORT}`);
});
