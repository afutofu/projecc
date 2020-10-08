import {
  SET_FRIEND_STATUS_DISPLAY,
  STORE_FRIENDS,
  SEND_FRIEND_REQUEST_BEGIN,
  SEND_FRIEND_REQUEST_SUCCESS,
  SEND_FRIEND_REQUEST_FAIL,
  DELETE_FRIEND_REQUEST_BEGIN,
  DELETE_FRIEND_REQUEST_SUCCESS,
  DELETE_FRIEND_REQUEST_FAIL,
  ADD_FRIEND_BEGIN,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAIL,
} from "../actions/actions";

const initialState = {
  friends: [],
  requests: [],
  statusDisplay: "all",
  isLoading: false,
  error: null,
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIEND_STATUS_DISPLAY:
      return {
        ...state,
        statusDisplay: action.payload.friendStatusDisplay,
      };
    case STORE_FRIENDS:
      return {
        ...state,
        ...action.payload.friends,
      };
    case SEND_FRIEND_REQUEST_BEGIN:
    case DELETE_FRIEND_REQUEST_BEGIN:
    case ADD_FRIEND_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SEND_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        requests: [...state.requests, action.payload.newRequest],
        isLoading: false,
      };
    case DELETE_FRIEND_REQUEST_SUCCESS:
      const { friendId } = action.payload;
      return {
        ...state,
        requests: state.requests.filter((request) => {
          if (request.friendId !== friendId) return request;
        }),
        isLoading: false,
      };
    case ADD_FRIEND_SUCCESS:
      const { friend } = action.payload;
      return {
        ...state,
        friend: [friend, ...state.friend],
        requests: state.requests.filter((request) => {
          if (request.friendId !== friendId) return request;
        }),
        isLoading: false,
      };
    case SEND_FRIEND_REQUEST_FAIL:
    case DELETE_FRIEND_REQUEST_FAIL:
    case ADD_FRIEND_FAIL:
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
