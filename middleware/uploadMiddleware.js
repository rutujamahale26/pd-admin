import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: req.uploadFolder || "case-studies", // 👈 default stays same
    // resource_type: "auto", // ✅ THIS IS THE KEY
    allowed_formats: ["jpg", "jpeg", "png", "webp", "svg"],
  }),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 2MB
});

export default upload;
