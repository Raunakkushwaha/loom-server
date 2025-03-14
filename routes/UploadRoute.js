import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,  // No need for cloudinary.v2
  params: {
    folder: "uploads",
    format: async (req, file) => "png", // Save as PNG (optional)
    public_id: (req, file) => file.originalname, // Use original file name
  },
});

const upload = multer({ storage });

// Upload Image to Cloudinary
router.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json({ url: req.file.path || req.file.filename }); // Corrected path retrieval
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error });
  }
});

export default router;
