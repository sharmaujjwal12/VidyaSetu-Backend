const { upload, uploadToCloudinary } = require("../MulterData");
const express = require("express");
const videoRouter = express.Router();
const { uploadVideo } = require("../controller/videoController");
const { getVideos } = require("../controller/videoController");

videoRouter.post("/uploadVideo/:examType",upload.single("video"),uploadVideo)

videoRouter.get("/getVideos/:examName",getVideos);

module.exports=videoRouter;