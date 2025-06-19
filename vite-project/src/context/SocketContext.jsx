// SocketContext.js
// import React, { createContext, useContext, useEffect } from 'react';
// import { io } from 'socket.io-client';


// export const SocketDataContext=createContext();


// const socket=io('http://localhost:4000',{
//     withCredentials:true,
// });

// const sendMessage=(eventName,data)=>{
//     socket.emit(eventName,data);
// }

// const receiveMessage=(eventName,cb)=>{
//     socket.on(eventName,cb);
// }

// const value={socket,sendMessage,receiveMessage}
// const SocketContext=({children})=>{
    
//     useEffect(() => {
//         // Basic connection logic
//         socket.on('connect', () => {
//             console.log('Connected to server');
//         });

//         socket.on('disconnect', () => {
//             console.log('Disconnected from server');
//         });

//     }, []);

//     return (
//         <SocketDataContext.Provider value={value}>
//             {children}
//         </SocketDataContext.Provider>
//     )
// }

// export default  SocketContext
