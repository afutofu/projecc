import { SET_USERNAME } from "./actions";

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: { username },
  };
};
