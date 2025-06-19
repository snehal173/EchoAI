import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        Lowercase:true,
        minLength:5,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:4
    }
},{timestamps:true});

const userModel=mongoose.model("user",userSchema);
export default userModel;