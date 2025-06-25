import React, { useContext, useEffect } from 'react'
import { createContext,useState } from 'react'
import { authDataContext } from './authcontext';
import axios from 'axios';
export const userDataContext=createContext();



const userContext = ({children}) => {
    const [userdata,setUserData]=useState(null);
    const {serverUrl}=useContext(authDataContext)
    const [theme, setTheme] = useState("light");
    const getCurrentUser=async()=>{
  try{
    const response=await axios.get(serverUrl+'/api/v1/auth/profile',{withCredentials:true})
    console.log("userdata in userdatacontextfile",response)
   
       setUserData(response.data.user)
       setLoading(false)
    
    
  }catch(error){
    console.log(error)
    // setUserData(null); 
  }
}

    useEffect(()=>{
      getCurrentUser()
    },[])

    
    const value={userdata,setUserData,theme,setTheme};

  return (
    
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
   
  )
}

export default userContext