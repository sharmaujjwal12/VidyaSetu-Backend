const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  examType:{
    type:String,
    required:true,
  },
  videoUrl : {
    type:String,
    required:true,
  },
  lectureType:{
    type:String,
    required:true,
  },
})

module.exports= mongoose.model("uploadVideo",videoSchema);
