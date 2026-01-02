import mongoose from "mongoose";

const industrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Industry title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Industry description is required"],
      minlength: 10,
      maxlength: 500,
    },
    image: {
      type: String, // Cloudinary URL
      required: [true, "Industry image is required"],
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Industry = mongoose.model("Industry", industrySchema);
export default Industry;
