let express = require("express");
let upload = require("../MulterData")
const { uploadVideo,getVideos } = require("../Controller/videoController");
let videoRouter = express.Router();

videoRouter.post("/uploadVideo/:examType",upload.single("video"),uploadVideo)

videoRouter.get("/getVideos/:examName",getVideos);

module.exports=videoRouter;