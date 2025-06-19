import axios from 'axios';
import React, { useState,useContext } from 'react';
import { authDataContext } from '../context/authcontext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [projectName, setProjectName] = useState('');
  const [showform,setShowForm]=useState(false);
  const [projects,setProjects]=useState([]);
  const {serverUrl}=useContext(authDataContext)
  const navigate=useNavigate();
  async function ProjectHandler(){
    try{
      const response=await axios.post(serverUrl+'/api/v1/projects/create',{
        name:projectName}
      ,{withCredentials:true})

      if(response.status===201){
        setProjectName('');
        setShowForm(false);
        toast.success('Project created successfully!');
      }
    }catch(error){
      console.log("error ehile creating the project",error);
    }
  }

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

  useEffect(()=>{
    fetchProjects();
  },[])

  return (
    <div className="relative min-h-screen">
       
      {/* Top-left New Project button */}
      <div className="flex absolute top-4 left-4 gap-4">
        <div className="flex justify-center items-center border-2 border-gray-400 rounded-md w-[200px] h-[50px] px-4 cursor-pointer hover:bg-gray-100 transition" 
        onClick={()=>setShowForm(true)}>
          <div className="text-[20px] font-semibold">New Project</div>
          <i className="ri-add-line ml-2 text-[22px]"></i>
        </div>

        <div className='flex  gap-4 flex-wrap   '>
          {
            projects.map((project)=>{
              return (
                <div key={project._id} className='flex items-center justify-start  border-2 border-gray-400 rounded-md flex-wrap w-[150px] h-[50px] gap-2.5 cursor-pointer hover:bg-gray-200 transition-all duration-300 ' 
                onClick={()=>navigate('/project',{state:{project}})}> 
                 <div className='flex flex-col   '>
                  <div className='text-[17px]'>{project.name}  </div>
                 <div className='flex px-1  items-center gap-1 text-gray-700'> 
                  <i className="ri-user-line"></i>
                  <p>Collaborators:{project.users.length}</p>
                 </div>

                  </div>
                </div>
              )
            })
          }
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

