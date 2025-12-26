import express from "express";
import {
  saveCareerPage,
  getCareerPage,
  addCategory,
  addFaq,
  deleteCategory,
  deleteFaq,
} from "../controllers/careerPageController.js";

const router = express.Router();

/* ===== Page ===== */
router.post("/", saveCareerPage);
router.get("/", getCareerPage);

/* ===== Categories ===== */
router.post("/category", addCategory);
router.delete("/category/:index", deleteCategory);

/* ===== FAQ ===== */
router.post("/faq", addFaq);
router.delete("/faq/:index", deleteFaq);

export default router;
