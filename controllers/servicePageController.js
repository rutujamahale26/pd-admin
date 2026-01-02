import { Services } from "../models/servicesPageModel.js";
import { deleteFromCloudinary } from "../utils/cloudinaryHelper.js";

/* ================= SAVE SERVICES ================= */
export const saveServices = async (req, res) => {
  try {
    const {
      heroTitle,
      heroSubTitle,

      uiuxTitle,
      uiuxDescription,

      fullstackTitle,
      fullstackDescription,

      qaTitle,
      qaDescription,

      capabilities, // JSON string
      stats,        // JSON string
      isActive,
    } = req.body;

    /* 🔴 BASIC VALIDATION */
    if (!heroTitle || !heroSubTitle) {
      return res.status(400).json({ message: "Hero title and subtitle are required" });
    }

    if (!uiuxTitle || !uiuxDescription)
      return res.status(400).json({ message: "UI/UX section is required" });

    if (!fullstackTitle || !fullstackDescription)
      return res.status(400).json({ message: "Full-stack section is required" });

    if (!qaTitle || !qaDescription)
      return res.status(400).json({ message: "QA & Testing section is required" });

    const parsedCapabilities = capabilities ? JSON.parse(capabilities) : [];
    const parsedStats = stats ? JSON.parse(stats) : {};

    let services = await Services.findOne();
    if (!services) services = new Services();

    /* ================= SOLUTION IMAGES ================= */
    const uiuxImage = req.files?.uiuxImage?.[0];
    const fullstackImage = req.files?.fullstackImage?.[0];
    const qaImage = req.files?.qaImage?.[0];

    if (uiuxImage && services.solutions?.uiux?.image?.public_id) {
      await deleteFromCloudinary(services.solutions.uiux.image.public_id);
    }

    if (fullstackImage && services.solutions?.fullstack?.image?.public_id) {
      await deleteFromCloudinary(services.solutions.fullstack.image.public_id);
    }

    if (qaImage && services.solutions?.qa?.image?.public_id) {
      await deleteFromCloudinary(services.solutions.qa.image.public_id);
    }

    /* ================= CAPABILITY IMAGES ================= */
    const capabilityImages = req.files?.capabilityImages || [];

    const updatedCapabilities = parsedCapabilities.map((cap, index) => {
      const imageFile = capabilityImages[index];

      // delete old image if replaced
      if (imageFile && services.capabilities?.[index]?.image?.public_id) {
        deleteFromCloudinary(services.capabilities[index].image.public_id);
      }

      return {
        title: cap.title,
        image: imageFile
          ? { url: imageFile.path, public_id: imageFile.filename }
          : services.capabilities?.[index]?.image,
      };
    });

    /* ================= SAVE DATA ================= */
    services.hero = {
      title: heroTitle,
      subTitle: heroSubTitle,
    };

    services.solutions = {
      uiux: {
        title: uiuxTitle,
        description: uiuxDescription,
        image: uiuxImage
          ? { url: uiuxImage.path, public_id: uiuxImage.filename }
          : services.solutions?.uiux?.image,
      },
      fullstack: {
        title: fullstackTitle,
        description: fullstackDescription,
        image: fullstackImage
          ? { url: fullstackImage.path, public_id: fullstackImage.filename }
          : services.solutions?.fullstack?.image,
      },
      qa: {
        title: qaTitle,
        description: qaDescription,
        image: qaImage
          ? { url: qaImage.path, public_id: qaImage.filename }
          : services.solutions?.qa?.image,
      },
    };

    services.capabilities = updatedCapabilities;
    services.stats = parsedStats;
    services.isActive = isActive ?? true;

    await services.save();

    res.json({
      success: true,
      message: "Services page saved successfully",
      services,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


/* ================= ADMIN GET ================= */
export const getServicesAdmin = async (req, res) => {
  const services = await Services.findOne();
  res.json({
    success:true,
    message:"Services fetched successfully",
    data:services
  });
};

/* ================= WEBSITE GET ================= */
export const getServicesWebsite = async (req, res) => {
  const services = await Services.findOne({ isActive: true }).select(
    "-createdAt -updatedAt"
  );

  res.json({
    success: true,
    message:"Services fetched successfully",
    data:services,
  });
};
