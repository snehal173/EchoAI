import express from 'express'
import authRoutes from './routes/authRoutes.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import projectRoutes from './routes/projectRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import cors from 'cors'
const app=express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}));
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/projects',projectRoutes);
app.use('/api/v1/ai',aiRoutes);
app.get('/',(req,res)=>{
    res.send("hello world")
})

export default app