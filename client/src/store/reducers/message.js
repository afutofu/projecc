import { CHANGE_CHANNEL, RECEIVE_MESSAGE } from "../actions/actions";

let initialState = {
  channels: {
    general: [],
    deadline: [],
  },
};

initialState = {
  channels: {
    general: [],
    deadline: [],
  },
  selectedChannel: Object.keys(initialState.channels)[0],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CHANNEL:
      return {
        ...state,
        selectedChannel: action.payload.channel,
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.payload.channel]: [
            ...state.channels[action.payload.channel],
            { user: action.payload.user, msg: action.payload.msg },
          ],
        },
      };
    default:
      return state;
  }
};

export default messageReducer;
