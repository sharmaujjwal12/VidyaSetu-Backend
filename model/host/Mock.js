const mongoose = require("mongoose")

const MockSchema = new mongoose.Schema({
    name:{type:String,required:true},
    noOfMock:{type:Number,required:true},
});

module.exports= mongoose.model("MockClass",MockSchema);