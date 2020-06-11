import { SET_USERNAME } from "../actions/actions";

const initialState = { isLogged: false, username: "" };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, isLogged: true, username: action.payload.username };
    default:
      return state;
  }
};

export default authReducer;
