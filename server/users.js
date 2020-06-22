let users = [];

const userModel = {
  name: "name",
  room: "room",
};

const addUser = (id, name, room) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (name) => users.room === room && user.name === name
  );

  if (existingUser) return { error: "Username is taken" };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = () => {
  return users.filter((user) => user.room === room);
};

const clearUsers = () => {
  users = [];
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom, clearUsers };
