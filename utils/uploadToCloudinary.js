import cloudinary from "../config/cloudinary.js";

export const uploadBufferToCloudinary = (buffer, filename) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "contact-us",
          resource_type: "auto",
          public_id: filename,
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      )
      .end(buffer);
  });
