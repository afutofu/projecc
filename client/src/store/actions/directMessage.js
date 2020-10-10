import axios from "axios";
import {
  FETCH_DIRECT_MESSAGES_SUCCESS,
  FETCH_DIRECT_MESSAGES_FAIL,
  CREATE_DIRECT_MESSAGE_GROUP_CLIENT,
  CREATE_DIRECT_MESSAGE_GROUP_SUCCESS,
  CREATE_DIRECT_MESSAGE_GROUP_FAIL,
  DELETE_DIRECT_MESSAGE_GROUP_CLIENT,
  DELETE_DIRECT_MESSAGE_GROUP_SUCCESS,
  DELETE_DIRECT_MESSAGE_GROUP_FAIL,
  CREATE_DIRECT_MESSAGE_CLIENT,
  CREATE_DIRECT_MESSAGE_SUCCESS,
  CREATE_DIRECT_MESSAGE_FAIL,
  DELETE_DIRECT_MESSAGE_CLIENT,
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

// CREATE DIRECT MESSAGE GROUP
export const createDirectMessageGroupClient = (directMessage) => {
  return {
    type: CREATE_DIRECT_MESSAGE_GROUP_CLIENT,
    payload: { directMessage },
  };
};

export const createDirectMessageGroup = (userId, friendId) => (
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
        dispatch(createDirectMessageGroupSuccess(directMessage));
        dispatch(setHomeItem(directMessage._id));
        resolve(directMessage);
      })
      .catch((error) => {
        dispatch(createDirectMessageGroupFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const createDirectMessageGroupSuccess = (directMessage) => {
  return {
    type: CREATE_DIRECT_MESSAGE_GROUP_SUCCESS,
    payload: { directMessage },
  };
};

const createDirectMessageGroupFail = (error) => {
  return {
    type: CREATE_DIRECT_MESSAGE_GROUP_FAIL,
    payload: { error },
  };
};

// DELETE DIRECT MESSAGE GROUP
export const deleteDirectMessageGroupClient = (directMessage) => (
  dispatch,
  getState
) => {
  const { homeItem } = getState().home;
  if (directMessage._id == homeItem) {
    dispatch({
      type: DELETE_DIRECT_MESSAGE_GROUP_CLIENT,
      payload: { directMessage },
    });
    dispatch(setHomeItem("friends"));
  }

  dispatch({
    type: DELETE_DIRECT_MESSAGE_GROUP_CLIENT,
    payload: { directMessage },
  });
};

export const deleteDirectMessageGroup = (directMessageId) => (
  dispatch,
  getState
) => {
  return new Promise(function (resolve, reject) {
    axios
      .delete(
        `http://localhost:5000/api/directMessages/${directMessageId}`,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch(deleteDirectMessageGroupSuccess(res.data));
        dispatch(setHomeItem("friends"));
        resolve(res.data);
      })
      .catch((error) => {
        dispatch(deleteDirectMessageGroupFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const deleteDirectMessageGroupSuccess = (directMessage) => {
  return {
    type: DELETE_DIRECT_MESSAGE_GROUP_SUCCESS,
    payload: { directMessage },
  };
};

const deleteDirectMessageGroupFail = (error) => {
  return {
    type: DELETE_DIRECT_MESSAGE_GROUP_FAIL,
    payload: { error },
  };
};

// CREATE DIRECT MESSAGE
export const createDirectMessageClient = (newMessage, directMessageId) => {
  return {
    type: CREATE_DIRECT_MESSAGE_CLIENT,
    payload: { newMessage, directMessageId },
  };
};

export const createDirectMessage = ({
  directMessageId,
  userId,
  username,
  text,
}) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    axios
      .post(
        `http://localhost:5000/api/directMessages/${directMessageId}/messages`,
        { userId, username, text },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch(createDirectMessageSuccess(res.data, directMessageId));
        resolve({ message: res.data, directMessageId });
      })
      .catch((error) => {
        console.log(error);
        dispatch(createDirectMessageFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const createDirectMessageSuccess = (newMessage, directMessageId) => {
  return {
    type: CREATE_DIRECT_MESSAGE_SUCCESS,
    payload: { newMessage, directMessageId },
  };
};

const createDirectMessageFail = (error) => {
  return {
    type: CREATE_DIRECT_MESSAGE_FAIL,
    payload: { error },
  };
};

// DELETE DIRECT MESSAGE
export const deleteDirectMessageClient = (messageId, directMessageId) => {
  return {
    type: DELETE_DIRECT_MESSAGE_CLIENT,
    payload: { messageId, directMessageId },
  };
};

export const deleteDirectMessage = ({ messageId, directMessageId }) => (
  dispatch,
  getState
) => {
  return new Promise(function (resolve, reject) {
    axios
      .delete(
        `http://localhost:5000/api/directMessages/${directMessageId}/messages/${messageId}`,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch(deleteDirectMessageSuccess(messageId, directMessageId));
        resolve({ messageId, directMessageId });
      })
      .catch((error) => {
        dispatch(deleteDirectMessageFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const deleteDirectMessageSuccess = (messageId, directMessageId) => {
  return {
    type: DELETE_DIRECT_MESSAGE_SUCCESS,
    payload: { messageId, directMessageId },
  };
};

const deleteDirectMessageFail = (error) => {
  return {
    type: DELETE_DIRECT_MESSAGE_FAIL,
    payload: { error },
  };
};
