import Contact from "../models/contactUsModel.js";
import transporter from "../utils/sendEmail.js";
import { uploadBufferToCloudinary } from "../utils/uploadToCloudinary.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, company, phone, message } = req.body;

    if (!name || !email || !company || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let cloudinaryFile = null;

    if (req.file) {
      cloudinaryFile = await uploadBufferToCloudinary(
        req.file.buffer,
        `${Date.now()}-${req.file.originalname.split(".")[0]}`
      );
    }

    const data = await Contact.create({
      name,
      email,
      company,
      phone,
      message,
      attachment: cloudinaryFile?.secure_url || null,
    });

    // 📧 HR EMAIL WITH FILE
    // await transporter.sendMail({
    //   from: `"Contact Form" <${process.env.MAIL_USER}>`,
    //   to: process.env.HR_EMAIL,
    //   subject: "New Contact Form Submission",
    //   html: `
    //     <p><b>Name:</b> ${name}</p>
    //     <p><b>Email:</b> ${email}</p>
    //     <p><b>Company:</b> ${company}</p>
    //     <p><b>Phone:</b> ${phone}</p>
    //     <p><b>Message:</b> ${message}</p>
    //   `,
    //   attachments: req.file
    //     ? [
    //         {
    //           filename: req.file.originalname,
    //           content: req.file.buffer,
    //           contentType: req.file.mimetype,
    //         },
    //       ]
    //     : [],
    // });
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.MAIL_USER}>`,
      to: process.env.HR_EMAIL,
      subject: "New Contact Form Submission",
      template: "hrContact",
      context: {
        name,
        email,
        company,
        phone,
        message,
      },
      attachments: req.file
        ? [
            {
              filename: req.file.originalname,
              content: req.file.buffer,
              contentType: req.file.mimetype,
            },
          ]
        : [],
    });

    // 📧 THANK YOU EMAIL
    // await transporter.sendMail({
    //   from: `"Python Developers" <${process.env.MAIL_USER}>`,
    //   to: email,
    //   subject: "Thank you for contacting us",
    //   html: `<p>Hi ${name},<br/>We’ve received your message and will contact you soon.</p>`,
    // });
    await transporter.sendMail({
      from: `"Your Company" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting us",
      template: "thankYou",
      context: {
        name,
        year: new Date().getFullYear(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
