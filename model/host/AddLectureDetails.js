const mongoose = require("mongoose")

const lectureDetailsSchema = new mongoose.Schema({
    examName:{type:String,required:true},
    lectureType:{type:String,required:true},
});

module.exports= mongoose.model("lectureDetailsClass",lectureDetailsSchema);