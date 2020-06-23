import {
  SET_SELECTED_CHANNEL,
  RECEIVE_MESSAGE,
  CREATE_CHANNEL,
  DELETE_CHANNEL,
  CREATE_PROJECT,
  SET_SELECTED_PROJECT,
  FETCH_PROJECTS_BEGIN,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAIL,
} from "../actions/actions";

let initialState = {
  loading: false,
  error: false,
  projects: [],
  selectedProject: null,
};

const fetchProjectsSuccess = (state, payload) => {
  const { projects } = payload;
  let newProjects = [];

  Object.keys(projects).forEach((key) => {
    let project = projects[key];
    if (Object.keys(project.channels).length > 0) {
      // Set selectedChannel to first channel in channels
      project.selectedChannel = Object.keys(project.channels)[0];
    } else {
      project.selectedChannel = null;
    }
    newProjects.push(project);
  });

  return {
    ...state,
    projects: newProjects,
  };
};

const setSelectedChannel = (state, action) => {
  const projectName = action.payload.project.name;
  const newSelectedChannel = action.payload.channel;

  let newState = { ...state };

  newState.projects.map((project) => {
    if (project.name === projectName) {
      project.selectedChannel = newSelectedChannel;
    }
    return project;
  });

  return newState;
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

const createChannel = (state, action) => {
  const projectName = action.payload.project.name;
  const newChannel = action.payload.channel;

  let newSelectedProject = state.selectedProject;

  let newState = {
    ...state,
    projects: state.projects.map((project) => {
      if (project.name === projectName) {
        newSelectedProject = {
          ...project,
          channels: { ...project.channels, [newChannel]: [] },
          selectedChannel: newChannel,
        };
        return newSelectedProject;
      }
      return project;
    }),
  };

  newState = {
    ...newState,
    selectedProject: newSelectedProject,
  };

  return newState;
};

const deleteChannel = (state, action) => {
  const projectName = action.payload.projectName;
  const channelToDelete = action.payload.channel;

  let newState = { ...state };

  newState.projects.map((project) => {
    if (project.name === projectName) {
      delete project.channels[channelToDelete];

      if (Object.keys(project.channels).length > 0) {
        project.selectedChannel = Object.keys(project.channels)[0];
      } else {
        project.selectedChannel = null;
      }
    }
    return project;
  });

  return newState;
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROJECTS_SUCCESS:
      return fetchProjectsSuccess(state, action.payload);
    case FETCH_PROJECTS_FAIL:
      return {
        ...state,
        error: action.payload.err,
        loading: false,
      };
    case SET_SELECTED_CHANNEL:
      return setSelectedChannel(state, action);
    case RECEIVE_MESSAGE:
      return receiveMessage(state, action);
    case CREATE_CHANNEL:
      return createChannel(state, action);
    case DELETE_CHANNEL:
      return deleteChannel(state, action);
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        selectedProject: action.payload,
      };
    case SET_SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: action.payload.project,
      };

    default:
      return state;
  }
};

export default messageReducer;
