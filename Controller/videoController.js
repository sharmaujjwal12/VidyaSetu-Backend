const fs = require("fs");
const uploadVideo = require("../model/videos/Video")
const { uploadToCloudinary } = require("../MulterData");

// upload controller
exports.uploadVideo = async (req, res) => {
  console.log("Backend Me Bhai")
  let examType = req.params.examType;
  let lectureType = req.body.lectureType;
  console.log("req.file : ",req.file)
  console.log("Lecture Type (body):", req.body.lectureType); 
   if (!examType) {
      return res.status(400).json({
        message: "Exam Type required ❌",
      });
    }
  try {
    if(!req.file){
      return res.status(400).json({message: "No video uploaded ❌",})
    }
    // Upload buffer to Cloudinary
    const result = await uploadToCloudinary(req.file);
    let newVideo = new uploadVideo({
       examType,
       videoUrl: result.secure_url,
       lectureType,
      cloudinaryId: result.public_id,
    })
    await newVideo.save();
    res.status(200).json({
      message: "Video Uploaded Successfully",
      videoUrl: result.secure_url,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all videos
exports.getVideos = async (req, res) => {
  let {examName} = req.params;
  let { lectureType } = req.query;
  const videos = await uploadVideo.find({examType:examName,
    lectureType:lectureType,
  });
  console.log("Data At Videos : ",videos)
    res.json(videos);
};