import React, { useState } from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/userContext'
import logo from "../assets/chat_logo.png"
import toast from 'react-hot-toast'
import axios from 'axios'
import { authDataContext } from '../context/authcontext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const {userdata,setUserData,theme,setTheme}=useContext(userDataContext)
   const [openModal, setOpenModal] = useState(false);
   const serverUrl=useContext(authDataContext)
   const navigate=useNavigate()
   console.log(userdata)
   async function logoutHandler() {
     try{
        const response=await axios.get(serverUrl+'/api/v1/auth/logout',{ withCredentials: true })
     if(response.status==200){
        toast.success("user logged out successfully");
        setUserData(null)
        navigate('/login')
     }

     }catch(error){
      console.log(error)
      console.log("error while logging out")
     }
   }
  return (
     <div className='fixed  flex items-center justify-between px-4 text-whitefixed top-0 left-0 w-full h-[50px] bg-gray-700 z-50 '>

        <div className='flex items-center justify-center'>
           <img className='w-[70px] h-[60px]' src={logo}/>
           <div className="text-[24px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ">
           Echo AI
           </div>

        </div>
      {userdata?._id ? (
       <div className='flex  items-center gap-3 px-3 py-2'>
          
        {theme==="light" && <i className="ri-moon-line w-[30px] text-white cursor-pointer" onClick={()=>setTheme("dark")}></i>}
        {theme==="dark" && <i className="ri-sun-line w-[30px] text-white cursor-pointer" onClick={()=>setTheme("light")}></i>}
         <button className='text-white border-2 px-1.5 py-0.5 rounded-md cursor-pointer  transition-all duration-200 hover:bg-white hover:text-black hover:scale-105' onClick={()=>setOpenModal(true)}>Logout</button>
        
         </div>
      ) : (
        <>
          <div className='flex gap-2 items-center'>
            <button className='text-white border-2 px-1.5 py-0.5 rounded-md cursor-pointer  transition-all duration-200 hover:bg-white hover:text-black hover:scale-105' onClick={()=>navigate('signup')}>Signup</button>
           <button className='text-white border-2 px-1.5 py-0.5 rounded-md cursor-pointer  transition-all duration-200 hover:bg-white hover:text-black hover:scale-105'onClick={()=>navigate('login')}>Login</button>
          </div>
        </>
      )}
     {openModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[90%] max-w-sm p-6 rounded-xl shadow-xl text-center">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">
        Are you sure you want to logout?
      </h1>
      <div className="flex justify-center gap-4">
        <button
          onClick={logoutHandler}
          className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
        <button
          onClick={() => setOpenModal(false)}
          className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      </div>


    
  )
}

export default Navbar