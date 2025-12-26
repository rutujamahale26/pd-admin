import express from "express";
import upload from "../../middleware/uploadMiddleware.js";
import {
  getFeaturedWorks,
  createFeaturedWork,
  updateFeaturedWork,
  deleteFeaturedWork,
} from "../../controllers/LandingPageController/featuredWorkController.js";

const router = express.Router();

// GET all
router.get("/", getFeaturedWorks);

// CREATE
router.post( "/create",(req, res, next) => {
    req.uploadFolder = "featured-works";
    next();
  },
  upload.fields([
    { name: "laptopImage", maxCount: 1 },
    { name: "phoneImage", maxCount: 1 },
  ]),
  createFeaturedWork
);

// UPDATE
router.put("/update/:id",(req, res, next) => {
    req.uploadFolder = "featured-works";
    next();
  },
  upload.fields([
    { name: "laptopImage", maxCount: 1 },
    { name: "phoneImage", maxCount: 1 },
  ]),
  updateFeaturedWork
);

// DELETE
router.delete("/delete/:id", deleteFeaturedWork);

export default router;
