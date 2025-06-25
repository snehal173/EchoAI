import axios from 'axios';
import React, { useState,useContext } from 'react';

import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { userDataContext } from '../context/userContext';
import { serverDataContext } from '../context/ServerContext';
const Home = () => {
  const [projectName, setProjectName] = useState('');
  const [showform,setShowForm]=useState(false);
  const [projects,setProjects]=useState([]);
  const {serverUrl}=useContext(serverDataContext)
  const {theme}=useContext(userDataContext)
  const navigate=useNavigate();
  
   async function fetchProjects(){
    try{
       const response=await axios.get(serverUrl+'/api/v1/projects/all',{withCredentials:true});
       console.log(response);
       if(response.status===200){
        setProjects(response.data.projects);
       }

    }catch(error){
       console.log("error while fetching projects",error);
       toast.error('error while fetching projects');
    }
  }


  async function ProjectHandler(e){
    e.preventDefault()
    try{
      const response=await axios.post(serverUrl+'/api/v1/projects/create',{
        name:projectName}
      ,{withCredentials:true})

      if(response.status===201){
        setProjectName('');
        setShowForm(false);
        toast.success('Project created successfully!');
        await fetchProjects();
      }
    }catch(error){
      console.log("error ehile creating the project",error);
    }
  }

  

 
  async function deleteProject(projectId){
     try{
      const response=await axios.delete(serverUrl+`/api/v1/projects/delete/${projectId}`,{withCredentials:true})
     if(response.status===200){
      toast.success("project deleted successfully")
      await fetchProjects()
     }

     }catch(error){
       console.log(error)
     }
  }

  useEffect(()=>{
    fetchProjects();
  },[])

  return (
      <div className={`relative min-h-screen ${theme === "light" ? "bg-white" : "bg-black"}`}>
  <Navbar />

  {/* Top-left New Project button */}
  <div className="flex absolute top-18 left-4 gap-4">
    <div
      className={`flex justify-center items-center border-2 rounded-md w-[200px] h-[50px] px-4 cursor-pointer transition ${
        theme === "light" ? "border-gray-400 hover:bg-gray-100 text-black" : "border-white hover:bg-gray-800 text-white"
      }`}
      onClick={() => setShowForm(true)}
    >
      <div className="text-[20px] font-semibold">New Project</div>
      <i className="ri-add-line ml-2 text-[22px]"></i>
    </div>

    <div className="flex gap-4 flex-wrap">
      {projects.map((project) => (
        <div
          key={project?._id}
          className={`flex items-center justify-start border-2 rounded-md flex-wrap w-[150px] h-[50px] gap-2.5 px-2 transition-all duration-300 ${
            theme === "light" ? "border-gray-400 hover:bg-gray-200 text-black" : "border-white hover:bg-gray-800 text-white"
          }`}
        >
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <div
                className="text-[17px] cursor-pointer"
                onClick={() => navigate("/project", { state: { project } })}
              >
                {project?.name}
              </div>
              <i
                className="ri-delete-bin-line cursor-pointer"
                onClick={() => deleteProject(project._id)}
              ></i>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <i className="ri-user-line"></i>
              <p>Collaborators: {project?.users?.length}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>


      {/* Centered Create Project Form */}
      {showform &&
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-[280px] shadow-md bg-white">
          <div className="text-lg font-semibold">Create New Project</div>

          <label className="text-md font-medium text-gray-600">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border border-gray-400 rounded-md p-2 outline-none"
            placeholder="Enter name"
          />

          <div className="flex items-center justify-center gap-2 mt-2">
            <button className="bg-gray-300 text-[16px] px-4 py-1 rounded-md hover:bg-gray-400 transition cursor-pointer" onClick={()=>setShowForm(false)}>
              Cancel
            </button>
            <button className="bg-blue-600 text-white text-[16px] px-4 py-1 rounded-md hover:bg-blue-700 transition cursor-pointer" onClick={ProjectHandler}>
              Create
            </button>
          </div>
        </div>
      </div>
      </div>
      }
    </div>
  );
};

export default Home;

