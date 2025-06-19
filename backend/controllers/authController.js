import jwt from 'jsonwebtoken';
import bcypt from 'bcrypt';
//import redisClient from '../config/redis.js';
import userModel from '../models/userModel.js';

export const register=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Email and password are required"
            })
        }
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists with this email ,Please login"
            })
        }
        const hashedPassword=await bcypt.hash(password,10);
        const user=await userModel.create({
            email:email,
            password:hashedPassword
        })
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"None",
        secure:true
       })
        return res.status(201).json({
            message:"User registered successfully",
            user,
            token
        })

    }
    catch(error){
        console.log("error while signup",error);
       
        return res.status(500).json({
            message:"Internal server error while signing up the user"
        })
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Email and Password are required"
            })
        }
        const existingUser=await userModel.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                message:"User does not exist with this email,please register first"
            })
        }
        const passwordMatch=await bcypt.compare(password,existingUser.password);
        if(!passwordMatch){
            return res.status(400).json({
                message:"WRONG PASSWORD"
            })
        }
        const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"7d"})
         res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"None",
        secure:true
        })
        return res.status(201).json({
            message:"User login successfully",
            existingUser,
            token
        }) 

    }
    catch(error){
        console.log("error while login",error);
       
        return res.status(500).json({
            message:"Internal error occured while login the user"
        })
    }
}

export const getProfile=async(req,res)=>{
   return res.status(200).json({
    message:"User profile fetched succesfully",
    user:req.user
   })
}

export const logout =async(req,res)=>{
    try{
        //  const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
        //  if(!token){
        //     return res.status(400).json({
        //         message:"token is missing"
        //     })
        //  }

        //  redisClient.set(token,'logout','EX',60*60*24*7);
        res.clearCookie("token");
         res.status(200).json({
                message:"User logged out successfully"
         })

    }catch(error){
        console.log("error while logout",error);
        return res.status(500).json({
            message:"internal error ocuured while logout"
        })
    }
}

export const getAllUsers=async(req,res)=>{
    try{
        const userId=req.user._id;
        const users=await userModel.find({
            _id:{$ne:userId}
        });
        return res.status(200).json({
            message:"All users feteched successfully",
            users
        })
    }catch(error){
        return res.status(500).json({
            message:"Internal  server error while fetching all users"
        })
    }
}

export const googleLogin=async(req,res)=>{
    try{
        let {name,email}=req.body;
        let user=await userModel.findOne({email})

        if(!user){
            user=await userModel.create({
                name,email
            })
        }

        let token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"None",
        secure:true
       })
        return res.status(201).json({
            message:"User registered successfully",
            user,
            token
        })

    }catch(error){
      console.log("error while signup",error);
       
        return res.status(500).json({
            message:"google login error"
        })
    }
}