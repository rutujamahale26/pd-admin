import Job from "../models/JobModel.js";

// PUBLIC – Get active jobs (Career page)
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, message:"All active Jobs fetched successfully", count:jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADMIN – Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, message:"Jobs fetched successfully", count:jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADMIN – Create job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      description,
      category,
      jobType,
      workMode,
      experience,
      location,
      payment,
    } = req.body;

    // 🔐 Field-wise validation
    if (!title)
      return res.status(400).json({ field: "title", message: "Job title is required" });

    if (!subTitle)
      return res.status(400).json({ field: "subTitle", message: "Job sub-title is required" });


    if (!description)
      return res.status(400).json({ field: "description", message: "Description is required" });

    if (!category)
      return res.status(400).json({ field: "category", message: "Category is required" });

    if (!jobType)
      return res.status(400).json({ field: "jobType", message: "Job type is required" });

    if (!workMode)
      return res.status(400).json({ field: "workMode", message: "Work mode is required" });

    if (!experience)
      return res.status(400).json({ field: "experience", message: "Experience is required" });

    if (!payment)
      return res.status(400).json({ field: "payment", message: "Payment is required" });


    const job = await Job.create({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      jobType,
      workMode,
      experience: experience.trim(),
      location: location?.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADMIN – Update job
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    Object.assign(job, req.body);
    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADMIN – Toggle job status (Open / Closed)
export const toggleJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.isActive = !job.isActive;
    await job.save();

    res.status(200).json({
      success: true,
      message: `Job ${job.isActive ? "activated" : "deactivated"}`,
      data: job,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADMIN – Delete job
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
