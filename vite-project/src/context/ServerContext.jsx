import React from 'react'
import { createContext } from 'react'

const serverUrl="http://localhost:4000"
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

