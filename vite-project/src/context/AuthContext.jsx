

import React from 'react'
import { createContext } from 'react'
export const authDataContext=createContext()
const serverUrl="http://localhost:4000"



const authcontext = ({children}) => {
    let value={serverUrl}
  return (
    <div>
        <authDataContext.Provider value={value}>
           {children}
        </authDataContext.Provider>
    </div>
  )
}

export default authcontext