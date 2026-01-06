import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
    },

    subTitle: {
      type: String,
       required: [true, "Job sub-title is required"],
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
    },

    // category: {
    //   type: String,
    // },

    jobType: {
      type: String,
      required: true,
    },

    workMode: {
      type: String,
    },

    // experience: {
    //   type: String,
    // },

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
    status: {
  type: String,
  enum: ["draft", "published"],
  default: "draft",
}

  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
