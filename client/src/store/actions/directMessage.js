import axios from "axios";
import {
  FETCH_DIRECT_MESSAGES_SUCCESS,
  FETCH_DIRECT_MESSAGES_FAIL,
  START_DIRECT_MESSAGE_SUCCESS,
  START_DIRECT_MESSAGE_FAIL,
} from "./actions";
import { tokenConfig } from "../../shared/utils";

export const fetchDirectMessages = (userId) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    axios
      .get(
        `http://localhost:5000/api/users/${userId}/directMessages`,
        tokenConfig(getState)
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
        `http://localhost:5000/api/users/${userId}/directMessages`,
        { friendId },
        tokenConfig(getState)
      )
      .then((res) => {
        const { directMessage } = res.data;
        dispatch(startDirectMessageSuccess(directMessage));
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
