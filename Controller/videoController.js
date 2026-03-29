const fs = require("fs");
const uploadVideo = require("../model/videos/Video")

// upload controller
exports.uploadVideo = async (req, res) => {
  let examType = req.params.examType;
  console.log("Controller Hit")
  console.log("req.body : ",req.body)
  console.log("req.params : ",req.params)
  console.log("Exam Type : ",examType)
   if (!examType) {
      return res.status(400).json({
        message: "Exam Type required ❌",
      });
    }
  try {
    if(!req.file){
      return res.status(400).json({message: "No video uploaded ❌",})
    }
    let newVideo = new uploadVideo({
       examType,
      videoUrl: `/uploads/${req.file.filename}`,
    })
    await newVideo.save();
    res.status(200).json({
      message: "Video Uploaded Successfully",
      filename: req.file.filename,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all videos
exports.getVideos = async (req, res) => {
  let {examName} = req.params;
  const videos = await uploadVideo.find({examType:examName});
  console.log("Data At Videos : ",videos)
    res.json(videos);
};