const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true,trim:true},
    lastName:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true,unique:true,lowercase:true},
    password:{type:String,required:true,trim:true,minlength:6},
    gender:{type:String,enum:["male","female","other"]},
    role:{type:String,enum:["user","host"]},
     isActive: {
      type: Boolean,
      default: true,
    },
    isLoggedIn : {
        type:Boolean,
        default:false,
    }
});

module.exports= mongoose.model("VidyaSetu",userSchema);
