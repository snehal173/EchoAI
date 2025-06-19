import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/authcontext.jsx'
import UserContext from './context/userContext.jsx'
import { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.jsx'
//import SocketContext from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
     <AuthContext>
      <UserContext>
       
          <App/>
          <Toaster/>
       
        
      </UserContext>
      
     </AuthContext>
    </BrowserRouter>
  
  
)
