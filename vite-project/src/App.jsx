import './App.css'
import 'remixicon/fonts/remixicon.css';
import { Routes,Route } from 'react-router-dom'
import Signup from './pages/signup'
import Login from './pages/login'
import Home from './pages/Home'

import ProjectPage from './pages/ProjectPage';
function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/project' element={<ProjectPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
