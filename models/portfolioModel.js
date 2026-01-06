import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      required: true,
      trim: true,
    },

    cta1: {
      type: String,
      trim: true,
      default: "",
    },

    cta2: {
      type: String,
      trim: true,
      default: "",
    },

    /* ================= MAIN IMAGE ================= */
    mainImage: {
      url: { type: String },
      public_id: { type: String },
    },

    /* ================= CASE STUDY CATEGORIES ================= */
    categories: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
