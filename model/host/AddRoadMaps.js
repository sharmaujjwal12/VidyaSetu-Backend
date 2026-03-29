const mongoose = require("mongoose")

const RoadMapSchema = new mongoose.Schema({
    roadmapType:{type:String,required:true},
    roadMapPdf:{type:String,required:true},
});

module.exports= mongoose.model("RoadMapClass",RoadMapSchema);