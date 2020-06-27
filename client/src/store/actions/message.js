import axios from "axios";

import {
  SET_SELECTED_CHANNEL,
  RECEIVE_MESSAGE,
  SET_SELECTED_PROJECT,
  FETCH_PROJECTS_BEGIN,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAIL,
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
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
} from "./actions";

export const setSelectedChannel = (channelId, projectId) => {
  return {
    type: SET_SELECTED_CHANNEL,
    payload: { channelId, projectId },
  };
};

export const receiveMessage = (message) => {
  const { user, msg, projectName, channel } = message;
  return {
    type: RECEIVE_MESSAGE,
    payload: { user, msg, projectName, channel },
  };
};

export const setSelectedProject = (project) => {
  return {
    type: SET_SELECTED_PROJECT,
    payload: { project },
  };
};

// FETCH PROJECT
export const fetchProjects = () => (dispatch) => {
  dispatch(fetchProjectsBegin());
  axios
    .get("http://localhost:5000/api/projects")
    .then((res) => {
      dispatch(fetchProjectsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchProjectsFail(err));
    });
};

const fetchProjectsBegin = () => {
  return {
    type: FETCH_PROJECTS_BEGIN,
  };
};

const fetchProjectsSuccess = (projects) => {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    payload: { projects },
  };
};

const fetchProjectsFail = (err) => {
  return {
    type: FETCH_PROJECTS_FAIL,
    payload: { err },
  };
};

// CREATE PROJECT
export const createProject = ({ name, creatorName }) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    dispatch(createProjectBegin());
    axios
      .post("http://localhost:5000/api/projects", { name, creatorName })
      .then((res) => {
        dispatch(createProjectSuccess(res.data));
        resolve(res.data);
      })
      .catch((err) => {
        dispatch(createProjectFail(err));
        reject(err);
      });
  });
};

const createProjectBegin = () => {
  return {
    type: CREATE_PROJECT_BEGIN,
  };
};

const createProjectSuccess = (project) => {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: { project },
  };
};

const createProjectFail = (err) => {
  return {
    type: CREATE_PROJECT_FAIL,
    payload: { err },
  };
};

// CREATE CHANNEL
export const createChannel = (channelName, projectId) => (dispatch) => {
  dispatch(createChannelBegin());
  axios
    .post(`http://localhost:5000/api/projects/${projectId}/channels`, {
      channelName,
    })
    .then((res) => {
      dispatch(createChannelSuccess(res.data, projectId));
    })
    .catch((err) => {
      dispatch(createChannelFail(err));
    });
};

const createChannelBegin = () => {
  return {
    type: CREATE_CHANNEL_BEGIN,
  };
};

const createChannelSuccess = (channel, projectId) => {
  return {
    type: CREATE_CHANNEL_SUCCESS,
    payload: { channel, projectId },
  };
};

const createChannelFail = (err) => {
  return {
    type: CREATE_CHANNEL_FAIL,
    payload: { err },
  };
};

// DELETE CHANNEL
export const deleteChannel = (channelId, projectId) => (dispatch) => {
  dispatch(deleteChannelBegin());
  axios
    .delete(
      `http://localhost:5000/api/projects/${projectId}/channels/${channelId}`
    )
    .then((res) => {
      dispatch(deleteChannelSuccess(res.data));
    })
    .catch((err) => {
      dispatch(deleteChannelFail(err));
    });
};

const deleteChannelBegin = () => {
  return {
    type: DELETE_CHANNEL_BEGIN,
  };
};

const deleteChannelSuccess = (updatedProject) => {
  return {
    type: DELETE_CHANNEL_SUCCESS,
    payload: { updatedProject },
  };
};

const deleteChannelFail = (err) => {
  return {
    type: DELETE_CHANNEL_FAIL,
    payload: { err },
  };
};

// CREATE MESSAGE
export const createMessage = (message, channelId, projectId) => (dispatch) => {
  // const messageObj = {
  //   text: "text",
  //   user: "user"
  // }

  dispatch(createMessageBegin());
  axios
    .post(
      `http://localhost:5000/api/projects/${projectId}/channels/${channelId}/messages`,
      message
    )
    .then((res) => {
      dispatch(createMessageSuccess(res.data, channelId, projectId));
    })
    .catch((err) => {
      dispatch(createMessageFail(err));
    });
};

const createMessageBegin = () => {
  return {
    type: CREATE_MESSAGE_BEGIN,
  };
};

const createMessageSuccess = (newMessage, channelId, projectId) => {
  return {
    type: CREATE_MESSAGE_SUCCESS,
    payload: { newMessage, channelId, projectId },
  };
};

const createMessageFail = (err) => {
  return {
    type: CREATE_MESSAGE_FAIL,
    payload: { err },
  };
};

// DELETE MESSAGE
export const deleteMessage = (messageId, channelId, projectId) => (
  dispatch
) => {
  dispatch(deleteMessageBegin());
  axios
    .delete(
      `http://localhost:5000/api/projects/${projectId}/channels/${channelId}/messages/${messageId}`
    )
    .then((res) => {
      dispatch(deleteMessageSuccess(res.data, channelId, projectId));
    })
    .catch((err) => {
      dispatch(deleteMessageFail(err));
    });
};

const deleteMessageBegin = () => {
  return {
    type: DELETE_MESSAGE_BEGIN,
  };
};

const deleteMessageSuccess = (updatedChannel, channelId, projectId) => {
  return {
    type: DELETE_MESSAGE_SUCCESS,
    payload: { updatedChannel, channelId, projectId },
  };
};

const deleteMessageFail = (err) => {
  return {
    type: DELETE_MESSAGE_FAIL,
    payload: { err },
  };
};
