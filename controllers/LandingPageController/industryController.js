import Industry from "../../models/LandingPageModels/IndustriesModel.js";

// GET all industries
export const getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count:industries.length,
      data: industries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch industries",
      error: error.message,
    });
  }
};

//  CREATE industry
export const createIndustry = async (req, res) => {
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
        message: "Industry image is required",
      });
    }

    const industry = await Industry.create({
      title: title.trim(),
      description: description.trim(),
      image,
      isVisible: isVisible ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Industry created successfully",
      data: industry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create industry",
      error: error.message,
    });
  }
};

// UPDATE industry
export const updateIndustry = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isVisible } = req.body;

    const industry = await Industry.findById(id);
    if (!industry) {
      return res.status(404).json({
        success: false,
        message: "Industry not found",
      });
    }

    if (title) industry.title = title.trim();
    if (description) industry.description = description.trim();
    if (typeof isVisible !== "undefined") {
      industry.isVisible = isVisible;
    }

    // 🖼️ Image optional on update
    if (req.file?.path) {
      industry.image = req.file.path;
    }

    await industry.save();

    res.status(200).json({
      success: true,
      message: "Industry updated successfully",
      data: industry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update industry",
      error: error.message,
    });
  }
};

// DELETE industry
export const deleteIndustry = async (req, res) => {
  try {
    const { id } = req.params;

    const industry = await Industry.findByIdAndDelete(id);
    if (!industry) {
      return res.status(404).json({
        success: false,
        message: "Industry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Industry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete industry",
      error: error.message,
    });
  }
};
