const socketio = require("socket.io");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  clearUsers,
} = require("./users");
const { createProject, clearProjects } = require("./projects");

const connectSocket = (server) => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    // Listening for new project from client
    socket.on("createProject", ({ projectName, creatorName }) => {
      const { createdProject } = createProject(projectName, creatorName);

      // Emit created project to client
      socket.emit("receiveCreatedProject", { createdProject }, () => {
        // Create namespace for a project
        const projectNsp = io.of(`/${createdProject.name}`);

        projectNsp.once("connection", (socket) => {
          // Listening for socket to join channel
          socket.on("joinChannel", ({ name, channel }, callback) => {
            console.log(name, channel);

            const { error, user } = addUser(socket.id, name, channel);
            if (error) return callback(error);

            // Send alert message to other users in room
            socket.broadcast.to(user.room).emit("message", {
              user: "admin",
              msg: `${user.name} has joined`,
              channel: user.room,
            });

            socket.join(user.room);

            callback();
          });

          // Listening for message from client
          socket.on("sendMessage", (message, callback) => {
            const user = getUser(socket.id);

            // Emits message to all clients in same namespace and room
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
            removeUser(socket.id);
            console.log(socket.id, "has left the channel");
            socket.off;
          });
        });
      });
    });

    // Listening for client diconnect on app
    socket.on("disconnect", () => {
      console.log(socket.id, "has disconnected");
      clearProjects();
      removeUser(socket.id);
    });
  });
};

module.exports = { connectSocket };
