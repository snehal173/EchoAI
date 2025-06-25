
import socket from 'socket.io-client';


let socketInstance = null;




   export const initializeSocket = (projectId) => {
  socketInstance = socket('https://echoai-2.onrender.com', {
    withCredentials: true,
    query: {
      projectId,
    },
  });

    return socketInstance;

}

export const receiveMessage = (eventName, cb) => {
    socketInstance.on(eventName, cb);
}

export const sendMessage = (eventName, data) => {
    socketInstance.emit(eventName, data);
}
