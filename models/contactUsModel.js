import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{8,15}$/, "Invalid phone number"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: 10,
    },
    attachment: {
      type: String, // file path or cloud URL
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
