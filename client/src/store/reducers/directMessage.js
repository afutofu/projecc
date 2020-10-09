import {
  FETCH_DIRECT_MESSAGES_SUCCESS,
  FETCH_DIRECT_MESSAGES_FAIL,
  START_DIRECT_MESSAGE_SUCCESS,
  START_DIRECT_MESSAGE_FAIL,
  CREATE_DIRECT_MESSAGE_SUCCESS,
  CREATE_DIRECT_MESSAGE_FAIL,
} from "../actions/actions";

const initialState = {
  directMessages: [],
  error: null,
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DIRECT_MESSAGES_SUCCESS:
      return {
        ...state,
        directMessages: [...action.payload.directMessages],
      };
    case START_DIRECT_MESSAGE_SUCCESS:
      return {
        ...state,
        directMessages: [action.payload.directMessage, ...state.directMessages],
      };
    case CREATE_DIRECT_MESSAGE_SUCCESS:
      return {
        ...state,
        directMessages: state.directMessages.map((directMessage) => {
          if (directMessage._id == action.payload.directMessage._id) {
            directMessage.messages = [...action.payload.directMessage.messages];
          }
          return directMessage;
        }),
      };
    case FETCH_DIRECT_MESSAGES_FAIL:
    case START_DIRECT_MESSAGE_FAIL:
    case CREATE_DIRECT_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default friendReducer;
