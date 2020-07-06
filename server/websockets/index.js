const socketio = require("socket.io");

const { initProjects } = require("./projects");

const Project = require("../models/Project");

let projects = [];

const connectSocket = (server) => {
  const io = socketio(server);

  Project.find(async (err, projects) => {
    if (err) return (projects = []);
    projects = projects;

    console.log(projects);
    initProjects(io, projects);

    io.on("connection", (socket) => {
      // Listening for client diconnect on app
      socket.on("disconnect", () => {
        console.log(socket.id, "has disconnected");
        socket.removeAllListeners("connection");
      });
    });
  });
};

module.exports = { connectSocket };
