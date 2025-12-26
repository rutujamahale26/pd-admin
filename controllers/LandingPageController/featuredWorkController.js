import FeaturedWork from "../../models/LandingPageModels/FeaturedWorkModel.js";

// GET all featured works
export const getFeaturedWorks = async (req, res) => {
  try {
    const works = await FeaturedWork.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count : works.length,
      data: works,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured works",
      error: error.message,
    });
  }
};


//  CREATE featured work
export const createFeaturedWork = async (req, res) => {
  try {
    const { title, externalLink, description } = req.body;

    // 🔐 Validations
    if (!title || !externalLink || !description) {
      return res.status(400).json({
        success: false,
        message: "All text fields are required",
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title must be at least 3 characters",
      });
    }

    if (description.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Description must be at least 10 characters",
      });
    }

    // 🖼️ Images
    const laptopImage = req.files?.laptopImage?.[0]?.path;
    const phoneImage = req.files?.phoneImage?.[0]?.path;

    if (!laptopImage || !phoneImage) {
      return res.status(400).json({
        success: false,
        message: "Laptop image and phone image are required",
      });
    }

    const work = await FeaturedWork.create({
      title: title.trim(),
      externalLink: externalLink.trim(),
      description: description.trim(),
      laptopImage,
      phoneImage,
    });

    res.status(201).json({
      success: true,
      message: "Featured work created successfully",
      data: work,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create featured work",
      error: error.message,
    });
  }
};


// UPDATE featured work
export const updateFeaturedWork = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, externalLink, description } = req.body;

    const work = await FeaturedWork.findById(id);
    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Featured work not found",
      });
    }

    if (title) work.title = title.trim();
    if (externalLink) work.externalLink = externalLink.trim();
    if (description) work.description = description.trim();

    // 🖼️ Images optional on update
    if (req.files?.laptopImage?.[0]?.path) {
      work.laptopImage = req.files.laptopImage[0].path;
    }

    if (req.files?.phoneImage?.[0]?.path) {
      work.phoneImage = req.files.phoneImage[0].path;
    }

    await work.save();

    res.status(200).json({
      success: true,
      message: "Featured work updated successfully",
      data: work,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update featured work",
      error: error.message,
    });
  }
};

// DELETE featured work
export const deleteFeaturedWork = async (req, res) => {
  try {
    const { id } = req.params;

    const work = await FeaturedWork.findByIdAndDelete(id);
    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Featured work not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Featured work deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete featured work",
      error: error.message,
    });
  }
};
