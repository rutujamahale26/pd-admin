import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
  },
  { _id: false }
);

const capabilitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: imageSchema, // 👈 capability image
  },
  { _id: false }
);

const servicesSchema = new mongoose.Schema(
  {
    /* ================= HERO ================= */
    hero: {
      title: { type: String, required: true, trim: true },
      subTitle: { type: String, required: true, trim: true },
    },

    /* ================= SOLUTIONS ================= */
    solutions: {
      uiux: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: imageSchema,
      },
      fullstack: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: imageSchema,
      },
      qa: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: imageSchema,
      },
    },

    /* ================= CAPABILITIES ================= */
    capabilities: [capabilitySchema],

    /* ================= STATS ================= */
    stats: {
      discoverySteps: { type: Number, default: 0 },
      coreIndustries: { type: Number, default: 0 },
      projectsDelivered: { type: Number, default: 0 },
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Services = mongoose.model("Services", servicesSchema);
