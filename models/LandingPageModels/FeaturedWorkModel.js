import mongoose from "mongoose";

const featuredWorkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    externalLink: {
      type: String,
      required: [true, "External link is required"],
      trim: true,
      match: [
        /^(https?:\/\/)/,
        "External link must be a valid URL",
      ],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 10,
      maxlength: 500,
    },
    laptopImage: {
      type: String,
      required: [true, "Laptop image is required"],
    },
    phoneImage: {
      type: String,
      required: [true, "Phone image is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const FeaturedWork = mongoose.model("FeaturedWork", featuredWorkSchema);
export default FeaturedWork;
