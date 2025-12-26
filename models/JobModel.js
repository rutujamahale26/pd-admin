import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      minlength: 3,
      maxlength: 1000,
    },

    subTitle: {
      type: String,
      maxlength: 200,
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      minlength: 20,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    jobType: {
      type: String,
      required: true,
    },

    workMode: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: [true, "Experience is required"], // e.g. "0–2 years"
    },

    location: {
      type: String,
    },

    payment: {
      type: String, // e.g. "3000 - 4500" or "$50/hr"
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true, // only active jobs visible on website
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
