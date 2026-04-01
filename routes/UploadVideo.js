const { upload, uploadToCloudinary } = require("../MulterData");
const express = require("express");
const videoRouter = express.Router();
const { uploadVideo } = require("../Controller/videoController");
const { getVideos } = require("../Controller/videoController");

videoRouter.post("/uploadVideo/:examType",upload.single("video"),uploadVideo)

videoRouter.get("/getVideos/:examName",getVideos);

module.exports=videoRouter;