import { combineReducers } from "redux";

import authReducer from "./auth";
import messageReducer from "./message/";
import modalReducer from "./modal";
import socketReducer from "./socket";

const allReducers = combineReducers({
  auth: authReducer,
  message: messageReducer,
  modal: modalReducer,
  socket: socketReducer,
});

export default allReducers;
