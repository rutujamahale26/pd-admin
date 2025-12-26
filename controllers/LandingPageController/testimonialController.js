import Testimonial from "../../models/LandingPageModels/TestimonialModel.js";

// GET all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
      error: error.message,
    });
  }
};

// CREATE testimonial
export const createTestimonial = async (req, res) => {
  try {
    const {
      clientName,
      clientRole,
      rating,
      testimonialText,
      projectIndustry,
      projectDeliveryTime,
    } = req.body;

    // 🔴 Required field validations (field specific)
    if (!clientName) {
      return res.status(400).json({
        success: false,
        field: "clientName",
        message: "Client name is required",
      });
    }

    if (!clientRole) {
      return res.status(400).json({
        success: false,
        field: "clientRole",
        message: "Client role is required",
      });
    }

    if (!rating) {
      return res.status(400).json({
        success: false,
        field: "rating",
        message: "Rating is required",
      });
    }

    if (!testimonialText) {
      return res.status(400).json({
        success: false,
        field: "testimonialText",
        message: "Testimonial text is required",
      });
    }

    if (!projectIndustry) {
      return res.status(400).json({
        success: false,
        field: "projectIndustry",
        message: "Project industry is required",
      });
    }

    if (!projectDeliveryTime) {
      return res.status(400).json({
        success: false,
        field: "projectDeliveryTime",
        message: "Project delivery time is required",
      });
    }

    // ⭐ Rating validation
    const parsedRating = Number(rating);

    if (Number.isNaN(parsedRating)) {
      return res.status(400).json({
        success: false,
        field: "rating",
        message: "Rating must be a number",
      });
    }

    if (parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({
        success: false,
        field: "rating",
        message: "Rating must be between 1 and 5",
      });
    }

    // 📝 Testimonial length
    if (testimonialText.length < 20) {
      return res.status(400).json({
        success: false,
        field: "testimonialText",
        message: "Testimonial text must be at least 20 characters",
      });
    }

    // 🖼️ Image validation
    const image = req.file?.path;
    if (!image) {
      return res.status(400).json({
        success: false,
        field: "image",
        message: "Client image is required",
      });
    }

    const testimonial = await Testimonial.create({
      clientName: clientName.trim(),
      clientRole: clientRole.trim(),
      rating: parsedRating,
      testimonialText: testimonialText.trim(),
      projectIndustry: projectIndustry.trim(),
      projectDeliveryTime: projectDeliveryTime.trim(),
      image,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create testimonial",
      error: error.message,
    });
  }
};

// UPDATE testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const {
      clientName,
      clientRole,
      rating,
      testimonialText,
      projectIndustry,
      projectDeliveryTime,
    } = req.body;

    if (clientName) testimonial.clientName = clientName.trim();
    if (clientRole) testimonial.clientRole = clientRole.trim();
    if (testimonialText) testimonial.testimonialText = testimonialText.trim();
    if (projectIndustry) testimonial.projectIndustry = projectIndustry.trim();
    if (projectDeliveryTime)
      testimonial.projectDeliveryTime = projectDeliveryTime.trim();

    if (rating) {
      const parsedRating = Number(rating);
      if (parsedRating < 1 || parsedRating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5",
        });
      }
      testimonial.rating = parsedRating;
    }

    // 🖼️ Image optional on update
    if (req.file?.path) {
      testimonial.image = req.file.path;
    }

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
      error: error.message,
    });
  }
};

//  DELETE testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
      error: error.message,
    });
  }
};
