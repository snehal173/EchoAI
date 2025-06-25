import './App.css'
import 'remixicon/fonts/remixicon.css';
import { Routes,Route,Navigate } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/login'
import Home from './pages/Home'
import {userDataContext} from './context/userContext';
import ProjectPage from './pages/ProjectPage';
import { useContext } from 'react';

function App() {
   let {userdata}=useContext(userDataContext)
   
  return (
    <>
      <Routes>
        <Route path="/" element={userdata?._id ? <Home />:<Navigate to="/login" replace/> }/>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/project' element={<ProjectPage/>}></Route>
         
      </Routes>
    </>
  )
}

export default App
