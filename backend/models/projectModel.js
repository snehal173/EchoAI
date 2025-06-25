import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        
    },
    users:[{
           type:mongoose.Schema.Types.ObjectId,
           ref:"user",
           required:true
    }
    ],
    fileTree:{
        type:Object,
        default:{}
    }
    
},{timestamps:true});
const projectModel=mongoose.model("project",projectSchema);
export default projectModel;