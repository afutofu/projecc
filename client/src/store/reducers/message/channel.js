// SET SELECTED CHANNEL
export const setSelectedChannel = (state, action) => {
  const projectId = action.payload.projectId;
  const newSelectedChannelId = action.payload.channelId;

  let newSelectedProject = {
    ...state.selectedProject,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels.forEach((channel) => {
          if (channel._id === newSelectedChannelId) {
            project.selectedChannel = channel;
          }
        });
        newSelectedProject = {
          ...project,
        };
      }
      return project;
    }),
    selectedProject: newSelectedProject,
  };
};

// CREATE CHANNEL
export const createChannelBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const createChannelSuccess = (state, action) => {
  const createdChannel = action.payload.channel;
  const projectId = action.payload.projectId;

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels.push(createdChannel);
        project.selectedChannel = createdChannel;
      }
      return project;
    }),
    loading: false,
  };
};

export const createChannelFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};

// RENAME CHANNEL
export const renameChannelBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const renameChannelSuccess = (state, action) => {
  const { newChannelName, channelId, projectId } = action.payload;

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels = project.channels.map((channel) => {
          if (channel._id === channelId) {
            channel.name = newChannelName.name;
          }
          return channel;
        });
      }
      return project;
    }),
    loading: false,
  };
};

export const renameChannelFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};

// DELETE CHANNEL
export const deleteChannelBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const deleteChannelSuccess = (state, action) => {
  const updatedProject = action.payload.updatedProject;

  let newProject = {
    ...updatedProject,
    selectedChannel:
      state.selectedProject.channels.length > 0
        ? state.selectedProject.channels[0]
        : null,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === updatedProject._id) {
        // Replace the current project with the updated project without the deleted channel
        project = {
          ...newProject,
        };
      }
      return project;
    }),
    selectedProject: {
      ...newProject,
    },
    loading: false,
  };
};

export const deleteChannelFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};
