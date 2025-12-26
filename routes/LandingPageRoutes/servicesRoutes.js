import express from "express";
import upload from "../../middleware/uploadMiddleware.js";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../controllers/LandingPageController/servicesController.js";

const router = express.Router();

// GET all services
router.get("/", getServices);

// CREATE service
router.post("/create", (req, res, next) => {
    req.uploadFolder = "services"; // 👈 Cloudinary folder
    next();
  },
  upload.single("image"),
  createService
);

// UPDATE service
router.put("/update/:id", (req, res, next) => {
    req.uploadFolder = "services";
    next();
  },
  upload.single("image"),
  updateService
);

// DELETE service
router.delete("/delete/:id", deleteService);

export default router;
