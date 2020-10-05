import { combineReducers } from "redux";

import authReducer from "./auth";
import projectReducer from "./project/";
import modalReducer from "./modal";
import socketReducer from "./socket";

const allReducers = combineReducers({
  auth: authReducer,
  project: projectReducer,
  modal: modalReducer,
  socket: socketReducer,
});

export default allReducers;
