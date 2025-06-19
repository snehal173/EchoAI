import React from 'react'
import { createContext,useState } from 'react'
export const userDataContext=createContext();



const userContext = ({children}) => {
    const [userdata,setUserData]=useState({});
    const value={userdata,setUserData};
  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default userContext