import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  saveAboutUs,
  getAboutUs,
  addJourney,
  deleteJourney,
} from "../controllers/aboutUsController.js";

const router = express.Router();

router.get("/get", upload.any(), getAboutUs);

router.post(
  "/save",
  upload.fields([{ name: "heroImage", maxCount: 1 }]),
  saveAboutUs
);

router.post("/journey", addJourney);
router.delete("/journey/:journeyId", deleteJourney);

export default router;
