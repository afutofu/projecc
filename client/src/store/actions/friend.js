import axios from "axios";
import {
  SET_FRIEND_STATUS_DISPLAY,
  STORE_FRIENDS,
  SEND_FRIEND_REQUEST_BEGIN,
  SEND_FRIEND_REQUEST_SUCCESS,
  SEND_FRIEND_REQUEST_FAIL,
  DELETE_FRIEND_REQUEST_BEGIN,
  DELETE_FRIEND_REQUEST_SUCCESS,
  DELETE_FRIEND_REQUEST_FAIL,
  DELETE_FRIEND_BEGIN,
  DELETE_FRIEND_SUCCESS,
  DELETE_FRIEND_FAIL,
} from "./actions";
import { tokenConfig } from "../../shared/utils";

export const setFriendStatusDisplay = (friendStatusDisplay) => {
  return {
    type: SET_FRIEND_STATUS_DISPLAY,
    payload: { friendStatusDisplay },
  };
};

export const storeFriends = (friends) => {
  return {
    type: STORE_FRIENDS,
    payload: { friends },
  };
};

export const sendFriendRequest = (userId, friendId) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    dispatch(sendFriendRequestBegin());
    axios
      .post(
        `http://localhost:5000/api/users/${userId}/friends/${friendId}/requests`,
        {},
        tokenConfig(getState)
      )
      .then((res) => {
        const { request } = res.data;
        dispatch(sendFriendRequestSuccess(request));
        resolve(request);
      })
      .catch((error) => {
        dispatch(sendFriendRequestFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const sendFriendRequestBegin = () => {
  return {
    type: SEND_FRIEND_REQUEST_BEGIN,
  };
};

const sendFriendRequestSuccess = (newRequest) => {
  return {
    type: SEND_FRIEND_REQUEST_SUCCESS,
    payload: { newRequest },
  };
};

const sendFriendRequestFail = (error) => {
  return {
    type: SEND_FRIEND_REQUEST_FAIL,
    payload: { error },
  };
};

export const deleteFriendRequest = (userId, friendId) => (
  dispatch,
  getState
) => {
  return new Promise(function (resolve, reject) {
    dispatch(deleteFriendRequestBegin());
    axios
      .delete(
        `http://localhost:5000/api/users/${userId}/friends/${friendId}/requests`,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch(deleteFriendRequestSuccess(friendId));
        resolve(res.data);
      })
      .catch((error) => {
        dispatch(deleteFriendRequestFail(error.response.data.msg));
        reject(error.response.data.msg);
      });
  });
};

const deleteFriendRequestBegin = () => {
  return {
    type: DELETE_FRIEND_REQUEST_BEGIN,
  };
};

const deleteFriendRequestSuccess = (friendId) => {
  return {
    type: DELETE_FRIEND_REQUEST_SUCCESS,
    payload: { friendId },
  };
};

const deleteFriendRequestFail = (error) => {
  return {
    type: DELETE_FRIEND_REQUEST_FAIL,
    payload: { error },
  };
};
