// MulterData.js
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dfnfd2yc0",
  api_key: process.env.CLOUDINARY_API_KEY || "711946691568337",
  api_secret: process.env.CLOUDINARY_API_SECRET || "9azbMn7l7toebeMmg796P826JOo",
});

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to upload buffer to Cloudinary
async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { 
          resource_type: "auto",
          folder: file.mimetype.startsWith("video") ? "vidya_setu_videos" : "vidya_setu_roadmaps" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);
    bufferStream.pipe(stream);
  });
}

module.exports = { upload, uploadToCloudinary, cloudinary, Readable };