
import socket from 'socket.io-client';


let socketInstance = null;




   export const initializeSocket = (projectId) => {
  socketInstance = socket('http://localhost:4000', {
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