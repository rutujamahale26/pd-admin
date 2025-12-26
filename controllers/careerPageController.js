import CareerPage from "../models/careerModel.js";


// CREATE / UPDATE CAREER PAGE (Single document)
export const saveCareerPage = async (req, res) => {
  try {
    const { hero, categories, faqs } = req.body;
    /* ===== HERO VALIDATION ===== */
    if (!hero?.bannerTitle)
      return res.status(400).json({ field: "bannerTitle", message: "Banner title is required" });

    if (!hero?.title)
      return res.status(400).json({ field: "title", message: "Hero title is required" });

    if (!hero?.subTitle)
      return res.status(400).json({ field: "subTitle", message: "Hero sub-title is required" });

    /* ===== CATEGORY VALIDATION ===== */
    if (categories && !Array.isArray(categories)) {
      return res.status(400).json({ message: "Categories must be an array" });
    }

    if (categories) {
      for (const cat of categories) {
        if (!cat.title) {
          return res.status(400).json({ message: "Each category must have a title" });
        }
      }
    }

    /* ===== FAQ VALIDATION ===== */
    if (faqs && !Array.isArray(faqs)) {
      return res.status(400).json({ message: "FAQs must be an array" });
    }

    if (faqs) {
      for (const faq of faqs) {
        if (!faq.question || !faq.answer) {
          return res
            .status(400)
            .json({ message: "Each FAQ must have question and answer" });
        }
      }
    }

    /* ===== SAVE / UPDATE ===== */
    let page = await CareerPage.findOne();

    const payload = {
      hero,
      categories: categories || [],
      faqs: faqs || [],
    };

    page = page
      ? await CareerPage.findByIdAndUpdate(page._id, payload, { new: true })
      : await CareerPage.create(payload);

    res.status(200).json({
      success: true,
      message: "Career page saved successfully",
      data: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET CAREER PAGE (Admin / Website)
export const getCareerPage = async (req, res) => {
  try {
    const page = await CareerPage.findOne();
    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ADD CATEGORY
export const addCategory = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title)
      return res.status(400).json({ field: "title", message: "Category title is required" });

    const page = await CareerPage.findOne();
    if (!page) return res.status(404).json({ message: "Career page not found" });

    page.categories.push({ title });
    await page.save();

    res.status(201).json({
      success: true,
      message: "Category added",
      data: page.categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADD FAQ
export const addFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question)
      return res.status(400).json({ field: "question", message: "Question is required" });

    if (!answer)
      return res.status(400).json({ field: "answer", message: "Answer is required" });

    const page = await CareerPage.findOne();
    if (!page) return res.status(404).json({ message: "Career page not found" });

    page.faqs.push({ question, answer });
    await page.save();

    res.status(201).json({
      success: true,
      message: "FAQ added",
      data: page.faqs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE CATEGORY 
export const deleteCategory = async (req, res) => {
  const page = await CareerPage.findOne();
  page.categories.splice(req.params.index, 1);
  await page.save();
  res.json({ success: true, message: "Category deleted" });
};

// delete faq
export const deleteFaq = async (req, res) => {
  const page = await CareerPage.findOne();
  page.faqs.splice(req.params.index, 1);
  await page.save();
  res.json({ success: true, message: "FAQ deleted" });
};
