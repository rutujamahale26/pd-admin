import { AboutUs } from "../models/aboutUsModel.js";
import { deleteFromCloudinary } from "../utils/cloudinaryHelper.js";

//  CREATE / UPDATE ABOUT US (ONE SAVE BUTTON)

// export const saveAboutUs = async (req, res) => {
//   try {
//     let aboutUs = await AboutUs.findOne();

//     const heroImageFile = req.files?.heroImage?.[0];

//     let heroImage = aboutUs?.hero?.image || {};

//     // 🔥 Replace hero image if new one uploaded
//     if (heroImageFile) {
//       if (heroImage.public_id) {
//         await deleteFromCloudinary(heroImage.public_id);
//       }

//       heroImage = {
//         url: heroImageFile.path,
//         public_id: heroImageFile.filename,
//       };
//     }

//     const payload = {
//       hero: {
//         title: req.body.heroTitle,
//         subTitle: req.body.heroSubTitle,
//         ctaText1: req.body.ctaText1,
//         ctaText2: req.body.ctaText2,
//         image: heroImage,
//       },

//       vision: req.body.vision ? JSON.parse(req.body.vision) : aboutUs?.vision || [],
//       coreValues: req.body.coreValues
//         ? JSON.parse(req.body.coreValues)
//         : aboutUs?.coreValues || [],
//       leadershipTeam: req.body.leadershipTeam
//         ? JSON.parse(req.body.leadershipTeam)
//         : aboutUs?.leadershipTeam || [],
//       stats: req.body.stats ? JSON.parse(req.body.stats) : aboutUs?.stats || {},
//     };

//     aboutUs = aboutUs
//       ? await AboutUs.findByIdAndUpdate(aboutUs._id, payload, { new: true })
//       : await AboutUs.create(payload);

//     res.status(200).json({
//       success: true,
//       message: "About Us page saved successfully",
//       data: aboutUs,
//     });
//   } catch (error) {
//     console.error("Save About Us error:", error.message);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const saveAboutUs = async (req, res) => {
  try {
    console.log("➡️ saveAboutUs called");
    console.log("Files received:", Object.keys(req.files || {}));

     // 🔥 ADD THIS BLOCK
    const filesMap = {};
    (req.files || []).forEach((file) => {
      filesMap[file.fieldname] = file;
    });

    console.log("Mapped files:", Object.keys(filesMap));

    let aboutUs = await AboutUs.findOne();

    /* ---------------- HERO IMAGE ---------------- */
    let heroImage = aboutUs?.hero?.image || {};
    const heroFile = filesMap["heroImage"];

    if (heroFile) {
      if (heroImage.public_id) {
        await deleteFromCloudinary(heroImage.public_id);
      }

      heroImage = {
        url: heroFile.path,
        public_id: heroFile.filename,
      };
    }

    /* ---------------- VISION ---------------- */
    let vision = req.body.vision
      ? JSON.parse(req.body.vision)
      : aboutUs?.vision || [];

    for (let i = 0; i < vision.length; i++) {
      const file = filesMap[`visionImage_${i}`];

      if (file) {
        if (vision[i]?.image?.public_id) {
          await deleteFromCloudinary(vision[i].image.public_id);
        }

        vision[i].image = {
          url: file.path,
          public_id: file.filename,
        };
      }
    }

    /* ---------------- CORE VALUES ---------------- */
    let coreValues = req.body.coreValues
      ? JSON.parse(req.body.coreValues)
      : aboutUs?.coreValues || [];

    for (let i = 0; i < coreValues.length; i++) {
      const file = filesMap[`coreImage_${i}`];

      if (file) {
        if (coreValues[i]?.image?.public_id) {
          await deleteFromCloudinary(coreValues[i].image.public_id);
        }

        coreValues[i].image = {
          url: file.path,
          public_id: file.filename,
        };
      }
    }

    /* ---------------- LEADERSHIP TEAM ---------------- */
    let leadershipTeam = req.body.leadershipTeam
      ? JSON.parse(req.body.leadershipTeam)
      : aboutUs?.leadershipTeam || [];

    for (let i = 0; i < leadershipTeam.length; i++) {
      const file = filesMap[`teamImage_${i}`];;

      if (file) {
        if (leadershipTeam[i]?.image?.public_id) {
          await deleteFromCloudinary(leadershipTeam[i].image.public_id);
        }

        leadershipTeam[i].image = {
          url: file.path,
          public_id: file.filename,
        };
      }
    }

    /* ---------------- FINAL PAYLOAD ---------------- */
    const payload = {
      hero: {
        title: req.body.heroTitle,
        subTitle: req.body.heroSubTitle,
        ctaText1: req.body.ctaText1,
        ctaText2: req.body.ctaText2,
        image: heroImage,
      },
      vision,
      coreValues,
      leadershipTeam,
      stats: req.body.stats ? JSON.parse(req.body.stats) : aboutUs?.stats || {},
    };

    aboutUs = aboutUs
      ? await AboutUs.findByIdAndUpdate(aboutUs._id, payload, { new: true })
      : await AboutUs.create(payload);

    res.status(200).json({
      success: true,
      message: "About Us updated successfully",
      data: aboutUs,
    });
  } catch (error) {
    console.error("Save About Us error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//   GET ABOUT US
export const getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne();

    res.status(200).json({
      success: true,
      data: aboutUs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//   ADD JOURNEY ITEM
export const addJourney = async (req, res) => {
  try {
    const { title, year } = req.body;

    if (!title || !year) {
      return res.status(400).json({
        success: false,
        message: "Title and year are required",
      });
    }

    if (!/^\d{4}$/.test(year)) {
      return res.status(400).json({
        success: false,
        message: "Year must be a valid 4-digit year",
      });
    }

    const aboutUs = await AboutUs.findOne();
    if (!aboutUs) {
      return res.status(404).json({
        success: false,
        message: "About Us not found",
      });
    }

    aboutUs.journey.push({ title, year });
    await aboutUs.save();

    res.status(200).json({
      success: true,
      message: "Journey added successfully",
      data: aboutUs.journey,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  ❌ DELETE JOURNEY ITEM

export const deleteJourney = async (req, res) => {
  try {
    const { journeyId } = req.params;

    const aboutUs = await AboutUs.findOne();
    if (!aboutUs) {
      return res.status(404).json({
        success: false,
        message: "About Us not found",
      });
    }

    aboutUs.journey = aboutUs.journey.filter(
      (item) => item._id.toString() !== journeyId
    );

    await aboutUs.save();

    res.status(200).json({
      success: true,
      message: "Journey deleted successfully",
      data: aboutUs.journey,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
