const mongoose = require("mongoose")

const PaidQuestionSchema = new mongoose.Schema({
    examName:{type:String,required:true},
    question:{type:String,required:true},
    options : {
      type:[String],
      required:true
    },
    correctAnswer:{type:String,required:true},
});

module.exports= mongoose.model("PaidQuestionClass",PaidQuestionSchema);