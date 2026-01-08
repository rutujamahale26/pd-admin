import { Blog } from "../models/blogModel.js";
import { deleteFromCloudinary } from "../utils/cloudinaryHelper.js";

/* ================= CREATE BLOG (DRAFT / PUBLISH) ================= */
export const createBlog = async (req, res) => {
  try {
    const {
      author,
      date,
      title,
      category,
      readTime,
      description1,
      description2,
      status, // "draft" | "published"
      isVisible,
    } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];

    const blogStatus = status === "published" ? "published" : "draft";

    /* 🔴 VALIDATION ONLY IF PUBLISH */
    if (blogStatus === "published") {
      if (!author)
        return res.status(400).json({ message: "Author is required" });
      if (!date) return res.status(400).json({ message: "Date is required" });
      if (!title || title.length < 5)
        return res
          .status(400)
          .json({ message: "Title must be at least 5 characters" });
      if (!category)
        return res.status(400).json({ message: "Category is required" });
      if (!readTime || readTime < 1)
        return res
          .status(400)
          .json({ message: "Read time must be at least 1 minute" });
      if (!description1 || description1.length < 20)
        return res
          .status(400)
          .json({ message: "Description must be at least 20 characters" });
      if (!image1)
        return res
          .status(400)
          .json({ message: "Main image is required to publish blog" });
    }

    const blog = await Blog.create({
      author,
      date,
      title,
      category,
      readTime,
      description1,
      description2,
      status: blogStatus,
      isVisible: isVisible ?? true,

      image1: image1
        ? { url: image1.path, public_id: image1.filename }
        : undefined,

      image2: image2
        ? { url: image2.path, public_id: image2.filename }
        : undefined,
    });

    res.status(201).json({
      success: true,
      message:
        blogStatus === "draft"
          ? "Blog saved as draft"
          : "Blog published successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= GET BLOGS ================= */
export const getBlogs = async (req, res) => {
  const { status } = req.query; // draft | published

  const filter = status ? { status } : {};
  const blogs = await Blog.find(filter).sort({ createdAt: -1 });

  res.json({
    success: true,
    message: "Blog fetched successfully",
    count: blogs.length,
    data: blogs,
  });
};

/* ================= GET SINGLE BLOG ================= */
export const getBlogById = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.json({
    success: true,
    message: "Blog fetched successfully",
    // count: blog.length,
    data: blog,
  });
};

/* ================= UPDATE BLOG ================= */
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];

    // 🔄 Replace images
    if (image1) {
      if (blog.image1?.public_id) {
        await deleteFromCloudinary(blog.image1.public_id);
      }
      blog.image1 = { url: image1.path, public_id: image1.filename };
    }

    if (image2) {
      if (blog.image2?.public_id) {
        await deleteFromCloudinary(blog.image2.public_id);
      }
      blog.image2 = { url: image2.path, public_id: image2.filename };
    }

    // 🔄 Update fields
    Object.assign(blog, req.body);

    await blog.save();

    res.json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= DELETE BLOG ================= */
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (blog.image1?.public_id) {
    await deleteFromCloudinary(blog.image1.public_id);
  }

  if (blog.image2?.public_id) {
    await deleteFromCloudinary(blog.image2.public_id);
  }

  await blog.deleteOne();

  res.json({
    success: true,
    message: "Blog deleted successfully",
  });
};

/* ================= WEBSITE: GET ACTIVE BLOGS ================= */
export const getActiveBlogsForWebsite = async (req, res) => {
  try {
    const blogs = await Blog.find({
      status: "published",
      isVisible: true,
    })
      .select(
        "title category author date readTime views image1 description1 createdAt description2 image2"
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Blogs fetched successfuly",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
