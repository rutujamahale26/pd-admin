import mongoose from "mongoose";

const expertiseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 10,
      maxlength: 500,
    },
    image: {
      type: String, // Cloudinary URL
      required: [true, "Image is required"],
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

const Expertise = mongoose.model("Expertise", expertiseSchema);
export default Expertise;
