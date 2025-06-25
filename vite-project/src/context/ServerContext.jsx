import React from 'react'
import { createContext } from 'react'

const serverUrl="https://echoai-2.onrender.com"
export const serverDataContext=createContext()

export const ServerContext = ({children}) => {
      let value={serverUrl}
  return (
    <div>
         <serverDataContext.Provider value={value}>
                   {children}
         </serverDataContext.Provider>
    </div>
  )
}

