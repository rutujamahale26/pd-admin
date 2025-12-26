import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    clientRole: {
      type: String,
      required: [true, "Client role is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    testimonialText: {
      type: String,
      required: [true, "Testimonial text is required"],
      minlength: 20,
      maxlength: 1000,
    },
    projectIndustry: {
      type: String,
      required: [true, "Project industry is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    projectDeliveryTime: {
      type: String,
      required: [true, "Project delivery time is required"],
      trim: true,
      maxlength: 50,
    },
    image: {
      type: String, // Cloudinary URL
      required: [true, "Client image is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
