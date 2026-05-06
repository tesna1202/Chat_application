const { addUser, removeUser, getUser, getRoomUsers } = require('./roomUsers');

const registerSocketEvents = (io) => {
  io.on('connection', (socket) => {

    socket.on('joinRoom', ({ username, room }, cb) => {
      const { error, user } = addUser({ id: socket.id, username, room });
      if (error) return cb({ error });

      socket.join(room);                 // Add socket to the room 
      socket.emit('notification', `Welcome, ${username}!`);
      socket.to(room).emit('notification', `${username} joined the room.`);             // Notifying everyone in the room
      io.to(room).emit('roomUsers', getRoomUsers(room));
      cb({});
    });

    socket.on('sendMessage', (text, cb) => {
      const user = getUser(socket.id);
      if (!user) return cb({ error: 'User not found' });

      io.to(user.room).emit('newMessage', { sender: user.username, text });    // Broadcast message to everyone in the room including sender
      cb({});
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit('notification', `${user.username} left the room.`);
        io.to(user.room).emit('roomUsers', getRoomUsers(user.room));
      }
    });
  });
};

module.exports = registerSocketEvents;