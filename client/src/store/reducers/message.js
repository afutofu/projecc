import {
  SET_SELECTED_CHANNEL,
  RECEIVE_MESSAGE,
  SET_SELECTED_PROJECT,
  FETCH_PROJECTS_BEGIN,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAIL,
  CREATE_CHANNEL_BEGIN,
  CREATE_CHANNEL_SUCCESS,
  CREATE_CHANNEL_FAIL,
  DELETE_CHANNEL_BEGIN,
  DELETE_CHANNEL_SUCCESS,
  DELETE_CHANNEL_FAIL,
  CREATE_MESSAGE_BEGIN,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  DELETE_MESSAGE_BEGIN,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
} from "../actions/actions";

let initialState = {
  loading: false,
  error: false,
  projects: [],
  selectedProject: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROJECTS_SUCCESS:
      return fetchProjectsSuccess(state, action);
    case FETCH_PROJECTS_FAIL:
      return fetchProjectsFail(state, action);
    case SET_SELECTED_CHANNEL:
      return setSelectedChannel(state, action);
    case RECEIVE_MESSAGE:
      return receiveMessage(state, action);
    case CREATE_CHANNEL_BEGIN:
      return createChannelBegin(state, action);
    case CREATE_CHANNEL_SUCCESS:
      return createChannelSuccess(state, action);
    case CREATE_CHANNEL_FAIL:
      return createChannelFail(state, action);
    case DELETE_CHANNEL_BEGIN:
      return deleteChannelBegin(state, action);
    case DELETE_CHANNEL_SUCCESS:
      return deleteChannelSuccess(state, action);
    case DELETE_CHANNEL_FAIL:
      return deleteChannelFail(state, action);
    case CREATE_MESSAGE_BEGIN:
      return createMessageBegin(state, action);
    case CREATE_MESSAGE_SUCCESS:
      return createMessageSuccess(state, action);
    case CREATE_MESSAGE_FAIL:
      return createMessageFail(state, action);
    case DELETE_MESSAGE_BEGIN:
      return deleteMessageBegin(state, action);
    case DELETE_MESSAGE_SUCCESS:
      return deleteMessageSuccess(state, action);
    case DELETE_MESSAGE_FAIL:
      return deleteMessageFail(state, action);
    case SET_SELECTED_PROJECT:
      return setSelectedProject(state, action);
    default:
      return state;
  }
};

const fetchProjectsSuccess = (state, action) => {
  const { projects } = action.payload;

  const newProjects = projects.map((project) => {
    project.selectedChannel = project.channels[0];
    return project;
  });

  return {
    ...state,
    projects: newProjects,
  };
};

const fetchProjectsFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};

const setSelectedChannel = (state, action) => {
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

const receiveMessage = (state, action) => {
  const { user, msg, projectName, channel } = action.payload;

  let newState = { ...state };

  newState.projects.map((project) => {
    if (project.name === projectName) {
      project.channels = {
        ...project.channels,
        [channel]: [...project.channels[channel], { user, msg }],
      };
      return project;
    }
    return project;
  });

  return newState;
};

// CREATE CHANNEL
const createChannelBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const createChannelSuccess = (state, action) => {
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

const createChannelFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};

// DELETE CHANNEL
const deleteChannelBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const deleteChannelSuccess = (state, action) => {
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

const deleteChannelFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};

// CREATE MESSAGE
const createMessageBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const createMessageSuccess = (state, action) => {
  const { newMessage, channelId, projectId } = action.payload;

  let newSelectedProject = {
    ...state.selectedProject,
  };

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id == projectId) {
        project.channels.map((channel) => {
          if (channel._id == channelId) {
            channel.messages.push(newMessage);
          }
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

const createMessageFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};

// DELETE MESSAGE
const deleteMessageBegin = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const deleteMessageSuccess = (state, action) => {
  const { updatedChannel, channelId, projectId } = action.payload;

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project._id == projectId) {
        project.channels.map((channel) => {
          if (channel._id == channelId) {
            channel = {
              ...updatedChannel,
            };
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

const deleteMessageFail = (state, action) => {
  return {
    ...state,
    error: action.payload.err,
    loading: false,
  };
};

const setSelectedProject = (state, action) => {
  return {
    ...state,
    selectedProject: action.payload.project,
  };
};

export default messageReducer;
