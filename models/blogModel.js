import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});

const blogSchema = new mongoose.Schema(
  {
    author: { type: String,  },
    date: { type: Date },
    title: { type: String, },
    category: { type: String },
    readTime: { type: Number },

    description1: { type: String },
    description2: { type: String },

    image1: imageSchema,
    image2: imageSchema,

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },

    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
