import axios from "axios";

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

// Fetch user data
export const fetchUserData = (userId) => (dispatch, getState) => {
  return new Promise(function (resolve, reject) {
    axios
      .get(`http://localhost:5000/api/users/${userId}`, tokenConfig(getState))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.msg);
      });
  });
};
