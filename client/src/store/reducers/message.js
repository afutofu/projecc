import {
  CHANGE_CHANNEL,
  RECEIVE_MESSAGE,
  CREATE_CHANNEL,
  DELETE_CHANNEL,
  CREATE_PROJECT,
  SET_SELECTED_PROJECT,
} from "../actions/actions";

let initialState = {
  channels: {
    general: [],
    music: [],
  },
  projects: [],
  selectedProject: null,
};

initialState = {
  ...initialState,
  selectedChannel: Object.keys(initialState.channels)[0],
};

// initialState = {
//   projects: {
//     channels: {
//       general: [],
//       music: [],
//     },
//     selectedChannel: null,
//   },
//   selectedProject: null,
// };

const createChannel = (state, action) => {
  const projectName = action.payload.projectName;
  const newChannel = action.payload.channel;

  return {
    ...state,
    projects: state.projects.map((project) => {
      if (project.name === projectName) {
        return {
          ...project,
          channels: { ...project.channels, [newChannel]: [] },
          selectedChannel: newChannel,
        };
      }
      return project;
    }),
  };
};

const deleteChannel = (state, action) => {
  const projectName = action.payload.projectName;
  const channelToDelete = action.payload.channel;

  let newSelectedChannel = null;
  let newState = { ...state };

  newState.projects.map((project) => {
    if (project.name === projectName) {
      if (Object.keys(project.channels).length > 0) {
        project.selectedChannel = Object.keys(project.channels)[0];
      }
      delete project.channels[channelToDelete];
    }
    return project;
  });

  return newState;
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CHANNEL:
      return {
        ...state,
        selectedChannel: action.payload.channel,
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.payload.channel]: [
            ...state.channels[action.payload.channel],
            { user: action.payload.user, msg: action.payload.msg },
          ],
        },
      };
    case CREATE_CHANNEL:
      // return {
      //   ...state,
      //   channels: { ...state.channels, [action.payload.channel]: [] },
      // };
      return createChannel(state, action);
    case DELETE_CHANNEL:
      return deleteChannel(state, action);
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        selectedProject: action.payload.name,
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
