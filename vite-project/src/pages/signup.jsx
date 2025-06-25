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

       

    }catch(error){
        console.log(error)
        console.log("error while doing registeration with google using firebase")
    }
   }

 return (
  <div className="h-100vh w-full flex flex-col-reverse lg:flex-row justify-center">
    {/* Image Section */}
    <img
      src={img}
      alt="Side illustration"
      className="w-full h-[250px]  lg:h-[650px] lg:w-1/2"
    />

    {/* Form Section */}
    <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 lg:p-12">
      {/* Logo & Title */}
      <div className="flex items-center gap-2 mb-6">
        <img src={logo} className="w-[80px] h-[70px]" alt="Echo AI Logo" />
        <div className="text-3xl font-bold">Echo AI</div>
      </div>

      <div className="text-2xl lg:text-3xl font-semibold mb-6 text-center">
        Welcome Back!
      </div>

      {/* Signup Form */}
      <form
        onSubmit={signupHandler}
        className="flex flex-col gap-4 items-center w-full max-w-md"
      >
        {/* Google Signup */}
        <button
  type="button"
  onClick={googleSignUp}
  className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:shadow-md transition w-full"
>
  <i className="ri-google-fill"></i>
  <span className="text-base font-medium">Sign up with Google</span>
</button>

        {/* Email Field */}
        <div className="flex flex-col gap-1 w-full">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-400 rounded-md w-full py-2 px-3"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1 w-full">
          <label>Password</label>
          <div className="flex items-center justify-between border-2 border-gray-400 rounded-md w-full px-3">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 w-full focus:outline-none"
            />
            <span
              className="ml-2 text-sm cursor-pointer text-blue-500"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md text-lg font-semibold transition cursor-pointer"
        >
          Sign Up
        </button>
      </form>

      {/* Divider */}
      <div className="w-full max-w-md border-b border-gray-300 my-6"></div>

      {/* Redirect */}
      <p className="text-base text-center">
        Already have an account?{" "}
        <Link className="text-red-500 font-medium" to="/login">
          Log In
        </Link>
      </p>
    </div>
  </div>
);

}

export default signup