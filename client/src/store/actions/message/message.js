import axios from "axios";
import {
  RECEIVE_MESSAGE,
  CREATE_MESSAGE_BEGIN,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  DELETE_MESSAGE_BEGIN,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
} from "../actions";

// RECEIVE MESSAGE
export const receiveMessage = (message) => {
  const { user, msg, projectName, channel } = message;
  return {
    type: RECEIVE_MESSAGE,
    payload: { user, msg, projectName, channel },
  };
};

// CREATE MESSAGE
export const createMessage = (message, channelId, projectId) => (dispatch) => {
  const messageObj = {
    text: "text",
    user: "user",
  };

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
