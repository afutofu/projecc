import {
  CHANGE_CHANNEL,
  RECEIVE_MESSAGE,
  CREATE_CHANNEL,
  DELETE_CHANNEL,
  CREATE_PROJECT,
  SET_SELECTED_PROJECT,
} from "./actions";

export const changeChannel = (channel) => {
  return {
    type: CHANGE_CHANNEL,
    payload: { channel },
  };
};

export const receiveMessage = (message) => {
  const { user, msg, channel } = message;
  return {
    type: RECEIVE_MESSAGE,
    payload: { user, msg, channel },
  };
};

export const createChannel = (channel, projectName) => {
  return {
    type: CREATE_CHANNEL,
    payload: { channel, projectName },
  };
};

export const deleteChannel = (channel, projectName) => {
  return {
    type: DELETE_CHANNEL,
    payload: { channel, projectName },
  };
};

export const createProject = (project) => {
  const { name } = project;
  return {
    type: CREATE_PROJECT,
    payload: { name, channels: { general: [] }, selectedChannel: "general" },
  };
};

export const setSelectedProject = (project) => {
  return {
    type: SET_SELECTED_PROJECT,
    payload: { project },
  };
};
