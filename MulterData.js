const multer = require("multer");

function randomString() {
  return Math.random().toString(36).substring(2, 12);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video")|| file.mimetype==="application/pdf" || file.mimetype==="application/msword") {
    cb(null, true);
  } else {
    cb(new Error("Only Videos Allowed for Lectures and Pdf for Roadmaps"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;