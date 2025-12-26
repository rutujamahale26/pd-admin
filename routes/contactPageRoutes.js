import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  getContactPage,
  saveContactPage,
  addFaq,
  deleteFaq,
} from "../controllers/contactPageController.js";

const router = express.Router();

/* GET PAGE */
router.get("/", getContactPage);

/* SAVE PAGE */
router.post(
  "/save",
  (req, res, next) => {
    req.uploadFolder = "contact-page/core-values";
    next();
  },
  upload.fields([
    { name: "coreImage0", maxCount: 1 },
    { name: "coreImage1", maxCount: 1 },
    { name: "coreImage2", maxCount: 1 },
    { name: "coreImage3", maxCount: 1 },
  ]),
  saveContactPage
);

/* FAQ ACTIONS */
router.post("/faq/add", addFaq);
router.delete("/faq/:faqId", deleteFaq);

export default router;
