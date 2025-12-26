import express from "express";
import upload from "../middleware/contactUpload.js";
import {submitContactForm} from '../controllers/contactController.js'


const router = express.Router();

router.post("/", upload.single("attachment"), submitContactForm);

export default router;
