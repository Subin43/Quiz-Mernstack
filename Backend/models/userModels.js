const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email : {
        type : String,
        required :[ true, "Email address is required"],
        unique : true,
    },
    password : {
        type : String,
        required : [true,"Password is requird"]
    },
    username : {
        type : String,
        unique : true,
        required : [true, "username is required"]
    }
},{timstamps : true})

const User = mongoose.model("User",UserSchema);
module.exports= User;