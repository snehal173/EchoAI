import mongoose from "mongoose";

const dataSchema=new mongoose.Schema({
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

const dataModel=mongoose.model("data",dataSchema)
export default dataModel

