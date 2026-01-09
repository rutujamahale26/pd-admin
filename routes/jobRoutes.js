import express from "express";
import { createJob, deleteJob, getAllJobs, getJobById, getJobs, toggleJobStatus, updateJob } from "../controllers/jobController.js";


const router = express.Router();

// PUBLIC (Career page)
router.get("/", getJobs);
router.get("/:id", getJobById);

// ADMIN
router.get("/admin", getAllJobs);
router.post("/create", createJob);
router.put("/update/:id", updateJob);
router.patch("/toggle/:id", toggleJobStatus);
router.delete("/delete/:id", deleteJob);

export default router;
