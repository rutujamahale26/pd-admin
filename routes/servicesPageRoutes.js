import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { getServicesAdmin, getServicesWebsite, saveServices } from "../controllers/servicePageController.js";
// import { getServicesAdmin, getServicesWebsite, saveServices } from "../controllers/servicePageController.js";

const router = express.Router();


router.post(
  "/save",
  upload.fields([
    { name: "uiuxImage", maxCount: 1 },
    { name: "fullstackImage", maxCount: 1 },
    { name: "qaImage", maxCount: 1 },
    { name: "capabilityImages", maxCount: 10 }, // 👈 capability images
  ]),
  saveServices
);

router.get("/", getServicesAdmin);
router.get("/website", getServicesWebsite);


export default router;