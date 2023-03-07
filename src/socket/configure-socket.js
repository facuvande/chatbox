import { Server } from 'socket.io';
const messages = [];

export default function configureSocket(httpServer) {
  const io = new Server(httpServer);
  io.on('connection', (socket) => {
    console.log('new connection:', socket.id);
    socket.on('message', data =>{
      console.log({user: data.user, message: data.message})
      messages.push(data)
      io.emit('messageLogs', messages)
    })
    socket.on('new_user', (data) =>{
      console.log('New user: ', data)
      socket.emit('messageLogs', messages)
      socket.broadcast.emit('user_connected', (data))
    })
  });
}
