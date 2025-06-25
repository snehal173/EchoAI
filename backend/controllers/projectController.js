import mongoose from "mongoose";
import projectModel from "../models/projectModel.js";

import dataModel from "../models/dataModel.js";

export const createProject=async(req,res)=>{
    try{
        const {name}=req.body;
        const userId=req.user._id;
        if(!name){
            return res.status(400).json({message:"Project name is required"});
        }
        const isprojectexists=await projectModel.findOne({name,users:[userId]});
        if(isprojectexists){
            return res.status(400).json({message:"Project already exists with this name"});
        }
        
        const project=await projectModel.create({
            name,
            users:[req.user._id]
        })
        await dataModel.create({
            projectId:project._id,
            messages:[]
        })
        return res.status(201).json({
            message:"Project created successfully",
            project
        })

    }catch(error){
        console.log("error while creating the project",error);
        return res.status(500).json({
            message:"Internal server error while creating the project",
        })
    }
}

export const getProjectsByUser=async(req,res)=>{
    try{
        const userId=req.user._id;
        if(!userId){
            return res.status(400).json({
                message:"user id is missing"
            })
        }

        const projects=await projectModel.find({users:userId});

        return res.status(200).json({
            message:"project fetched successfully",
            projects
        })

    }catch(error){
        console.log("error while getting projects by user",error);
        return res.status(500).json({
            message:"error while fetching the projects of a user"
        })
    }
}

export const addUsersToProject=async(req,res)=>{
    try{

        const {projectId,users}=req.body;
        if(!projectId ){
            return res.status(400).json({
                message:"Project id is missing or invalid"
            })
        }
        if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
            return res.status(400).json({
                message:"Users should be an array of valid user ids"
            })
        }
        const userId=req.user._id;
        if(!userId ){
            return res.status(400).json({
                message:"User id is missing"
            })
        }
        const project=await projectModel.findOne({ 
            _id:projectId,
            users:userId
        })
        if(!project){
            return res.status(400).json({
                message:"Project not found or you are not authorized to add users to this project"
            })
        }

        const updatedProject=await projectModel.findByIdAndUpdate(
            projectId,
            {
                $addToSet:{
                    users:{$each:users}
                }
            },{new:true}
        )
        return res.status(200).json({
            message:"Users added to project successfully",
            projects:updatedProject
        })



    }catch(error){
        console.log("error while adding users to project",error);
        return res.status(500).json({
            message:"Internal server error while adding users to project"
        })
    }
}

export const getProjectById=async(req,res)=>{
    try{
        const {projectId}=req.params;

        const project=await projectModel.findById(projectId).populate('users','email');
        return res.status(200).json({
            message:"Project fetched successfully",
            project
        })

    }catch(error){
        console.log("error while getting project by id",error);
        return res.status(500).json({
            message:"Internal server error while getting project by id"
        })
    }
}

export const deleteProject=async(req,res)=>{
    try{
        const { projectId } = req.params;
        if (!projectId) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    await dataModel.deleteOne({ projectId });
    const project = await projectModel.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    

    return res.status(200).json({
      message: "Project deleted successfully",
    });

       
    }
    catch(error){
        console.log("error while delete project by id",error);
        return res.status(500).json({
            message:"Internal server error while getting project by id"
        })
    }
}

export const updateFileTree=async(req,res)=>{
    try{
        const {projectId,fileTree}=req.body;
    if(!projectId){
        return res.status(400).json(
            {
               message:"projectId is missing"
            }
        )

    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        
         return res.status(400).json(
            {
               message:"projectId is invalid"
            }
        )
    }
    if(!fileTree){
        return res.status(400).json(
            {
               message:"fileTree is required"
            }
        )

    }

    const project=await projectModel.findOneAndUpdate({
        _id:projectId
    },{
        fileTree
    },{
        new:true
    })

    return res.status(200).json({
        project
    })

    }catch(error){
       console.log(error)
       res.status(400).json({
        error:error.message,
        message:"error in updatitng filetree"
       })
    }
}

export const getMessagesByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;

    const messageDoc = await dataModel.findOne({ projectId });

    if (!messageDoc) {
      return res.status(404).json({ message: "No messages found for this project" });
    }

    return res.status(200).json({ messages: messageDoc.messages });

  } catch (error) {
    console.log("Error fetching messages", error);
    console.error("Error fetching messages:", error); // THIS w
    return res.status(500).json({ message: "Internal server error while getting messages" });
  }
};