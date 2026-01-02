import { CaseStudy } from "../models/caseStudyModel.js";
import mongoose from 'mongoose';

// create case study
export const createCaseStudy = async (req, res) => {
  try {
    const {
      status = "draft",
      title,
      websiteUrl,
      description,
      projectName,
      year,
      clientName,
      duration,
      problemText,
      solutionText,
      challenge,
      summary,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const isPublished = status === "published";

    const newCaseStudy = new CaseStudy({
      status,
      visible: isPublished,

      title,
      websiteUrl,
      description,

      project: {
        name: projectName,
        year,
        clientName,
        duration,
      },

      mainImage: req.files?.mainImage?.[0]?.path || "",

      problem: {
        text: problemText,
        image: req.files?.problemImage?.[0]?.path || "",
      },

      solution: {
        text: solutionText,
        image: req.files?.solutionImage?.[0]?.path || "",
      },

      challenge,
      summary,
    });

    const savedCaseStudy = await newCaseStudy.save();

    res.status(201).json({
      success: true,
      message:
        status === "draft"
          ? "Case study draft saved successfully"
          : "Case study published successfully",
      data: savedCaseStudy,
    });
  } catch (error) {
    console.error("Create case study error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all case study
export const getCaseStudies = async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find().sort({ order: 1 , createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Case studies fetched successfully",
      count: caseStudies.length,
      data: caseStudies,
    });
  } catch (error) {
    console.error("Get case studies error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// get single case study
export const getCaseStudyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid case study ID",
      });
    }

    const caseStudy = await CaseStudy.findById(id);

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: "Case study not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Case study fetched successfully",
      data: caseStudy,
    });
  } catch (error) {
    console.error("Get case study error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// update case study
export const updateCaseStudy = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const caseStudy = await CaseStudy.findById(id);
    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: "Case study not found",
      });
    }

    // Status handling
    if (updates.status) {
      caseStudy.status = updates.status;
      caseStudy.visible = updates.status === "published";
    }

    if (updates.title) caseStudy.title = updates.title;
    if (updates.websiteUrl) caseStudy.websiteUrl = updates.websiteUrl;
    if (updates.description) caseStudy.description = updates.description;

    if (updates.projectName) caseStudy.project.name = updates.projectName;
    if (updates.year) caseStudy.project.year = updates.year;
    if (updates.clientName) caseStudy.project.clientName = updates.clientName;
    if (updates.duration) caseStudy.project.duration = updates.duration;

    if (updates.problemText) caseStudy.problem.text = updates.problemText;
    if (updates.solutionText) caseStudy.solution.text = updates.solutionText;

    if (updates.challenge) caseStudy.challenge = updates.challenge;
    if (updates.summary) caseStudy.summary = updates.summary;

    // Images (optional)
    if (req.files?.mainImage)
      caseStudy.mainImage = req.files.mainImage[0].path;

    if (req.files?.problemImage)
      caseStudy.problem.image = req.files.problemImage[0].path;

    if (req.files?.solutionImage)
      caseStudy.solution.image = req.files.solutionImage[0].path;

    const updatedCaseStudy = await caseStudy.save();

    res.status(200).json({
      success: true,
      message: "Case study updated successfully",
      data: updatedCaseStudy,
    });
  } catch (error) {
    console.error("Update case study error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// delete case study
export const deleteCaseStudy = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CaseStudy.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Case study not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Case study deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("Delete case study error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// reorder
export const reorderCaseStudies = async (req, res) => {
  try {
    const { order } = req.body;
    // order = [{ id, position }]

    const bulkOps = order.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.position } },
      },
    }));

    await CaseStudy.bulkWrite(bulkOps);

    res.json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reorder case studies" });
  }
};


