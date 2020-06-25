import axios from "axios";

import {
  SET_SELECTED_CHANNEL,
  RECEIVE_MESSAGE,
  CREATE_CHANNEL,
  DELETE_CHANNEL,
  CREATE_PROJECT,
  SET_SELECTED_PROJECT,
  FETCH_PROJECTS_BEGIN,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAIL,
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
} from "./actions";

export const setSelectedChannel = (channel, project) => {
  return {
    type: SET_SELECTED_CHANNEL,
    payload: { channel, project },
  };
};

export const receiveMessage = (message) => {
  const { user, msg, projectName, channel } = message;
  return {
    type: RECEIVE_MESSAGE,
    payload: { user, msg, projectName, channel },
  };
};

export const createChannel = (channel, project) => {
  return {
    type: CREATE_CHANNEL,
    payload: { channel, project },
  };
};

export const deleteChannel = (channel, projectName) => {
  return {
    type: DELETE_CHANNEL,
    payload: { channel, projectName },
  };
};

// export const createProject = (project) => {
//   return {
//     type: CREATE_PROJECT,
//     payload: project,
//   };
// };

export const setSelectedProject = (project) => {
  return {
    type: SET_SELECTED_PROJECT,
    payload: { project },
  };
};

export const fetchProjects = () => (dispatch) => {
  dispatch(fetchProjectsBegin());
  axios
    .get("http://localhost:5000/api/projects")
    .then((res) => {
      dispatch(fetchProjectsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchProjectsFail(err));
    });
};

const fetchProjectsBegin = () => {
  return {
    type: FETCH_PROJECTS_BEGIN,
  };
};

const fetchProjectsSuccess = (projects) => {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    payload: { projects },
  };
};

const fetchProjectsFail = (err) => {
  return {
    type: FETCH_PROJECTS_FAIL,
    payload: { err },
  };
};

export const createProject = ({ name, creatorName }) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    dispatch(createProjectBegin());
    axios
      .post("http://localhost:5000/api/projects", { name, creatorName })
      .then((res) => {
        dispatch(createProjectSuccess(res.data));
        resolve(res.data);
      })
      .catch((err) => {
        dispatch(createProjectFail(err));
        reject(err);
      });
  });
};

const createProjectBegin = () => {
  return {
    type: CREATE_PROJECT_BEGIN,
  };
};

const createProjectSuccess = (project) => {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: { project },
  };
};

const createProjectFail = (err) => {
  return {
    type: CREATE_PROJECT_FAIL,
    payload: { err },
  };
};
