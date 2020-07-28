const { initMessageListeners } = require("./messages");

// Initialize all projects with listeners
const initProjects = (io, projects) => {
  projects.forEach((project) => {
    initProject(io, project);
    console.log(project.name, "initialized");
  });
};

// Initialize newly created project with listeners
const createProject = (socket, data) => {
  // Listening for new project from client
  socket.on("createProject", (createdProject) => {
    // Emit created project to client
    socket.emit("receiveCreatedProject", { createdProject }, () => {
      initProject(createdProject);
    });
  });
};

// Initialize a project with socket listeners
const initProject = (io, project) => {
  // Create namespace for a project
  const projectNsp = io.of(`/${project._id}`);

  projectNsp.on("connection", (socket) => {
    console.log("New connection in", project.name);

    // Socket joins every channel in project
    project.channels.forEach((channel) => {
      socket.join(channel._id);
    });

    // Initialize message listeners
    // initMessageListeners(socket);
    // Listening for message from client
    socket.on("sendMessage", ({ data, channelId, projectId }, callback) => {
      const messageObject = {
        _id: 131313,
        user: "John Doe",
        text: "Yo wassup",
        date: "7/4/2020 12:11",
      };

      console.log("\tNew message in", channelId);

      // Emits message to other clients in same namespace and room
      socket.broadcast
        .to(channelId)
        .emit("message", { type: "CREATE", data, channelId, projectId });

      callback();
    });

    // Listening for message from client
    socket.on("deleteMessage", ({ data, channelId, projectId }) => {
      console.log("\tDeleted message in", channelId);

      // Emits message info to other clients in same namespace and room to remove in frontend
      socket.broadcast
        .to(channelId)
        .emit("message", { type: "DELETE", data, channelId, projectId });
    });
  });
};

module.exports = { initProjects };
