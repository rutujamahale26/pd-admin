import ContactPageModel from "../models/ContactPageModel.js";

/* ================= GET PAGE ================= */
export const getContactPage = async (req, res) => {
  try {
    const page = await ContactPageModel.findOne();
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= SAVE PAGE ================= */
export const saveContactPage = async (req, res) => {
  try {
    /* ---------- SAFE JSON PARSE ---------- */
    let hero, coreValues, faqs;

    try {
      hero =
        typeof req.body.hero === "string"
          ? JSON.parse(req.body.hero)
          : req.body.hero;

      coreValues =
        typeof req.body.coreValues === "string"
          ? JSON.parse(req.body.coreValues)
          : req.body.coreValues;

      faqs =
        typeof req.body.faqs === "string"
          ? JSON.parse(req.body.faqs)
          : req.body.faqs || [];
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format in request body",
      });
    }

    /* ---------- HERO VALIDATION ---------- */
    if (!hero?.title || !hero?.ctaText || !hero?.subtitle) {
      return res.status(400).json({
        field: "hero",
        message: "Hero title, sub-title and CTA text are required",
      });
    }

    /* ---------- CORE VALUES VALIDATION ---------- */
    if (!Array.isArray(coreValues) || coreValues.length !== 4) {
      return res.status(400).json({
        field: "coreValues",
        message: "Exactly 4 core values are required",
      });
    }

    /* ---------- CORE VALUES IMAGE + DATA ---------- */
    const updatedCoreValues = coreValues.map((item, index) => {
      const uploadedImage = req.files?.[`coreImage${index}`]?.[0]?.path;

      if (!item.title || !item.tagLine || !item.description) {
        throw new Error(`Core value fields missing at index ${index}`);
      }

      if (!uploadedImage && !item.image) {
        throw new Error(`Core value image missing at index ${index}`);
      }

      return {
        title: item.title,
        tagLine: item.tagLine,
        description: item.description,
        image: uploadedImage || item.image,
      };
    });

    /* ---------- UPSERT (SINGLE PAGE) ---------- */
    const page = await ContactPageModel.findOneAndUpdate(
      {},
      {
        hero: {
          title: hero.title,
          subtitle: hero.subtitle,
          ctaText: hero.ctaText,
        },
        coreValues: updatedCoreValues,
        faqs: Array.isArray(faqs) ? faqs : [],
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Contact page saved successfully",
      data: page,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= ADD FAQ ================= */
export const addFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "FAQ question and answer are required",
      });
    }

    const page = await ContactPageModel.findOne();
    if (!page) {
      return res.status(404).json({ message: "Save page first" });
    }

    page.faqs.push({
      question: question,
      answer: answer,
    });

    await page.save();

    res.status(201).json({
      success: true,
      message: "FAQ added successfully",
      data: page.faqs,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE FAQ ================= */
export const deleteFaq = async (req, res) => {
  try {
    const { faqId } = req.params;

    const page = await ContactPageModel.findOne();
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    page.faqs = page.faqs.filter(
      (faq) => faq._id.toString() !== faqId
    );

    await page.save();

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
      data: page.faqs,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
