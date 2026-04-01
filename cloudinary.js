const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dfnfd2yc0",
  api_key: "711946691568337",
  api_secret: "9azbMn7l7toebeMmg796P826JOo",
});

module.exports = cloudinary;