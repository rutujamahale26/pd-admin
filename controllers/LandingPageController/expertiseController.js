import Expertise from "../../models/LandingPageModels/ExpertiseModel.js";

// GET all expertise items
export const getExpertise = async (req, res) => {
  try {
    const expertise = await Expertise.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: expertise.length,
      data: expertise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch expertise",
      error: error.message,
    });
  }
};

// CREATE expertise
export const createExpertise = async (req, res) => {
  try {
    const { title, description, isVisible } = req.body;

    // 🔐 Validations
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title must be at least 3 characters long",
      });
    }

    if (description.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Description must be at least 10 characters long",
      });
    }

    const image = req.file?.path;
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const expertise = await Expertise.create({
      title: title.trim(),
      description: description.trim(),
      image,
      isVisible: isVisible ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Expertise added successfully",
      data: expertise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create expertise",
      error: error.message,
    });
  }
};

//  UPDATE expertise
export const updateExpertise = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isVisible } = req.body;

    const expertise = await Expertise.findById(id);
    if (!expertise) {
      return res.status(404).json({
        success: false,
        message: "Expertise not found",
      });
    }

    if (title) expertise.title = title.trim();
    if (description) expertise.description = description.trim();
    if (typeof isVisible !== "undefined") {
      expertise.isVisible = isVisible;
    }

    // 🖼️ Image optional on update
    if (req.file?.path) {
      expertise.image = req.file.path;
    }

    await expertise.save();

    res.status(200).json({
      success: true,
      message: "Expertise updated successfully",
      data: expertise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update expertise",
      error: error.message,
    });
  }
};

//  DELETE expertise
export const deleteExpertise = async (req, res) => {
  try {
    const { id } = req.params;

    const expertise = await Expertise.findByIdAndDelete(id);
    if (!expertise) {
      return res.status(404).json({
        success: false,
        message: "Expertise not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expertise deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete expertise",
      error: error.message,
    });
  }
};
