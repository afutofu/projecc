const socketio = require("socket.io");

const Project = require("./models/Project");

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

      // MESSAGE EVENT LISTENERS

      // Listening for message from client
      socket.on("sendMessage", ({ data, channelId, projectId }, callback) => {
        const messageObject = {
          _id: 131313,
          username: "John Doe",
          userId: "2r2v4t2vq",
          text: "Yo wassup",
          date: "7/4/2020 12:11",
        };

        console.log("\tNew message in", channelId);

        // Emits message to other clients in same room to be created in frontend
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

      // CHANNEL EVENT LISTENERS
      socket.on("createChannel", ({ data, projectId }, callback) => {
        console.log("\tNew channel in", projectId);

        // Emits message to other clients in same room to create channel in frontend
        socket.broadcast.emit("channel", {
          type: "CREATE",
          data,
          projectId,
        });

        callback();
      });

      socket.on("renameChannel", ({ data, channelId, projectId }, callback) => {
        console.log("\tRenamed channel", channelId);

        // Emits message to other clients in same room to create channel in frontend
        socket.broadcast.emit("channel", {
          type: "RENAME",
          data,
          channelId,
          projectId,
        });

        callback();
      });

      socket.on("deleteChannel", ({ channelId, projectId }) => {
        console.log("\tDeleted channel in", projectId);

        // Emits message to other clients in same room to create channel in frontend
        socket.broadcast.emit("channel", {
          type: "DELETE",
          channelId,
          projectId,
        });
      });

      // PROJECT EVENT LISTENERS
      socket.on("createProject", ({ data }, callback) => {
        console.log("\tNew project");

        // Emits message to other clients in same room to create channel in frontend
        socket.broadcast.emit("project", {
          type: "CREATE",
          data,
        });

        callback();
      });

      socket.on("renameProject", ({ data, projectId }, callback) => {
        console.log("\tRenamed project", projectId);

        // Emits message to other clients in same room to create channel in frontend
        socket.broadcast.emit("project", {
          type: "RENAME",
          data,
          projectId,
        });

        callback();
      });

      socket.on("deleteProject", ({ projectId }) => {
        console.log("\tDeleted project", projectId);

        // Emits message to other clients in same room to create channel in frontend
        socket.broadcast.emit("project", {
          type: "DELETE",
          projectId,
        });
      });

      // Listening for client force diconnect on app
      socket.on("forceDisconnect", () => {
        socket.disconnect();
      });

      // Listening for client diconnect on app
      socket.on("disconnect", () => {
        console.log(socket.id, "has disconnected");
        socket.removeAllListeners("connection");
        socket.disconnect();
      });
    });
  });
};

module.exports = { connectSocket };
