const users = new Map();

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) return { error: 'Username and room are required' };
  if (users.has(id)) return { error: 'User already exists' };

  const user = { id, username, room };
  users.set(id, user);
  return { user };
};

const removeUser = (id) => {
  const user = users.get(id);
  users.delete(id);
  return user;
};

const getUser = (id) => users.get(id);

const getRoomUsers = (room) =>
  [...users.values()].filter((u) => u.room === room);

module.exports = { addUser, removeUser, getUser, getRoomUsers };