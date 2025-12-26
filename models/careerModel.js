import mongoose from "mongoose";

const careerPageSchema = new mongoose.Schema(
  {
    /* ================= HERO SECTION ================= */
    hero: {
      bannerTitle: {
        type: String,
        required: true,
        trim: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      subTitle: {
        type: String,
        required: true,
        trim: true,
      },
    },

    /* ================= CAREER CATEGORIES ================= */
    categories: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    /* ================= FAQ ================= */
    faqs: [
      {
        question: {
          type: String,
          required: true,
          trim: true,
        },
        answer: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const CareerPage = mongoose.model("CareerPage", careerPageSchema);
export default CareerPage;
