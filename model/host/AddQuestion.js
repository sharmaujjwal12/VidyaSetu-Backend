const mongoose = require("mongoose")

const QuestionSchema = new mongoose.Schema({
    examName:{type:String,required:true},
    question:{type:String,required:true},
    options : {
      type:[String],
      require:true
    },
    correctAnswer:{type:String,required:true},
});

module.exports= mongoose.model("QuestionClass",QuestionSchema);