let projects = [];

const projectModel = {
  name: "name",
  members: ["memberId"],
  channels: { general: [] },
  selectedChannel: "general",
};

const createProject = (projectName, creatorName) => {
  const createdProject = {
    name: projectName,
    members: [creatorName],
    channels: { general: [] },
    selectedChannel: "general",
  };

  projects.push(createdProject);

  return { createdProject };
};

module.exports = { createProject };
