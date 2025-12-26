import express from 'express';
import dotenv from "dotenv";
import cors from "cors";

import connectDB from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import caseStudyRoutes from './routes/CaseStudyRoutes.js'
import aboutUsRoutes from './routes/aboutRoutes.js'
import subscriberRoutes from './routes/subscriberRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import HeroSectionRoutes from './routes/LandingPageRoutes/HeroSectionRoutes.js'
import servicesRoutes from "./routes/LandingPageRoutes/servicesRoutes.js";
import featuredWorkRoutes from "./routes/LandingPageRoutes/featuredWorkRoutes.js"
import expertiseRoutes from "./routes/LandingPageRoutes/expertiseRoutes.js";
import industryRoutes from "./routes/LandingPageRoutes/industryRoutes.js";
import testimonialRoutes from "./routes/LandingPageRoutes/testimonialRoutes.js";
import jobRoutes from './routes/jobRoutes.js';
import jobApplicatioRoutes from './routes/jobApplicationRoutes.js';
import contactPageRoutes from './routes/contactPageRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import servicesPageRoutes from './routes/servicesPageRoutes.js';
import portfolioRoutes  from './routes/portfolioRoutes.js';
import careerPageRoutes from './routes/careerPageRoutes.js'

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://python-developers.netlify.app"
]

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS to all routes first
app.use(cors(corsOptions));

// middleware
app.use(express.json());
express.urlencoded();

// db connection
connectDB()

// default route
app.get("/", (req, res) => {
  res.send("Hello from server");
});

// routes
app.use("/api/admin", adminRoutes);
app.use("/api/case-study", caseStudyRoutes);
app.use("/api/about-us", aboutUsRoutes);
app.use("/api/subscribe", subscriberRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/home", HeroSectionRoutes)
app.use("/api/home/service", servicesRoutes);
app.use("/api/home/featured-work", featuredWorkRoutes);
app.use("/api/home/expertise", expertiseRoutes);
app.use("/api/home/industries", industryRoutes);
app.use("/api/home/testimonial", testimonialRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/job-application", jobApplicatioRoutes)
app.use("/api/contact-page", contactPageRoutes)
app.use("/api/blog", blogRoutes);
app.use("/api/services", servicesPageRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use("/api/career", careerPageRoutes)

// Global error handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Server error",
  });
});



app.listen(PORT, (req, res)=>{
    console.log(`Server is running on ${PORT}`)
})