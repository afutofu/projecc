import { combineReducers } from "redux";

import authReducer from "./auth";
import messageReducer from "./message";

const allReducers = combineReducers({
  auth: authReducer,
  message: messageReducer,
});

export default allReducers;
