const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New connection!!");

  socket.on("joinChat", ({ name, channel }, callback) => {
    const { error, user } = addUser(socket.id, name, channel);

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      msg: `${user.name}, welcome to the room ${user.room}`,
      channel: user.room,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      msg: `${user.name} has joined`,
      channel: user.room,
    });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      user: user.name,
      msg: message.msg,
      channel: message.channel,
    });

    callback();
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "has disconnected");
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
