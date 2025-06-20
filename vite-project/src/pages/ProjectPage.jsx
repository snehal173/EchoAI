import React, { useContext, useEffect,useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { authDataContext } from '../context/authcontext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket'
import { userDataContext } from '../context/userContext';
import Markdown from 'markdown-to-jsx';
//import SyntaxHighlightedCode from '../config/highlightext';
import hljs from 'highlight.js';


function SyntaxHighlightedCode(props) {
    const ref = useRef(null)

      useEffect(() => {
        if (ref.current && props.className?.includes('lang-') && window.hljs) {
            window.hljs.highlightElement(ref.current)

            // hljs won't reprocess the element unless this attribute is removed
            ref.current.removeAttribute('data-highlighted')
        }
    }, [ props.className, props.children ])

    return <code {...props} ref={ref} />
}




const ProjectPage = () => {
  const location = useLocation();
  const { project } = location.state || {};
  const [isSidePanel,setIsSidePanel]=useState(false);
  const [openModal,setOpenModal]=useState(false);
  const [allusers,setAllusers]=useState([]);
  const [selectedUserId,setSelectedUserId]=useState(new Set())
  const {serverUrl}=useContext(authDataContext);
  const [projects,setProjects]=useState(location.state.project)
  const [message,setMessage]=useState('')
  const {userdata}=useContext(userDataContext)
  const [messages,setMessages]=useState([])
   console.log(userdata);
   console.log(project)
   const handleUserClick=(id)=>{
    setSelectedUserId(prevSelectedUserId=>{
      const newSelectedUserId=new Set(prevSelectedUserId);
      if(newSelectedUserId.has(id)){
        newSelectedUserId.delete(id);
      }else{
        newSelectedUserId.add(id);
      }
      return newSelectedUserId;
    })
    
   }
  async function addCollaborators(){
    try{
      const response=await axios.put(serverUrl+'/api/v1/projects/addusers',{
         projectId:location.state.project._id,
         users:Array.from(selectedUserId)
      },{withCredentials:true})

      console.log(response);
      if(response.status===200){
        toast.success("Users added to project successfully")
        setOpenModal(false)
      }
    }catch(error){
      console.log(error);
    }
  }
   async function getProject(){
    try{
      const response=await axios.get(serverUrl+`/api/v1/projects/getproject/${location.state.project._id}`,{withCredentials:true})
      console.log(response);
      if(response.status===200){
        setProjects(response.data.project)
       
      }

    }catch(error){
      console.log("error while fetching the project")
    }
   }
   
   async function fetchAllUsers(){
     try{
     const response=await axios.get(serverUrl+'/api/v1/auth/all',{withCredentials:true})
      console.log(response);
      if(response.status===200){
        setAllusers(response.data.users)
      }
     }catch(error){
       console.log("error while fetching all users",error)
     }
   }

  function WriteAiMessage(message) {

        console.log(message)
         const messageObject = JSON.parse(message)
        return (
            <div
                className='overflow-auto bg-slate-950 text-white rounded-sm p-2'
            >
                <Markdown
                    children={messageObject.text}
                    options={{
                        overrides: {
                            code: SyntaxHighlightedCode,
                        },
                    }}
                />
            </div>)
    }


    function send(){
     console.log("the user id is",userdata._id);
     const newMessage={
      message,
      sender:userdata._id
     }
     sendMessage('project-message',newMessage)
     setMessages((prev)=>[...prev,newMessage]);
     setMessage('')
   }

   useEffect(()=>{
    initializeSocket(project._id)
    receiveMessage('project-message',data=>{
      console.log("the data is getting printed",data)
      setMessages((prevMessages)=>[...prevMessages,{sender:data.sender,message:data.message}]);
    })

    fetchAllUsers()
    getProject()
   },[])
  console.log(messages);
  return (
    <main className='h-screen w-screen flex '>
     <section className='left min-w-64 bg-slate-300 h-full flex flex-col relative'>
  {/* Header */}
  <header className='flex absolute w-full justify-between px-4 p-2 bg-slate-100 z-10 top-0  items-center' >
    <div className='flex items-center justify-center gap-2 text-md font-medium cursor-pointer' onClick={()=>setOpenModal(!openModal)}>
      <i className="ri-add-line"></i>
      <div >Add collaborators</div>
    </div>
    <i onClick={()=>setIsSidePanel(!isSidePanel)} className="ri-group-fill cursor-pointer"></i>
  </header>

  {/* Messages container */}
  
  
  <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">

                    <div
                        
                        className="message-box p-1 flex flex-grow flex-col gap-1 ">
                       {messages.map((msg, index) => {
  const isUser = msg.sender?._id === userdata?._id.toString();
  const isAI = msg.sender?._id === 'ai';
  const maxWidth = isAI ? 'max-w-80' : 'max-w-52';

  return (
    <div key={index} className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`message ${maxWidth} flex flex-col p-2 bg-slate-50 w-fit rounded-md`}>
        <small className="opacity-65 text-xs">{isAI ? 'AI' : msg.sender?.email}</small>
        <div className="text-sm">
          {isAI ? WriteAiMessage(msg.message) : <p>{msg.message}</p>}
        </div>
      </div>
    </div>
  );
})}

                    </div>


  </div>

  {/* Message input at the bottom */}
  <div className='flex items-center gap-3 px-2 py-2 bg-slate-200'>
    <input
      value={message}
      onChange={(e)=>setMessage(e.target.value)}
      placeholder='Enter Message'
      className='flex-grow px-2 py-1 rounded-md bg-white outline-none placeholder:text-sm'
    />
    <i className="ri-send-plane-2-fill text-xl cursor-pointer" onClick={send}></i>
  </div>
  {/* sidepanel */}
  <div className={`w-72 h-full bg-slate-100 flex flex-col gap-2 absolute transition-all top-0 ${isSidePanel ? "translate-x-0": "-translate-x-full"} `}>
     <header onClick={()=>setIsSidePanel(!isSidePanel)}>
       <div className='flex justify-between items-center mr-3 mt-2 px-2 text-[18px] font-medium '>
         <h1 className=''>Collaborators</h1>
         <i className="ri-close-large-line cursor-pointer"></i>
       </div>
     </header>
     <div className='border-b-2 '></div>
      <div className="users flex flex-col gap-2">

                        {projects.users && projects.users.map(user => {


                            return (
                                <div key={user._id} className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                                    <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-medium text-[16px]'>{user.email}</h1>
                                </div>
                            )


                        })}
                    </div>

    
  </div>
</section>

{
  openModal && (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
         <header className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold'>Select User</h2>
              <button onClick={() => setOpenModal(false)} className='p-2'>
                <i className="ri-close-fill"></i>
              </button>
          </header>

          <div className='flex flex-col gap-2 mb-16 max-h-96 overflow-auto'>
            {
              allusers.map((u)=>(
                 <div
                  key={u._id}
                  className={`flex cursor-pointer hover:bg-slate-200 ${selectedUserId.has(u._id) ? "bg-slate-200" : ""} items-center gap-2 p-2`}
                   onClick={() => handleUserClick(u._id)}
  >
               
                   <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                    <i className="ri-user-fill absolute"></i>
                    </div>
                    <h1 className='font-semibold text-lg'>{u.email}</h1>
    
                  </div>

                  
              ))
            }
             <button
                onClick={addCollaborators}
                className='absolute cursor-pointer hover:bg-blue-400 bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                Add Collaborators
              </button>

          </div>

      </div>

    </div>
  )
}


     
   </main>

  )
}

export default ProjectPage