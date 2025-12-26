import express from "express";
import upload from "../middleware/contactUpload.js";
import { applyForJob } from "../controllers/jobApplicationController.js";

const router = express.Router();

router.post(
  "/apply",
 upload.single("resume"),
  applyForJob
);

export default router;
