import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getActiveBlogsForWebsite,
} from "../controllers/blogController.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  createBlog
);

router.get("/", getBlogs);
router.get("/:id", getBlogById);

router.put(
  "/update/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  updateBlog
);

router.delete("/delete/:id", deleteBlog);

router.get("/website/active", getActiveBlogsForWebsite);

export default router;
