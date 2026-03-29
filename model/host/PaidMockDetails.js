const mongoose = require("mongoose")

const PaidMockDetailsSchema = new mongoose.Schema({
    exam:{type:String,required:true},
    duration:{type:Number,required:true},
    questions:{type:Number,required:true},
    marks:{type:Number,required:true},
});

module.exports= mongoose.model("PaidMockDetailsClass",PaidMockDetailsSchema);