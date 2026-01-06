import mongoose from "mongoose";

const imageSchema = {
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
};

const journeySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Journey title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      match: [/^\d{4}$/, "Year must be a valid 4-digit year"],
    }
  },
  { _id: true }
);

const aboutUsSchema = new mongoose.Schema(
  {
    /* ---------------- HERO ---------------- */
    hero: {
      title: {
        type: String,
        required: [true, "Hero title is required"],
        trim: true,
        minlength: 3,
      },
      subTitle: {
        type: String,
        required: [true, "Hero subtitle is required"],
        trim: true,
      },
      ctaText1: {
        type: String,
        required: [true, "CTA text 1 is required"],
      },
      ctaText2: {
        type: String,
        required: [true, "CTA text 2 is required"],
      },
      image: {
        type: imageSchema,
        required: false
      },
    },

    /* ---------------- VISION ---------------- */
    vision: [
      {
        title: {
          type: String,
          required: [true, "Vision title is required"],
        },
        description: {
          type: String,
          required: [true, "Vision description is required"],
          minlength: 10,
        },
        image: {
          type: imageSchema,
          required: false,
        },
      },
    ],

    /* ---------------- CORE VALUES ---------------- */
    coreValues: [
      {
        title: {
          type: String,
          required: [true, "Core value title is required"],
        },
        image: {
          type: imageSchema,
          required: false,
        },
      },
    ],

    /* ---------------- JOURNEY ---------------- */
    journey: {
      type: [journeySchema],
      default: [],
    },

    /* ---------------- LEADERSHIP TEAM ---------------- */
    leadershipTeam: [
      {
        name: {
          type: String,
          required: [true, "Leader name is required"],
        },
        role: {
          type: String,
          required: [true, "Leader role is required"],
        },
        description: {
          type: String,
          required: [true, "Leader description is required"],
          minlength: 10,
        },
        image: {
          type: imageSchema,
          required: false,
        },
      },
    ],

    /* ---------------- STATS ---------------- */
    stats: {
      happyClients: {
        type: Number,
        min: [0, "Happy clients cannot be negative"],
        required: true,
      },
      projectsDelivered: {
        type: Number,
        min: [0, "Projects cannot be negative"],
        required: true,
      },
      teamMembers: {
        type: Number,
        min: [0, "Team members cannot be negative"],
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const AboutUs = mongoose.model("AboutUs", aboutUsSchema);
