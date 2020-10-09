import axios from "axios";
import {
  SET_USERNAME,
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./actions";
import { storeFriends, fetchDirectMessages } from "./index";
import { tokenConfig } from "../../shared/utils";

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: { username },
  };
};

// Check token & fetch user
export const fetchUser = () => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    dispatch(fetchUserBegin());
    axios
      .get("http://localhost:5000/api/auth/user", tokenConfig(getState))
      .then((res) => {
        const { token, user, friends } = res.data;
        dispatch(fetchUserSuccess({ token, user }));
        dispatch(storeFriends(friends));
        dispatch(fetchDirectMessages(user._id));
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUserFail(err.response.data.msg));
        reject(err.response.data.msg);
      });
  });
};

const fetchUserBegin = () => {
  return {
    type: FETCH_USER_BEGIN,
  };
};

const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { data },
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
  return new Promise(function (resolve, reject) {
    // Headers
    const config = {
      "Content-Type": "application/json",
    };

    // Request body
    const body = { name, email, password };

    axios
      .post("http://localhost:5000/api/users", body, config)
      .then((res) => {
        const { token, user, friends } = res.data;
        dispatch(registerSuccess({ token, user }));
        dispatch(storeFriends(friends));
        resolve(user);
      })
      .catch((err) => {
        dispatch(registerFail(err.response.data.msg));
      });
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

// Login user
export const login = (email, password) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    dispatch(loginBegin());
    // Headers
    const config = {
      "Content-Type": "application/json",
    };

    // Request body
    const body = { email, password };

    axios
      .post("http://localhost:5000/api/auth", body, config)
      .then((res) => {
        const { token, user, friends } = res.data;
        dispatch(loginSuccess({ token, user }));
        dispatch(storeFriends(friends));
        resolve(user);
      })
      .catch((err) => {
        dispatch(loginFail(err.response.data.msg));
      });
  });
};

const loginBegin = () => {
  return {
    type: LOGIN_BEGIN,
  };
};

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { data },
  };
};

const loginFail = (msg) => {
  return {
    type: LOGIN_FAIL,
    payload: { id: "LOGIN_ERROR", msg },
  };
};

// Logout user
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
