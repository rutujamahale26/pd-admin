import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { deleteCategory, getPortfolio, savePortfolio } from "../controllers/portfolioController.js";


const router = express.Router();

/* ================= CLOUDINARY FOLDER ================= */
router.use((req, res, next) => {
  req.uploadFolder = "portfolio";
  next();
});

/* ================= ROUTES ================= */

// create / update portfolio
router.post("/", upload.single("mainImage"), savePortfolio);

// get portfolio
router.get("/", getPortfolio);

// delete category by index
router.delete("/category/:index", deleteCategory);

export default router;
