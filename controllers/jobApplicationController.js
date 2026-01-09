import JobApplication from "../models/JobApplicationModel.js";
import Job from "../models/JobModel.js";
import transporter from "../utils/sendEmail.js";
import { uploadBufferToCloudinary } from "../utils/uploadToCloudinary.js";

// export const applyForJob = async (req, res) => {
//   try {
//     const {
//       jobId,
//       name,
//       email,
//       phone,
//       company,
//       portfolioLink,
//       linkedinLink,
//     } = req.body;

//     // ---------- VALIDATIONS ----------
//     if (!jobId)
//       return res.status(400).json({ field: "jobId", message: "Job ID is required" });

//     if (!name)
//       return res.status(400).json({ field: "name", message: "Name is required" });

//     if (!email)
//       return res.status(400).json({ field: "email", message: "Email is required" });

//     if (!phone)
//       return res.status(400).json({ field: "phone", message: "Phone number is required" });

//     // const resume = req.file?.path;
//     // if (!resume)
//     //   return res.status(400).json({ field: "resume", message: "Resume is required" });

//     let cloudinaryFile = null;

//         if (req.file) {
//           cloudinaryFile = await uploadBufferToCloudinary(
//             req.file.buffer,
//             `${Date.now()}-${req.file.originalname.split(".")[0]}`
//           );
//         }

//     // ---------- JOB ----------
//     const job = await Job.findById(jobId);
//     if (!job)
//       return res.status(404).json({ message: "Job not found" });

//     // ---------- SAVE ----------
//     const application = await JobApplication.create({
//       jobId,
//       name: name.trim(),
//       email: email.trim(),
//       phone: phone.trim(),
//       company: company?.trim(),
//       portfolioLink: portfolioLink?.trim(),
//       linkedinLink: linkedinLink?.trim(),
//       resume:cloudinaryFile?.secure_url || null,
//     });

//     // ---------- EMAIL → HR ----------
//     // await transporter.sendMail({
//     //   from: process.env.MAIL_USER,
//     //   to: process.env.HR_EMAIL,
//     //   subject: `New Application – ${job.title}`,
//     //   template: "job-application",
//     //   context: {
//     //     isHR: true,
//     //     headerTitle: "New Job Application",
//     //     name,
//     //     email,
//     //     phone,
//     //     company,
//     //     portfolioLink,
//     //     linkedinLink,
//     //      resume: cloudinaryFile?.secure_url || null,
//     //     jobTitle: job.title,
//     //     year: new Date().getFullYear(),
//     //   },
//     // });
//     await transporter.sendMail({
//   from: process.env.MAIL_USER,
//   to: process.env.HR_EMAIL,
//   subject: `New Application – ${job.title}`,
//   template: "job-application",
//   context: {
//     isHR: true,
//     headerTitle: "New Job Application",
//     name,
//     email,
//     phone,
//     company,
//     portfolioLink,
//     linkedinLink,
//     jobTitle: job.title,
//     year: new Date().getFullYear(),
//   },
//   attachments : req.file
//     ? [
//         {
//           filename: req.file.originalname,   // 👈 resume.pdf
//           content: req.file.buffer,           // 👈 actual file
//           contentType: req.file.mimetype,     // 👈 application/pdf
//         },
//       ]
//     : [],
// });

//     // ---------- EMAIL → USER ----------
//     await transporter.sendMail({
//       from: process.env.MAIL_USER,
//       to: email,
//       subject: "Thank you for applying",
//       template: "Job-ty",
//       context: {
//         name,
//         jobTitle: job.title,
//         year: new Date().getFullYear(),
//       },
//     });

//     res.status(201).json({
//       success: true,
//       message: "Application submitted successfully",
//       data: application,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to submit application",
//       error: error.message,
//     });
//   }
// };

export const applyForJob = async (req, res) => {
  try {
    const { jobId, name, email, phone, company, portfolioLink, linkedinLink } =
      req.body;

    if (!jobId || !name || !email || !phone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    let resumeUrl = null;
    if (req.file) {
      const upload = await uploadBufferToCloudinary(
        req.file.buffer,
        Date.now().toString()
      );
      resumeUrl = upload.secure_url;
    }

    const application = await JobApplication.create({
      jobId,
      name,
      email,
      phone,
      company,
      portfolioLink,
      linkedinLink,
      resume: resumeUrl,
    });

    // ✅ RESPOND FIRST
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
    });

    // 🔥 SEND EMAILS AFTER RESPONSE
    transporter.sendMail({
      to: process.env.HR_EMAIL,
      subject: `New Application – ${job.title}`,
      template: "job-application",
      context: { name, email, phone, jobTitle: job.title },
    });

    transporter.sendMail({
      to: email,
      subject: "Thank you for applying",
      template: "Job-ty",
      context: { name, jobTitle: job.title },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit application" });
  }
};
