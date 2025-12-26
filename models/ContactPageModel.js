import mongoose from "mongoose";

const contactPageSchema = new mongoose.Schema(
  {
    /* ================= HERO ================= */
    hero: {
      title: { type: String, required: true,  minlength: 5 },
      subtitle: { type: String,  },
      ctaText: { type: String, required: true, },
      // image: { type: String, required: true }, // Cloudinary URL
    },

    /* ================= CORE VALUES (4 FIELDS) ================= */
    coreValues: {
      type: [
        {
          image: {
            type: String,
            required: true, // 1️⃣ image
          },
          title: {
            type: String,
            required: true, // 2️⃣ title
            minlength: 2,
            maxlength: 100,
          },
          tagLine: {
            type: String,
            required: true, // 3️⃣ tagLine / short text
            minlength: 2,
            maxlength: 150,
          },
          description: {
            type: String,
            required: true, // 4️⃣ description
            minlength: 10,
            maxlength: 300,
          },
        },
      ],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length === 4,
        message: "Exactly 4 core values are required",
      },
      required: true,
    },

    /* ================= FAQ ================= */
    faqs: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactPage", contactPageSchema);
