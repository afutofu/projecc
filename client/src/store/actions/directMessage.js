import axios from "axios";
import {
  START_DIRECT_MESSAGE_SUCCESS,
  START_DIRECT_MESSAGE_FAIL,
} from "./actions";
import { tokenConfig } from "../../shared/utils";

export const startDirectMessage = (userId, friendId) => (
  dispatch,
  getState
) => {
  return new Promise(function (resolve, reject) {
    axios.post(`http://localhost:5000/api/users/${userId}/directMessages`),
      { friendId },
      tokenConfig(getState)
        .then((res) => {
          dispatch(startDirectMessageSuccess(res.data));
          resolve(res.data);
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
