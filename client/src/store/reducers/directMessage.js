import {
  START_DIRECT_MESSAGE_SUCCESS,
  START_DIRECT_MESSAGE_FAIL,
} from "../actions/actions";

const initialState = {
  directMessages: [],
  error: null,
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_DIRECT_MESSAGE_SUCCESS:
      return {
        ...state,
        directMessages: [action.payload.directMessage, ...state.directMessages],
      };
    case START_DIRECT_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
  }
};

export default friendReducer;
