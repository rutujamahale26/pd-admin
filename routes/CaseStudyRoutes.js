import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import {createCaseStudy, deleteCaseStudy, getCaseStudies, getCaseStudiesForWebsite, getCaseStudyById, reorderCaseStudies, updateCaseStudy} from '../controllers/caseStudyController.js'

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "problemImage", maxCount: 1 },
    { name: "solutionImage", maxCount: 1 },
  ]),
  createCaseStudy
);

router.get("/case-list", getCaseStudies);
// router.get("/published", getPublishedCaseStudies);
router.get("/get/:id", getCaseStudyById);

router.put(
  "/update/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "problemImage", maxCount: 1 },
    { name: "solutionImage", maxCount: 1 },
  ]),
  updateCaseStudy
);

router.delete("/detete/:id", deleteCaseStudy);

router.put("/reorder", reorderCaseStudies);

router.get("/website", getCaseStudiesForWebsite);

export default router;