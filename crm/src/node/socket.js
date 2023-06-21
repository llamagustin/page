const { Server } = require("socket.io");
let socketIo

function createSocket(server) {
  socketIo = new Server(server, {
    cors: {
      origin: "*"
    }
  });
  
  socketIo.on('connection', (socket) => {
    console.log("==============================");
    console.log("SOCKETIO CONNECTED");
    console.log("==============================");
    
    socket.on('disconnect', () => {
      console.log('Socket.io disconnected!');
    });
  });
  
}

function getSocket() {
  return socketIo;
}

module.exports = { createSocket, getSocket };
