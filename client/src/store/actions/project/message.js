import axios from "axios";
import {
  CREATE_MESSAGE_CLIENT,
  CREATE_MESSAGE_BEGIN,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  DELETE_MESSAGE_CLIENT,
  DELETE_MESSAGE_BEGIN,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
} from "../actions";
import { tokenConfig } from "../../../shared/utils";

// CREATE MESSAGE
export const createMessageClient = (newMessage, channelId, projectId) => {
  return {
    type: CREATE_MESSAGE_CLIENT,
    payload: { newMessage, channelId, projectId },
  };
};

export const createMessage = (message, channelId, projectId) => (
  dispatch,
  getState
) => {
  return new Promise(function (resolve, reject) {
    dispatch(createMessageBegin());
    axios
      .post(
        `http://localhost:5000/api/projects/${projectId}/channels/${channelId}/messages`,
        message,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch(createMessageSuccess(res.data, channelId, projectId));
        resolve({ data: res.data, channelId, projectId });
      })
      .catch((err) => {
        dispatch(createMessageFail(err));
        reject(err);
      });
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
export const deleteMessageClient = (updatedChannel, channelId, projectId) => {
  return {
    type: DELETE_MESSAGE_CLIENT,
    payload: { updatedChannel, channelId, projectId },
  };
};

export const deleteMessage = (messageId, channelId, projectId) => (
  dispatch,
  getState
) => {
  return new Promise(function (resolve, reject) {
    dispatch(deleteMessageBegin());
    axios
      .delete(
        `http://localhost:5000/api/projects/${projectId}/channels/${channelId}/messages/${messageId}`,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch(deleteMessageSuccess(res.data, channelId, projectId));
        resolve({ data: res.data, channelId, projectId });
      })
      .catch((err) => {
        dispatch(deleteMessageFail(err));
        reject(err);
      });
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
