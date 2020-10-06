import { combineReducers } from "redux";

import authReducer from "./auth";
import projectReducer from "./project/";
import modalReducer from "./modal";
import socketReducer from "./socket";
import homeReducer from "./home";
import friendReducer from "./friend";

const allReducers = combineReducers({
  auth: authReducer,
  project: projectReducer,
  friend: friendReducer,
  modal: modalReducer,
  socket: socketReducer,
  home: homeReducer,
});

export default allReducers;
