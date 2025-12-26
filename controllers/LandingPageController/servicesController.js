import Service from "../../models/LandingPageModels/ServicesModel.js";

/**
 * GET all services
 */
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

/**
 * CREATE service
 */
export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

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
        message: "Title must be at least 3 characters",
      });
    }

    if (description.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Description must be at least 10 characters",
      });
    }

    const image = req.file?.path;
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Service image is required",
      });
    }

    const service = await Service.create({
      title: title.trim(),
      description: description.trim(),
      image,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};

/**
 * UPDATE service
 */
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    if (title) service.title = title.trim();
    if (description) service.description = description.trim();

    // 🖼️ Image optional on update
    if (req.file?.path) {
      service.image = req.file.path;
    }

    await service.save();

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update service",
      error: error.message,
    });
  }
};

/**
 * DELETE service
 */
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete service",
      error: error.message,
    });
  }
};
