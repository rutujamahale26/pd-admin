import Job from "../models/JobModel.js";

// PUBLIC – Get active jobs (Career page)
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    res
      .status(200)
      .json({
        success: true,
        message: "All active Jobs fetched successfully",
        count: jobs.length,
        data: jobs,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADMIN – Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({
        success: true,
        message: "Jobs fetched successfully",
        count: jobs.length,
        data: jobs,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADMIN – Create job
export const createJob = async (req, res) => {
  
  try {
    console.log("📥 CREATE JOB BODY:", req.body);
    const {
      status = "draft",
      title,
      category,
      subTitle,
      description,
      jobType,
      location,
      payment,
      isActive = true,
    } = req.body;

    // Validation
    if (!title)
      return res
        .status(400)
        .json({ field: "title", message: "Job title is required" });

    if (!subTitle)
      return res
        .status(400)
        .json({ field: "subTitle", message: "Job sub-title is required" });

    if (!description)
      return res
        .status(400)
        .json({ field: "description", message: "Description is required" });

    if (!jobType)
      return res
        .status(400)
        .json({ field: "jobType", message: "Job type is required" });

    if (!payment)
      return res
        .status(400)
        .json({ field: "payment", message: "Payment is required" });

    const job = await Job.create({
      title: title.trim(),
      category: category.trim(),
      subTitle: subTitle.trim(),
      description: description.trim(),
      jobType: jobType.trim(),
      location: location?.trim(),
      payment: payment.trim(),
      isActive: status === "published",
      status,
    });

    res.status(201).json({
      success: true,
      message:
        status === "draft"
          ? "Job draft saved successfully"
          : "Job published successfully",
      data: job,
    });
  } catch (error) {
    console.error("JOB CREATE ERROR:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
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
    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
