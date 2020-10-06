import {
  STORE_FRIENDS,
  SEND_FRIEND_REQUEST_BEGIN,
  SEND_FRIEND_REQUEST_SUCCESS,
  SEND_FRIEND_REQUEST_FAIL,
  DELETE_FRIEND_BEGIN,
  DELETE_FRIEND_SUCCESS,
  DELETE_FRIEND_FAIL,
} from "../actions/actions";

const initialState = {
  friends: [],
  pendingFriends: [],
  isLoading: false,
  error: null,
};

const friendReducer = (state = initialState, action) => {
  switch (action.payload) {
    case STORE_FRIENDS:
      return {
        ...state,
        ...action.payload.friends,
      };
    case SEND_FRIEND_REQUEST_BEGIN:
    case DELETE_FRIEND_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SEND_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_FRIEND_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SEND_FRIEND_REQUEST_FAIL:
    case DELETE_FRIEND_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default friendReducer;
