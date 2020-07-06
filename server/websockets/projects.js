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

    // Listening for message from client
    socket.on("sendMessage", ({ message, channelId, projectId }, callback) => {
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
        .emit("message", { message, channelId, projectId });

      callback();
    });
  });
};

module.exports = { initProjects };
