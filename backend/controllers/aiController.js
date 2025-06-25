import { generateResult,printContent } from "../config/gemini.js";


export const getresult=async(req,res)=>{
    try{
        const {prompt}=req.query;
        const result=await generateResult(prompt);
        res.send(result)

    }catch(error){
       return res.status(500).json({message:error.message});
    }
}

export const getReview=async(req,res)=>{
   try{
     const code=req.body.code;
    if(!code){
        return res.status(400).send("prompt is required")
    }

    const result=await printContent(code);
     return res.status(200).send(result);

   }catch(error){
    return res.status(500).json({message:error.message});
   }
}