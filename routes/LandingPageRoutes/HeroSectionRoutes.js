import express from "express";
import upload from '../../middleware/uploadMiddleware.js';
import {
  getHeroSection,
  upsertHeroSection,
} from "../../controllers/LandingPageController/HeroSectionController.js";

const router = express.Router();

// GET hero section
router.get("/hero-section/", getHeroSection);

// CREATE / UPDATE hero section
router.post(
  "/hero-section/save",
  (req, res, next) => {
    req.uploadFolder = "hero-section"; // 👈 sets Cloudinary folder
    next();
  },
  upload.single("heroImage"),
  upsertHeroSection
);

export default router;
