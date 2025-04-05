import multer from "multer";

// Configure Multer to store files in memory (we'll upload directly to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
