// CREATE MESSAGE
export const createMessageClient = (state, action) => {
  const { newMessage, channelId, projectId } = action.payload;

  const sameProject = projectId === state.selectedProject._id;

  let newSelectedProject = {
    ...state.selectedProject,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels.map((channel) => {
          if (channel._id === channelId) {
            channel.messages.push(newMessage);
          }
          return channel;
        });
        if (sameProject) {
          newSelectedProject = project;
        }
      }
      return project;
    }),
    loading: false,
    selectedProject: { ...newSelectedProject },
  };
};

export const createMessageBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const createMessageSuccess = (state, action) => {
  const { newMessage, channelId, projectId } = action.payload;

  let newSelectedProject = {
    ...state.selectedProject,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels = project.channels.map((channel) => {
          if (channel._id === channelId) {
            channel.messages.push(newMessage);
          }
          return channel;
        });
        newSelectedProject = project;
      }
      return project;
    }),
    loading: false,
    selectedProject: {
      ...newSelectedProject,
    },
  };
};

export const createMessageFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};

// DELETE MESSAGE
export const deleteMessageClient = (state, action) => {
  const { updatedChannel, channelId, projectId } = action.payload;

  const sameProject = projectId === state.selectedProject._id;

  let newSelectedProject = {
    ...state.selectedProject,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels = project.channels.map((channel) => {
          if (channel._id === channelId) {
            return { ...updatedChannel };
          }
          return channel;
        });
        if (sameProject) {
          project.selectedChannel = { ...updatedChannel };
          newSelectedProject = project;
        }
      }
      return project;
    }),
    loading: false,
    selectedProject: {
      ...newSelectedProject,
    },
  };
};

export const deleteMessageBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const deleteMessageSuccess = (state, action) => {
  const { updatedChannel, channelId, projectId } = action.payload;

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id === projectId) {
        project.channels = project.channels.map((channel) => {
          if (channel._id === channelId) {
            return { ...updatedChannel };
          }
          return channel;
        });
      }
      return project;
    }),
    selectedProject: {
      ...state.selectedProject,
      selectedChannel: {
        ...updatedChannel,
      },
    },
    loading: false,
  };
};

export const deleteMessageFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};
