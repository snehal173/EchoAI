import React, { useContext, useEffect } from 'react'
import { createContext,useState } from 'react'
import { authDataContext } from './authcontext';
import axios from 'axios';
export const userDataContext=createContext();



const userContext = ({children}) => {
    const [userdata,setUserData]=useState({});
    const {serverUrl}=useContext(authDataContext)
    const getCurrentUser=async()=>{
  try{
    const response=await axios.get(serverUrl+'/api/v1/auth/profile',{withCredentials:true})
    console.log("userdata in userdatacontextfile",response)
     setUserData(response.data.user)
  }catch(error){
    console.log(error)
  }
}

    useEffect(()=>{
      getCurrentUser()
    },[])

    
    const value={userdata,setUserData};

  return (
    
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
   
  )
}

export default userContext