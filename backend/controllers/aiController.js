import { generateResult } from "../config/ai.js";


export const getresult=async(req,res)=>{
    try{
        const {prompt}=req.query;
        const result=await generateResult(prompt);
        res.send(result)

    }catch(error){
       return res.status(500).json({message:error.message});
    }
}