import React from 'react'
import { useState,useContext } from 'react'
import logo from '../assets/chat_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import img from '../assets/signupimg.jpg'
import { userDataContext } from '../context/userContext'
import { authDataContext } from '../context/authcontext'
import toast from 'react-hot-toast';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config/firebase'
const signup = () => {
    const [email,setEmail]=useState('')
    const [show,setShow]=useState(false)
    const [password,setPassword]=useState('')
    const {serverUrl}=useContext(authDataContext)
    const {setUserData}=useContext(userDataContext);
   const navigate=useNavigate();
    
   const signupHandler=async(e)=>{
    e.preventDefault();
    try{
         const response=await axios.post(serverUrl+'/api/v1/auth/register',{
                email:email,
                password:password
            },{withCredentials:true});
            console.log(response);
            if(response.status===201){
                setUserData(response.data.user)
                toast.success('Signin successful!');
                setEmail('');
                setPassword('');
                navigate('/');
            }

    }catch(error){
        toast.error('Something went wrong!');
        console.log("error while signuo",error);
    }
   }

   const googleSignUp=async()=>{
    try{
        const response=await signInWithPopup(auth,provider)
        console.log(response)

        // let user=response.user
        // let name=user.displayName
        // let email=user.email

        // const result=await axios.post(serverUrl+'/api/v1/auth/google',{
        //     name,email
        // },{withCredentials:true})

        // console.log(result)

    }catch(error){
        console.log("error while doing registeration with google using firebase")
    }
   }

  return (
    <div className='w-full h-100vh flex justify-center items-center  '>
        <img src={img} className='w-[50%] h-screen  '/>
        <div className='flex flex-col items-center justify-center gap-4 w-[50%] bg-white '>
        <div className='flex justify-center items-center gap-[2px] '>
            <img src={logo} className='w-[100px] h-[70px]' />
            <div className='text-3xl font-bold '>Echo Ai</div>
        </div>

        <div className='text-3xl font-semibold mb-4'>Welcome Back!</div>

        <form className='flex flex-col gap-4 items-center justify-center w-[80%]' onSubmit={signupHandler}>

            <div className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:shadow-md transition"
            onClick={googleSignUp}>
                <i class="ri-google-fill"></i>
                 <span className="text-base font-medium">Sign up with Google</span>
            </div>


            <div className='flex flex-col items-start justify-center gap-1 w-[80%]'>
                <label >Email Address</label>
                <input 
                type='email' 
                placeholder='Enter your email' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                className='border-2 border-gray-400 rounded-md w-[100%] py-1'/>
            </div>
            <div className='flex flex-col items-start justify-center gap-1 w-[80%] '>
                <label >Password</label>
                <div className='flex items-center justify-between w-[100%] border-2 border-gray-400 rounded-md'>
                    <input 
                 type={show?'text':'password'} 
                placeholder='Password' 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
                 className='  py-1'/>

                 <span className='mr-1 cursor-pointer' onClick={()=>setShow(prev=>!prev)}>{show?"hidden":"show"}</span>
                </div>
            </div>

            <button className=' cursor-pointer border-2 border-white bg-blue-500 w-[80%] rounded-md px-2 py-1.5 text-lg' type='submit'>SignUp</button>

        </form>
       <div className='w-[60%] border-b-2 border-gray-400 my-4'></div>

       <p className='text-[18px]'>Already have an account? <Link className='text-red-500 cursor-pointer' to='/login'>Log In</Link></p>

        </div>


    </div>
  )
}

export default signup