const mongoose = require("mongoose")

const PaidMockSchema = new mongoose.Schema({
    name:{type:String,required:true},
    noOfMock:{type:Number,required:true},
});

module.exports= mongoose.model("PaidMockClass",PaidMockSchema);