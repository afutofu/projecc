import { combineReducers } from "redux";

import authReducer from "./auth";
import messageReducer from "./message/";
import modalReducer from "./modal";

const allReducers = combineReducers({
  auth: authReducer,
  message: messageReducer,
  modal: modalReducer,
});

export default allReducers;
