import mongoose from "mongoose";

const heroSectionSchema = new mongoose.Schema(
  {
    tagLine: {
      type: String,
      required: [true, "Tag line is required"],
      trim: true,
      minlength: 5,
      maxlength: 150,
    },
    mainTitle: {
      type: String,
      required: [true, "Main title is required"],
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 20,
      maxlength: 1200,
    },
    ctaText: {
      type: String,
      required: [true, "CTA text is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    heroImage: {
      type: String, // Cloudinary URL
      required: [true, "Hero image is required"],
    },
  },
  { timestamps: true }
);

const HeroSection = mongoose.model("HeroSection", heroSectionSchema);

export default HeroSection; 
