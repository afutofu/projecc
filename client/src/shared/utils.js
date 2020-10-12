import axios from "axios";

// Setup config/headers and token
export const tokenConfig = (getState, params) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Params
  if (params) {
    config = {
      ...config,
      params: {
        ...params,
      },
    };
  }

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// Fetch user data
export const fetchUserData = (userId) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    axios
      .get(`/api/users/${userId}`, tokenConfig(getState))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) return reject(err.response.data.msg);
        return reject();
      });
  });
};
