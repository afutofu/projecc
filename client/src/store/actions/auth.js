import axios from "axios";
import {
  SET_USERNAME,
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./actions";

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: { username },
  };
};

// Check token & fetch user
export const fetchUser = () => (dispatch, getState) => {
  dispatch(fetchUserBegin());

  axios
    .get("http://localhost:5000/api/auth/user", tokenConfig(getState))
    .then((res) => {
      const { token, user } = res.data;
      dispatch(fetchUserSuccess(user));
    })
    .catch((err) => {
      console.log(err.response.data.msg);
      dispatch(fetchUserFail(err.response.data.msg));
    });
};

const fetchUserBegin = () => {
  return {
    type: FETCH_USER_BEGIN,
  };
};

const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { user },
  };
};

const fetchUserFail = (msg) => {
  return {
    type: FETCH_USER_FAIL,
    payload: { id: "FETCH_USER_ERROR", msg: msg },
  };
};

// Register new user
export const register = (name, email, password) => (dispatch) => {
  // Headers
  const config = {
    "Content-Type": "application/json",
  };

  // Request body
  const body = { name, email, password };

  axios
    .post("http://localhost:5000/api/users", body, config)
    .then((res) => {
      dispatch(registerSuccess(res.data));
    })
    .catch((err) => {
      console.log(err.response.data.msg);
      dispatch(registerFail(err.response.data.msg));
    });
};

export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: { data },
  };
};

export const registerFail = (msg) => {
  return {
    type: REGISTER_FAIL,
    payload: { id: "REGISTER_ERROR", msg },
  };
};

// Setup config/headers and token

export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
