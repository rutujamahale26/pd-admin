import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job ID is required"],
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [
        /^[0-9+\-\s]{7,20}$/,
        "Please provide a valid phone number",
      ],
    },

    company: {
      type: String,
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },

    portfolioLink: {
      type: String,
      trim: true,
      // match: [
      //   /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
      //   "Please provide a valid portfolio URL",
      // ],
    },

    linkedinLink: {
      type: String,
      trim: true,
      // match: [
      //   /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
      //   "Please provide a valid LinkedIn profile URL",
      // ],
    },

    // resume: {
    //   type: String, // Cloudinary URL
    //   required: [true, "Resume is required"],
    // },
  },
  { timestamps: true }
);

export default mongoose.model("JobApplication", jobApplicationSchema);
