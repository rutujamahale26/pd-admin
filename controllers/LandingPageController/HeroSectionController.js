import HeroSection from '../../models/LandingPageModels/HeroSectionModel.js'

//  GET Hero Section
export const getHeroSection = async (req, res) => {
  try {
    const hero = await HeroSection.findOne();
    res.status(200).json({
      success: true,
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hero section",
      error: error.message,
    });
  }
};


// CREATE / UPDATE Hero Section (Single record)
export const upsertHeroSection = async (req, res) => {
  try {
    const { tagLine, mainTitle, description, ctaText } = req.body;

    // 🔐 Manual validations
    if (!tagLine || !mainTitle || !description || !ctaText) {
      return res.status(400).json({
        success: false,
        message: "All text fields are required",
      });
    }

    if (tagLine.length < 5 || mainTitle.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Tag line and title must be at least 5 characters long",
      });
    }

    if (description.length < 20) {
      return res.status(400).json({
        success: false,
        message: "Description must be at least 20 characters long",
      });
    }

    // 🖼️ Image validation
    const heroImage = req.file?.path;
    if (!heroImage) {
      return res.status(400).json({
        success: false,
        message: "Hero image is required",
      });
    }

    const existingHero = await HeroSection.findOne();
    let hero;

    if (existingHero) {
      // UPDATE
      existingHero.tagLine = tagLine.trim();
      existingHero.mainTitle = mainTitle.trim();
      existingHero.description = description.trim();
      existingHero.ctaText = ctaText.trim();
      existingHero.heroImage = heroImage;

      hero = await existingHero.save();
    } else {
      // CREATE
      hero = await HeroSection.create({
        tagLine,
        mainTitle,
        description,
        ctaText,
        heroImage,
      });
    }

    res.status(200).json({
      success: true,
      message: "Hero section saved successfully",
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save hero section",
      error: error.message,
    });
  }
};
