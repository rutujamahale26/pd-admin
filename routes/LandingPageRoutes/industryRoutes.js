import express from "express";
import upload from "../../middleware/uploadMiddleware.js";
import {
  getIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} from "../../controllers/LandingPageController/industryController.js";

const router = express.Router();

// GET all industries
router.get("/", getIndustries);

// CREATE industry
router.post("/create", (req, res, next) => {
    req.uploadFolder = "industries";
    next();
  },
  upload.single("image"),
  createIndustry
);

// UPDATE industry
router.put( "/update/:id", (req, res, next) => {
    req.uploadFolder = "industries";
    next();
  },
  upload.single("image"),
  updateIndustry
);

// DELETE industry
router.delete("/delete/:id", deleteIndustry);

export default router;
