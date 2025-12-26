import express from 'express';
import { createDefaultAdmin, loginAdmin, logoutAdmin } from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/create-default", createDefaultAdmin);
router.post("/login", loginAdmin);
router.post("/logout", authMiddleware, logoutAdmin);

export default router;