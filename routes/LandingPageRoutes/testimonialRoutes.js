import express from "express";
import upload from "../../middleware/uploadMiddleware.js";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../controllers/LandingPageController/testimonialController.js";

const router = express.Router();

// GET all testimonials
router.get("/", getTestimonials);

// CREATE testimonial
router.post("/create", (req, res, next) => {
    req.uploadFolder = "testimonials";
    next();
  },
  upload.single("image"),
  createTestimonial
);

// UPDATE testimonial
router.put("/update/:id",(req, res, next) => {
    req.uploadFolder = "testimonials";
    next();
  },
  upload.single("image"),
  updateTestimonial
);

// DELETE testimonial
router.delete("/delete/:id", deleteTestimonial);

export default router;
