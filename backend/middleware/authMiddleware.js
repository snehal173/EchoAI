import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
dotenv.config()
//import redisClient from '../config/redis.js';
export const authUser=async(req,res,next)=>{
    try{
        const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message:"token is missing"
            })
        }
       
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
          const userId = decoded.id;
            if(!userId){
            return res.status(401).json({
                message:"INVALID TOKEN"
            })
        }

        const user=await userModel.findById(userId);
        req.user=user
        next();
    }catch(error){
        console.log("error in auth middleware",error);
        return res.status(500).json({
            message:"Internal error occured in auth middleware"
        })
    }
}