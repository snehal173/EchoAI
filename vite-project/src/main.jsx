import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import UserContext from './context/userContext.jsx'
import { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.jsx'
import { ServerContext } from './context/ServerContext.jsx'


createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
     <ServerContext>
      <UserContext>
       
          <App/>
          <Toaster/>
       
        
      </UserContext>
      </ServerContext>
     
    </BrowserRouter>
  
  
)
