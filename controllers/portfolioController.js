import { Portfolio } from "../models/portfolioModel.js";
import { deleteFromCloudinary } from "../utils/cloudinaryHelper.js";

// CREATE / UPDATE PORTFOLIO (Single document)
export const savePortfolio = async (req, res) => {
  try {
    const { title, subtitle, categories } = req.body;

    /* ================= INLINE VALIDATION ================= */
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!subtitle) {
      return res.status(400).json({ message: "Subtitle is required" });
    }

    let parsedCategories = [];
    if (categories) {
      try {
        parsedCategories = JSON.parse(categories);

        if (!Array.isArray(parsedCategories)) {
          return res
            .status(400)
            .json({ message: "Categories must be an array" });
        }

        for (let cat of parsedCategories) {
          if (!cat.title) {
            return res
              .status(400)
              .json({ message: "Each category must have a title" });
          }

          if (cat.active !== undefined && typeof cat.active !== "boolean") {
            return res
              .status(400)
              .json({ message: "Category active must be boolean" });
          }
        }
      } catch (err) {
        return res.status(400).json({ message: "Invalid categories JSON" });
      }
    }

    /* ================= IMAGE HANDLING ================= */
    let portfolio = await Portfolio.findOne();
    const imageFile = req.file;

    let mainImage = portfolio?.mainImage || {};

    if (imageFile) {
      if (mainImage.public_id) {
        await deleteFromCloudinary(mainImage.public_id);
      }

      mainImage = {
        url: imageFile.path,
        public_id: imageFile.filename,
      };
    }

    /* ================= SAVE / UPDATE ================= */
    const payload = {
      title,
      subtitle,
      mainImage,
      categories: parsedCategories,
    };

    if (portfolio) {
      portfolio = await Portfolio.findByIdAndUpdate(portfolio._id, payload, {
        new: true,
      });
    } else {
      portfolio = await Portfolio.create(payload);
    }

    res.status(200).json({
      success: true,
      message: "Portfolio saved successfully",
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//  GET PORTFOLIO (Admin / Website)
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add category
export const addCategory = async (req, res) => {
  try {
    const { title, active } = req.body;

    /* ===== Validation ===== */
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Category title is required" });
    }

    if (active !== undefined && typeof active !== "boolean") {
      return res.status(400).json({ message: "Active must be boolean" });
    }

    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    portfolio.categories.push({
      title,
      active: active ?? true,
    });

    await portfolio.save();

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: portfolio.categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE CATEGORY BY INDEX
export const deleteCategory = async (req, res) => {
  try {
    const { index } = req.params;

    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (isNaN(index) || index < 0 || index >= portfolio.categories.length) {
      return res.status(400).json({ message: "Invalid category index" });
    }

    portfolio.categories.splice(index, 1);
    await portfolio.save();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
