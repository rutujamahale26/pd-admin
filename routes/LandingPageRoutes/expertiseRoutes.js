import express from "express";
import upload from "../../middleware/uploadMiddleware.js";
import {
  getExpertise,
  createExpertise,
  updateExpertise,
  deleteExpertise,
} from "../../controllers/LandingPageController/expertiseController.js";

const router = express.Router();

// GET all expertise
router.get("/", getExpertise);

// CREATE expertise
router.post("/create",(req, res, next) => {
    req.uploadFolder = "expertise";
    next();
  },
  upload.single("image"),
  createExpertise
);

// UPDATE expertise
router.put("/update/:id", (req, res, next) => {
    req.uploadFolder = "expertise";
    next();
  },
  upload.single("image"),
  updateExpertise
);

// DELETE expertise
router.delete("/delete/:id", deleteExpertise);

export default router;
