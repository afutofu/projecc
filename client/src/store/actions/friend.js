import {
  STORE_FRIENDS,
  SEND_FRIEND_REQUEST_BEGIN,
  SEND_FRIEND_REQUEST_SUCCESS,
  SEND_FRIEND_REQUEST_FAIL,
  DELETE_FRIEND_BEGIN,
  DELETE_FRIEND_SUCCESS,
  DELETE_FRIEND_FAIL,
} from "./actions";

export const storeFriends = (friends) => {
  return {
    type: STORE_FRIENDS,
    payload: { friends },
  };
};

const sendFriendRequestBegin = () => {
  return {
    type: SEND_FRIEND_REQUEST_BEGIN,
  };
};

const sendFriendRequestSuccess = (requestedUser) => {
  return {
    type: SEND_FRIEND_REQUEST_SUCCESS,
    payload: { requestedUser },
  };
};

const sendFriendRequestFail = (error) => {
  return {
    type: SEND_FRIEND_REQUEST_FAIL,
    payload: { error },
  };
};

const deleteFriendBegin = () => {
  return {
    type: DELETE_FRIEND_BEGIN,
  };
};

const deleteFriendSuccess = (deletedUser) => {
  return {
    type: DELETE_FRIEND_SUCCESS,
    payload: { deletedUser },
  };
};

const deleteFriendFail = (error) => {
  return {
    type: DELETE_FRIEND_FAIL,
    payload: { error },
  };
};
