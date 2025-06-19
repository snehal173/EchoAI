import mongoose from 'mongoose';


export const connectDB=async()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to the database sucessfully");

    }catch(error){
        console.log("error occurred while connecting to the database",error);
    }
}