import mongoose from "mongoose";

const imageSchema = {
  url: String,
  public_id: String,
};

const journeySchema = new mongoose.Schema(
  {
    title: String,
    year: String,
    description: String,
  },
  { _id: true }
);

const aboutUsSchema = new mongoose.Schema(
  {
    hero: {
      title: String,
      subTitle: String,
      ctaText1: String,
      ctaText2: String,
      image: imageSchema,
    },

    vision: [
      {
        title: String,
        description: String,
        image: imageSchema,
      },
    ],

    coreValues: [
      {
        title: String,
        image: imageSchema,
      },
    ],

    journey: [journeySchema],

    leadershipTeam: [
      {
        name: String,
        role: String,
        description: String,
        image: imageSchema,
      },
    ],

    stats: {
      happyClients: Number,
      projectsDelivered: Number,
      teamMembers: Number,
    },
  },
  { timestamps: true }
);

export const AboutUs = mongoose.model("AboutUs", aboutUsSchema);
