import axios from "axios";
import {
  FETCH_DIRECT_MESSAGES_SUCCESS,
  FETCH_DIRECT_MESSAGES_FAIL,
  START_DIRECT_MESSAGE_SUCCESS,
  START_DIRECT_MESSAGE_FAIL,
  CREATE_DIRECT_MESSAGE_SUCCESS,
  CREATE_DIRECT_MESSAGE_FAIL,
  DELETE_DIRECT_MESSAGE_SUCCESS,
  DELETE_DIRECT_MESSAGE_FAIL,
} from "./actions";
import { tokenConfig } from "../../shared/utils";
import { setHomeItem } from "./index";

export const fetchDirectMessages = (userId) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    axios
      .get(
        `http://localhost:5000/api/directMessages`,
        tokenConfig(getState, { userId })
      )
      .then((res) => {
        const { directMessages } = res.data;
        dispatch(fetchDirectMessagesSuccess(directMessages));
        resolve(directMessages);
      })
      .catch((error) => {
        dispatch(fetchDirectMessagesFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const fetchDirectMessagesSuccess = (directMessages) => {
  return {
    type: FETCH_DIRECT_MESSAGES_SUCCESS,
    payload: { directMessages },
  };
};

const fetchDirectMessagesFail = (error) => {
  return {
    type: FETCH_DIRECT_MESSAGES_FAIL,
    payload: { error },
  };
};

export const startDirectMessage = (userId, friendId) => (
  dispatch,
  getState
) => {
  return new Promise(function (resolve, reject) {
    axios
      .post(
        `http://localhost:5000/api/directMessages`,
        { userId, friendId },
        tokenConfig(getState)
      )
      .then((res) => {
        const { directMessage } = res.data;
        dispatch(startDirectMessageSuccess(directMessage));
        dispatch(setHomeItem(directMessage._id));
        resolve(directMessage);
      })
      .catch((error) => {
        dispatch(startDirectMessageFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const startDirectMessageSuccess = (directMessage) => {
  return {
    type: START_DIRECT_MESSAGE_SUCCESS,
    payload: { directMessage },
  };
};

const startDirectMessageFail = (error) => {
  return {
    type: START_DIRECT_MESSAGE_FAIL,
    payload: { error },
  };
};

export const createDirectMessage = ({ directMessageId, userId, text }) => (
  dispatch,
  getState
) => {
  return new Promise(function (resolve, reject) {
    axios
      .post(
        `http://localhost:5000/api/directMessages/${directMessageId}/messages`,
        { userId, text },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch(createDirectMessageSuccess(res.data));
        resolve(res.data);
      })
      .catch((error) => {
        dispatch(createDirectMessageFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const createDirectMessageSuccess = (directMessage) => {
  return {
    type: CREATE_DIRECT_MESSAGE_SUCCESS,
    payload: { directMessage },
  };
};

const createDirectMessageFail = (error) => {
  return {
    type: CREATE_DIRECT_MESSAGE_FAIL,
    payload: { error },
  };
};

export const deleteDirectMessage = ({ directMessageId, messageId }) => (
  dispatch,
  getState
) => {
  return new Promise(function (resolve, reject) {
    console.log(directMessageId, messageId);
    axios
      .delete(
        `http://localhost:5000/api/directMessages/${directMessageId}/messages/${messageId}`,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch(deleteDirectMessageSuccess(res.data));
        resolve(res.data);
      })
      .catch((error) => {
        dispatch(deleteDirectMessageFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const deleteDirectMessageSuccess = (directMessage) => {
  return {
    type: DELETE_DIRECT_MESSAGE_SUCCESS,
    payload: { directMessage },
  };
};

const deleteDirectMessageFail = (error) => {
  return {
    type: DELETE_DIRECT_MESSAGE_FAIL,
    payload: { error },
  };
};
