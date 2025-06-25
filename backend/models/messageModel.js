import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'project'
    },
    messages:[
        {
            sender:{
                type:Object
            },message:{
                type:String
            }
        }
    ]
})
const messageModel=mongoose.model("message",messageSchema);
export default messageModel;
