const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  clearUsers,
} = require("./users");
const { createProject, clearProjects } = require("./projects");

const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  // console.log("New connection!!");

  socket.on("createProject", ({ projectName, creatorName }) => {
    const { createdProject } = createProject(projectName, creatorName);

    socket.emit("receiveCreatedProject", { createdProject }, () => {
      // Create namespace for a project
      const projectNsp = io.of(`/${createdProject.name}`);

      projectNsp.once("connection", (socket) => {
        // Listening for socket to join channel
        socket.on("joinChannel", ({ name, channel }, callback) => {
          console.log(name, channel);

          const { error, user } = addUser(socket.id, name, channel);
          if (error) return callback(error);

          // Send welcome message to joining user
          // socket.emit("message", {
          //   user: "admin",
          //   msg: `${user.name}, welcome to the ${user.room} channel`,
          //   projectName: createdProject.name,
          //   channel: user.room,
          // });

          // Send alert message to other users in room
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

          projectNsp.to(user.room).emit("message", {
            user: user.name,
            msg: message.msg,
            projectName: message.projectName,
            channel: message.channel,
          });

          callback();
        });

        // Listening for socket to leave channel
        socket.on("disconnect", () => {
          // const connectedNspSockets = Object.keys(projectNsp.connected);
          // connectedNspSockets.forEach((socketId) => {
          //   projectNsp.connected[socketId].disconnect();
          // });
          // projectNsp.removeAllListeners();
          // delete io.nsps[`/${createdProject.name}`];
          removeUser(socket.id);
          console.log(socket.id, "has left the channel");
          socket.off;
        });
      });
    });
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "has disconnected");
    clearProjects();
    removeUser(socket.id);
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
