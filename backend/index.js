import app from './app.js';
import dotenv from 'dotenv';
import http from 'http';
import { connectDB } from './config/db.js';
import {Server} from 'socket.io';
import cookie from 'cookie'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/projectModel.js';
import userModel from './models/userModel.js';
import { generateResult } from './config/gemini.js';
dotenv.config();

const server=http.createServer(app);
const PORT=process.env.PORT || 3000;

const io=new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        credentials: true
    }
});

connectDB();
io.use(async(socket,next)=>{
 try{

    let token=socket.handshake.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
      const rawCookie = socket.handshake.headers.cookie || '';
      const parsedCookies = cookie.parse(rawCookie);
      token = parsedCookies.token;
    }

  console.log(token);
  if(!token){
     return next(new Error('Authentication error: No token in cookies'));
  }

   const projectId=socket.handshake.query.projectId;
   if(!mongoose.Types.ObjectId.isValid(projectId)){
    return next (new Error('Invalid projectID'));
   }

   socket.project=await projectModel.findById(projectId);


  const decoded=jwt.verify(token,process.env.JWT_SECRET);
  console.log(decoded);
  if(!decoded){
    return next(new Error('Authentication error'))
  }
  socket.user=decoded;
  next();

 }catch(error){
   next(error)
 }

})

io.on('connection',socket=>{
    socket.roomId=socket.project._id.toString()
    console.log('a user is connected');
    socket.join(socket.roomId);

  

    socket.on('project-message', async (data) => {
  try {
    
    const message=data.message
    const aiIsPresentInMessage = message.includes('@ai');

    const user = await userModel.findById(data.sender);
    if (!user) return;

    

    socket.broadcast.to(socket.roomId).emit('project-message', {sender:user,message:message});

    if (aiIsPresentInMessage) {
      const prompt = message.replace('@ai', '');
      const result = await generateResult(prompt);
      console.log(result);
     
      io.to(socket.roomId).emit('project-message', {
        message:result,
        sender: {
          _id: 'ai',
          email: 'AI'
        }
      });
    }
    return;

  } catch (error) {
    console.log("error in project-message", error);
  }
});

    
    socket.on('disconnect',()=>{
      console.log('user disconnected')
      socket.leave(socket.roomId);
    });
})

server.listen(PORT,()=>{
    console.log(`server is running on the port ${PORT}`);
})


 