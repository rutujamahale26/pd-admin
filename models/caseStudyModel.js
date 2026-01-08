import mongoose from "mongoose";

const caseStudySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft", // 👈 SAVE DRAFT default
    },

    visible: {
      type: Boolean,
      default: false, // 👈 draft is not visible
    },

    order: {
      type: Number,
      default: 0,
    },

    title: String,
    websiteUrl: String,
    description: String,

    category: {
      type: String, // ✅ flexible category
      trim: true, // ❌ no enum
    },
    project: {
      name: String,
      year: String,
      clientName: String,
      duration: String,
    },

    mainImage: String,

    problem: {
      text: String,
      image: String,
    },

    solution: {
      text: String,
      image: String,
    },

    challenge: String,
    summary: String,
  },
  { timestamps: true }
);

export const CaseStudy = mongoose.model("CaseStudy", caseStudySchema);
