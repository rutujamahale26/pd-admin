import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // ✅ no local files
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Invalid file type"), false);
  },
});

export default upload;
