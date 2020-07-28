const socketio = require("socket.io");

const Project = require("../models/Project");

const connectSocket = (server) => {
  const io = socketio(server);

  // Find all projects in database
  Project.find(async (err, projects) => {
    if (err) return (projects = []);

    io.on("connection", (socket) => {
      // Socket joins every channel
      socket.on("initSockets", () => {
        console.log(socket.id, "has connected");
        projects.forEach((project) => {
          project.channels.forEach((channel) => {
            socket.join(`/channels/${channel._id}`);
          });
        });
      });

      // Listening for message from client
      socket.on("sendMessage", ({ data, channelId, projectId }, callback) => {
        const messageObject = {
          _id: 131313,
          user: "John Doe",
          text: "Yo wassup",
          date: "7/4/2020 12:11",
        };

        console.log("\tNew message in", channelId);

        // Emits message to other clients in same room
        socket.broadcast.emit("message", {
          type: "CREATE",
          data,
          channelId,
          projectId,
        });

        callback();
      });

      // Listening for message from client
      socket.on("deleteMessage", ({ data, channelId, projectId }) => {
        console.log("\tDeleted message in", channelId);

        // Emits message info to other clients in same room to remove in frontend
        socket.broadcast.emit("message", {
          type: "DELETE",
          data,
          channelId,
          projectId,
        });
      });

      // Listening for client diconnect on app
      socket.on("disconnect", () => {
        console.log(socket.id, "has disconnected");
        socket.removeAllListeners("connection");
      });
    });
  });
};

module.exports = { connectSocket };
